# TCBOMC 个人主页

WinUI「浮动容器 / Mica」风格的个人项目主页，纯原生 HTML/CSS/JS，无任何依赖与构建步骤。

## 风格来源

复刻自 WinUI 3 浮动面板实验（floating_control）的视觉语言：

- **Mica 质感背景**：壁纸式多层渐变 + 噪点纹理 + 光斑
- **浮动容器**：`border-radius: 17px` 半透明白卡片 + `backdrop-filter` 高斯模糊 + 1px 细描边 + 柔和多层阴影
- **胶囊控件**：`13px` 圆角按钮/导航项，悬停 `#00000008`、按下加深，Windows accent 蓝 `#0067C0`
- **顶部悬浮标题栏**：名字胶囊 + GitHub/Email 胶囊 + 红色装饰键（悬停变 `#C42B1C`）

## 文件结构

```
├── index.html        页面骨架
├── css/style.css     全部样式（设计参数集中在 :root）
└── js/
    ├── data.js       项目数据（增删项目只改这里）
    └── main.js       渲染 / 筛选 / 预览懒加载 / 导航高亮
```

## 部署到 GitHub Pages

1. 新建仓库（如 `TCBOMC/TCBOMC` 用于 profile 主页，或任意仓库名）
2. 把本目录所有文件推送到仓库 `main` 分支根目录
3. 仓库 **Settings → Pages → Source** 选择 `main` / `(root)`
4. 访问 `https://<用户名>.github.io/<仓库名>/`

## 在线预览

「在线预览」区的 iframe 采用点击后懒加载，当前嵌入：

- 3D-Model-Viewer（3d.trseimc.top，自定义域名）
- steam-analysis（GitHub Pages）

新增可运行项目时在 `js/data.js` 的 `PREVIEWS` 数组里追加即可。
