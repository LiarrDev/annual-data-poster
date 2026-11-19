/* =========================================================
   公众号年度数据海报 · 渲染引擎
   只需要改下面 DEFAULT_DATA 里的数字（或在页面右下角「编辑数据」里改 JSON）
   ========================================================= */

/* ---------- 调色板 ---------- */
/* ================= 配色主题 =================
   每套只换「色相层」：背景、主文字、强调色、地图色阶、图表色板。
   背景一律是暗色，保证文字对比度；换主题不会动版式。 */
const PAL_KEYS = ['blue','pink','green','orange','gray','cyan','magenta','purple','amber','teal','lilac','rust'];

const THEMES = {
  ember: {
    name: '赤焰',
    bg: '#24060A', bg2: '#360B10',
    ink: '#FF8A7A', ink2: '#FFC9A8', dim: '#C06A66',
    inkRGB: '255,138,122', shadowRGB: '58,4,10',
    hot: '#FF3D7F', hot2: '#C21E5C',
    mark: '#4BE3D2',
    ramp: ['#4a1508', '#7c3410', '#b05a1a', '#e08c2e', '#ffd978'],
    empty: '#521c0c',
    pal: ['#5B8DEF','#F27E9D','#4FD08F','#F09A4A','#C9C4BF','#43E0D0','#E0409A','#8B7CF0','#F2B84B','#35B8AE','#B49BE8','#D06A45']
  },
  abyss: {
    name: '深海',
    bg: '#051019', bg2: '#0A2133',
    ink: '#7CC9EE', ink2: '#C0ECFF', dim: '#5F9AB5',
    inkRGB: '124,201,238', shadowRGB: '2,14,26',
    hot: '#2FB3E8', hot2: '#17719F',
    mark: '#FFC46B',
    ramp: ['#0E3A5C', '#155E8C', '#2389B8', '#46C0DC', '#A8F0F6'],
    empty: '#14344E',
    pal: ['#4BA3E8','#F08BB0','#3ED0C0','#EFAF5C','#B8CBDC','#63DCEC','#C077C8','#8B8CF0','#F0D06A','#33AFB8','#AC9FE8','#D88A66']
  },
  jade: {
    name: '松林',
    bg: '#06130E', bg2: '#0A2016',
    ink: '#7FE0AC', ink2: '#C2F6D6', dim: '#5AA981',
    inkRGB: '127,224,172', shadowRGB: '2,24,16',
    hot: '#2ECC8F', hot2: '#178A5C',
    mark: '#FFD166',
    ramp: ['#12452E', '#1B6A45', '#28965F', '#5CD08C', '#C8F5A8'],
    empty: '#17402C',
    pal: ['#46BFA8','#F09095','#66D478','#E8AE55','#C4D6CA','#43E0CE','#D066A6','#8A90D4','#EAD36A','#35A09C','#AECE85','#D08A5C']
  },
  violet: {
    name: '夜紫',
    bg: '#0D0917', bg2: '#171126',
    ink: '#BCA0F5', ink2: '#E4D6FF', dim: '#8A74BD',
    inkRGB: '188,160,245', shadowRGB: '8,4,22',
    hot: '#9A66FF', hot2: '#6438C4',
    mark: '#5FE0CE',
    ramp: ['#2A2158', '#453377', '#654CA8', '#9C7FE8', '#E8DBFF'],
    empty: '#2C2358',
    pal: ['#9186F0','#EC7AB4','#52CCD4','#EDA656','#CFC8E2','#68DEE8','#D066C0','#B29AF8','#F0CC64','#36AEB6','#A79AE0','#D07C64']
  },
  amber: {
    name: '琥珀',
    bg: '#131007', bg2: '#201A0E',
    ink: '#EFC88A', ink2: '#FFE9C4', dim: '#B3925F',
    inkRGB: '239,200,138', shadowRGB: '24,16,2',
    hot: '#F0A83E', hot2: '#B57518',
    mark: '#6FD8C0',
    ramp: ['#3C2B10', '#654A1E', '#93702C', '#C69E44', '#F0D896'],
    empty: '#38290F',
    pal: ['#D8A85C','#E08064','#9CBF66','#F0B445','#E0D2B0','#55D4C2','#D26C88','#A886B8','#F2D066','#45A098','#BCA0D0','#BC7E44']
  },
  graphite: {
    name: '石墨',
    bg: '#0C0D10', bg2: '#16181D',
    ink: '#CDD6E0', ink2: '#F2F6FC', dim: '#87919E',
    inkRGB: '205,214,224', shadowRGB: '0,0,0',
    hot: '#7BA6DC', hot2: '#4870A2',
    mark: '#E8C068',
    ramp: ['#262F3A', '#3B4856', '#5A6E80', '#93A8B8', '#E2ECF4'],
    empty: '#2A333D',
    pal: ['#7BAAD0','#CC96A0','#88C2A6','#DCB472','#C4CDD6','#68D2D6','#B486A6','#959EC4','#E4C88C','#57A8A2','#B2A6CC','#B4886E']
  },
  sakura: {
    name: '绯樱',
    bg: '#1C0A14', bg2: '#2A1020',
    ink: '#F79AC0', ink2: '#FFD3E4', dim: '#B76E92',
    inkRGB: '247,154,192', shadowRGB: '26,4,18',
    hot: '#F0509E', hot2: '#B22C70',
    mark: '#9FE8B8',
    ramp: ['#4A1533', '#75254F', '#A63C72', '#D96BA0', '#FFC9DE'],
    empty: '#45172F',
    pal: ['#7C9BE8','#F28BB0','#5FCFA0','#EFAF62','#D8C4CE','#5FD8D4','#E85CA8','#A98CF0','#F0CE74','#3FB4AC','#C8A8E8','#D8825E']
  },
  aurora: {
    name: '极光',
    bg: '#051318', bg2: '#082028',
    ink: '#6CF2DC', ink2: '#C0FFF2', dim: '#4CC4B2',
    inkRGB: '108,242,220', shadowRGB: '2,16,22',
    hot: '#9A6BFF', hot2: '#6242C8',
    mark: '#FF8FB8',
    ramp: ['#0D3A4A', '#12607A', '#1B96A0', '#3FD4BC', '#B4FFE8'],
    empty: '#10393B',
    pal: ['#5FA8E8','#F08BB8','#4FE0A0','#EFAF5C','#B8D2CC','#54E0DC','#C77AE0','#8B8CF0','#EDD06A','#35B8B0','#B49BE8','#D88A66']
  },
  neon: {
    name: '霓虹',
    bg: '#0A0714', bg2: '#120C22',
    ink: '#6EE7FF', ink2: '#C4F4FF', dim: '#55A8C4',
    inkRGB: '110,231,255', shadowRGB: '6,2,18',
    hot: '#FF3DA6', hot2: '#C21E7A',
    mark: '#C8FF4B',
    ramp: ['#3A1040', '#66186E', '#9C2690', '#D84BB0', '#FFA8E0'],
    empty: '#361040',
    pal: ['#5B8DEF','#FF7EB6','#4BE08D','#F2A24A','#C6C2D0','#43E0FF','#FF4FC0','#9A7CFF','#F2D04B','#35C0B8','#C09BF0','#E06A4A']
  }
};
const THEME_KEYS = ['ember', 'abyss', 'jade', 'violet', 'amber', 'graphite', 'sakura', 'aurora', 'neon'];

/* 旧版色板：本地存过的数据里的颜色按槽位平移到新色板 */
const LEGACY_PALS = {
  ember: ['#4E6FC4','#F07A8E','#4BC08D','#E48942','#C6C2BE','#3FDCCB','#CE2A8A','#6E62A8','#E8A33C','#2FA8A0','#9C8FD0','#B5553A'],
  abyss: ['#3E93D8','#E87FA8','#38C4B4','#E0A050','#A9C0D4','#5FD2E4','#B06AB8','#7E7FD8','#E8C860','#2FA0A8','#9C8FD0','#C87B5A'],
  jade: ['#3FAE9A','#E8878C','#5FC46E','#DFA24A','#BCCFC4','#3FD8C6','#C05A9A','#7C82C0','#E0C860','#2F8F8E','#A0C07A','#C07A50'],
  violet: ['#8577E6','#E26FA8','#4BC0C8','#E09A48','#C6BFD8','#5FD6E0','#C05AB0','#A48CF0','#E8C258','#2F9FA8','#9A8FD8','#C0705A'],
  amber: ['#C89A50','#D2735E','#8FAF5E','#E0A63C','#D6C8A8','#4FC8B8','#C2607A','#9A7AA8','#E8C25C','#3F8F8A','#B092C0','#A8703C'],
  graphite: ['#7096B8','#C08C96','#7FB49A','#D0A868','#B9C2CC','#5FC8CC','#A87A9A','#8A93B8','#D8BE82','#4F9A96','#A79AC0','#A87C64']
};

let T = THEMES.ember;        // 当前主题对象，渲染时统一读它
let curTheme = 'ember';      // 数据里的颜色当前对应哪套主题

const P = {};                // 兼容旧代码：P.xxx 指向当前主题的色板槽位
PAL_KEYS.forEach((k, i) => { P[k] = THEMES.ember.pal[i]; });

const hexRGB = h => {
  let v = String(h || '').replace('#', '');
  if (v.length === 3) v = v.split('').map(c => c + c).join('');
  return [0, 2, 4].map(i => parseInt(v.substr(i, 2), 16) || 0).join(',');
};

/* 按年份自动轮换：2025 赤焰 / 2026 深海 / 2027 松林 …… */
function autoTheme(year) {
  const y = Number(year) || new Date().getFullYear();
  const i = ((y - 2025) % THEME_KEYS.length + THEME_KEYS.length) % THEME_KEYS.length;
  return THEME_KEYS[i];
}

/* 换主题时把数据里的色板色整体平移，用户自定义的颜色不动 */
function recolorData(from, to) {
  const map = new Map();
  from.pal.forEach((c, i) => map.set(String(c).toLowerCase(), to.pal[i]));
  const paint = arr => {
    if (!Array.isArray(arr)) return;
    arr.forEach(it => {
      if (!it || !it.color) return;
      const hit = map.get(String(it.color).toLowerCase());
      if (hit) it.color = hit;
    });
  };
  const f = DATA && DATA.followers;
  if (f) ['gender', 'os', 'language', 'age'].forEach(k => paint(f[k]));
  if (DATA && DATA.sources) paint(DATA.sources.data);
  if (DATA) paint(DATA.classification);
}

/* 缺色的数据项按槽位补色：颜色为 undefined 时 JSON 存储会丢掉该字段，旧数据需要自愈 */
function healColors(d) {
  const paint = arr => {
    if (!Array.isArray(arr)) return;
    arr.forEach((it, i) => { if (it && !it.color) it.color = T.pal[i % T.pal.length]; });
  };
  const f = d.followers;
  if (f) ['gender', 'os', 'language', 'age'].forEach(k => paint(f[k]));
  if (d.sources) paint(d.sources.data);
  paint(d.classification);
}

function applyTheme(key) {
  key = THEMES[key] ? key : 'ember';
  const from = THEMES[curTheme], to = THEMES[key];
  if (key !== curTheme) recolorData(from, to);
  curTheme = key;
  T = to;
  PAL_KEYS.forEach((k, i) => { P[k] = to.pal[i]; });

  const r = document.documentElement.style;
  const put = (k, v) => r.setProperty(k, v);
  put('--bg', to.bg);
  put('--bg-2', to.bg2);
  put('--ink', to.ink);
  put('--ink-2', to.ink2);
  put('--dim', to.dim);
  put('--ink-rgb', to.inkRGB);
  put('--shadow-rgb', to.shadowRGB);
  put('--hot', to.hot);
  put('--hot-2', to.hot2);
  put('--hot-rgb', hexRGB(to.hot));
  put('--mark', to.mark);
  put('--mark-rgb', hexRGB(to.mark));
  // 由主题色算出的派生色：球体、活跃圆点
  put('--ball-hi', mixHex(to.bg, to.ink, .62));
  put('--ball-mid', mixHex(to.bg, to.ink, .42));
  put('--ball-lo', mixHex(to.bg, to.hot, .26));
  put('--dot-hi', hexRGB(mixHex(to.ink2, '#ffffff', .18)));
  put('--dot-mid', hexRGB(mixHex(to.hot, to.ink, .42)));
  put('--dot-lo', hexRGB(mixHex(to.bg, to.hot, .38)));
  put('--page', mixHex(to.bg, '#000000', .62));
}

/* ---------- 示例数据（把这里换成你的真实数据） ---------- */
function demoDaily(){
  // 365 天，中间一次爆款，其余是日常波动
  let seed = 20250101;
  const rnd = () => (seed = (seed * 1103515245 + 12345) % 2147483648) / 2147483648;
  const arr = [];
  for (let i = 0; i < 365; i++) {
    let v = 6 + Math.pow(rnd(), 2.2) * 46;
    if (i > 40 && i < 46) v += 120;
    if (i === 57) v = 2380;
    if (i > 57 && i < 64) v += 260 - (i - 57) * 40;
    if (i > 300 && i < 340) v *= 1.9;
    if (rnd() > 0.93) v += 110;
    arr.push(Math.round(v));
  }
  return arr;
}

const DEFAULT_DATA = {
  year: 2025,
  kicker: '公众号年度数据回顾',
  account: "song's",
  heroSub: '这一年的读者、文章与阅读',

  followers: {
    gender: [
      { label: 'Male',   value: 60.8, color: P.blue,  icon: 'male' },
      { label: 'Female', value: 37.8, color: P.pink,  icon: 'female' },
      { label: 'Other',  value: 1.4,  color: P.green, icon: 'other' }
    ],
    os: [
      { label: 'Android', value: 66.7, color: P.green,  icon: 'android' },
      { label: 'iOS',     value: 32.2, color: P.gray,   icon: 'apple' },
      { label: 'Other',   value: 1.1,  color: P.orange, icon: 'mobile' }
    ],
    growth: 39.43,
    language: [
      { label: '简体中文', value: 91.8, color: P.pink },
      { label: 'English', value: 2.7,  color: P.blue },
      { label: '繁體中文', value: 5.1,  color: P.amber },
      { label: 'Other',   value: 0.4,  color: P.green }
    ],
    age: [
      { label: '18-25', value: 26.5, color: P.blue },
      { label: '26-35', value: 44.8, color: P.pink },
      { label: '36-45', value: 17.2, color: P.orange },
      { label: '46+',   value: 6.5,  color: P.green },
      { label: 'Unknown', value: 5.0, color: P.gray }
    ]
  },

  province: {
    labelTop: 8,
    note: '底图依据自然资源部标准地图服务 · 读者所在地分布示意',
    data: [
      { name: '广东省', value: 18.4 }, { name: '北京市', value: 12.6 },
      { name: '上海市', value: 10.8 }, { name: '浙江省', value: 9.2 },
      { name: '江苏省', value: 7.6 },  { name: '四川省', value: 6.1 },
      { name: '湖北省', value: 4.8 },  { name: '云南省', value: 4.2 },
      { name: '山东省', value: 3.6 },  { name: '福建省', value: 3.1 },
      { name: '湖南省', value: 2.6 },  { name: '陕西省', value: 2.2 },
      { name: '河南省', value: 2.0 },  { name: '重庆市', value: 1.8 },
      { name: '天津市', value: 1.5 },  { name: '辽宁省', value: 1.3 },
      { name: '安徽省', value: 1.1 },  { name: '广西壮族自治区', value: 1.0 },
      { name: '香港特别行政区', value: 0.9 }, { name: '台湾省', value: 0.8 },
      { name: '黑龙江省', value: 0.7 }, { name: '吉林省', value: 0.6 },
      { name: '河北省', value: 0.6 },  { name: '山西省', value: 0.5 },
      { name: '江西省', value: 0.5 },  { name: '贵州省', value: 0.4 },
      { name: '甘肃省', value: 0.3 },  { name: '内蒙古自治区', value: 0.3 },
      { name: '新疆维吾尔自治区', value: 0.3 }, { name: '宁夏回族自治区', value: 0.2 },
      { name: '青海省', value: 0.2 },  { name: '西藏自治区', value: 0.2 },
      { name: '海南省', value: 0.2 },  { name: '澳门特别行政区', value: 0.1 }
    ]
  },

  trend: [1.2, 1.8, 2.4, 2.1, 3.2, 2.8, 4.1, 3.6, 4.8, 6.2, 7.9, 9.4],

  interaction: { images: ['', '', ''] },

  articles: { qty: 19, favorites: 333, shares: 1310, original: '100%' },

  sources: {
    total: 56499,
    unit: 'Times',
    data: [
      { label: 'Recommended',    value: 73.2, color: P.blue },
      { label: 'Search',         value: 21.5, color: P.pink },
      { label: 'Official Msg',   value: 2.8,  color: P.amber },
      { label: 'Moment',         value: 1.4,  color: P.orange },
      { label: 'Official Page',  value: 0.5,  color: P.teal },
      { label: 'Chat',           value: 0.5,  color: P.cyan },
      { label: 'Others',         value: 0.4,  color: P.purple },
      { label: 'Friends',        value: 0.1,  color: P.green }
    ]
  },

  classification: [
    { label: 'Reading',  value: 6, color: P.magenta },
    { label: 'Design',   value: 4, color: P.lilac },
    { label: 'Tool',     value: 4, color: P.purple },
    { label: 'Life',     value: 3, color: P.rust },
    { label: 'Travel',   value: 2, color: P.rust }
  ],

  active: {
    cols: 4, rows: 3,
    levels: [0.22, 0.3, 0.38, 0.3, 0.42, 0.5, 0.36, 0.55, 0.32, 0.46, 0.6, 0.95]
  },

  articleViews: [
    { title: '把一年过成十二个章节', value: 2380, img: '' },
    { title: '关于阅读这件小事',     value: 1420, img: '' },
    { title: '我到底在写什么',       value: 980,  img: '' },
    { title: '在深圳租房的第一年',   value: 860,  img: '' },
    { title: '一个人的深夜食堂',     value: 640,  img: '' },
    { title: '最后一批 90 后',       value: 420,  img: '' }
  ],

  dailyViews: { values: demoDaily(), monthTicks: true },

  footer: { avatar: '', qr: '', text: '长按识别 · 关注公众号', hint: '明年见' }
};

/* ---------- 工具 ---------- */
const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const fmt = n => Number(n || 0).toLocaleString('en-US');
const p1  = n => (Math.round(n * 10) / 10).toFixed(1);
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const sum = a => a.reduce((x, y) => x + Math.max(0, +y.value || 0), 0) || 1;

function mixHex(a, b, t) {
  const pa = [1, 3, 5].map(i => parseInt(a.substr(i, 2), 16));
  const pb = [1, 3, 5].map(i => parseInt(b.substr(i, 2), 16));
  return '#' + pa.map((v, i) => Math.round(v + (pb[i] - v) * t).toString(16).padStart(2, '0')).join('');
}
function ramp(t) {
  const st = [[0, T.ramp[0]], [0.28, T.ramp[1]], [0.55, T.ramp[2]], [0.78, T.ramp[3]], [1, T.ramp[4]]];
  t = clamp(t, 0, 1);
  for (let i = 1; i < st.length; i++) {
    if (t <= st[i][0]) return mixHex(st[i - 1][1], st[i][1], (t - st[i - 1][0]) / (st[i][0] - st[i - 1][0]));
  }
  return st[st.length - 1][1];
}

/* ---------- 内置图标：颜色跟随扇区（currentColor） ---------- */
const ICONS = {
  male: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="9.4" cy="14.6" r="4.7"/><path d="M13.1 10.9 19.4 4.6M19.4 4.6h-5M19.4 4.6v5"/></svg>`,

  female: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
    <circle cx="12" cy="8.8" r="4.7"/><path d="M12 13.5v7.2M8.7 17.7h6.6"/></svg>`,

  other: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round">
    <circle cx="9.6" cy="13.4" r="4"/><path d="M12.9 10.1 18.6 4.4M18.6 4.4h-4.4M18.6 4.4v4.4"/>
    <path d="M9.6 17.4v4M7.4 19.6h4.4"/></svg>`,

  // 安卓机器人头（眼睛用 evenodd 挖空，露出底色）
  android: `<svg viewBox="0 0 24 24" fill="currentColor">
    <path fill-rule="evenodd" d="M4 17.6c0-4.5 3.6-8.1 8-8.1s8 3.6 8 8.1H4Zm3.5-1.7a1.55 1.55 0 1 0 0-3.1 1.55 1.55 0 0 0 0 3.1Zm9 0a1.55 1.55 0 1 0 0-3.1 1.55 1.55 0 0 0 0 3.1Z"/>
    <path d="M6.9 7.7 5.4 5M17.1 7.7 18.6 5" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/></svg>`,

  apple: `<svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M15.7 3.1c.1 1-.3 1.9-.9 2.6-.7.8-1.7 1.3-2.7 1.2-.1-1 .4-1.9 1-2.6.7-.8 1.7-1.3 2.6-1.2Z"/>
    <path d="M18.3 12.7c0-2 1.6-3 1.7-3.1-1-1.4-2.5-1.7-3.1-1.7-1.3-.1-2.5.8-3.2.8-.6 0-1.6-.8-2.7-.8-1.4 0-2.8.9-3.5 2.1-1.5 2.6-.4 6.4 1 8.5.7 1 1.5 2.1 2.6 2 1-.1 1.4-.7 2.6-.7s1.6.7 2.7.7c1.1 0 1.8-1 2.5-2 .5-.7.7-1.1 1-1.9-2.6-1-3.1-4.2-3.1-4.5Z"/></svg>`,

  // 手机（其他系统）
  mobile: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round">
    <rect x="7" y="2.8" width="10" height="18.4" rx="2.4"/><path d="M10.6 18.4h2.8" stroke-linecap="round"/></svg>`,

  desktop: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round">
    <rect x="2.6" y="4" width="18.8" height="12.4" rx="1.8"/><path d="M8.6 20.4h6.8M12 16.4v4" stroke-linecap="round"/></svg>`,

  tablet: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round">
    <rect x="4.6" y="2.8" width="14.8" height="18.4" rx="2.2"/><path d="M11 18.4h2" stroke-linecap="round"/></svg>`
};

function iconSVG(name, color) {
  if (!name) return '';
  // 也接受直接给图片地址（http / data:）或整段 SVG
  if (/^(https?:|data:)/.test(name)) return `<img class="ic" src="${esc(name)}" alt="">`;
  if (/^</.test(name)) return `<i class="ic" style="color:${color}">${name}</i>`;
  const body = ICONS[name];
  return body ? `<i class="ic" style="color:${color}">${body}</i>` : '';
}

/* ---------- 环形图（带引线标签） ---------- */
function donutHTML(segs, o = {}) {
  segs = segs.filter(s => +s.value > 0);
  const ring  = o.ring  || 160;
  const thick = o.thick || 24;
  const total = sum(segs);
  const gap   = segs.length > 1 ? (o.gap == null ? 3 : o.gap) : 0;
  const lg    = o.labelGap == null ? 22 : o.labelGap;
  // 标签宽度：中文按 11.2px、西文按 6.6px 估，避免长中文压到圆环上
  const tw = s => {
    let w = 0;
    for (const ch of String(s.label || '')) w += /[\u4e00-\u9fa5\u3000-\u303f]/.test(ch) ? 11.2 : 6.6;
    return w;
  };
  const estW  = Math.max(30, ...segs.map(s => s.icon ? 36 : tw(s)));
  const pad   = o.pad != null ? o.pad : Math.round(lg + estW + 12);
  const size  = ring + pad * 2;
  const cx = size / 2, cy = size / 2;
  const r = (ring - thick) / 2;
  const C = 2 * Math.PI * r;
  const rOut = r + thick / 2;

  let acc = 0, arcs = '', labs = [];
  segs.forEach(s => {
    const frac = Math.max(0, +s.value) / total;
    const len = Math.max(1.2, frac * C - gap);
    arcs += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${s.color}"
      stroke-width="${thick}" stroke-dasharray="${len.toFixed(2)} ${(C - len + 0.6).toFixed(2)}"
      stroke-dashoffset="${(-acc).toFixed(2)}" transform="rotate(-90 ${cx} ${cy})"/>`;
    const mid = ((acc + frac * C / 2) / C) * 360 - 90;
    const rad = mid * Math.PI / 180;
    const cos = Math.cos(rad), sin = Math.sin(rad);
    labs.push({ s, frac, cos, sin, ax: cx + cos * rOut, ay: cy + sin * rOut, y: cy + sin * rOut });
    acc += frac * C;
  });

  // 左右两列分布 + 纵向去重叠
  const iconMode = segs.some(s => s.icon);
  const minGap = o.minGap || (iconMode ? 46 : 42);
  const vPad = iconMode ? 19 : 13;
  ['L', 'R'].forEach(side => {
    const g = labs.filter(l => (side === 'L' ? l.cos < 0 : l.cos >= 0)).sort((a, b) => a.y - b.y);
    g.forEach((l, i) => {
      l.side = side;
      if (i && l.y - g[i - 1].y < minGap) l.y = g[i - 1].y + minGap;
    });
    if (g.length) {
      const over = g[g.length - 1].y - (size - vPad);
      if (over > 0) g.forEach(l => l.y -= over);
      const under = vPad - g[0].y;
      if (under > 0) g.forEach(l => l.y += under);
    }
  });

  let lines = '', labels = '';
  labs.forEach(l => {
    const dir = l.side === 'R' ? 1 : -1;
    const isIcon = !!l.s.icon;
    // 图标标签是居中的一列，锚点再往外让出半个图标宽
    const lx = cx + dir * (rOut + lg + (isIcon ? 17 : 0));
    const mid = cx + dir * (rOut + lg * 0.5);
    lines += `<path d="M${l.ax.toFixed(1)} ${l.ay.toFixed(1)} L${mid.toFixed(1)} ${l.ay.toFixed(1)} L${mid.toFixed(1)} ${l.y.toFixed(1)} L${(lx - dir * (isIcon ? 15 : 4)).toFixed(1)} ${l.y.toFixed(1)}"
      fill="none" stroke="rgba(${T.inkRGB},.26)" stroke-width=".9" stroke-dasharray="1.6 3"/>`;
    lines += `<circle cx="${l.ax.toFixed(1)}" cy="${l.ay.toFixed(1)}" r="1.6" fill="rgba(${T.inkRGB},.62)"/>`;

    if (isIcon) {
      labels += `<div class="dn-i" style="left:${lx.toFixed(1)}px;top:${l.y.toFixed(1)}px">
        ${iconSVG(l.s.icon, l.s.color)}
        <span class="v" style="color:${l.s.color}">${p1(l.frac * 100)}%</span></div>`;
      return;
    }
    const align = dir > 0 ? 'left' : 'right';
    const tx = dir > 0 ? `translateY(-50%)` : `translate(-100%,-50%)`;
    labels += `<div class="dn-l" style="left:${lx.toFixed(1)}px;top:${l.y.toFixed(1)}px;transform:${tx};text-align:${align}">
      <span class="k">${esc(l.s.label)}</span><span class="v" style="color:${l.s.color}">${p1(l.frac * 100)}%</span></div>`;
  });

  const outer = o.outerRing
    ? `<circle cx="${cx}" cy="${cy}" r="${rOut + 7}" fill="none" stroke="rgba(${T.inkRGB},.18)" stroke-width="1" stroke-dasharray="1 5"/>`
    : '';

  // 方形容器左右需要留标签位，纵向用负 margin 收掉多余留白
  const vTrim = Math.round(clamp((pad - 24) * 0.8, 0, 70));
  return `<div class="dn" style="width:${size}px;height:${size}px;margin:${-vTrim}px 0">
    <svg viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">
      ${outer}${arcs}${lines}
    </svg>
    ${o.center || ''}${labels}
  </div>`;
}

/* ---------- 折线 / 面积图 ---------- */
function areaChart(values, o = {}) {
  const W = o.w || 856, H = o.h || 260;
  const padL = 6, padR = 6, padT = 18, padB = 26;
  const n = values.length;
  const max = Math.max(...values, 1) * 1.08;
  const X = i => padL + (W - padL - padR) * (n === 1 ? .5 : i / (n - 1));
  const Y = v => H - padB - (H - padT - padB) * (v / max);
  let d = '', a = `M ${padL} ${H - padB} `;
  values.forEach((v, i) => {
    const x = X(i).toFixed(1), y = Y(v).toFixed(1);
    d += (i ? 'L' : 'M') + x + ' ' + y + ' ';
    a += 'L' + x + ' ' + y + ' ';
  });
  a += `L ${(W - padR).toFixed(1)} ${H - padB} Z`;

  let ticks = '';
  const labels = o.labels || [];
  if (labels.length) {
    const step = Math.max(1, Math.floor(n / labels.length));
    labels.forEach((t, i) => {
      const x = X(Math.min(n - 1, i * step));
      ticks += `<line x1="${x.toFixed(1)}" y1="${H - padB}" x2="${x.toFixed(1)}" y2="${H - padB + 4}" stroke="rgba(${T.inkRGB},.32)" stroke-width="1"/>`;
      ticks += `<text x="${x.toFixed(1)}" y="${H - 8}" fill="rgba(${T.inkRGB},.5)" font-size="9.5" text-anchor="middle" font-family="PingFang SC,Helvetica,sans-serif">${esc(t)}</text>`;
    });
  }

  return `<svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="none">
    <defs>
      <linearGradient id="ag" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="${T.hot}" stop-opacity=".58"/>
        <stop offset=".55" stop-color="${T.hot2}" stop-opacity=".5"/>
        <stop offset="1" stop-color="${T.bg}" stop-opacity=".08"/>
      </linearGradient>
    </defs>
    <path d="${a}" fill="url(#ag)"/>
    <path d="${d}" fill="none" stroke="${T.hot}" stroke-width="2.2" stroke-linejoin="round" stroke-linecap="round"/>
    <line x1="${padL}" y1="${H - padB}" x2="${W - padR}" y2="${H - padB}" stroke="rgba(${T.inkRGB},.26)" stroke-width="1" stroke-dasharray="3 4"/>
    ${ticks}
  </svg>`;
}

/* ---------- 柱状图 ---------- */
function barChart(items, o = {}) {
  const W = o.w || 856, H = o.h || 300;
  const padB = 74, padT = 34, padL = 10, padR = 10;
  const max = Math.max(...items.map(i => +i.value || 0), 1) * 1.15;
  const slot = (W - padL - padR) / Math.max(1, items.length);
  const bw = Math.min(o.barW || 34, slot * 0.42);
  let bars = '';
  items.forEach((it, i) => {
    const h = Math.max(3, (H - padB - padT) * ((+it.value || 0) / max));
    const x = padL + slot * i + (slot - bw) / 2;
    const y = H - padB - h;
    const c = it.color || T.pal[6];
    bars += `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${bw.toFixed(1)}" height="${h.toFixed(1)}" rx="3" fill="${c}" opacity=".95"/>`;
    bars += `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${bw.toFixed(1)}" height="6" rx="3" fill="#fff" opacity=".2"/>`;
    bars += `<text x="${(x + bw / 2).toFixed(1)}" y="${(y - 9).toFixed(1)}" fill="${T.ink2}" font-size="15" text-anchor="middle" font-family="Haettenschweiler,Impact,sans-serif">${esc(it.value)}</text>`;
    bars += `<text transform="translate(${(x + bw / 2).toFixed(1)},${H - padB + 16}) rotate(-38)" fill="rgba(${T.inkRGB},.72)" font-size="11" text-anchor="end" font-family="PingFang SC,Helvetica,sans-serif">${esc(it.label)}</text>`;
  });
  return `<svg viewBox="0 0 ${W} ${H}">
    <line x1="${padL}" y1="${H - padB}" x2="${W - padR}" y2="${H - padB}" stroke="rgba(${T.inkRGB},.26)" stroke-width="1" stroke-dasharray="3 4"/>
    ${bars}
  </svg>`;
}

/* ---------- 地图 ---------- */
let GEO = null;
function normName(s) {
  return String(s || '').replace(/(省|市|自治区|特别行政区|壮族|回族|维吾尔|自治州)/g, '');
}
function mapHTML(d) {
  const feats = (GEO && GEO.features) || [];
  if (!feats.length) return '';
  const W = 880, H = 540, PAD = 6;
  // 墨卡托投影：经纬度统一换算成弧度，否则纵向会被压扁
  const proj = (lon, lat) => [lon * Math.PI / 180, Math.log(Math.tan(Math.PI / 4 + lat * Math.PI / 360))];

  const isJD = f => String(f.properties.adcode) === '100000_JD';
  const main = feats.filter(f => !isJD(f) && f.properties.name);
  const CLIP_LAT = 17.4; // 主图只画到海南岛，南海诸岛单独做插图
  let x0 = 1e9, x1 = -1e9, y0 = 1e9, y1 = -1e9;
  const eachPt = (geom, fn) => {
    const polys = geom.type === 'Polygon' ? [geom.coordinates] : geom.coordinates;
    polys.forEach(poly => poly.forEach(ring => ring.forEach(pt => {
      if (pt[1] <= CLIP_LAT) return;
      const [x, y] = proj(pt[0], pt[1]); fn(x, y);
    })));
  };
  main.forEach(f => eachPt(f.geometry, (x, y) => { x0 = Math.min(x0, x); x1 = Math.max(x1, x); y0 = Math.min(y0, y); y1 = Math.max(y1, y); }));

  const sx = (W - PAD * 2) / (x1 - x0);
  const sy = (H - PAD * 2) / (y1 - y0);
  const s = Math.min(sx, sy);
  const ox = (W - (x1 - x0) * s) / 2 - x0 * s;
  const oy = (H - (y1 - y0) * s) / 2 - y0 * s;
  // 注意：SVG 的 y 向下增长，墨卡托 y 向上增长，所以要翻过来
  const px = (lon, lat) => { const [x, y] = proj(lon, lat); return [x * s + ox, H - (y * s + oy)]; };
  const clipY = px(0, CLIP_LAT)[1];

  const dataMap = new Map();
  (d.province.data || []).forEach(it => dataMap.set(normName(it.name), +it.value || 0));
  const maxV = Math.max(...dataMap.values(), 0.0001);

  // 省份路径
  let paths = '';
  const centres = [];
  main.forEach(f => {
    const v = dataMap.get(normName(f.properties.name)) || 0;
    const fill = v <= 0 ? T.empty : ramp(Math.pow(v / maxV, 0.62));
    let dd = '';
    const polys = f.geometry.type === 'Polygon' ? [f.geometry.coordinates] : f.geometry.coordinates;
    polys.forEach(poly => poly.forEach(ring => {
      dd += 'M' + ring.map(pt => { const [X, Y] = px(pt[0], pt[1]); return X.toFixed(1) + ' ' + Y.toFixed(1); }).join('L') + 'Z';
    }));
    paths += `<path d="${dd}" fill="${fill}" stroke="rgba(${T.inkRGB},.2)" stroke-width=".7" stroke-linejoin="round"/>`;
    if (v > 0) {
      const c = f.properties.centroid || f.properties.center;
      if (c) centres.push({ name: f.properties.name, short: normName(f.properties.name), v, xy: px(c[0], c[1]) });
    }
  });

  // 标签（仅前 N 个），向外推开并做简单避让
  centres.sort((a, b) => b.v - a.v);
  const topN = d.province.labelTop == null ? 8 : d.province.labelTop;
  const cx0 = W / 2, cy0 = H / 2;
  const boxes = [];
  centres.slice(0, topN).forEach(c => {
    const [mx, my] = c.xy;
    const dx = mx - cx0, dy = my - cy0;
    const len = Math.hypot(dx, dy) || 1;
    const ux = dx / len, uy = dy / len;
    boxes.push({
      c, mx, my,
      lx: clamp(mx + ux * 30, 34, W - 34),
      ly: clamp(my + uy * 20, 14, H - 14),
      anchor: ux > 0.28 ? 'start' : (ux < -0.28 ? 'end' : 'middle')
    });
  });
  boxes.sort((a, b) => a.ly - b.ly);
  for (let i = 1; i < boxes.length; i++) {
    const prev = boxes[i - 1], cur = boxes[i];
    if (Math.abs(cur.lx - prev.lx) < 96 && cur.ly - prev.ly < 15) cur.ly = prev.ly + 15;
  }

  let marks = '';
  boxes.forEach(b => {
    marks += `<circle cx="${b.mx.toFixed(1)}" cy="${b.my.toFixed(1)}" r="3.2" fill="none" stroke="${T.mark}" stroke-width="1.1"/>`;
    marks += `<line x1="${b.mx.toFixed(1)}" y1="${b.my.toFixed(1)}" x2="${b.lx.toFixed(1)}" y2="${b.ly.toFixed(1)}" stroke="rgba(${hexRGB(T.mark)},.42)" stroke-width=".7" stroke-dasharray="1.4 2.4"/>`;
    marks += `<text x="${b.lx.toFixed(1)}" y="${(b.ly + 3).toFixed(1)}" fill="${T.mark}" font-size="10.5" text-anchor="${b.anchor}" font-family="PingFang SC,Helvetica,sans-serif">${esc(b.c.short)} ${p1(b.c.v)}%</text>`;
  });
  // 其余省份只留小点
  centres.slice(topN).forEach(c => {
    marks += `<circle cx="${c.xy[0].toFixed(1)}" cy="${c.xy[1].toFixed(1)}" r="1.6" fill="${T.mark}" opacity=".65"/>`;
  });

  // 南海诸岛插图（独立投影，符合地图规范）
  const jd = feats.find(isJD);
  let inset = '';
  if (jd) {
    let a0 = 1e9, a1 = -1e9, b0 = 1e9, b1 = -1e9;
    const allPolys = jd.geometry.type === 'Polygon' ? [jd.geometry.coordinates] : jd.geometry.coordinates;
    allPolys.forEach(poly => poly.forEach(ring => ring.forEach(pt => {
      const [x, y] = proj(pt[0], pt[1]);
      a0 = Math.min(a0, x); a1 = Math.max(a1, x); b0 = Math.min(b0, y); b1 = Math.max(b1, y);
    })));
    const iw = 112, ih = 156, ix0 = W - iw - 24, iy0 = H - ih - 6;
    const s2 = Math.min((iw - 12) / (a1 - a0), (ih - 26) / (b1 - b0));
    const bx = ix0 + (iw - (a1 - a0) * s2) / 2;
    const by = iy0 + ((ih - 18) - (b1 - b0) * s2) / 2 + 6;
    let dp = '';
    allPolys.forEach(poly => poly.forEach(ring => {
      dp += 'M' + ring.map(pt => {
        const [x, y] = proj(pt[0], pt[1]);
        return (bx + (x - a0) * s2).toFixed(1) + ' ' + (by + (b1 - y) * s2).toFixed(1);
      }).join('L') + 'Z';
    }));
    inset = `<g>
      <rect x="${ix0}" y="${iy0}" width="${iw}" height="${ih}" fill="${mixHex(T.bg, '#000000', .5)}" stroke="rgba(${hexRGB(T.mark)},.42)" stroke-width=".8"/>
      <path d="${dp}" fill="${T.ramp[2]}" stroke="rgba(${hexRGB(T.mark)},.32)" stroke-width=".5"/>
      <text x="${ix0 + iw / 2}" y="${iy0 + ih - 6}" fill="rgba(${T.inkRGB},.72)" font-size="8.5" text-anchor="middle" font-family="PingFang SC,sans-serif">南海诸岛</text>
    </g>`;
  }

  return `<svg viewBox="0 0 ${W} ${H}">
    <defs><clipPath id="mapclip"><rect x="0" y="0" width="${W}" height="${clipY.toFixed(1)}"/></clipPath></defs>
    <g clip-path="url(#mapclip)">${paths}</g>
    <g>${inset}</g>
    <g>${marks}</g>
  </svg>`;
}

/* ---------- 各区块 ---------- */
function heroHTML(d) {
  return `<section class="hero">
    <div class="hero-kick">${esc(d.kicker)}</div>
    <h1 class="hero-t"><span class="yr">${esc(d.year)}</span> Year in Review</h1>
    <div class="hero-rule"><i></i><b>◆</b><i></i></div>
    <div class="hero-sub">${esc(d.account)} · ${esc(d.heroSub)}</div>
  </section>`;
}

const secTitle = t => `<div class="sec"><span class="sec-t">${esc(t)}</span></div>`;

function followersHTML(d) {
  const f = d.followers;
  return `${secTitle('FOLLOWERS')}
  <div class="duo">
    <div class="duo-item">
      <div class="sub">Gender</div>
      ${donutHTML(f.gender, { ring: 186, thick: 30, labelGap: 24 })}
    </div>
    <div class="duo-item">
      <div class="sub">Operating System</div>
      ${donutHTML(f.os, { ring: 186, thick: 30, labelGap: 24 })}
    </div>
  </div>

  <div class="growth">
    <div class="sub">Growth</div>
    <div class="growth-row">
      <div class="growth-num">${esc(f.growth)}%</div>
      <svg class="growth-arrow" width="104" height="96" viewBox="0 0 104 96">
        <defs>
          <linearGradient id="gaGrad" x1="0.1" y1="1" x2="0.85" y2="0">
            <stop offset="0" stop-color="${T.hot2}"/>
            <stop offset="0.5" stop-color="${T.hot}"/>
            <stop offset="1" stop-color="${T.ink2}"/>
          </linearGradient>
        </defs>
        <!-- 粗弧线箭杆 -->
        <path d="M18 86 C34 68 46 52 58 36" fill="none" stroke="url(#gaGrad)"
              stroke-width="16" stroke-linecap="round"/>
        <!-- 箭头 -->
        <path d="M86 10 L52.7 24.4 L79.3 45.6 Z" fill="url(#gaGrad)"/>
        <!-- 一道高光，显得有厚度 -->
        <path d="M25 81 C38 65 46 55 55 43" fill="none" stroke="rgba(${hexRGB(T.ink2)},.45)"
              stroke-width="3" stroke-linecap="round" opacity=".5"/>
      </svg>
    </div>
  </div>

  <div class="duo" style="margin-top:34px">
    <div class="duo-item">
      <div class="sub">Language</div>
      ${donutHTML(f.language, { ring: 156, thick: 26, labelGap: 22 })}
    </div>
    <div class="duo-item">
      <div class="sub">Age</div>
      ${donutHTML(f.age, { ring: 156, thick: 26, labelGap: 22 })}
    </div>
  </div>`;
}

function mapSectionHTML(d) {
  return `${secTitle('Province ( State )')}
  <div class="map-wrap">${mapHTML(d)}</div>
  <div class="map-note">${esc(d.province.note || '')}</div>`;
}

function trendHTML(d) {
  const labels = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];
  return `${secTitle('Trend')}
  <div class="chart">${areaChart(d.trend, { labels: d.trend.length === 12 ? labels : [] })}</div>`;
}

/* 图片位缺省时的占位：用当前主题的暗调色，不会跟配色打架 */
function phGrad(i, deg) {
  const tones = [T.hot, T.hot2, T.ramp[2], T.ramp[3]];
  const a = mixHex(T.bg, tones[i % 4], .46 + (i % 3) * .07);
  const b = mixHex(T.bg, tones[(i + 2) % 4], .22);
  return `linear-gradient(${deg || 150}deg, ${a}, ${b} 56%, ${T.bg})`;
}

function interHTML(d) {
  const imgs = (d.interaction.images || []).slice(0, 3);
  const grads = [0, 1, 2].map(i => phGrad(i, 140));
  const pos = [
    { left: '126px', rot: '-7deg', top: '26px' },
    { left: '405px', rot: '1deg',  top: '10px' },
    { left: '684px', rot: '6deg',  top: '30px' }
  ];
  let cards = '';
  imgs.forEach((src, i) => {
    const p = pos[i] || pos[0];
    const bg = src ? `background-image:url('${esc(src)}')` : `background-image:${grads[i % 3]}`;
    cards += `<div class="polar" style="left:${p.left};transform:rotate(${p.rot});top:${p.top}"><i style="${bg}"></i></div>`;
  });

  const doodle = `<svg class="inter-doodle" viewBox="0 0 840 250" fill="none" stroke="${T.hot}" stroke-width="1.6" stroke-linecap="round">
    <path d="M120 78 c-8 -18 6 -30 16 -22 10 8 4 24 -12 32" />
    <path d="M300 62 c14 -6 26 6 22 18" stroke-dasharray="2 5"/>
    <path d="M470 44 l16 -10 -4 16 z" fill="${T.pal[8]}" stroke="none" opacity=".8"/>
    <path d="M628 96 c18 4 26 -8 36 -4" stroke-dasharray="3 6"/>
    <path d="M700 60 c8 -14 26 -6 22 8 -3 10 -18 12 -22 20" />
    <path d="M196 196 c10 10 26 6 30 -8" stroke-dasharray="2 6"/>
    <path d="M392 210 c12 -10 26 0 22 12 -3 10 -18 8 -18 -4" />
    <path d="M560 188 c8 10 24 8 28 -4" stroke-dasharray="2 6"/>
    <path d="M652 202 c10 12 24 8 30 -2" />
    <circle cx="238" cy="120" r="2" fill="${T.hot}" stroke="none"/>
    <circle cx="596" cy="150" r="2.4" fill="${T.hot}" stroke="none"/>
  </svg>`;
  return `${secTitle('Interaction')}
  <div class="inter">${doodle}${cards}</div>`;
}

function articlesHTML(d) {
  const a = d.articles;
  const cell = (k, v) => `<div class="stat"><div class="k">${esc(k)}</div><div class="b"><span>${esc(v)}</span></div></div>`;
  return `${secTitle('ARTICLES')}
  <div class="stats">
    ${cell('QTY', a.qty)}
    ${cell('Favorites', a.favorites)}
    ${cell('Shares', a.shares)}
  </div>
  <div class="orig">
    <div class="sub">Original</div>
    <div class="orig-num">${esc(a.original)}</div>
  </div>`;
}

function sourcesHTML(d) {
  const s = d.sources;
  const center = `<div class="dn-c"><b>${esc(fmt(s.total))}</b><span>${esc(s.unit || 'Times')}</span></div>`;
  return `${secTitle('Reader Sources')}
  <div style="display:flex;justify-content:center">
    ${donutHTML(s.data, { ring: 372, thick: 38, labelGap: 34, outerRing: true, center })}
  </div>`;
}

function classHTML(d) {
  return `${secTitle('Classification')}
  <div class="chart">${barChart(d.classification, { h: 310 })}</div>`;
}

function activeHTML(d) {
  const a = d.active;
  const lv = a.levels || [];
  let dots = '';
  const total = a.cols * a.rows;
  for (let i = 0; i < total; i++) {
    const v = lv[i % lv.length] == null ? .4 : lv[i % lv.length];
    dots += `<div class="dot" style="--a:${v}"></div>`;
  }
  return `${secTitle('Active')}
  <div class="active-grid" style="grid-template-columns:repeat(${a.cols},44px)">${dots}</div>`;
}

function articleViewsHTML(d) {
  const items = d.articleViews || [];
  if (!items.length) return '';
  const max = Math.max(...items.map(i => +i.value || 0), 1);
  const stageH = 380, labH = 96;
  const grads = [0, 1, 2, 3, 4, 5].map(i => phGrad(i, 160));
  let thumbs = '', bars = '', labs = '';
  items.forEach((it, i) => {
    const v = +it.value || 0;
    const h = Math.max(9, (stageH - labH - 14) * (v / max));
    const bg = it.img ? `background-image:url('${esc(it.img)}')` : `background:${grads[i % grads.length]}`;
    thumbs += `<div class="av-thumb"><i style="${bg}"></i></div>`;
    bars += `<div class="av-b"><span>${fmt(v)}</span><div class="av-bar" style="height:${h.toFixed(0)}px"></div></div>`;
    labs += `<div class="av-lab">${esc(it.title)}</div>`;
  });
  return `${secTitle('Article Views')}
  <div class="av-stage">
    <div class="av-strip">${thumbs}</div>
    <div class="av-bars">${bars}</div>
  </div>
  <div class="av-labs">${labs}</div>`;
}

function dailyHTML(d) {
  const dv = d.dailyViews || { values: [] };
  const vals = dv.values || [];
  const labels = dv.monthTicks ? ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'] : [];
  return `${secTitle('Daily Views')}
  <div class="chart">${areaChart(vals, { h: 240, labels: vals.length > 40 ? labels : [] })}</div>`;
}

function footHTML(d) {
  const f = d.footer || {};
  return `<div class="foot">
    <div class="foot-row">
      <div class="foot-av">${f.avatar ? `<img src="${esc(f.avatar)}" alt="">` : 'LOGO'}</div>
      <div class="foot-qr">${f.qr ? `<img src="${esc(f.qr)}" alt="">` : '二维码'}</div>
    </div>
    <div class="foot-tx">${esc(f.text || '')}${f.hint ? ' · ' + esc(f.hint) : ''}</div>
  </div>`;
}

/* ---------- 主渲染 ---------- */
function render(d) {
  // 数据里的 theme 优先；没有就按年份自动轮换
  const tk = (d.theme && THEMES[d.theme]) ? d.theme : autoTheme(d.year);
  if (tk !== curTheme) applyTheme(tk);
  d.theme = tk;
  healColors(d);
  const poster = document.getElementById('poster');
  poster.innerHTML = [
    heroHTML(d),
    followersHTML(d),
    mapSectionHTML(d),
    trendHTML(d),
    interHTML(d),
    articlesHTML(d),
    sourcesHTML(d),
    classHTML(d),
    activeHTML(d),
    articleViewsHTML(d),
    dailyHTML(d),
    footHTML(d)
  ].join('');
  fit();
}

/* ---------- 自适应缩放 ---------- */
function fit() {
  const stage = document.getElementById('stage');
  const poster = document.getElementById('poster');
  const drawer = document.getElementById('drawer');
  const dw = drawer && drawer.classList.contains('on')
    ? Math.min(drawer.offsetWidth || 560, window.innerWidth * 0.94) : 0;
  const avail = window.innerWidth - 40 - dw;
  const s = Math.max(0.16, Math.min(1, avail / 960));
  // 抽屉展开时把海报整体往左让开，避免被压在抽屉下面
  stage.style.transform = dw ? `translateX(${-dw / 2}px) scale(${s})` : `scale(${s})`;
  stage.style.height = (poster.offsetHeight * s) + 'px';
  stage.style.width = '960px';
}

/* ---------- 导出图片 ---------- */
async function exportImage(kind) {
  const btn = document.getElementById(kind === 'png' ? 'btnPng' : 'btnJpg');
  const poster = document.getElementById('poster');
  const stage = document.getElementById('stage');
  const prev = stage.style.transform;
  const oldLabel = btn.textContent;
  btn.disabled = true;
  btn.textContent = '生成中…';
  try {
    stage.style.transform = 'scale(1)';
    stage.style.height = 'auto';
    if (document.fonts && document.fonts.ready) await document.fonts.ready;
    await new Promise(r => setTimeout(r, 120));
    const canvas = await html2canvas(poster, {
      scale: 1.6,   // 约 1536px 宽，微信足够清晰，也不超 Safari 的画布上限
      backgroundColor: T.bg,
      useCORS: true,
      logging: false,
      windowWidth: 960,
      width: 960,
      height: poster.offsetHeight
    });
    // JPG 约 3MB（适合直接传公众号）；PNG 无损但可能 15MB 以上
    const url = kind === 'png' ? canvas.toDataURL('image/png') : canvas.toDataURL('image/jpeg', 0.95);
    const a = document.createElement('a');
    a.href = url;
    a.download = `年度数据_${DATA.year || ''}_${Date.now()}.${kind === 'png' ? 'png' : 'jpg'}`;
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    setTimeout(() => a.remove(), 1500);
    btn.textContent = '已下载 ✓';
    setTimeout(() => { btn.textContent = oldLabel; }, 1800);
  } catch (e) {
    console.error(e);
    alert('导出失败：' + e.message + '\n可以直接用浏览器「打印 → 存储为 PDF」代替。');
    btn.textContent = oldLabel;
  } finally {
    stage.style.transform = prev;
    fit();
    btn.disabled = false;
  }
}

/* ---------- 数据面板 ---------- */
let DATA = null;
const LS_KEY = 'wy-annual-report-v1';

/* 宽容解析：允许行尾 // 注释、块注释、末尾多余逗号（字符串内的 // 不会误伤） */
function stripComments(t) {
  let out = '', inStr = false, esc = false;
  for (let i = 0; i < t.length; i++) {
    const ch = t[i];
    if (inStr) {
      out += ch;
      if (esc) esc = false;
      else if (ch === '\\') esc = true;
      else if (ch === '"') inStr = false;
      continue;
    }
    if (ch === '"') { inStr = true; out += ch; continue; }
    if (ch === '/' && t[i + 1] === '/') {
      while (i < t.length && t[i] !== '\n') i++;
      out += '\n';
      continue;
    }
    if (ch === '/' && t[i + 1] === '*') {
      i += 2;
      while (i < t.length && !(t[i] === '*' && t[i + 1] === '/')) i++;
      i++;
      continue;
    }
    out += ch;
  }
  return out;
}
function looseParse(text) {
  return JSON.parse(stripComments(text).replace(/,\s*([}\]])/g, '$1'));
}

/* 输出：标量数组按行折行，方便手改 */
function dump(v, ind = 0) {
  const pad = '  '.repeat(ind), pad2 = '  '.repeat(ind + 1);
  if (Array.isArray(v)) {
    if (v.length && v.every(x => x === null || typeof x !== 'object')) {
      const parts = []; let line = '';
      v.forEach(x => {
        line += (line ? ', ' : '') + JSON.stringify(x);
        if (line.length > 68) { parts.push(line); line = ''; }
      });
      if (line) parts.push(line);
      if (parts.length <= 1) return '[' + parts.join('') + ']';
      return '[\n' + parts.map(p => pad2 + p).join(',\n') + '\n' + pad + ']';
    }
    if (!v.length) return '[]';
    return '[\n' + v.map(x => pad2 + dump(x, ind + 1)).join(',\n') + '\n' + pad + ']';
  }
  if (v && typeof v === 'object') {
    const keys = Object.keys(v);
    if (!keys.length) return '{}';
    return '{\n' + keys.map(k => pad2 + JSON.stringify(k) + ': ' + dump(v[k], ind + 1)).join(',\n') + '\n' + pad + '}';
  }
  return JSON.stringify(v);
}

/* ================= 可视化表单 ================= */
const ICON_OPTS = ['', 'male', 'female', 'other', 'android', 'apple', 'mobile', 'tablet', 'desktop'];

function gv(p) { return p.split('.').reduce((a, k) => (a == null ? a : a[k]), DATA); }
function sv(p, v) {
  const ks = p.split('.'), last = ks.pop();
  const o = ks.reduce((a, k) => (a == null ? a : a[k]), DATA);
  if (o) o[last] = v;
}
function dv(p) {
  const ks = p.split('.'), last = ks.pop();
  const o = ks.reduce((a, k) => (a == null ? a : a[k]), DATA);
  if (o) delete o[last];
}

const fld = (l, inner, cls = '') => `<label class="fld ${cls}"><span>${esc(l)}</span>${inner}</label>`;
const txt = (p, v, ph = '') =>
  `<input class="f-in" type="text" data-p="${p}" data-t="text" value="${esc(v == null ? '' : v)}" placeholder="${esc(ph)}">`;
const numIn = (p, v, step = '0.1') =>
  `<input class="f-in f-num" type="number" step="${step}" data-p="${p}" data-t="num" value="${v == null ? '' : v}">`;
const colIn = (p, v) => `<input class="f-col" type="color" data-p="${p}" data-t="text" value="${esc(v || '#888888')}">`;
const numsIn = (p, arr, hint) =>
  `<textarea class="f-nums" rows="2" spellcheck="false" data-p="${p}" data-t="nums">${esc((arr || []).join(', '))}</textarea>${hint ? `<em class="f-hint">${esc(hint)}</em>` : ''}`;

function iconSel(p, v) {
  return `<select class="f-in f-sel" data-p="${p}" data-t="icon">` +
    ICON_OPTS.map(o => `<option value="${o}"${o === (v || '') ? ' selected' : ''}>${o || '文字'}</option>`).join('') +
    `</select>`;
}

/* 分段列表（性别 / 系统 / 语言 / 年龄 / 来源 / 分类通用） */
function segList(path, arr, o = {}) {
  arr = arr || [];
  const cls = o.icon ? ' has-icon' : '';
  const rows = arr.map((s, i) => `
    <div class="seg-row${cls}">
      ${o.color === false ? '' : colIn(`${path}.${i}.color`, s.color)}
      <input class="f-in" type="text" data-p="${path}.${i}.label" data-t="text" value="${esc(s.label)}" placeholder="标签">
      <input class="f-in f-num" type="number" step="0.1" data-p="${path}.${i}.value" data-t="num" value="${s.value == null ? '' : s.value}">
      ${o.icon ? iconSel(`${path}.${i}.icon`, s.icon) : ''}
      <button class="row-del" data-del="${path}" data-i="${i}" title="删除这一项">×</button>
    </div>`).join('');
  return `${rows || '<div class="f-hint" style="padding:2px 0 6px">还没有数据项</div>'}
    <button class="row-add" data-add="${path}">＋ 添加一项</button>`;
}

/* 图片字段：缩略图可点，支持本地选图（自动压缩后内嵌）或填链接 */
function imgField(p, v, o = {}) {
  const max = o.max || 900;
  const png = o.png ? ' data-png="1"' : '';
  return `<div class="imgf">
    <div class="imgf-thumb" data-file="${p}" data-max="${max}"${png}${v ? ` style="background-image:url('${esc(v)}')"` : ''}>${v ? '' : '选图'}</div>
    <div class="imgf-body">
      <input class="f-in" type="text" data-p="${p}" data-t="text" value="${esc(v || '')}" placeholder="${esc(o.ph || '图片链接，留空用默认占位')}">
      <div class="imgf-btns">
        <button class="mini" data-file="${p}" data-max="${max}"${png}>选本地图</button>
        ${v ? `<button class="mini" data-clear="${p}">清除</button>` : ''}
        ${o.hint ? `<em class="f-hint" style="margin:0">${esc(o.hint)}</em>` : ''}
      </div>
    </div>
  </div>`;
}

const sec = (t, body, open, hint) =>
  `<details class="f-sec"${open ? ' open' : ''}><summary>${esc(t)}${hint ? `<em>${esc(hint)}</em>` : ''}</summary><div class="f-grid">${body}</div></details>`;

function buildForm() {
  const f = DATA.followers || {}, pr = DATA.province || {}, src = DATA.sources || {},
    art = DATA.articles || {}, av = DATA.active || {}, ft = DATA.footer || {},
    inter = DATA.interaction || {}, daily = DATA.dailyViews || {};

  const pvRows = (pr.data || []).map((x, i) => `
    <label class="pv"><span title="${esc(x.name)}">${esc(x.name)}</span>
      <input class="f-in f-num" type="number" step="0.1" data-p="province.data.${i}.value" data-t="num" value="${x.value == null ? '' : x.value}">
    </label>`).join('');

  const avRows = (DATA.articleViews || []).map((it, i) => `
    <div class="avr">
      <div class="avr-thumb" data-file="articleViews.${i}.img" data-max="420"${it.img ? ` style="background-image:url('${esc(it.img)}')"` : ''}>${it.img ? '' : '封面'}</div>
      <input class="f-in" type="text" data-p="articleViews.${i}.title" data-t="text" value="${esc(it.title)}" placeholder="文章标题">
      <input class="f-in f-num" type="number" step="1" data-p="articleViews.${i}.value" data-t="num" value="${it.value == null ? '' : it.value}" placeholder="阅读数">
      <button class="row-del" data-del="articleViews" data-i="${i}" title="删除这篇">×</button>
    </div>`).join('');

  const interImgs = (inter.images || []).map((v, i) =>
    `<div class="full">${imgField(`interaction.images.${i}`, v, { max: 1000, hint: `第 ${i + 1} 张` })}</div>`).join('');

  return `
  ${sec('配色主题', `<div class="full">${themeChips()}</div>
    <div class="full theme-tip">九套都是暗色底，只换色相。默认按年份自动轮换（2025 赤焰 / 2026 深海 / 2027 松林 …），也可以在这里直接挑；选定后会写进数据，明年复制一份改年份就行。</div>`, true, THEMES[DATA.theme] ? THEMES[DATA.theme].name : '自动')}

  ${sec('基础信息', `
    ${fld('年份', numIn('year', DATA.year, '1'))}
    ${fld('账号名', txt('account', DATA.account))}
    ${fld('眉标（标题上方小字）', txt('kicker', DATA.kicker), 'full')}
    ${fld('副标题', txt('heroSub', DATA.heroSub), 'full')}
  `, true, '标题')}

  ${sec('关注者 · 性别', `<div class="full">${segList('followers.gender', f.gender, { icon: true })}</div>`, true, '图标标签')}

  ${sec('关注者 · 系统', `<div class="full">${segList('followers.os', f.os, { icon: true })}</div>`, false, '图标标签')}

  ${sec('关注者 · 增长', fld('Growth 百分比', numIn('followers.growth', f.growth)))}

  ${sec('读者语言', `<div class="full">${segList('followers.language', f.language)}</div>`)}

  ${sec('读者年龄', `<div class="full">${segList('followers.age', f.age)}</div>`)}

  ${sec('省份地图', `
    ${fld('地图上标注几个省', numIn('province.labelTop', pr.labelTop, '1'))}
    ${fld('地图下方说明', txt('province.note', pr.note), 'full')}
    <div class="full pv-grid">${pvRows}</div>
    <div class="full"><em class="f-hint">省份名固定写死，只改数值即可；填 0 表示不显示。</em></div>
  `, false, '34 个省级')}

  ${sec('Trend · 12 个月', `<div class="full">${numsIn('trend', DATA.trend, '12 个数字，按 1–12 月，逗号或空格分隔')}</div>`, false, '折线')}

  ${sec('Interaction · 三张图', interImgs, false, '封面')}

  ${sec('文章数据', `
    ${fld('一年篇数', numIn('articles.qty', art.qty, '1'))}
    ${fld('原创占比', txt('articles.original', art.original, '如 100%'))}
    ${fld('收藏', numIn('articles.favorites', art.favorites, '1'))}
    ${fld('分享', numIn('articles.shares', art.shares, '1'))}
  `)}

  ${sec('Reader Sources · 阅读来源', `
    ${fld('总次数', numIn('sources.total', src.total, '1'))}
    ${fld('单位', txt('sources.unit', src.unit, 'Times'))}
    <div class="full">${segList('sources.data', src.data)}</div>
  `, false, '环形图')}

  ${sec('Classification · 分类', `<div class="full">${segList('classification', DATA.classification)}</div>`, false, '柱状图')}

  ${sec('Active · 活跃度', `
    ${fld('列数', numIn('active.cols', av.cols, '1'))}
    ${fld('行数', numIn('active.rows', av.rows, '1'))}
    <div class="full">${numsIn('active.levels', av.levels, `共 ${(av.cols || 4) * (av.rows || 3)} 个点，0–1 之间的亮度`)}</div>
  `)}

  ${sec('Article Views · 文章阅读', `
    <div class="full">${avRows || '<div class="f-hint">还没有文章</div>'}</div>
    <div class="full"><button class="row-add" data-add="articleViews">＋ 添加一篇</button></div>
  `, false, '柱状图')}

  ${sec('Daily Views · 每日阅读', `<div class="full">${numsIn('dailyViews.values', daily.values, '一天一个数，一年 365 个；逗号或空格分隔')}</div>`)}

  ${sec('页脚', `
    <div class="full">${imgField('footer.avatar', ft.avatar, { max: 300, hint: '头像 / logo' })}</div>
    <div class="full">${imgField('footer.qr', ft.qr, { max: 700, png: true, hint: '二维码，自动保留 PNG 清晰度' })}</div>
    ${fld('页脚文字', txt('footer.text', ft.text))}
    ${fld('页脚小字', txt('footer.hint', ft.hint))}
  `)}`;
}

function themeChips() {
  const cur = (DATA.theme && THEMES[DATA.theme]) ? DATA.theme : autoTheme(DATA.year);
  return `<div class="theme-row">` + THEME_KEYS.map(k => {
    const t = THEMES[k];
    return `<div class="theme-chip${k === cur ? ' on' : ''}" data-theme="${k}" style="background:${t.bg}">
      <i style="background:${t.ink};box-shadow:0 0 10px rgba(${hexRGB(t.ink)},.45)"></i>
      <b style="color:${t.ink2}">${t.name}</b>
    </div>`;
  }).join('') + `</div>`;
}

function setTheme(key) {
  if (!THEMES[key]) return;
  DATA.theme = key;
  applyTheme(key);
  saveLocal();
  render(DATA);
  refreshForm();
  note('已换成「' + THEMES[key].name + '」');
}

/* ---- 表单交互 ---- */
let formEl = null, formBody = null, qTimer = null, msgTimer = null;

function note(t) {
  const m = document.getElementById('msg');
  if (!m) return;
  m.textContent = t;
  clearTimeout(msgTimer);
  msgTimer = setTimeout(() => { m.textContent = ''; }, 2200);
}

function saveLocal() {
  try {
    const s = JSON.stringify(DATA);
    if (s.length > 4.2e6) { note('图片较多，超过浏览器存储上限，本次没自动保存'); return; }
    localStorage.setItem(LS_KEY, s);
  } catch (e) {
    note('自动保存失败（本地存储已满）');
  }
}

function queue() {
  saveLocal();
  clearTimeout(qTimer);
  qTimer = setTimeout(() => render(DATA), 420);
}
function flush() {
  clearTimeout(qTimer);
  saveLocal();
  render(DATA);
}
function refreshForm() {
  if (!formBody) return;
  const sc = formEl ? formEl.scrollTop : 0;
  formBody.innerHTML = buildForm();
  if (formEl) formEl.scrollTop = sc;
}

function addRow(path) {
  const arr = gv(path);
  if (!Array.isArray(arr)) return;
  if (path === 'articleViews') arr.push({ title: '新文章', value: 0, img: '' });
  else arr.push({ label: '新标签', value: 0, color: T.pal[6] });
  refreshForm();
  queue();
}

/* 本地图片：等比缩到 maxW，照片转 JPG，二维码等保留 PNG */
function shrinkImg(file, maxW, png) {
  return new Promise((res, rej) => {
    const fr = new FileReader();
    fr.onload = () => {
      const im = new Image();
      im.onload = () => {
        const k = Math.min(1, maxW / im.width);
        const w = Math.max(1, Math.round(im.width * k)), h = Math.max(1, Math.round(im.height * k));
        const cv = document.createElement('canvas');
        cv.width = w; cv.height = h;
        const ctx = cv.getContext('2d');
        ctx.drawImage(im, 0, 0, w, h);
        res(png ? cv.toDataURL('image/png') : cv.toDataURL('image/jpeg', 0.9));
      };
      im.onerror = () => rej(new Error('图片解码失败'));
      im.src = fr.result;
    };
    fr.onerror = () => rej(new Error('文件读取失败'));
    fr.readAsDataURL(file);
  });
}

function pickFile(p, maxW, png) {
  const inp = document.createElement('input');
  inp.type = 'file';
  inp.accept = 'image/*';
  inp.onchange = async () => {
    const file = inp.files && inp.files[0];
    if (!file) return;
    try {
      if (/svg/i.test(file.type)) {
        const t = await file.text();
        sv(p, 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(t));
      } else {
        sv(p, await shrinkImg(file, maxW || 900, png));
      }
      refreshForm();
      queue();
    } catch (e) {
      note('图片处理失败：' + e.message);
    }
  };
  inp.click();
}

function onFormEdit(e) {
  const el = e.target.closest('[data-p]');
  if (!el) return;
  const p = el.dataset.p, t = el.dataset.t;

  // 改年份时，若配色一直是「按年份自动」，就跟着换一套
  if (p === 'year') {
    const oldY = DATA.year;
    const wasAuto = !DATA.theme || DATA.theme === autoTheme(oldY);
    sv('year', Number(el.value) || oldY);
    if (wasAuto) { DATA.theme = autoTheme(DATA.year); applyTheme(DATA.theme); }
    refreshForm();
    render(DATA);
    saveLocal();
    return;
  }

  if (t === 'num') sv(p, el.value === '' ? 0 : Number(el.value));
  else if (t === 'nums') sv(p, el.value.split(/[\s,，、]+/).filter(Boolean).map(Number).filter(n => !isNaN(n)));
  else if (t === 'icon') { if (el.value) sv(p, el.value); else dv(p); }
  else sv(p, el.value);
  queue();
}

function onFormClick(e) {
  const th = e.target.closest('[data-theme]');
  if (th) { setTheme(th.dataset.theme); return; }
  const add = e.target.closest('[data-add]');
  if (add) { addRow(add.dataset.add); return; }
  const del = e.target.closest('[data-del]');
  if (del) {
    const arr = gv(del.dataset.del);
    if (arr) { arr.splice(+del.dataset.i, 1); refreshForm(); queue(); }
    return;
  }
  const clr = e.target.closest('[data-clear]');
  if (clr) { sv(clr.dataset.clear, ''); refreshForm(); queue(); return; }
  const file = e.target.closest('[data-file]');
  if (file) pickFile(file.dataset.file, +file.dataset.max || 900, file.dataset.png === '1');
}

function boot() {
  try { GEO = JSON.parse(document.getElementById('geoData').textContent); } catch (e) { console.warn(e); }
  const saved = localStorage.getItem(LS_KEY);
  DATA = saved ? JSON.parse(saved) : JSON.parse(JSON.stringify(DEFAULT_DATA));
  // 数据里的颜色属于哪套主题：有 theme 就是它，旧版数据默认赤焰
  curTheme = (DATA.theme && THEMES[DATA.theme]) ? DATA.theme : 'ember';
  const legacy = LEGACY_PALS[curTheme];
  if (legacy) recolorData({ pal: legacy }, THEMES[curTheme]);
  applyTheme(curTheme, { recolor: false });
  render(DATA);

  const drawer = document.getElementById('drawer');
  const ta = document.getElementById('ta');
  formEl = document.getElementById('paneForm');
  formBody = document.getElementById('formBody');

  formBody.innerHTML = buildForm();
  formBody.addEventListener('input', onFormEdit);
  formBody.addEventListener('change', onFormEdit);
  formBody.addEventListener('click', onFormClick);

  function paintTab(name) {
    document.querySelectorAll('.tab').forEach(b => b.classList.toggle('on', b.dataset.tab === name));
    document.getElementById('paneForm').classList.toggle('on', name === 'form');
    document.getElementById('paneJson').classList.toggle('on', name === 'json');
  }

  function switchTab(name) {
    if (name === 'form') {
      // 从 JSON 切回来：先试着采用这段 JSON，改坏了就留在 JSON 页签提示
      if (ta.value.trim()) {
        try {
          const next = looseParse(ta.value);
          if (JSON.stringify(next) !== JSON.stringify(DATA)) {
            DATA = next; saveLocal(); refreshForm(); render(DATA);
          }
        } catch (e) {
          paintTab('json');
          note('JSON 还有问题，先改好：' + e.message);
          return;
        }
      }
    }
    paintTab(name);
    if (name === 'json') ta.value = dump(DATA);
  }
  document.querySelectorAll('.tab').forEach(b => { b.onclick = () => switchTab(b.dataset.tab); });

  document.getElementById('btnData').onclick = () => {
    drawer.classList.add('on');
    fit();
    const cur = document.querySelector('.tab.on');
    switchTab(cur ? cur.dataset.tab : 'form');
  };
  document.getElementById('btnClose').onclick = () => { drawer.classList.remove('on'); fit(); };

  document.getElementById('btnApply').onclick = () => {
    const jsonTab = document.querySelector('.tab.on') &&
      document.querySelector('.tab.on').dataset.tab === 'json';
    if (!jsonTab) { flush(); note('已按表单重绘 ✓'); return; }
    try {
      DATA = looseParse(ta.value);
      saveLocal();
      render(DATA);
      refreshForm();
      note('已应用 ✓');
    } catch (e) {
      note('JSON 格式有误：' + e.message);
    }
  };

  document.getElementById('btnReset').onclick = () => {
    if (!confirm('恢复成示例数据？当前填的内容会被覆盖。')) return;
    DATA = JSON.parse(JSON.stringify(DEFAULT_DATA));
    localStorage.removeItem(LS_KEY);
    ta.value = dump(DATA);
    refreshForm();
    render(DATA);
    note('已恢复示例数据');
  };

  document.getElementById('btnPng').onclick = () => exportImage('png');
  document.getElementById('btnJpg').onclick = () => exportImage('jpeg');
  window.addEventListener('resize', fit);
}

document.addEventListener('DOMContentLoaded', boot);
