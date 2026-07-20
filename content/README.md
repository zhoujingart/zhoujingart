# 内容层维护说明

`content/` 是 V1、V2 以及未来主题唯一可编辑的内容来源。这里的文件只能定义记录；不要加入 DOM 查询、事件监听、页面选择器、动画或主题样式。

- `artworks.js`：作品记录，写入 `window.siteContentData.artworks`。
- `exhibitions.js`：按年份分组的展览记录，写入 `window.siteContentData.exhibitionsByYear`。
- `press.js`：独立媒体报道，写入 `window.siteContentData.press`。

页面不应直接读取这些变量。展示代码通过 `window.siteContent` 查询内容，通过 `window.siteI18n` 获取双语字段，通过 `window.siteMedia` 获取展示图片。

修改内容后运行：

```bash
npm run check
npm run test:browser
```

新增或替换图片后，先执行 `tools/generate-optimized-images.py`，再运行上述检查。
