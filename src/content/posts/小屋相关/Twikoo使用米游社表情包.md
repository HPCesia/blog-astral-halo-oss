---
title: Twikoo 评论区利用 Python 脚本自动化导入米游社表情包
slug: how-to-use-hoyolab-emotions-in-twikoo
category: 小屋相关
tags:
  - Twikoo
cover: https://images.hpcesia.com/671f2b9befc85.webp
published: 2024-09-30T15:54:16+08:00
description: 利用 Pythopn 脚本实现自动化获取米游社表情包并添加到本地 Twikoo 表情包 json 中。
---

## Twikoo 评论系统表情包设置

打开 Twikoo 设置面板，打开「配置管理」 - 「插件」 - 「EMOTION_CDN」，输入你自己的 emotion.json 路径即可。

## Python 脚本

找个地方创建一个 `.py` 文件，填入以下内容（为了开箱即用，使用的是 `urllib` 库，可自行换成 `request` 库或 `httpx` 库）：

```python
# path/to/your/file.py
import json
import urllib.request
from pathlib import Path
import re


def miyousheEmoticonsJsonToTwikooJson(
    api_url: str,
    output_path: str,
    groups: list[str] = None,
    use_index_img: bool = False,
    clean_output: bool = False,
):
    """
    将米游社表情包的JSON数据转换为Twikoo格式的JSON数据。

    该函数从指定的API URL获取米游社表情包数据，并将其转换为Twikoo格式的JSON文件。
    可以选择性地指定要处理的表情包分组，是否使用索引图片，以及是否清理输出文件。
    Args:
        api_url (str): 米游社表情包 API 的 URL。
        output_path (str): 输出 JSON 文件的路径。
        groups (list[str], optional): 要处理的表情包分组列表。如果为 `None`，则处理所有分组。默认为 `None`。
        use_index_img (bool, optional): 是否使用索引图片作为分组名称。默认为 `False`。
        clean_output (bool, optional): 是否清理输出文件。如果为 `True`，则覆盖输出文件。默认为 `False`。
    """
    data = urllib.request.urlopen(api_url).read().decode("utf-8")
    data = json.loads(data)
    output_dict = {}
    if Path(output_path).exists() and not clean_output:
        with open(Path(output_path), "r", encoding="utf-8") as f:
            output_dict = json.load(f)
    if use_index_img:
        STYLE = "height: 20px;top: 4px;position: relative;"
        pattern = r"<img src='.*?' style='.*?' title='(.*?)'>"

        def sameTitle(key, title):
            match = re.match(pattern, key)
            return not bool(match and match.group(1) == title)

    for emoticon_group in data["data"]["list"]:
        if emoticon_group["status"] == "draft":
            continue
        group_name: str = emoticon_group["name"]
        if groups is not None and group_name not in groups:
            continue
        if use_index_img:
            index_url = emoticon_group["icon"]
            origin_group_name = group_name
            group_name = f"<img src='{index_url}' style='{STYLE}' title='{group_name}'>"
            output_dict = {k: v for k, v in output_dict.items() if sameTitle(k, origin_group_name)}
        output_dict[group_name] = {"type": "image"}
        container = []
        for emoticon in emoticon_group["list"]:
            if emoticon["status"] == "draft":
                continue
            url = emoticon["icon"]
            name = emoticon["name"].replace(" ", "-")
            name = (
                origin_group_name.replace(" ", "-") + "-" + name
                if "origin_group_name" in locals()
                else group_name.replace(" ", "-") + "-" + name
            )
            container.append({"text": name, "icon": f"<img src='{url}'>"})
        output_dict[group_name]["container"] = container
    with open(Path(output_path), "w", encoding="utf-8") as f:
        json.dump(output_dict, f, ensure_ascii=False, indent=2)


## 使用示例
api_url = "https://bbs-api.mihoyo.com/misc/api/emoticon_set"
output = "path/to/your/output.json"
emoticons_list = ["原神 V官方", "崩坏RPG", "崩坏 星穹铁道"] # 你想要的表情包列表
miyousheEmoticonsJsonToTwikooJson(
    api_url, output, use_index_img=True, groups=emoticons_list
)
```

只需要修改 `output` 为自己的表情包路径，使用

```shell
python path/to/your/file.py
```

即可。

## 自动部署

修改 `package.json` 的 `scripts` 项，将 `build` 改为 `python path/to/your/file.py && hexo generate`，使用 `npm run build` 即可。
