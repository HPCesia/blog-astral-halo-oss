---
title: 解决 NixOS + Home Manager 配置 VSCode 出现的 settings.json 写入问题
slug: solve-vscode-write-settings-in-nixos-home-manager
category: 经验记录
tags:
  - NixOS
  - VSCode
published: 2025-06-16T15:02:21+08:00
---

:::collapse{title="更新日志"}

- 2025-08-15
  - 更新为更完善的版本
- 2025-06-16
  - 发布文章。

:::

如果使用 Home Manager 配置 VSCode 的设置的话，因为 VSCode 启动时会写入 settings.json，导致每次打开 VSCode 都会弹出一个 settings.json 无法保存的弹窗。最简单的解决方案是直接不用 Nix 配置 VSCode。好处是简单粗暴，但是这样就需要用其他方法管理 VSCode 的配置了，和 Nix 的哲学不符。

通过搜索，我找到了一个 21 年的相关 issue [#1800](https://github.com/nix-community/home-manager/issues/1800)，里面获赞最多的是一个 [gist](https://gist.github.com/piousdeer/b29c272eaeba398b864da6abf6cb5daa)，给出了一个模块，可以让 `home.file` 引入的文件变得可写。但是我更想使用 Home Manager 提供的 `profile` 选项来配置我的 VSCode，于是我注意到了该 issue 下还有一个比较简短的[评论](https://github.com/nix-community/home-manager/issues/1800#issuecomment-853589961)，给出了第三种解决方案的可能。

显然，一条 21 年的评论里的代码是没法直接用的，于是我顺藤摸瓜找到了[评论者的 Nix 配置仓库](https://github.com/kamadorueda/machine)（顺带一提，这位也是一个相当好用的 Nix 格式化软件 [Alejandra](https://github.com/kamadorueda/alejandra) 的作者），在里面找到了他最新的 [VSCode 配置代码](https://github.com/kamadorueda/machine/blob/0c61ad9d7ce988d81c4180a4d4b630d27b53a7e5/nixos-modules/editor/default.nix)。简单总结一下，就是改了一下 VSCode 的配置和扩展文件存储位置，再在开机时清理掉该位置的文件，把 Home Manager 生成的配置和扩展文件复制过去。这种方法既可以避免弹窗，还快速调试 VSCode 的配置，而不需要改一两行配置就要 `nix-rebuild`；同时也保证了 Nix 配置的稳定性。

但是由于用到了这位作者自己定义的一些库，并且他也不是为了 Home Manager 管理的配置编写的，这个配置代码也是不能直接用的。我这里给一个我的 NixOS 25.05 版本的 Home Manager 模块配置，以供参考：

:::collapse{title="第一版"}

```nix
# ./home/linux/gui/vscode.nix
{
  config,
  lib,
  pkgs,
  ...
}: let
  inherit (lib.lists) concatLists;

  homeDir = config.home.homeDirectory;
  userDataDir = "${homeDir}/.data/vscode/data";
  extensionsDir = "${homeDir}/.data/vscode/extensions";

  pkg = pkgs.vscode.override {
    commandLineArgs = concatLists [
      ["--extensions-dir" extensionsDir]
      ["--user-data-dir" userDataDir]
    ];
  };
in {
  imports = [./profiles];

  programs.vscode = {
    enable = true;
    package = pkg;
    mutableExtensionsDir = false;
  };

  # To solve VSCode wants to write settings.json
  # VSCode will reset per reboot/rebuild.
  systemd.user.services.vscode-setup = {
    Unit = {
      Description = "VSCode Setup service";
      After = ["graphical-session-pre.target"];
      Wants = ["graphical-session-pre.target"];
    };
    Install.WantedBy = ["graphical-session.target"];
    Service = {
      Type = "oneshot";
      ExecStart = lib.getExe (pkgs.writeShellApplication {
        name = "vscode-setup";
        text = ''
          rm -rf "${userDataDir}/User"
          rm -rf "${extensionsDir}"

          mkdir -p "${userDataDir}"
          mkdir -p "${extensionsDir}"

          cp -r --dereference --no-preserve=mode,ownership \
            "${homeDir}/.config/Code/User" "${userDataDir}/User"
          cp -r --dereference --no-preserve=mode,ownership \
            "${homeDir}/.vscode/extensions/." "${extensionsDir}"
        '';
      });
    };
  };
}
```

:::

第一版缺陷很多，所以我编写了第二版：

```nix
# ./home/linux/gui/vscode.nix
{
  config,
  lib,
  pkgs,
  ...
}: let
  homeDir = config.home.homeDirectory;
  dataDir = config.xdg.dataHome;
  userDataDir = "${dataDir}/vscode/data";
  extensionsDir = "${dataDir}/vscode/extensions";
in {
  programs.vscode = {
    enable = true;
    mutableExtensionsDir = false;
  };

  # To solve VSCode wants to write settings.json
  # VSCode will reset per reboot/rebuild.
  systemd.user.services.vscode-setup = {
    Unit = {
      Description = "VSCode Setup service";
      After = ["graphical-session-pre.target"];
      Wants = ["graphical-session-pre.target"];
    };
    Install.WantedBy = ["graphical-session.target"];
    Service = {
      Type = "oneshot";
      UMask = "0022";
      ExecStart = lib.getExe (pkgs.writeShellApplication {
        name = "vscode-setup";
        runtimeInputs = with pkgs; [coreutils gnutar jq];
        text = let
          userSrc = "${homeDir}/.config/Code/User";
          userDst = "${userDataDir}/User";
          extSrc = "${homeDir}/.vscode/extensions";
          extDst = extensionsDir;

          dirsToPreserve = [
            "workspaceStorage"
            "History"
          ];
          backupCmds = builtins.concatStringsSep "\n" (map (dir: ''
              if [ -e "${userDst}/${dir}" ]; then
                echo "Backing up data/User/${dir}..."
                mv "${userDst}/${dir}" "/tmp/vscode-${dir}-$$"
              fi
            '')
            (dirsToPreserve ++ ["globalStorage"]));
          restoreCmds = builtins.concatStringsSep "\n" (map (dir: ''
              if [ -e "/tmp/vscode-${dir}-$$" ]; then
                echo "Restoring data/User/${dir}..."
                mv "/tmp/vscode-${dir}-$$" "${userDst}/${dir}"
              fi
            '')
            dirsToPreserve);
        in ''
          set -eu

          ${backupCmds}

          echo "Cleaning old directories..."
          rm -rf "${userDst}"
          rm -rf "${extDst}"

          mkdir -p "${userDataDir}"
          mkdir -p "${extDst}"

          echo "Copying user settings from ${userSrc}..."
          cp -r --dereference --no-preserve=mode,ownership ${userSrc} "${userDst}"

          echo "Copying extensions from ${extSrc}..."
          tar -h -C "${extSrc}" -cf - . | tar -C "${extDst}" -xf - --no-same-owner --no-same-permissions --mode='u=rX,go=rX'
          chmod u+w -R "${extDst}" 2>/dev/null || true

          ${restoreCmds}

          echo "Restoring and merging data/User/globalStorage..."
          if [ -e "/tmp/vscode-globalStorage-$$" ]; then
            cp -rT "/tmp/vscode-globalStorage-$$" "${userDst}/globalStorage"

            src_storage_json="${userSrc}/globalStorage/storage.json"
            dst_storage_json="${userDst}/globalStorage/storage.json"

            if [ -f "$src_storage_json" ] && [ -f "$dst_storage_json" ]; then
              echo "Merging data/globalStorage/storage.json with new data..."
              merged_json=$(mktemp)
              jq -s '.[0] * .[1]' "$dst_storage_json" "$src_storage_json" > "$merged_json"
              mv "$merged_json" "$dst_storage_json"
              echo "Merge complete."
            else
              echo "Skipping storage.json merge: one or both files do not exist."
            fi
          else
            echo "No backed-up globalStorage found to restore."
          fi

          echo "VSCode setup complete."
        '';
      });
    };
  };
}
```

你也可以直接查看[我的 Nix 配置文件仓库](https://codeberg.org/HPCesia/nix-config)。
