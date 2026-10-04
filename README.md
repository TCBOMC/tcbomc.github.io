# TCBOMC 个人主页

WinUI「浮动容器 / Mica」风格的个人项目主页，纯原生 HTML/CSS/JS。
项目卡片**由 `projects/` 目录的配置文件驱动**，构建脚本扫描后动态生成。
页面为**整页翻动式**（CSS scroll-snap）：首页 / 项目 / 在线预览 / 关于四页各占满一屏，滚到底后平滑翻入下一页。

## 风格来源

复刻自 WinUI 3 浮动面板实验（floating_control）的视觉语言：

- **Mica 质感背景**：壁纸式多层渐变 + 噪点纹理 + 光斑
- **浮动容器**：`border-radius: 17px` 半透明白卡片 + `backdrop-filter` 高斯模糊 + 1px 细描边 + 柔和多层阴影
- **胶囊控件**：`13px` 圆角按钮/导航项，悬停 `#00000008`、按下加深，Windows accent 蓝 `#0067C0`
- **顶部悬浮标题栏**：名字胶囊 + GitHub/Email 胶囊 + 红色装饰键（悬停变 `#C42B1C`）

## 新增 / 修改项目（配置文件驱动）

在 `projects/` 下新建一个文件夹（名称随意），放入 `config.json`（必填 `name`、`desc`）：

```json
{
  "name": "项目名",
  "icon": "🎮",
  "group": "游戏 · 图形",
  "order": 10,
  "desc": "一句话简介",
  "tags": ["标签1", "标签2"],
  "img": "cover.png",
  "repo": "https://github.com/...",
  "demo": "https://...",
  "preview": "https://...（可选，进在线预览 iframe）",
  "npm": true
}
```

- **图片路径**：写 `assets/xxx.png`（含斜杠）→ 从站点 `assets/` 加载；写 `xxx.png`（纯文件名）→ 从该项目文件夹 `projects/<文件夹>/` 加载
- **排序**：`order` 越小越靠前（缺省 100），同序按名称
- **开源状态**：有 `repo` 字段自动标记"开源"，否则"未开源"
- **分类**：`group` 直接作为筛选选项文案，新分类自动出现在筛选栏

## 文件结构

```
├── index.html                  页面骨架
├── build.py                    扫描 projects/ 生成 js/projects.gen.js
├── projects/<文件夹>/           每个项目一个文件夹（config.json + 可选图片）
├── assets/                     共享静态资源（图片也可放这里）
├── css/style.css               全部样式（设计参数集中在 :root）
├── js/
│   ├── projects.gen.js         自动生成，勿手改（本地预览前先跑 build.py）
│   ├── data.js                 在线预览区 PREVIEWS 数据
│   └── main.js                 瀑布流渲染 / 筛选 / 预览懒加载 / 导航高亮
└── .github/workflows/deploy.yml  push 到 main 自动构建并部署 Pages
```

## 部署

已配置 GitHub Actions：push 到 `main` 后自动执行 `build.py` 生成卡片数据并部署到 **https://tcbomc.github.io/**（Pages Source 为 GitHub Actions）。

本地预览：先 `python build.py`，然后直接打开 `index.html`。

## 在线预览

「在线预览」区的 iframe 采用点击后懒加载，当前嵌入：

- 3D-Model-Viewer（3d.trseimc.top，自定义域名）
- steam-analysis（GitHub Pages）

新增可运行项目时在项目 `config.json` 里加 `preview` 字段即可。
