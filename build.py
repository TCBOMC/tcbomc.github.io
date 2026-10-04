#!/usr/bin/env python3
"""构建脚本：扫描 projects/*/config.json，生成 js/projects.gen.js（项目卡片数据）。

- 图片路径规则：
    写 "assets/xxx.png"（含斜杠）  -> 相对站点根目录加载
    写 "xxx.png"（纯文件名）       -> 在该项目的 projects/<文件夹>/ 下查找
- 未找到的图片给出警告并以无图卡片渲染。
- 排序：按 config 的 order（缺省 100），同序按名称。
- 开源状态：有 repo 字段视为开源，否则未开源。
"""
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent
PROJECTS_DIR = ROOT / "projects"
OUT = ROOT / "js" / "projects.gen.js"


def resolve_img(folder: str, img: str):
    """按规则解析头图路径，返回站点相对路径；文件不存在返回 None。"""
    if not img:
        return None
    p = img.replace("\\", "/").lstrip("/")
    if "/" in p:
        rel, target = p, ROOT / p
    else:
        rel, target = f"projects/{folder}/{p}", PROJECTS_DIR / folder / p
    return rel if target.is_file() else None


def main() -> None:
    if not PROJECTS_DIR.is_dir():
        sys.exit("[错误] 缺少 projects/ 目录")
    items = []
    for cfg_path in sorted(PROJECTS_DIR.glob("*/config.json")):
        folder = cfg_path.parent.name
        try:
            cfg = json.loads(cfg_path.read_text(encoding="utf-8"))
        except (json.JSONDecodeError, UnicodeDecodeError) as e:
            print(f"[跳过] {folder}/config.json 解析失败: {e}")
            continue
        if not cfg.get("name") or not cfg.get("desc"):
            print(f"[跳过] {folder}: 缺少必填的 name / desc")
            continue
        img = resolve_img(folder, cfg.get("img", ""))
        if cfg.get("img") and not img:
            print(f"[警告] {folder}: 头图 {cfg['img']} 不存在，将以无图卡片渲染")
        item = {
            "name": cfg["name"],
            "icon": cfg.get("icon", "📦"),
            "group": cfg.get("group", "其他"),
            "desc": cfg["desc"],
            "tags": cfg.get("tags", []),
            "status": "open" if (cfg.get("repo") or cfg.get("status") == "open") else "closed",
            "order": cfg.get("order", 100),
        }
        if img:
            item["img"] = img
        for key in ("repo", "demo", "preview"):
            if cfg.get(key):
                item[key] = cfg[key]
        if cfg.get("npm"):
            item["npm"] = True
        items.append(item)

    items.sort(key=lambda x: (x["order"], x["name"]))
    for it in items:
        it.pop("order", None)

    OUT.parent.mkdir(parents=True, exist_ok=True)
    payload = json.dumps(items, ensure_ascii=False, indent=2)
    OUT.write_text(
        "/* 自动生成：build.py 扫描 projects 目录下各 config.json 生成，请勿手改 */\n"
        "const PROJECTS = " + payload + ";\n",
        encoding="utf-8",
    )
    print(f"[OK] 生成 {OUT.relative_to(ROOT)}，共 {len(items)} 个项目")


if __name__ == "__main__":
    main()
