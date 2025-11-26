import { posix, win32 } from 'node:path';

const normalizePathRegExp = new RegExp(`\\${win32.sep}`, 'g');

export function normalizePath(filename: string) {
  return filename.replace(normalizePathRegExp, posix.sep);
}
