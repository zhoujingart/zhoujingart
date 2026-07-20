# 维护指南

## 日常开发

本项目是无构建步骤的静态网站。需要 Node.js 20+（仓库以 `.nvmrc` 固定为 22）与 Python 3。根目录 V1 与 `v2/` 是两套展示主题，必须使用相同的内容流。

```bash
npm ci
npm run check
npm run serve
npm run test:browser
```

本地服务默认运行在 `http://localhost:8000`。提交前必须通过 `npm run check`。

## 内容更新

- 作品集数据：`content/artworks.js`
- 展览数据：`content/exhibitions.js`，字段说明见 `EXHIBITIONS_CONFIG.md`
- 媒体报道：`content/press.js`
- 双语界面文字：V1 为 `js/language.js`，V2 为 `v2/js/language.js`
- 共享内容查询：`js/site-content.js`；新渲染器必须使用 `window.siteContent`，不要直接读取内容文件的内部数据变量
- 双语字段与安全转义：`js/site-i18n.js`
- 优化图与回退路径：`js/site-media.js`
- 页面样式：共享规则放在 `css/base/` 或 `css/components/`；仅页面专用的规则放在 `css/pages/`

新图片先保留原图，再执行：

```bash
/Users/michael/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3 tools/generate-optimized-images.py
```

列表和卡片必须使用 `js/site-media.js` 提供的优化路径；原图只作为查看器或加载失败时的后备。`npm run check` 会验证动态内容对应的 card 优化图存在。

不要为 V1、V2 或未来主题复制内容数据。主题只实现自己的 DOM、样式和交互；排序、按 ID 查询、媒体合并等共用操作应加到 `site-content.js`。

## 质量门禁

`npm run check` 会检查：

- 全部 HTML 页面的 `lang`、viewport、title 与重复 ID；
- HTML、CSS、JavaScript 内的本地图片、PDF、样式和脚本引用；
- 全部 JavaScript 文件的语法。
- 动态内容对应的优化图是否存在；
- V2 数据渲染器是否绕过共享内容 API。

GitHub Actions 会在推送和拉取请求时运行相同检查和 Chromium 浏览器回归。修改共享内容层后必须执行 `npm run test:browser`；它会验证 V1/V2 展览数据一致、V2 作品集及详情页均使用共享数据。

## 提交约定

- 每个提交只处理一个可描述的改动；
- 不提交生成缓存、编辑器临时文件或原图的无关改动；
- 保持现有视觉风格，优先选择降低图片解码量、闲置 CPU 与 GPU 图层数的方案。
