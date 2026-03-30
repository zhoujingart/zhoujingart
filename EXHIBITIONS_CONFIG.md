# 展览配置说明文档

## 概述
本文档说明如何配置和管理展览页面的数据。展览数据存储在 `js/exhibitions.js` 文件中，采用配置化的方式便于维护和更新。

## 数据结构

### 主要数据对象
```javascript
const exhibitionsData = {
    "年份": [
        {
            // 展览基本信息
            id: "展览唯一标识",
            title: {
                zh: "中文标题",
                en: "English Title"
            },
            date: "展期",
            location: {
                zh: "中文地点",
                en: "English Location"
            },
            country: {
                zh: "国家",
                en: "Country"
            },
            description: {
                zh: "中文描述",
                en: "English Description"
            },
            
            // 展览图片
            images: [...],
            
            // 参展作品
            artworks: [...],
            
            // 展览文档
            documents: [...],
            
            // 媒体报道
            press: [...]
        }
    ]
}
```

## 当前展览

### 2023年展览

#### 1. NOW中取境--2023上海青年艺术家邀请展
- **ID**: `now-zhong-qu-jing-china-2023`
- **展期**: 2023.03.25 - 2023.04.30
- **地点**: 上海当代艺术馆
- **类型**: 群展
- **特色**: 汇聚多位中国当代艺术家的重要群展，展示当代中国艺术的多元面貌

#### 2. 萍缘际 艺术展
- **ID**: `interlude-infini-2023`
- **展期**: 2023.09.15 - 2023.10.20
- **地点**: 北京798艺术区
- **类型**: 群展
- **特色**: 探讨艺术中的偶然与必然，展现当代艺术的丰富内涵

### 2022年展览

#### 1. 几何表达——当代艺术中的秩序与美学
- **ID**: `geometric-expressions-2022`
- **展期**: 2022.06.01 - 2022.07.15
- **地点**: 广州美术馆
- **类型**: 群展
- **特色**: 聚焦几何艺术在当代语境下的新发展

## 字段详细说明

### 基本信息字段
- `id`: 展览唯一标识符，用于URL和数据查找
- `title`: 展览标题，支持中英文
- `date`: 展览日期，格式为 "YYYY.MM.DD - YYYY.MM.DD"
- `location`: 展览地点，支持中英文
- `country`: 展览国家，支持中英文
- `description`: 展览描述，支持中英文

### 图片数组 (images)
```javascript
images: [
    {
        src: "图片路径",
        title: "图片标题",
        description: "图片描述"
    }
]
```

### 作品数组 (artworks)
```javascript
artworks: [
    {
        title: "作品标题",
        medium: "创作媒材",
        size: "作品尺寸",
        year: "创作年份"
    }
]
```

### 文档数组 (documents)
```javascript
documents: [
    {
        title: "文档标题",
        type: "文档类型（catalog/certificate/invitation等）",
        image: "文档图片路径"
    }
]
```

### 媒体报道数组 (press)
```javascript
press: [
    {
        title: "报道标题",
        source: "媒体来源",
        date: "发布日期"
    }
]
```

## 添加新展览

### 步骤1：准备素材
1. 准备展览相关图片，放入 `images/` 目录
2. 准备展览文档（证书、画册等）图片
3. 整理展览基本信息和作品清单

### 步骤2：编辑数据文件
1. 打开 `js/exhibitions.js` 文件
2. 在对应年份的数组中添加新的展览对象
3. 按照数据结构填写所有必要字段

### 步骤3：示例代码
```javascript
// 在相应年份数组中添加
{
    id: "new-exhibition-2024",
    title: {
        zh: "新展览标题",
        en: "New Exhibition Title"
    },
    date: "2024.01.01 - 2024.02.01",
    location: {
        zh: "展览地点",
        en: "Exhibition Venue"
    },
    type: {
        zh: "个展",
        en: "Solo Exhibition"
    },
    description: {
        zh: "展览描述...",
        en: "Exhibition description..."
    },
    images: [
        {
            src: "images/new_exhibition_01.png",
            title: "展览海报",
            description: "展览主视觉海报"
        }
    ],
    artworks: [
        {
            title: "作品名称",
            medium: "综合材料",
            size: "100×100cm",
            year: "2024"
        }
    ],
    documents: [],
    press: []
}
```

## 修改现有展览

### 更新展览信息
直接在 `exhibitionsData` 对象中找到对应的展览，修改相应字段即可。

### 添加新图片
在展览的 `images` 数组中添加新的图片对象：
```javascript
images: [
    // 现有图片...
    {
        src: "images/new_image.png",
        title: "新图片标题",
        description: "新图片描述"
    }
]
```

### 添加新作品
在展览的 `artworks` 数组中添加新的作品对象。

## 删除展览

### 完全删除
从对应年份的数组中删除整个展览对象。

### 隐藏展览
可以添加 `hidden: true` 字段来隐藏展览（需要在渲染函数中添加相应逻辑）。

## 多语言支持

### 翻译键值
所有界面文本的翻译都在 `exhibitionsTranslations` 对象中定义。

### 添加新翻译
```javascript
const exhibitionsTranslations = {
    zh: {
        "新的翻译键": "中文翻译"
    },
    en: {
        "新的翻译键": "English Translation"
    }
};
```

## 图片管理

### 图片命名规范
- 使用有意义的文件名
- 建议格式：`exhibition_name_01.png`
- 保持文件大小适中（建议小于2MB）

### 图片路径
- 所有图片放在 `images/` 目录下
- 路径格式：`images/filename.png`

## 性能优化建议

1. **图片优化**：压缩图片文件大小
2. **懒加载**：考虑为图片添加懒加载功能
3. **缓存**：利用浏览器缓存机制
4. **分页**：如果展览数量很多，考虑分页显示

## 常见问题

### Q: 如何更改展览显示顺序？
A: 展览按年份倒序显示，同一年份内的展览按在数组中的顺序显示。调整数组中的位置即可改变顺序。

### Q: 如何添加视频内容？
A: 目前系统主要支持图片，如需添加视频，需要扩展数据结构和渲染逻辑。

### Q: 如何处理长标题？
A: CSS已经处理了长标题的显示，会自动换行。如果需要特殊处理，可以在CSS中调整。

### Q: 如何批量更新多个展览？
A: 建议使用代码编辑器的查找替换功能，或编写简单的脚本来批量处理。

## 维护注意事项

1. **备份**：修改前请备份原文件
2. **测试**：修改后在本地测试确认无误
3. **语法检查**：确保JavaScript语法正确
4. **图片检查**：确认所有图片路径正确且文件存在
5. **多语言检查**：确认中英文内容都已正确填写

## 扩展功能建议

1. **搜索功能**：添加展览搜索功能
2. **标签系统**：为展览添加标签分类
3. **时间筛选**：添加按时间范围筛选功能
4. **分享功能**：添加社交媒体分享按钮
5. **评论系统**：允许访客留言评论 