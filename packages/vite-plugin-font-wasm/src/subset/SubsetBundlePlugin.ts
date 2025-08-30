import { BundlePlugin, type BundlePluginConfig, getFileName } from './index';
import glob from 'fast-glob';
import fs from 'fs-extra';
import micromatch from 'micromatch';
import crypto from 'node:crypto';
import path from 'path';

export interface SubsetBundlePluginConfig extends BundlePluginConfig {
  scanFiles?: string | string[] | Record<string, string | string[]>;
  ignore?: string | string[];
  whiteList?: string | string[];
  emptyCacheDir?: boolean;
}

export class SubsetUtils {
  static isSubsetLink(p: string) {
    const [idString, params] = p.split('?');
    const searchParams = new URLSearchParams(params);
    const isSubset = searchParams.has('subsets');
    return { idString, isSubset, searchParams };
  }
  static emptyCacheDir(config: BundlePluginConfig) {
    if (!config.cacheDir) throw new Error('vite-plugin-font | cacheDir missed');
    const dir = path.resolve(config.cacheDir, '.subsets');
    return fs.emptyDir(dir);
  }
}

export class SubsetBundlePlugin extends BundlePlugin {
  /** 构建引擎的文件 ID，提供给构建引擎判断 */
  public buildId?: string;
  subsetConfig: SubsetBundlePluginConfig;
  constructor(config: SubsetBundlePluginConfig, key?: string) {
    super(config, key);
    this.subsetConfig = config;
    this.subsetCacheDir = config.cacheDir!;
  }

  usedSubsets = new Set<number>();
  subsetCacheDir: string;
  getCachedPath(p: string) {
    const { isSubset, idString } = this.isSubsetLink(p);
    return path.resolve(
      isSubset ? this.subsetCacheDir : this.config.cacheDir!,
      getFileName(idString)
    );
  }
  isSubsetLink = SubsetUtils.isSubsetLink;
  async createSubsetsHash() {
    if (!this.subsetConfig.scanFiles) return;
    this.getWhiteListSubsets();
    await this.updateScanFiles();
    const subsetsArr = [...this.usedSubsets].sort((a, b) => a - b);
    this.subsets = [subsetsArr];
    const hash = crypto
      .createHash('md5')
      .update(String.fromCodePoint(...subsetsArr))
      .digest('hex');
    // 修改缓存地址，达到缓存
    this.subsetCacheDir = path.resolve(this.config.cacheDir!, '.subsets', hash);
    return hash;
  }
  /** 匹配绝对路径是否被获取到 */
  isMatchScanArea(p: string) {
    const globStr = this.getGlobArea();
    if (!globStr) return false;
    const resolvePath = (p: string) => path.resolve(process.cwd(), p);
    if (globStr instanceof Array) {
      return globStr.some((i) => micromatch.isMatch(p, resolvePath(i)));
    }
    return micromatch.isMatch(p, resolvePath(globStr));
  }
  /** 获取配置中的 scanFiles 字段 */
  private getGlobArea() {
    if (
      typeof this.subsetConfig.scanFiles === 'object' &&
      !(this.subsetConfig.scanFiles instanceof Array)
    ) {
      return this.subsetConfig.scanFiles[this.key];
    } else {
      return this.subsetConfig.scanFiles;
    }
  }
  private async updateScanFiles() {
    const globStr = this.getGlobArea();
    if (!globStr) return;
    const files = await glob(globStr!, {
      absolute: true,
      ignore:
        this.subsetConfig.ignore instanceof Array
          ? this.subsetConfig.ignore
          : [this.subsetConfig.ignore ?? 'node_modules/**'],
    });
    return Promise.all(
      files.map((i) => {
        return new Promise((res, rej) => {
          const stream = fs.createReadStream(i, {
            encoding: 'utf8',
          });
          stream.on('data', (i) => {
            [...(i as string)].forEach((char) => this.usedSubsets.add(char.codePointAt(0)!));
          });
          stream.on('end', () => {
            res(null);
          });
          stream.on('error', (err) => {
            rej(err);
          });
        });
      })
    );
  }
  private getWhiteListSubsets() {
    let whiteList = this.subsetConfig.whiteList ?? [];
    if (!(whiteList instanceof Array)) {
      whiteList = [whiteList];
    }
    const set = this.usedSubsets;
    whiteList.forEach((str) => [...str].forEach((char) => set.add(char.codePointAt(0)!)));
  }
}
