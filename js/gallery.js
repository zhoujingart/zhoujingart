// 作品集数据 - 专业艺术品展示
const artworksData = [
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
    }

];

// 初始化排序权重与原始索引（用于默认排序：权重高者在前，权重相同按初始顺序）
artworksData.forEach((artwork, index) => {
    if (typeof artwork.sortWeight !== 'number') {
        artwork.sortWeight = 0;
    }
    artwork.__initialIndex = index;
});

// 当前语言、筛选和排序状态
let currentLang = 'zh';
let currentFilter = 'all';
let currentSort = 'default';

// 图片模态框相关变量
let imageModal, imageModalImg, imageModalTitle;

// DOM加载完成后初始化
document.addEventListener('DOMContentLoaded', function () {
    // 等待语言管理器初始化完成
    function initGallery() {
        if (window.languageManager && window.languageManager.isInitialized) {
            currentLang = window.languageManager.currentLang;
            initSortControls();
            initScrollOptimization();
            renderGallery();
            initImageModal();
        } else {
            setTimeout(initGallery, 50);
        }
    }

    if (document.readyState === 'complete') {
        initGallery();
    } else {
        window.addEventListener('load', initGallery);
    }
});

// 滚动优化：滚动时禁用 hover 效果
function initScrollOptimization() {
    let scrollTimer;
    const body = document.body;

    window.addEventListener('scroll', function () {
        body.classList.add('is-scrolling');

        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(function () {
            body.classList.remove('is-scrolling');
        }, 150);
    }, { passive: true });
}

// 监听语言切换事件
document.addEventListener('languageChanged', function (e) {
    currentLang = e.detail.language;
    updateSortControlsText();
    renderGallery();
});

// 初始化排序控制器
function initSortControls() {
    initCustomSelect();
    updateSortControlsText();
}

// 初始化自定义选择器
function initCustomSelect() {
    const customSelect = document.getElementById('customSelect');
    const selectTrigger = customSelect?.querySelector('.select-trigger');
    const selectOptions = customSelect?.querySelector('.select-options');
    const selectText = customSelect?.querySelector('.select-text');
    const hiddenSelect = document.getElementById('sortSelect');

    if (!customSelect || !selectTrigger || !selectOptions || !selectText) return;

    // 点击触发器切换下拉菜单
    selectTrigger.addEventListener('click', function (e) {
        e.stopPropagation();
        toggleCustomSelect();
    });

    // 选项点击事件
    selectOptions.addEventListener('click', function (e) {
        const option = e.target.closest('.select-option');
        if (!option) return;

        const value = option.dataset.value;
        const text = option.querySelector('span').textContent;

        // 更新选中状态
        selectOptions.querySelectorAll('.select-option').forEach(opt => {
            opt.classList.remove('active');
        });
        option.classList.add('active');

        // 更新显示文本
        selectText.textContent = text;

        // 更新隐藏的select值
        if (hiddenSelect) {
            hiddenSelect.value = value;
        }

        // 更新排序
        currentSort = value;
        renderGallery();

        // 关闭下拉菜单
        closeCustomSelect();

        // 添加视觉反馈
        const sortControls = document.querySelector('.sort-controls-premium');
        if (sortControls) {
            sortControls.style.transform = 'translateY(-4px) scale(0.98)';
            setTimeout(() => {
                sortControls.style.transform = '';
            }, 200);
        }
    });

    // 点击外部区域关闭
    document.addEventListener('click', function (e) {
        if (!customSelect.contains(e.target)) {
            closeCustomSelect();
        }
    });

    // ESC键关闭
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            closeCustomSelect();
        }
    });

    // 设置初始值
    const defaultOption = selectOptions.querySelector(`[data-value="${currentSort}"]`);
    if (defaultOption) {
        defaultOption.classList.add('active');
        selectText.textContent = defaultOption.querySelector('span').textContent;
    }
}

// 切换自定义选择器
function toggleCustomSelect() {
    const customSelect = document.getElementById('customSelect');
    if (!customSelect) return;

    if (customSelect.classList.contains('open')) {
        closeCustomSelect();
    } else {
        openCustomSelect();
    }
}

// 打开自定义选择器
function openCustomSelect() {
    const customSelect = document.getElementById('customSelect');
    if (!customSelect) return;

    customSelect.classList.add('open');

    // 关闭其他可能打开的下拉菜单
    document.querySelectorAll('.custom-select.open').forEach(select => {
        if (select !== customSelect) {
            select.classList.remove('open');
        }
    });
}

// 关闭自定义选择器
function closeCustomSelect() {
    const customSelect = document.getElementById('customSelect');
    if (!customSelect) return;

    customSelect.classList.remove('open');
}

// 更新排序控制器文本
function updateSortControlsText() {
    if (!window.languageManager) return;

    // 更新自定义选择器显示文本
    const customSelect = document.getElementById('customSelect');
    const selectText = customSelect?.querySelector('.select-text');
    const activeOption = customSelect?.querySelector('.select-option.active');

    if (selectText && activeOption) {
        const spanElement = activeOption.querySelector('span');
        if (spanElement) {
            const i18nKey = spanElement.getAttribute('data-i18n');
            if (i18nKey) {
                const translatedText = window.languageManager.getTranslation(i18nKey);
                if (translatedText) {
                    selectText.textContent = translatedText;
                }
            }
        }
    }

    // 更新隐藏的select选项文本（用于可访问性）
    const hiddenSelect = document.getElementById('sortSelect');
    if (hiddenSelect) {
        const options = hiddenSelect.querySelectorAll('option');
        if (options.length >= 3) {
            options[0].textContent = window.languageManager.getTranslation('gallery.sortDefault') || '默认排序';
            options[1].textContent = window.languageManager.getTranslation('gallery.sortByYearDesc') || '按年份 (新→旧)';
            options[2].textContent = window.languageManager.getTranslation('gallery.sortByYearAsc') || '按年份 (旧→新)';
        }

        // 更新select的aria-label
        const sortByText = window.languageManager.getTranslation('gallery.sortBy') || '排序方式';
        hiddenSelect.setAttribute('aria-label', sortByText);
    }
}

// 获取翻译文本
function getArtworkText(artwork, field) {
    const text = artwork[field];
    if (typeof text === 'object' && text[currentLang]) {
        return text[currentLang];
    }
    return text || '';
}

// 获取状态显示文本
function getStatusText(status) {
    const statusTexts = {
        available: { zh: "可购买", en: "Available" },
        sold: { zh: "已售出", en: "Sold Out" },
        reserved: { zh: "已预定", en: "Reserved" }
    };
    return statusTexts[status] ? statusTexts[status][currentLang] : status;
}

// 获取状态CSS类
function getStatusClass(status) {
    return `gallery-artwork-status-${status}`;
}

// 渲染作品集
function renderGallery() {
    const container = document.querySelector('.gallery-grid');
    if (!container) return;

    // 使用 requestAnimationFrame 优化渲染性能
    requestAnimationFrame(() => {
        container.innerHTML = '';

        // 根据筛选条件过滤作品
        const filteredArtworks = currentFilter === 'all'
            ? [...artworksData]
            : artworksData.filter(artwork => artwork.category === currentFilter);

        // 根据当前排序方式排序
        sortArtworks(filteredArtworks);

        // 使用 DocumentFragment 批量插入DOM，减少重排
        const fragment = document.createDocumentFragment();

        filteredArtworks.forEach(artwork => {
            const artworkElement = createArtworkElement(artwork);
            fragment.appendChild(artworkElement);
        });

        container.appendChild(fragment);
    });
}

// 排序作品
function sortArtworks(artworks) {
    switch (currentSort) {
        case 'year-desc':
            // 按年份降序：最新在前
            artworks.sort((a, b) => {
                return parseInt(b.year) - parseInt(a.year);
            });
            break;
        case 'year-asc':
            // 按年份升序：最旧在前
            artworks.sort((a, b) => {
                return parseInt(a.year) - parseInt(b.year);
            });
            break;
        case 'default':
        default:
            // 默认排序：按可配置权重降序，权重相同按初始顺序稳定排序
            artworks.sort((a, b) => {
                const wa = typeof a.sortWeight === 'number' ? a.sortWeight : 0;
                const wb = typeof b.sortWeight === 'number' ? b.sortWeight : 0;
                if (wb !== wa) return wb - wa; // 权重高者在前
                const ia = typeof a.__initialIndex === 'number' ? a.__initialIndex : artworksData.findIndex(it => it.id === a.id);
                const ib = typeof b.__initialIndex === 'number' ? b.__initialIndex : artworksData.findIndex(it => it.id === b.id);
                return ia - ib; // 稳定：原始顺序
            });
            break;
    }
}

// 创建作品元素
function createArtworkElement(artwork) {
    const element = document.createElement('div');
    element.className = 'gallery-artwork-card';
    element.setAttribute('data-artwork-id', artwork.id);

    // 检测是否为移动端
    const isMobile = window.innerWidth <= 768;

    const title = getArtworkText(artwork, 'title');
    const medium = getArtworkText(artwork, 'medium');
    const description = getArtworkText(artwork, 'description');
    const price = getArtworkText(artwork, 'price');
    const statusText = getStatusText(artwork.status);
    const statusClass = getStatusClass(artwork.status);

    element.innerHTML = `
        <div class="gallery-artwork-image-container">
            <img src="${artwork.image}" 
                 alt="${title}" 
                 class="gallery-artwork-image"
                 loading="lazy"
                 decoding="async"
                 onload="this.classList.add('is-loaded')">
            <div class="gallery-artwork-overlay">
                <div class="gallery-artwork-actions">
                    <button class="action-btn view-btn" onclick="openImageModal('${artwork.image}', '${title}')">
                        <i class="fas fa-search-plus"></i>
                        <span>${currentLang === 'zh' ? '放大查看' : 'Zoom View'}</span>
                    </button>
                </div>
            </div>
            ${artwork.featured ? '<div class="gallery-featured-badge"><i class="fas fa-star"></i></div>' : ''}
            ${artwork.status === 'sold' ? `
            <div class="gallery-artwork-status ${statusClass}">
                <i class="fas fa-check-circle"></i>
                <span>${statusText}</span>
            </div>
            ` : ''}
            <!-- 暂时隐藏可购买和已预定状态标签
            ${artwork.status === 'available' ? `
            <div class="gallery-artwork-status ${statusClass}">
                <i class="fas fa-shopping-cart"></i>
                <span>${statusText}</span>
            </div>
            ` : ''}
            ${artwork.status === 'reserved' ? `
            <div class="gallery-artwork-status ${statusClass}">
                <i class="fas fa-clock"></i>
                <span>${statusText}</span>
            </div>
            ` : ''}
            -->
        </div>
        <div class="gallery-artwork-info">
            <h3 class="gallery-artwork-title">${title}</h3>
            <div class="gallery-artwork-details">
                <div class="gallery-detail-row">
                    <span class="gallery-detail-label">${currentLang === 'zh' ? '媒材' : 'Medium'}:</span>
                    <span class="gallery-detail-value">${medium}</span>
                </div>
                <div class="gallery-detail-row">
                    <span class="gallery-detail-label">${currentLang === 'zh' ? '尺寸' : 'Size'}:</span>
                    <span class="gallery-detail-value">${artwork.size}</span>
                </div>
                <div class="gallery-detail-row">
                    <span class="gallery-detail-label">${currentLang === 'zh' ? '年份' : 'Year'}:</span>
                    <span class="gallery-detail-value">${artwork.year}</span>
                </div>
            </div>
        </div>
    `;

    // 移动端直接点击图片卡片打开大图
    if (isMobile) {
        element.addEventListener('click', function (e) {
            // 防止事件冒泡
            e.preventDefault();
            e.stopPropagation();
            openImageModal(artwork.image, title);
        });

        // 添加移动端特有的样式类
        element.classList.add('mobile-direct-click');
    }

    return element;
}

// 初始化图片模态框
function initImageModal() {
    imageModal = document.getElementById('imageModal');
    if (!imageModal) return;

    imageModalImg = imageModal.querySelector('.modal-content');
    imageModalTitle = imageModal.querySelector('.modal-title');
    const closeBtn = imageModal.querySelector('.modal-close');

    // 绑定关闭事件
    closeBtn.addEventListener('click', closeImageModal);
    imageModal.addEventListener('click', (e) => {
        if (e.target === imageModal) closeImageModal();
    });

    // 键盘ESC关闭
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && imageModal.classList.contains('show')) {
            closeImageModal();
        }
    });
}

// 打开图片模态框
function openImageModal(imageSrc, imageTitle) {
    if (!imageModal) return;

    imageModalImg.src = imageSrc;
    imageModalImg.alt = imageTitle;
    if (imageModalTitle) {
        imageModalTitle.textContent = imageTitle;
    }

    imageModal.style.display = 'flex';
    setTimeout(() => {
        imageModal.classList.add('show');
    }, 10);
    document.body.style.overflow = 'hidden';
}

// 关闭图片模态框
function closeImageModal() {
    if (!imageModal) return;

    imageModal.classList.remove('show');
    setTimeout(() => {
        imageModal.style.display = 'none';
        document.body.style.overflow = '';
    }, 300);
}

// 全局函数供HTML调用
window.openImageModal = openImageModal; 