/* 项目数据：status = open(开源) / closed(未开源)；npm 标记 npm 包；
   img 为可选预览图（assets/ 下，有图卡片更高，参与瀑布流测高） */
const PROJECTS = [
  /* ---- 游戏与图形 ---- */
  {
    name: "2.5D 动作闯关游戏",
    icon: "🎮",
    img: "assets/game25d.svg",
    group: "游戏",
    status: "closed",
    desc: "纯 2D 素材美术制作的 2.5D 游戏——人物移动、物理碰撞与场景搭建均为完整 3D 实现，仅视角固定朝向。纯 C++（SFML）无引擎实现，自研深度轴、角色动画、碰撞与关卡系统。",
    tags: ["C++", "SFML", "自研引擎逻辑"]
  },
  {
    name: "地形与生物群系生成系统",
    icon: "🏔️",
    img: "assets/pcg.svg",
    group: "游戏",
    status: "closed",
    desc: "「像真实地球一样运转」的世界生成器：太阳辐射→温度→气压→风场→降水→湿度的物理驱动模拟链，生态适宜度驱动的生物群系自然涌现，核心分析在 GPU 上完成。",
    tags: ["Unity", "PCG", "Shader", "GPU 算法"]
  },
  {
    name: "AIgame",
    icon: "✨",
    img: "assets/aigame.svg",
    group: "游戏",
    status: "closed",
    desc: "AI 驱动的多模态视觉小说游戏——剧情、分支、背景插画、角色配音全部由 AI 实时生成，无任何预制作素材，剧情可无限延展。",
    tags: ["Unity", "LLM", "Stable Diffusion", "GPT-SoVITS"]
  },
  {
    name: "手势识别游戏 Demo",
    icon: "🖐️",
    group: "游戏",
    status: "closed",
    desc: "摄像头手势操控游戏原型：捏合、弯曲、挥动映射为按键与连招，配置文件驱动手势规则，新增手势无需改代码，支持多手识别。",
    tags: ["Unity", "MediaPipe", "手势识别"]
  },
  {
    name: "3D-Model-Viewer",
    icon: "🧊",
    group: "游戏",
    status: "open",
    desc: "网页端 3D 模型浏览器，支持 Mesh 与点云。飞行模式视角控制为自研混合方案：静止观察用钳制欧拉角，移动瞬间以四元数烘焙为世界朝向——无万向锁、无滚转漂移。",
    tags: ["Three.js", "6-DOF 相机", "点云"],
    repo: "https://github.com/TCBOMC/3D-Model-Viewer",
    demo: "https://3d.trseimc.top/",
    preview: "https://3d.trseimc.top/"
  },
  {
    name: "three-flight-camera",
    icon: "🛩️",
    group: "游戏",
    status: "open",
    npm: true,
    desc: "Three.js 的 6-DOF 飞行摄像机控制器（npm 开源包）：Body/Camera 双层架构 + 旋转烘焙，解决滚转漂移、万向锁与移动方向错位三大经典问题。",
    tags: ["TypeScript", "npm", "四元数"],
    repo: "https://github.com/TCBOMC/three-flight-camera",
    demo: "https://www.npmjs.com/package/three-flight-camera"
  },

  /* ---- AI 应用 ---- */
  {
    name: "Audio-book TTS Tool",
    icon: "📖",
    group: "ai",
    status: "open",
    desc: "小说一键转多角色有声书：自动分章、AI 标注角色、批量语音合成；支持百万字级文本，兼容多家大模型与 OpenAI 兼容 API。",
    tags: ["Python", "TTS", "LLM"],
    repo: "https://github.com/TCBOMC/audio-book-TTS-tool"
  },
  {
    name: "多模态 ChatBot 系统",
    icon: "💬",
    group: "ai",
    status: "open",
    desc: "多 AI 模型协作的对话引擎：文档/图片按需检索注入对话、多情景预设、可自定义深度思考链，现代化 WebUI 多用户访问。",
    tags: ["Python", "RAG", "WebUI"],
    repo: "https://github.com/TCBOMC/chat-bot"
  },

  /* ---- Android ---- */
  {
    name: "AppVolume",
    icon: "🔊",
    img: "assets/appvolume.svg",
    group: "android",
    status: "closed",
    desc: "Android 每应用独立音量与声道平衡工具：突破系统不开放的能力，全程免 Root；音量曲线按专业调音台 dB 推子设计，安装包仅约 2MB，持续迭代 13+ 版本。",
    tags: ["Kotlin", "Compose", "AudioFlinger", "Shizuku"]
  },

  /* ---- 桌面与工具 ---- */
  {
    name: "ToolsLoader",
    icon: "🧰",
    img: "assets/toolsloader.svg",
    group: "tool",
    status: "closed",
    desc: "Python 插件化工具箱平台：插件上下文隔离、耗时任务子进程执行可强杀、依赖自动安装、文件级热加载、崩溃日志落盘，迭代 40+ 版本的日常工作台。",
    tags: ["Python", "PyQt5", "插件系统"]
  },
  {
    name: "ani-DL",
    icon: "📺",
    img: "assets/anidl.svg",
    group: "tool",
    status: "closed",
    desc: "一站式追番桌面工具：新番时间线海报墙、多维筛选、通配符订阅规则引擎、WebSocket 实时搜索推送；独立加载页子进程实现秒开无白屏。",
    tags: ["Python", "PyQt5", "FastAPI", "爬虫"]
  },
  {
    name: "Subtitle-Exporter",
    icon: "📝",
    group: "tool",
    status: "open",
    desc: "批量导出字幕的效率工具。",
    tags: ["Python"],
    repo: "https://github.com/TCBOMC/Subtitle-Exporter"
  },
  {
    name: "qBittorrent 系列增强",
    icon: "🌀",
    group: "tool",
    status: "open",
    desc: "为 qBittorrent 打造的三件套：运行时多语言切换 WebUI、移动端自适应 WebUI、RSS 订阅自动下载器。",
    tags: ["Python", "WebUI", "二开"],
    repo: "https://github.com/TCBOMC/qbittorrent-webui-i18n"
  },

  /* ---- Web ---- */
  {
    name: "steam-analysis",
    icon: "📊",
    img: "assets/steam.svg",
    group: "web",
    status: "open",
    desc: "对 2006–2025 年 3 万余款 Steam 游戏清洗分析：年度画像、类型分布、价格规律、题材词云与跨年趋势可视化。",
    tags: ["数据可视化", "前端"],
    repo: "https://github.com/TCBOMC/steam-analysis",
    demo: "https://tcbomc.github.io/steam-analysis/",
    preview: "https://tcbomc.github.io/steam-analysis/"
  },
  {
    name: "clash-dashboard",
    icon: "🌐",
    group: "web",
    status: "open",
    desc: "带 Clash 订阅管理功能的现代化 WebUI，Docker + Nginx 自托管于家庭 NAS。",
    tags: ["HTML/JS", "自托管"],
    repo: "https://github.com/TCBOMC/clash-dashboard"
  }
];

const PREVIEWS = [
  {
    name: "3D-Model-Viewer",
    url: "https://3d.trseimc.top/",
    repo: "https://github.com/TCBOMC/3D-Model-Viewer",
    note: "实时运行的网页 3D 模型查看器，可点击画面锁定鼠标开启飞行模式漫游"
  },
  {
    name: "steam-analysis",
    url: "https://tcbomc.github.io/steam-analysis/",
    repo: "https://github.com/TCBOMC/steam-analysis",
    note: "3 万款 Steam 游戏数据可视化报告"
  }
];

const GROUPS = [
  { id: "all",     label: "全部" },
  { id: "游戏",    label: "游戏 · 图形" },
  { id: "ai",      label: "AI 应用" },
  { id: "android", label: "Android" },
  { id: "tool",    label: "桌面 · 工具" },
  { id: "web",     label: "Web" }
];
