# 展览内容维护

展览数据位于 `js/exhibitions.js` 的 `exhibitionsData`。每次改动后运行 `npm run check`；它会检查 JavaScript 语法、展览 ID 是否重复、中英文内容是否完整，以及所有引用的本地图片是否存在。

## 数据结构

```javascript
const exhibitionsData = {
    "2026": [
        {
            id: "2026-example-exhibition",
            title: { zh: "展览中文标题", en: "English title" },
            date: "2026.01.01-2026.02.01",
            location: { zh: "展览地点", en: "Exhibition venue" },
            country: { zh: "中国", en: "China" },
            description: { zh: "中文描述", en: "English description" },
            images: [{
                src: "images/exhibitions/20260101/poster.jpg",
                title: { zh: "展览海报", en: "Exhibition poster" },
                description: { zh: "展览主视觉", en: "Exhibition key visual" }
            }],
            artworks: [{
                title: { zh: "作品中文标题", en: "Artwork title" },
                medium: { zh: "综合材料", en: "Mixed media" },
                size: "100 × 100 cm",
                year: "2026",
                image: "images/paintings/painting_01.jpg"
            }],
            documents: [],
            press: []
        }
    ]
};
```

## 添加或修改展览

1. 将素材放进 `images/exhibitions/<日期>/`；路径从项目根目录开始写，例如 `images/exhibitions/20260101/poster.jpg`。
2. 在对应年份数组中新增或修改一个对象。`title`、`location`、`country`、`description`，以及每张图片的 `title`、`description` 都必须有 `{ zh, en }`。
3. `id` 必须全站唯一，且发布后不要随意修改；详情页会通过 URL 中的 `id` 找到对应展览。
4. 运行 `npm run check`，再打开 `exhibitions.html` 和对应详情页确认桌面与移动端显示。

## 可选字段

- `organizer`、`organizerDescription`、`organizerLink`：主办方内容；文字字段使用 `{ zh, en }`。
- `artworks`：参展作品。作品图片使用 `image`，并放在 `images/paintings/` 或相关展览目录。
- `documents`：文档图片。每项使用 `image`。
- `press`：媒体报道；可配置中英文标题、来源、日期和外部 `url`。

## 图片维护

- 用有意义的英文文件名；同一展览建议使用 `poster.jpg`、`ex_01.jpg`、`doc_01.jpg` 的一致命名。
- 图片引用必须指向实际存在的文件。自动检查会拦截拼写错误或漏提交的图片。
- 新增图片后，重点确认海报裁切、图片顺序、放大查看和移动端表现。

## 发布前清单

1. 运行 `npm run check`。
2. 检查中英文内容、日期、地点和图片路径。
3. 确认已发布展览的 URL 标识没有变化；如必须变更，保留旧链接的跳转策略。
