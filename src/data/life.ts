export type LifeItem = {
  title: string;
  content: string;
};

export type LifeSection = {
  category: string;
  items: LifeItem[];
};

const lifeCategories: Record<'zh' | 'en', LifeSection[]> = {
  zh: [
    { category: "生活习惯", items: [
      { title: "极简护肤思路", content: "记住早C晚A：早上用清水洗脸，使用原型VC精华，然后涂上防晒霜；晚上使用氨基酸洗面奶清洁，使用A醇产品，最后使用适乐肤 PM 乳或理肤泉 B5 面霜保湿。" },
      { title: "数字极简主义", content: "关闭手机和 Mac 上所有非必要的通知弹窗。充分利用 iOS/macOS 的\u201c专注模式\u201d，将固定时间段留给深度思考，这比任何时间管理软件都管用。" },
      { title: "50/10 黄金节律", content: "摒弃传统的无休止工作法，使用 50 分钟深度专注 + 10 分钟彻底离开屏幕去散步或喝水的节奏，能显著消除每天下午的脑力衰竭感。" },
      { title: "每周技术回顾", content: "无论是博客、手写笔记还是 Obsidian，每周花 30 分钟总结这周踩过的坑与新学到的架构模式，这是构建个人独立知识库核心的最优路径。" },
      { title: "晨间离线状态", content: "醒来的第一个小时绝对不看手机的各种信息流。可以用这段时间吃一顿健康的早餐、冲一杯咖啡，然后冷静地规划今天最重要的三件事。" }
    ]},
    { category: "生活好物", items: [
      { title: "MacBook Pro + 全功能显示器", content: "M 系列芯片的 MacBook Pro 搭配一台 4K 护眼显示器是程序员的最佳生产力组合，既有绝佳的脱电续航又能随时随地进入顶配工作状态。" },
      { title: "人体工学硬件设置", content: "请始终确保显示器顶部与视线齐平。推荐使用 Keychron 矮轴机械键盘（如 K3 Pro）搭配苹果妙控板，以防止长时间编码带来的腕管综合征（RSI）。" },
      { title: "高品质抗噪设备", content: "投资一副优秀的降噪耳机（如 Sony WH-1000XM5 或 AirPods Pro），在吵闹的办公室或咖啡厅一键切断外界噪音，瞬间进入心流专注模式。" },
      { title: "手冲咖啡与水饮", content: "早晨手冲一杯新鲜浅焙咖啡豆可以高效启动大脑，但更重要的是在桌上永远放一个 1L 的大水杯，补充充足的水分是大脑维持清醒的最强燃料。" },
      { title: "高质量沉浸睡眠", content: "首要投资高质量的遮光窗帘并保持卧室凉爽。如果对外界声音敏感，买一副安耳悠（Ohropax）硅胶耳塞。深度睡眠才是最好的护肤品和补脑液。" }
    ]}
  ],
  en: [
    { category: "Life Habits", items: [
      { title: "Minimalist Skincare", content: "Follow the 'Morning C, Night A' routine: In the morning, wash your face with water, apply pure Vitamin C serum, and finish with sunscreen. At night, cleanse with an amino acid cleanser, apply Retinol, and moisturize with CeraVe PM lotion or La Roche-Posay B5 cream." },
      { title: "Digital Minimalism", content: "Turn off all non-essential notifications on your phone and Mac. Make full use of the iOS/macOS Focus Mode to carve out uninterrupted blocks for deep work—this is more effective than any time management app." },
      { title: "The 50/10 Rule", content: "Work in deep focus for 50 minutes, followed by a strict 10-minute break away from screens to stretch or hydrate. This prevents the typical afternoon brain drain." },
      { title: "Weekly Tech Review", content: "Spend 30 minutes every weekend to log and review the new architectural patterns learned or the tricky bugs resolved. It's the most effective way to build a robust personal knowledge base." },
      { title: "Offline Mornings", content: "Avoid checking social media and emails for the first hour after waking up. Use this time to have a healthy breakfast, make pour-over coffee, and plan the three most important tasks for the day." }
    ]},
    { category: "Life Goodies", items: [
      { title: "MacBook Pro & 4K Monitor", content: "An M-series MacBook Pro paired with a 4K monitor is the ultimate productivity setup for developers, offering great battery life and a reliable coding environment anywhere." },
      { title: "Ergonomic Setup", content: "Always ensure the top of your monitor is at eye level. Use a low-profile mechanical keyboard (e.g., Keychron K3 Pro) paired with a Magic Trackpad to prevent repetitive strain injuries (RSI)." },
      { title: "Active Noise Cancelling", content: "Invest in high-quality ANC headphones like Sony WH-1000XM5 or AirPods Pro. Cut off the surrounding noise with one click and get into the flow state instantly." },
      { title: "Coffee & 1L Water Bottle", content: "A fresh pour-over light roast coffee in the morning efficiently boosts focus, but keeping a large 1L water bottle on your desk is even more important. Adequate hydration is the ultimate fuel for mental clarity." },
      { title: "High-Quality Sleep Aids", content: "Invest in blackout curtains and keep your bedroom cool. Use high-quality Ohropax silicone earplugs if you're a light sleeper. Deep sleep is the ultimate skincare and brain booster." }
    ]}
  ]
};

const pageText = {
  zh: {
    title: "生活 | Jay Yu",
    heading: "life",
    intro: "一些能够提升生产力与身心健康的好物、习惯与生活分享。"
  },
  en: {
    title: "Life | Jay Yu",
    heading: "life",
    intro: "Goodies, routines, and life experiences that improve productivity and well-being."
  }
};

export function getLifeCategories(lang: 'zh' | 'en') {
  return lifeCategories[lang];
}

export function getLifePageText(lang: 'zh' | 'en') {
  return pageText[lang];
}
