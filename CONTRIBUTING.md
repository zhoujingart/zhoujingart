# 维护指南

## 日常开发

本项目是无构建步骤的静态网站。需要 Node.js 20+（仓库以 `.nvmrc` 固定为 22）与 Python 3。

```bash
npm ci
npm run check
npm run serve
```

本地服务默认运行在 `http://localhost:8000`。提交前必须通过 `npm run check`。

## 内容更新

- 作品集数据：`js/gallery.js`
- 展览数据：`js/exhibitions.js`，字段说明见 `EXHIBITIONS_CONFIG.md`
- 媒体报道：`js/press.js`
- 双语界面文字：`js/language.js`
- 页面样式：共享规则放在 `css/base/` 或 `css/components/`；仅页面专用的规则放在 `css/pages/`

新图片先保留原图，再执行：

```bash
/Users/michael/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3 tools/generate-optimized-images.py
```

列表和卡片必须使用 `js/image-optimization.js` 提供的优化路径；原图只作为查看器或加载失败时的后备。

## 质量门禁

`npm run check` 会检查：

- 全部 HTML 页面的 `lang`、viewport、title 与重复 ID；
- HTML、CSS、JavaScript 内的本地图片、PDF、样式和脚本引用；
- 全部 JavaScript 文件的语法。

GitHub Actions 会在推送和拉取请求时运行相同检查。修改后请至少在桌面和窄屏下查看首页、作品集、展览、展览详情、媒体报道与工作室页面。

## 提交约定

- 每个提交只处理一个可描述的改动；
- 不提交生成缓存、编辑器临时文件或原图的无关改动；
- 保持现有视觉风格，优先选择降低图片解码量、闲置 CPU 与 GPU 图层数的方案。
