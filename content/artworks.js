// Canonical content source. Do not add rendering logic here.
(function () {
    window.siteContentData = window.siteContentData || {};
// 作品集数据 - 专业艺术品展示
window.siteContentData.artworks = [
    {
        id: "gallery-painting-01",
        title: {
            zh: "芽",
            en: "Sprout"
        },
        medium: {
            zh: "丙烯 & 综合材料",
            en: "Acrylic & Mixed Media"
        },
        size: "60cm × 60cm",
        year: "2023",
        price: {
            zh: "¥36,000",
            en: "$5,000"
        },
        status: "available", // available, sold, reserved
        image: "images/paintings/painting_01.jpg",
        description: {
            zh: "探索内心世界的色彩表达，通过抽象的形式语言展现情感的深度与复杂性。",
            en: "Exploring the color expression of the inner world, showing the depth and complexity of emotions through abstract formal language."
        },
        category: "painting",
        featured: false,
        sortWeight: 2
    },
    {
        id: "gallery-painting-02",
        title: {
            zh: "翡翠之光",
            en: "Emerald Light"
        },
        medium: {
            zh: "丙烯 & 综合材料",
            en: "Acrylic & Mixed Media"
        },
        size: "60cm × 60cm",
        year: "2023",
        price: {
            zh: "¥36,000",
            en: "$5,000"
        },
        status: "available",
        image: "images/paintings/painting_02.jpg",
        description: {
            zh: "不同色彩之间的对话与碰撞，创造出充满张力的视觉体验。",
            en: "The dialogue and collision between different colors creates a visual experience full of tension."
        },
        category: "mixed-media",
        featured: true,
        sortWeight: 102
    },
    {
        id: "gallery-painting-03",
        title: {
            zh: "剪影",
            en: "Silhouette"
        },
        medium: {
            zh: "丙烯 & 综合材料",
            en: "Acrylic & Mixed Media"
        },
        size: "80cm × 80cm",
        year: "2024",
        price: {
            zh: "¥48,000",
            en: "$7,000"
        },
        status: "available",
        image: "images/paintings/painting_03.jpg",
        description: {
            zh: "纯粹的抽象表达，通过色彩和形式的自由组合传达艺术家的内在感受。",
            en: "Pure abstract expression, conveying the artist's inner feelings through free combination of colors and forms."
        },
        category: "painting",
        featured: false,
        sortWeight: 3
    },
    {
        id: "gallery-painting-04",
        title: {
            zh: "靛蓝",
            en: "Indigo Blue"
        },
        medium: {
            zh: "丙烯 & 综合材料",
            en: "Acrylic & Mixed Media"
        },
        size: "60cm × 60cm",
        year: "2023",
        price: {
            zh: "¥36,000",
            en: "$5,000"
        },
        status: "reserved",
        image: "images/paintings/painting_04.png",
        description: {
            zh: "水彩的流动性完美诠释了情感的变化与流转。",
            en: "The fluidity of watercolor perfectly interprets the change and flow of emotions."
        },
        category: "watercolor",
        featured: false,
        sortWeight: 4
    },
    {
        id: "gallery-painting-05",
        title: {
            zh: "清逸之华",
            en: "Graceful Bloom"
        },
        medium: {
            zh: "综合材料",
            en: "Mixed Media"
        },
        size: "60cm × 60cm",
        year: "2023",
        price: {
            zh: "¥36,000",
            en: "$5,000"
        },
        status: "available",
        image: "images/paintings/painting_05.jpg",
        description: {
            zh: "不同文化元素的融合与碰撞，展现当代艺术的多元化特征。",
            en: "The fusion and collision of different cultural elements, showing the diversification characteristics of contemporary art."
        },
        category: "mixed-media",
        featured: true,
        sortWeight: 5
    },
    {
        id: "gallery-painting-06",
        title: {
            zh: "樱",
            en: "Sakura"
        },
        medium: {
            zh: "综合材料",
            en: "Mixed Media"
        },
        size: "60cm × 60cm",
        year: "2022",
        price: {
            zh: "¥36,000",
            en: "$5,400"
        },
        status: "available",
        image: "images/paintings/painting_06.jpg",
        description: {
            zh: "时间在画布上留下的痕迹，记录着艺术家创作历程中的重要时刻。",
            en: "The traces left by time on the canvas, recording important moments in the artist's creative journey."
        },
        category: "painting",
        featured: false,
        sortWeight: 6
    },
    {
        id: "gallery-painting-07",
        title: {
            zh: "绯色格韵",
            en: "Crimson Rhythm"
        },
        medium: {
            zh: "丙烯 & 综合材料",
            en: "Acrylic & Mixed Media"
        },
        size: "60cm × 60cm",
        year: "2024",
        price: {
            zh: "¥36,000",
            en: "$5,000"
        },
        status: "available",
        image: "images/paintings/painting_07.jpg",
        description: {
            zh: "如音乐般的视觉旋律，抽象形式中蕴含着深层的情感共鸣。",
            en: "A visual melody like music, containing deep emotional resonance in abstract forms."
        },
        category: "painting",
        featured: true,
        sortWeight: 7
    },
    {
        id: "gallery-painting-08",
        title: {
            zh: "青橙织章",
            en: "Blue-Orange Weave"
        },
        medium: {
            zh: "丙烯",
            en: "Acrylic"
        },
        size: "80cm × 80cm",
        year: "2023",
        price: {
            zh: "¥48,000",
            en: "$7,000"
        },
        status: "available",
        image: "images/paintings/painting_08.jpg",
        description: {
            zh: "现代都市生活的抽象表达，探索城市节奏与人文情怀的平衡。",
            en: "Abstract expression of modern urban life, exploring the balance between city rhythm and humanistic feelings."
        },
        category: "mixed-media",
        featured: false,
        sortWeight: 8
    },
    {
        id: "gallery-painting-09",
        title: {
            zh: "记忆碎片",
            en: "Memory Fragments"
        },
        medium: {
            zh: "综合材料",
            en: "Mixed Media"
        },
        size: "30cm × 30cm",
        year: "2022",
        price: {
            zh: "¥18,000",
            en: "$2,700"
        },
        status: "available",
        image: "images/paintings/painting_09.jpg",
        description: {
            zh: "破碎与重组的记忆片段，诉说着时间流逝中的点点滴滴。",
            en: "Fragmented and reconstructed memory pieces, telling the bits and pieces in the passage of time."
        },
        category: "watercolor",
        featured: false,
        sortWeight: 9
    },
    {
        id: "gallery-painting-10",
        title: {
            zh: "珠韵织章",
            en: "Pearl Rhythm"
        },
        medium: {
            zh: "综合材料",
            en: "Mixed Media"
        },
        size: "30cm × 30cm",
        year: "2023",
        price: {
            zh: "¥18,000",
            en: "$2,700"
        },
        status: "available",
        image: "images/paintings/painting_10.jpg",
        description: {
            zh: "金色的希望与憧憬，描绘着心中理想的远方。",
            en: "Golden hope and longing, depicting the ideal distant place in the heart."
        },
        category: "painting",
        featured: false,
        sortWeight: 10
    },
    {
        id: "gallery-painting-11",
        title: {
            zh: "漾彩",
            en: "Rippling Colors"
        },
        medium: {
            zh: "丙烯",
            en: "Acrylic"
        },
        size: "60cm × 130cm",
        year: "2024",
        price: {
            zh: "¥57,000",
            en: "$8,500"
        },
        status: "available",
        image: "images/paintings/painting_11.jpg",
        description: {
            zh: "科技与自然的完美融合，展现当代艺术的无限可能。",
            en: "Perfect fusion of technology and nature, showing infinite possibilities of contemporary art."
        },
        category: "digital",
        featured: false,
        sortWeight: 11
    },
    {
        id: "gallery-painting-12",
        title: {
            zh: "彩格",
            en: "Color Grid"
        },
        medium: {
            zh: "丙烯 & 综合材料",
            en: "Acrylic & Mixed Media"
        },
        size: "60cm × 130cm",
        year: "2022",
        price: {
            zh: "¥57,000",
            en: "$8,500"
        },
        status: "available",
        image: "images/paintings/painting_12.jpg",
        description: {
            zh: "内心情感的地理图谱，每一处肌理都承载着不同的情绪。",
            en: "A geographical map of inner emotions, each texture carries different emotions."
        },
        category: "mixed-media",
        featured: false,
        sortWeight: 12
    },
    {
        id: "gallery-painting-13",
        title: {
            zh: "静谧",
            en: "Tranquility"
        },
        medium: {
            zh: "丙烯 & 综合材料",
            en: "Acrylic & Mixed Media"
        },
        size: "100cm × 100cm",
        year: "2024",
        price: {
            zh: "¥14,000",
            en: "$2,100"
        },
        status: "sold",
        image: "images/paintings/painting_13.jpg",
        description: {
            zh: "东方美学的现代诠释，在黑白之间寻找平衡与和谐。",
            en: "Modern interpretation of Eastern aesthetics, seeking balance and harmony between black and white."
        },
        category: "ink",
        featured: true,
        sortWeight: 13
    },
    {
        id: "gallery-painting-14",
        title: {
            zh: "花簇",
            en: "Cluster of Flowers"
        },
        medium: {
            zh: "丙烯",
            en: "Acrylic"
        },
        size: "100cm × 100cm",
        year: "2024",
        price: {
            zh: "¥28,000",
            en: "$4,200"
        },
        status: "available",
        image: "images/paintings/painting_14.jpg",
        description: {
            zh: "宇宙能量的视觉呈现，探索生命与宇宙的神秘联系。",
            en: "Visual representation of cosmic energy, exploring the mysterious connection between life and the universe."
        },
        category: "painting",
        featured: false,
        sortWeight: 14
    },
    {
        id: "gallery-painting-15",
        title: {
            zh: "江南小镇上的乌篷船",
            en: "Wupeng Boat in a Jiangnan Town"
        },
        medium: {
            zh: "丙烯 & 综合材料",
            en: "Acrylic & Mixed Media"
        },
        size: "60cm × 60cm",
        year: "2023",
        price: {
            zh: "¥17,000",
            en: "$2,500"
        },
        status: "sold",
        image: "images/paintings/painting_15.jpg",
        description: {
            zh: "触觉与视觉的双重体验，材料本身就是艺术语言。",
            en: "Dual experience of tactile and visual, the material itself is the artistic language."
        },
        category: "sculpture",
        featured: false,
        sortWeight: 15
    },
    {
        id: "gallery-painting-16",
        title: {
            zh: "江南小镇上的乌篷船 2",
            en: "Wupeng Boat in a Jiangnan Town 2"
        },
        medium: {
            zh: "综合材料",
            en: "Mixed Media"
        },
        size: "60cm × 60cm",
        year: "2023",
        price: {
            zh: "¥25,000",
            en: "$3,700"
        },
        status: "sold",
        image: "images/paintings/painting_16.jpg",
        description: {
            zh: "东西方文化的碰撞与融合，展现全球化时代的艺术思考。",
            en: "Collision and fusion of Eastern and Western cultures, showing artistic thinking in the era of globalization."
        },
        category: "painting",
        featured: true,
        sortWeight: 16
    },
    {
        id: "gallery-painting-17",
        title: {
            zh: "魔方大厦",
            en: "Cube Mansion"
        },
        medium: {
            zh: "丙烯 & 综合材料",
            en: "Acrylic & Mixed Media"
        },
        size: "100cm × 100cm",
        year: "2025",
        price: {
            zh: "¥9,000",
            en: "$1,350"
        },
        status: "available",
        image: "images/paintings/painting_17.jpg",
        description: {
            zh: "简约而不简单，在极简中寻找艺术的本质力量。",
            en: "Simple but not simplistic, seeking the essential power of art in minimalism."
        },
        category: "painting",
        featured: true,
        sortWeight: 101
    },
    {
        id: "gallery-painting-18",
        title: {
            zh: "流沙",
            en: "Seasonal Transition"
        },
        medium: {
            zh: "丙烯",
            en: "Acrylic"
        },
        size: "60cm × 60cm",
        year: "2022",
        price: {
            zh: "¥19,000",
            en: "$2,800"
        },
        status: "reserved",
        image: "images/paintings/painting_18.jpg",
        description: {
            zh: "四季轮回的生命哲学，感受自然变化中的美学节奏。",
            en: "Life philosophy of seasonal cycles, feeling the aesthetic rhythm in natural changes."
        },
        category: "watercolor",
        featured: false,
        sortWeight: 18
    },
    {
        id: "gallery-painting-19",
        title: {
            zh: "软绵绵",
            en: "Soft and Fluffy"
        },
        medium: {
            zh: "丙烯 & 综合材料",
            en: "Acrylic & Mixed Media"
        },
        size: "80cm × 80cm",
        year: "2025",
        price: {
            zh: "¥21,000",
            en: "$3,100"
        },
        status: "available",
        image: "images/paintings/painting_19.jpg",
        description: {
            zh: "现代都市人的内心独白，探索繁华背后的孤独感受。",
            en: "Inner monologue of modern urban people, exploring the sense of loneliness behind prosperity."
        },
        category: "painting",
        featured: false,
        sortWeight: 19
    },
    {
        id: "gallery-painting-20",
        title: {
            zh: "经纶",
            en: "Co-Creation"
        },
        medium: {
            zh: "综合材料",
            en: "Mixed Media"
        },
        size: "50cm × 50cm",
        year: "2023",
        price: {
            zh: "¥36,000",
            en: "$5,400"
        },
        status: "available",
        image: "images/paintings/painting_20.png",
        description: {
            zh: "艺术创作的无限可能性，邀请观者参与共同创造的过程。",
            en: "Infinite possibilities of artistic creation, inviting viewers to participate in the process of co-creation."
        },
        category: "installation",
        featured: true,
        sortWeight: 20
    },
    {
        id: "gallery-painting-21",
        title: {
            zh: "轮回",
            en: "Cycle"
        },
        medium: {
            zh: "综合材料",
            en: "Mixed Media"
        },
        size: "40cm × 40cm",
        year: "2019",
        price: {
        },
        status: "sold",
        image: "images/paintings/painting_21.png",
        description: {
            zh: "艺术创作的无限可能性，邀请观者参与共同创造的过程。",
            en: "Infinite possibilities of artistic creation, inviting viewers to participate in the process of co-creation."
        },
        category: "installation",
        featured: false,
        sortWeight: 1
    },
    {
        id: "gallery-painting-22",
        title: {
            zh: "光束",
            en: "Beam of Light"
        },
        medium: {
            zh: "综合材料",
            en: "Mixed Media"
        },
        size: "50cm × 50cm",
        year: "2019",
        price: {
        },
        status: "sold",
        image: "images/paintings/painting_22.png",
        description: {
            zh: "艺术创作的无限可能性，邀请观者参与共同创造的过程。",
            en: "Infinite possibilities of artistic creation, inviting viewers to participate in the process of co-creation."
        },
        category: "installation",
        featured: false,
        sortWeight: 1
    },
    {
        id: "gallery-painting-23",
        title: {
            zh: "仲夏星空",
            en: "Midsummer Night Sky"
        },
        medium: {
            zh: "综合材料",
            en: "Mixed Media"
        },
        size: "60cm × 40cm",
        year: "2019",
        price: {
        },
        status: "sold",
        image: "images/paintings/painting_23.png",
        description: {
            zh: "艺术创作的无限可能性，邀请观者参与共同创造的过程。",
            en: "Infinite possibilities of artistic creation, inviting viewers to participate in the process of co-creation."
        },
        category: "installation",
        featured: false,
        sortWeight: 1
    },
    {
        id: "gallery-painting-24",
        title: {
            zh: "仲夏星空 2",
            en: "Midsummer Night Sky 2"
        },
        medium: {
            zh: "综合材料",
            en: "Mixed Media"
        },
        size: "60cm × 40cm",
        year: "2018",
        price: {
        },
        status: "sold",
        image: "images/paintings/painting_24.png",
        description: {
            zh: "艺术创作的无限可能性，邀请观者参与共同创造的过程。",
            en: "Infinite possibilities of artistic creation, inviting viewers to participate in the process of co-creation."
        },
        category: "installation",
        featured: false,
        sortWeight: 1
    },
    {
        id: "gallery-painting-25",
        title: {
            zh: "光束 2",
            en: "Beam of Light 2"
        },
        medium: {
            zh: "综合材料",
            en: "Mixed Media"
        },
        size: "50cm × 50cm",
        year: "2018",
        price: {
        },
        status: "sold",
        image: "images/paintings/painting_25.png",
        description: {
            zh: "艺术创作的无限可能性，邀请观者参与共同创造的过程。",
            en: "Infinite possibilities of artistic creation, inviting viewers to participate in the process of co-creation."
        },
        category: "installation",
        featured: false,
        sortWeight: 1
    },
    {
        id: "gallery-painting-26",
        title: {
            zh: "日光涡旋",
            en: "Sunlight Vortex"
        },
        medium: {
            zh: "综合材料",
            en: "Mixed Media"
        },
        size: "50cm × 50cm",
        year: "2018",
        price: {
        },
        status: "sold",
        image: "images/paintings/painting_26.png",
        description: {
            zh: "艺术创作的无限可能性，邀请观者参与共同创造的过程。",
            en: "Infinite possibilities of artistic creation, inviting viewers to participate in the process of co-creation."
        },
        category: "installation",
        featured: false,
        sortWeight: 1
    },
    {
        id: "gallery-painting-27",
        title: {
            zh: "仲夏星空 3",
            en: "Midsummer Night Sky 3"
        },
        medium: {
            zh: "综合材料",
            en: "Mixed Media"
        },
        size: "60cm × 60cm",
        year: "2018",
        price: {
        },
        status: "sold",
        image: "images/paintings/painting_27.png",
        description: {
            zh: "艺术创作的无限可能性，邀请观者参与共同创造的过程。",
            en: "Infinite possibilities of artistic creation, inviting viewers to participate in the process of co-creation."
        },
        category: "installation",
        featured: false,
        sortWeight: 1
    },
    {
        id: "gallery-painting-28",
        title: {
            zh: "仲夏星空 4",
            en: "Midsummer Night Sky 4"
        },
        medium: {
            zh: "综合材料",
            en: "Mixed Media"
        },
        size: "50cm × 30cm",
        year: "2018",
        price: {
        },
        status: "sold",
        image: "images/paintings/painting_28.png",
        description: {
            zh: "艺术创作的无限可能性，邀请观者参与共同创造的过程。",
            en: "Infinite possibilities of artistic creation, inviting viewers to participate in the process of co-creation."
        },
        category: "installation",
        featured: false,
        sortWeight: 1
    },
    {
        id: "gallery-painting-29",
        title: {
            zh: "轮回 2",
            en: "Cycle 2"
        },
        medium: {
            zh: "综合材料",
            en: "Mixed Media"
        },
        size: "50cm × 50cm",
        year: "2017",
        price: {
        },
        status: "sold",
        image: "images/paintings/painting_29.png",
        description: {
            zh: "艺术创作的无限可能性，邀请观者参与共同创造的过程。",
            en: "Infinite possibilities of artistic creation, inviting viewers to participate in the process of co-creation."
        },
        category: "installation",
        featured: false,
        sortWeight: 1
    },
    {
        id: "gallery-painting-30",
        title: {
            zh: "梅果",
            en: "Plum Fruit"
        },
        medium: {
            zh: "综合材料",
            en: "Mixed Media"
        },
        size: "50cm × 50cm",
        year: "2017",
        price: {
        },
        status: "sold",
        image: "images/paintings/painting_30.png",
        description: {
            zh: "艺术创作的无限可能性，邀请观者参与共同创造的过程。",
            en: "Infinite possibilities of artistic creation, inviting viewers to participate in the process of co-creation."
        },
        category: "installation",
        featured: false,
        sortWeight: 1
    },
    {
        id: "gallery-painting-31",
        title: {
            zh: "最初",
            en: "The Beginning"
        },
        medium: {
            zh: "综合材料",
            en: "Mixed Media"
        },
        size: "50cm × 50cm",
        year: "2017",
        price: {
        },
        status: "sold",
        image: "images/paintings/painting_31.png",
        description: {
            zh: "艺术创作的无限可能性，邀请观者参与共同创造的过程。",
            en: "Infinite possibilities of artistic creation, inviting viewers to participate in the process of co-creation."
        },
        category: "installation",
        featured: false,
        sortWeight: 1
    },
    {
        id: "gallery-painting-32",
        title: {
            zh: "光束 3",
            en: "Beam of Light 3"
        },
        medium: {
            zh: "综合材料",
            en: "Mixed Media"
        },
        size: "50cm × 50cm",
        year: "2017",
        price: {
        },
        status: "sold",
        image: "images/paintings/painting_32.png",
        description: {
            zh: "艺术创作的无限可能性，邀请观者参与共同创造的过程。",
            en: "Infinite possibilities of artistic creation, inviting viewers to participate in the process of co-creation."
        },
        category: "installation",
        featured: false,
        sortWeight: 1
    },
    {
        id: "gallery-painting-33",
        title: {
            zh: "玫紫绮梦",
            en: "Purple Dream"
        },
        medium: {
            zh: "综合材料",
            en: "Mixed Media"
        },
        size: "30cm × 30cm",
        year: "2023",
        price: {
        },
        status: "available",
        image: "images/paintings/painting_33.jpg",
        description: {
            zh: "艺术创作的无限可能性，邀请观者参与共同创造的过程。",
            en: "Infinite possibilities of artistic creation, inviting viewers to participate in the process of co-creation."
        },
        category: "installation",
        featured: false,
        sortWeight: 10
    },
    {
        id: "gallery-painting-34",
        title: {
            zh: "一朵小花",
            en: "A Little Flower"
        },
        medium: {
            zh: "综合材料",
            en: "Mixed Media"
        },
        size: "80cm × 80cm",
        year: "2025",
        price: {
        },
        status: "available",
        image: "images/paintings/painting_34.jpg",
        description: {
            zh: "艺术创作的无限可能性，邀请观者参与共同创造的过程。",
            en: "Infinite possibilities of artistic creation, inviting viewers to participate in the process of co-creation."
        },
        category: "installation",
        featured: true,
        sortWeight: 34
    },
    {
        id: "gallery-painting-35",
        title: {
            zh: "荔枝味的汽泡小狗",
            en: "The Litchi-Flavored Bubble Dog"
        },
        medium: {
            zh: "综合材料",
            en: "Mixed Media"
        },
        size: "80cm × 80cm",
        year: "2025",
        price: {
        },
        status: "available",
        image: "images/paintings/painting_35.jpg",
        description: {
            zh: "艺术创作的无限可能性，邀请观者参与共同创造的过程。",
            en: "Infinite possibilities of artistic creation, inviting viewers to participate in the process of co-creation."
        },
        category: "installation",
        featured: false,
        sortWeight: 35
    },
    {
        id: "gallery-painting-36",
        title: {
            zh: "复古奢华",
            en: "Vintage Luxury"
        },
        medium: {
            zh: "综合材料",
            en: "Mixed Media"
        },
        size: "30cm × 30cm",
        year: "2025",
        price: {
            zh: "¥18,000",
            en: "$2,700"
        },
        status: "available",
        image: "images/paintings/painting_36.jpg",
        description: {
            zh: "艺术创作的无限可能性，邀请观者参与共同创造的过程。",
            en: "Infinite possibilities of artistic creation, inviting viewers to participate in the process of co-creation."
        },
        category: "installation",
        featured: false,
        sortWeight: 36
    },
    {
        id: "gallery-painting-37",
        title: {
            zh: "狂躁的午后",
            en: "Wild Afternoon"
        },
        medium: {
            zh: "综合材料",
            en: "Mixed Media"
        },
        size: "60cm × 60cm",
        year: "2024",
        price: {
            zh: "¥18,000",
            en: "$2,700"
        },
        status: "available",
        image: "images/paintings/painting_37.png",
        description: {
            zh: "艺术创作的无限可能性，邀请观者参与共同创造的过程。",
            en: "Infinite possibilities of artistic creation, inviting viewers to participate in the process of co-creation."
        },
        category: "installation",
        featured: false,
        sortWeight: 100
    },
    {
        id: "gallery-painting-38",
        title: {
            zh: "镜像",
            en: "Mirror"
        },
        medium: {
            zh: "丙烯和混合材料",
            en: "Acrylic & Mixed Media"
        },
        size: "76.2cm × 101.6cm",
        year: "2026",
        price: {
            zh: "¥42,000",
            en: "$6,000"
        },
        status: "available",
        image: "images/paintings/painting_38.png",
        description: {
            zh: "这是一个有关于镜像的故事，镜中之影，如梦如幻，虚实之间，引人深思",
            en: "This is a story about mirrors, mirror shadows, as dreamy and illusory as a dream, between reality and illusion"
        },
        category: "installation",
        featured: true,
        sortWeight: 300
    },
    {
        id: "gallery-painting-39",
        title: {
            zh: "猫的月光披风",
            en: "Cat's Moonlight Cloak"
        },
        medium: {
            zh: "丙烯和混合材料",
            en: "Acrylic & Mixed Media"
        },
        size: "50cm × 40cm",
        year: "2026",
        price: {
            zh: "¥42,000",
            en: "$6,000"
        },
        status: "available",
        image: "images/paintings/painting_39.png",
        description: {
            zh: "一只猫安静地蜷伏在画面中，修长的尾巴绕过身体，像一道柔软的弧线。它的身体覆盖着淡黄、粉紫与深靛色的细密纹样，仿佛披着由月光、织物与梦境编成的披风；既神秘，又带着温柔而沉静的守护感。",
            en: "A cat sits quietly in the scene, its long tail wrapping around its body like a soft arc. Its form is covered with delicate patterns of light yellow, pinkish purple, and deep indigo, as if draped in a cloak woven from moonlight, fabric, and dreams; both mysterious and filled with a gentle, serene sense of protection."
        },
        category: "installation",
        featured: true,
        sortWeight: 299
    },
    {
        id: "gallery-painting-40",
        title: {
            zh: "粉色地毯上的舞步",
            en: "Dance on the Pink Carpet"
        },
        medium: {
            zh: "丙烯和混合材料",
            en: "Acrylic & Mixed Media"
        },
        size: "101.6cm × 76.2cm",
        year: "2026",
        price: {
            zh: "¥42,000",
            en: "$6,000"
        },
        status: "available",
        image: "images/paintings/painting_40.png",
        description: {
            zh: "鲜艳的粉色底纹如同一张庆典地毯，黄色、蓝色与浅紫色的几何图形在其中自由排列，像正在旋转、跳跃的舞者。深紫色的毛边框住这场热闹的视觉舞会，使整幅作品带着织物、拼贴与节日装饰般的温度。",
            en: "Bright pink background resembles a celebration carpet, with yellow, blue, and light purple geometric shapes arranged freely within it, like dancers spinning and jumping. The deep purple fringe frames this lively visual dance, giving the entire piece a warm, textile, collage, and festival decoration feel."
        },
        category: "installation",
        featured: true,
        sortWeight: 298
    },
    {
        id: "gallery-painting-41",
        title: {
            zh: "草莓的节日",
            en: "Strawberry Festival"
        },
        medium: {
            zh: "丙烯和混合材料",
            en: "Acrylic & Mixed Media"
        },
        size: "80cm × 80cm",
        year: "2026",
        price: {
            zh: "¥42,000",
            en: "$6,000"
        },
        status: "available",
        image: "images/paintings/painting_41.png",
        description: {
            zh: "一颗硕大的草莓以明快的红、蓝、黄和银白色纹样铺展开来，既像一枚甜美的果实，也像一片充满节奏的织物。背景中放射状的花纹与果实内部的密集图案相互呼应，让画面洋溢着热烈、轻快而童真的生命力。",
            en: "A large strawberry unfolds in bright red, blue, yellow, and silver-white patterns, resembling both a sweet fruit and a piece of rhythmic fabric. The radiating patterns in the background echo the dense patterns inside the fruit, filling the composition with a lively, cheerful, and childlike vitality."
        },
        category: "installation",
        featured: true,
        sortWeight: 297
    }

];


}());
