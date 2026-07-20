# Zhou Jing Portfolio

周婧的双语静态作品集网站，包含作品、展览、艺术家介绍、媒体报道、工作室与联系页面。

## 快速开始

需要 Node.js 20+ 与 Python 3：

```bash
npm ci
npm run check
npm run serve
```

访问 `http://localhost:8000`。网站无需构建步骤，顶层 HTML 文件即为线上页面。

## 工程结构

```text
├── *.html                 # 线上页面
├── css/
│   ├── base/              # 变量、重置与全局规则
│   ├── components/        # 可复用组件
│   └── pages/             # 页面专用样式
├── js/                    # 交互和内容数据
├── images/                # 原始素材与优化后的展示图
├── tools/                 # 素材生成和站点校验脚本
└── .github/workflows/     # 持续集成
```

## 常用命令

| 命令 | 用途 |
| --- | --- |
| `npm run check` | 校验语法、基础元数据、本地资源、内容数据与禁用的内联点击事件 |
| `npm run serve` | 启动本地静态服务器 |
| `npm run smoke` | 在本地服务启动后检查全部线上入口页 |

## 内容维护

详情见 [CONTRIBUTING.md](CONTRIBUTING.md)。展览字段和新增流程见 [EXHIBITIONS_CONFIG.md](EXHIBITIONS_CONFIG.md)。

## 发布

该项目可以直接部署到任意静态托管平台。GitHub Actions 会在推送和拉取请求时执行质量校验；通过后再发布即可。
