'use strict';

// ─── COUNTRY DATA ────────────────────────────────────────────────────────────

const COUNTRY_FLAGS = {
  'CN':'🇨🇳','JP':'🇯🇵','KR':'🇰🇷','TH':'🇹🇭','SG':'🇸🇬',
  'MY':'🇲🇾','ID':'🇮🇩','VN':'🇻🇳','PH':'🇵🇭','IN':'🇮🇳',
  'AE':'🇦🇪','TR':'🇹🇷','EG':'🇪🇬','ZA':'🇿🇦','MA':'🇲🇦',
  'FR':'🇫🇷','IT':'🇮🇹','ES':'🇪🇸','DE':'🇩🇪','GB':'🇬🇧',
  'PT':'🇵🇹','GR':'🇬🇷','NL':'🇳🇱','CH':'🇨🇭','AT':'🇦🇹',
  'US':'🇺🇸','CA':'🇨🇦','MX':'🇲🇽','BR':'🇧🇷','AR':'🇦🇷',
  'AU':'🇦🇺','NZ':'🇳🇿','IS':'🇮🇸','NO':'🇳🇴','SE':'🇸🇪',
  'FI':'🇫🇮','DK':'🇩🇰','RU':'🇷🇺','CZ':'🇨🇿','HU':'🇭🇺',
  'PL':'🇵🇱','HR':'🇭🇷','RS':'🇷🇸','MV':'🇲🇻','LK':'🇱🇰',
  'NP':'🇳🇵','BT':'🇧🇹','KH':'🇰🇭','MM':'🇲🇲','LA':'🇱🇦',
  'PE':'🇵🇪','CL':'🇨🇱','CO':'🇨🇴','CR':'🇨🇷','CU':'🇨🇺',
  'NG':'🇳🇬','KE':'🇰🇪','TZ':'🇹🇿','ET':'🇪🇹','GH':'🇬🇭',
  'IL':'🇮🇱','SA':'🇸🇦','IR':'🇮🇷','PK':'🇵🇰','UZ':'🇺🇿',
  'KZ':'🇰🇿','MN':'🇲🇳','BD':'🇧🇩',
};

const CONTINENT_MAP = {
  'CN':'亚洲','JP':'亚洲','KR':'亚洲','TH':'亚洲','SG':'亚洲','MY':'亚洲','ID':'亚洲','VN':'亚洲','PH':'亚洲',
  'IN':'亚洲','AE':'亚洲','TR':'亚洲','IL':'亚洲','SA':'亚洲','IR':'亚洲','PK':'亚洲','UZ':'亚洲','KZ':'亚洲',
  'MN':'亚洲','BD':'亚洲','MV':'亚洲','LK':'亚洲','NP':'亚洲','BT':'亚洲','KH':'亚洲','MM':'亚洲','LA':'亚洲',
  'FR':'欧洲','IT':'欧洲','ES':'欧洲','DE':'欧洲','GB':'欧洲','PT':'欧洲','GR':'欧洲','NL':'欧洲','CH':'欧洲',
  'AT':'欧洲','IS':'欧洲','NO':'欧洲','SE':'欧洲','FI':'欧洲','DK':'欧洲','RU':'欧洲','CZ':'欧洲','HU':'欧洲',
  'PL':'欧洲','HR':'欧洲','RS':'欧洲',
  'US':'北美洲','CA':'北美洲','MX':'北美洲','CR':'北美洲','CU':'北美洲',
  'BR':'南美洲','AR':'南美洲','PE':'南美洲','CL':'南美洲','CO':'南美洲',
  'AU':'大洋洲','NZ':'大洋洲',
  'EG':'非洲','ZA':'非洲','MA':'非洲','NG':'非洲','KE':'非洲','TZ':'非洲','ET':'非洲','GH':'非洲',
};
const CONTINENT_TOTAL = { '亚洲':50,'欧洲':44,'北美洲':23,'南美洲':12,'非洲':54,'大洋洲':14 };

const COUNTRY_NAME_TO_CODE = {
  '中国':'CN','日本':'JP','韩国':'KR','泰国':'TH','新加坡':'SG','马来西亚':'MY','印度尼西亚':'ID',
  '越南':'VN','菲律宾':'PH','印度':'IN','阿联酋':'AE','土耳其':'TR','埃及':'EG','南非':'ZA',
  '摩洛哥':'MA','法国':'FR','意大利':'IT','西班牙':'ES','德国':'DE','英国':'GB','葡萄牙':'PT',
  '希腊':'GR','荷兰':'NL','瑞士':'CH','奥地利':'AT','美国':'US','加拿大':'CA','墨西哥':'MX',
  '巴西':'BR','阿根廷':'AR','澳大利亚':'AU','新西兰':'NZ','冰岛':'IS','挪威':'NO','瑞典':'SE',
  '芬兰':'FI','丹麦':'DK','俄罗斯':'RU','捷克':'CZ','匈牙利':'HU','波兰':'PL','克罗地亚':'HR',
  '塞尔维亚':'RS','马尔代夫':'MV','斯里兰卡':'LK','尼泊尔':'NP','柬埔寨':'KH','缅甸':'MM',
  '老挝':'LA','秘鲁':'PE','智利':'CL','哥伦比亚':'CO','哥斯达黎加':'CR','古巴':'CU',
  '尼日利亚':'NG','肯尼亚':'KE','坦桑尼亚':'TZ','埃塞俄比亚':'ET','加纳':'GH',
  '以色列':'IL','沙特阿拉伯':'SA','巴基斯坦':'PK','乌兹别克斯坦':'UZ','哈萨克斯坦':'KZ',
  '蒙古':'MN','孟加拉国':'BD','不丹':'BT','伊朗':'IR',
};

// 国家 ISO → 大致经纬度
const COUNTRY_LATLNG = {
  'US':[38,-97],'CA':[60,-96],'MX':[23,-102],'BR':[-10,-55],'AR':[-34,-64],
  'PE':[-10,-76],'CL':[-30,-71],'CO':[4,-72],
  'GB':[54,-2],'FR':[46,2],'ES':[40,-4],'PT':[39,-8],'DE':[51,10],
  'IT':[42,12],'CH':[47,8],'AT':[47,14],'NL':[52,5],'PL':[52,20],
  'CZ':[50,15],'HU':[47,19],'GR':[39,22],'TR':[39,35],'RU':[60,100],
  'NO':[62,10],'SE':[62,15],'FI':[64,26],'DK':[56,10],'IS':[65,-18],
  'EG':[26,30],'MA':[32,-6],'ZA':[-30,25],'NG':[10,8],'KE':[1,38],
  'ET':[9,39],'GH':[8,-1],
  'SA':[24,45],'AE':[24,54],'IL':[31,35],'IR':[32,53],
  'IN':[21,78],'PK':[30,70],'LK':[7,81],'MV':[3,73],'NP':[28,84],
  'CN':[35,105],'MN':[46,105],'KZ':[48,68],'JP':[36,138],'KR':[37,128],
  'TH':[15,101],'VN':[16,108],'MM':[17,96],'KH':[12,105],'SG':[1,104],
  'MY':[4,109],'ID':[-2,118],'PH':[12,122],'AU':[-27,133],'NZ':[-42,174],
};

const STAMP_COLORS = ['stamp-red','stamp-blue','stamp-green','stamp-purple','stamp-orange'];
const STAMP_ROTATIONS = [-3,-1,0,1,2,3,-2];

// ─── DATA STORE ──────────────────────────────────────────────────────────────

const STORAGE_KEY   = 'travel_journal_v5';
const AVATAR_KEY    = 'travel_avatars_v2';

function loadTrips() { try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; } catch { return []; } }
function saveTrips(t) { localStorage.setItem(STORAGE_KEY, JSON.stringify(t)); }
function loadAvatars() { try { return JSON.parse(localStorage.getItem(AVATAR_KEY)) || []; } catch { return []; } }
function saveAvatars(a) { localStorage.setItem(AVATAR_KEY, JSON.stringify(a)); }

let trips   = loadTrips();
let avatars = loadAvatars();

// ─── UTILS ───────────────────────────────────────────────────────────────────

function genId() { return Date.now().toString(36) + Math.random().toString(36).slice(2,7); }
function formatMoney(n) { if (!n||isNaN(n)) return '¥0'; return '¥'+Math.round(n).toLocaleString('zh-CN'); }
function tripDays(t) { if (!t.startDate||!t.endDate) return 0; return Math.max(1,Math.round((new Date(t.endDate)-new Date(t.startDate))/86400000)+1); }
function tripTotalExpense(t) { const e=t.expense||{}; return (e.flight||0)+(e.hotel||0)+(e.food||0)+(e.tickets||0)+(e.other||0); }
function getFlag(code,name) { if (code&&COUNTRY_FLAGS[code.toUpperCase()]) return COUNTRY_FLAGS[code.toUpperCase()]; if (name&&COUNTRY_NAME_TO_CODE[name]) return COUNTRY_FLAGS[COUNTRY_NAME_TO_CODE[name]]||'🌍'; return '🌍'; }
function getCode(code,name) { if (code) return code.toUpperCase().slice(0,2); if (name&&COUNTRY_NAME_TO_CODE[name]) return COUNTRY_NAME_TO_CODE[name]; return name?name.slice(0,2).toUpperCase():'??'; }
function formatDate(d) { if (!d) return ''; const dt=new Date(d); return `${dt.getFullYear()}年${dt.getMonth()+1}月${dt.getDate()}日`; }
function showToast(msg,dur=3000) { const el=document.getElementById('toast'); el.textContent=msg; el.classList.add('show'); setTimeout(()=>el.classList.remove('show'),dur); }
function starsHtml(n) { const f=Math.round(n||0); return '★'.repeat(f)+'☆'.repeat(5-f); }

// ─── NAVIGATION ──────────────────────────────────────────────────────────────

let currentPage = 'home';
let pieChartInst = null;
let barChartInst = null;

function navigate(page, opts={}) {
  if (page===currentPage && page!=='add' && page!=='detail') return;
  currentPage = page;
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n=>n.classList.remove('active'));
  const el = document.getElementById('page-'+page);
  if (el) el.classList.add('active');
  const nav = document.querySelector(`.nav-item[data-page="${page}"]`);
  if (nav) nav.classList.add('active');
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('overlay').classList.remove('show');

  if (page==='home')    renderHome();
  if (page==='trips')   renderTripsList();
  if (page==='expense') renderExpense();
  if (page==='passport') renderPassport();
  if (page==='avatar')  renderAvatarPage();
  if (page==='detail' && opts.tripId) renderDetail(opts.tripId);
  if (page==='add') { if (opts.editId) openEditForm(opts.editId); else resetAddForm(); }
}

document.addEventListener('click', e => {
  const btn = e.target.closest('[data-page]');
  if (btn) { e.preventDefault(); const p=btn.dataset.page; if (p!=='detail') navigate(p); }
});
document.getElementById('menuBtn').addEventListener('click', ()=>{
  document.getElementById('sidebar').classList.toggle('open');
  document.getElementById('overlay').classList.toggle('show');
});
document.getElementById('overlay').addEventListener('click', ()=>{
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('overlay').classList.remove('show');
});

// ─── LEAFLET MAP ─────────────────────────────────────────────────────────────

let leafletMap = null;
let visitedMarkers = [];

function initLeafletMap() {
  if (leafletMap) return;
  leafletMap = L.map('leafletMap', {
    center: [20, 0],
    zoom: 2,
    minZoom: 1,
    maxZoom: 6,
    zoomControl: true,
    attributionControl: false,
  });

  // 使用 CartoDB Positron 瓦片（清晰美观，无需 API key）
  L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    subdomains: 'abcd',
    maxZoom: 19,
  }).addTo(leafletMap);

  // Attribution minimal
  L.control.attribution({ prefix: '' }).addTo(leafletMap);

  renderMapPins();
}

// 城市名 → 精确经纬度（200+ 常见旅游城市）
const CITY_LATLNG = {
  '北京':[39.91,116.39],'上海':[31.22,121.47],'广州':[23.12,113.25],'深圳':[22.54,114.06],
  '成都':[30.57,104.07],'西安':[34.27,108.93],'杭州':[30.25,120.15],'南京':[32.06,118.77],
  '重庆':[29.56,106.55],'武汉':[30.59,114.30],'厦门':[24.48,118.09],'三亚':[18.25,109.51],
  '丽江':[26.87,100.23],'桂林':[25.27,110.29],'张家界':[29.13,110.48],'黄山':[30.13,118.16],
  '东京':[35.68,139.69],'京都':[35.01,135.77],'大阪':[34.69,135.50],'奈良':[34.68,135.83],
  '名古屋':[35.18,136.91],'北海道':[43.06,141.35],'札幌':[43.06,141.35],'冲绳':[26.21,127.68],
  '首尔':[37.57,126.98],'釜山':[35.10,129.04],'济州岛':[33.49,126.53],
  '曼谷':[13.75,100.52],'清迈':[18.80,98.99],'普吉岛':[7.88,98.39],'芭提雅':[12.93,100.88],
  '苏梅岛':[9.51,100.06],'清莱':[19.91,99.83],
  '新加坡':[1.35,103.82],
  '吉隆坡':[3.14,101.69],'槟城':[5.41,100.34],'亚庇':[5.98,116.07],
  '河内':[21.03,105.85],'胡志明市':[10.78,106.70],'岘港':[16.07,108.22],'会安':[15.88,108.34],
  '巴厘岛':[-8.65,115.22],'雅加达':[-6.21,106.85],'日惹':[-7.80,110.36],'龙目岛':[-8.65,116.32],
  '马尼拉':[14.59,120.98],'宿务':[10.32,123.90],'长滩岛':[11.97,121.92],
  '金边':[11.56,104.92],'暹粒':[13.36,103.86],
  '仰光':[16.85,96.18],'曼德勒':[21.98,96.08],
  '孟买':[19.08,72.88],'德里':[28.61,77.23],'加尔各答':[22.57,88.36],'泰姬陵':[27.17,78.04],
  '斋浦尔':[26.91,75.79],'瓦拉纳西':[25.32,83.01],'果阿':[15.30,74.12],
  '科伦坡':[6.93,79.85],'加德满都':[27.71,85.31],
  '迪拜':[25.20,55.27],'阿布扎比':[24.47,54.37],'多哈':[25.28,51.54],
  '伊斯坦布尔':[41.01,28.95],'卡帕多奇亚':[38.64,34.83],'棉花堡':[37.92,29.12],'伊兹密尔':[38.42,27.14],
  '开罗':[30.06,31.25],'卢克索':[25.69,32.64],'亚历山大':[31.19,29.90],'阿斯旺':[24.09,32.90],
  '巴黎':[48.86,2.35],'尼斯':[43.71,7.26],'里昂':[45.75,4.83],'波尔多':[44.84,-0.58],'马赛':[43.30,5.37],
  '罗马':[41.90,12.50],'米兰':[45.47,9.19],'佛罗伦萨':[43.77,11.25],'威尼斯':[45.44,12.33],
  '那不勒斯':[40.85,14.27],'西西里':[ 37.60,14.01],'科莫湖':[45.81,9.08],
  '马德里':[40.42,-3.70],'巴塞罗那':[41.39,2.15],'塞维利亚':[37.39,-5.99],'格拉纳达':[37.18,-3.60],
  '瓦伦西亚':[39.47,-0.38],'毕尔巴鄂':[43.26,-2.93],
  '柏林':[52.52,13.41],'慕尼黑':[48.14,11.58],'汉堡':[53.55,9.99],'法兰克福':[50.11,8.68],
  '科隆':[50.94,6.96],'海德堡':[49.40,8.69],'纽伦堡':[49.45,11.08],
  '阿姆斯特丹':[52.37,4.90],'鹿特丹':[51.92,4.48],'布鲁塞尔':[50.85,4.35],'布鲁日':[51.21,3.22],
  '苏黎世':[47.38,8.54],'日内瓦':[46.20,6.15],'卢塞恩':[47.05,8.31],'因特拉肯':[46.69,7.86],
  '维也纳':[48.21,16.37],'萨尔茨堡':[47.80,13.04],'因斯布鲁克':[47.27,11.39],
  '布达佩斯':[47.50,19.04],'布拉格':[50.08,14.44],'华沙':[52.23,21.01],'克拉科夫':[50.06,19.94],
  '雅典':[37.98,23.73],'圣托里尼':[36.39,25.46],'米科诺斯':[37.45,25.33],'克里特':[35.24,24.81],
  '杜布罗夫尼克':[42.65,18.09],'斯普利特':[43.51,16.44],
  '斯德哥尔摩':[59.33,18.07],'哥本哈根':[55.68,12.57],'奥斯陆':[59.91,10.75],'赫尔辛基':[60.17,24.94],
  '贝尔根':[60.39,5.32],'弗洛姆':[60.86,7.11],
  '里斯本':[38.72,-9.14],'波尔图':[41.15,-8.61],'阿尔加维':[37.19,-7.93],
  '伦敦':[51.51,-0.13],'爱丁堡':[55.95,-3.19],'都柏林':[53.33,-6.25],'曼彻斯特':[53.48,-2.24],
  '雷克雅未克':[64.13,-21.82],'黄金圈':[64.32,-20.12],
  '莫斯科':[55.75,37.62],'圣彼得堡':[59.95,30.32],
  '纽约':[40.71,-74.01],'洛杉矶':[34.05,-118.24],'旧金山':[37.77,-122.42],
  '拉斯维加斯':[36.17,-115.14],'西雅图':[47.61,-122.33],'芝加哥':[41.88,-87.63],
  '迈阿密':[25.77,-80.19],'华盛顿':[38.91,-77.04],'波士顿':[42.36,-71.06],
  '奥兰多':[28.54,-81.38],'新奥尔良':[29.95,-90.07],'大峡谷':[36.10,-112.11],
  '黄石公园':[44.43,-110.59],'夏威夷':[20.80,-156.33],'火奴鲁鲁':[21.31,-157.86],
  '伯克利':[37.87,-122.27],
  '温哥华':[49.25,-123.12],'多伦多':[43.65,-79.38],'蒙特利尔':[45.50,-73.57],
  '魁北克':[46.81,-71.21],'班夫':[51.18,-115.57],'尼亚加拉瀑布':[43.09,-79.08],
  '墨西哥城':[19.43,-99.13],'坎昆':[21.16,-86.85],'图卢姆':[20.21,-87.47],
  '里约热内卢':[-22.91,-43.17],'圣保罗':[-23.55,-46.63],'萨尔瓦多':[-12.97,-38.50],
  '布宜诺斯艾利斯':[-34.60,-58.38],'巴塔哥尼亚':[-45.87,-71.32],'伊瓜苏':[-25.69,-54.44],
  '利马':[-12.05,-77.04],'马丘比丘':[-13.16,-72.54],'库斯科':[-13.52,-71.97],
  '圣地亚哥':[-33.45,-70.67],'复活节岛':[-27.11,-109.37],'阿塔卡马':[-22.91,-68.17],
  '悉尼':[-33.87,151.21],'墨尔本':[-37.81,144.96],'布里斯班':[-27.47,153.02],
  '黄金海岸':[-28.02,153.40],'凯恩斯':[-16.92,145.77],'乌鲁鲁':[-25.34,131.04],'珀斯':[-31.95,115.86],
  '奥克兰':[-36.87,174.77],'皇后镇':[-45.03,168.66],'基督城':[-43.53,172.64],'罗托鲁阿':[-38.14,176.25],
  '开普敦':[-33.93,18.42],'约翰内斯堡':[-26.20,28.04],'德班':[-29.86,31.02],
  '马拉喀什':[31.63,-7.99],'菲斯':[34.03,-5.00],'卡萨布兰卡':[33.59,-7.62],'舍夫沙万':[35.17,-5.27],
  '内罗毕':[-1.29,36.82],'桑给巴尔':[-6.17,39.19],'马赛马拉':[-1.51,35.14],
  '阿克拉':[5.56,-0.20],'拉各斯':[6.45,3.40],'亚的斯亚贝巴':[9.02,38.74],
};

function renderMapPins() {
  if (!leafletMap) return;
  visitedMarkers.forEach(m => leafletMap.removeLayer(m));
  visitedMarkers = [];

  // 按城市去重（同一城市只标记一次，但允许不同城市的同一国家都标记）
  const seenCity = new Set();
  trips.forEach(trip => {
    const cityKey = trip.city + '|' + (trip.countryCode||trip.country);
    if (seenCity.has(cityKey)) return;
    seenCity.add(cityKey);

    const ll = getCityLatLng(trip.city, trip.countryCode);
    if (!ll) return;

    const flag = getFlag(trip.countryCode, trip.country);
    const spotsCount = (trip.spots||[]).length;
    const icon = L.divIcon({
      className: '',
      html: `<div class="lmap-pin">
        <div class="lmap-dot"></div>
        <div class="lmap-label">${flag} ${trip.city}</div>
      </div>`,
      iconSize: [12, 12],
      iconAnchor: [6, 6],
    });
    const marker = L.marker(ll, { icon })
      .addTo(leafletMap)
      .bindPopup(`<div style="min-width:130px;font-family:inherit">
        <div style="font-size:1.1rem;font-weight:700;margin-bottom:4px">${flag} ${trip.city}</div>
        <div style="font-size:.8rem;color:#888;margin-bottom:4px">${trip.country} · ${formatDate(trip.startDate)}</div>
        ${spotsCount>0?`<div style="font-size:.8rem;color:var(--primary,#e8622a)">📍 ${spotsCount} 个打卡景点</div>`:''}
      </div>`);
    visitedMarkers.push(marker);
  });
}

function getCityLatLng(cityName, countryCode) {
  if (CITY_LATLNG[cityName]) return CITY_LATLNG[cityName];
  if (countryCode && COUNTRY_LATLNG[countryCode]) return COUNTRY_LATLNG[countryCode];
  return null;
}

// ─── HOME ────────────────────────────────────────────────────────────────────

function renderHome() {
  const countries = new Set(trips.map(t=>t.country));
  const totalDays = trips.reduce((s,t)=>s+tripDays(t),0);
  const totalExp  = trips.reduce((s,t)=>s+tripTotalExpense(t),0);

  animateCounter('stat-countries', countries.size);
  animateCounter('stat-trips', trips.length);
  animateCounter('stat-days', totalDays);
  document.getElementById('stat-total-expense').textContent = formatMoney(totalExp);
  document.getElementById('nav-stat').textContent = `${trips.length} 次旅行`;

  // Init or refresh Leaflet
  setTimeout(() => {
    initLeafletMap();
    renderMapPins();
    leafletMap.invalidateSize();
  }, 100);

  const grid = document.getElementById('recentTripsGrid');
  const recent = [...trips].reverse().slice(0,3);
  if (!recent.length) {
    grid.innerHTML = `<div class="empty-state"><div class="empty-icon">🌐</div>
      <p>还没有旅行记录，<a href="#" data-page="add">点击添加</a>你的第一次旅行！</p></div>`;
    return;
  }
  grid.innerHTML = recent.map(t=>buildTripCard(t)).join('');
}

function animateCounter(id, target) {
  const el = document.getElementById(id); if (!el) return;
  let cur=0; const step=Math.max(1,Math.ceil(target/30));
  const t = setInterval(()=>{ cur=Math.min(cur+step,target); el.textContent=cur; if(cur>=target)clearInterval(t); },30);
}

// ─── TRIP CARDS ──────────────────────────────────────────────────────────────

// 构建带 fallback 的图片 HTML（外链失败时显示渐变色+emoji）
function buildImgHtml(trip, cssClass='') {
  const grad = trip.imageFallbackGradient || 'linear-gradient(135deg,#667eea,#764ba2)';
  const emoji = trip.imageFallbackEmoji || getFlag(trip.countryCode, trip.country);
  if (trip.image) {
    // onerror: 图片加载失败时，隐藏img，在父元素追加fallback span
    const onErr = `this.style.display='none';var s=document.createElement('span');s.className='img-fallback-icon';s.textContent='${emoji}';this.parentElement.appendChild(s);`;
    return `<div class="${cssClass}" style="background:${grad}">
      <img src="${trip.image}" alt="" loading="lazy"
        style="width:100%;height:100%;object-fit:cover;display:block"
        onerror="${onErr}"/>
    </div>`;
  }
  return `<div class="${cssClass}" style="background:${grad}"><span class="img-fallback-icon">${emoji}</span></div>`;
}

function buildTripCard(trip) {
  const flag=getFlag(trip.countryCode,trip.country);
  const exp=tripTotalExpense(trip);
  const days=tripDays(trip);
  const tags=(trip.tags||[]).map(t=>`<span class="trip-tag">${t}</span>`).join('');
  return `<div class="trip-card" onclick="openDetail('${trip.id}')">
    ${buildImgHtml(trip,'trip-card-img')}
    <div class="trip-card-body">
      <div class="trip-card-meta">
        <span class="trip-card-country">${trip.country} · ${days}天</span>
        <span class="trip-card-flag">${flag}</span>
      </div>
      <div class="trip-card-title">${trip.city}</div>
      <div class="trip-card-dates">📅 ${formatDate(trip.startDate)} — ${formatDate(trip.endDate)}</div>
      <div class="trip-card-tags">${tags}</div>
      ${exp>0?`<div class="trip-card-expense">💸 ${formatMoney(exp)}</div>`:''}
    </div>
  </div>`;
}

function buildTripListItem(trip) {
  const flag=getFlag(trip.countryCode,trip.country);
  const exp=tripTotalExpense(trip);
  const days=tripDays(trip);
  const tags=(trip.tags||[]).map(t=>`<span class="trip-tag">${t}</span>`).join('');
  const companions=(trip.companions||[]);
  const spots=(trip.spots||[]).length;
  const compHtml = companions.length
    ? companions.map(c=>`<span class="companion-badge"><span class="cb-icon">👤</span>${c}</span>`).join('')
    : '';
  return `<div class="trip-list-item" id="list-item-${trip.id}" onclick="openDetail('${trip.id}')" style="cursor:pointer">
    ${buildImgHtml(trip,'trip-list-thumb')}
    <div class="trip-list-info">
      <div class="trip-list-header">
        <span class="trip-list-flag">${flag}</span>
        <span class="trip-list-title">${trip.city}</span>
        <span class="trip-list-country">${trip.country}</span>
        <span class="trip-list-arrow">›</span>
      </div>
      <div class="trip-list-dates">📅 ${formatDate(trip.startDate)} — ${formatDate(trip.endDate)} · ${days}天</div>
      ${trip.notes?`<div class="trip-list-notes">${trip.notes}</div>`:''}
      <div class="trip-card-tags">${tags}</div>
      ${compHtml?`<div class="companions-row">${compHtml}</div>`:''}
      <div class="trip-list-footer">
        ${exp>0?`<span class="trip-list-expense">💸 ${formatMoney(exp)}</span>`:''}
        ${spots>0?`<span style="font-size:.82rem;color:var(--text-m)">📍 ${spots} 个景点</span>`:''}
        <div class="trip-list-actions">
          <button class="btn-edit" onclick="startEdit('${trip.id}',event)">✏️ 编辑</button>
          <button class="btn-del"  onclick="deleteTrip('${trip.id}',event)">🗑 删除</button>
        </div>
      </div>
    </div>
  </div>`;
}

// ─── TRIPS LIST ──────────────────────────────────────────────────────────────

let activeFilter='all', searchQuery='';

function renderTripsList() {
  let filtered=[...trips].reverse();
  if (activeFilter!=='all') filtered=filtered.filter(t=>(t.tags||[]).includes(activeFilter));
  if (searchQuery) { const q=searchQuery.toLowerCase(); filtered=filtered.filter(t=>t.city.toLowerCase().includes(q)||t.country.toLowerCase().includes(q)); }
  const list=document.getElementById('tripsListFull');
  if (!filtered.length) { list.innerHTML=`<div class="empty-state"><div class="empty-icon">🗺️</div><p>暂无符合条件的旅行记录，<a href="#" data-page="add">去添加</a></p></div>`; return; }
  list.innerHTML=filtered.map(t=>buildTripListItem(t)).join('');
}

document.getElementById('searchInput').addEventListener('input', e=>{ searchQuery=e.target.value.trim(); renderTripsList(); });
document.getElementById('filterTags').addEventListener('click', e=>{
  const tag=e.target.closest('.tag'); if (!tag) return;
  document.querySelectorAll('#filterTags .tag').forEach(t=>t.classList.remove('active'));
  tag.classList.add('active'); activeFilter=tag.dataset.filter; renderTripsList();
});

function deleteTrip(id,e) {
  e.stopPropagation();
  if (!confirm('确认删除这条旅行记录？')) return;
  trips=trips.filter(t=>t.id!==id); saveTrips(trips); renderTripsList(); showToast('✅ 旅行记录已删除');
}
function startEdit(id,e) { e.stopPropagation(); navigate('add',{editId:id}); }

// ─── ADD / EDIT FORM ─────────────────────────────────────────────────────────

document.getElementById('tagSelector').addEventListener('click', e=>{ const tag=e.target.closest('.sel-tag'); if (tag) tag.classList.toggle('selected'); });
['f-flight','f-hotel','f-food','f-tickets','f-other'].forEach(id=>{ document.getElementById(id).addEventListener('input', updateFormExpenseTotal); });

function updateFormExpenseTotal() {
  const total=['f-flight','f-hotel','f-food','f-tickets','f-other'].reduce((s,id)=>s+(parseFloat(document.getElementById(id).value)||0),0);
  document.getElementById('formExpenseTotal').textContent=formatMoney(total);
}

function resetAddForm() {
  document.getElementById('formPageTitle').textContent='新增旅行记录';
  document.getElementById('submitBtn').textContent='🗺️ 保存旅行记录';
  document.getElementById('tripForm').reset();
  document.getElementById('f-id').value='';
  document.querySelectorAll('.sel-tag.selected').forEach(t=>t.classList.remove('selected'));
  document.getElementById('formExpenseTotal').textContent='¥ 0';
}

function openEditForm(id) {
  const trip=trips.find(t=>t.id===id); if (!trip) return;
  document.getElementById('formPageTitle').textContent='编辑旅行记录';
  document.getElementById('submitBtn').textContent='💾 保存修改';
  document.getElementById('f-id').value=id;
  document.getElementById('f-city').value=trip.city||'';
  document.getElementById('f-country').value=trip.country||'';
  document.getElementById('f-code').value=trip.countryCode||'';
  document.getElementById('f-start').value=trip.startDate||'';
  document.getElementById('f-end').value=trip.endDate||'';
  document.getElementById('f-notes').value=trip.notes||'';
  document.getElementById('f-companions').value=(trip.companions||[]).join('、');
  document.getElementById('f-image').value=trip.image||'';
  const e=trip.expense||{};
  document.getElementById('f-flight').value=e.flight||'';
  document.getElementById('f-hotel').value=e.hotel||'';
  document.getElementById('f-food').value=e.food||'';
  document.getElementById('f-tickets').value=e.tickets||'';
  document.getElementById('f-other').value=e.other||'';
  updateFormExpenseTotal();
  document.querySelectorAll('.sel-tag').forEach(el=>el.classList.toggle('selected',(trip.tags||[]).includes(el.dataset.tag)));
}

document.getElementById('cancelBtn').addEventListener('click', ()=>{
  const fid=document.getElementById('f-id').value;
  if (fid) navigate('detail',{tripId:fid}); else navigate('trips');
});

document.getElementById('tripForm').addEventListener('submit', e=>{
  e.preventDefault();
  const city=document.getElementById('f-city').value.trim();
  const country=document.getElementById('f-country').value.trim();
  const code=document.getElementById('f-code').value.trim().toUpperCase()||getCode('',country);
  const start=document.getElementById('f-start').value;
  const end=document.getElementById('f-end').value;
  const notes=document.getElementById('f-notes').value.trim();
  const compRaw=document.getElementById('f-companions').value.trim();
  const companions=compRaw?compRaw.split(/[,，、\s]+/).map(s=>s.trim()).filter(Boolean):[];
  const image=document.getElementById('f-image').value.trim();
  const tags=[...document.querySelectorAll('.sel-tag.selected')].map(t=>t.dataset.tag);
  if (!city||!country||!start||!end) { showToast('⚠️ 请填写目的地、国家和日期'); return; }
  if (new Date(end)<new Date(start)) { showToast('⚠️ 返回日期不能早于出发日期'); return; }
  const expense={
    flight:parseFloat(document.getElementById('f-flight').value)||0,
    hotel:parseFloat(document.getElementById('f-hotel').value)||0,
    food:parseFloat(document.getElementById('f-food').value)||0,
    tickets:parseFloat(document.getElementById('f-tickets').value)||0,
    other:parseFloat(document.getElementById('f-other').value)||0,
  };
  const fid=document.getElementById('f-id').value;
  if (fid) {
    const idx=trips.findIndex(t=>t.id===fid);
    if (idx!==-1) trips[idx]={...trips[idx],city,country,countryCode:code,startDate:start,endDate:end,notes,companions,image,tags,expense};
    saveTrips(trips); showToast(`✅ 《${city}》已更新！`); navigate('detail',{tripId:fid});
  } else {
    trips.push({id:genId(),city,country,countryCode:code,startDate:start,endDate:end,notes,companions,image,tags,expense,spots:[],createdAt:Date.now()});
    saveTrips(trips); showToast(`✈️ 《${city}》旅行记录已保存！`); navigate('home');
  }
  resetAddForm();
});

// ─── TRIP DETAIL ─────────────────────────────────────────────────────────────

let currentDetailId=null;

function openDetail(id) { currentDetailId=id; navigate('detail',{tripId:id}); }

function renderDetail(id) {
  currentDetailId=id;
  const trip=trips.find(t=>t.id===id); if (!trip) { navigate('trips'); return; }
  const flag=getFlag(trip.countryCode,trip.country);
  const exp=tripTotalExpense(trip);
  const days=tripDays(trip);
  const tags=(trip.tags||[]).map(t=>`<span class="trip-tag">${t}</span>`).join('');
  const companions=(trip.companions||[]);
  const compHtml=companions.length
    ? `<div style="margin-top:12px"><strong style="font-size:.85rem;color:var(--text-m)">👫 同行伙伴</strong>
       <div class="companions-row">${companions.map(c=>`<span class="companion-badge"><span class="cb-icon">👤</span>${c}</span>`).join('')}</div></div>`
    : '';
  const imgBlock = buildImgHtml(trip, 'detail-hero-img');
  const e=trip.expense||{};
  const expRows=[['✈️ 机票',e.flight],['🏨 酒店',e.hotel],['🍽️ 餐饮',e.food],['🎫 门票',e.tickets],['💼 其他',e.other]]
    .filter(([,v])=>v>0).map(([l,v])=>`<div class="detail-exp-item"><div class="detail-exp-label">${l}</div><div class="detail-exp-val">${formatMoney(v)}</div></div>`).join('');
  document.getElementById('detailContent').innerHTML=`
    <div class="detail-hero">
      ${imgBlock}
      <div class="detail-hero-body">
        <div class="detail-hero-top">
          <div class="detail-city">${trip.city}</div>
          <div class="detail-country-badge">${flag} ${trip.country}</div>
        </div>
        <div class="detail-meta-row">
          <div class="detail-meta-item">📅 <strong>${formatDate(trip.startDate)}</strong> — <strong>${formatDate(trip.endDate)}</strong></div>
          <div class="detail-meta-item">⏱️ <strong>${days} 天</strong></div>
          ${exp>0?`<div class="detail-meta-item">💸 总花费 <strong>${formatMoney(exp)}</strong></div>`:''}
        </div>
        <div class="detail-tags">${tags}</div>
        ${trip.notes?`<div class="detail-notes">${trip.notes}</div>`:''}
        ${compHtml}
        ${expRows?`<div class="detail-expense-row">${expRows}<div class="detail-exp-item" style="background:linear-gradient(135deg,#FFF3EE,#FEE5D6);border:1px dashed var(--primary-l)"><div class="detail-exp-label">💰 合计</div><div class="detail-exp-val">${formatMoney(exp)}</div></div></div>`:''}
      </div>
    </div>`;
  document.getElementById('detailBackBtn').onclick=()=>navigate('trips');
  document.getElementById('detailEditBtn').onclick=()=>navigate('add',{editId:id});
  document.getElementById('detailDeleteBtn').onclick=()=>{
    if (!confirm('确认删除这条旅行记录？')) return;
    trips=trips.filter(t=>t.id!==id); saveTrips(trips); showToast('✅ 旅行记录已删除'); navigate('trips');
  };
  renderSpots(id);
}

// ─── SPOTS ───────────────────────────────────────────────────────────────────

let starValue=0;

function getTripSpots(tid) { const t=trips.find(t=>t.id===tid); return t?(t.spots||[]): []; }
function saveTripSpots(tid,spots) { const idx=trips.findIndex(t=>t.id===tid); if (idx!==-1){trips[idx].spots=spots;saveTrips(trips);} }

function renderSpots(tid) {
  const spots=getTripSpots(tid);
  const trip=trips.find(t=>t.id===tid)||{};
  const list=document.getElementById('spotsList');
  if (!spots.length) { list.innerHTML=`<div class="spot-empty"><span>📍</span><p>还没有景点记录，点击上方按钮开始添加！</p></div>`; return; }
  list.innerHTML=spots.map(s=>{
    const photo=s.photo?`<div class="spot-thumb"><img src="${s.photo}" alt="" loading="lazy" onerror="this.parentElement.innerHTML='🏛️'"/></div>`:`<div class="spot-thumb">🏛️</div>`;
    // 搜索关键词：景点名 + 城市（有城市则拼接），用 Google Maps 搜索
    const searchQ = encodeURIComponent(`${s.name}${trip.city?' '+trip.city:''}`);
    const mapUrl  = `https://www.google.com/maps/search/?api=1&query=${searchQ}`;
    return `<div class="spot-item">${photo}<div class="spot-info">
      <div class="spot-top">
        <a class="spot-name spot-name-link" href="${mapUrl}" target="_blank" rel="noopener" title="在地图中查看">${s.name} <span class="spot-map-icon">🗺️</span></a>
        ${s.rating?`<span class="spot-stars">${starsHtml(s.rating)}</span>`:''}
        ${s.date?`<span class="spot-date">📅 ${formatDate(s.date)}</span>`:''}
      </div>
      ${s.note?`<div class="spot-note">${s.note}</div>`:''}
      ${s.cost>0?`<div class="spot-cost">🎫 门票 ${formatMoney(s.cost)}</div>`:''}
      <div class="spot-actions"><button class="btn-spot-edit" onclick="editSpot('${s.id}')">✏️ 编辑</button><button class="btn-spot-del" onclick="deleteSpot('${s.id}')">🗑 删除</button></div>
    </div></div>`;
  }).join('');
}

document.getElementById('starPicker').addEventListener('click', e=>{ const s=e.target.closest('.star'); if (!s) return; starValue=parseInt(s.dataset.v); document.getElementById('sf-rating').value=starValue; updateStarPicker(starValue); });
document.getElementById('starPicker').addEventListener('mouseover', e=>{ const s=e.target.closest('.star'); if (!s) return; updateStarPicker(parseInt(s.dataset.v)); });
document.getElementById('starPicker').addEventListener('mouseleave', ()=>updateStarPicker(starValue));
function updateStarPicker(n) { document.querySelectorAll('#starPicker .star').forEach((s,i)=>s.classList.toggle('on',i<n)); }

document.getElementById('addSpotBtn').addEventListener('click', ()=>{
  starValue=0; updateStarPicker(0);
  ['sf-name','sf-date','sf-note','sf-photo','sf-cost','sf-id'].forEach(id=>document.getElementById(id).value='');
  document.getElementById('sf-rating').value='0';
  document.getElementById('spotForm').style.display='block';
  document.getElementById('sf-name').focus();
});
document.getElementById('cancelSpotBtn').addEventListener('click', ()=>{ document.getElementById('spotForm').style.display='none'; });
document.getElementById('saveSpotBtn').addEventListener('click', ()=>{
  const name=document.getElementById('sf-name').value.trim(); if (!name) { showToast('⚠️ 请填写景点名称'); return; }
  const spot={ id:document.getElementById('sf-id').value||genId(), name, date:document.getElementById('sf-date').value, rating:parseInt(document.getElementById('sf-rating').value)||0, note:document.getElementById('sf-note').value.trim(), photo:document.getElementById('sf-photo').value.trim(), cost:parseFloat(document.getElementById('sf-cost').value)||0 };
  const spots=getTripSpots(currentDetailId);
  const idx=spots.findIndex(s=>s.id===spot.id);
  if (idx!==-1) spots[idx]=spot; else spots.push(spot);
  saveTripSpots(currentDetailId,spots);
  document.getElementById('spotForm').style.display='none';
  renderSpots(currentDetailId);
  showToast(`📍 景点「${name}」已保存`);
});
function editSpot(sid) {
  const s=getTripSpots(currentDetailId).find(sp=>sp.id===sid); if (!s) return;
  starValue=s.rating||0;
  document.getElementById('sf-id').value=s.id;
  document.getElementById('sf-name').value=s.name;
  document.getElementById('sf-date').value=s.date||'';
  document.getElementById('sf-rating').value=s.rating||0;
  document.getElementById('sf-note').value=s.note||'';
  document.getElementById('sf-photo').value=s.photo||'';
  document.getElementById('sf-cost').value=s.cost||'';
  updateStarPicker(starValue);
  document.getElementById('spotForm').style.display='block';
  document.getElementById('sf-name').focus();
}
function deleteSpot(sid) {
  if (!confirm('删除这个景点记录？')) return;
  saveTripSpots(currentDetailId, getTripSpots(currentDetailId).filter(s=>s.id!==sid));
  renderSpots(currentDetailId); showToast('✅ 景点已删除');
}

// ─── EXPENSE ─────────────────────────────────────────────────────────────────

function renderExpense() {
  const total=trips.reduce((s,t)=>s+tripTotalExpense(t),0);
  const avg=trips.length?total/trips.length:0;
  document.getElementById('exp-total').textContent=formatMoney(total);
  document.getElementById('exp-avg').textContent=formatMoney(avg);
  let maxTrip=null,maxVal=0;
  trips.forEach(t=>{ const v=tripTotalExpense(t); if(v>maxVal){maxVal=v;maxTrip=t;} });
  document.getElementById('exp-max-trip').textContent=maxTrip?maxTrip.city:'—';
  const ce={};
  trips.forEach(t=>{ce[t.country]=(ce[t.country]||0)+tripTotalExpense(t);});
  const sorted=Object.entries(ce).sort((a,b)=>b[1]-a[1]);
  document.getElementById('exp-max-country').textContent=sorted.length?sorted[0][0]:'—';
  renderPieChart(); renderBarChart(sorted); renderLeaderboard();
}

function renderPieChart() {
  const totals={flight:0,hotel:0,food:0,tickets:0,other:0};
  trips.forEach(t=>{const e=t.expense||{};Object.keys(totals).forEach(k=>totals[k]+=e[k]||0);});
  const data=[totals.flight,totals.hotel,totals.food,totals.tickets,totals.other];
  if (pieChartInst){pieChartInst.destroy();pieChartInst=null;}
  const ctx=document.getElementById('pieChart').getContext('2d');
  if (!data.some(v=>v>0)){ctx.clearRect(0,0,300,300);ctx.fillStyle='#ccc';ctx.font='16px sans-serif';ctx.textAlign='center';ctx.fillText('暂无花费数据',150,150);return;}
  pieChartInst=new Chart(ctx,{type:'doughnut',data:{labels:['✈️ 机票','🏨 酒店','🍽️ 餐饮','🎫 门票','💼 其他'],datasets:[{data,backgroundColor:['#E8622A','#2A7DE8','#27AE60','#F0B429','#8E44AD'],borderWidth:3,borderColor:'#fff',hoverOffset:10}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{position:'bottom',labels:{padding:16,font:{size:12}}},tooltip:{callbacks:{label:c=>` ${c.label}: ${formatMoney(c.raw)}`}}},cutout:'60%'}});
}
function renderBarChart(sorted) {
  if (barChartInst){barChartInst.destroy();barChartInst=null;}
  const ctx=document.getElementById('barChart').getContext('2d');
  if (!sorted||!sorted.length){ctx.fillStyle='#ccc';ctx.font='16px sans-serif';ctx.textAlign='center';ctx.fillText('暂无数据',150,150);return;}
  const top=sorted.slice(0,8);
  barChartInst=new Chart(ctx,{type:'bar',data:{labels:top.map(([c])=>c),datasets:[{label:'花费（元）',data:top.map(([,v])=>v),backgroundColor:top.map((_,i)=>`hsl(${i*35+15},80%,55%)`),borderRadius:8,borderSkipped:false}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false},tooltip:{callbacks:{label:c=>formatMoney(c.raw)}}},scales:{y:{ticks:{callback:v=>'¥'+(v/1000).toFixed(0)+'k'},grid:{color:'#f0ede6'}},x:{grid:{display:false}}}}});
}
function renderLeaderboard() {
  const lb=document.getElementById('expenseLeaderboard');
  const sorted=[...trips].map(t=>({...t,_exp:tripTotalExpense(t)})).filter(t=>t._exp>0).sort((a,b)=>b._exp-a._exp).slice(0,10);
  if (!sorted.length){lb.innerHTML=`<div class="empty-state"><div class="empty-icon">💰</div><p>暂无花费数据</p></div>`;return;}
  const max=sorted[0]._exp;
  lb.innerHTML=sorted.map((t,i)=>{
    const pct=Math.round(t._exp/max*100);const flag=getFlag(t.countryCode,t.country);
    const ric=['🥇','🥈','🥉'];const rc=['gold','silver','bronze'];
    return `<div class="leaderboard-item"><div class="lb-rank ${rc[i]||'other'}">${ric[i]||(i+1)}</div><div class="lb-info"><div class="lb-title">${flag} ${t.city} · ${t.country}</div><div class="lb-sub">${formatDate(t.startDate)} — ${formatDate(t.endDate)}</div><div class="lb-bar-wrap"><div class="lb-bar-bg"><div class="lb-bar-fill" style="width:${pct}%"></div></div></div></div><div class="lb-amount">${formatMoney(t._exp)}</div></div>`;
  }).join('');
}

// ─── AI ──────────────────────────────────────────────────────────────────────

document.getElementById('generateAiBtn').addEventListener('click', ()=>{
  if (!trips.length){showToast('⚠️ 请先添加旅行记录再生成报告');return;}
  const btn=document.getElementById('generateAiBtn');
  btn.textContent='🔄 分析中…';btn.disabled=true;
  setTimeout(()=>{btn.innerHTML='<span class="btn-icon">🤖</span> 重新生成报告';btn.disabled=false;renderAiCards();},1200);
});

function renderAiCards() {
  const c=document.getElementById('aiInsightsContainer');
  const totalTrips=trips.length,countries=[...new Set(trips.map(t=>t.country))];
  const allTags=trips.flatMap(t=>t.tags||[]),tagCount={};
  allTags.forEach(t=>tagCount[t]=(tagCount[t]||0)+1);
  const topTags=Object.entries(tagCount).sort((a,b)=>b[1]-a[1]).slice(0,5);
  const cc={};trips.forEach(t=>cc[t.country]=(cc[t.country]||0)+1);
  const topCountry=Object.entries(cc).sort((a,b)=>b[1]-a[1])[0];
  const totalDays=trips.reduce((s,t)=>s+tripDays(t),0),totalExpense=trips.reduce((s,t)=>s+tripTotalExpense(t),0);
  const yc={};trips.forEach(t=>{const y=t.startDate?new Date(t.startDate).getFullYear():'未知';yc[y]=(yc[y]||0)+1;});
  const topYear=Object.entries(yc).sort((a,b)=>b[1]-a[1])[0];
  const cv={};trips.forEach(t=>{const code=getCode(t.countryCode,t.country);const cont=CONTINENT_MAP[code]||'其他';if(!cv[cont])cv[cont]=new Set();cv[cont].add(code);});

  // All companions across trips
  const allComps=new Set(trips.flatMap(t=>t.companions||[]));

  const year=topYear?topYear[0]:new Date().getFullYear();
  const kwHtml=topTags.slice(0,3).map(([t])=>`<span class="ai-keyword">${t}</span>`).join('');
  const cards=[];
  cards.push(`<div class="ai-card featured"><div class="ai-card-icon">✨</div><div class="ai-card-title">年度旅行关键词</div><div class="ai-card-content">${year} 年，你的旅行关键词是：<div class="ai-keywords">${kwHtml||'<span class="ai-keyword">探索世界</span>'}</div></div></div>`);
  cards.push(`<div class="ai-card"><div class="ai-card-icon">📊</div><div class="ai-card-title">旅行总览</div><div class="ai-card-content"><p>共完成了 <strong>${totalTrips} 次</strong>旅行，</p><p>足迹遍布 <strong>${countries.length} 个</strong>国家，</p><p>累计 <strong>${totalDays} 天</strong>在旅途中。</p></div></div>`);
  if (allComps.size>0) {
    const cl=[...allComps].map(c=>`<span class="ai-keyword dark">👤 ${c}</span>`).join('');
    cards.push(`<div class="ai-card"><div class="ai-card-icon">👫</div><div class="ai-card-title">旅行小队</div><div class="ai-card-content">你的旅行伙伴有 <strong>${allComps.size} 位</strong>：<div class="ai-keywords" style="margin-top:10px">${cl}</div></div></div>`);
  }
  if (topCountry) {
    const f=getFlag(getCode('',topCountry[0]),topCountry[0]);
    cards.push(`<div class="ai-card"><div class="ai-card-icon">${f}</div><div class="ai-card-title">最常去的国家</div><div class="ai-card-content">你最常去的国家是 <strong>${topCountry[0]}</strong>，已前往 <strong>${topCountry[1]} 次</strong>！${topCountry[1]>2?'<br><br>看来你是这里的常客 😄':''}</div></div>`);
  }
  if (topTags.length) {
    const bars=topTags.slice(0,5).map(([t,cnt])=>{const pct=Math.round(cnt/totalTrips*100);return `<div class="ai-progress-bar"><span class="ai-pbar-label">${t}</span><div class="ai-pbar-track"><div class="ai-pbar-fill" style="width:${Math.min(pct,100)}%"></div></div><span class="ai-pbar-val">${cnt}次</span></div>`;}).join('');
    cards.push(`<div class="ai-card"><div class="ai-card-icon">🎯</div><div class="ai-card-title">旅行类型偏好</div><div class="ai-card-content">你最喜欢的旅行类型是 <strong>${topTags[0][0]}</strong> 旅行。<br/><br/>${bars}</div></div>`);
  }
  if (totalExpense>0) {
    const epd=totalDays?Math.round(totalExpense/totalDays):0;
    cards.push(`<div class="ai-card"><div class="ai-card-icon">💸</div><div class="ai-card-title">花费洞察</div><div class="ai-card-content">旅行总花费 <strong>${formatMoney(totalExpense)}</strong>，平均每次 <strong>${formatMoney(totalExpense/totalTrips)}</strong>。<br/>日均花费约 <strong>${formatMoney(epd)}</strong>。</div></div>`);
  }
  const ck=Object.keys(cv);
  if (ck.length) {
    const cl=ck.map(cont=>`<span class="ai-keyword dark">${cont} ${cv[cont].size}国</span>`).join('');
    cards.push(`<div class="ai-card"><div class="ai-card-icon">🗺️</div><div class="ai-card-title">大洲分布</div><div class="ai-card-content">足迹已覆盖 <strong>${ck.length}</strong> 个大洲：<div class="ai-keywords">${cl}</div></div></div>`);
  }
  const pers=guessPersonality(topTags);
  cards.push(`<div class="ai-card"><div class="ai-card-icon">🧭</div><div class="ai-card-title">旅行人格</div><div class="ai-card-content"><strong>${pers.title}</strong><br/><br/>${pers.desc}</div></div>`);
  cards.push(`<div class="ai-card"><div class="ai-card-icon">🔭</div><div class="ai-card-title">下一站推荐</div><div class="ai-card-content">${suggestNextDest(trips,topTags)}</div></div>`);
  c.innerHTML=cards.join('');
}

function guessPersonality(topTags) {
  const top=topTags[0]?.[0]||'';
  const map={'美食':{title:'🍜 美食猎人',desc:'你对美食充满热情，每到一处都要探寻当地最地道的味道。'},'海岛':{title:'🏖️ 阳光追逐者',desc:'蓝天、沙滩、海浪——这是你的旅行标配。'},'历史':{title:'🏛️ 时光旅行者',desc:'古迹、博物馆、历史街区……你对文明的痕迹充满好奇。'},'城市':{title:'🏙️ 都市探索家',desc:'你热爱感受不同城市的脉搏与气息。'},'自然':{title:'🌿 自然徒步者',desc:'山川、森林、湖泊……你喜欢在大自然中寻找心灵的宁静。'},'冒险':{title:'🧗 极限冒险家',desc:'你天生勇敢，喜欢突破边界，挑战自我极限。'},'文化':{title:'🎭 文化深度游者',desc:'旅行是你了解世界多样性的窗口。'},'购物':{title:'🛍️ 购物达人',desc:'你总能发现最值得带回家的纪念品。'}};
  return map[top]||{title:'✈️ 全能旅行者',desc:'你的旅行风格多元，兼容并蓄。世界是你的游乐场！'};
}
function suggestNextDest(trips,topTags) {
  const visited=new Set(trips.map(t=>t.country));const topTag=topTags[0]?.[0]||'';
  const sugg={'美食':[['意大利','🇮🇹','罗马的披萨令人难忘'],['日本','🇯🇵','拉面、寿司等待你探索']],'海岛':[['马尔代夫','🇲🇻','碧蓝印度洋'],['希腊','🇬🇷','圣托里尼蓝白相间']],'历史':[['埃及','🇪🇬','金字塔与五千年文明'],['希腊','🇬🇷','雅典卫城']],'自然':[['挪威','🇳🇴','峡湾与极光'],['新西兰','🇳🇿','壮美风光']],'城市':[['新加坡','🇸🇬','花园城市'],['阿联酋','🇦🇪','迪拜奇观']]};
  const list=sugg[topTag]||sugg['城市'];
  const pick=list.find(([c])=>!visited.has(c))||list[0];
  return `根据你的旅行偏好，<strong>${pick[0]}</strong> ${pick[1]} 可能是你的理想下一站。<br/><br/>${pick[2]}`;
}

// ─── PASSPORT ────────────────────────────────────────────────────────────────

function renderPassport() {
  const visited=getVisitedCountries();const total=visited.length;
  document.getElementById('passport-count').textContent=total;
  document.getElementById('passport-world-pct').textContent=Math.round(total/195*100)+'%';
  document.getElementById('passport-stamps').textContent=total;
  renderStamps(visited);renderContinentProgress(visited);
}
function getVisitedCountries() {
  const map={};
  trips.forEach(t=>{const code=getCode(t.countryCode,t.country);if(!map[code])map[code]={code,country:t.country,flag:getFlag(t.countryCode,t.country),firstVisit:t.startDate};else if(t.startDate<map[code].firstVisit)map[code].firstVisit=t.startDate;});
  return Object.values(map);
}
function renderStamps(visited) {
  const grid=document.getElementById('stampsGrid');
  if (!visited.length){grid.innerHTML=`<div class="empty-stamp-hint"><span>📮</span><p>开始旅行，收集你的第一个印章！</p></div>`;return;}
  grid.innerHTML=visited.map((v,i)=>{
    const col=STAMP_COLORS[i%STAMP_COLORS.length],rot=STAMP_ROTATIONS[i%STAMP_ROTATIONS.length];
    const d=v.firstVisit?new Date(v.firstVisit).toLocaleDateString('zh-CN',{year:'numeric',month:'2-digit'}):'';
    return `<div class="stamp ${col}" style="--rot:${rot}deg" title="${v.country}"><div class="stamp-flag">${v.flag}</div><div class="stamp-code">${v.code}</div><div class="stamp-name">${v.country.length>4?v.country.slice(0,4):v.country}</div><div class="stamp-date">${d}</div></div>`;
  }).join('');
}
function renderContinentProgress(visited) {
  const cv={};visited.forEach(v=>{const c=CONTINENT_MAP[v.code]||'其他';cv[c]=(cv[c]||0)+1;});
  const conts=['亚洲','欧洲','北美洲','南美洲','非洲','大洋洲'];
  const icons={'亚洲':'🌏','欧洲':'🌍','北美洲':'🌎','南美洲':'🌎','非洲':'🌍','大洋洲':'🌏'};
  document.getElementById('continentsProgress').innerHTML=conts.map(cont=>{
    const vc=cv[cont]||0,tc=CONTINENT_TOTAL[cont]||10,pct=Math.min(100,Math.round(vc/tc*100));
    return `<div class="continent-card"><div class="continent-card-header"><span class="continent-name">${icons[cont]} ${cont}</span><span class="continent-count">${vc} / ${tc} 国</span></div><div class="continent-bar-track"><div class="continent-bar-fill" style="width:${pct}%"></div></div></div>`;
  }).join('');
}

// ─── AVATAR SYSTEM ───────────────────────────────────────────────────────────

/* 全新扁平卡通风格，viewBox 0 0 200 280
   人物比例：头部 80px 高，身体 90px，腿 60px
   所有坐标精心校正，避免错位 */

const AV_SKINS  = ['#FDDBB4','#F5C18C','#E8A96A','#C87941','#8D5524','#4A2912'];
const AV_HAIR_COLORS = ['#1A1A1A','#3B2314','#7B3F00','#C8860A','#FF8C00','#FF6B9D','#7B68EE','#AAAAAA','#EEEEEE'];

// 所有 hair svg 在 viewBox 0 0 200 280，头顶约 y=30，头中心 (100,80)
const AV_HAIR_STYLES = [
  { id:'short1',  label:'短发', svg: (hc)=>`<path d="M58,80 Q58,38 100,33 Q142,38 142,80 L138,72 Q100,48 62,72 Z" fill="${hc}"/>` },
  { id:'short2',  label:'寸头', svg: (hc)=>`<path d="M60,80 Q60,35 100,30 Q140,35 140,80 L137,70 Q100,44 63,70 Z" fill="${hc}"/><rect x="60" y="60" width="80" height="14" rx="7" fill="${hc}"/>` },
  { id:'mid1',    label:'中分', svg: (hc)=>`<path d="M55,85 Q55,33 100,28 Q145,33 145,85 L142,73 Q100,46 58,73 Z" fill="${hc}"/>` },
  { id:'long1',   label:'长直', svg: (hc)=>`<path d="M57,78 Q57,34 100,29 Q143,34 143,78 L148,165 Q130,155 100,160 Q70,155 52,165 Z" fill="${hc}"/>` },
  { id:'curly',   label:'卷发', svg: (hc)=>`<ellipse cx="100" cy="58" rx="44" ry="28" fill="${hc}"/><circle cx="60" cy="78" r="14" fill="${hc}"/><circle cx="140" cy="78" r="14" fill="${hc}"/>` },
  { id:'ponytail',label:'马尾', svg: (hc)=>`<path d="M60,80 Q60,36 100,31 Q140,36 140,80 L137,72 Q100,46 63,72 Z" fill="${hc}"/><path d="M140,68 Q162,88 157,128 Q149,122 152,90 Z" fill="${hc}"/>` },
  { id:'bun',     label:'丸子', svg: (hc)=>`<path d="M62,78 Q62,36 100,31 Q138,36 138,78 L135,70 Q100,46 65,70 Z" fill="${hc}"/><circle cx="132" cy="44" r="12" fill="${hc}"/>` },
  { id:'none',    label:'光头', svg: ()=>`` },
];

const AV_EYES = [
  { id:'normal',  label:'圆眼', svg:(sc)=>`<circle cx="84" cy="82" r="9" fill="white"/><circle cx="84" cy="82" r="5.5" fill="${sc||'#222'}"/><circle cx="86" cy="80" r="1.5" fill="white"/>
    <circle cx="116" cy="82" r="9" fill="white"/><circle cx="116" cy="82" r="5.5" fill="${sc||'#222'}"/><circle cx="118" cy="80" r="1.5" fill="white"/>` },
  { id:'happy',   label:'笑眼', svg:()=>`<path d="M75,80 Q84,90 93,80" fill="none" stroke="#222" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M107,80 Q116,90 125,80" fill="none" stroke="#222" stroke-width="2.5" stroke-linecap="round"/>` },
  { id:'star',    label:'星星', svg:()=>`<text x="84" y="89" font-size="16" text-anchor="middle">⭐</text><text x="116" y="89" font-size="16" text-anchor="middle">⭐</text>` },
  { id:'heart',   label:'爱心', svg:()=>`<text x="84" y="89" font-size="16" text-anchor="middle">❤️</text><text x="116" y="89" font-size="16" text-anchor="middle">❤️</text>` },
  { id:'wink',    label:'眨眼', svg:(sc)=>`<path d="M75,80 Q84,90 93,80" fill="none" stroke="#222" stroke-width="2.5" stroke-linecap="round"/>
    <circle cx="116" cy="82" r="9" fill="white"/><circle cx="116" cy="82" r="5.5" fill="${sc||'#222'}"/><circle cx="118" cy="80" r="1.5" fill="white"/>` },
  { id:'glasses', label:'眼镜', svg:(sc)=>`<circle cx="84" cy="82" r="9" fill="white"/><circle cx="84" cy="82" r="5.5" fill="${sc||'#222'}"/>
    <circle cx="116" cy="82" r="9" fill="white"/><circle cx="116" cy="82" r="5.5" fill="${sc||'#222'}"/>
    <rect x="74" y="72" width="20" height="20" rx="8" fill="none" stroke="#555" stroke-width="2"/>
    <rect x="106" y="72" width="20" height="20" rx="8" fill="none" stroke="#555" stroke-width="2"/>
    <line x1="94" y1="82" x2="106" y2="82" stroke="#555" stroke-width="1.8"/>` },
];

// 服装：肩点约 (68,148) 和 (132,148)，身体 y:148-218
const AV_OUTFITS = [
  { id:'tshirt',   label:'T恤',   color:'#4A90D9', svg:(oc)=>`
    <path d="M68,148 L50,138 L66,128 L78,148 L100,142 L122,148 L134,128 L150,138 L132,148 L132,218 L68,218 Z" fill="${oc}"/>
    <path d="M78,148 Q100,155 122,148" fill="none" stroke="rgba(255,255,255,.25)" stroke-width="1.5"/>` },
  { id:'suit',     label:'西装',  color:'#2C3E50', svg:(oc)=>`
    <path d="M68,148 L50,136 L66,126 L80,148 L100,140 L120,148 L134,126 L150,136 L132,148 L132,218 L68,218 Z" fill="${oc}"/>
    <path d="M88,148 L100,140 L112,148 L107,168 L100,165 L93,168 Z" fill="#ECF0F1"/>
    <rect x="97" y="168" width="6" height="28" rx="2" fill="#E74C3C"/>` },
  { id:'dress',    label:'连衣裙', color:'#E91E8C', svg:(oc)=>`
    <path d="M72,148 L56,138 L70,128 L82,148 L100,142 L118,148 L130,128 L144,138 L128,148 L138,218 L62,218 Z" fill="${oc}"/>
    <path d="M62,195 L138,195 L148,218 L52,218 Z" fill="${oc}" opacity="0.75"/>
    <path d="M84,128 Q100,118 116,128" fill="none" stroke="rgba(255,255,255,.4)" stroke-width="1.5"/>` },
  { id:'hoodie',   label:'卫衣',  color:'#8E44AD', svg:(oc)=>`
    <path d="M66,148 L48,136 L64,126 L76,147 L100,140 L124,147 L136,126 L152,136 L134,148 L134,218 L66,218 Z" fill="${oc}"/>
    <ellipse cx="100" cy="132" rx="16" ry="10" fill="${oc}" opacity="0.65"/>
    <path d="M84,132 Q100,138 116,132" fill="none" stroke="rgba(255,255,255,.3)" stroke-width="1.5"/>` },
  { id:'explorer', label:'探险家', color:'#D4AC0D', svg:(oc)=>`
    <path d="M68,148 L50,138 L66,128 L78,148 L100,142 L122,148 L134,128 L150,138 L132,148 L132,218 L68,218 Z" fill="${oc}"/>
    <rect x="80" y="148" width="40" height="30" rx="3" fill="${oc}" opacity="0.65"/>
    <line x1="100" y1="150" x2="100" y2="177" stroke="rgba(0,0,0,.18)" stroke-width="1.5"/>
    <line x1="81" y1="163" x2="119" y2="163" stroke="rgba(0,0,0,.18)" stroke-width="1.5"/>` },
  { id:'swimsuit', label:'泳衣',  color:'#1ABC9C', svg:(oc)=>`
    <path d="M76,148 L60,140 L73,130 L84,148 L100,142 L116,148 L127,130 L140,140 L124,148 L124,192 L76,192 Z" fill="${oc}"/>
    <path d="M76,192 L68,218 L88,216 L100,200 L112,216 L132,218 L124,192 Z" fill="${oc}"/>` },
];

// 配件
const AV_ACCESSORIES = [
  { id:'none',      label:'无',   svg:()=>`` },
  { id:'backpack',  label:'背包', svg:()=>`<rect x="120" y="136" width="28" height="38" rx="8" fill="#6D4C41"/><rect x="122" y="138" width="24" height="9" rx="3" fill="#5D4037"/><rect x="122" y="148" width="24" height="1.5" fill="#5D4037"/>` },
  { id:'camera',    label:'相机', svg:()=>`<rect x="108" y="160" width="26" height="18" rx="4" fill="#424242"/><circle cx="121" cy="169" r="6" fill="#78909C"/><circle cx="121" cy="169" r="3.5" fill="#1A237E"/><rect x="113" y="155" width="9" height="6" rx="2" fill="#424242"/>` },
  { id:'hat',       label:'草帽', svg:()=>`<ellipse cx="100" cy="54" rx="50" ry="10" fill="#D4AC0D"/><ellipse cx="100" cy="52" rx="32" ry="18" fill="#C9A80C"/>` },
  { id:'sunhat',    label:'太阳帽', svg:()=>`<ellipse cx="100" cy="52" rx="52" ry="9" fill="#E53935"/><path d="M62,52 Q100,32 138,52 Z" fill="#C62828"/>` },
  { id:'scarf',     label:'围巾', svg:()=>`<path d="M74,143 Q100,152 126,143 L123,153 Q100,161 77,153 Z" fill="#E53935"/><path d="M118,150 L130,176 L125,177 L113,151 Z" fill="#E53935"/>` },
  { id:'sunglasses',label:'墨镜', svg:()=>`<rect x="68" y="77" width="24" height="13" rx="5" fill="#1A1A1A" opacity=".88"/><rect x="108" y="77" width="24" height="13" rx="5" fill="#1A1A1A" opacity=".88"/><line x1="92" y1="83" x2="108" y2="83" stroke="#1A1A1A" stroke-width="2"/>` },
];

const AV_BACKGROUNDS = [
  { id:'none',     label:'纯色',  svg:()=>`<rect width="200" height="280" fill="#F6F3EE"/>` },
  { id:'beach',    label:'海滩',  svg:()=>`<rect width="200" height="280" fill="#87CEEB"/><rect y="168" width="200" height="112" fill="#F4D03F" opacity=".7"/><ellipse cx="100" cy="168" rx="100" ry="16" fill="#3498DB" opacity=".55"/>` },
  { id:'city',     label:'城市',  svg:()=>`<rect width="200" height="280" fill="#2C3E50"/><rect x="8" y="110" width="28" height="120" fill="#34495E"/><rect x="44" y="75" width="36" height="155" fill="#2C3E50"/><rect x="90" y="90" width="30" height="140" fill="#34495E"/><rect x="130" y="65" width="40" height="165" fill="#2C3E50"/><rect y="235" width="200" height="45" fill="#1A252F"/><circle cx="35" cy="38" r="18" fill="#F39C12" opacity=".75"/>` },
  { id:'mountain', label:'山景',  svg:()=>`<rect width="200" height="280" fill="#C9E8F5"/><polygon points="0,165 55,72 110,165" fill="#95A5A6"/><polygon points="55,165 120,55 185,165" fill="#BDC3C7"/><polygon points="125,165 165,92 200,165" fill="#95A5A6"/><rect y="165" width="200" height="115" fill="#27AE60" opacity=".55"/>` },
  { id:'forest',   label:'森林',  svg:()=>`<rect width="200" height="280" fill="#145A32"/><polygon points="18,165 44,85 70,165" fill="#1E8449"/><polygon points="55,165 88,65 121,165" fill="#27AE60"/><polygon points="112,165 145,78 178,165" fill="#1E8449"/><rect y="185" width="200" height="95" fill="#7D6608" opacity=".45"/>` },
  { id:'aurora',   label:'极光',  svg:()=>`<rect width="200" height="280" fill="#0D0D2B"/><path d="M0,90 Q50,55 100,90 Q150,125 200,90" fill="none" stroke="#00FF7F" stroke-width="7" opacity=".55"/><path d="M0,118 Q50,83 100,118 Q150,153 200,118" fill="none" stroke="#7B68EE" stroke-width="5" opacity=".45"/><circle cx="168" cy="22" r="6" fill="#FFF" opacity=".6"/><circle cx="30" cy="35" r="4" fill="#FFF" opacity=".5"/>` },
];

const AV_EYE_COLORS = ['#222','#7B3F00','#1B5E20','#0D47A1','#616161','#AD1457'];

// ─── DEFAULT AVATAR ────────────────────────────────────────────────────────

function defaultAvatar(name='我', role='旅行者') {
  return {
    id: genId(), name, role,
    skin: AV_SKINS[0], hairStyle: 'short1', hairColor: AV_HAIR_COLORS[0],
    eyes: 'normal', eyeColor: AV_EYE_COLORS[0],
    outfit: 'explorer', outfitColor: AV_OUTFITS.find(o=>o.id==='explorer').color,
    acc: 'backpack', bg: 'mountain',
  };
}

// ─── BUILD SVG ─────────────────────────────────────────────────────────────
/* viewBox: 0 0 200 280
   背景层 → 腿 → 服装（含肩袖） → 手臂 → 脖子 → 头部 → 发型 → 五官 → 配件 */
function buildAvatarSvg(av, w=200, h=280) {
  const bg   = AV_BACKGROUNDS.find(b=>b.id===av.bg) || AV_BACKGROUNDS[0];
  const hair = AV_HAIR_STYLES.find(h=>h.id===av.hairStyle) || AV_HAIR_STYLES[0];
  const eye  = AV_EYES.find(e=>e.id===av.eyes) || AV_EYES[0];
  const out  = AV_OUTFITS.find(o=>o.id===av.outfit) || AV_OUTFITS[0];
  const acc  = AV_ACCESSORIES.find(a=>a.id===av.acc) || AV_ACCESSORIES[0];

  // 腿（y:218-278）— 在服装之下绘制
  const legs = `
    <rect x="78" y="218" width="16" height="52" rx="6" fill="${darken(av.skin,.12)}"/>
    <rect x="106" y="218" width="16" height="52" rx="6" fill="${darken(av.skin,.12)}"/>
    <ellipse cx="86" cy="272" rx="13" ry="6" fill="#1A1A2E"/>
    <ellipse cx="114" cy="272" rx="13" ry="6" fill="#1A1A2E"/>`;

  // 手臂：单段圆角矩形（rx足够大使两端呈圆形），旋转自上臂起点
  // 左臂以 (51,151) 为旋转基点，向左倾斜 -14°；右臂镜像
  const arms = `
    <rect x="45" y="150" width="12" height="56" rx="6" fill="${av.skin}" transform="rotate(-14,51,150)"/>
    <rect x="143" y="150" width="12" height="56" rx="6" fill="${av.skin}" transform="rotate(14,149,150)"/>`;

  // 脖子（y:122-148），宽 28px，精确对接头部底部和服装领口
  const neck = `<rect x="86" y="122" width="28" height="30" rx="6" fill="${av.skin}"/>`;

  // 头部（椭圆中心 100,80，rx=42 ry=46）
  const head = `<ellipse cx="100" cy="80" rx="42" ry="46" fill="${av.skin}"/>`;

  // 耳朵（贴合头部侧边）
  const ears = `
    <ellipse cx="58" cy="80" rx="7" ry="10" fill="${av.skin}"/>
    <ellipse cx="142" cy="80" rx="7" ry="10" fill="${av.skin}"/>`;

  // 腮红
  const blush = `
    <ellipse cx="75" cy="96" rx="10" ry="6" fill="rgba(255,150,120,.22)"/>
    <ellipse cx="125" cy="96" rx="10" ry="6" fill="rgba(255,150,120,.22)"/>`;

  // 鼻子
  const nose = `<ellipse cx="100" cy="96" rx="4" ry="3.5" fill="${darken(av.skin,.12)}"/>`;

  // 嘴巴
  const mouth = `<path d="M88,108 Q100,118 112,108" fill="none" stroke="${darken(av.skin,.28)}" stroke-width="2.2" stroke-linecap="round"/>`;

  return `<svg viewBox="0 0 200 280" xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
    ${bg.svg()}
    ${legs}
    ${out.svg(av.outfitColor)}
    ${arms}
    ${neck}
    ${head}
    ${ears}
    ${hair.svg(av.hairColor)}
    ${blush}
    ${eye.svg(av.eyeColor)}
    ${nose}
    ${mouth}
    ${acc.svg()}
  </svg>`;
}

function darken(hex, amt) {
  let c=hex.replace('#','');
  if (c.length===3) c=c.split('').map(x=>x+x).join('');
  const r=Math.max(0,parseInt(c.slice(0,2),16)-Math.round(amt*255));
  const g=Math.max(0,parseInt(c.slice(2,4),16)-Math.round(amt*255));
  const b=Math.max(0,parseInt(c.slice(4,6),16)-Math.round(amt*255));
  return `#${r.toString(16).padStart(2,'0')}${g.toString(16).padStart(2,'0')}${b.toString(16).padStart(2,'0')}`;
}

// ─── AVATAR PAGE ───────────────────────────────────────────────────────────

let currentAvatarId = 'self';

function renderAvatarPage() {
  if (!avatars.length) {
    avatars = [defaultAvatar('我','旅行者')];
    saveAvatars(avatars);
  }
  renderAvatarTabs();
  selectAvatarTab(avatars[0].id);
  renderAvatarGallery();
}

function renderAvatarTabs() {
  const tabs = document.getElementById('avatarTabs');
  const addBtn = `<button class="avt-tab avt-add-btn" id="addAvatarBtn">＋ 添加角色</button>`;
  tabs.innerHTML = avatars.map(av=>`<button class="avt-tab${av.id===currentAvatarId?' active':''}" data-avt="${av.id}">${av.id===avatars[0].id?'🧍 ':'👤 '}${av.name}</button>`).join('') + addBtn;
  tabs.querySelectorAll('.avt-tab:not(.avt-add-btn)').forEach(btn=>{
    btn.addEventListener('click',()=>selectAvatarTab(btn.dataset.avt));
  });
  document.getElementById('addAvatarBtn').addEventListener('click', addNewAvatar);
}

function selectAvatarTab(id) {
  currentAvatarId=id;
  const av=avatars.find(a=>a.id===id); if (!av) return;
  document.querySelectorAll('.avt-tab').forEach(t=>t.classList.toggle('active',t.dataset.avt===id));
  document.getElementById('avatarNameInput').value=av.name;
  renderAvatarCanvas(av);
  renderDresser(av);
}

function renderAvatarCanvas(av) {
  document.getElementById('avatarCanvas').innerHTML=buildAvatarSvg(av);
}

function addNewAvatar() {
  const companions=new Set(trips.flatMap(t=>t.companions||[]));
  const existNames=new Set(avatars.map(a=>a.name));
  const newName=[...companions].find(c=>!existNames.has(c));
  const av=defaultAvatar(newName||'旅伴'+(avatars.length),'旅行伙伴');
  avatars.push(av); saveAvatars(avatars);
  renderAvatarTabs();
  selectAvatarTab(av.id);
  renderAvatarGallery();
  showToast(`🎭 角色「${av.name}」已创建`);
}

function saveAvatarName() {
  const av=avatars.find(a=>a.id===currentAvatarId); if (!av) return;
  const name=document.getElementById('avatarNameInput').value.trim(); if (!name) return;
  av.name=name; saveAvatars(avatars);
  renderAvatarTabs();
  renderAvatarGallery();
  showToast(`✅ 角色名称已更新为「${name}」`);
}

document.getElementById('saveAvatarNameBtn').addEventListener('click', saveAvatarName);
document.getElementById('avatarNameInput').addEventListener('keydown', e=>{ if (e.key==='Enter') saveAvatarName(); });

document.getElementById('shareAvatarBtn').addEventListener('click', ()=>{
  const av=avatars.find(a=>a.id===currentAvatarId); if (!av) return;
  const svgEl=document.querySelector('#avatarCanvas svg'); if (!svgEl) return;
  const blob=new Blob([svgEl.outerHTML],{type:'image/svg+xml'});
  const a=document.createElement('a'); a.href=URL.createObjectURL(blob);
  a.download=`${av.name}-旅行角色.svg`; a.click();
  showToast('📥 角色已保存为 SVG 文件');
});

// ─── DRESSER RENDER ────────────────────────────────────────────────────────

function renderDresser(av) {
  // Skin
  renderSwatches('opts-skin', AV_SKINS, av.skin, color=>{
    av.skin=color; saveAvatars(avatars); renderAvatarCanvas(av);
  });
  // Hair style
  renderStyleOpts('opts-hair', AV_HAIR_STYLES, av.hairStyle, id=>{
    av.hairStyle=id; saveAvatars(avatars); renderAvatarCanvas(av);
  }, id=>{ const h=AV_HAIR_STYLES.find(x=>x.id===id); return `<svg viewBox="0 0 200 200">${h.svg(av.hairColor)}</svg>`; });
  // Hair color
  renderSwatches('opts-hair', AV_HAIR_COLORS, av.hairColor, color=>{
    av.hairColor=color; saveAvatars(avatars); renderAvatarCanvas(av);
  }, true);
  // Eyes
  renderStyleOpts('opts-eyes', AV_EYES, av.eyes, id=>{
    av.eyes=id; saveAvatars(avatars); renderAvatarCanvas(av);
  }, id=>{ const e=AV_EYES.find(x=>x.id===id); return `<svg viewBox="55 75 90 45">${e.svg(av.eyeColor)}</svg>`; });
  // Eye color
  renderSwatches('opts-eyes', AV_EYE_COLORS, av.eyeColor, color=>{
    av.eyeColor=color; saveAvatars(avatars); renderAvatarCanvas(av);
  }, true);
  // Outfit
  renderStyleOpts('opts-outfit', AV_OUTFITS, av.outfit, id=>{
    av.outfit=id; av.outfitColor=AV_OUTFITS.find(o=>o.id===id).color; saveAvatars(avatars); renderAvatarCanvas(av);
  }, id=>{ const o=AV_OUTFITS.find(x=>x.id===id); return `<svg viewBox="30 125 140 120">${o.svg(o.color)}</svg>`; });
  // Outfit color
  const outfitColors=['#4A90D9','#2C3E50','#E91E8C','#8E44AD','#D4AC0D','#1ABC9C','#E74C3C','#27AE60','#F39C12','#FF6B35'];
  renderSwatches('opts-outfit', outfitColors, av.outfitColor, color=>{
    av.outfitColor=color; saveAvatars(avatars); renderAvatarCanvas(av);
  }, true);
  // Accessories
  renderStyleOpts('opts-acc', AV_ACCESSORIES, av.acc, id=>{
    av.acc=id; saveAvatars(avatars); renderAvatarCanvas(av);
  }, id=>{ const a=AV_ACCESSORIES.find(x=>x.id===id); return a.id==='none'?`<svg viewBox="0 0 50 50"><text x="25" y="32" text-anchor="middle" font-size="24">✕</text></svg>`:`<svg viewBox="30 100 160 160">${a.svg()}</svg>`; });
  // Backgrounds
  renderStyleOpts('opts-bg', AV_BACKGROUNDS, av.bg, id=>{
    av.bg=id; saveAvatars(avatars); renderAvatarCanvas(av);
  }, id=>{ const b=AV_BACKGROUNDS.find(x=>x.id===id); return `<svg viewBox="0 0 200 280">${b.svg()}</svg>`; });
}

function renderSwatches(containerId, colors, selected, onSelect, append=false) {
  const container=document.getElementById(containerId);
  if (!append) container.innerHTML='';
  colors.forEach(color=>{
    const el=document.createElement('div');
    el.className='dresser-opt swatch'+(color===selected?' selected':'');
    el.style.background=color;
    el.style.border=color===selected?`3px solid var(--primary)`:`3px solid var(--border)`;
    el.addEventListener('click',()=>{
      container.querySelectorAll('.swatch').forEach(s=>{ s.classList.remove('selected'); s.style.border=`3px solid var(--border)`; });
      el.classList.add('selected'); el.style.border=`3px solid var(--primary)`;
      onSelect(color);
    });
    container.appendChild(el);
  });
}

function renderStyleOpts(containerId, items, selected, onSelect, previewFn) {
  const container=document.getElementById(containerId);
  container.innerHTML='';
  items.forEach(item=>{
    const el=document.createElement('div');
    el.className='dresser-opt'+(item.id===selected?' selected':'');
    el.innerHTML=`${previewFn(item.id)}<span class="opt-label">${item.label}</span>`;
    el.addEventListener('click',()=>{
      container.querySelectorAll('.dresser-opt').forEach(o=>o.classList.remove('selected'));
      el.classList.add('selected'); onSelect(item.id);
    });
    container.appendChild(el);
  });
}

function renderAvatarGallery() {
  const gallery=document.getElementById('avatarGallery');
  if (!avatars.length){gallery.innerHTML='';return;}
  gallery.innerHTML=avatars.map((av,i)=>`
    <div class="avatar-card${i===0?' is-self':''}" onclick="selectAvatarForEdit('${av.id}')">
      ${buildAvatarSvg(av, 110, 150)}
      <div class="avatar-card-name">${av.name}</div>
      <div class="avatar-card-role">${av.role}</div>
      ${i!==0?`<button class="avatar-card-del" onclick="deleteAvatar('${av.id}',event)">删除</button>`:''}
    </div>`).join('');
}

function selectAvatarForEdit(id) {
  selectAvatarTab(id);
  document.querySelector('.avatar-workspace')?.scrollIntoView({behavior:'smooth'});
}

function deleteAvatar(id, e) {
  e.stopPropagation();
  const av=avatars.find(a=>a.id===id); if (!av) return;
  if (!confirm(`确认删除角色「${av.name}」？`)) return;
  avatars=avatars.filter(a=>a.id!==id);
  saveAvatars(avatars);
  if (currentAvatarId===id) currentAvatarId=avatars[0]?.id||'';
  renderAvatarPage();
  showToast('✅ 角色已删除');
}

// ─── SAMPLE DATA ─────────────────────────────────────────────────────────────

function loadSampleData() {
  if (trips.length>0) return;
  // 用渐变色背景代替外链图片，彻底解决图片加载失败问题
  // 同时保留可选外链，若外链加载失败自动 fallback 到渐变色 data URI
  const berkeleyImg = 'https://pic3.zhimg.com/v2-4cc75d444be3816b3b090a7750694fc5_720w.jpg';
  const sydneyImg   = 'https://live.staticflickr.com/65535/51982445882_0e6c0d9d0d_b.jpg';
  trips=[
    {
      id:genId(), city:'伯克利', country:'美国', countryCode:'US',
      startDate:'2024-07-10', endDate:'2024-07-20',
      tags:['城市','文化','自然'],
      companions:['小明','Sarah'],
      notes:'伯克利大学的校园美不胜收，电报大道充满嬉皮文化，旧金山湾的日落令人动容。还骑车穿越了格里兹利峰公园，俯瞰整个旧金山湾区。',
      image: berkeleyImg,
      imageFallbackGradient:'linear-gradient(135deg,#1a1a2e 0%,#16213e 40%,#0f3460 70%,#e94560 100%)',
      imageFallbackEmoji:'🏛️',
      expense:{flight:8500,hotel:6200,food:3800,tickets:900,other:2100},
      spots:[
        {id:genId(),name:'UC伯克利校园',date:'2024-07-11',rating:5,note:'世界顶尖学府，充满学术气息的红砖建筑群，大礼堂钟声悠扬。',photo:'',cost:0},
        {id:genId(),name:'格里兹利峰',date:'2024-07-13',rating:4,note:'远眺旧金山湾区全景，金门大桥隐约可见，徒步体验极佳。',photo:'',cost:0},
        {id:genId(),name:'电报大道',date:'2024-07-12',rating:4,note:'街头艺术、咖啡馆、二手书店林立，极具波西米亚风情。',photo:'',cost:0},
      ],
      createdAt:Date.now()-86400000*60
    },
    {
      id:genId(), city:'悉尼', country:'澳大利亚', countryCode:'AU',
      startDate:'2024-09-05', endDate:'2024-09-15',
      tags:['城市','海岛','自然'],
      companions:['表弟'],
      notes:'悉尼歌剧院的建筑震撼无与伦比，邦迪海滩的冲浪文化令人着迷，蓝山国家公园的三姐妹峰让人感叹大自然的鬼斧神工。',
      image: sydneyImg,
      imageFallbackGradient:'linear-gradient(135deg,#0f2027 0%,#203a43 50%,#2c5364 100%)',
      imageFallbackEmoji:'🦘',
      expense:{flight:9800,hotel:7500,food:4200,tickets:1200,other:2800},
      spots:[
        {id:genId(),name:'悉尼歌剧院',date:'2024-09-06',rating:5,note:'人类建筑史上的奇迹，夜晚灯光映照下的帆型屋顶令人叹为观止。',photo:'',cost:150},
        {id:genId(),name:'邦迪海滩',date:'2024-09-08',rating:5,note:'澳大利亚最著名的海滩，碧蓝海水、金色沙滩，冲浪者的天堂。',photo:'',cost:0},
        {id:genId(),name:'蓝山国家公园',date:'2024-09-10',rating:5,note:'三姐妹峰的壮观景象令人震撼，桉树林散发的油脂让山脉呈现梦幻蓝色。',photo:'',cost:0},
        {id:genId(),name:'悉尼港湾大桥',date:'2024-09-07',rating:4,note:'站在桥顶俯瞰整个悉尼港，360度壮阔全景令人心旷神怡。',photo:'',cost:850},
      ],
      createdAt:Date.now()-86400000*10
    },
  ];
  saveTrips(trips);
}

// ─── INIT ────────────────────────────────────────────────────────────────────

function init() {
  loadSampleData();
  renderHome();
}

window.addEventListener('load', init);
window.addEventListener('resize', ()=>{ if (leafletMap) leafletMap.invalidateSize(); });

window.openDetail=openDetail; window.deleteTrip=deleteTrip; window.startEdit=startEdit;
window.editSpot=editSpot; window.deleteSpot=deleteSpot;
window.selectAvatarForEdit=selectAvatarForEdit; window.deleteAvatar=deleteAvatar;
