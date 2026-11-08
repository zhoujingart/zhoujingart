# Zhou Jing Portfolio

周婧的双语静态作品集网站，包含作品、展览、艺术家介绍、媒体报道、工作室与联系页面。当前网站页面位于根目录；旧版页面与专属脚本归档在 history/v1。

## 快速开始

需要 Node.js 20+ 与 Python 3：

```bash
npm ci
npm run check
npm run serve
```

访问 `http://localhost:8000`。网站无需构建步骤，根目录页面是当前线上展示入口。

## 工程结构

```text
├── *.html                 # 当前网站页面
├── css/artist/            # 艺术家主题样式
├── history/v1/            # 旧版页面与脚本归档
├── content/                # 唯一内容源：作品、展览与媒体记录
├── css/
│   ├── base/              # 变量、重置与全局规则
│   ├── components/        # 可复用组件
│   └── pages/             # 页面专用样式
├── js/                    # 交互、内容数据与跨主题共享 API
│   ├── site-content.js     # 共享内容查询 API
│   ├── site-i18n.js        # 双语字段读取、日期格式化与转义
│   └── site-media.js       # 优化图与原图回退路径
├── images/                # 原始素材与优化后的展示图
├── tools/                 # 素材生成和站点校验脚本
└── .github/workflows/     # 持续集成
```

## 常用命令

| 命令 | 用途 |
| --- | --- |
| `npm run check` | 校验语法、基础元数据、本地资源、内容数据与禁用的内联点击事件 |
| `npm run sync:shells` | 从公共模板同步网站导航；模板改动后执行 |
| `npm run serve` | 启动与 CI 相同的并发静态服务器 |
| `npm run smoke` | 在本地服务启动后检查全部线上入口页 |
| `npm run test:browser` | 在 Chromium 中验证网站核心内容流与交互 |

## 内容维护

详情见 [CONTRIBUTING.md](CONTRIBUTING.md)。展览字段和新增流程见 [EXHIBITIONS_CONFIG.md](EXHIBITIONS_CONFIG.md)。

## 共享内容架构

内容维护在 `content/artworks.js`、`content/exhibitions.js` 与 `content/press.js`。旧版页面渲染脚本已归档于 `history/v1/js/`。页面渲染器不得读取内容文件的内部变量：应通过 `window.siteContent` 查询作品、展览和媒体数据；双语字段使用 `window.siteI18n`，图片使用 `window.siteMedia`。

当前网站使用一套页面和渲染逻辑，内容只维护一份。

网站顶部导航由 `tools/root-page-shells.mjs` 统一生成。修改导航项目、链接或其无障碍标记时，只编辑模板并运行 `npm run sync:shells`；`npm run check` 会验证所有页面已经同步。

## 发布

该项目可以直接部署到任意静态托管平台。GitHub Actions 会在推送和拉取请求时执行静态校验、入口页 smoke 测试和 Chromium 浏览器回归；通过后再发布即可。
