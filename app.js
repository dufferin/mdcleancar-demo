(function(){const r=document.createElement('div');r.id='md-root';r.innerHTML='<nav id="demobar"></nav><div id="app"></div><div id="layer"></div><div id="toast" role="status"></div>';(document.getElementById('md-mount')||document.body).appendChild(r);})();

/* =========================================================
   MD Clean Car — CRM & Marketing demo
   ข้อมูลลูกค้า / ออเดอร์ / ราคา ทั้งหมดเป็นตัวอย่าง
   ========================================================= */
const TODAY = new Date('2026-10-12T00:00:00');
const TH_M = ['ม.ค.','ก.พ.','มี.ค.','เม.ย.','พ.ค.','มิ.ย.','ก.ค.','ส.ค.','ก.ย.','ต.ค.','พ.ย.','ธ.ค.'];
const D = s => new Date(s + 'T00:00:00');
const days = (a, b) => Math.round((b - a) / 864e5);
const addDays = (d, n) => new Date(d.getTime() + n * 864e5);
const iso = d => d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
const thd = (d, yr) => { d = typeof d === 'string' ? D(d) : d; return d.getDate() + ' ' + TH_M[d.getMonth()] + (yr ? ' ' + (d.getFullYear()) : ''); };
const baht = n => '฿' + Math.round(n).toLocaleString('en-US');
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

/* ---------- products ---------- */
const PRODUCTS = [
  {id:'p1', short:'นีออน', name:'นีออน หัวเชื้อสลายคราบ + น้ำยาอะลูมิเนียม + แปรง', size:'เซตขจัดคราบ', price:499, cat:'wash', cycle:45, badge:'ขายดี', look:{shape:'jug', liq:'#B8F227', lab:'#121212', txt:'#B8F227', word:'NEON'}},
  {id:'p3', short:'โฟมสลายคราบ', name:'โฟมสลายคราบพร้อมเคลือบสี 3 แกลลอน + ผ้าไมโคร', size:'แพ็ก 3 + ผ้า 1', price:599, cat:'wash', cycle:60, look:{shape:'jug', liq:'#1C1E21', lab:'#2C3036', txt:'#F2621F', word:'MD'}},
  {id:'p15', short:'โฟมก้าวมงคล', name:'MD โฟมก้าวมงคล โฟมล้างรถ 9 มงคล', size:'1 ลิตร', price:339, cat:'wash', cycle:45, look:{shape:'jug', liq:'#1C1E21', lab:'#2C3036', txt:'#F2621F', word:'MD'}},
  {id:'p16', short:'MD REDDY', name:'MD REDDY แชมพูล้างรถพร้อมเคลือบสี', size:'1 ขวด', price:299, cat:'wash', cycle:45, look:{shape:'jug', liq:'#1C1E21', lab:'#2C3036', txt:'#F2621F', word:'MD'}},
  {id:'p17', short:'MD INFINITY 100', name:'MD INFINITY โฟมล้างรถ ผสมน้ำได้ 100 ลิตร', size:'หัวเชื้อเข้มข้น', price:499, cat:'wash', cycle:60, look:{shape:'jug', liq:'#1C1E21', lab:'#2C3036', txt:'#F2621F', word:'MD'}},
  {id:'p18', short:'คัลเลอร์โฟมพิงค์', name:'Beclean คัลเลอร์โฟมพิงค์ สูตรผสมคาร์นูบาแวกซ์', size:'1 ลิตร', price:309, cat:'wash', cycle:45, look:{shape:'jug', liq:'#1C1E21', lab:'#2C3036', txt:'#F2621F', word:'MD'}},
  {id:'p21', short:'MOTO แชมพู', name:'MOTO แชมพูล้างรถผสมสารเคลือบสี', size:'200 มล.', price:109, cat:'wash', cycle:30, look:{shape:'spray', liq:'#24272C', lab:'#F2621F', txt:'#fff', word:'MD'}},
  {id:'p4', short:'Beclean เคลือบสี', name:'Beclean สเปรย์เคลือบสีรถ เงางาม', size:'300 มล.', price:399, cat:'coat', cycle:60, look:{shape:'spray', liq:'#24272C', lab:'#F2621F', txt:'#fff', word:'MD'}},
  {id:'p7', short:'MDC2 เคลือบกระจก', name:'MDC2 GLASS COATING น้ำยาเคลือบกระจก ไม่ต้องใช้ใบปัด', size:'1 ขวด', price:479, cat:'coat', cycle:60, look:{shape:'spray', liq:'#24272C', lab:'#F2621F', txt:'#fff', word:'MD'}},
  {id:'p24', short:'BOX SET กระจก', name:'BOX SET เคลือบกระจก + ขจัดคราบน้ำ + ฟองน้ำ', size:'เซต 3 ชิ้น', price:729, cat:'coat', cycle:60, look:{shape:'spray', liq:'#24272C', lab:'#F2621F', txt:'#fff', word:'MD'}},
  {id:'p6', short:'WAX PINK', name:'WAX PINK สเปรย์เคลือบยางดำ เงาฉ่ำ', size:'1 กระป๋อง', price:269, cat:'tire', cycle:30, look:{shape:'spray', liq:'#24272C', lab:'#F2621F', txt:'#fff', word:'MD'}},
  {id:'p25', short:'MOTO ยางดำ', name:'MOTO น้ำยาเคลือบยางดำ', size:'200 มล.', price:199, cat:'tire', cycle:30, look:{shape:'spray', liq:'#24272C', lab:'#F2621F', txt:'#fff', word:'MD'}},
  {id:'p19', short:'Beclean อะลูมิเนียม', name:'Beclean น้ำยาทำความสะอาดอะลูมิเนียม ล้อแม็ก', size:'500 มล.', price:299, cat:'tire', cycle:60, look:{shape:'jug', liq:'#1C1E21', lab:'#2C3036', txt:'#F2621F', word:'MD'}},
  {id:'p9', short:'MOTO สลายคราบน้ำมัน', name:'MOTO น้ำยาสลายคราบ คราบน้ำมัน', size:'1 ลิตร', price:299, cat:'tire', cycle:60, look:{shape:'jug', liq:'#1C1E21', lab:'#2C3036', txt:'#F2621F', word:'MD'}},
  {id:'p20', short:'สลายคราบยางมะตอย', name:'น้ำยาสลายคราบยางมะตอย (แพ็ก 2 ขวด)', size:'2 ขวด', price:369, cat:'tire', cycle:60, look:{shape:'spray', liq:'#24272C', lab:'#F2621F', txt:'#fff', word:'MD'}},
  {id:'p22', short:'G69 สลายสนิม', name:'G69 น้ำยาสลายคราบสนิม', size:'1 ขวด', price:199, cat:'tire', cycle:60, look:{shape:'spray', liq:'#24272C', lab:'#F2621F', txt:'#fff', word:'MD'}},
  {id:'p8', short:'MD LUXURY', name:'MD LUXURY น้ำหอมปรับอากาศในรถ กลิ่นลักชัวรี่', size:'1 ขวด', price:339, cat:'interior', cycle:45, look:{shape:'spray', liq:'#24272C', lab:'#F2621F', txt:'#fff', word:'MD'}},
  {id:'p11', short:'น้ำยาทำความสะอาดพื้น', name:'ผลิตภัณฑ์ทำความสะอาดพื้น คราบฝัง คราบตะไคร่น้ำ', size:'1 แกลลอน', price:359, cat:'home', cycle:30, look:{shape:'gallon', liq:'#F2621F', lab:'#121212', txt:'#F2621F', word:'MD'}},
  {id:'p12', short:'หัวเชื้อดันฝุ่น', name:'หัวเชื้อดันฝุ่น สำหรับถูพื้น', size:'1 ลิตร', price:859, cat:'home', cycle:45, look:{shape:'gallon', liq:'#F2621F', lab:'#121212', txt:'#F2621F', word:'MD'}},
  {id:'p5', short:'เซตสุดคุ้ม', name:'เซตสุดคุ้ม โฟม + นีออน + แวกซ์พิงค์ + อะลูมิเนียม + แปรง', size:'เซต 5 ชิ้น', price:899, cat:'set', cycle:60, badge:'คุ้มสุด', look:{shape:'jug', liq:'#B8F227', lab:'#121212', txt:'#B8F227', word:'NEON'}},
  {id:'p27', short:'เซตนีออน + อะลูมิเนียม', name:'นีออน 1 ลิตร + น้ำยาอะลูมิเนียม 1 ลิตร + แปรง', size:'เซต 3 ชิ้น', price:939, cat:'set', cycle:60, look:{shape:'jug', liq:'#B8F227', lab:'#121212', txt:'#B8F227', word:'NEON'}},
  {id:'p28', short:'เซตก้าวมงคล', name:'เซตโฟมก้าวมงคล + นีออน + อะลูมิเนียม + เคลือบยางดำ', size:'เซต 4 ชิ้น', price:1248, cat:'set', cycle:60, look:{shape:'jug', liq:'#B8F227', lab:'#121212', txt:'#B8F227', word:'NEON'}},
  {id:'p2', short:'MD INFINITY 500', name:'MD INFINITY โฟมล้างรถ ผสมน้ำได้ 500 ลิตร', size:'หัวเชื้อเข้มข้น', price:899, cat:'pro', cycle:60, badge:'คาร์แคร์', look:{shape:'gallon', liq:'#F2621F', lab:'#121212', txt:'#F2621F', word:'MD'}},
  {id:'p14', short:'SUPER TRUCK เหลือง', name:'SUPER TRUCK น้ำยาล้างรถบรรทุก ฉลากเหลือง เข้มข้น 15 เท่า', size:'1 แกลลอน', price:798, cat:'pro', cycle:30, badge:'คาร์แคร์', look:{shape:'gallon', liq:'#F2621F', lab:'#121212', txt:'#F2621F', word:'MD'}},
  {id:'p23', short:'SUPER TRUCK ฟ้า', name:'SUPER TRUCK น้ำยาล้างรถบรรทุก ฉลากฟ้า เข้มข้น 10 เท่า', size:'1 แกลลอน', price:699, cat:'pro', cycle:30, look:{shape:'gallon', liq:'#F2621F', lab:'#121212', txt:'#F2621F', word:'MD'}},
  {id:'p10', short:'ชุดถังโฟมแลนซ์', name:'ชุดถังโฟมแลนซ์ พร้อมปืนฉีดน้ำ', size:'อุปกรณ์', price:999, cat:'pro', cycle:0, look:{shape:'gallon', liq:'#F2621F', lab:'#121212', txt:'#F2621F', word:'MD'}},
];
const P = Object.fromEntries(PRODUCTS.map(p => [p.id, p]));
const CATS = [['all','ทั้งหมด'],['wash','ล้างรถ & โฟม'],['coat','เคลือบสี & กระจก'],['tire','ยาง ล้อ & คราบฝัง'],['interior','ภายในรถ'],['home','ครัวเรือน'],['set','เซตสุดคุ้ม'],['pro','คาร์แคร์ & รถบรรทุก']];

/* ---------- product art (SVG) ---------- */
let _u = 0;
function shapeG(L, uid) {
  const gl = `url(#gl${uid})`;
  const fs = w => Math.min(15, 78 / Math.max(w.length, 3) * 1.25);
  if (L.shape === 'jug' || L.shape === 'gallon') {
    const big = L.shape === 'gallon';
    const body = big ? 'M32 50 Q32 40 42 40 H94 Q103 40 109 46 L126 63 Q130 67 130 74 V138 Q130 147 121 147 H41 Q32 147 32 138 Z'
                     : 'M48 52 Q48 43 57 43 H86 Q94 43 100 49 L114 63 Q118 67 118 73 V136 Q118 145 109 145 H57 Q48 145 48 136 Z';
    const hole = big ? 'M100 54 L116 70 V88 H100 Z' : 'M94 58 L106 70 V88 H94 Z';
    const cap = big ? '<rect x="44" y="24" width="30" height="17" rx="3" fill="#111"/><rect x="44" y="24" width="30" height="5" rx="2" fill="#2a2a2a"/>'
                    : '<rect x="58" y="26" width="26" height="18" rx="3" fill="#111"/><rect x="58" y="26" width="26" height="5" rx="2" fill="#2a2a2a"/>';
    const lab = big ? {x:40,y:92,w:82,h:48} : {x:54,y:92,w:58,h:46};
    const bh = body + ' ' + hole;
    return `${cap}<path d="${bh}" fill-rule="evenodd" fill="${L.liq}"/>
      <rect x="${lab.x}" y="${lab.y}" width="${lab.w}" height="${lab.h}" rx="5" fill="${L.lab}"/>
      <text x="${lab.x + lab.w/2}" y="${lab.y + lab.h/2 + 3}" text-anchor="middle" font-family="Kanit" font-weight="800" font-style="italic" font-size="${fs(L.word) * (big ? 1.1 : 1)}" fill="${L.txt}">${L.word}</text>
      <text x="${lab.x + lab.w/2}" y="${lab.y + lab.h - 7}" text-anchor="middle" font-family="Kanit" font-weight="600" font-size="5.5" fill="${L.txt}" opacity=".75" letter-spacing=".8">MD CLEAN CAR</text>
      <rect x="${lab.x}" y="${lab.y}" width="${lab.w}" height="4" fill="#F2621F"/>
      <path d="${bh}" fill-rule="evenodd" fill="${gl}"/>`;
  }
  if (L.shape === 'spray') {
    const body = 'M58 72 Q58 63 67 63 H93 Q102 63 102 72 V138 Q102 147 93 147 H67 Q58 147 58 138 Z';
    return `<path d="M60 34 H98 Q104 34 104 40 V54 H58 V40 Q58 34 60 34 Z" fill="#111"/>
      <path d="M58 38 H44 V47 H58 Z" fill="#111"/><path d="M82 54 L90 72 H82 L76 58 Z" fill="#2a2a2a"/>
      <rect x="70" y="53" width="20" height="12" fill="#1a1a1a"/>
      <path d="${body}" fill="${L.liq}"/>
      <rect x="62" y="86" width="36" height="50" rx="4" fill="${L.lab}"/><rect x="62" y="86" width="36" height="4" fill="#F2621F"/>
      <text x="80" y="114" text-anchor="middle" font-family="Kanit" font-weight="800" font-style="italic" font-size="${Math.min(11, 52 / L.word.length * 1.25)}" fill="${L.txt}">${L.word}</text>
      <text x="80" y="130" text-anchor="middle" font-family="Kanit" font-weight="600" font-size="4.6" fill="${L.txt}" opacity=".75">MD CLEAN CAR</text>
      <path d="${body}" fill="${gl}"/>`;
  }
  if (L.shape === 'bottle') {
    const body = 'M54 62 Q54 50 66 46 H94 Q106 50 106 62 V138 Q106 147 97 147 H63 Q54 147 54 138 Z';
    return `<rect x="68" y="26" width="24" height="22" rx="4" fill="#111"/>
      <path d="${body}" fill="${L.liq}"/>
      <rect x="58" y="78" width="44" height="58" rx="5" fill="${L.lab}"/><rect x="58" y="78" width="44" height="4" fill="#F2621F"/>
      <text x="80" y="104" text-anchor="middle" font-family="Kanit" font-weight="800" font-style="italic" font-size="11" fill="${L.txt}">${L.word.split(' ')[0]}</text>
      <text x="80" y="117" text-anchor="middle" font-family="Kanit" font-weight="800" font-style="italic" font-size="11" fill="${L.txt}">${L.word.split(' ')[1] || ''}</text>
      <text x="80" y="130" text-anchor="middle" font-family="Kanit" font-weight="600" font-size="4.6" fill="${L.txt}" opacity=".75">MD CLEAN CAR</text>
      <path d="${body}" fill="${gl}"/>`;
  }
  if (L.shape === 'cloth') {
    const sq = (x, y, c, r) => `<g transform="rotate(${r} ${x+40} ${y+30})"><rect x="${x}" y="${y}" width="80" height="60" rx="8" fill="${c}"/><rect x="${x+5}" y="${y+5}" width="70" height="50" rx="5" fill="none" stroke="rgba(255,255,255,.35)" stroke-dasharray="3 3"/></g>`;
    return sq(36, 86, '#2C3036', -6) + sq(42, 68, '#F2621F', 4) + sq(40, 50, '#B8F227', -3);
  }
  if (L.shape === 'set') {
    return `<g transform="translate(-4 18) scale(.72)">${shapeG(P.p3.look, uid)}</g>
      <g transform="translate(58 22) scale(.68)">${shapeG(P.p6.look, uid)}</g>
      <g transform="translate(18 34) scale(.82)">${shapeG(P.p1.look, uid)}</g>`;
  }
  return '';
}
function artSvg(p, cls) {
  const uid = ++_u;
  return `<svg class="${cls || ''}" viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${esc(p.name)}">
    <defs><linearGradient id="gl${uid}" x1="0" x2="1"><stop offset="0" stop-color="#fff" stop-opacity=".38"/><stop offset=".3" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".2"/></linearGradient></defs>
    <ellipse cx="80" cy="150" rx="52" ry="5" fill="#000" opacity=".1"/>${shapeG(p.look, uid)}</svg>`;
}
function art(p, cls) {
  const src = (window.MD_PHOTOS || {})[p.id];
  return '<span class="pimg ' + (cls || '') + (src ? ' has' : '') + '">' + (src ? '<img src="' + src + '" alt="' + esc(p.name) + '" loading="lazy" decoding="async" onload="this.classList.add(\'ld\')">' : artSvg(p)) + '</span>';
}
const mdMark = (s = 26, c = '#fff') => `<svg width="${s}" height="${s}" viewBox="0 0 40 40"><text x="20" y="26" text-anchor="middle" font-family="Kanit" font-weight="800" font-style="italic" font-size="20" fill="${c}">MD</text><path d="M8 31 L33 29" stroke="#F2621F" stroke-width="3" stroke-linecap="round"/></svg>`;
const logo = (sub = 'ผลิตภัณฑ์ดูแลรถ · ส่งตรงจากโรงงาน') => `<div class="logo"><div class="mk">${mdMark()}</div><div class="wm"><b>MD CLEAN CAR</b><span>${sub}</span></div></div>`;

/* icons */
const I = {
  search:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>',
  cart:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/><path d="M2 3h3l2.6 12.4a2 2 0 0 0 2 1.6h8.8a2 2 0 0 0 2-1.6L22 7H6"/></svg>',
  truck:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h11v10H3zM14 9h4l3 3v4h-7"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/></svg>',
  star:'<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="m12 2 3 6.6 7 .7-5.3 4.7 1.6 7L12 17.3 5.7 21l1.6-7L2 9.3l7-.7z"/></svg>',
  factory:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 21V10l6 4V10l6 4V4h6v17z"/></svg>',
  store:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9 5 3h14l2 6M3 9h18v12H3zM9 21v-6h6v6"/></svg>',
  users:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="8" r="4"/><path d="M2 21c0-4 3-6 7-6s7 2 7 6M16 4a4 4 0 0 1 0 8M22 21c0-3-1.5-5-4-5.6"/></svg>',
  gift:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 11h18v10H3zM2 7h20v4H2zM12 7v14M12 7S10 2 7 3.5 9 7 12 7zm0 0s2-5 5-3.5S15 7 12 7z"/></svg>',
  chat:'<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3C6.5 3 2 6.6 2 11c0 3.9 3.5 7.2 8.3 7.9.3.1.8.2.9.5.1.3.1.7 0 1l-.1.9c0 .3-.2 1 .9.5s5.9-3.5 8-6C21.4 14.3 22 12.7 22 11c0-4.4-4.5-8-10-8z"/></svg>',
  refill:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12a9 9 0 1 1-3-6.7L21 8M21 3v5h-5"/></svg>',
  box:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 8 12 3 3 8v8l9 5 9-5zM3 8l9 5 9-5M12 13v8"/></svg>',
  lock:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>',
  vtable:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 10h18M9 10v10"/></svg>',
  vkanban:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="5" height="16" rx="1"/><rect x="10" y="4" width="5" height="10" rx="1"/><rect x="17" y="4" width="4" height="13" rx="1"/></svg>',
  vcal:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>',
  vgal:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="8" height="8" rx="1"/><rect x="13" y="3" width="8" height="8" rx="1"/><rect x="3" y="13" width="8" height="8" rx="1"/><rect x="13" y="13" width="8" height="8" rx="1"/></svg>',
  vfilter:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 5h18l-7 8v6l-4 2v-8z"/></svg>',
  vsort:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 4v16M3 16l4 4 4-4M17 20V4M13 8l4-4 4 4"/></svg>',
  vcols:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M9 4v16M15 4v16"/></svg>',
  vshare:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7M16 6l-4-4-4 4M12 2v13"/></svg>',
  inv:'<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 21V8l9-5 9 5v13M7 21v-8h10v8M7 17h10"/></svg>',
  msg:'<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.5A8 8 0 1 1 21 12z"/></svg>',
  spon:'<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.4 6.8 19.1l1-5.8L3.5 9.2l5.9-.9z"/></svg>',
  bill:'<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18M7 15h4"/></svg>',
  ship:'<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h11v10H3zM14 9h4l3 3v4h-7"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/></svg>',
  qr:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><path d="M14 14h3v3h-3zM20 14v.01M14 20h.01M17 20h4v-3"/></svg>',
  book:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h6a3 3 0 0 1 3 3v13a2 2 0 0 0-2-2H4zM20 4h-6a3 3 0 0 0-3 3v13a2 2 0 0 1 2-2h7z"/></svg>',
  handshake:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m11 17 2 2a1 1 0 0 0 3-3M14 14l2.5 2.5a1 1 0 0 0 3-3l-3.9-3.9a3 3 0 0 0-4.2 0l-.9.9a1 1 0 0 1-3-3l2.8-2.8a5.8 5.8 0 0 1 7 .9L21 7M2 13l3 3 5.5-5.5"/></svg>',
  dash:'<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 3v18h18M7 15v2M11 10v7M15 6v11M19 12v5"/></svg>',
  user:'<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/></svg>',
  seg:'<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/></svg>',
  crown:'<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m3 7 4 4 5-7 5 7 4-4-2 12H5z"/></svg>',
  mega:'<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 11v2a1 1 0 0 0 1 1h3l6 5V5L7 10H4a1 1 0 0 0-1 1zM17 8a5 5 0 0 1 0 8"/></svg>',
  bolt:'<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2 4 14h7l-1 8 9-12h-7z"/></svg>',
  tag:'<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0L3 13V3h10l7.6 7.6a2 2 0 0 1 0 2.8z"/><circle cx="7.5" cy="7.5" r="1.5"/></svg>',
  bag:'<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 7h12l1 14H5zM9 7a3 3 0 0 1 6 0"/></svg>',
  pin:'<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/></svg>',
};

/* ---------- customers & orders (ตัวอย่าง) ---------- */
const CUSTOMERS = [
  {id:'C-1001', name:'เอกชัย ตัวอย่าง', type:'b2c', region:'สุราษฎร์ธานี', phone:'081-234-1001', email:'ekachai@example.com', line:null, fb:true, consent:true, bday:10, joined:'2025-03-14', car:'Toyota Hilux Revo'},
  {id:'C-1002', name:'ศิริพร ทดสอบ', type:'b2c', region:'กรุงเทพฯ', phone:'089-555-1002', email:'siriporn@example.com', line:null, fb:false, consent:true, bday:4, joined:'2026-09-25', car:'Honda City'},
  {id:'C-1003', name:'ธนวัฒน์ สมมุติ', type:'b2c', region:'นครศรีธรรมราช', phone:'086-777-1003', email:'thanawat@example.com', line:'U3f9a12', fb:true, consent:true, bday:7, joined:'2026-02-11', car:'Isuzu D-Max'},
  {id:'C-1004', name:'มาลี ตัวอย่าง', type:'b2c', region:'สุราษฎร์ธานี', phone:'092-111-1004', email:'malee@example.com', line:'U71c2d4', fb:true, consent:true, bday:12, joined:'2026-08-20', car:'—'},
  {id:'C-1005', name:'ซีซี คาร์แคร์ (คุณต้น)', type:'carcare', region:'สุราษฎร์ธานี', phone:'077-123-105', email:'cc.carcare@example.com', line:'U55aa01', fb:true, consent:true, bday:3, joined:'2025-11-02', bays:4},
  {id:'C-1006', name:'ภูเก็ต ออโต้วอช', type:'carcare', region:'ภูเก็ต', phone:'076-222-106', email:'pkt.wash@example.com', line:'U19be33', fb:false, consent:true, bday:8, joined:'2026-06-01', bays:6},
  {id:'C-1007', name:'หจก. นครศรี คาร์ช้อป', type:'dealer', tier:'Dealer Pro', target:30000, region:'นครศรีธรรมราช', phone:'075-333-107', email:'nks.carshop@example.com', line:'U8c1e77', fb:true, consent:true, bday:5, joined:'2025-06-10'},
  {id:'C-1008', name:'ร้านอะไหล่ยนต์ กระบี่', type:'dealer', tier:'Dealer', target:12000, region:'กระบี่', phone:'075-444-108', email:'krabi.parts@example.com', line:'U2d7f10', fb:true, consent:true, bday:9, joined:'2026-07-15'},
  {id:'C-1009', name:'หาดใหญ่ ประดับยนต์', type:'dealer', tier:'Distributor', target:45000, region:'สงขลา', phone:'074-555-109', email:'hy.auto@example.com', line:'U6a0c55', fb:true, consent:true, bday:1, joined:'2025-09-01'},
  {id:'C-1010', name:'ปิยะ ทดลอง', type:'b2c', region:'ชุมพร', phone:'095-333-1010', email:'piya@example.com', line:null, fb:false, consent:true, bday:6, joined:'2026-09-05', car:'Mazda 2'},
  {id:'C-1011', name:'กานต์ ตัวอย่าง', type:'b2c', region:'ภูเก็ต', phone:'094-222-1011', email:'karn@example.com', line:null, fb:true, consent:false, bday:2, joined:'2025-12-20', car:'Ford Ranger'},
  {id:'C-1012', name:'นภา สมมุติ', type:'b2c', region:'กรุงเทพฯ', phone:'097-444-1012', email:'napa@example.com', line:'U4e8b21', fb:true, consent:true, bday:10, joined:'2026-10-02', car:'Toyota Yaris'},
  {id:'C-1013', name:'วีระ ทดสอบ', type:'b2c', region:'สุราษฎร์ธานี', phone:'098-666-1013', email:'weera@example.com', line:'U9d3f42', fb:true, consent:true, bday:11, joined:'2026-01-15', car:'BMW 320d'},
  {id:'C-1014', name:'ณัฐ ทดลอง', type:'b2c', region:'สงขลา', phone:'093-888-1014', email:'nat@example.com', line:null, fb:false, consent:true, bday:3, joined:'2026-08-29', car:'Honda Civic'},
  {id:'C-1015', name:'สะอาด คาร์แคร์ ชุมพร', type:'carcare', region:'ชุมพร', phone:'077-999-115', email:'saard@example.com', line:'U0b5e66', fb:true, consent:true, bday:12, joined:'2026-09-28', bays:3},
  {id:'C-1016', name:'ปอ ตัวอย่าง', type:'b2c', region:'สุราษฎร์ธานี', phone:'091-555-1016', email:'por@example.com', line:null, fb:true, consent:false, bday:5, joined:'2026-07-01', car:'Nissan Almera'},
];
const ORD_SRC = `
C-1001|2026-04-10|web|p5
C-1001|2026-06-02|line|p1x2
C-1001|2026-08-30|web|p1,p3
C-1002|2026-09-25|web|p1
C-1003|2026-02-11|web|p3
C-1003|2026-05-03|web|p1
C-1004|2026-08-20|line|p11,p12
C-1004|2026-09-18|line|p11
C-1005|2026-07-10|line|p2x4,p14x2
C-1005|2026-08-12|line|p2x4,p14x2
C-1005|2026-09-14|line|p2x6,p14x2,p21x10
C-1006|2026-06-01|line|p14x2,p2x2
C-1006|2026-07-20|line|p14x2
C-1007|2026-06-05|dealer|p1x24,p3x24,p6x24
C-1007|2026-07-06|dealer|p1x24,p3x12
C-1007|2026-08-08|dealer|p1x12,p3x12
C-1007|2026-09-10|dealer|p1x12,p6x12
C-1008|2026-07-15|dealer|p1x12,p7x12
C-1008|2026-09-20|dealer|p1x12,p8x12,p21x20
C-1009|2026-07-02|dealer|p1x48,p3x24
C-1009|2026-08-03|dealer|p1x48,p3x36,p4x24
C-1009|2026-09-04|dealer|p1x60,p3x48,p4x24,p6x24
C-1009|2026-10-05|dealer|p1x72,p5x12
C-1010|2026-09-05|web|p1,p6
C-1011|2025-12-20|web|p5
C-1011|2026-03-11|web|p1
C-1012|2026-10-02|web|p5
C-1013|2026-01-15|line|p5
C-1013|2026-03-20|line|p4,p1
C-1013|2026-05-28|line|p1x2,p9
C-1013|2026-07-30|line|p1x2,p4
C-1013|2026-08-25|line|p5
C-1013|2026-09-22|line|p1x2,p8,p7
C-1013|2026-10-11|line|p15
C-1014|2026-08-29|web|p1x2
C-1015|2026-09-28|line|p14x3,p2x2
C-1016|2026-07-01|web|p3`;
const DEALER_TIERS = {'Dealer':{disc:25, min:'12 ลัง/เดือน'}, 'Dealer Pro':{disc:32, min:'30,000 บาท/เดือน'}, 'Distributor':{disc:40, min:'45,000 บาท/เดือน + พื้นที่ขายเฉพาะ'}};
const CH = {line:['LINE','line','#06C755'], web:['เว็บไซต์','o','#F2621F'], dealer:['ตัวแทน / ขายส่ง','gold','#F5B800']};
const stChip = o => ordPill(o);
const TYPE = {b2c:['ลูกค้าทั่วไป',''], carcare:['ร้านคาร์แคร์','neon'], dealer:['ตัวแทนจำหน่าย','gold']};
const TIERS = [{k:'Member', min:0, mult:1, perks:['สะสม 1 แต้มทุก ฿25','คูปองวันเกิด ฿50']}, {k:'Silver', min:1500, mult:1, perks:['คูปองวันเกิด ฿100','ส่งฟรีไม่มีขั้นต่ำ 2 ครั้ง/เดือน']}, {k:'Gold', min:5000, mult:1.5, perks:['แต้ม x1.5','สิทธิ์ซื้อสินค้าใหม่ก่อนใคร','ส่งฟรีทุกออเดอร์']}, {k:'Platinum', min:12000, mult:2, perks:['แต้ม x2','ของขวัญรายไตรมาส','สายตรงแอดมิน']}];
const REWARDS = [{id:'r1', pts:100, name:'ส่วนลด ฿50', code:'PT50', look:'coupon'}, {id:'r2', pts:150, name:'MOTO แชมพูล้างรถ 200 มล.', pid:'p21'}, {id:'r3', pts:500, name:'เซตนีออนขจัดคราบ', pid:'p1'}, {id:'r4', pts:1200, name:'เซตสุดคุ้ม 5 ชิ้น', pid:'p5'}];

function parseOrders() {
  let n = 2400;
  return ORD_SRC.trim().split('\n').map(l => {
    const [cid, date, ch, it] = l.split('|');
    const items = it.split(',').map(x => { const [p, q] = x.split('x'); return [p, +(q || 1)]; });
    return {id:'MD-' + (++n), cid, date, ch, items, status: date >= '2026-10-08' ? 'ชำระแล้ว' : date > '2026-10-01' ? 'จัดส่งแล้ว' : 'สำเร็จ'};
  });
}

/* ---------- state ---------- */
const KEY = 'mdcc-demo-v4';
function fresh() {
  return {
    customers: JSON.parse(JSON.stringify(CUSTOMERS)),
    orders: parseOrders(),
    user: null, cart: [], code: '', cat: 'all', q: '',
    lineMsgs: [], bonus: {}, redeemed: {}, myCoupons: [],
    campaigns: [
      {id:'cp1', name:'ถึงรอบเติมนีออน (ก.ย.)', seg:'refill', ch:'line', date:'2026-09-12', status:'sent', sent:3, open:null, click:2, orders:1, sales:628},
      {id:'cp2', name:'ชวนผูก LINE รับ 50 แต้ม', seg:'nolink', ch:'sms', date:'2026-09-20', status:'sent', sent:4, open:null, click:2, orders:1, sales:499},
      {id:'cp3', name:'โปร MD INFINITY สำหรับคาร์แคร์ ต.ค.', seg:'carcare', ch:'line', date:'2026-10-01', status:'sent', sent:3, open:null, click:2, orders:1, sales:3108},
      {id:'cp4', name:'คิดถึงนะ — ลูกค้าหายไป 90 วัน', seg:'winback', ch:'email', date:'2026-10-10', status:'draft', sent:0, open:0, click:0, orders:0, sales:0},
    ],
    codes: [
      {code:'WELCOME', desc:'ลด ฿50 สมาชิกใหม่ ซื้อครั้งแรก', type:'amt', val:50, min:300, used:6, disc0:300, on:true},
      {code:'REFILL5', desc:'ลด 5% สั่งเติมตามรอบ', type:'pct', val:5, min:0, used:4, disc0:124, on:true},
      {code:'NEON50', desc:'ลด ฿50 สินค้าล้างรถ & โฟม (เช่น เซตนีออน)', type:'amt', val:50, min:499, cat:'wash', used:2, disc0:100, on:true},
      {code:'MD10', desc:'ลด 10% ทั้งร้าน', type:'pct', val:10, min:500, used:9, disc0:684, on:true},
      {code:'BDAY100', desc:'คูปองวันเกิด ฿100', type:'amt', val:100, min:300, used:1, disc0:100, on:false},
    ],
    autos: [
      {id:'refill', name:'เตือนเติมน้ำยาตามรอบใช้งาน', on:true, trig:'ครบรอบใช้งานของสินค้าชิ้นล่าสุด (นีออน 45 วัน · SUPER TRUCK 30 วัน)', steps:[['tr','ถึงรอบ −3 วัน'],['ln','LINE: การ์ดสั่งซ้ำ 1 คลิก'],['wt','รอ 3 วัน'],['sm','ยังไม่ซื้อ → SMS + โค้ด REFILL5']], stat:{enter:9, sent:9, conv:4, sales:3452}},
      {id:'welcome', name:'ต้อนรับสมาชิกใหม่', on:true, trig:'สมัครสมาชิก / ผูก LINE ครั้งแรก', steps:[['tr','สมัครสมาชิก'],['ln','LINE: คูปอง WELCOME'],['wt','วันที่ 3'],['ln','วิดีโอวิธีใช้นีออนให้คุ้ม'],['wt','วันที่ 14'],['ln','เสนอเซ็ตจบทุกคราบ']], stat:{enter:5, sent:13, conv:2, sales:1204}},
      {id:'review', name:'ขอรีวิวหลังได้รับสินค้า', on:true, trig:'สถานะ "จัดส่งสำเร็จ" + 3 วัน', steps:[['tr','ได้รับของ +3 วัน'],['ln','LINE: ให้คะแนน + รูป'],['wt','รีวิวแล้ว'],['ln','+20 แต้ม']], stat:{enter:11, sent:11, conv:6, sales:0}},
      {id:'winback', name:'ดึงลูกค้ากลับ (ไม่ซื้อ 90 วัน)', on:false, trig:'ไม่มีคำสั่งซื้อ 90 วัน', steps:[['tr','ไม่ซื้อ 90 วัน'],['ln','LINE/อีเมล: คิดถึงนะ + NEON50'],['wt','7 วัน'],['sm','SMS เตือนโค้ดใกล้หมดอายุ']], stat:{enter:0, sent:0, conv:0, sales:0}},
      {id:'bday', name:'อวยพรวันเกิด', on:true, trig:'วันที่ 1 ของเดือนเกิด', steps:[['tr','ต้นเดือนเกิด'],['ln','LINE: การ์ดอวยพร + BDAY100 (ตามระดับ)']], stat:{enter:2, sent:2, conv:0, sales:0}},
      {id:'cart', name:'ตะกร้าค้าง (เว็บ / LINE)', on:false, trig:'ใส่ตะกร้าแล้วไม่ชำระใน 1 ชม.', steps:[['tr','ตะกร้าค้าง 1 ชม.'],['ln','LINE: ของยังรออยู่นะ'],['wt','24 ชม.'],['ln','ส่งฟรีถ้าจ่ายวันนี้']], stat:{enter:0, sent:0, conv:0, sales:0}},
    ],
    customSegs: [],
    stock: {p1:186, p3:64, p15:120, p16:48, p17:72, p18:55, p21:240, p4:38, p7:44, p24:12, p6:150, p25:96, p19:60, p9:80, p20:70, p22:5, p8:110, p11:40, p12:18, p5:30, p27:22, p28:9, p2:26, p14:14, p23:20, p10:16},
    prodOv: {}, ship: {}, role: 'admin', tierOv: {}, ordlog: {}, newProds: [],
    plan: 'Basic', planUp: false, planDown: false,
    cats: [['wash','ล้างรถ & โฟม'],['coat','เคลือบสี & กระจก'],['tire','ยาง ล้อ & คราบฝัง'],['interior','ภายในรถ'],['home','ครัวเรือน'],['set','เซตสุดคุ้ม'],['pro','คาร์แคร์ & รถบรรทุก']],
    sponsorOrgs: [
      {id:'so1', name:'AquaJet', contact:'คุณกิตติ', email:'ads@aquajet.example', domain:'aquajet.example', cat:'เครื่องฉีดน้ำแรงดันสูง', color:'#2563EB'},
      {id:'so2', name:'SoftPro', contact:'คุณพิมพ์', email:'mkt@softpro.example', domain:'softpro.example', cat:'ผ้าไมโครไฟเบอร์', color:'#7C3AED'},
      {id:'so3', name:'DriveCam', contact:'คุณโอ๊ต', email:'shop@drivecam.example', domain:'drivecam.example', cat:'กล้องติดรถยนต์', color:'#0F766E'},
      {id:'so4', name:'SeatShield', contact:'คุณมายด์', email:'hello@seatshield.example', domain:'seatshield.example', cat:'อุปกรณ์ภายในรถ', color:'#BE123C'},
    ],
    chats: [
      {id:'t1', cid:'C-1004', name:'มาลี ตัวอย่าง', ch:'line', unread:1, owner:null, closed:false, note:'', msgs:[{me:false, t:'น้ำยาทำความสะอาดพื้น ใช้กับพื้นไม้ได้ไหมคะ', at:'10:12'}]},
      {id:'t2', cid:null, name:'คุณบอย · บอย คาร์วอช', ch:'fb', unread:2, owner:null, closed:false, note:'ลีด L-31 (ตรัง) สนใจเป็นร้านคาร์แคร์', msgs:[{me:false, t:'สนใจราคาส่ง MD INFINITY สำหรับร้านคาร์แคร์ครับ', at:'09:40'}, {me:false, t:'ร้านมี 3 ช่องล้าง ใช้เดือนละประมาณ 20 ลิตรครับ', at:'09:41'}]},
      {id:'t3', cid:'C-1010', name:'ปิยะ ทดลอง', ch:'web', unread:1, owner:null, closed:false, note:'', msgs:[{me:false, t:'นีออนใช้กับล้อแม็กซ์ที่ทำสีได้ไหมครับ', at:'08:55'}]},
      {id:'t4', cid:'C-1013', name:'วีระ ทดสอบ', ch:'line', unread:0, owner:'ทีมการตลาด MD', closed:true, note:'ลูกค้า Gold · ตอบภายใน 15 นาที', msgs:[{me:false, t:'ได้ของแล้วครับ ส่งไวมาก', at:'เมื่อวาน'}, {me:true, t:'ขอบคุณมากค่ะ ใช้แล้วเป็นยังไงรีวิวได้รับ 20 แต้มนะคะ', at:'เมื่อวาน'}]},
    ],
    sponsors: [
      {id:'sp1', brand:'AquaJet', color:'#2563EB', name:'เครื่องฉีดน้ำแรงดันสูง 140 บาร์', price:3290, model:'CPS', rate:6, imp:3820, clk:214, sales:16450, orders:5, budget:0, spent:987, url:'aquajet.example', on:true},
      {id:'sp2', brand:'SoftPro', color:'#7C3AED', name:'ผ้าไมโครไฟเบอร์ 600 GSM (แพ็ก 5)', price:390, model:'CPC', rate:3, imp:5240, clk:362, sales:0, orders:0, budget:2000, spent:1086, url:'softpro.example', on:true},
      {id:'sp3', brand:'DriveCam', color:'#0F766E', name:'กล้องติดรถยนต์ 2K หน้า-หลัง', price:1990, model:'CPS', rate:8, imp:2910, clk:176, sales:11940, orders:6, budget:0, spent:955, url:'drivecam.example', on:true},
      {id:'sp4', brand:'SeatShield', color:'#BE123C', name:'ผ้าคลุมเบาะกันน้ำ กันคราบ', price:690, model:'CPC', rate:4, imp:2130, clk:121, sales:0, orders:0, budget:1500, spent:484, url:'seatshield.example', on:true},
    ],
    leads: [
      {id:'L-31', name:'คุณบอย', shop:'บอย คาร์วอช', prov:'ตรัง', type:'carcare', phone:'08x-xxx-3101', date:'2026-10-09', status:'ใหม่'},
      {id:'L-32', name:'คุณแนน', shop:'แบรนด์ NN Clean (OEM)', prov:'กรุงเทพฯ', type:'oem', phone:'08x-xxx-3202', date:'2026-10-10', status:'ใหม่', note:'ต้องการผลิตโฟมล้างรถแบรนด์ตัวเอง 2,000 ขวด'},
      {id:'L-33', name:'คุณเจ', shop:'เจ ออโต้พาร์ท', prov:'พัทลุง', type:'dealer', phone:'08x-xxx-3303', date:'2026-10-11', status:'นัดคุย'},
    ],
  };
}
let S;
try { S = JSON.parse(localStorage.getItem(KEY)) || fresh(); } catch (e) { S = fresh(); }
{ const F = fresh(); for (const k in F) if (!(k in S)) S[k] = F[k]; }
function applyProd() { for (const id in S.prodOv) if (P[id]) Object.assign(P[id], S.prodOv[id]); }
S.newProds.forEach(x => addNewProd(x));
applyProd();
applyCats();
const isOn = p => (p.status || 'published') === 'published';
function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} }
function resetDemo() { S = fresh(); save(); location.reload(); return; toast('รีเซ็ตข้อมูล demo แล้ว'); route(); }

/* ---------- computed ---------- */
const cust = id => S.customers.find(c => c.id === id);
const shopName = id => (id && cust(id)) ? cust(id).name : 'ไม่ระบุร้าน';
function lineTotal(o) {
  const r = o.refund || {lines:[], ship:false};
  let t = 0; o.items.forEach((_, i) => { if (!r.lines.includes(i)) t += lineNet(o, i); });
  return Math.round(t + (o.ship && !r.ship ? o.ship : 0));
}
function stats(c) {
  const os = S.orders.filter(o => o.cid === c.id).sort((a, b) => a.date < b.date ? -1 : 1);
  const spend = os.reduce((s, o) => s + lineTotal(o), 0);
  const last = os.length ? os[os.length - 1] : null;
  const since = last ? days(D(last.date), TODAY) : 999;
  let due = null;
  if (last && c.type !== 'dealer') {
    const cyc = last.items.map(([p]) => P[p].cycle).filter(Boolean);
    if (cyc.length) due = addDays(D(last.date), Math.min(...cyc));
  }
  const dueIn = due ? days(TODAY, due) : null;
  const chans = [...new Set(os.map(o => o.ch))];
  const bought = new Set(os.flatMap(o => o.items.map(i => i[0])));
  const y12 = os.filter(o => days(D(o.date), TODAY) <= 365).reduce((s, o) => s + lineTotal(o), 0);
  let tier = null;
  if (c.type === 'b2c') { tier = TIERS[0]; TIERS.forEach(t => { if (y12 >= t.min) tier = t; }); }
  if (c.type === 'b2c' && S.tierOv && S.tierOv[c.id]) tier = TIERS.find(t => t.k === S.tierOv[c.id]) || tier;
  const pts = c.type === 'b2c' ? os.reduce((t, o) => t + Math.floor((lineTotal(o) - (o.ship || 0)) / 25), 0) + (S.bonus[c.id] || 0) - (S.redeemed[c.id] || 0) : 0;
  const l60 = os.filter(o => days(D(o.date), TODAY) <= 60).reduce((s, o) => s + lineTotal(o), 0);
  const p60 = os.filter(o => { const d = days(D(o.date), TODAY); return d > 60 && d <= 120; }).reduce((s, o) => s + lineTotal(o), 0);
  const month = os.filter(o => o.date >= '2026-09-13').reduce((s, o) => s + lineTotal(o), 0);
  return {os, spend, last, since, due, dueIn, chans, bought, tier, pts, y12, l60, p60, n: os.length, month};
}
const ST = {}; function st(c) { return stats(c); }

const SEGMENTS = [
  {id:'refill', name:'ถึงรอบเติมน้ำยา', desc:'ใช้ใกล้หมดตามรอบสินค้า (อีก ≤7 วัน หรือเลยมาไม่เกิน 30 วัน)', act:'ส่งการ์ดสั่งซ้ำ 1 คลิก + REFILL5', test:(c, s) => c.type !== 'dealer' && s.dueIn !== null && s.dueIn <= 7 && s.dueIn >= -30, hot:true},
  {id:'nolink', name:'ซื้อแล้วแต่ยังไม่ผูก LINE', desc:'ลูกค้าปลีกที่ยินยอมรับข่าวสาร แต่ติดต่อได้แค่ SMS / อีเมล', act:'SMS ชวนผูก LINE รับ 50 แต้ม', test:(c, s) => c.type === 'b2c' && !c.line && c.consent && s.n > 0},
  {id:'new', name:'ลูกค้าใหม่ (30 วัน)', desc:'ซื้อครั้งแรกภายใน 30 วันที่ผ่านมา', act:'สอนใช้สินค้า + คูปองครั้งที่ 2', test:(c, s) => s.n === 1 && s.since <= 30},
  {id:'loyal', name:'ซื้อซ้ำประจำ', desc:'ซื้อตั้งแต่ 3 ครั้งขึ้นไป', act:'เชิญเลื่อนระดับ / สิทธิ์สินค้าใหม่ก่อนใคร', test:(c, s) => s.n >= 3},
  {id:'cross', name:'ซื้อนีออน / โฟม แต่ยังไม่เคยซื้อเคลือบ', desc:'โอกาส cross-sell เคลือบสี Beclean / เคลือบกระจก MDC2', act:'เสนอเคลือบสี ลด 10% คู่กับนีออน', test:(c, s) => c.type === 'b2c' && ['p1','p3','p15','p17'].some(p => s.bought.has(p)) && !['p4','p7','p24','p5'].some(p => s.bought.has(p))},
  {id:'winback', name:'หายไปนาน (90 วัน+)', desc:'ไม่มีคำสั่งซื้อเกิน 90 วัน', act:'คิดถึงนะ + NEON50', test:(c, s) => s.since > 90 && s.since < 999},
  {id:'carcare', name:'ร้านคาร์แคร์', desc:'ลูกค้าธุรกิจที่ซื้อ MD INFINITY / SUPER TRUCK', act:'ราคาขั้นบันได + ส่งตรงจากโรงงาน', test:c => c.type === 'carcare'},
  {id:'dealerdown', name:'ตัวแทนยอดลดลง', desc:'ยอด 60 วันล่าสุดต่ำกว่า 60 วันก่อนหน้า', act:'ให้เซลส์โทรเยี่ยม + โปรกระตุ้นยอด', test:(c, s) => c.type === 'dealer' && s.l60 < s.p60},
  {id:'bday', name:'เกิดเดือนนี้ (ต.ค.)', desc:'ส่งคูปองวันเกิดตามระดับสมาชิก', act:'BDAY100 / ฿50 ตามระดับ', test:c => c.bday === 10},
];
function segMembers(seg) {
  return S.customers.filter(c => seg.test(c, st(c)));
}
function allSegs() {
  return SEGMENTS.concat(S.customSegs.map(cs => ({...cs, custom:true, test: (c, s) => cs.cond ? matchCond(cs.cond, c, s) : false})));
}
function matchCond(q, c, s) {
  if (q.ch && !s.chans.includes(q.ch)) return false;
  if (q.type && c.type !== q.type) return false;
  if (q.cat && ![...s.bought].some(p => P[p] && P[p].cat === q.cat)) return false;
  if (q.min && s.spend < q.min) return false;
  if (q.rep && s.n < +q.rep) return false;
  if (q.idle && s.since < q.idle) return false;
  return s.n > 0;
}

/* ---------- ui helpers ---------- */
function toast(m) { const t = document.getElementById('toast'); t.classList.remove('show'); void t.offsetWidth; t.innerHTML = '<i class="tdot"></i><span>' + m + '</span>'; t.classList.add('show'); clearTimeout(toast._t); toast._t = setTimeout(() => t.classList.remove('show'), 2600); }
const layer = document.getElementById('layer');
function closeLayer() { const el = layer.firstElementChild; if (!el) return; if (el.classList.contains('out')) return; el.classList.add('out'); setTimeout(() => { if (el.parentNode === layer) layer.innerHTML = ''; }, 220); }
function modal(html) { const m = layer.querySelector('.overlay:not(.out) .modal'); if (m) { m.innerHTML = html; return; } layer.innerHTML = `<div class="overlay" onclick="if(event.target===this)closeLayer()"><div class="modal">${html}</div></div>`; }
function drawer(html) { const d = layer.querySelector('.drawer-wrap:not(.out) .drawer'); if (d) { const sc = d.scrollTop; d.innerHTML = html; d.scrollTop = sc; return; } layer.innerHTML = `<div class="drawer-wrap" onclick="if(event.target===this)closeLayer()"><div class="drawer">${html}</div></div>`; }
const AVC = ['#F2621F','#111316','#4D6B00','#8A6100','#2563EB','#9333EA','#0F766E','#BE123C'];
const av = (c, s = 34) => `<div class="av" style="width:${s}px;height:${s}px;font-size:${Math.round(s * .42)}px;background:${AVC[parseInt(c.id.slice(-2)) % AVC.length]}">${c.name.replace(/^(ร้าน|หจก\.)\s*/, '').replace(/^[เแโใไ]/, '')[0]}</div>`;
const chChip = k => `<span class="chip ${CH[k][1]}">${CH[k][0]}</span>`;
const typeChip = c => c.type === 'b2c' ? '' : `<span class="chip ${TYPE[c.type][1]}">${c.type === 'dealer' ? c.tier : TYPE[c.type][0]}</span>`;
const tierChip = s => s.tier ? `<span class="chip ${s.tier.k === 'Gold' ? 'gold' : s.tier.k === 'Platinum' ? 'neon' : s.tier.k === 'Silver' ? 'blue' : ''}">${s.tier.k}</span>` : '';

/* ---------- demo bar ---------- */
function demobar(path) {
  const links = [['/','สารบัญ demo'],['/store','หน้าร้าน'],['/me','สมาชิกของฉัน'],['/line','LINE OA'],['/admin','หลังบ้าน CRM']];
  const u = S.user ? cust(S.user) : null;
  document.getElementById('demobar').innerHTML = `<span class="brand">MD CLEAN CAR</span><span class="tag">CRM & Marketing demo</span>
    ${links.map(([h, t]) => `<a href="#${h}" class="${(h === '/' ? path === '/' : path.startsWith(h)) ? 'on' : ''}">${t}</a>`).join('')}
    <span class="sp"></span><span class="who">${u ? `● <b>${esc(u.name)}</b>${u.line ? ' · LINE ✓' : ''}` : '● ยังไม่ login'}</span>
    <button onclick="resetDemo()">รีเซ็ต</button>`;
}

/* =========================================================
   INDEX
   ========================================================= */
function vIndex() {
  const card = (href, bg, inner, h, p) => `<a class="ic-card" href="#${href}"><div class="top" style="background:${bg}">${inner}</div><div class="bd"><h3>${h}</h3><p class="muted small" style="margin:6px 0 0">${p}</p></div></a>`;
  return `<div class="idx">
    <div class="row" style="gap:14px;margin-bottom:14px">${logo('บริษัท เอ็ม ดี คลีน จำกัด · สุราษฎร์ธานี')}</div>
    <h1>CRM & Marketing Platform <span style="color:var(--o)">for MD Clean Car</span></h1>
    <p class="muted" style="max-width:820px;font-size:15px">Demo ที่ปรับโครงจาก Grandprix Platform (CRM + การตลาด) มาใช้กับธุรกิจ <b style="color:var(--ink)">โรงงานผลิตน้ำยาดูแลรถและทำความสะอาดครัวเรือน</b> ที่ขายผ่านช่องทางของตัวเอง ทั้งเว็บไซต์ · LINE OA · ตัวแทนจำหน่ายทั่วประเทศ และร้านคาร์แคร์
    · ฐานลูกค้ารวมเป็นคนเดียวกันทุกช่องทาง · ระบบรู้ว่า <b style="color:var(--ink)">น้ำยาของลูกค้าใกล้หมดเมื่อไหร่</b> แล้วชวนกลับมาซื้อซ้ำ</p>
    <p class="note" style="max-width:820px">รูป ชื่อ และราคาสินค้าดึงจากร้าน Shopee MDCleancar (ได้รับอนุญาตให้ใช้ทำ demo) · เฟสนี้ไม่เชื่อมข้อมูลลูกค้า/ออเดอร์จาก Shopee หรือ marketplace อื่น · ข้อมูลลูกค้า / คำสั่งซื้อเป็นตัวอย่างทั้งหมด · หน้านี้เป็นสารบัญ ไม่ใช่หน้าของระบบจริง</p>

    <div class="idx-grid">
      ${card('/store', 'linear-gradient(135deg,#F2621F,#B83F07)', `<div style="width:120px">${art(P.p1)}</div>`, 'หน้าร้าน (ซื้อตรงจากโรงงาน)', 'ร้านออนไลน์ของแบรนด์เอง · สมาชิกสะสมแต้ม · โค้ดส่วนลด · สั่งซ้ำ 1 คลิก · ฟอร์มสมัครตัวแทน / OEM')}
      ${card('/me', 'radial-gradient(120% 140% at 100% 0%,#F2621F 0%,#7A2A07 38%,#111316 70%)', `<div style="font-family:Kanit;font-style:italic;font-weight:800;font-size:30px">MD MEMBER</div>`, 'สมาชิกของฉัน', 'บัตรสมาชิก 4 ระดับ · แต้ม & แลกของรางวัล · คูปอง · ประวัติทุกช่องทาง · ผูก LINE')}
      ${card('/line', '#06C755', `<div style="display:flex;gap:10px;align-items:center;font-family:Kanit;font-weight:600;font-size:22px">${I.chat} @mdcleancar</div>`, 'LINE OA (จำลองแชท)', 'Rich menu 6 ปุ่ม · การ์ดเตือนเติมน้ำยา · แต้มของฉัน · วิธีใช้สินค้า · ข้อความแคมเปญจากหลังบ้านเด้งเข้ามาจริง')}
      ${card('/admin', '#111316', `<div style="font-family:Kanit;font-weight:700;font-size:22px;letter-spacing:.05em">BACK-OFFICE</div>`, 'หลังบ้าน · ภาพรวม', 'ยอดขายแยกช่องทาง · สัดส่วน marketplace vs ซื้อตรง · สิ่งที่ต้องทำวันนี้ · Top ลูกค้า')}
      ${card('/admin/customers', '#2C3036', `<div style="font-family:Kanit;font-weight:700;font-size:22px">Customer 360</div>`, 'ลูกค้า (CRM)', 'รวมคนเดียวกันจากเว็บ / LINE / ตัวแทน & คาร์แคร์ · ระดับสมาชิก · วันที่น้ำยาจะหมด · timeline')}
      ${card('/admin/segments', 'linear-gradient(135deg,#3D5400,#111316)', `<div style="font-family:Kanit;font-weight:700;font-size:22px;color:#B8F227">9 Segments</div>`, 'กลุ่มลูกค้า + ตัวสร้างกลุ่ม', 'ถึงรอบเติม · ยังไม่ผูก LINE · cross-sell · หายไป 90 วัน · ตัวแทนยอดตก ฯลฯ คำนวณสด')}
      ${card('/admin/campaigns', 'linear-gradient(135deg,#F5B800,#8A6100)', `<div style="font-family:Kanit;font-weight:700;font-size:22px">Campaigns</div>`, 'แคมเปญ LINE · SMS · อีเมล', 'เลือกกลุ่ม → ช่องทาง → เทมเพลต · ดูตัวอย่างบนมือถือ · ประเมินค่าส่ง · วัดผลถึงยอดขาย')}
      ${card('/admin/automation', 'linear-gradient(135deg,#111316,#F2621F)', `<div style="font-family:Kanit;font-weight:700;font-size:22px">Automation</div>`, 'ออโตเมชัน', 'เตือนเติมน้ำยาตามรอบ · ต้อนรับสมาชิก · ขอรีวิว · ดึงกลับ 90 วัน · วันเกิด · ตะกร้าค้าง')}
      ${card('/admin/dealers', 'linear-gradient(135deg,#2C3036,#4B5058)', `<div style="font-family:Kanit;font-weight:700;font-size:22px">B2B · Dealer</div>`, 'ตัวแทน & คาร์แคร์', 'ระดับตัวแทน + ส่วนลด · เป้า vs ยอดจริง · ลีดสมัครตัวแทน / รับผลิต OEM จากหน้าร้าน')}
    </div>

    <h3 style="font-size:20px;margin:34px 0 4px">ปรับจากโครง Grandprix อย่างไร</h3>
    <div class="map">
      <div><b>Grandprix</b>หลาย event (TDE · Souped Up · Runbike)<br><b style="margin-top:8px">MD Clean Car</b>ช่องทางของแบรนด์ (เว็บ · LINE · ตัวแทน · คาร์แคร์)</div>
      <div><b>Grandprix</b>ชวนกลับมางานปีหน้า<br><b style="margin-top:8px">MD Clean Car</b>เตือนเติมน้ำยาตามรอบใช้งาน (สินค้าใช้แล้วหมด)</div>
      <div><b>Grandprix</b>ตั๋ว QR ใน LINE<br><b style="margin-top:8px">MD Clean Car</b>สั่งซ้ำ 1 คลิก · แต้ม · วิธีใช้ใน LINE</div>
      <div><b>เพิ่มใหม่</b>ระดับสมาชิก & แต้ม · ออโตเมชัน · ตัวแทน B2B · ลีด OEM</div>
    </div>

    <h3 style="font-size:20px;margin:34px 0 4px">ลองเล่นตามลำดับนี้</h3>
    <ol class="flowlist" style="padding:0">
      <li><div>เปิด <a href="#/store">หน้าร้าน</a> → กด <b>เข้าสู่ระบบ</b> เลือก "ด้วย LINE" (ได้ +50 แต้ม) → แถบเขียว "นีออนใกล้หมดแล้ว" จะขึ้นเพราะซื้อไปเมื่อ 30 ส.ค.</div></li>
      <li><div>กด <b>สั่งซ้ำ</b> → ใส่โค้ด <b>REFILL5</b> ในตะกร้า → ชำระเงิน (จำลอง) → ได้แต้ม + ข้อความยืนยันเด้งเข้า <a href="#/line">LINE OA</a></div></li>
      <li><div>ดู <a href="#/me">สมาชิกของฉัน</a> → แต้มขึ้น ระดับขยับเข้าใกล้ Gold → ลองแลกของรางวัล → คูปองไปอยู่ในกระเป๋า</div></li>
      <li><div>ไป <a href="#/admin/customers">หลังบ้าน › ลูกค้า</a> → เปิด <b>เอกชัย</b> ดู Customer 360: ช่องทางที่รวมไว้ · วันที่น้ำยาจะหมดรอบถัดไป · timeline</div></li>
      <li><div><a href="#/admin/segments">กลุ่มลูกค้า</a> → ดูกลุ่ม "ซื้อแล้วแต่ยังไม่ผูก LINE" → ลอง <b>สร้างกลุ่มเอง</b> จากเงื่อนไข</div></li>
      <li><div><a href="#/admin/campaigns/new">สร้างแคมเปญ</a> → กลุ่ม "ถึงรอบเติมน้ำยา" → LINE → เทมเพลต "สั่งซ้ำ" → เห็นค่าส่งก่อนยิง → ส่ง → เปิด <a href="#/line">LINE OA</a> จะเห็นข้อความเข้า</div></li>
      <li><div><a href="#/admin/automation">ออโตเมชัน</a> เปิด/ปิด flow · <a href="#/admin/tiers">ระดับสมาชิก</a> ปรับเกณฑ์แต้ม · <a href="#/admin/promos">ส่วนลด</a> ปิดโค้ดแล้วลองใช้ที่หน้าร้าน</div></li>
      <li><div>หน้าร้าน → แถบ "ตัวแทน / OEM" → <b>สมัคร</b> → ไปดูลีดใหม่ที่ <a href="#/admin/dealers">ตัวแทน & คาร์แคร์</a></div></li>
    </ol>
  </div>`;
}

/* =========================================================
   STORE
   ========================================================= */
let slideI = 0, slideT = null;
const SLIDES = [
  {bg:'linear-gradient(120deg,#F2621F 0%,#E0500F 55%,#B83F07 100%)', kick:'ขายดีอันดับ 1', h:'นีออน<br>หัวเชื้อสลายคราบ', p:'คราบฝังแน่น คราบน้ำมัน คราบแมลง ขี้นก จบในขั้นตอนเดียว · มาพร้อมน้ำยาอะลูมิเนียมและแปรง', price:'฿499', pid:'p1'},
  {bg:'linear-gradient(120deg,#111316 0%,#24272C 60%,#3a1a08 100%)', kick:'สมาชิกแต้ม x2', h:'เซตสุดคุ้ม<br>ครบในชุดเดียว', p:'โฟมสลายคราบ + นีออน + แวกซ์พิงค์ + น้ำยาอะลูมิเนียม + แปรง', price:'฿899', pid:'p5'},
  {bg:'linear-gradient(120deg,#1b1f12 0%,#2C3A05 55%,#111316 100%)', kick:'สำหรับคาร์แคร์', h:'MD INFINITY<br>ผสมน้ำได้ 500 ลิตร', p:'โฟมล้างรถเข้มข้น คุ้มต่อคัน · SUPER TRUCK สำหรับรถบรรทุก · ราคาร้านคาร์แคร์ลด 15%', price:'฿899', pid:'p2', b2b:true},
];
function slideHTML() {
  // every slide is rendered in the same grid cell so the hero keeps the tallest slide's height (no jump when switching)
  return `<div class="slides" id="slide">${SLIDES.map((s, i) => `<div class="slide ${i === slideI ? 'on' : ''}" style="background:${s.bg}" ${i === slideI ? '' : 'aria-hidden="true"'}>
        <div class="copy"><span class="kick">${s.kick}</span><h2>${s.h}</h2><p>${s.p}</p>
          <div class="row" style="gap:16px"><span class="price">${s.price}${s.was ? `<s>${s.was}</s>` : ''}</span>
          ${s.b2b ? `<button class="btn" style="background:#B8F227;color:#111" onclick="leadForm('carcare')" ${i === slideI ? '' : 'tabindex="-1"'}>สมัครราคาคาร์แคร์</button>` : `<button class="btn" style="background:#fff;color:#111" onclick="addCart('${s.pid}')" ${i === slideI ? '' : 'tabindex="-1"'}>ใส่ตะกร้า</button>`}</div></div>
        <div class="img">${art(P[s.pid])}</div>
      </div>`).join('')}
      <div class="dots">${SLIDES.map((_, i) => `<i class="${i === slideI ? 'on' : ''}" onclick="goSlide(${i})"></i>`).join('')}</div></div>`;
}
function goSlide(i) { slideI = i; const el = document.getElementById('slide'); if (el) el.outerHTML = slideHTML(); }
function storeHead(u, us, cnt, onStore = true) {
  return `<div class="s-top"><span>🚚 ส่งฟรีเมื่อซื้อครบ <b>฿500</b></span><span>⭐ สมาชิกสะสม 1 แต้มทุก ฿25</span><span>🏭 ผลิตเองจากโรงงาน สุราษฎร์ธานี</span></div>
  <header class="s-head"><div class="in">
    <a href="#/store">${logo()}</a>
    <label class="s-search">${I.search}<input placeholder="ค้นหา นีออน, โฟม, เคลือบสี, SUPER TRUCK..." value="${esc(S.q)}" ${onStore ? 'oninput="S.q=this.value;renderGrid()"' : 'onkeydown="if(event.key===\'Enter\'){S.q=this.value;S.cat=\'all\';save();location.hash=\'#/store\';setTimeout(()=>setCat(\'all\',true),120)}"'}></label>
    <button class="btn btn-w btn-sm hide-sm" onclick="leadForm()">${I.handshake} ตัวแทน / OEM</button>
    <button class="btn btn-w btn-sm cartbtn" id="cartBtn" onclick="openCart()">${I.cart}<span class="hide-sm">ตะกร้า</span> <span class="chip k" id="cartCnt">${cnt}</span></button>
    ${u ? `<a class="btn btn-k btn-sm ptsbtn" href="#/me">${tierChip(us)} <span class="num">${us.pts.toLocaleString()}</span><span class="hide-sm"> แต้ม</span></a>` : `<button class="btn btn-o btn-sm" onclick="loginModal()">เข้าสู่ระบบ<span class="hide-sm"> / สมัครสมาชิก</span></button>`}
  </div>
  <div class="s-cats">${CATS.map(([k, t]) => `<button class="${S.cat === k ? 'on' : ''}" data-cat="${k}" onclick="setCat('${k}')">${t}</button>`).join('')}</div></header>`;
}
function vStore() {
  const u = S.user ? cust(S.user) : null, us = u ? st(u) : null;
  const list = PRODUCTS.filter(p => isOn(p) && (S.cat === 'all' || p.cat === S.cat) && (!S.q || p.name.includes(S.q)));
  const cnt = S.cart.reduce((s, i) => s + i.q, 0);
  const reorder = u && us.dueIn !== null && us.dueIn <= 7 ? (() => {
    const pid = us.last.items[0][0];
    return `<div class="reorder">${art(P[pid])}<div class="grow"><b style="font-family:var(--fd);font-size:17px">${P[pid].short} ของคุณ${us.dueIn >= 0 ? `จะหมดในอีก ~${us.dueIn} วัน` : 'น่าจะหมดแล้ว'}</b><div class="muted small">ซื้อล่าสุด ${thd(us.last.date, 1)} · รอบใช้งานเฉลี่ย ${P[pid].cycle} วัน · ใช้โค้ด <b style="color:var(--ink)">REFILL5</b> ลดเพิ่ม 5%</div></div><button class="btn btn-k" onclick="reorderLast()">${I.refill} สั่งซ้ำ</button></div>`;
  })() : '';
  return `${storeHead(u, us, cnt)}
  <div class="s-wrap">
    <div class="hero">
      ${slideHTML()}
      <div class="side-cards">
        <div class="sc" style="background:#fff;border:1px solid var(--g2)"><div style="color:var(--o);margin-bottom:auto">${I.gift}</div><b style="font-family:var(--fd);font-size:18px">${u ? `สวัสดี คุณ${esc(u.name.split(' ')[0])}` : 'สมัครสมาชิกรับ ฿50'}</b><span class="muted small">${u ? `ระดับ ${us.tier.k} · ${us.pts} แต้ม · ใช้แลกของได้ที่หน้าสมาชิก` : 'โค้ด WELCOME สำหรับออเดอร์แรก + สะสมแต้มทุกช่องทาง'}</span></div>
        <div class="sc" style="background:#06C755;color:#fff"><div style="margin-bottom:auto">${I.chat}</div><b style="font-family:var(--fd);font-size:18px">แอด LINE @mdcleancar</b><span class="small" style="opacity:.9">สั่งซ้ำ 1 คลิก · เช็กแต้ม · ปรึกษาวิธีใช้</span></div>
      </div>
    </div>
    ${reorder}
    <div class="stats">
      <div class="stat"><div class="ic" style="color:var(--o)">${I.factory}</div><div><b>300+</b><span class="muted small">แบรนด์ไว้ใจให้ผลิต OEM</span></div></div>
      <div class="stat"><div class="ic" style="color:var(--o)">${I.store}</div><div><b>1,000+</b><span class="muted small">ร้านตัวแทนทั่วประเทศ</span></div></div>
      <div class="stat"><div class="ic" style="color:var(--o)">${I.star}</div><div><b>1 แต้ม / ฿25</b><span class="muted small">สมาชิกสะสมแต้มทุกออเดอร์</span></div></div>
      <div class="stat"><div class="ic" style="color:var(--o)">${I.users}</div><div><b>27K+</b><span class="muted small">ผู้ติดตามเพจ Facebook</span></div></div>
    </div>
    <div class="sec-h"><h3>ช้อปตามการใช้งาน</h3><span class="muted small">เลือกตามสิ่งที่อยากทำวันนี้</span></div>
    <div class="uses">
      ${[['wash','ล้างรถ & โฟม','นีออน · โฟม · แชมพู','#F2621F','p15'],['coat','เคลือบสี & กระจก','Beclean · MDC2','#8A6100','p7'],['tire','ยาง ล้อ & คราบฝัง','ยางดำ · อะลูมิเนียม · ยางมะตอย','#2C3036','p6'],['set','เซตสุดคุ้ม','รวมชุดขายดี','#BE185D','p5'],['pro','คาร์แคร์ & รถบรรทุก','INFINITY · SUPER TRUCK','#3D5400','p14']].map(([k, t, d, c, pid]) => `<div class="use" style="background:${c}" onclick="setCat('${k}',true)"><b>${t}</b><span class="small">${d} →</span>${art(P[pid], 'use-img')}</div>`).join('')}
    </div>
    <div class="sec-h" id="grid"><h3 id="gtitle">${CATS.find(c => c[0] === S.cat)[1] === 'ทั้งหมด' ? 'สินค้าทั้งหมด' : CATS.find(c => c[0] === S.cat)[1]}</h3><span class="muted small" id="gcount">${list.length} รายการ</span></div>
    <div class="grid-p" id="gridp">${gridHTML(list, us)}</div>
    ${sponsoredHTML()}

    <div class="b2b">
      <div class="l"><span class="chip" style="background:#B8F227;color:#111">B2B</span>
        <h3 style="font-size:28px;margin:12px 0 8px">เปิดร้านคาร์แคร์ · เป็นตัวแทน · รับผลิต OEM</h3>
        <p style="color:#B4B8BE;margin:0 0 18px">ราคาส่งตามระดับตัวแทน ส่วนลดสูงสุด 40% · รับผลิตน้ำยาแบรนด์ของคุณเอง มาตรฐานโรงงาน · ส่งทั่วประเทศรวดเร็ว</p>
        <div class="row wrap"><button class="btn btn-o" onclick="leadForm('dealer')">สมัครตัวแทนจำหน่าย</button><button class="btn" style="border:1px solid #4B5058;color:#fff" onclick="leadForm('oem')">ปรึกษารับผลิต OEM</button></div></div>
      <div class="r"><div><b>300+</b><span class="small" style="color:#B4B8BE">แบรนด์ OEM</span></div><div><b>1,000+</b><span class="small" style="color:#B4B8BE">ร้านค้าตัวแทน</span></div><div><b>40%</b><span class="small" style="color:#B4B8BE">ส่วนลดตัวแทนสูงสุด</span></div><div><b>24 ชม.</b><span class="small" style="color:#B4B8BE">ตอบกลับลีดใหม่</span></div></div>
    </div>
    <div class="footer-strip">
      <div><b>ส่งฟรีเมื่อซื้อครบ ฿500</b><span class="muted small">ไม่ถึงยอด ค่าส่ง ฿50</span></div>
      <div><b>ปรึกษาวิธีใช้ฟรี</b><span class="muted small">LINE @mdcleancar 08:00–20:00</span></div>
      <div><b>ขอใบกำกับภาษีได้</b><span class="muted small">เลือกตอนชำระเงิน</span></div>
    </div>
  </div>
  ${mcartHTML()}<a class="fab" href="#/line" title="LINE OA">${I.chat}</a>`;
}
let pdImg = 0, pdQty = 1, pdTab = 'desc';
function pdGallery(p) {
  const d = (window.MD_DETAIL || {})[p.id];
  const cover = (window.MD_PHOTOS || {})[p.id];
  return d && d.gallery && d.gallery.length ? d.gallery : (cover ? [cover] : []);
}
function vProduct(id) {
  const p = P[id];
  if (!p) return `<div class="s-wrap"><div class="empty"><b>ไม่พบสินค้านี้</b><a class="btn btn-w btn-sm" href="#/store">กลับไปหน้าร้าน</a></div></div>`;
  const u = S.user ? cust(S.user) : null, us = u ? st(u) : null;
  const cnt = S.cart.reduce((t, i) => t + i.q, 0);
  const d = (window.MD_DETAIL || {})[id] || {desc: p.name + ' ขนาด ' + p.size, feats: [], how: [], warn: ''};
  const imgs = pdGallery(p); if (pdImg >= imgs.length) pdImg = 0;
  const mult = us && us.tier ? us.tier.mult : 1;
  const cat = CATS.find(c => c[0] === p.cat);
  const bought = us ? [...us.os].reverse().find(o => o.items.some(i => i[0] === id)) : null;
  const code = p.name.includes('นีออน') ? ['NEON50', 'ลด ฿50 เมื่อซื้อสินค้าที่มีนีออน'] : ['MD10', 'ลด 10% เมื่อซื้อครบ ฿500'];
  const related = PRODUCTS.filter(x => isOn(x) && x.id !== id && (x.cat === p.cat || x.cat === 'set')).slice(0, 5);
  const main = imgs.length ? `<img src="${imgs[pdImg]}" alt="${esc(p.name)}" onload="this.classList.add('ld')">` : artSvg(p);
  return `${storeHead(u, us, cnt, false)}
  <div class="s-wrap pd-wrap">
    <nav class="crumbs"><a href="#/store">หน้าร้าน</a><span>›</span><a href="#/store" onclick="setCat('${p.cat}');return false">${cat ? cat[1] : ''}</a><span>›</span><b>${p.short}</b></nav>
    <div class="pd">
      <div class="pd-gal">
        ${imgs.length > 1 ? `<div class="pd-thumbs">${imgs.map((src, i) => `<button class="${i === pdImg ? 'on' : ''}" onclick="pdImg=${i};pdRender('.pd-gal')" aria-label="รูปที่ ${i + 1}"><img src="${src}" alt="" loading="lazy"></button>`).join('')}</div>` : ''}
        <div class="pd-main">${main}${p.badge ? `<span class="chip ${p.badge === 'คาร์แคร์' ? 'neon' : 'o'} pd-badge">${p.badge}</span>` : ''}
          ${imgs.length > 1 ? `<button class="pd-nav l" onclick="pdImg=(pdImg-1+${imgs.length})%${imgs.length};pdRender('.pd-gal')" aria-label="รูปก่อนหน้า">‹</button><button class="pd-nav r" onclick="pdImg=(pdImg+1)%${imgs.length};pdRender('.pd-gal')" aria-label="รูปถัดไป">›</button><span class="pd-count">${pdImg + 1} / ${imgs.length}</span>` : ''}</div>
      </div>
      <div class="pd-info">
        <h1>${p.name}</h1>
        <div class="muted small">SKU MD-${id.slice(1).padStart(4, '0')} · ${p.size} · ผลิตโดย บริษัท เอ็ม ดี คลีน จำกัด</div>
        <div class="pd-price"><b>${baht(p.price)}</b><span class="chip ok">ใช้โค้ด ${code[0]} · ${code[1]}</span></div>
        <div class="pd-pts">${I.gift} รับ <b>+${Math.floor(p.price / 25 * mult)} แต้ม</b>${mult > 1 ? ` (สมาชิก ${us.tier.k} x${mult})` : ''} เมื่อซื้อชิ้นนี้</div>
        <div class="pd-buy"><div class="row pd-qty"><div class="qty"><button onclick="pdQty=Math.max(1,pdQty-1);pdRender('.pd-buy')" aria-label="ลดจำนวน">−</button><span>${pdQty}</span><button onclick="pdQty++;pdRender('.pd-buy')" aria-label="เพิ่มจำนวน">+</button></div><span class="small" style="color:var(--ok)">● มีสินค้า · ส่งจากโรงงานภายใน 1–2 วัน</span></div>
        <div class="pd-cta"><button class="btn btn-k" onclick="addCart('${id}',pdQty)">${I.cart} ใส่ตะกร้า · ${baht(p.price * pdQty)}</button><button class="btn btn-o" onclick="addCart('${id}',pdQty,true);updateCartUI();openCart()">ซื้อเลย</button></div></div>
        <a class="btn btn-line btn-sm pd-line" href="#/line">${I.chat} ถาม / สั่งผ่าน LINE @mdcleancar</a>
        ${p.cycle ? `<div class="pd-refill">${I.refill}<div><b>ใช้ได้ประมาณ ${p.cycle} วันต่อชิ้น</b><div class="muted xs">สมาชิกจะได้รับการแจ้งเตือนทาง LINE เมื่อใกล้หมด พร้อมปุ่มสั่งซ้ำ 1 คลิก</div></div></div>` : ''}
        ${bought ? `<div class="pd-bought">คุณเคยซื้อสินค้านี้เมื่อ ${thd(bought.date, 1)} · ${CH[bought.ch][0]}</div>` : ''}
        <div class="pd-rows">
          <div>${I.truck}<div><b>ส่งฟรีเมื่อซื้อครบ ฿500</b><span class="muted xs">ไม่ถึงยอด ค่าส่ง ฿50 · ส่งทั่วประเทศ 2–4 วันทำการ</span></div></div>
          <div>${I.star}<div><b>สมาชิกได้ 1 แต้มทุก ฿25</b><span class="muted xs">ผูก LINE รับเพิ่ม 50 แต้ม · แลกส่วนลดและของรางวัลได้</span></div></div>
          <div>${I.handshake}<div><b>ราคาส่งสำหรับตัวแทน / คาร์แคร์</b><span class="muted xs"><a href="#/store" onclick="leadForm('dealer');return false" style="color:var(--o-dk);font-weight:600">สมัครรับราคาส่ง →</a></span></div></div>
        </div>
      </div>
    </div>
    <div class="pd-detail card">
      <div class="tabs pd-tabs">${[['desc', 'รายละเอียด'], ['how', 'วิธีใช้'], ['warn', 'ข้อควรระวัง']].map(([k, t]) => `<button class="${pdTab === k ? 'on' : ''}" onclick="pdTab='${k}';pdRender('.pd-detail')">${t}</button>`).join('')}</div>
      <div class="pd-body">
        ${pdTab === 'desc' ? `<p>${esc(d.desc)}</p>${d.feats && d.feats.length ? `<ul class="pd-feats">${d.feats.map(f => `<li>${esc(f)}</li>`).join('')}</ul>` : ''}` : ''}
        ${pdTab === 'how' ? (d.how && d.how.length ? `<ol class="pd-steps">${d.how.map(x => `<li>${esc(x)}</li>`).join('')}</ol>` : '<p class="muted">ดูวิธีใช้บนฉลากสินค้า</p>') : ''}
        ${pdTab === 'warn' ? `<p>${esc(d.warn || 'อ่านคำแนะนำบนฉลากก่อนใช้ · เก็บให้พ้นมือเด็ก')}</p>` : ''}
      </div>
    </div>
    <div class="sec-h"><h3>ใช้คู่กันดีกว่า</h3><a class="muted small" href="#/store" onclick="setCat('${p.cat}');return false">ดูทั้งหมด →</a></div>
    <div class="grid-p">${gridHTML(related, us)}</div>
  </div>
  ${mcartHTML()}<a class="fab" href="#/line" title="LINE OA">${I.chat}</a>`;
}
function pdRender(sel) {
  const id = (location.hash.match(/#\/store\/p\/(\w+)/) || [])[1]; if (!id) return;
  const tmp = document.createElement('div'); tmp.innerHTML = vProduct(id);
  (sel ? [sel] : ['.pd-gal', '.pd-buy', '.pd-detail']).forEach(k => { const a = document.querySelector('#app ' + k), b = tmp.querySelector(k); if (a && b) a.replaceWith(b); });
}
function gridHTML(list, us) {
  if (!list.length) return `<div class="empty"><div class="empty-ic">${I.search}</div><b>ไม่พบสินค้าที่ตรงกับ "${esc(S.q)}"</b><span class="muted small">ลองคำอื่น เช่น นีออน, โฟม, เคลือบ</span><button class="btn btn-w btn-sm" onclick="S.q='';document.querySelector('.s-search input').value='';setCat('all')">ล้างการค้นหา</button></div>`;
  const mult = us && us.tier ? us.tier.mult : 1;
  return list.map(p => `<div class="pc"><div class="ph"><a class="phl" href="#/store/p/${p.id}" aria-label="${esc(p.name)}">${art(p)}</a><div class="badges">${p.badge ? `<span class="chip ${p.badge === 'คาร์แคร์' ? 'neon' : 'o'}">${p.badge}</span>` : ''}${p.was ? `<span class="chip k">-${Math.round((1 - p.price / p.was) * 100)}%</span>` : ''}</div>
    <button class="add" onclick="addCart('${p.id}')" aria-label="ใส่ตะกร้า">+</button></div>
    <div class="bd"><span class="muted xs">${p.size}</span><a class="nm" href="#/store/p/${p.id}">${p.name}</a><span class="pr">${baht(p.price)}${p.was ? `<s>${baht(p.was)}</s>` : ''}</span>
    <span class="pts">+${Math.floor(p.price / 25 * mult)} แต้ม${mult > 1 ? ` (x${mult})` : ''}</span></div></div>`).join('');
}
function setCat(k, jump) {
  if (!document.getElementById('gridp')) { S.cat = k; save(); location.hash = '#/store'; setTimeout(() => setCat(k, true), 120); return; }
  S.cat = k; save();
  document.querySelectorAll('.s-cats button').forEach(b => b.classList.toggle('on', b.dataset.cat === k));
  const t = CATS.find(c => c[0] === k)[1]; const h = document.getElementById('gtitle'); if (h) h.textContent = t === 'ทั้งหมด' ? 'สินค้าทั้งหมด' : t;
  renderGrid();
  if (jump) { const g = document.getElementById('grid'); if (g) window.scrollTo({top: g.getBoundingClientRect().top + scrollY - (innerWidth <= 720 ? 60 : 130), behavior: 'smooth'}); }
}
function mcartHTML() {
  const cnt = S.cart.reduce((s, i) => s + i.q, 0), k = cartCalc();
  return '<button id="mcart" class="mcart ' + (cnt ? 'show' : '') + '" onclick="openCart()"><span class="mc-ic">' + I.cart + '<b>' + cnt + '</b></span><span class="grow" style="text-align:left"><span class="xs" style="opacity:.7;display:block">' + (k.ship ? 'อีก ' + baht(500 - (k.sub - k.off)) + ' ส่งฟรี' : 'ส่งฟรีแล้ว') + '</span><b class="num">' + baht(k.total) + '</b></span><span class="mc-go">ดูตะกร้า →</span></button>';
}
function updateCartUI() {
  const cnt = S.cart.reduce((s, i) => s + i.q, 0);
  const c = document.getElementById('cartCnt'); if (c) { c.textContent = cnt; c.classList.remove('bump'); void c.offsetWidth; c.classList.add('bump'); }
  const m = document.getElementById('mcart'); if (m) m.outerHTML = mcartHTML();
}
function flyCart(r) {
  const tgt = [document.getElementById('mcart'), document.getElementById('cartBtn')].find(e => e && e.offsetParent && e.getBoundingClientRect().width);
  if (!r || !tgt || !document.body.animate || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const t = tgt.getBoundingClientRect(), d = document.createElement('i'); d.className = 'flydot'; document.body.appendChild(d);
  const x0 = r.left + r.width / 2 - 9, y0 = r.top + r.height / 2 - 9, x1 = t.left + 22 - 9, y1 = t.top + t.height / 2 - 9;
  d.animate([{transform: `translate(${x0}px,${y0}px) scale(1)`, opacity: 1}, {transform: `translate(${(x0 + x1) / 2}px,${Math.min(y0, y1) - 80}px) scale(1.15)`, opacity: 1, offset: .45}, {transform: `translate(${x1}px,${y1}px) scale(.4)`, opacity: .3}], {duration: 650, easing: 'cubic-bezier(.5,0,.3,1)'}).onfinish = () => d.remove();
}
function renderGrid() {
  const list = PRODUCTS.filter(p => isOn(p) && (S.cat === 'all' || p.cat === S.cat) && (!S.q || p.name.toLowerCase().includes(S.q.toLowerCase())));
  document.getElementById('gridp').innerHTML = gridHTML(list, S.user ? st(cust(S.user)) : null);
  document.getElementById('gcount').textContent = list.length + ' รายการ'; reveal(document.getElementById('gridp'), true);
}
function addCart(pid, q = 1, silent) {
  const _e = window.event, _r = _e && _e.currentTarget && _e.currentTarget.getBoundingClientRect ? _e.currentTarget.getBoundingClientRect() : null;
  const it = S.cart.find(i => i.pid === pid);
  if (it) it.q += q; else S.cart.push({pid, q});
  save(); if (!silent) { toast(`ใส่ตะกร้าแล้ว · ${P[pid].short}`); updateCartUI(); flyCart(_r); }
}
function reorderLast() {
  const us = st(cust(S.user));
  us.last.items.forEach(([p, q]) => addCart(p, q, true));
  S.code = 'REFILL5'; save(); route(); openCart();
}
function cartCalc() {
  const sub = S.cart.reduce((s, i) => s + P[i.pid].price * i.q, 0);
  let off = 0, codeMsg = '';
  const c = S.code && S.codes.find(x => x.code === S.code.toUpperCase());
  if (S.code) {
    if (!c) codeMsg = 'ไม่พบโค้ดนี้';
    else if (!c.on) codeMsg = 'โค้ดนี้ปิดใช้งานแล้ว';
    else {
      const base = S.cart.filter(i => !c.cat || P[i.pid].cat === c.cat).reduce((s, i) => s + P[i.pid].price * i.q, 0);
      if (!base) codeMsg = `โค้ดนี้ใช้ได้กับสินค้าหมวด ${catName(c.cat)} เท่านั้น`;
      else if (c.min && base < c.min) codeMsg = c.cat ? `ยอดสินค้าหมวด ${catName(c.cat)} ขั้นต่ำ ${baht(c.min)}` : `ขั้นต่ำ ${baht(c.min)}`;
      else { off = c.type === 'pct' ? Math.round(base * c.val / 100) : Math.min(c.val, base); codeMsg = `✓ ${c.desc}`; }
    }
  }
  const ship = sub - off >= 500 || !sub ? 0 : 50;
  const total = sub - off + ship;
  const u = S.user ? st(cust(S.user)) : null;
  const pts = Math.floor((sub - off) / 25 * (u && u.tier ? u.tier.mult : 1));
  return {sub, off, ship, total, codeMsg, ok: off > 0, pts, cat: off > 0 && c ? c.cat || '' : ''};
}
function openCart() {
  const k = cartCalc();
  drawer(`<div class="pad" style="padding:20px 22px">
    <div class="row between dhead"><h3 style="font-size:20px">ตะกร้าสินค้า <span class="muted" style="font-size:14px;font-weight:400">${S.cart.reduce((s, i) => s + i.q, 0)} ชิ้น</span></h3><button class="x" onclick="closeLayer()" aria-label="ปิด">×</button></div>
    ${S.cart.length ? `<div class="freeship ${k.ship ? '' : 'done'}"><div class="row between small"><span>${k.ship ? `อีก <b>${baht(500 - (k.sub - k.off))}</b> รับส่งฟรี` : '<b>ได้ส่งฟรีแล้ว</b>'}</span><span class="muted xs">ส่งฟรีเมื่อครบ ฿500</span></div><div class="bar"><i style="width:${Math.min(100, (k.sub - k.off) / 5)}%"></i></div></div>` : ''}
    ${S.cart.length ? S.cart.map((i, n) => `<div class="ci"><div class="th">${art(P[i.pid])}</div><div class="grow"><div style="font-weight:600;font-size:13.5px">${P[i.pid].name}</div><div class="muted xs">${P[i.pid].size}</div>
      <div class="row between" style="margin-top:6px"><div class="qty"><button onclick="cq(${n},-1)">−</button><span>${i.q}</span><button onclick="cq(${n},1)">+</button></div><b class="num">${baht(P[i.pid].price * i.q)}</b></div></div></div>`).join('')
      : `<div class="empty"><div class="empty-ic">${I.cart}</div><b>ยังไม่มีสินค้าในตะกร้า</b><span class="muted small">เริ่มจากนีออน หัวเชื้อขายดีอันดับ 1</span><button class="btn btn-o btn-sm" onclick="addCart('p1')">ใส่ เซตนีออน · ฿499</button></div>`}
    <div style="margin:16px 0 8px"><label class="lb">โค้ดส่วนลด</label><div class="row"><input class="input" id="code" placeholder="WELCOME / REFILL5 / MD10 / NEON50" value="${esc(S.code)}"><button class="btn btn-k" onclick="S.code=document.getElementById('code').value.trim().toUpperCase();save();openCart()">ใช้</button></div>
      ${k.codeMsg ? `<div class="small" style="margin-top:6px;color:${k.ok ? 'var(--ok)' : 'var(--red)'}">${k.codeMsg}</div>` : ''}</div>
    ${S.cart.length ? (S.user ? `<label class="lb" style="margin-top:4px">จัดส่งไปที่</label>${addrBox()}
      <button class="ck-tax ${taxInv ? 'on' : ''}" onclick="taxInv=!taxInv;openCart()"><i>${taxInv ? '✓' : ''}</i>ต้องการใบกำกับภาษี</button>${taxInv ? taxBox() : ''}`
      : `<div class="note small" style="margin:4px 0 12px">เข้าสู่ระบบแล้วระบบดึงที่อยู่จัดส่งและข้อมูลใบกำกับภาษีจากบัญชีของคุณให้</div>`) : ''}
    <div class="paybox">
      <div class="sumrow"><span class="muted">ยอดสินค้า</span><span class="num">${baht(k.sub)}</span></div>
      ${k.off ? `<div class="sumrow"><span class="muted">ส่วนลด ${esc(S.code)}</span><span class="num" style="color:var(--ok)">−${baht(k.off)}</span></div>` : ''}
      <div class="sumrow"><span class="muted">ค่าส่ง</span><span class="num">${k.ship ? baht(k.ship) : 'ฟรี'}</span></div>
      <div class="sumrow" style="font-size:18px;font-weight:700;font-family:var(--fd);margin-top:4px"><span>รวม</span><span class="num">${baht(k.total)}</span></div>
      <div class="small" style="color:var(--o-dk);font-weight:600">${S.user ? `ได้รับ +${k.pts} แต้มเมื่อชำระเงิน` : `เข้าสู่ระบบเพื่อรับ +${k.pts} แต้ม`}</div>
    </div>
    <button class="btn btn-o" style="width:100%;margin-top:16px;padding:13px" ${S.cart.length ? '' : 'disabled'} onclick="checkout()">ชำระเงิน (จำลอง) · ${baht(k.total)}</button>
    <p class="muted xs" style="text-align:center;margin-top:8px">ช่องทางชำระจริงเชื่อม PromptPay / บัตร ผ่าน payment gateway</p></div>
  </div>`);
}
function cq(n, d) { S.cart[n].q += d; if (S.cart[n].q <= 0) S.cart.splice(n, 1); save(); openCart(); updateCartUI(); }
function checkout() {
  if (!S.user) { loginModal(true); return; }
  const _a = ckAddrObj(); if (!_a) { toast('เพิ่มที่อยู่จัดส่งก่อน'); openAddrEdit('', {from:'cart', pick:true}); return; }
  const k = cartCalc();
  const o = {id:'MD-' + (2400 + S.orders.length + 1), cid:S.user, date:iso(TODAY), ch:'web', items:S.cart.map(i => [i.pid, i.q]), status:'ชำระแล้ว', off:k.off, ship:k.ship, code:k.ok ? S.code : '', offCat:k.cat, addr:addrLine(_a), dist:_a.dist, prov:_a.prov, tax:taxInv ? taxLine(me()) : null};
  S.orders.push(o);
  o.items.forEach(([p, q]) => S.stock[p] = Math.max(0, (S.stock[p] || 0) - q));
  const u = cust(S.user);
  const mult = st(u).tier.mult; if (mult > 1) S.bonus[u.id] = (S.bonus[u.id] || 0) + Math.floor((k.sub - k.off) / 25 * (mult - 1));
  if (u.line) pushLine({type:'order', oid:o.id, total:k.total, pts:k.pts, items:o.items});
  S.cart = []; S.code = ''; ckAddr = null; taxInv = false; save();
  modal(`<div class="pad" style="padding:28px;text-align:center">
    <div class="okmark"><svg viewBox="0 0 52 52"><circle cx="26" cy="26" r="23"/><path d="M15 27l7 7 15-15"/></svg></div>
    <h3 style="font-size:22px">ชำระเงินสำเร็จ · ${o.id}</h3>
    <p class="muted">ยอด ${baht(k.total)} · ได้รับ <b style="color:var(--o-dk)">+${k.pts} แต้ม</b>${u.line ? '<br>ส่งใบยืนยันเข้า LINE แล้ว' : ''}</p>
    <div class="row" style="justify-content:center;flex-wrap:wrap;margin-top:14px"><a class="btn btn-k btn-sm" href="#/me" onclick="closeLayer()">ดูแต้มของฉัน</a><a class="btn btn-line btn-sm" href="#/line" onclick="closeLayer()">เปิด LINE OA</a><a class="btn btn-w btn-sm" href="#/admin/customers?open=${u.id}" onclick="closeLayer()">ดูใน CRM หลังบ้าน</a></div></div>`);
  if (location.hash.startsWith('#/store')) { route(); }
}
function loginModal(fromCheckout) {
  modal(`<div class="pad" style="padding:26px">
    <div class="row between"><div>${logo('MD MEMBER')}</div><button class="x" onclick="closeLayer()">×</button></div>
    <h3 style="font-size:22px;margin:18px 0 4px">เข้าสู่ระบบสมาชิก</h3>
    <p class="muted small" style="margin:0 0 16px">${fromCheckout ? 'เข้าสู่ระบบเพื่อชำระเงินและรับแต้ม · ' : ''}บัญชีเดียวใช้ได้ทั้งเว็บ · LINE · ยืนยันตัวตนด้วยเบอร์โทร (OTP)</p>
    <button class="btn btn-line" style="width:100%;padding:12px" onclick="doLogin(true,${!!fromCheckout})">${I.chat} เข้าสู่ระบบด้วย LINE <span class="chip" style="background:rgba(255,255,255,.2);color:#fff">+50 แต้ม</span></button>
    <div class="row" style="margin:14px 0;color:var(--g5)"><hr style="flex:1;border:0;border-top:1px solid var(--g3)"><span class="small">หรือ</span><hr style="flex:1;border:0;border-top:1px solid var(--g3)"></div>
    <label class="lb">เบอร์โทรศัพท์</label><input class="input" value="081-234-1001" readonly>
    <button class="btn btn-k" style="width:100%;margin-top:10px;padding:12px" onclick="doLogin(false,${!!fromCheckout})">ขอรหัส OTP (จำลอง)</button>
    <p class="muted xs" style="margin-top:12px">demo: เข้าสู่ระบบเป็น "เอกชัย ตัวอย่าง" ลูกค้าที่เคยซื้อทางเว็บและ LINE</p></div>`);
}
function doLogin(viaLine, thenCart) {
  S.user = 'C-1001';
  const u = cust('C-1001');
  if (viaLine && !u.line) linkLine(true);
  save(); closeLayer(); toast(viaLine ? 'เข้าสู่ระบบด้วย LINE · ได้รับ +50 แต้ม' : 'เข้าสู่ระบบแล้ว');
  route(); if (thenCart) openCart();
}
function linkLine(silent) {
  const u = cust('C-1001');
  if (u.line) return;
  u.line = 'U8a21f0'; S.bonus[u.id] = (S.bonus[u.id] || 0) + 50;
  S.lineMsgs.push({t:'flex', kind:'linked', at:'09:41'});
  save(); if (!silent) { toast('ผูก LINE แล้ว · +50 แต้ม'); route(); }
}
function leadForm(type = 'dealer') {
  modal(`<div class="pad" style="padding:24px">
    <div class="row between"><h3 style="font-size:20px">ร่วมธุรกิจกับ MD Clean Car</h3><button class="x" onclick="closeLayer()">×</button></div>
    <p class="muted small">ทีมขายจะติดต่อกลับภายใน 24 ชม.</p>
    <div class="row" style="gap:8px;margin:12px 0" id="lt">${[['dealer','ตัวแทนจำหน่าย'],['carcare','ร้านคาร์แคร์'],['oem','รับผลิต OEM']].map(([k, t]) => `<button class="opt ${k === type ? 'on' : ''}" data-k="${k}" onclick="document.querySelectorAll('#lt .opt').forEach(b=>b.classList.remove('on'));this.classList.add('on')"><b>${t}</b></button>`).join('')}</div>
    <div style="display:grid;gap:10px">
      <div><label class="lb">ชื่อผู้ติดต่อ</label><input class="input" id="ln" value="คุณมิ้นท์"></div>
      <div><label class="lb">ชื่อร้าน / แบรนด์</label><input class="input" id="ls" value="มิ้นท์ คาร์วอช"></div>
      <div class="row" style="gap:10px"><div class="grow"><label class="lb">จังหวัด</label><input class="input" id="lp" value="สงขลา"></div><div class="grow"><label class="lb">เบอร์โทร</label><input class="input" id="lph" value="08x-xxx-3404"></div></div>
    </div>
    <button class="btn btn-o" style="width:100%;margin-top:16px;padding:12px" onclick="submitLead()">ส่งข้อมูล (demo)</button></div>`);
}
function submitLead() {
  const g = id => document.getElementById(id).value;
  const type = document.querySelector('#lt .opt.on').dataset.k;
  S.leads.unshift({id:'L-' + (34 + S.leads.length - 3), name:g('ln'), shop:g('ls'), prov:g('lp'), type, phone:g('lph'), date:iso(TODAY), status:'ใหม่'});
  save(); closeLayer(); toast('ส่งข้อมูลแล้ว · ลีดเข้าหลังบ้าน › ตัวแทน & คาร์แคร์');
}

/* =========================================================
   MEMBER
   ========================================================= */
/* =========================================================
   ADDRESS BOOK & TAX INVOICE (kept on the member account · used by web, LINE and back office)
   ========================================================= */
const ZIP = {'84000':['สุราษฎร์ธานี', 'เมืองสุราษฎร์ธานี', 'ตลาด'], '80000':['นครศรีธรรมราช', 'เมืองนครศรีธรรมราช', 'ในเมือง'], '81000':['กระบี่', 'เมืองกระบี่', 'ปากน้ำ'], '83000':['ภูเก็ต', 'เมืองภูเก็ต', 'ตลาดใหญ่'], '83150':['ภูเก็ต', 'กะทู้', 'ป่าตอง'],
  '86000':['ชุมพร', 'เมืองชุมพร', 'ท่าตะเภา'], '90110':['สงขลา', 'หาดใหญ่', 'หาดใหญ่'], '92000':['ตรัง', 'เมืองตรัง', 'ทับเที่ยง'], '10110':['กรุงเทพมหานคร', 'คลองเตย', 'คลองตัน'], '10900':['กรุงเทพมหานคร', 'จตุจักร', 'จอมพล'], '50200':['เชียงใหม่', 'เมืองเชียงใหม่', 'ศรีภูมิ']};
const PROVS = ['สุราษฎร์ธานี', 'นครศรีธรรมราช', 'กระบี่', 'ภูเก็ต', 'ชุมพร', 'สงขลา', 'ตรัง', 'พังงา', 'พัทลุง', 'ระนอง', 'กรุงเทพมหานคร', 'เชียงใหม่', 'อื่น ๆ'];
const STREETS = ['ถ.ตลาดใหม่', 'ถ.ศรีวิชัย', 'ถ.ชนเกษม', 'ถ.กาญจนวิถี', 'ถ.ดอนนก', 'ถ.ราษฎร์อุทิศ'];
function addrs(c) {
  if (!c) return [];
  if (!c.addrs) {
    const z = Object.keys(ZIP).find(k => ZIP[k][0] === c.region) || '84000', n = parseInt(c.id.slice(-2)) || 1, biz = c.type !== 'b2c';
    c.addrs = [{id:'a1', label:biz ? 'ที่ทำงาน' : 'บ้าน', name:biz ? c.name.replace(/\s*\(.*\)$/, '') : c.name, tel:c.phone, line:`${n * 7}/${n % 9 + 1} ${STREETS[n % STREETS.length]}`, sub:ZIP[z][2], dist:ZIP[z][1], prov:ZIP[z][0], zip:z, def:1}];
  }
  return c.addrs;
}
const defAddr = c => { const L = addrs(c); return L.find(a => a.def) || L[0] || null; };
const addrText = a => a ? [a.line, a.sub && (a.prov === 'กรุงเทพมหานคร' ? 'แขวง' : 'ต.') + a.sub, a.dist && (a.prov === 'กรุงเทพมหานคร' ? 'เขต' : 'อ.') + a.dist, a.prov, a.zip].filter(Boolean).join(' ') : '';
function taxInfo(c) {
  if (!c) return null;
  if (!c.tax) { const n = c.id.replace(/\D/g, '').padStart(4, '0'), biz = c.type !== 'b2c'; c.tax = {type:biz ? 'company' : 'person', name:biz ? c.name.replace(/\s*\(.*\)$/, '') : c.name, taxId:(biz ? '084555' : '184010') + n + '123'.slice(0, 13 - 6 - n.length), branch:biz ? 'สำนักงานใหญ่' : '', addrId:(defAddr(c) || {}).id}; }
  return c.tax;
}
const fmtTax = id => String(id || '').replace(/^(\d)(\d{4})(\d{5})(\d{2})(\d)$/, '$1-$2-$3-$4-$5');
const taxLine = (c, t) => { t = t || taxInfo(c); const a = addrs(c).find(x => x.id === t.addrId) || defAddr(c); return `${t.name}${t.type === 'company' ? ' (' + (t.branch || 'สำนักงานใหญ่') + ')' : ''} · เลขผู้เสียภาษี ${fmtTax(t.taxId)} · ${addrText(a)}`; };
const addrLine = a => a ? `${a.name} · ${a.tel} · ${addrText(a)}` : '';
let ckAddr = null, taxInv = false, ad = null, adCtx = null, tx = null;
const me = () => cust(S.user);
const ckAddrObj = () => addrs(me()).find(a => a.id === ckAddr) || defAddr(me());
function adBack() { const c = adCtx || {}; if (c.list) return openAddrs(c.from, c.pick); if (c.from === 'cart') return openCart(); closeLayer(); route(); }
function openAddrs(from, pick) {
  adCtx = {from, pick}; const L = addrs(me()), cur = pick ? (ckAddrObj() || {}).id : null;
  modal(`<div class="pad" style="padding:24px"><div class="row between"><h3 style="font-size:20px" class="row">${I.pin} ${pick ? 'เลือกที่อยู่จัดส่ง' : 'ที่อยู่ของฉัน'}</h3><button class="x" onclick="${from === 'cart' ? 'openCart()' : 'closeLayer()'}" aria-label="ปิด">×</button></div>
    <div class="adl">${L.map(a => `<div class="ad ${pick && cur === a.id ? 'on' : ''}" ${pick ? `onclick="ckAddr='${a.id}';openAddrs('${from}',true)"` : ''}>${pick ? '<i class="rd"></i>' : ''}
      <div class="t"><b>${esc(a.label)}</b>${a.def ? '<span class="dp">ที่อยู่หลัก</span>' : ''}<div class="small">${esc(a.name)} · ${esc(a.tel)}</div><small class="muted">${esc(addrText(a))}</small></div>
      <div class="a"><button onclick="event.stopPropagation();openAddrEdit('${a.id}',{from:'${from}',pick:${!!pick},list:1})">แก้ไข</button>${a.def ? '' : `<button onclick="event.stopPropagation();setDefAddr('${a.id}');openAddrs('${from}',${!!pick})">ตั้งเป็นหลัก</button><button class="del" onclick="event.stopPropagation();delAddr('${a.id}');openAddrs('${from}',${!!pick})">ลบ</button>`}</div></div>`).join('')}</div>
    <button class="adadd" onclick="openAddrEdit('',{from:'${from}',pick:${!!pick},list:1})">+ เพิ่มที่อยู่ใหม่</button>
    <div class="row" style="justify-content:flex-end;margin-top:16px"><button class="btn btn-o btn-sm" onclick="${from === 'cart' ? 'openCart()' : 'closeLayer();route()'}">${pick ? 'ใช้ที่อยู่นี้' : 'เสร็จ'}</button></div></div>`);
}
function openAddrEdit(id, ctx) {
  adCtx = ctx || {from:'me'}; const u = me(), a = addrs(u).find(x => x.id === id);
  ad = a ? {...a} : {id:'', label:'บ้าน', name:u.name, tel:u.phone, line:'', sub:'', dist:'', prov:'', zip:'', def:addrs(u).length ? 0 : 1};
  addrEditModal();
}
function addrEditModal() {
  const a = ad, PR = PROVS.includes(a.prov) || !a.prov ? PROVS : [a.prov, ...PROVS];
  modal(`<div class="pad" style="padding:24px"><div class="row between"><h3 style="font-size:20px" class="row">${I.pin} ${a.id ? 'แก้ไขที่อยู่' : 'เพิ่มที่อยู่ใหม่'}</h3><button class="x" onclick="adBack()" aria-label="ปิด">×</button></div>
    <div style="display:grid;gap:12px;margin-top:14px">
      <div><label class="lb">ชื่อที่อยู่</label><div class="seg3" style="width:fit-content">${['บ้าน', 'ที่ทำงาน', 'อื่น ๆ'].map(l => `<button class="${a.label === l ? 'on' : ''}" onclick="ad.label='${l}';addrEditModal()">${l}</button>`).join('')}</div></div>
      <div class="row" style="gap:10px;align-items:flex-start"><div class="grow"><label class="lb">ชื่อผู้รับ *</label><input class="input" value="${esc(a.name)}" oninput="ad.name=this.value" autocomplete="name"></div><div class="grow"><label class="lb">เบอร์โทร *</label><input class="input" value="${esc(a.tel)}" oninput="ad.tel=this.value" inputmode="tel" autocomplete="tel"></div></div>
      <div><label class="lb">บ้านเลขที่ · หมู่บ้าน / อาคาร · ซอย · ถนน *</label><input class="input" value="${esc(a.line)}" placeholder="เช่น 45/2 ถ.ศรีวิชัย" oninput="ad.line=this.value" autocomplete="street-address"></div>
      <div class="row" style="gap:10px;align-items:flex-start"><div class="grow"><label class="lb">รหัสไปรษณีย์ *</label><input class="input" value="${esc(a.zip)}" inputmode="numeric" maxlength="5" placeholder="84000" oninput="adZip(this.value)" autocomplete="postal-code"></div>
        <div class="grow"><label class="lb">จังหวัด *</label><select class="input" id="ad_prov" onchange="ad.prov=this.value"><option value="">เลือกจังหวัด</option>${PR.map(p => `<option ${a.prov === p ? 'selected' : ''}>${p}</option>`).join('')}</select></div></div>
      <small class="muted xs" id="adzh">${ZIP[a.zip] ? '✓ เติมจังหวัด / อำเภอให้แล้ว' : 'พิมพ์รหัสไปรษณีย์ 5 หลัก ระบบเติมจังหวัดให้ (ตัวอย่าง 84000 · 80000 · 90110)'}</small>
      <div class="row" style="gap:10px;align-items:flex-start"><div class="grow"><label class="lb">อำเภอ / เขต</label><input class="input" id="ad_dist" value="${esc(a.dist)}" oninput="ad.dist=this.value"></div><div class="grow"><label class="lb">ตำบล / แขวง</label><input class="input" id="ad_sub" value="${esc(a.sub)}" oninput="ad.sub=this.value"></div></div>
      <label class="row small" style="gap:8px"><input type="checkbox" ${a.def ? 'checked' : ''} onchange="ad.def=this.checked?1:0"> ตั้งเป็นที่อยู่หลัก (ใช้ตอนจัดส่งเป็นค่าเริ่มต้น)</label>
    </div>
    <div class="row" style="justify-content:flex-end;margin-top:18px"><button class="btn btn-w btn-sm" onclick="adBack()">ยกเลิก</button><button class="btn btn-o btn-sm" onclick="saveAddr()">บันทึกที่อยู่</button></div></div>`);
}
function adZip(v) {
  ad.zip = v.replace(/\D/g, '').slice(0, 5); const z = ZIP[ad.zip], h = document.getElementById('adzh');
  if (z) { ad.prov = z[0]; ad.dist = z[1]; ad.sub = ad.sub || z[2]; [['ad_prov', 'prov'], ['ad_dist', 'dist'], ['ad_sub', 'sub']].forEach(([e, k]) => { const el = document.getElementById(e); if (el) el.value = ad[k]; }); if (h) h.textContent = '✓ เติมจังหวัด / อำเภอให้แล้ว'; }
  else if (h) h.textContent = ad.zip.length === 5 ? 'ไม่พบในตัวอย่าง — กรอกจังหวัด / อำเภอเอง' : 'พิมพ์รหัสไปรษณีย์ 5 หลัก ระบบเติมจังหวัดให้ (ตัวอย่าง 84000 · 80000 · 90110)';
}
function saveAddr() {
  const tel = (ad.tel || '').replace(/\D/g, ''), e = !ad.name.trim() ? 'ใส่ชื่อผู้รับ' : tel.length < 9 || tel.length > 11 ? 'เบอร์โทรไม่ถูกต้อง' : !ad.line.trim() ? 'ใส่บ้านเลขที่ / ถนน' : !/^\d{5}$/.test(ad.zip) ? 'รหัสไปรษณีย์ต้องมี 5 หลัก' : !ad.prov ? 'เลือกจังหวัด' : '';
  if (e) { toast(e); return; }
  const L = addrs(me()); let id = ad.id;
  if (!id) { id = 'a' + Date.now().toString(36); L.push({...ad, id}); } else Object.assign(L.find(x => x.id === id), ad);
  if (ad.def || L.length === 1) L.forEach(x => x.def = x.id === id ? 1 : 0);
  if (adCtx && adCtx.pick) ckAddr = id;
  toast(ad.id ? 'บันทึกที่อยู่แล้ว' : 'เพิ่มที่อยู่แล้ว — ใช้ได้ทั้งหน้าร้านและสั่งผ่าน LINE'); ad = null; save(); adBack();
}
function delAddr(id) {
  const u = me(), L = addrs(u); if (L.length <= 1) { toast('ต้องมีที่อยู่อย่างน้อย 1 ที่'); return; }
  const was = L.find(x => x.id === id); u.addrs = L.filter(x => x.id !== id); if (was && was.def) u.addrs[0].def = 1;
  if (ckAddr === id) ckAddr = null; if (u.tax && u.tax.addrId === id) u.tax.addrId = defAddr(u).id; save(); toast('ลบที่อยู่แล้ว');
}
function setDefAddr(id) { addrs(me()).forEach(x => x.def = x.id === id ? 1 : 0); save(); toast('ตั้งเป็นที่อยู่หลักแล้ว'); }
function openTax(from) { adCtx = {from}; tx = {...taxInfo(me())}; taxModal(); }
function taxModal() {
  const t = tx, L = addrs(me());
  modal(`<div class="pad" style="padding:24px"><div class="row between"><h3 style="font-size:20px" class="row">🧾 ข้อมูลใบกำกับภาษี</h3><button class="x" onclick="adBack()" aria-label="ปิด">×</button></div>
    <div style="display:grid;gap:12px;margin-top:14px">
      <div><label class="lb">ออกในนาม</label><div class="seg3" style="width:fit-content">${[['person', 'บุคคลธรรมดา'], ['company', 'นิติบุคคล']].map(([k, n]) => `<button class="${t.type === k ? 'on' : ''}" onclick="tx.type='${k}';tx.branch=tx.type==='company'?(tx.branch||'สำนักงานใหญ่'):'';taxModal()">${n}</button>`).join('')}</div></div>
      <div><label class="lb">${t.type === 'company' ? 'ชื่อบริษัท / ร้าน *' : 'ชื่อ-นามสกุล *'}</label><input class="input" value="${esc(t.name)}" oninput="tx.name=this.value"></div>
      <div class="row" style="gap:10px;align-items:flex-start"><div class="grow"><label class="lb">เลขประจำตัวผู้เสียภาษี (13 หลัก) *</label><input class="input" value="${esc(t.taxId)}" inputmode="numeric" maxlength="17" oninput="tx.taxId=this.value"></div>
        ${t.type === 'company' ? `<div class="grow"><label class="lb">สาขา</label><input class="input" value="${esc(t.branch)}" placeholder="สำนักงานใหญ่ หรือ สาขาที่ 00001" oninput="tx.branch=this.value"></div>` : ''}</div>
      <div><label class="lb">ที่อยู่ในใบกำกับ</label><select class="input" onchange="tx.addrId=this.value">${L.map(a => `<option value="${a.id}" ${t.addrId === a.id ? 'selected' : ''}>${esc(a.label)} — ${esc(addrText(a))}</option>`).join('')}</select></div>
      <p class="muted small" style="margin:0">บันทึกครั้งเดียว — ตอนชำระเงินติ๊ก "ต้องการใบกำกับภาษี" ระบบดึงข้อมูลนี้ให้อัตโนมัติ (เว็บและ LINE)</p>
    </div>
    <div class="row" style="justify-content:flex-end;margin-top:18px"><button class="btn btn-w btn-sm" onclick="adBack()">ยกเลิก</button><button class="btn btn-o btn-sm" onclick="saveTax()">บันทึก</button></div></div>`);
}
function saveTax() {
  const id = (tx.taxId || '').replace(/\D/g, '');
  if (!tx.name.trim()) { toast(tx.type === 'company' ? 'ใส่ชื่อบริษัท / ร้าน' : 'ใส่ชื่อ-นามสกุล'); return; }
  if (id.length !== 13) { toast('เลขประจำตัวผู้เสียภาษีต้องมี 13 หลัก'); return; }
  me().tax = {...tx, taxId:id}; save(); toast('บันทึกข้อมูลใบกำกับภาษีแล้ว'); adBack();
}
function addrBox() {
  const a = ckAddrObj();
  if (!a) return `<div class="ck-addr"><span>🏠</span><div><b>ยังไม่มีที่อยู่จัดส่ง</b><small>เพิ่มครั้งเดียว ใช้ได้ทุกครั้ง</small></div><button onclick="openAddrEdit('',{from:'cart',pick:true})">+ เพิ่ม</button></div>`;
  return `<div class="ck-addr"><span>🏠</span><div><b>${esc(a.label)}</b> · ${esc(a.name)} · ${esc(a.tel)}<small>${esc(addrText(a))}</small><em>จากบัญชีสมาชิก MD${addrs(me()).length > 1 ? ' · มี ' + addrs(me()).length + ' ที่อยู่' : ''}</em></div><button onclick="openAddrs('cart',true)">เปลี่ยน</button></div>`;
}
function taxBox() {
  const t = taxInfo(me()), a = addrs(me()).find(x => x.id === t.addrId) || defAddr(me());
  return `<div class="ck-addr"><span>🧾</span><div><b>${esc(t.name)}</b>${t.type === 'company' ? ' · ' + esc(t.branch || 'สำนักงานใหญ่') : ''} · ${fmtTax(t.taxId)}<small>${esc(addrText(a))}</small></div><button onclick="openTax('cart')">แก้ไข</button></div>`;
}
function acctCard(u) {
  const t = taxInfo(u);
  return `<div class="card pad" style="margin-top:18px"><div class="row between"><h3 style="font-size:17px">ที่อยู่จัดส่ง & ใบกำกับภาษี</h3><button class="btn btn-w btn-sm" onclick="openAddrEdit('',{from:'me'})">+ เพิ่มที่อยู่</button></div>
    <div class="acl">${addrs(u).map(a => `<div class="acr"><span class="ic">${a.label === 'ที่ทำงาน' ? '🏢' : a.label === 'บ้าน' ? '🏠' : '📍'}</span><span class="f"><b>${esc(a.label)}${a.def ? ' <i class="dp">ที่อยู่หลัก</i>' : ''}</b><small>${esc(a.name)} · ${esc(a.tel)}</small><small>${esc(addrText(a))}</small></span>
      <span class="ac"><button onclick="openAddrEdit('${a.id}',{from:'me'})">แก้ไข</button>${a.def ? '' : `<button onclick="setDefAddr('${a.id}');route()">ตั้งเป็นหลัก</button><button class="del" onclick="delAddr('${a.id}');route()">ลบ</button>`}</span></div>`).join('')}
      <div class="acr"><span class="ic">🧾</span><span class="f"><b>ใบกำกับภาษี</b><small>${t.type === 'company' ? 'นิติบุคคล' : 'บุคคลธรรมดา'} · ${esc(t.name)}${t.type === 'company' ? ' · ' + esc(t.branch || 'สำนักงานใหญ่') : ''}</small><small>${fmtTax(t.taxId)}</small></span><span class="ac"><button onclick="openTax('me')">แก้ไข</button></span></div></div>
    <small class="muted xs">กรอกครั้งเดียว ใช้ได้ทั้งหน้าร้านเว็บและสั่งผ่าน LINE · หลังบ้านเห็นที่อยู่ของแต่ละออเดอร์ตามที่ลูกค้าเลือกตอนชำระเงิน</small></div>`;
}

let meTab = 'orders';
function vMe() {
  if (!S.user) return `<div class="me-wrap" style="text-align:center;padding-top:80px"><div style="margin:0 auto 14px;width:fit-content">${logo('MD MEMBER')}</div><h2>ยังไม่ได้เข้าสู่ระบบ</h2><p class="muted">เข้าสู่ระบบเพื่อดูแต้ม ระดับสมาชิก และประวัติการซื้อทุกช่องทาง</p><button class="btn btn-o" onclick="loginModal()">เข้าสู่ระบบ</button></div>`;
  const u = cust(S.user), s = st(u);
  const ti = TIERS.indexOf(s.tier), next = TIERS[ti + 1];
  const prog = next ? Math.min(100, (s.y12 - s.tier.min) / (next.min - s.tier.min) * 100) : 100;
  const cls = s.tier.k === 'Gold' ? 'gold' : s.tier.k === 'Platinum' ? 'plat' : '';
  return `<div class="me-wrap">
    <div class="row between wrap" style="margin-bottom:16px"><div><h1 style="font-size:26px">สมาชิกของฉัน</h1><span class="muted small">ข้อมูลรวมจากทุกช่องทางที่ผูกไว้</span></div><a class="btn btn-w btn-sm" href="#/store">← กลับไปหน้าร้าน</a></div>
    <div class="mcard ${cls}">
      <div class="row between"><div class="row">${mdMark(30)}<span style="font-family:var(--fd);font-weight:600;letter-spacing:.08em;font-size:13px;opacity:.85">MD MEMBER</span></div><span class="tier">${s.tier.k.toUpperCase()}</span></div>
      <div class="row between wrap" style="margin-top:26px;align-items:flex-end;gap:20px">
        <div><div class="small" style="opacity:.75">แต้มสะสม</div><div class="pts">${s.pts.toLocaleString()}</div></div>
        <div style="min-width:240px;flex:1;max-width:380px"><div class="row between small" style="opacity:.85"><span>ยอดซื้อ 12 เดือน ${baht(s.y12)}</span><span>${next ? `อีก ${baht(next.min - s.y12)} → ${next.k}` : 'ระดับสูงสุด'}</span></div>
          <div class="bar" style="background:rgba(255,255,255,.2);margin-top:6px"><i style="width:${prog}%;background:#fff"></i></div></div>
      </div>
      <div class="row between wrap small" style="margin-top:18px;opacity:.8"><span>${esc(u.name)} · ${u.id}</span><span>สมาชิกตั้งแต่ ${thd(u.joined, 1)}</span></div>
    </div>
    ${s.dueIn !== null && s.dueIn <= 7 ? `<div class="reorder">${art(P[s.last.items[0][0]])}<div class="grow"><b style="font-family:var(--fd);font-size:16px">ถึงรอบเติม ${P[s.last.items[0][0]].name.split(' ')[0]} แล้ว</b><div class="muted small">ซื้อล่าสุด ${thd(s.last.date, 1)} · คาดว่าจะหมด ${thd(s.due, 1)}</div></div><button class="btn btn-k" onclick="reorderLast();location.hash='#/store'">${I.refill} สั่งซ้ำ</button></div>` : ''}
    <div class="me-grid">
      <div class="card pad">
        <div class="row between"><h3 style="font-size:17px">แลกของรางวัล</h3><span class="muted small">มี ${s.pts} แต้ม</span></div>
        <div class="rw" style="margin-top:12px">${REWARDS.map(r => `<div class="it">${r.pid ? art(P[r.pid]) : `<div style="width:48px;height:48px;border-radius:12px;background:var(--o-lt);color:var(--o);display:grid;place-items:center">${I.tag}</div>`}<div class="grow"><div style="font-weight:600;font-size:13px">${r.name}</div><div class="small" style="color:var(--o-dk);font-weight:600">${r.pts} แต้ม</div></div><button class="btn btn-sm ${s.pts >= r.pts ? 'btn-k' : 'btn-w'}" ${s.pts >= r.pts ? '' : 'disabled'} onclick="redeem('${r.id}')">แลก</button></div>`).join('')}</div>
        <h3 style="font-size:17px;margin:20px 0 10px">สิทธิ์ระดับ ${s.tier.k}</h3>
        <div class="row wrap">${s.tier.perks.map(p => `<span class="chip o">${p}</span>`).join('')}</div>
        ${next ? `<p class="muted small" style="margin:10px 0 0">ระดับ ${next.k}: ${next.perks.join(' · ')}</p>` : ''}
      </div>
      <div class="card pad">
        <h3 style="font-size:17px">บัญชีที่เชื่อมไว้</h3><p class="muted xs" style="margin:2px 0 0">ข้อมูลของคุณมาจากช่องทางของ MD Clean Car เท่านั้น</p>
        <div style="display:grid;gap:8px;margin-top:12px">
          <div class="row between"><span class="row"><span class="chip">เบอร์โทร</span> <span class="small">${u.phone}</span></span><span class="chip ok">ยืนยัน OTP แล้ว</span></div>
          <div class="row between"><span class="row">${chChip('line')} <span class="small">${u.line ? 'เชื่อมแล้ว' : 'ยังไม่เชื่อม'}</span></span>${u.line ? '<span class="chip ok">รับแจ้งเตือน</span>' : `<button class="btn btn-line btn-sm" onclick="linkLine()">ผูก LINE +50 แต้ม</button>`}</div>
          <div class="row between"><span class="row"><span class="chip blue">Facebook</span> <span class="small">${u.fb ? 'เชื่อมแล้ว' : '—'}</span></span></div>
        </div>
        <h3 style="font-size:17px;margin:20px 0 10px">คูปองของฉัน</h3>
        ${S.myCoupons.length ? S.myCoupons.map(c => `<div class="row between" style="border:1.5px dashed var(--o-md);border-radius:12px;padding:10px 12px;margin-bottom:8px"><div><b style="font-family:var(--fd);letter-spacing:.06em">${c.code}</b><div class="muted xs">${c.name}</div></div><button class="btn btn-sm btn-w" onclick="S.code='${c.code}';save();location.hash='#/store';setTimeout(openCart,60)">ใช้</button></div>`).join('') : `<div class="row between" style="border:1.5px dashed var(--o-md);border-radius:12px;padding:10px 12px"><div><b style="font-family:var(--fd);letter-spacing:.06em">REFILL5</b><div class="muted xs">ลด 5% สั่งเติมตามรอบ</div></div><span class="chip o">ใช้ได้</span></div>`}
      </div>
    </div>
    ${acctCard(u)}
    <div class="card" style="margin-top:18px">
      <div class="ch-h"><h3>ประวัติการซื้อ (ทุกช่องทาง)</h3><span class="muted small">${s.n} คำสั่งซื้อ · ${baht(s.spend)}</span></div>
      <div class="tbl-wrap"><table class="t"><thead><tr><th>เลขที่</th><th>วันที่</th><th>ช่องทาง</th><th>สินค้า</th><th style="text-align:right">ยอด</th><th>สถานะ</th></tr></thead><tbody>
      ${[...s.os].reverse().map(o => `<tr><td class="num">${o.id}</td><td>${thd(o.date, 1)}</td><td>${chChip(o.ch)}</td><td class="small prod">${o.items.map(([p, q]) => P[p].short + (q > 1 ? ' ×' + q : '')).join(', ')}</td><td class="num" style="text-align:right">${baht(lineTotal(o))}</td><td>${stChip(o)}</td></tr>`).join('')}
      </tbody></table></div>
    </div>
  </div>`;
}
function redeem(rid) {
  const r = REWARDS.find(x => x.id === rid);
  S.redeemed[S.user] = (S.redeemed[S.user] || 0) + r.pts;
  S.myCoupons.push({code: r.code || ('GIFT' + Math.floor(100 + Math.random() * 900)), name: 'แลกแต้ม: ' + r.name});
  save(); toast(`แลก "${r.name}" แล้ว · −${r.pts} แต้ม`); route();
}

/* =========================================================
   LINE OA
   ========================================================= */
function pushLine(m) { S.lineMsgs.push({t:'flex', at: new Date().toTimeString().slice(0, 5), ...m}); save(); }
function flexHTML(m) {
  const u = cust('C-1001'), s = st(u);
  if (m.kind === 'welcome') return `<div class="flex"><div class="fh"><div class="xs" style="color:#B8F227;font-weight:600;letter-spacing:.08em">MD MEMBER</div><h4>ผูกบัญชีรับ 50 แต้ม</h4></div><div class="fb">เชื่อมบัญชีครั้งเดียว — แต้มจากเว็บและ LINE รวมกัน · เตือนเมื่อน้ำยาใกล้หมด · สั่งซ้ำได้ในแชท</div><button class="fbtn solid" onclick="linkLine()">เชื่อมบัญชีด้วย LINE</button></div>`;
  if (m.kind === 'linked') return `<div class="flex"><div class="fh o"><div class="xs" style="opacity:.85">ยินดีต้อนรับ</div><h4>ผูกบัญชีสำเร็จ +50 แต้ม</h4></div><div class="fb">รวมประวัติการซื้อจากเว็บเรียบร้อย · ตอนนี้คุณเป็นสมาชิกระดับ <b>${s.tier.k}</b></div></div>`;
  if (m.kind === 'card') return `<div class="flex"><div class="fh ${s.tier.k === 'Gold' ? '' : 'o'}"><div class="row between"><span style="font-family:Kanit;font-style:italic;font-weight:800">${s.tier.k.toUpperCase()}</span>${mdMark(22)}</div><div style="font-family:Kanit;font-size:30px;font-weight:700;margin-top:6px">${s.pts.toLocaleString()} <span style="font-size:13px;font-weight:400">แต้ม</span></div></div><div class="fb small">${esc(u.name)} · ${u.id}<br>ยอดซื้อ 12 เดือน ${baht(s.y12)}</div><a class="fbtn" href="#/me">แลกของรางวัล</a></div>`;
  if (m.kind === 'refill') { const pid = s.last ? s.last.items[0][0] : 'p1'; const tot = s.last ? s.last.items.reduce((t, [p, q]) => t + P[p].price * q, 0) * 0.95 : P.p1.price * 0.95; return `<div class="flex"><div class="fh n"><div class="xs" style="color:#B8F227;font-weight:600">ถึงรอบเติมแล้ว</div><h4>${P[pid].short} ใกล้หมดหรือยัง?</h4></div><div class="fb"><div class="ph-wrap">${art(P[pid])}</div>${s.last ? s.last.items.map(([p, q]) => P[p].short + ' ×' + q).join(' · ') : ''}<div class="muted xs">ซื้อล่าสุด ${s.last ? thd(s.last.date, 1) : '-'} · ลด 5% ด้วย REFILL5</div></div><button class="fbtn solid" onclick="lineReorder()">สั่งซ้ำ 1 คลิก · ${baht(tot)}</button></div>`; }
  if (m.kind === 'howto') return `<div class="flex"><div class="fh o"><h4>วิธีใช้นีออนให้คุ้ม</h4></div><div class="fb small">1. ล้างฝุ่นออกด้วยน้ำเปล่าก่อน<br>2. ฉีดนีออนบริเวณคราบ ทิ้งไว้สักครู่ อย่าปล่อยให้แห้ง<br>3. ใช้แปรงขัดคราบฝัง แล้วล้างน้ำออก<br>4. ล้างต่อด้วยโฟม แล้วเคลือบสีปิดท้าย<br><span class="muted xs">อัตราส่วนผสมดูตามฉลากสินค้า</span></div><a class="fbtn" href="#/store">ดูสินค้าที่ใช้คู่กัน</a></div>`;
  if (m.kind === 'track') { const o = [...s.os].reverse()[0]; return `<div class="flex"><div class="fh"><div class="xs" style="opacity:.8">คำสั่งซื้อล่าสุด</div><h4>${o ? o.id : '-'}</h4></div><div class="fb small">${o ? `${thd(o.date, 1)} · ${CH[o.ch][0]}<br>${o.items.map(([p, q]) => P[p].short + ' ×' + q).join(', ')}<br><b>สถานะ: ${o.status === 'สำเร็จ' ? 'จัดส่งสำเร็จ' : 'กำลังเตรียมจัดส่ง · Flash Express'}</b>` : 'ยังไม่มีคำสั่งซื้อ'}</div></div>`; }
  if (m.kind === 'b2b') return `<div class="flex"><div class="fh"><div class="xs" style="color:#B8F227;font-weight:600">B2B</div><h4>ตัวแทน · คาร์แคร์ · OEM</h4></div><div class="fb small">ส่วนลดตัวแทนสูงสุด 40% · รับผลิตน้ำยาแบรนด์ของคุณเอง · ทีมขายติดต่อกลับใน 24 ชม.</div><button class="fbtn solid" onclick="location.hash='#/store';setTimeout(()=>leadForm('dealer'),80)">กรอกข้อมูลสมัคร</button></div>`;
  if (m.type === 'order') return `<div class="flex"><div class="fh o"><div class="xs" style="opacity:.85">ชำระเงินสำเร็จ</div><h4>${m.oid} · ${baht(m.total)}</h4></div><div class="fb small">${m.items.map(([p, q]) => P[p].short + ' ×' + q).join('<br>')}<br><b style="color:var(--o-dk)">+${m.pts} แต้ม</b> · จะแจ้งเลขพัสดุเมื่อจัดส่ง</div><a class="fbtn" href="#/me">ดูคำสั่งซื้อ</a></div>`;
  if (m.type === 'campaign') return `<div class="flex"><div class="fh ${m.tpl === 'refill' ? 'n' : m.tpl === 'new' ? '' : 'o'}"><div class="xs" style="font-weight:600;color:#B8F227">แคมเปญจากหลังบ้าน</div><h4>${esc(m.title)}</h4></div><div class="fb">${({refill:'p1', new:'p16', promo:'p5'})[m.tpl] ? `<div class="ph-wrap">${art(P[({refill:'p1', new:'p16', promo:'p5'})[m.tpl]])}</div>` : ''}${esc(m.msg).replace('{ชื่อ}', u.name.split(' ')[0])}${m.code ? `<div class="code">${m.code}</div>` : ''}</div><a class="fbtn solid" href="#/store">${m.tpl === 'review' ? 'ให้คะแนน' : 'ช้อปเลย'}</a><div class="xs muted" style="text-align:center;padding:6px">หยุดรับข้อความโปรโมชัน</div></div>`;
  return '';
}
function lineReorder() {
  if (!S.user) S.user = 'C-1001';
  const u = cust(S.user), s = st(u);
  const items = s.last.items.map(([p, q]) => [p, q]);
  const sub = items.reduce((t, [p, q]) => t + P[p].price * q, 0), off = Math.round(sub * .05), ship = sub - off >= 500 ? 0 : 50;
  const o = {id:'MD-' + (2400 + S.orders.length + 1), cid:u.id, date:iso(TODAY), ch:'line', items, status:'ชำระแล้ว', off, ship, code:'REFILL5', addr:addrLine(defAddr(u)), dist:(defAddr(u) || {}).dist, prov:(defAddr(u) || {}).prov, tax:null};
  S.orders.push(o);
  items.forEach(([p, q]) => S.stock[p] = Math.max(0, (S.stock[p] || 0) - q));
  S.lineMsgs.push({t:'me', text:'สั่งซ้ำ', at:new Date().toTimeString().slice(0, 5)});
  pushLine({type:'order', oid:o.id, total:sub - off + ship, pts:Math.floor((sub - off) / 25), items});
  route(); toast('สั่งซ้ำผ่าน LINE สำเร็จ · คำสั่งซื้อเข้าหลังบ้านแล้ว');
}
function richTap(k) {
  const labels = {refill:'สั่งซ้ำ', card:'แต้มของฉัน', howto:'วิธีใช้สินค้า', track:'ติดตามพัสดุ', b2b:'สมัครตัวแทน / OEM', admin:'คุยกับแอดมิน'};
  const at = new Date().toTimeString().slice(0, 5);
  S.lineMsgs.push({t:'me', text:labels[k], at});
  const u = cust('C-1001');
  if (!u.line && k !== 'b2b' && k !== 'howto' && k !== 'admin') S.lineMsgs.push({t:'flex', kind:'welcome', at});
  else if (k === 'admin') { S.lineMsgs.push({t:'bot', text:'สวัสดีค่ะ แอดมิน MD Clean Car ยินดีให้บริการ 08:00–20:00 น. พิมพ์คำถามได้เลยค่ะ 😊', at}); let th = S.chats.find(x => x.cid === 'C-1001'); if (!th) { th = {id:'t' + Date.now(), cid:'C-1001', name:u.name, ch:'line', unread:0, owner:null, closed:false, note:'', msgs:[]}; S.chats.unshift(th); } th.closed = false; th.unread++; th.msgs.push({me:false, t:'ขอคุยกับแอดมินครับ', at}); }
  else S.lineMsgs.push({t:'flex', kind:k, at});
  save(); renderChat();
}
function renderChat() {
  const el = document.getElementById('lchat'); if (!el) return;
  const msgs = S.lineMsgs.length ? S.lineMsgs : [{t:'flex', kind:'welcome', at:'09:40'}];
  el.innerHTML = `<div style="text-align:center"><span class="chip" style="background:rgba(0,0,0,.18);color:#fff">วันนี้</span></div>` + msgs.map(m => m.t === 'me'
    ? `<div class="lmsg me"><span class="tm">${m.at}</span><div class="bub">${esc(m.text)}</div></div>`
    : `<div class="lmsg"><div class="lav" style="width:30px;height:30px;border-radius:50%;background:#111316;display:grid;place-items:center;flex:none">${mdMark(20)}</div>${m.t === 'bot' ? `<div class="bub">${esc(m.text)}</div>` : flexHTML(m)}<span class="tm">${m.at}</span></div>`).join('');
  el.scrollTop = el.scrollHeight;
}
function vLine() {
  const btn = (k, ic, t, sub, c) => `<button onclick="richTap('${k}')"><span class="ri" style="background:${c}">${ic}</span>${t}<small>${sub}</small></button>`;
  const camps = S.lineMsgs.filter(m => m.type === 'campaign').length;
  return `<div class="line-page">
    <div class="phone">
      <div class="lhead"><span style="font-size:20px">‹</span><div class="lav">${mdMark(26)}</div><div class="grow"><b>MD Clean Car</b> <span style="color:var(--line)">●</span><div class="xs muted">@mdcleancar · บัญชีทางการ</div></div><span class="muted">☰</span></div>
      <div class="lchat" id="lchat"></div>
      <div class="rich">
        ${btn('refill', I.refill, 'สั่งซ้ำ 1 คลิก', 'ตามรอบที่ใช้', '#3D5400')}
        ${btn('card', I.crown, 'แต้มของฉัน', 'บัตรสมาชิก', '#F2621F')}
        ${btn('howto', I.star, 'วิธีใช้สินค้า', 'ใช้ให้คุ้ม · ถามได้', '#2C3036')}
        ${btn('track', I.box, 'ติดตามพัสดุ', 'สถานะ · เลขพัสดุ', '#2C3036')}
        ${btn('b2b', I.handshake, 'ตัวแทน / OEM', 'สมัคร · ราคาส่ง', '#8A6100')}
        ${btn('admin', I.chat, 'คุยกับแอดมิน', '08:00–20:00', '#06C755')}
      </div>
      <div class="lfoot">⌨ <span class="grow" style="text-align:center">เมนู MD Clean Car ▾</span></div>
    </div>
    <div class="line-side">
      <div class="card pad">
        <h3 style="font-size:17px">LINE OA @mdcleancar (จำลอง)</h3>
        <p class="muted small">ทุกการ์ดเป็น Flex Message ที่ดึงข้อมูลจาก CRM ของ demo: แต้มและระดับจากหน้าสมาชิก · รอบเติมน้ำยาจากประวัติซื้อ · คำสั่งซื้อที่สั่งในแชทเข้าหลังบ้านทันที · แคมเปญที่ยิงจากหลังบ้านจะเด้งเข้าที่นี่</p>
        <div class="row wrap" style="gap:6px;margin:12px 0">
          <span class="chip ${cust('C-1001').line ? 'ok' : 'warn'}">${cust('C-1001').line ? 'เอกชัย ผูก LINE แล้ว' : 'เอกชัย ยังไม่ผูก LINE'}</span>
          <span class="chip">ข้อความแคมเปญ ${camps}</span>
        </div>
        <div style="display:grid;gap:8px">
          <a class="btn btn-w btn-sm" href="#/admin/campaigns/new">ยิงแคมเปญจากหลังบ้าน →</a>
          <a class="btn btn-w btn-sm" href="#/admin/automation">ดูออโตเมชันที่ส่งการ์ดเหล่านี้ →</a>
          <button class="btn btn-w btn-sm" onclick="S.lineMsgs=[];save();renderChat()">ล้างแชท</button>
        </div>
        <p class="muted xs" style="margin:12px 0 0">ค่าข้อความ LINE OA แบรนด์จ่ายตรงกับ LINE ตามแพ็กเกจ · ข้อความตอบกลับเมื่อผู้ใช้กดเมนู (reply) ไม่นับโควตา</p>
      </div>
    </div>
  </div>`;
}

/* =========================================================
   ADMIN
   ========================================================= */
const ANAV = [
  ['', 'ภาพรวม', I.dash],
  ['h', 'ลูกค้า (CRM)'],
  ['customers', 'ลูกค้า', I.user, '', ['tiers']],
  ['segments', 'กลุ่มลูกค้า', I.seg],
  ['h', 'ร้านค้า'],
  ['products', 'สินค้า', I.bag],
  ['inventory', 'คลังสินค้า', I.inv, 'low'],
  ['orders', 'คำสั่งซื้อ', I.box, '', ['views:order']],
  ['delivery', 'การจัดส่ง', I.ship, 'pack', ['views:shipment']],
  ['chat', 'แชท', I.msg, 'unread'],
  ['h', 'การตลาด'],
  ['promos', 'ส่วนลด & โปรโมชัน', I.tag],
  ['campaigns', 'แคมเปญ', I.mega, 'plus', ['automation']],
  ['sponsor', 'สินค้าแนะนำจากสปอนเซอร์', I.spon, 'plus'],
  ['h', 'ขายส่ง (B2B)'],
  ['dealers', 'ตัวแทน & คาร์แคร์', I.handshake, 'plus'],
  ['h', 'ตั้งค่า'],
  ['billing', 'แพ็กเกจ & ค่าบริการ', I.bill],
];
const ROLES = {admin:['แอดมิน MD', 'super-admin · เห็นทุกช่องทาง'], mkt:['ทีมการตลาด', 'marketing · ลูกค้า แคมเปญ โปรโมชัน'], sales:['เซลส์ภาคใต้', 'sales · ตัวแทนในพื้นที่ที่ดูแล']};
function vAdmin(sub, qs) {
  if (sub[0] === 'billing' && !SHOW_PRICING) { sub = []; history.replaceState(null, '', '#/admin'); }
  const page = sub[0] || '';
  const titles = {'':'ภาพรวม', customers:'ลูกค้า', segments:'กลุ่มลูกค้า', tiers:'ลูกค้า <span>/</span> ระดับสมาชิก & แต้ม', products:'สินค้า', inventory:'คลังสินค้า', orders:'คำสั่งซื้อ', views:qs.get('obj') === 'shipment' ? 'การจัดส่ง <span>/</span> View engine' : 'คำสั่งซื้อ <span>/</span> View engine', delivery:'การจัดส่ง', chat:'แชท', campaigns:'แคมเปญ', automation:'แคมเปญ <span>/</span> ออโตเมชัน', promos:'ส่วนลด & โปรโมชัน', sponsor:'สินค้าแนะนำจากสปอนเซอร์', dealers:'ตัวแทน & คาร์แคร์', billing:'แพ็กเกจ & ค่าบริการ'};
  const badges = {leads: S.leads.filter(l => l.status === 'ใหม่').length, low: PRODUCTS.filter(p => (S.stock[p.id] || 0) <= LOW).length, pack: shipList().filter(x => x.dstat === 'รอแพ็ก').length, unread: S.chats.reduce((t, c) => t + (c.closed ? 0 : c.unread), 0)};
  const body = {'':aDash, customers:aCustomers, segments:aSegments, tiers:aTiers, products:aProducts, inventory:aInventory, orders:aOrders, views:aViews, delivery:aDelivery, chat:aChat, campaigns: sub[1] === 'new' ? aCampNew : aCampaigns, automation:aAuto, promos:aPromos, sponsor:aSponsor, dealers:aDealers, billing:aBilling}[page] || aDash;
  const role = ROLES[S.role] || ROLES.admin;
  const pkey = page === 'views' ? 'views:' + (qs.get('obj') || 'order') : page;
  const gated = {campaigns:'campaigns', automation:'campaigns', dealers:'dealers'}[page];
  return `<div class="adm">
    <aside class="side">
      <div class="side-brand">${logo('Back-office · MD Clean')}<button class="plan ${isPlus() ? '' : 'basic'}" onclick="planModal()" title="ดูโมดูลในแต่ละแพ็ก / สลับแพ็ก (demo)">${S.plan}</button></div>
      ${ANAV.filter(n => SHOW_PRICING || (n[0] !== 'billing' && n[1] !== 'ตั้งค่า')).map(n => n[0] === 'h' ? `<h6>${n[1]}</h6>` : `<a href="#/admin${n[0] ? '/' + n[0] : ''}" class="${page === n[0] || (n[4] || []).includes(pkey) ? 'on' : ''} ${n[3] === 'plus' && !isPlus() ? 'locked' : ''}">${n[2]} <span class="lbl">${n[1]}</span>${n[3] === 'plus' ? `<span class="pl">${isPlus() ? '' : I.lock}PLUS</span>` : n[3] && badges[n[3]] ? `<span class="bd">${badges[n[3]]}</span>` : ''}</a>`).join('')}
      <div class="who-box"><div class="row"><div class="av" style="background:#F2621F">${role[0][0]}</div><div class="grow"><div style="color:#fff;font-weight:600;font-size:13px">${role[0]}</div><div class="xs" style="color:#8B9099">${role[1]}</div></div></div>
        <select class="role-sel" onchange="S.role=this.value;save();route();toast('demo: สลับบทบาท · ระบบจริงจำกัดเมนูและข้อมูลตามสิทธิ์')">${Object.entries(ROLES).map(([k, v]) => `<option value="${k}" ${S.role === k ? 'selected' : ''}>${v[0]}</option>`).join('')}</select></div>
    </aside>
    <div class="amain">
      <div class="atop"><span class="crumb">${page ? `<span>หลังบ้าน /</span> ` : ''}${titles[page]}${sub[1] === 'new' ? ' <span>/</span> สร้างแคมเปญ' : ''}</span><span style="flex:1"></span>
        <span class="chip">ข้อมูล ณ ${thd(TODAY, 1)}</span><a class="btn btn-w btn-sm" href="#/store">ดูหน้าร้าน ↗</a></div>
      <div class="abody">${gated && !isPlus() ? plusGate(gated) : body(qs)}</div>
    </div>
  </div>`;
}

/* --- shared admin helpers --- */
const LOW = 15;
const subTabs = (items, active) => `<div class="tabs subtabs">${items.map(([h, t]) => `<a href="#/admin/${h}" class="${h === active ? 'on' : ''}">${t}</a>`).join('')}</div>`;
const thumb = (p, s = 44) => `<div class="pthumb" style="width:${s}px;height:${s}px">${art(p)}</div>`;
const SKU = id => 'MD-' + String(id).replace(/^p/, '').padStart(4, '0');

/* --- plan (Basic / Plus) · same rules as Grandprix --- */
// platform pricing is hidden for now: no billing menu, no package prices anywhere (flip to true to bring it back)
const SHOW_PRICING = false;
const PLAN_M = {Basic:5000, Plus:9900};
const PLAN_Y = v => PLAN_M[v] * 12;
const CYEAR = {start:'1 พ.ย. 2025', end:'31 ต.ค. 2026', renew:'1 พ.ย. 2026', left:1};
const isPlus = () => S.plan === 'Plus';
const PLUS_INFO = {
  campaigns:['แคมเปญ (LINE OA + SMS + อีเมล)', 'ยิงข้อความถึงกลุ่มลูกค้าทาง LINE OA · SMS · อีเมล จากเทมเพลตสำเร็จรูป · ออกแบบอีเมลด้วยตัวออกแบบ EDM · เห็นค่าส่งก่อนยิง · วัดผลถึงยอดขาย', ['เทมเพลต LINE 4 แบบ + อีเมล 4 แบบ', 'ตัวออกแบบอีเมล (EDM) แบบบล็อก · ดูตัวอย่างมือถือ', 'ออโตเมชัน: เตือนเติมน้ำยาตามรอบ · ต้อนรับ · ขอรีวิว', 'ประเมินค่าส่งก่อนยิง · ตัดคนไม่ยินยอมอัตโนมัติ', 'funnel ส่ง → เปิด → คลิก → ยอดขาย']],
  sponsor:['สินค้าแนะนำจากสปอนเซอร์', 'นำสินค้าแบรนด์พาร์ทเนอร์ที่ใช้คู่กับน้ำยา MD มาแสดงในหน้าร้าน แล้วพาลูกค้าไปซื้อที่ร้านพาร์ทเนอร์ · เก็บเงินแบบ CPC / CPS', ['เพิ่มสปอนเซอร์และสินค้าแนะนำ', 'CPC ตั้งงบรายเดือน หยุดเองเมื่อครบงบ', 'CPS ติดสคริปต์ส่งยอดขายกลับ', 'สรุปรายได้รายเดือน']],
  dealers:['ตัวแทน & คาร์แคร์ (B2B)', 'จัดการลูกค้าธุรกิจ · ระดับราคาตัวแทน · เป้า vs ยอดจริง · ลีดสมัครตัวแทน / รับผลิต OEM', ['ระดับตัวแทน Dealer / Dealer Pro / Distributor', 'เป้ายอดรายเดือน + แนวโน้ม 60 วัน', 'อนุมัติลีด / เพิ่มลูกค้าธุรกิจเอง', 'รับลีดจากหน้าร้านและ LINE']],
};
function plusGate(k) {
  const [n, d, pts] = PLUS_INFO[k];
  return `<div class="ph-h"><div><h1>${n} <span class="chip k" style="font-style:normal;vertical-align:middle">PLUS</span></h1><span class="muted">อยู่ในแพ็ก Plus — แบรนด์นี้ใช้แพ็ก ${S.plan}</span></div></div>
  <div class="card pad gate"><div class="gic">${I.lock}</div><h2>${n}</h2><p class="muted">${d}</p><ul>${pts.map(x => `<li>✓ ${x}</li>`).join('')}</ul>
    <div class="row wrap" style="justify-content:center"><button class="btn btn-o" onclick="setPlan('Plus')">อัปเกรดเป็น Plus (demo)</button>${SHOW_PRICING ? '<a class="btn btn-w" href="#/admin/billing">เทียบแพ็ก Basic / Plus</a>' : '<button class="btn btn-w" onclick="planModal()">เทียบแพ็ก Basic / Plus</button>'}</div>
    <p class="muted xs" style="margin:14px 0 0">${SHOW_PRICING ? `Plus ${baht(PLAN_Y('Plus'))}/ปี (เฉลี่ย ${baht(PLAN_M.Plus)}/เดือน) · อัปเกรดกลางปีจ่ายส่วนต่างตามเดือนที่เหลือ · ลดกลับเป็น Basic กลางปี ปีนั้นยังคิด Plus ไม่คืนเงิน` : 'demo: กดอัปเกรดแล้วเมนู Plus เปิดทันที · สลับกลับเป็น Basic ได้ที่ป้ายแพ็กมุมซ้ายบน'}</p></div>`;
}
function planModal() {
  const col = (v, mods, inc) => `<div class="pmc ${S.plan === v ? 'on' : ''}"><div class="row between"><h3 style="font-size:18px">${v}</h3>${S.plan === v ? '<span class="chip ok">ใช้อยู่</span>' : `<button class="btn btn-o btn-sm" onclick="setPlan('${v}')">เปลี่ยนเป็น ${v}</button>`}</div>
    ${inc ? `<div class="muted xs" style="margin-top:6px">${inc}</div>` : ''}<ul>${mods.map(([n, d]) => `<li><b>${n}</b><small>${d}</small></li>`).join('')}</ul></div>`;
  modal(`<div class="pad" style="padding:24px"><div class="row between"><h3 style="font-size:20px">แพ็ก Basic / Plus</h3><button class="x" onclick="closeLayer()" aria-label="ปิด">×</button></div>
    <p class="muted small" style="margin:4px 0 14px">โมดูลที่อยู่ในแต่ละแพ็ก · demo สลับแพ็กได้ทันทีเพื่อดูเมนูที่เปิด/ล็อก</p>
    <div class="pm2">${col('Basic', BASIC_MODS)}${col('Plus', PLUS_MODS, 'ทุกอย่างใน Basic และเพิ่ม')}</div></div>`);
}
function setPlan(v) {
  if (!SHOW_PRICING) { S.plan = v; S.planUp = S.planDown = false; save(); closeLayer(); route(); toast(v === 'Plus' ? 'เปลี่ยนเป็นแพ็ก Plus แล้ว · เมนู Plus เปิดทันที (demo)' : 'เปลี่ยนเป็นแพ็ก Basic แล้ว (demo)'); return; }
  if (v === 'Plus') {
    if (S.planDown) { S.planDown = false; save(); route(); toast('ยกเลิกการลดแพ็กแล้ว — ใช้ Plus ต่อ'); return; }
    if (S.plan !== 'Plus') { S.plan = 'Plus'; S.planUp = true; save(); route(); toast(`อัปเกรดเป็น Plus แล้ว · จ่ายส่วนต่าง ${baht((PLAN_M.Plus - PLAN_M.Basic) * CYEAR.left)} (${CYEAR.left} เดือนที่เหลือ) · เมนู Plus เปิดทันที`); }
  } else {
    if (S.planUp) { S.plan = 'Basic'; S.planUp = false; save(); route(); toast('ยกเลิกการอัปเกรด — กลับเป็น Basic (demo)'); return; }
    S.planDown = true; save(); route(); toast(`ตั้งลดเป็น Basic ตอนต่ออายุ ${CYEAR.renew} · ใช้ Plus ได้ถึง ${CYEAR.end} (ปีนี้ยังคิด Plus เต็มปี ไม่คืนเงิน)`);
  }
}

/* --- categories (config) --- */
function applyCats() {
  CATS.splice(0, CATS.length, ['all', 'ทั้งหมด'], ...S.cats.map(c => [c[0], c[1]]));
  if (!CATS.find(c => c[0] === S.cat)) S.cat = 'all';
}
const catName = k => (CATS.find(c => c[0] === k) || ['', 'ไม่มีหมวด'])[1];
let catDraft = '';
function catModal() {
  modal(`<div class="pad" style="padding:22px">
    <div class="row between"><h3 style="font-size:19px">จัดการหมวดหมู่สินค้า</h3><button class="x" onclick="closeLayer()" aria-label="ปิด">×</button></div>
    <p class="muted small" style="margin:4px 0 14px">หมวดหมู่ใช้ทั้งเมนูหน้าร้าน ตัวกรองหลังบ้าน และตัวสร้างกลุ่มลูกค้า · เปลี่ยนชื่อได้ทันที · ลบได้เมื่อไม่มีสินค้าในหมวด</p>
    <div class="catlist">${S.cats.map((c, i) => { const n = PRODUCTS.filter(p => p.cat === c[0]).length; return `<div class="catrow"><span class="hd">⋮⋮</span><input class="input sm" value="${esc(c[1])}" onchange="S.cats[${i}][1]=this.value.trim()||S.cats[${i}][1];save();applyCats();catModal();route()"><span class="chip">${n} สินค้า</span><button class="btn btn-w btn-sm" onclick="catMove(${i},-1)" ${i ? '' : 'disabled'} aria-label="เลื่อนขึ้น">↑</button><button class="btn btn-w btn-sm" onclick="catMove(${i},1)" ${i < S.cats.length - 1 ? '' : 'disabled'} aria-label="เลื่อนลง">↓</button><button class="btn btn-w btn-sm" ${n ? `disabled title="ย้ายสินค้าออกจากหมวดนี้ก่อน"` : ''} onclick="catDel(${i})" aria-label="ลบ">✕</button></div>`; }).join('')}</div>
    <div class="row" style="margin-top:12px"><input class="input" id="catNew" placeholder="ชื่อหมวดใหม่ เช่น อุปกรณ์ล้างรถ" value="${esc(catDraft)}" oninput="catDraft=this.value" onkeydown="if(event.key==='Enter')catAdd()"><button class="btn btn-k" onclick="catAdd()">+ เพิ่มหมวด</button></div>
    <p class="muted xs" style="margin:12px 0 0">ย้ายสินค้าเข้าหมวดได้ที่หน้าคลังสินค้า (คอลัมน์หมวดหมู่) หรือในฟอร์มสินค้า</p></div>`);
}
function catAdd() { const n = (document.getElementById('catNew').value || '').trim(); if (!n) return; S.cats.push(['c' + Date.now().toString(36), n]); catDraft = ''; save(); applyCats(); catModal(); route(); toast(`เพิ่มหมวด "${esc(n)}" แล้ว · แสดงในเมนูหน้าร้าน`); }
function catDel(i) { const n = S.cats[i][1]; S.cats.splice(i, 1); save(); applyCats(); catModal(); route(); toast(`ลบหมวด "${esc(n)}" แล้ว`); }
function catMove(i, d) { const j = i + d; if (j < 0 || j >= S.cats.length) return; [S.cats[i], S.cats[j]] = [S.cats[j], S.cats[i]]; save(); applyCats(); catModal(); route(); }

/* --- products (Grandprix structure) --- */
const PST = {published:['เปิดขาย', 'ok'], hidden:['ปิดขาย', 'bad'], draft:['ฉบับร่าง', ''], pending:['รออนุมัติ', 'warn']};
const pstChip = k => `<span class="chip ${PST[k][1]}">${PST[k][0]}</span>`;
const PCH = {web:'เว็บ', line:'LINE', dealer:'ตัวแทน'};
let prodF = {q:'', cat:'', st:''};
function setProd(id, patch) { S.prodOv[id] = Object.assign(S.prodOv[id] || {}, patch); Object.assign(P[id], patch); save(); }
const soldOf = id => S.orders.filter(o => !['ยกเลิก'].includes(o.status)).reduce((a, o) => a + o.items.filter((it, i) => it[0] === id && !(o.refund && o.refund.lines.includes(i))).reduce((b, it) => b + it[1], 0), 0);
function reqChange(id, patch, note) {
  if (S.role !== 'admin') { setProd(id, {pend:patch, pendNote:note}); toast('ส่งคำขอแล้ว รอแอดมิน MD อนุมัติ'); }
  else { setProd(id, patch); toast('บันทึกแล้ว — หน้าร้านอัปเดตทันที'); }
  route();
}
function editPrice(id, v) { const p = P[id], n = Math.max(0, Math.round(+v || 0)); if (n === p.price) return; reqChange(id, {price:n}, `ขอเปลี่ยนราคา ${baht(p.price)} → ${baht(n)}`); }
function editCycle(id, v) { setProd(id, {cycle:Math.max(0, Math.round(+v || 0))}); toast('อัปเดตรอบใช้งานแล้ว · ใช้คำนวณเตือนเติมน้ำยา'); route(); }
function editStock(id, d) { S.stock[id] = Math.max(0, (S.stock[id] || 0) + d); save(); route(); }
function toggleStatus(id) { const p = P[id], nx = (p.status || 'published') === 'published' ? 'hidden' : 'published'; reqChange(id, {status:nx}, 'ขอ' + (nx === 'hidden' ? 'ปิด' : 'เปิด') + 'ขายสินค้า'); }
function approveProd(id) { const p = P[id]; setProd(id, {...(p.pend || {}), pend:null, pendNote:null}); toast('อนุมัติแล้ว — มีผลกับหน้าร้านทันที'); route(); }
function rejectProd(id) { setProd(id, {pend:null, pendNote:null}); toast('ปฏิเสธคำขอแล้ว'); route(); }
function chanModal(id) {
  const p = P[id], cur = p.chans || ['web', 'line', 'dealer'];
  modal(`<div class="pad" style="padding:22px"><div class="row between"><h3 style="font-size:19px">ช่องทางที่ขาย · ${esc(p.short)}</h3><button class="x" onclick="closeLayer()" aria-label="ปิด">×</button></div>
    <div style="display:grid;gap:8px;margin-top:14px">${Object.entries(PCH).map(([k, t]) => `<label class="ck2"><input type="checkbox" value="${k}" ${cur.includes(k) ? 'checked' : ''}> ${t}${k === 'dealer' ? ' <span class="muted xs">(แสดงในพอร์ทัลตัวแทน ราคาส่ง)</span>' : ''}</label>`).join('')}</div>
    <div class="row" style="justify-content:flex-end;margin-top:16px"><button class="btn btn-w btn-sm" onclick="closeLayer()">ยกเลิก</button><button class="btn btn-o btn-sm" onclick="const v=[...document.querySelectorAll('.ck2 input:checked')].map(x=>x.value);if(!v.length){toast('ต้องมีอย่างน้อย 1 ช่องทาง');return}setProd('${id}',{chans:v});closeLayer();route();toast('อัปเดตช่องทางที่ขายแล้ว')">บันทึก</button></div></div>`);
}
let cfg = null;
function openCfg(id) { const p = P[id]; cfg = {id, on:!!p.opt, name:p.optName || 'ขนาด', vals:p.opt ? [...p.opt] : ['1 ลิตร', '5 ลิตร']}; cfgModal(); }
function cfgModal() {
  const p = P[cfg.id];
  modal(`<div class="pad" style="padding:22px"><div class="row between"><h3 style="font-size:19px">⚙︎ ตั้งค่าตัวเลือก · ${esc(p.short)}</h3><button class="x" onclick="closeLayer()" aria-label="ปิด">×</button></div>
    <label class="tgl ${cfg.on ? 'on' : ''}" onclick="cfg.on=!cfg.on;cfgModal()"><i></i>สินค้ามีตัวเลือก (ขนาด / กลิ่น / สูตร) — ลูกค้าต้องเลือกก่อนใส่ตะกร้า</label>
    ${cfg.on ? `<label class="lb" style="margin-top:12px">ชื่อตัวเลือก</label><select class="input" onchange="cfg.name=this.value">${['ขนาด', 'กลิ่น', 'สูตร', 'สี'].map(o => `<option ${cfg.name === o ? 'selected' : ''}>${o}</option>`).join('')}</select>
      <label class="lb" style="margin-top:12px">ค่าตัวเลือก</label><div class="row wrap" style="gap:6px">${cfg.vals.map(v => `<span class="chip vchip">${esc(v)} <button onclick="cfg.vals=cfg.vals.filter(x=>x!=='${esc(v)}');cfgModal()" aria-label="ลบ">×</button></span>`).join('') || '<span class="muted small">ยังไม่มีค่า</span>'}</div>
      <div class="row" style="margin-top:8px"><input class="input" id="cfgv" placeholder="พิมพ์แล้วกด Enter เช่น 20 ลิตร" onkeydown="if(event.key==='Enter'&&this.value.trim()){cfg.vals.includes(this.value.trim())||cfg.vals.push(this.value.trim());cfgModal();setTimeout(()=>document.getElementById('cfgv').focus(),30)}"></div>` : ''}
    <p class="muted xs" style="margin:12px 0 0">ระบบจริง: แต่ละตัวเลือกมีสต็อกและราคาของตัวเอง (demo นับรวมต่อสินค้า)</p>
    <div class="row" style="justify-content:flex-end;margin-top:16px"><button class="btn btn-w btn-sm" onclick="closeLayer()">ยกเลิก</button><button class="btn btn-o btn-sm" onclick="cfgSave()">บันทึก</button></div></div>`);
}
function cfgSave() { if (cfg.on && !cfg.vals.length) { toast('ใส่ตัวเลือกอย่างน้อย 1 ค่า'); return; } setProd(cfg.id, cfg.on ? {opt:[...cfg.vals], optName:cfg.name} : {opt:null, optName:null}); closeLayer(); route(); toast('บันทึกตัวเลือกแล้ว — หน้าร้านอัปเดตทันที'); }
let np = null;
const NP_IMG = ['p1', 'p3', 'p17', 'p7'];
function openNewProd() { np = {name:'', desc:'', cat:S.cats[0][0], chans:['web', 'line', 'dealer'], price:'', cmp:'', cycle:45, stock:30, optOn:false, optName:'ขนาด', vals:['1 ลิตร', '5 ลิตร'], vst:{}, img:null, weight:1200}; npModal(); }
function npImg(f) { if (!f) return; const r = new FileReader(); r.onload = () => { const im = new Image(); im.onload = () => { const c = document.createElement('canvas'), k = Math.min(1, 480 / Math.max(im.width, im.height)); c.width = im.width * k; c.height = im.height * k; c.getContext('2d').drawImage(im, 0, 0, c.width, c.height); np.img = c.toDataURL('image/jpeg', .8); npModal(); }; im.src = r.result; }; r.readAsDataURL(f); }
const npTotal = () => np.optOn ? np.vals.reduce((a, v) => a + (+np.vst[v] || 0), 0) : (+np.stock || 0);
function npCard() { return `<div class="pc npc"><div class="ph">${np.img ? `<span class="pimg has"><img class="ld" src="${np.img}" alt=""></span>` : `<span class="muted small">รูปสินค้า</span>`}</div><div class="bd"><span class="muted xs">${esc(catName(np.cat))}</span><span class="nm">${esc(np.name) || 'ชื่อสินค้า'}</span><span class="pr">${np.price ? baht(+np.price) : '฿—'}${+np.cmp > +np.price ? `<s>${baht(+np.cmp)}</s>` : ''}</span>${np.optOn && np.vals.length ? `<div class="row wrap" style="gap:4px">${np.vals.map(v => `<span class="chip">${esc(v)}</span>`).join('')}</div>` : ''}<span class="pts">+${Math.floor((+np.price || 0) / 25)} แต้ม</span></div></div>`; }
function npPv() { const e = document.getElementById('nppv'); if (e) e.innerHTML = npCard(); }
function npModal() {
  layer.innerHTML = `<div class="overlay" onclick="if(event.target===this)closeLayer()"><div class="modal npm">
    <div class="row between" style="padding:18px 22px;border-bottom:1px solid var(--g2)"><h3 style="font-size:19px">+ เพิ่มสินค้า</h3><button class="x" onclick="closeLayer()" aria-label="ปิด">×</button></div>
    <div class="np2"><div class="npf">
      <label class="lb">รูปสินค้า</label>
      <div class="row wrap" style="gap:8px"><label class="upl">${np.img ? `<img src="${np.img}" alt="">` : `<span class="small muted">อัปโหลดรูป<br>JPG / PNG</span>`}<input type="file" accept="image/*" onchange="npImg(this.files[0])"></label>${NP_IMG.map(id => `<button class="smp ${np.img === MD_PHOTOS[id] ? 'on' : ''}" onclick="np.img=MD_PHOTOS['${id}'];npModal()" title="ใช้รูปตัวอย่าง">${art(P[id])}</button>`).join('')}</div>
      <label class="lb" style="margin-top:14px">ชื่อสินค้า *</label><input class="input" value="${esc(np.name)}" placeholder="เช่น MD INFINITY โฟมล้างรถ 20 ลิตร" oninput="np.name=this.value;npPv()">
      <label class="lb" style="margin-top:12px">รายละเอียด</label><textarea class="input" rows="2" placeholder="วิธีใช้ อัตราส่วนผสม ข้อควรระวัง" oninput="np.desc=this.value">${esc(np.desc)}</textarea>
      <div class="g2e" style="margin-top:12px;gap:12px"><div><label class="lb">หมวดหมู่</label><select class="input" onchange="np.cat=this.value;npPv()">${S.cats.map(c => `<option value="${c[0]}" ${np.cat === c[0] ? 'selected' : ''}>${esc(c[1])}</option>`).join('')}</select></div>
        <div><label class="lb">ช่องทางที่ขาย</label><div class="row wrap" style="gap:6px">${Object.entries(PCH).map(([k, t]) => `<button class="fbtn2 ${np.chans.includes(k) ? 'on' : ''}" onclick="np.chans=np.chans.includes('${k}')?np.chans.filter(x=>x!=='${k}'):[...np.chans,'${k}'];npModal()">${t}</button>`).join('')}</div></div></div>
      <div class="g2e" style="margin-top:12px;gap:12px"><div><label class="lb">ราคาขาย (฿) *</label><input class="input" type="number" value="${np.price}" oninput="np.price=this.value;npPv()"></div><div><label class="lb">ราคาก่อนลด (฿)</label><input class="input" type="number" value="${np.cmp}" placeholder="ไม่บังคับ" oninput="np.cmp=this.value;npPv()"></div></div>
      <div class="g2e" style="margin-top:12px;gap:12px"><div><label class="lb">รอบใช้งาน (วัน)</label><input class="input" type="number" value="${np.cycle}" oninput="np.cycle=this.value"><span class="muted xs">ใช้เตือนเติมน้ำยา · 0 = ไม่เตือน</span></div>${np.optOn ? '' : `<div><label class="lb">สต็อก</label><input class="input" type="number" value="${np.stock}" oninput="np.stock=this.value"></div>`}</div>
      <label class="tgl ${np.optOn ? 'on' : ''}" style="margin-top:14px" onclick="np.optOn=!np.optOn;npModal()"><i></i>สินค้ามีตัวเลือก (ขนาด / กลิ่น) — แต่ละตัวเลือกมีสต็อกของตัวเอง</label>
      ${np.optOn ? `<div class="g2e" style="gap:12px"><div><label class="lb">ชื่อตัวเลือก</label><select class="input" onchange="np.optName=this.value">${['ขนาด', 'กลิ่น', 'สูตร'].map(o => `<option ${np.optName === o ? 'selected' : ''}>${o}</option>`).join('')}</select></div><div><label class="lb">เพิ่มค่า</label><input class="input" placeholder="พิมพ์แล้วกด Enter เช่น 20 ลิตร" onkeydown="if(event.key==='Enter'&&this.value.trim()){np.vals.push(this.value.trim());npModal()}"></div></div>
        <div class="vst">${np.vals.map((v, i) => `<div><b>${esc(v)}</b><input class="input sm" type="number" placeholder="สต็อก" value="${np.vst[v] || ''}" oninput="np.vst['${esc(v)}']=this.value"><button class="x" style="width:26px;height:26px;font-size:14px" onclick="np.vals.splice(${i},1);npModal()" aria-label="ลบ">×</button></div>`).join('')}</div>` : ''}
      <label class="lb" style="margin-top:14px">การจัดส่ง</label><div class="row wrap" style="gap:8px"><span class="chip ok">จัดส่งทั่วประเทศ</span><label class="small">น้ำหนัก <input class="input sm" style="width:90px;display:inline-block" type="number" value="${np.weight}" oninput="np.weight=this.value"> กรัม</label></div>
    </div>
    <div class="npv"><label class="lb">ตัวอย่างในหน้าร้าน</label><div id="nppv">${npCard()}</div><p class="muted xs" style="margin:10px 0 0">${S.role !== 'admin' ? 'สินค้าใหม่ต้องรอแอดมิน MD อนุมัติก่อนขึ้นหน้าร้าน' : 'แอดมิน: เปิดขายได้ทันที'}</p></div></div>
    <div class="row" style="justify-content:flex-end;padding:14px 22px;border-top:1px solid var(--g2)"><button class="btn btn-w" onclick="saveNewProd('draft')">บันทึกร่าง</button><button class="btn btn-o" onclick="saveNewProd('published')">${S.role !== 'admin' ? 'ส่งอนุมัติ' : 'เปิดขาย'}</button></div>
  </div></div>`;
}
function saveNewProd(stt) {
  if (!np.name.trim() || !(+np.price)) { toast('ใส่ชื่อสินค้าและราคาก่อน'); return; }
  if (!np.chans.length) { toast('เลือกช่องทางที่ขายอย่างน้อย 1 ช่องทาง'); return; }
  const id = 'n' + Date.now().toString(36);
  const p = {id, short:np.name.trim().split(' ').slice(0, 2).join(' '), name:np.name.trim(), size:np.optOn && np.vals.length ? np.vals.join(' / ') : '1 ชิ้น', price:+np.price, cat:np.cat, cycle:+np.cycle || 0, chans:[...np.chans], opt:np.optOn && np.vals.length ? [...np.vals] : null, optName:np.optOn ? np.optName : null, status:S.role !== 'admin' && stt === 'published' ? 'draft' : stt, look:{shape:'jug', liq:'#F2621F', lab:'#121212', txt:'#F2621F', word:'NEW'}, desc:np.desc};
  if (S.role !== 'admin' && stt === 'published') { p.pend = {status:'published'}; p.pendNote = 'สินค้าใหม่ · รอแอดมินอนุมัติ'; }
  S.newProds.push({...p, img:np.img || null}); S.stock[id] = npTotal();
  addNewProd(S.newProds[S.newProds.length - 1]); save();
  closeLayer(); np = null; prodF = {q:'', cat:'', st:''}; route();
  toast(p.pend ? 'ส่งสินค้าใหม่ให้แอดมินอนุมัติแล้ว' : stt === 'draft' ? 'บันทึกร่างแล้ว — ยังไม่ขึ้นหน้าร้าน' : 'เปิดขายแล้ว — ขึ้นหน้าร้านทันที');
}
function addNewProd(x) { if (P[x.id]) return; const p = {...x}; delete p.img; PRODUCTS.push(p); P[p.id] = p; if (x.img) MD_PHOTOS[p.id] = x.img; if (x.desc) (window.MD_DETAIL = window.MD_DETAIL || {})[p.id] = {gallery:x.img ? [x.img] : [], desc:x.desc, feats:[], how:[], warn:''}; }
function aProducts() {
  const list = PRODUCTS.filter(p => (!prodF.cat || p.cat === prodF.cat) && (!prodF.st || (prodF.st === 'pending' ? !!p.pend : (p.status || 'published') === prodF.st)) && (!prodF.q || p.name.toLowerCase().includes(prodF.q.toLowerCase())));
  const admin = S.role === 'admin';
  return `<div class="ph-h"><div><h1>สินค้า</h1><span class="muted">จัดการสินค้าในร้าน — ${admin ? 'แอดมิน: แก้ไขและอนุมัติได้' : ROLES[S.role][0] + ': แก้ราคา / เปิด-ปิดขาย แล้วต้องรอแอดมินอนุมัติ'}</span></div><div class="row"><button class="btn btn-w btn-sm" onclick="toast('Import สินค้าจาก CSV (ตัวอย่าง)')">Import CSV</button><button class="btn btn-w btn-sm" onclick="catModal()">⚙︎ หมวดหมู่</button><button class="btn btn-o btn-sm" onclick="openNewProd()">+ เพิ่มสินค้า</button></div></div>
  <div class="kpis"><div class="kpi"><span class="lb">สินค้าทั้งหมด</span><b>${list.length}</b></div><div class="kpi"><span class="lb">เปิดขาย</span><b>${list.filter(p => (p.status || 'published') === 'published').length}</b></div><div class="kpi"><span class="lb">รออนุมัติ</span><b>${list.filter(p => p.pend).length}</b></div><div class="kpi"><span class="lb">ใกล้หมด (≤${LOW})</span><b>${list.filter(p => (S.stock[p.id] || 0) <= LOW).length}</b></div></div>
  <div class="card">
    <div class="filters" style="padding:14px 16px;border-bottom:1px solid var(--g2)"><input class="input sm" style="width:220px" placeholder="ค้นหาชื่อสินค้า" value="${esc(prodF.q)}" onchange="prodF.q=this.value;route()"><select class="input sm" style="width:auto" onchange="prodF.cat=this.value;route()"><option value="">ทุกหมวดหมู่</option>${S.cats.map(c => `<option value="${c[0]}" ${prodF.cat === c[0] ? 'selected' : ''}>${esc(c[1])}</option>`).join('')}</select>${[['', 'ทุกสถานะ'], ['published', 'เปิดขาย'], ['pending', 'รออนุมัติ'], ['hidden', 'ปิดขาย'], ['draft', 'ฉบับร่าง']].map(([k, t]) => `<button class="fbtn2 ${prodF.st === k ? 'on' : ''}" onclick="prodF.st='${k}';route()">${t}</button>`).join('')}<span class="grow"></span><button class="btn btn-w btn-sm" onclick="openNewProd()">+ เพิ่มสินค้า</button></div>
    <div class="tbl-wrap"><table class="t"><thead><tr><th style="width:56px"></th><th>สินค้า</th><th>ช่องทางที่ขาย</th><th>ตัวเลือก</th><th>ราคา</th><th>รอบใช้งาน</th><th>Stock</th><th>ขายแล้ว</th><th>สถานะ</th><th></th></tr></thead><tbody>
    ${list.map(p => { const stk = S.stock[p.id] || 0, stt = p.status || 'published'; return `<tr>
      <td>${thumb(p)}</td>
      <td class="prod" style="min-width:230px"><a href="#/store/p/${p.id}" style="font-weight:600">${esc(p.name)}</a><div class="muted xs">SKU ${SKU(p.id)} · <span style="color:var(--g7)">${esc(catName(p.cat))}</span></div>${p.pend ? `<div class="xs" style="color:#92400E">⏳ ${esc(p.pendNote || '')}</div>` : ''}</td>
      <td><div class="row wrap" style="gap:3px">${(p.chans || ['web', 'line', 'dealer']).map(k => `<span class="chip">${PCH[k]}</span>`).join('')}</div>${admin ? `<button class="lnkbtn" onclick="chanModal('${p.id}')">แก้ช่องทาง</button>` : ''}</td>
      <td class="small">${p.opt ? `<b>${esc(p.optName || 'ขนาด')}</b><div class="muted xs">${p.opt.map(esc).join(' · ')}</div>` : '<span class="muted xs">ไม่มีตัวเลือก</span>'}<button class="lnkbtn" onclick="openCfg('${p.id}')">⚙︎ ตั้งค่าตัวเลือก</button></td>
      <td><input class="input cell" type="number" value="${p.price}" onchange="editPrice('${p.id}',this.value)"> ฿</td>
      <td><input class="input cell" style="width:72px" type="number" value="${p.cycle}" onchange="editCycle('${p.id}',this.value)"> <span class="xs muted">วัน</span></td>
      <td><div class="qty"><button onclick="editStock('${p.id}',-1)" aria-label="ลด">−</button><span>${stk}</span><button onclick="editStock('${p.id}',1)" aria-label="เพิ่ม">+</button></div>${stk <= LOW ? `<div class="xs" style="color:var(--red)">${stk ? 'ใกล้หมด' : 'หมด'}</div>` : ''}</td>
      <td class="num">${soldOf(p.id)}</td>
      <td>${pstChip(stt)}${p.pend ? '<br>' + pstChip('pending') : ''}</td>
      <td style="text-align:right;white-space:nowrap">${p.pend && admin ? `<button class="btn btn-o btn-sm" onclick="approveProd('${p.id}')">อนุมัติ</button><br><button class="lnkbtn" style="color:var(--red)" onclick="rejectProd('${p.id}')">ปฏิเสธ</button>` : `<button class="btn btn-w btn-sm" onclick="toggleStatus('${p.id}')">${stt === 'published' ? 'ปิดขาย' : 'เปิดขาย'}</button>`}</td></tr>`; }).join('') || '<tr><td colspan="10" class="muted" style="text-align:center;padding:48px 24px">ไม่พบสินค้า</td></tr>'}
    </tbody></table></div>
    <p class="muted xs" style="margin:0;padding:12px 16px">แก้ราคา / stock / ตัวเลือก / เปิด-ปิด แล้วไปดูผลที่ <a href="#/store" style="text-decoration:underline">หน้าร้าน</a> ได้ทันที · การแก้ของทีมที่ไม่ใช่แอดมินจะเข้าคิว "รออนุมัติ" โดยของเดิมยังขายต่อจนกว่าจะอนุมัติ</p>
  </div>`;
}

/* --- inventory (Grandprix structure) --- */
let invF = {cat:'', low:false};
function aInventory() {
  let list = PRODUCTS.slice();
  if (invF.cat) list = list.filter(p => p.cat === invF.cat);
  if (invF.low) list = list.filter(p => (S.stock[p.id] || 0) <= LOW);
  const all = PRODUCTS, lows = all.filter(p => (S.stock[p.id] || 0) <= LOW), out = all.filter(p => !(S.stock[p.id] || 0)).length;
  const val = all.reduce((a, p) => a + (S.stock[p.id] || 0) * p.price, 0);
  return `<div class="ph-h"><div><h1>คลังสินค้า</h1><span class="muted">สต็อกเป็น <b>ก้อนกลางจากโรงงาน</b> ใช้ร่วมกันทั้งหน้าร้าน · LINE · ออเดอร์ตัวแทน</span></div><div class="row"><button class="btn btn-w btn-sm" onclick="catModal()">⚙︎ จัดการหมวดหมู่</button><button class="btn btn-w btn-sm" onclick="toast('Export stock เป็น CSV (ตัวอย่าง)')">Export stock</button></div></div>
  ${lows.map(p => `<div class="lowalert"><span>⚠️</span><div class="grow"><b>${esc(p.name)}</b> เหลือ ${S.stock[p.id] || 0} ชิ้น — ขายอยู่ใน ${(p.chans || ['web', 'line', 'dealer']).map(k => PCH[k]).join(' · ')}</div><button class="btn btn-w btn-sm" onclick="S.stock['${p.id}']=(S.stock['${p.id}']||0)+20;save();route();toast('เติม stock +20 · ${esc(p.short)}')">+ เติม stock</button></div>`).join('')}
  <div class="kpis">
    <div class="kpi"><span class="lb">SKU ทั้งหมด</span><b>${all.length}</b></div>
    <div class="kpi"><span class="lb">ชิ้นคงเหลือ</span><b class="num">${all.reduce((a, p) => a + (S.stock[p.id] || 0), 0).toLocaleString()}</b></div>
    <div class="kpi"><span class="lb">มูลค่าสต็อก</span><b class="num">${baht(val)}</b></div>
    <div class="kpi"><span class="lb">ใกล้หมด / หมด</span><b style="color:${lows.length ? 'var(--red)' : 'inherit'}">${lows.length} / ${out}</b></div>
  </div>
  <div class="card">
    <div class="catbar"><button class="fbtn2 ${!invF.cat ? 'on' : ''}" onclick="invF.cat='';route()">ทุกหมวด <span class="cnt">${all.length}</span></button>${S.cats.map(c => `<button class="fbtn2 ${invF.cat === c[0] ? 'on' : ''}" onclick="invF.cat='${c[0]}';route()">${esc(c[1])} <span class="cnt">${all.filter(p => p.cat === c[0]).length}</span></button>`).join('')}<button class="fbtn2 add" onclick="catModal()">⚙︎ หมวดหมู่</button><span class="grow"></span><button class="fbtn2 ${invF.low ? 'on' : ''}" onclick="invF.low=!invF.low;route()">⚠ เฉพาะที่ใกล้หมด (≤${LOW})</button></div>
    <div class="tbl-wrap"><table class="t"><thead><tr><th style="width:56px"></th><th>สินค้า</th><th>หมวดหมู่</th><th>คงเหลือ</th><th>ขายแล้ว</th><th>มูลค่า</th><th>ขายในช่องทาง</th></tr></thead><tbody>
    ${list.map(p => { const stk = S.stock[p.id] || 0, pct = Math.min(100, stk / 120 * 100), col = !stk ? 'var(--red)' : stk <= LOW ? '#EA580C' : 'var(--ok)'; return `<tr>
      <td>${thumb(p, 42)}</td>
      <td class="prod" style="min-width:220px"><b>${esc(p.name)}</b><div class="muted xs">SKU ${SKU(p.id)}${p.opt ? ' · ' + p.opt.length + ' ' + esc(p.optName || 'ขนาด') : ''}</div></td>
      <td><select class="input sm" style="width:auto" onchange="setProd('${p.id}',{cat:this.value});route();toast('ย้ายหมวดแล้ว · หน้าร้านอัปเดตทันที')">${S.cats.map(c => `<option value="${c[0]}" ${p.cat === c[0] ? 'selected' : ''}>${esc(c[1])}</option>`).join('')}</select></td>
      <td style="min-width:140px"><div class="qty"><button onclick="editStock('${p.id}',-1)" aria-label="ลด">−</button><span>${stk}</span><button onclick="editStock('${p.id}',1)" aria-label="เพิ่ม">+</button></div><div class="stockbar"><i style="width:${pct}%;background:${col}"></i></div>${stk <= LOW ? `<span class="chip ${stk ? 'warn' : 'bad'}">${stk ? 'ใกล้หมด' : 'หมด'}</span>` : ''}</td>
      <td class="num">${soldOf(p.id)}</td><td class="num">${baht(stk * p.price)}</td>
      <td><div class="row wrap" style="gap:3px">${(p.chans || ['web', 'line', 'dealer']).map(k => `<span class="chip">${PCH[k]}</span>`).join('')}</div></td></tr>`; }).join('') || '<tr><td colspan="7" class="muted" style="text-align:center;padding:48px 24px">ไม่มีสินค้าที่ตรงเงื่อนไข</td></tr>'}
    </tbody></table></div>
  </div>
  <div class="card pad" style="margin-top:14px"><b>กติกาสต็อกที่ระบบใช้</b>
    <div class="small" style="color:var(--g7);line-height:1.9;margin-top:8px">• ตัดสต็อกตอน <b>ชำระสำเร็จ</b> ไม่ใช่ตอนใส่ตะกร้า · ตอนจ่ายถ้าสต็อกไม่พอระบบปฏิเสธ (ไม่ตัดติดลบ)<br>• ยกเลิก / คืนเงิน → คืนสต็อกอัตโนมัติ · "ขายแล้ว" ไม่นับบรรทัดที่คืนเงิน<br>• ออเดอร์ตัวแทนตัดสต็อกจากก้อนเดียวกัน<br>• ระบบจริง: จองชั่วคราว 15 นาทีระหว่างจ่ายเงิน · สินค้าที่มีตัวเลือกแต่ละตัวเลือกมีสต็อกของตัวเอง (demo นับรวมต่อสินค้า)</div></div>`;
}

/* --- orders (Grandprix structure: list + detail · status flow · refund) --- */
const ORD_FLOW = ['รอชำระ', 'ชำระแล้ว', 'เตรียมของ', 'จัดส่งแล้ว', 'สำเร็จ', 'ยกเลิก'];
const ORD_TR = {'รอชำระ':['ชำระแล้ว', 'ยกเลิก'], 'ชำระแล้ว':['เตรียมของ', 'จัดส่งแล้ว', 'ยกเลิก'], 'เตรียมของ':['ชำระแล้ว', 'จัดส่งแล้ว', 'ยกเลิก'], 'จัดส่งแล้ว':['สำเร็จ', 'เตรียมของ'], 'สำเร็จ':[], 'ยกเลิก':[]};
const ORD_BACK = {'เตรียมของ>ชำระแล้ว':1, 'จัดส่งแล้ว>เตรียมของ':1};
const OSC = {'รอชำระ':'#FEF3C7|#B45309', 'ชำระแล้ว':'#DCFCE7|#15803D', 'เตรียมของ':'#E0E7FF|#4338CA', 'จัดส่งแล้ว':'#EDE9FE|#6D28D9', 'สำเร็จ':'#D1FAE5|#065F46', 'ยกเลิก':'#F1F5F9|#475569', 'คืนเงิน':'#FEE2E2|#B91C1C', 'คืนเงินบางส่วน':'#FFEDD5|#C2410C', 'สแกนแล้ว':'#EEFBC8|#4D6B00'};
const ordList = () => [...S.orders].sort((a, b) => a.date < b.date ? 1 : a.date > b.date ? -1 : (a.id < b.id ? 1 : -1));
const ordFull = o => !!(o.refund && o.refund.lines.length === o.items.length && (!o.ship || o.refund.ship));
const ordStatus = o => o.refund && (o.refund.lines.length || o.refund.ship) ? (ordFull(o) ? 'คืนเงิน' : 'คืนเงินบางส่วน') : o.status;
const ordPill = o => { const st = ordStatus(o), c = (OSC[st] || '#F1F5F9|#475569').split('|'); return `<span class="chip" style="background:${c[0]};color:${c[1]}">${st === 'ชำระแล้ว' ? 'PAID' : st}</span>`; };
const isDeliv = o => o.ch === 'web' || o.ch === 'line';
const canTr = (o, v) => !ordFull(o) && (ORD_TR[o.status] || []).includes(v);
const canRefund = o => !ordFull(o) && ['ชำระแล้ว', 'เตรียมของ', 'จัดส่งแล้ว', 'สำเร็จ'].includes(o.status);
function lineNet(o, i) {
  const c = cust(o.cid), disc = c.type === 'dealer' ? DEALER_TIERS[c.tier].disc : c.type === 'carcare' ? 15 : 0;
  const g = it => P[it[0]].price * it[1] * (1 - disc / 100), el = it => !o.offCat || P[it[0]].cat === o.offCat, sum = o.items.reduce((a, it) => a + (el(it) ? g(it) : 0), 0);
  return Math.round(g(o.items[i]) - (el(o.items[i]) && sum ? (o.off || 0) * g(o.items[i]) / sum : 0));
}
const ordRefunded = o => o.refund ? o.refund.lines.reduce((a, i) => a + lineNet(o, i), 0) + (o.refund.ship ? (o.ship || 0) : 0) : 0;
let ordF = '', ordQ = '', ordSel = null;
function ordLog(id, st, why, who) { (S.ordlog[id] = S.ordlog[id] || []).push({st, why:why || '', who:who || ROLES[S.role][0], at:new Date().toTimeString().slice(0, 5)}); }
function setOrdSt(id, v, reason) {
  const o = S.orders.find(x => x.id === id); if (!o) return; const from = o.status; if (from === v) return;
  if (!canTr(o, v)) { toast(`เปลี่ยนจาก "${ordStatus(o)}" เป็น "${v}" ไม่ได้${from === 'จัดส่งแล้ว' && v === 'ยกเลิก' ? ' — ส่งแล้วใช้คืนเงินรายบรรทัด' : from === 'สำเร็จ' ? ' — สถานะสุดท้าย' : ''}`); return; }
  if (v === 'ยกเลิก' && from !== 'รอชำระ') { openRefund(id, true); return; }
  const sh = isDeliv(o) ? shipRow(o).dstat : null;
  if (v === 'เตรียมของ' && from === 'จัดส่งแล้ว' && sh && DSTAT.indexOf(sh) >= DSTAT.indexOf('ส่งมอบขนส่ง')) { toast('ย้อนเป็นเตรียมของไม่ได้ — พัสดุส่งมอบขนส่งแล้ว'); return; }
  if (ORD_BACK[from + '>' + v] && !reason) { reasonModal(id, v); return; }
  o.status = v; ordLog(id, v, reason);
  if (sh) { const want = v === 'จัดส่งแล้ว' ? 'ส่งมอบขนส่ง' : v === 'สำเร็จ' ? 'ส่งสำเร็จ' : v === 'เตรียมของ' && DSTAT.indexOf(sh) < 1 ? 'แพ็กแล้ว' : null; if (want && DSTAT.indexOf(sh) < DSTAT.indexOf(want)) S.ship[id] = {...(S.ship[id] || {}), dstat:want}; }
  notifyOrder(o, v, !!ORD_BACK[from + '>' + v]);
  save(); route(); toast(`${id} → ${v}${ORD_BACK[from + '>' + v] ? ' (ย้อนสถานะ · ไม่แจ้งลูกค้า)' : ' · แจ้งลูกค้าทาง LINE อัตโนมัติ'}`);
}
function notifyOrder(o, v, silent) { const c = cust(o.cid); if (!silent && c.id === 'C-1001' && c.line) S.lineMsgs.push({t:'bot', text:`📦 คำสั่งซื้อ ${o.id}: ${v}${S.ship[o.id] && S.ship[o.id].trk && ['จัดส่งแล้ว', 'สำเร็จ'].includes(v) ? ' · ' + (S.ship[o.id].carrier || '') + ' ' + S.ship[o.id].trk : ''}`, at:new Date().toTimeString().slice(0, 5)}); }
function reasonModal(id, v) {
  modal(`<div class="pad" style="padding:22px"><div class="row between"><h3 style="font-size:19px">ย้อนสถานะ ${id} → ${v}</h3><button class="x" onclick="closeLayer()" aria-label="ปิด">×</button></div>
    <label class="lb" style="margin-top:14px">เหตุผล (บันทึกในประวัติ · ลูกค้าไม่เห็น)</label><input class="input" id="rsn" placeholder="เช่น แพ็กผิดสินค้า ต้องแพ็กใหม่" onkeydown="if(event.key==='Enter')document.getElementById('rsnok').click()">
    <div class="row" style="justify-content:flex-end;margin-top:16px"><button class="btn btn-w btn-sm" onclick="closeLayer()">ยกเลิก</button><button class="btn btn-o btn-sm" id="rsnok" onclick="const r=document.getElementById('rsn').value.trim();if(!r){toast('ย้อนสถานะต้องใส่เหตุผล');return}closeLayer();setOrdSt('${id}','${v}',r)">ยืนยัน</button></div></div>`);
  setTimeout(() => { const e = document.getElementById('rsn'); if (e) e.focus(); }, 60);
}
let rf = null;
function openRefund(id, all, line) {
  const o = S.orders.find(x => x.id === id); if (!o) return;
  if (!canRefund(o)) { toast('คืนเงินได้เฉพาะคำสั่งซื้อที่ชำระแล้ว'); return; }
  const done = o.refund ? o.refund.lines : [];
  rf = {id, all:!!all, sel:o.items.map((_, i) => !done.includes(i) && (!!all || i === line)), ship:!!all && !!o.ship && !(o.refund && o.refund.ship)};
  refundModal();
}
function refundModal() {
  const o = S.orders.find(x => x.id === rf.id), done = o.refund ? o.refund.lines : [];
  const amt = o.items.reduce((a, _, i) => a + (rf.sel[i] && !done.includes(i) ? lineNet(o, i) : 0), 0) + (rf.ship ? o.ship : 0);
  const row = (ck, on, n, k, v, dis) => `<label class="rfrow ${dis ? 'dis' : ''}"><input type="checkbox" ${on ? 'checked' : ''} ${dis ? 'disabled' : ''} onchange="${ck};refundModal()"><span>${n}</span><span class="chip">${k}</span><b class="num">${v}</b></label>`;
  modal(`<div class="pad" style="padding:22px"><div class="row between"><h3 style="font-size:19px">↺ ${rf.all ? 'ยกเลิกคำสั่งซื้อ = คืนเงินทั้งหมด' : 'คืนเงิน'} · ${o.id}</h3><button class="x" onclick="closeLayer()" aria-label="ปิด">×</button></div>
    <div style="margin-top:10px">${o.items.map(([p, q], i) => row(`rf.sel[${i}]=this.checked`, rf.sel[i] && !done.includes(i), `${esc(P[p].name)} × ${q}${done.includes(i) ? ' <small style="color:var(--red)">· คืนแล้ว</small>' : ''}`, 'สินค้า', baht(lineNet(o, i)), done.includes(i))).join('')}
    ${o.ship ? row('rf.ship=this.checked', rf.ship && !(o.refund && o.refund.ship), 'ค่าส่ง' + (o.refund && o.refund.ship ? ' <small style="color:var(--red)">· คืนแล้ว</small>' : ''), 'ค่าส่ง', baht(o.ship), o.refund && o.refund.ship) : ''}</div>
    <p class="muted xs" style="margin:12px 0 0">ยอดคืน = ยอดที่ลูกค้าจ่ายจริงของบรรทัด (หลังกระจายส่วนลด) · สินค้าคืนสต็อกอัตโนมัติ · หักแต้มที่ได้จากบรรทัดนั้น · คืนครบทุกบรรทัด → คำสั่งซื้อเป็น "ยกเลิก"</p>
    <div class="row" style="justify-content:flex-end;margin-top:16px"><button class="btn btn-w btn-sm" onclick="closeLayer()">ยกเลิก</button><button class="btn btn-o btn-sm" ${amt ? '' : 'disabled'} onclick="doRefund()">ยืนยันคืนเงิน ${baht(amt)}</button></div></div>`);
}
function doRefund() {
  const o = S.orders.find(x => x.id === rf.id); o.refund = o.refund || {lines:[], ship:false};
  let amt = 0;
  o.items.forEach(([p, q], i) => { if (rf.sel[i] && !o.refund.lines.includes(i)) { amt += lineNet(o, i); o.refund.lines.push(i); S.stock[p] = (S.stock[p] || 0) + q; } });
  if (rf.ship && o.ship && !o.refund.ship) { o.refund.ship = true; amt += o.ship; }
  ordLog(o.id, 'คืนเงิน ' + baht(amt), '', ROLES[S.role][0]);
  if (ordFull(o) && ['ชำระแล้ว', 'เตรียมของ'].includes(o.status)) { o.status = 'ยกเลิก'; ordLog(o.id, 'ยกเลิก', 'คืนเงินครบ', 'system'); }
  rf = null; save(); closeLayer(); route(); toast(`คืนเงิน ${baht(amt)} · คืนสต็อก · หักแต้มอัตโนมัติ`);
}
function chatWith(cid) {
  const c = cust(cid); let th = S.chats.find(x => x.cid === cid);
  if (!th) { th = {id:'t' + Date.now(), cid, name:c.name, ch:c.line ? 'line' : 'web', unread:0, owner:ROLES[S.role][0], closed:false, note:'', msgs:[{me:true, t:'สวัสดีค่ะ ทักจากหลังบ้านเรื่องคำสั่งซื้อของคุณค่ะ', at:new Date().toTimeString().slice(0, 5)}]}; S.chats.unshift(th); save(); }
  chatSel = th.id; chatF = 'all'; location.hash = '#/admin/chat';
}
function aOrders() {
  const all = ordList();
  const hit = (o, k) => !k || ordStatus(o) === k || (k === 'คืนเงิน' && ['คืนเงินบางส่วน', 'ยกเลิก'].includes(ordStatus(o)));
  const list = all.filter(o => hit(o, ordF) && (!ordQ || (o.id + ' ' + cust(o.cid).name).toLowerCase().includes(ordQ.toLowerCase())));
  if (!ordSel || !all.find(o => o.id === ordSel)) ordSel = list[0] && list[0].id;
  const sel = all.find(o => o.id === ordSel), sc = sel ? cust(sel.cid) : null, done = sel && sel.refund ? sel.refund.lines : [];
  const deliv = sel && isDeliv(sel);
  return `<div class="ph-h"><div><h1>คำสั่งซื้อ</h1><span class="muted">ออเดอร์จากหน้าร้าน · LINE · ตัวแทน (ขายส่ง) ในบิลเดียวกัน</span></div><div class="row"><a class="btn btn-w btn-sm" href="#/admin/views?obj=order">${I.vtable} View engine</a><button class="btn btn-w btn-sm" onclick="toast('Export คำสั่งซื้อเป็น CSV (ตัวอย่าง)')">Export</button></div></div>
  <div class="o2">
    <div class="card ol"><div class="olh"><div class="filters">${['', 'รอชำระ', 'ชำระแล้ว', 'เตรียมของ', 'จัดส่งแล้ว', 'สำเร็จ', 'คืนเงิน'].map(k => `<button class="fbtn2 ${ordF === k ? 'on' : ''}" onclick="ordF='${k}';ordSel=null;route()">${k === 'คืนเงิน' ? 'คืนเงิน / ยกเลิก' : k || 'ทั้งหมด'} <span class="cnt">${all.filter(o => hit(o, k)).length}</span></button>`).join('')}</div>
      <input class="input sm" style="margin-top:10px" placeholder="เลขคำสั่งซื้อ / ชื่อลูกค้า" value="${esc(ordQ)}" onchange="ordQ=this.value;ordSel=null;route()"></div>
      <div class="olist">${list.map(o => { const c = cust(o.cid); return `<a class="orow ${o.id === ordSel ? 'on' : ''}" href="javascript:ordSel='${o.id}';route()"><div class="a"><b class="num">${o.id}</b><small>${thd(o.date, 1)}</small></div>
        <div class="m"><div class="c">${esc(c.name)} · <small>${isDeliv(o) ? 'จัดส่ง' : 'ส่งตรงตัวแทน'}</small></div>${o.items.slice(0, 2).map(([p, q]) => `<div class="ol-it">${chChip(o.ch)} ${esc(P[p].short)} × ${q}</div>`).join('')}${o.items.length > 2 ? `<div class="xs muted">+${o.items.length - 2} รายการ</div>` : ''}</div><div class="v"><b class="num">${baht(lineTotal(o))}</b>${ordPill(o)}</div></a>`; }).join('') || '<div class="muted" style="padding:24px;text-align:center">ไม่มีคำสั่งซื้อในสถานะนี้</div>'}</div>
    </div>
    ${sel ? `<div class="card od"><div class="odh"><div><b style="font-size:16px">${sel.id}</b><div class="muted small">${thd(sel.date, 1)} · ${esc(sc.name)} · ${chChip(sel.ch)}</div></div>${ordPill(sel)}</div>
      <div class="oaddr">🏠 <span><b>${deliv ? 'ที่อยู่จัดส่ง' : 'ส่งตรงถึงร้าน'}</b> ${esc(sel.addr || addrLine(defAddr(sc)))}<small class="muted xs" style="display:block">${sel.addr ? 'ลูกค้าเลือกตอนชำระเงิน' : 'ที่อยู่หลักในบัญชีลูกค้า'}</small></span></div>
      ${sel.tax || sc.type !== 'b2c' ? `<div class="oaddr">🧾 <span><b>ใบกำกับภาษี</b> ${esc(sel.tax || taxLine(sc))}</span></div>` : '<div class="oaddr muted">🧾 <span>ลูกค้าไม่ขอใบกำกับภาษี · ออกใบเสร็จอย่างย่อ</span></div>'}
      ${sel.items.map(([p, q], i) => `<div class="oln"><span class="n">${esc(P[p].name)} × ${q}${done.includes(i) ? ' <small style="color:var(--red)">· คืนเงินแล้ว ' + baht(lineNet(sel, i)) + '</small>' : ''}</span><span class="chip">${esc(catName(P[p].cat))}</span><b class="num">${baht(lineNet(sel, i))}</b>${canRefund(sel) && !done.includes(i) ? `<button class="rfb" onclick="openRefund('${sel.id}',false,${i})" title="คืนเงินบรรทัดนี้">↺</button>` : '<span></span>'}</div>`).join('')}
      ${sel.ship ? `<div class="oln"><span class="n">ค่าส่ง${sel.refund && sel.refund.ship ? ' <small style="color:var(--red)">· คืนเงินแล้ว</small>' : ''}</span><span class="chip">ค่าส่ง</span><b class="num">${baht(sel.ship)}</b><span></span></div>` : ''}
      ${sel.off ? `<div class="oln"><span class="n">ส่วนลด ${esc(sel.code || '')}</span><span></span><b class="num" style="color:var(--ok)">−${baht(sel.off)}</b><span></span></div>` : ''}
      <div class="otot"><b>รวม</b><b class="num">${baht(lineTotal(sel) + ordRefunded(sel))}</b></div>
      ${ordRefunded(sel) ? `<div class="oln"><span class="n" style="color:var(--red)">คืนเงินแล้ว</span><span></span><b class="num" style="color:var(--red)">−${baht(ordRefunded(sel))}</b><span></span></div><div class="otot"><b>สุทธิ</b><b class="num">${baht(lineTotal(sel))}</b></div>` : ''}
      <div class="ost"><b>เปลี่ยนสถานะ</b><div class="seg3">${ORD_FLOW.map(v => { const cur = sel.status === v, ok = cur || canTr(sel, v); return `<button class="${cur ? 'on' : ''}" ${ok ? '' : 'disabled title="เปลี่ยนจากสถานะปัจจุบันไปสถานะนี้ไม่ได้"'} onclick="setOrdSt('${sel.id}','${v}')">${!deliv && v === 'จัดส่งแล้ว' ? 'ส่งถึงร้านแล้ว' : v}</button>`; }).join('')}</div><small class="muted">ไปได้เฉพาะขั้นที่อนุญาต · ยกเลิกหลังชำระ = คืนเงินทั้งหมด · ย้อนสถานะต้องใส่เหตุผล · ลูกค้าเห็นสถานะใหม่และได้รับแจ้งทาง LINE</small></div>
      <div class="otl"><b>ประวัติสถานะ</b>
        <div class="e on"><i></i><div><b>${sel.status === 'รอชำระ' ? 'สร้างคำสั่งซื้อ · รอชำระ' : sel.ch === 'dealer' ? 'เปิดบิลขายส่ง · เครดิตตามระดับตัวแทน' : 'ชำระเงินแล้ว · PromptPay'}</b><small>อัตโนมัติ · ${thd(sel.date, 1)}</small></div></div>
        ${(S.ordlog[sel.id] || []).map(x => `<div class="e on"><i></i><div><b>${x.st.startsWith('คืนเงิน') ? esc(x.st) : 'เปลี่ยนเป็น ' + esc(x.st)}</b><small>${esc(x.who)} · ${x.at}${x.why ? ' · ' + esc(x.why) : ''}</small></div></div>`).join('')}
        ${['สำเร็จ', 'ยกเลิก'].includes(sel.status) || ordFull(sel) ? '' : `<div class="e"><i></i><div><b>${deliv ? 'การจัดส่ง: ' + shipRow(sel).dstat : 'รอส่งตรงถึงร้านตัวแทน'}</b><small>${deliv ? '<a href="#/admin/delivery" style="text-decoration:underline">ไปที่ การจัดส่ง</a>' : 'รถโรงงานส่งตามรอบภาคใต้'}</small></div></div>`}</div>
      <div class="obt"><button class="btn btn-w btn-sm" onclick="chatWith('${sel.cid}')">${I.msg} แชทลูกค้า</button><button class="btn btn-w btn-sm" onclick="openCust('${sel.cid}')">${I.user} Customer 360</button><span class="grow"></span><button class="btn btn-w btn-sm rf" ${canRefund(sel) ? '' : 'disabled title="คืนเงินได้เฉพาะคำสั่งซื้อที่ชำระแล้ว"'} onclick="openRefund('${sel.id}')">คืนเงินบางรายการ</button></div>
    </div>` : ''}
  </div>`;
}

/* --- delivery center (Grandprix structure) --- */
const DSTAT = ['รอแพ็ก', 'แพ็กแล้ว', 'ส่งมอบขนส่ง', 'กำลังนำส่ง', 'ส่งสำเร็จ'];
const DSC = {'รอแพ็ก':'#FEF3C7|#B45309', 'แพ็กแล้ว':'#DBEAFE|#1D4ED8', 'ส่งมอบขนส่ง':'#E0E7FF|#4338CA', 'กำลังนำส่ง':'#EDE9FE|#6D28D9', 'ส่งสำเร็จ':'#DCFCE7|#15803D'};
const CARRIER = ['Flash', 'Kerry', 'J&T', 'ไปรษณีย์ไทย'], API_CAR = ['Flash', 'Kerry', 'J&T'];
function shipDefault(o) { return o.status === 'สำเร็จ' ? 'ส่งสำเร็จ' : o.status === 'จัดส่งแล้ว' ? 'กำลังนำส่ง' : o.status === 'เตรียมของ' ? 'แพ็กแล้ว' : 'รอแพ็ก'; }
function shipRow(o) { const ov = S.ship[o.id] || {}, n = parseInt(o.id.replace(/\D/g, '')) || 0; return {id:o.id, cust:cust(o.cid).name, custId:o.cid, total:lineTotal(o), date:o.date, ch:CH[o.ch][0], addr:(a => a ? [a.dist, a.prov].filter(Boolean).join(' · ') : cust(o.cid).region)(o.prov ? o : defAddr(cust(o.cid))), dstat:ov.dstat || shipDefault(o), carrier:ov.carrier || CARRIER[n % 4], trk:ov.trk || (['FL', 'KE', 'JT', 'TH'][n % 4] + String(770000000 + n * 37)), auto:ov.auto}; }
function shipList() { return ordList().filter(o => isDeliv(o) && !ordFull(o) && !['รอชำระ', 'ยกเลิก'].includes(o.status) && days(D(o.date), TODAY) <= 60).map(shipRow); }
const shipStage = o => DSTAT.indexOf(shipRow(o).dstat);
function setShipSt(id, dstat, auto) {
  S.ship[id] = {...(S.ship[id] || {}), dstat, ...(auto ? {auto:1} : {})};
  const o = S.orders.find(x => x.id === id); if (!o || ordFull(o)) return; const b = o.status;
  let nx = null;
  if (dstat === 'แพ็กแล้ว' && b === 'ชำระแล้ว') nx = 'เตรียมของ';
  if (['ส่งมอบขนส่ง', 'กำลังนำส่ง'].includes(dstat) && ['ชำระแล้ว', 'เตรียมของ'].includes(b)) nx = 'จัดส่งแล้ว';
  if (dstat === 'ส่งสำเร็จ' && ['ชำระแล้ว', 'เตรียมของ', 'จัดส่งแล้ว'].includes(b)) nx = 'สำเร็จ';
  if (nx) { o.status = nx; ordLog(id, nx, 'จากการจัดส่ง: ' + dstat, 'system'); }
  const c = cust(o.cid); if (c.id === 'C-1001' && c.line) { const r = shipRow(o); S.lineMsgs.push({t:'bot', text:`📦 พัสดุ ${id}: ${dstat} · ${r.carrier} เลขพัสดุ ${r.trk}`, at:new Date().toTimeString().slice(0, 5)}); }
}
function setShip(id, k, v) { S.ship[id] = {...(S.ship[id] || {}), [k]:v}; save(); route(); }
function bumpShip(id) { const o = S.orders.find(x => x.id === id), i = DSTAT.indexOf(shipRow(o).dstat); if (i >= DSTAT.length - 1) { toast('ส่งสำเร็จแล้ว'); return; } setShipSt(id, DSTAT[i + 1]); save(); route(); toast(`${id} → ${DSTAT[i + 1]} · แจ้งลูกค้าทาง LINE อัตโนมัติ`); }
let dlvF = '', dlvSel = {};
function bulkShip() { const ids = Object.keys(dlvSel).filter(k => dlvSel[k]); ids.forEach(id => { const o = S.orders.find(x => x.id === id), i = DSTAT.indexOf(shipRow(o).dstat); if (i < DSTAT.length - 1) setShipSt(id, DSTAT[i + 1]); }); dlvSel = {}; save(); route(); toast(`เลื่อนสถานะ ${ids.length} รายการ · แจ้งลูกค้าทาง LINE อัตโนมัติ`); }
function syncCarriers() { let n = 0; shipList().forEach(x => { const k = DSTAT.indexOf(x.dstat); if (API_CAR.includes(x.carrier) && k < DSTAT.length - 1 && k >= 2 && ((parseInt(x.id.replace(/\D/g, '')) + (S.trkN || 0)) % 2 === 0)) { setShipSt(x.id, DSTAT[k + 1], 1); n++; } }); S.trkN = (S.trkN || 0) + 1; S.trkSync = new Date().toTimeString().slice(0, 5); save(); route(); toast(`ดึงสถานะจาก API ขนส่ง · อัปเดต ${n} รายการ · แจ้งลูกค้าทาง LINE อัตโนมัติ`); }
const ordTabs = act => `<div class="tabs subtabs"><a href="#/admin/orders" class="${act === 'o' ? 'on' : ''}">${I.box} คำสั่งซื้อ</a><a href="#/admin/views?obj=shipment" class="${act === 's' ? 'on' : ''}">${I.ship} การจัดส่ง</a><a href="#/admin/delivery" class="${act === 'd' ? 'on' : ''}">${I.bolt} ศูนย์จัดส่ง (เลื่อนสถานะเป็นชุด)</a></div>`;
function aDelivery() {
  const all = shipList(), list = dlvF ? all.filter(x => x.dstat === dlvF) : all, nSel = Object.values(dlvSel).filter(Boolean).length;
  return `${ordTabs('d')}<div class="ph-h"><div><h1>การจัดส่ง</h1><span class="muted">เฉพาะออเดอร์เว็บ / LINE ที่ต้องส่งพัสดุ — ${all.length} รายการ · สถานะเปลี่ยนแล้วแจ้งลูกค้าอัตโนมัติทุกครั้ง</span></div><div class="row"><a class="btn btn-w btn-sm" href="#/admin/views?obj=shipment">${I.vtable} View engine</a><button class="btn btn-w btn-sm" onclick="toast('อัปโหลด Excel เลขพัสดุเป็นชุด — จับคู่ด้วยเลขคำสั่งซื้อ (ตัวอย่าง)')">Import เลขพัสดุเป็นชุด</button><button class="btn btn-w btn-sm" onclick="toast('พิมพ์ใบปะหน้า (ตัวอย่าง)')">พิมพ์ใบปะหน้า</button></div></div>
  ${isPlus() ? `<div class="apibar">${I.bolt}<span>เชื่อม API ขนส่งแล้ว</span>${API_CAR.map(c => `<em>✓ ${c}</em>`).join('')}<em class="n">ไปรษณีย์ไทย — ยังไม่เชื่อม</em><span class="grow"></span><small class="muted">อัปเดตอัตโนมัติทุก 30 นาที · ล่าสุด ${S.trkSync || '09:30'}</small><button class="btn btn-w btn-sm" onclick="syncCarriers()">${I.refill} ซิงก์ตอนนี้</button></div>`
    : `<div class="apibar off">${I.lock} แพ็ก Basic: เลื่อนสถานะเอง / import เลขพัสดุจาก Excel — ดึงสถานะอัตโนมัติจาก API Flash · Kerry · J&T อยู่ในแพ็ก Plus <a href="#/admin/billing" style="text-decoration:underline;font-weight:600">ดูแพ็ก Plus</a></div>`}
  <div class="dpipe">${DSTAT.map(s => `<button class="${dlvF === s ? 'on' : ''}" onclick="dlvF=dlvF==='${s}'?'':'${s}';route()">${s}<b>${all.filter(x => x.dstat === s).length}</b></button>`).join('')}</div>
  <div class="card"><div class="row between" style="padding:12px 16px;border-bottom:1px solid var(--g2)"><b>${dlvF ? 'กรองสถานะ: ' + dlvF : 'ทั้งหมด'}</b><small class="muted">${list.length} รายการ${nSel ? ' · เลือก ' + nSel : ''}</small></div>
    <div class="tbl-wrap"><table class="t"><thead><tr><th style="width:34px"><input type="checkbox" onchange="shipList().filter(x=>!dlvF||x.dstat===dlvF).forEach(x=>dlvSel[x.id]=this.checked);route()" aria-label="เลือกทั้งหมด"></th><th>เลขที่</th><th>ลูกค้า / ปลายทาง</th><th>ขนส่ง</th><th>เลขพัสดุ</th><th>สถานะ</th><th style="text-align:right">ยอด</th><th></th></tr></thead><tbody>
    ${list.map(x => { const i = DSTAT.indexOf(x.dstat), c = DSC[x.dstat].split('|'); return `<tr class="${dlvSel[x.id] ? 'sel' : ''}">
      <td><input type="checkbox" ${dlvSel[x.id] ? 'checked' : ''} onchange="dlvSel['${x.id}']=this.checked;route()" aria-label="เลือก ${x.id}"></td>
      <td><b class="num">${x.id}</b><div class="muted xs">${thd(x.date, 1)} · ${x.ch}</div></td>
      <td><b>${esc(x.cust)}</b><div class="muted xs">${esc(x.addr)}</div></td>
      <td><select class="input sm" style="width:auto" onchange="setShip('${x.id}','carrier',this.value)">${CARRIER.map(cc => `<option ${x.carrier === cc ? 'selected' : ''}>${cc}</option>`).join('')}</select></td>
      <td><input class="input sm num" style="width:150px" value="${esc(x.trk)}" onchange="setShip('${x.id}','trk',this.value)"></td>
      <td style="min-width:180px"><span class="chip" style="background:${c[0]};color:${c[1]}">${x.dstat}</span><div class="trk">${DSTAT.map((_, k) => `<i class="${k <= i ? 'done' : ''}"></i>${k < DSTAT.length - 1 ? `<span class="${k < i ? 'done' : ''}"></span>` : ''}`).join('')}</div>${isPlus() && x.auto ? `<small class="xs" style="color:var(--blue)">${I.bolt} อัปเดตจาก API</small>` : ''}</td>
      <td class="num" style="text-align:right">${baht(x.total)}</td>
      <td>${x.dstat !== 'ส่งสำเร็จ' ? `<button class="btn btn-k btn-sm" onclick="bumpShip('${x.id}')">→ ${DSTAT[i + 1]}</button>` : '<span style="color:var(--ok)" class="small">✓ เสร็จสิ้น</span>'}</td></tr>`; }).join('') || '<tr><td colspan="8" class="muted" style="text-align:center;padding:48px 24px">ไม่มีรายการในสถานะนี้</td></tr>'}
    </tbody></table></div></div>
  ${nSel ? `<div class="selbar"><span class="c">${nSel}</span> เลือกแล้ว<button onclick="toast('พิมพ์ใบปะหน้า (ตัวอย่าง)')">พิมพ์ใบปะหน้า</button><button style="background:var(--o);border-color:var(--o)" onclick="bulkShip()">เลื่อนสถานะทั้งหมด →</button><button onclick="dlvSel={};route()">ยกเลิก</button></div>` : ''}
  <div class="note" style="margin-top:14px">ลูกค้าเห็นสถานะเดียวกันนี้ในเมนู "ติดตามพัสดุ" ของ LINE OA และได้รับข้อความทุกครั้งที่สถานะเปลี่ยน · ดูแบบ Kanban ได้ที่ <a href="#/admin/views?obj=shipment" style="text-decoration:underline">การจัดส่ง (View engine)</a></div>`;
}

/* --- chat --- */
let chatSel = null, chatF = 'all';
const CHAT_CH = {line:['LINE', 'line'], fb:['Facebook', 'blue'], web:['หน้าร้าน', 'o']};
const QUICK = ['สวัสดีค่ะ ยินดีให้บริการค่ะ', 'ส่งทั่วประเทศ 2–4 วันทำการค่ะ', 'ขอเลขคำสั่งซื้อด้วยค่ะ', 'แนะนำให้ทดสอบจุดที่มองไม่เห็นก่อนใช้นะคะ'];
const chatVisible = () => S.chats.filter(c => isPlus() || c.ch === 'web');
function chatSend(text) {
  const th = S.chats.find(x => x.id === chatSel); if (!th || !text.trim()) return;
  const at = new Date().toTimeString().slice(0, 5);
  th.msgs.push({me:true, t:text.trim(), at}); th.unread = 0; th.owner = th.owner || 'คุณ (' + ROLES[S.role][0] + ')'; th.closed = false;
  if (th.cid === 'C-1001' && th.ch === 'line' && cust('C-1001').line) S.lineMsgs.push({t:'bot', text:text.trim(), at});
  save(); route();
}
function aChat() {
  const vis = chatVisible();
  const list = vis.filter(c => chatF === 'all' || (chatF === 'unread' ? c.unread && !c.closed : chatF === 'mine' ? !!c.owner : c.ch === chatF));
  if (!chatSel || !vis.find(x => x.id === chatSel)) chatSel = (list[0] || vis[0] || {}).id;
  const th = vis.find(x => x.id === chatSel);
  if (th && th.unread) { th.unread = 0; save(); }
  const c = th && th.cid ? cust(th.cid) : null, cs = c ? st(c) : null;
  const f = (k, t) => `<button class="fbtn2 ${chatF === k ? 'on' : ''}" onclick="chatF='${k}';route()">${t}</button>`;
  const chBtn = (k, t) => (k === 'line' || k === 'fb') && !isPlus() ? `<button class="fbtn2 locked" onclick="planModal()">${I.lock} ${t} <span class="pl2">PLUS</span></button>` : f(k, t + ' <span class="cnt">' + S.chats.filter(x => x.ch === k).length + '</span>');
  return `<div class="ph-h"><div><h1>แชท ${isPlus() ? '<span class="chip k" style="font-style:normal;vertical-align:middle">PLUS</span>' : ''}</h1><span class="muted">${isPlus() ? 'รวมทุกช่องทางของแบรนด์ — แชทหน้าร้าน · LINE OA · Facebook Page ตอบในหน้าเดียว' : 'แพ็ก Basic: แชทที่ลูกค้าทักจากหน้าร้าน · รวม LINE + Facebook ในหน้าเดียวอยู่ในแพ็ก Plus'}</span></div></div>
  <div class="filters" style="margin-bottom:8px">${f('all', 'ทั้งหมด <span class="cnt">' + vis.length + '</span>')}${chBtn('web', 'หน้าร้าน')}${chBtn('line', 'LINE')}${chBtn('fb', 'Facebook')}</div>
  <div class="filters" style="margin-bottom:12px">${f('unread', 'ยังไม่อ่าน')}${f('mine', 'มีผู้รับผิดชอบ')}</div>
  <div class="chatwrap card">
    <div class="clist">${list.map(x => `<button class="citem ${x.id === chatSel ? 'on' : ''}" onclick="chatSel='${x.id}';route()"><div class="row between"><b>${esc(x.name)}</b><span class="xs muted">${x.msgs.length ? x.msgs[x.msgs.length - 1].at : ''}</span></div><div class="row between" style="margin-top:4px"><span class="small muted cprev">${x.msgs.length ? (x.msgs[x.msgs.length - 1].me ? 'คุณ: ' : '') + esc(x.msgs[x.msgs.length - 1].t) : ''}</span>${x.unread && !x.closed ? `<span class="bd2">${x.unread}</span>` : ''}</div><div class="row" style="gap:4px;margin-top:6px"><span class="chip ${CHAT_CH[x.ch][1]}">${CHAT_CH[x.ch][0]}</span>${x.closed ? '<span class="chip">ปิดแล้ว</span>' : ''}</div></button>`).join('') || '<p class="muted small" style="padding:16px">ไม่มีห้องแชท</p>'}</div>
    ${th ? `<div class="cthread">
      <div class="chead"><div><b>${esc(th.name)}</b> <span class="chip ${CHAT_CH[th.ch][1]}">${CHAT_CH[th.ch][0]}</span><div class="xs muted">ผู้รับผิดชอบ: ${th.owner || '— ยังไม่มี'}</div></div><div class="row"><button class="btn btn-w btn-sm" onclick="(S.chats.find(x=>x.id==='${th.id}')).owner='คุณ (${ROLES[S.role][0]})';save();route()">รับเรื่อง</button><button class="btn btn-w btn-sm" onclick="const t=S.chats.find(x=>x.id==='${th.id}');t.closed=!t.closed;save();route()">${th.closed ? 'เปิดห้องใหม่' : 'ปิดห้อง'}</button></div></div>
      <div class="cmsgs" id="cmsgs">${th.msgs.map(m => `<div class="cm ${m.me ? 'me' : ''}"><div class="cb">${esc(m.t)}</div><span class="xs muted">${m.at}</span></div>`).join('')}</div>
      <div class="cquick">${QUICK.map(q => `<button class="fbtn2" onclick="chatSend(this.textContent)">${q}</button>`).join('')}</div>
      <div class="cinput"><button class="btn btn-w btn-sm" onclick="toast('แนบรูปแล้ว (ตัวอย่าง)')">รูป</button><button class="btn btn-w btn-sm" onclick="chatSend('แนะนำสินค้า: นีออน หัวเชื้อสลายคราบ ฿499 — สั่งได้ที่ mdcleancar/p1')">แนบสินค้า</button><input class="input" id="cin" placeholder="พิมพ์ข้อความ..." onkeydown="if(event.key==='Enter')chatSend(this.value)"><button class="btn btn-o" onclick="chatSend(document.getElementById('cin').value)">ส่ง</button></div>
    </div>
    <div class="cside">
      ${c ? `<div class="row" style="gap:10px">${av(c, 40)}<div><b>${esc(c.name)}</b><div class="xs muted">${c.id} · ${c.region}</div></div></div>
        <div class="small" style="margin-top:12px;display:grid;gap:6px"><div class="row between"><span class="muted">ยอดซื้อ</span><b class="num">${baht(cs.spend)}</b></div><div class="row between"><span class="muted">คำสั่งซื้อล่าสุด</span><b>${cs.last ? cs.last.id : '-'}</b></div><div class="row between"><span class="muted">รอบเติมถัดไป</span><b>${cs.due ? thd(cs.due) : '-'}</b></div></div>
        <button class="btn btn-w btn-sm" style="width:100%;margin-top:12px" onclick="openCust('${c.id}')">เปิด Customer 360</button>` : `<b>${esc(th.name)}</b><div class="xs muted" style="margin-top:4px">ยังไม่ได้เป็นสมาชิก</div><a class="btn btn-w btn-sm" style="width:100%;margin-top:12px" href="#/admin/dealers">ดูลีดตัวแทน</a>`}
      <label class="lb" style="margin-top:16px">Internal note <span class="muted" style="font-weight:400">(ลูกค้าไม่เห็น)</span></label>
      <textarea class="input" rows="3" onchange="(S.chats.find(x=>x.id==='${th.id}')).note=this.value;save()">${esc(th.note)}</textarea>
    </div>` : ''}
  </div>`;
}

/* --- sponsor (Grandprix structure) --- */
function sponArt(sp) { return `<div class="spart" style="background:${sp.color}"><b>${esc(sp.brand)}</b></div>`; }
function sponRev(sp) { return sp.model === 'CPC' ? Math.min(sp.clk * sp.rate, sp.budget || Infinity) : Math.round(sp.sales * sp.rate / 100); }
let spD = null, soD = null;
function openSpon() { spD = {org:S.sponsorOrgs[0].id, name:'', price:'', url:'', model:'CPC', rate:4, budget:2000}; sponModal(); }
function sponModal() {
  const o = S.sponsorOrgs.find(x => x.id === spD.org);
  modal(`<div class="pad" style="padding:22px"><div class="row between"><h3 style="font-size:19px">+ เพิ่มสินค้าแนะนำ</h3><button class="x" onclick="closeLayer()" aria-label="ปิด">×</button></div>
    <label class="lb" style="margin-top:14px">สปอนเซอร์</label><div class="row"><select class="input" onchange="spD.org=this.value;sponModal()">${S.sponsorOrgs.map(x => `<option value="${x.id}" ${spD.org === x.id ? 'selected' : ''}>${esc(x.name)}</option>`).join('')}</select><button class="btn btn-w btn-sm" onclick="openSponsorNew(true)">+ เพิ่มสปอนเซอร์</button></div>
    <label class="lb" style="margin-top:12px">ชื่อสินค้า</label><input class="input" value="${esc(spD.name)}" placeholder="เช่น ถุงมือไมโครไฟเบอร์ล้างรถ" oninput="spD.name=this.value">
    <div class="g2e" style="gap:12px;margin-top:12px"><div><label class="lb">ราคาที่ร้านสปอนเซอร์ (฿)</label><input class="input" type="number" value="${spD.price}" oninput="spD.price=this.value"></div><div><label class="lb">ลิงก์ร้านสปอนเซอร์</label><input class="input" value="${esc(spD.url)}" placeholder="${o ? o.domain : 'shop.example'}" oninput="spD.url=this.value"></div></div>
    <label class="lb" style="margin-top:12px">รูปแบบการเก็บเงิน</label><div class="row">${[['CPC', 'CPC · ต่อคลิก'], ['CPS', 'CPS · % ยอดขาย']].map(([k, n]) => `<button class="opt ${spD.model === k ? 'on' : ''}" onclick="spD.model='${k}';spD.rate=${k === 'CPC' ? 4 : 6};sponModal()"><b>${n}</b></button>`).join('')}</div>
    <div class="g2e" style="gap:12px;margin-top:12px"><div><label class="lb">${spD.model === 'CPC' ? 'ราคาต่อคลิก (฿)' : 'ค่าคอมมิชชัน (%)'}</label><input class="input" type="number" value="${spD.rate}" oninput="spD.rate=+this.value"></div>${spD.model === 'CPC' ? `<div><label class="lb">งบต่อเดือน (฿)</label><input class="input" type="number" value="${spD.budget}" oninput="spD.budget=+this.value"></div>` : ''}</div>
    <div class="row" style="justify-content:flex-end;margin-top:16px"><button class="btn btn-w btn-sm" onclick="closeLayer()">ยกเลิก</button><button class="btn btn-o btn-sm" onclick="saveSpon()">เพิ่มและเริ่มแสดง</button></div></div>`);
}
function saveSpon() {
  if (!spD.name.trim() || !(+spD.price)) { toast('ใส่ชื่อสินค้าและราคาก่อน'); return; }
  const o = S.sponsorOrgs.find(x => x.id === spD.org);
  S.sponsors.push({id:'sp' + Date.now(), brand:o.name, color:o.color, name:spD.name.trim(), price:+spD.price, model:spD.model, rate:+spD.rate, imp:0, clk:0, sales:0, orders:0, budget:spD.model === 'CPC' ? +spD.budget : 0, url:spD.url || o.domain, on:true});
  save(); closeLayer(); route(); toast('เพิ่มสินค้าแนะนำแล้ว — แสดงในหน้าร้านทันที');
}
function openSponsorNew(back) { soD = {back:!!back, name:'', contact:'', email:'', domain:'', cat:''}; sponsorNewModal(); }
function sponsorNewModal() {
  modal(`<div class="pad" style="padding:22px"><div class="row between"><h3 style="font-size:19px">${I.users} เพิ่มสปอนเซอร์</h3><button class="x" onclick="${soD.back ? 'sponModal()' : 'closeLayer()'}" aria-label="ปิด">×</button></div>
    <label class="lb" style="margin-top:14px">ชื่อแบรนด์</label><input class="input" value="${esc(soD.name)}" placeholder="เช่น GloveMax" oninput="soD.name=this.value">
    <div class="g2e" style="gap:12px;margin-top:12px"><div><label class="lb">ผู้ติดต่อ</label><input class="input" value="${esc(soD.contact)}" oninput="soD.contact=this.value"></div><div><label class="lb">อีเมล</label><input class="input" value="${esc(soD.email)}" oninput="soD.email=this.value"></div></div>
    <div class="g2e" style="gap:12px;margin-top:12px"><div><label class="lb">เว็บไซต์ร้าน</label><input class="input" value="${esc(soD.domain)}" placeholder="glovemax.example" oninput="soD.domain=this.value"></div><div><label class="lb">หมวดสินค้า</label><input class="input" value="${esc(soD.cat)}" placeholder="อุปกรณ์ล้างรถ" oninput="soD.cat=this.value"></div></div>
    <p class="muted xs" style="margin:10px 0 0">เลือกเฉพาะแบรนด์ที่ขายสินค้าใช้คู่กับน้ำยา MD และไม่แข่งกับสินค้าของแบรนด์เอง</p>
    <div class="row" style="justify-content:flex-end;margin-top:16px"><button class="btn btn-w btn-sm" onclick="${soD.back ? 'sponModal()' : 'closeLayer()'}">ยกเลิก</button><button class="btn btn-o btn-sm" onclick="saveSponsor()">บันทึกสปอนเซอร์</button></div></div>`);
}
function saveSponsor() {
  if (!soD.name.trim()) { toast('ใส่ชื่อแบรนด์ก่อน'); return; }
  const cols = ['#0EA5E9', '#16A34A', '#9333EA', '#EA580C', '#0F766E'];
  const o = {id:'so' + Date.now(), name:soD.name.trim(), contact:soD.contact || '—', email:soD.email || '—', domain:soD.domain || soD.name.trim().toLowerCase().replace(/\s+/g, '') + '.example', cat:soD.cat || '—', color:cols[S.sponsorOrgs.length % cols.length]};
  S.sponsorOrgs.push(o); save(); toast(`บันทึกสปอนเซอร์ ${esc(o.name)} แล้ว`);
  if (soD.back) { spD.org = o.id; sponModal(); } else { closeLayer(); route(); }
}
function aSponsor() {
  if (!isPlus()) return plusGate('sponsor');
  const on = S.sponsors.filter(x => x.on), imp = S.sponsors.reduce((t, x) => t + x.imp, 0), clk = S.sponsors.reduce((t, x) => t + x.clk, 0);
  const cps = S.sponsors.filter(x => x.model === 'CPS'), rev = S.sponsors.reduce((t, x) => t + sponRev(x), 0);
  return `<div class="ph-h"><div><h1>สินค้าแนะนำจากสปอนเซอร์ <span class="chip k" style="font-style:normal;vertical-align:middle">PLUS</span></h1><span class="muted">นำสินค้าแบรนด์พาร์ทเนอร์ที่ใช้คู่กับน้ำยา MD มาแสดงในหน้าร้าน แล้วพาลูกค้าไปซื้อที่ร้านพาร์ทเนอร์ · เก็บเงินแบบ CPC หรือ CPS (รูปแบบอื่นคุยเพิ่มได้)</span></div><div class="row"><a class="btn btn-w btn-sm" href="#/store" onclick="setTimeout(()=>{const e=document.getElementById('sponsored');e&&e.scrollIntoView({behavior:'smooth'})},400)">ดูในหน้าร้าน</a><button class="btn btn-w btn-sm" onclick="openSponsorNew()">${I.users} เพิ่มสปอนเซอร์</button><button class="btn btn-o btn-sm" onclick="openSpon()">+ เพิ่มสินค้าแนะนำ</button></div></div>
  <div class="kpis">
    <div class="kpi"><span class="lb">สินค้าที่แสดงอยู่</span><b>${on.length} / ${S.sponsors.length}</b><span class="small muted">${S.sponsorOrgs.length} สปอนเซอร์</span></div>
    <div class="kpi"><span class="lb">แสดงผล · คลิก</span><b class="num">${imp.toLocaleString()} · ${clk.toLocaleString()}</b><span class="small muted">CTR ${imp ? (clk / imp * 100).toFixed(1) : '0.0'}%</span></div>
    <div class="kpi"><span class="lb">ยอดขายที่ร้านสปอนเซอร์ (CPS)</span><b class="num">${baht(cps.reduce((t, x) => t + x.sales, 0))}</b><span class="small muted">${cps.reduce((t, x) => t + x.orders, 0)} รายการ · จากสคริปต์บนเว็บสปอนเซอร์</span></div>
    <div class="kpi"><span class="lb">รายได้จากสปอนเซอร์ เดือนนี้</span><b class="num">${baht(rev)}</b><span class="small muted">MD ได้ ${baht(rev * 0.8)} · แพลตฟอร์ม 20% ${baht(rev * 0.2)}</span></div>
  </div>
  <div class="g2e" style="margin-bottom:16px">
    <div class="card pad"><b>CPC · Cost per click</b><p class="small muted" style="margin:6px 0 0">สปอนเซอร์จ่ายต่อคลิกที่พาไปร้าน เช่น 3–5 ฿/คลิก · ตั้งงบต่อเดือน หยุดแสดงเองเมื่อครบงบ · นับ 1 คลิก/คน/สินค้า/24 ชม. กันคลิกปั๊ม</p></div>
    <div class="card pad"><b>CPS · Cost per sale</b><p class="small muted" style="margin:6px 0 0">สปอนเซอร์จ่าย % เฉพาะยอดที่ขายได้จริง · เว็บสปอนเซอร์ติดสคริปต์ติดตามยอดขาย ส่งยอดกลับพร้อมรหัสคลิก</p></div>
  </div>
  <div class="card"><div class="tbl-wrap"><table class="t">
    <thead><tr><th>สินค้าแนะนำ</th><th>รูปแบบ</th><th>แสดงผล / คลิก</th><th>ยอดขาย</th><th>งบ</th><th style="text-align:right">รายได้</th><th>แสดง</th></tr></thead>
    <tbody>${S.sponsors.map((x, i) => `<tr class="${x.on ? '' : 'off'}">
      <td class="prod" style="min-width:250px"><div class="row" style="gap:10px">${sponArt(x)}<div><b>${esc(x.name)}</b><div class="muted xs">${esc(x.brand)} · ${baht(x.price)} · ${esc(x.url)}</div></div></div></td>
      <td><span class="chip ${x.model === 'CPC' ? 'blue' : 'neon'}">${x.model} · ${x.model === 'CPC' ? '฿' + x.rate + '/คลิก' : x.rate + '%'}</span></td>
      <td class="num">${x.imp.toLocaleString()} / ${x.clk.toLocaleString()}<div class="muted xs">CTR ${x.imp ? (x.clk / x.imp * 100).toFixed(1) : '0.0'}%</div></td>
      <td class="num">${x.model === 'CPS' ? baht(x.sales) + `<div class="muted xs">${x.orders} รายการ</div>` : '—'}</td>
      <td class="num small">${x.budget ? baht(sponRev(x)) + ' / ' + baht(x.budget) : 'ไม่จำกัด'}</td>
      <td class="num" style="text-align:right"><b>${baht(sponRev(x))}</b></td>
      <td><button class="toggle ${x.on ? 'on' : ''}" onclick="S.sponsors[${i}].on=!S.sponsors[${i}].on;save();route()" aria-label="เปิดปิด"></button></td></tr>`).join('')}</tbody></table></div></div>
  <div class="card pad" style="margin-top:16px"><div class="row between"><b>สปอนเซอร์ (${S.sponsorOrgs.length})</b><button class="btn btn-w btn-sm" onclick="openSponsorNew()">+ เพิ่มสปอนเซอร์</button></div><p class="muted xs" style="margin:4px 0 12px">ทีมเพิ่มให้ก่อน · ใช้เป็นตัวเลือกตอนเพิ่มสินค้าแนะนำ</p>
    <div class="sorgs">${S.sponsorOrgs.map(o => { const its = S.sponsors.filter(x => x.brand === o.name); return `<div class="sorg"><span class="av" style="background:${o.color}">${esc(o.name[0])}</span><div class="grow"><b>${esc(o.name)}</b><div class="muted xs">${esc(o.contact)} · ${esc(o.email)}</div><div class="muted xs">${esc(o.cat)}</div></div><div class="small" style="text-align:right">${its.length} สินค้า<div class="num"><b>${baht(its.reduce((t, x) => t + sponRev(x), 0))}</b></div></div></div>`; }).join('')}</div></div>`;
}
function sponClick(id) { const x = S.sponsors.find(s => s.id === id); x.clk++; save(); toast(`พาไปร้าน ${esc(x.brand)} (${esc(x.url)}) · demo จำลอง · นับคลิกแล้ว`); }
function sponsoredHTML() {
  if (!isPlus()) return '';
  const on = S.sponsors.filter(x => x.on && (!x.budget || sponRev(x) < x.budget)); if (!on.length) return '';
  on.forEach(x => x.imp++);
  return `<div class="sec-h" id="sponsored"><h3>สินค้าแนะนำจากสปอนเซอร์</h3><span class="muted small">ใช้คู่กับน้ำยา MD · ซื้อที่ร้านพาร์ทเนอร์</span></div>
    <div class="grid-p">${on.map(x => `<div class="pc spc" onclick="sponClick('${x.id}')"><div class="ph">${sponArt(x)}<span class="chip spad">สปอนเซอร์</span></div><div class="bd"><span class="muted xs">${esc(x.brand)}</span><span class="nm">${esc(x.name)}</span><span class="pr">${baht(x.price)}</span><span class="pts" style="color:var(--g6)">ไปที่ร้าน ${esc(x.url)} ↗</span></div></div>`).join('')}</div>`;
}

/* --- billing (Grandprix structure) --- */
const MERCH_TIERS = [[0, 250000, .05], [250000, 500000, .04], [500000, Infinity, .03]];
const BILL_BASE = 186400, BILL_PREV = [['ส.ค. 2026', 3050], ['ก.ย. 2026', 3490]];
const BASIC_MODS = [['ลูกค้า', 'รายชื่อ · Top spender · Customer 360 · ระดับสมาชิก & แต้ม'], ['กลุ่มลูกค้า', '9 กลุ่มสำเร็จรูป + สร้างเอง'], ['สินค้า & คลังสินค้า', 'ตัวเลือก · สต็อกกลาง · หมวดหมู่ · รอบใช้งาน'], ['คำสั่งซื้อ & การจัดส่ง', 'เปลี่ยนสถานะ · คืนเงิน · ใส่เลขพัสดุเอง'], ['แชทหน้าร้าน', 'ลูกค้าทักในร้านค้า'], ['ส่วนลด & โปรโมชัน', 'โค้ดส่วนลด · โปรอัตโนมัติ'], ['เชื่อม LINE OA', 'LINE Login · rich menu · ใบยืนยัน/สถานะเข้า LINE']];
const PLUS_MODS = [['แคมเปญ + ออโตเมชัน', 'LINE OA · SMS · อีเมล (EDM) · เตือนเติมน้ำยาอัตโนมัติ · วัดผลถึงยอดขาย'], ['สินค้าแนะนำจากสปอนเซอร์', 'Product leasing · CPC / CPS'], ['แชทรวมทุกช่องทาง', 'หน้าร้าน + LINE + Facebook ในหน้าเดียว'], ['ติดตามพัสดุอัตโนมัติ', 'API Flash · Kerry · J&T'], ['ตัวแทน & คาร์แคร์ (B2B)', 'ระดับราคา · เป้า vs ยอด · ลีดตัวแทน / OEM']];
const PLAN_Q = {Basic:{users:5, contacts:10000, gb:10, email:10000}, Plus:{users:15, contacts:50000, gb:50, email:50000}};
const liveOnline = () => S.orders.filter(o => (o.ch === 'web' || o.ch === 'line') && o.date >= '2026-10-01').reduce((t, o) => t + lineTotal(o), 0);
function merchFee(v) { let f = 0; MERCH_TIERS.forEach(([a, b, r]) => { if (v > a) f += (Math.min(v, b) - a) * r; }); return Math.round(f); }
function aBilling() {
  const tier = S.plan, Q = PLAN_Q[tier], ytd = BILL_BASE + liveOnline(), fee = merchFee(ytd);
  const prevFee = BILL_PREV.reduce((a, x) => a + x[1], 0), octFee = Math.max(0, fee - prevFee), diff = S.planUp ? (PLAN_M.Plus - PLAN_M.Basic) * CYEAR.left : 0;
  const quota = [['ผู้ใช้หลังบ้าน', 4, Q.users, '', '+1 = 250 ฿/เดือน'], ['รายชื่อลูกค้า', 8412 + S.customers.length, Q.contacts, '', '+10,000 = 800 ฿'], ['พื้นที่ไฟล์', 3.2, Q.gb, ' GB', '+25 GB = 300 ฿'], ['อีเมลเดือนนี้', 1840 + S.campaigns.filter(c => c.ch === 'email' && c.status === 'sent').reduce((a, c) => a + c.sent, 0), Q.email, '', '']];
  const inv = [...(diff ? [['ต.ค. 2026', `ส่วนต่างอัปเกรด Plus (${CYEAR.left} เดือนที่เหลือ)`, diff, 0]] : []), ['ต.ค. 2026', 'ค่าบริการจากยอดขายออนไลน์', octFee, 0], ...BILL_PREV.slice().reverse().map(x => [x[0], 'ค่าบริการจากยอดขายออนไลน์', x[1], 1]), [CYEAR.start, `ค่าแพ็ก ${S.planUp ? 'Basic' : tier} รายปี (${CYEAR.start} – ${CYEAR.end})`, PLAN_Y(S.planUp ? 'Basic' : tier), 1]];
  const card = v => { const on = tier === v, mods = v === 'Basic' ? BASIC_MODS : [['ทุกอย่างใน Basic', '+ โควตาใหญ่ขึ้น (ผู้ใช้ 15 · รายชื่อ 50,000 · 50 GB)'], ...PLUS_MODS];
    const btn = on ? `<span class="chip ok">ใช้อยู่${S.planDown && v === 'Plus' ? ' ถึง ' + CYEAR.end : ''}</span>${S.planDown && v === 'Plus' ? `<button class="btn btn-w btn-sm" onclick="setPlan('Plus')">ยกเลิกการลดแพ็ก</button>` : ''}` : v === 'Basic' && S.planDown ? `<span class="chip warn">ต่ออายุ ${CYEAR.renew}</span>` : `<button class="btn ${v === 'Plus' ? 'btn-o' : 'btn-w'} btn-sm" onclick="setPlan('${v}')">${v === 'Plus' ? 'อัปเกรด Plus' : 'ลดเป็น Basic' + (S.planUp ? '' : ' (ตอนต่ออายุ)')}</button>`;
    return `<div class="pk ${on ? 'on' : ''}"><div class="row wrap" style="gap:8px"><h3 style="font-size:18px">${v}</h3>${v === 'Plus' ? '<span class="chip k">PLUS</span>' : ''}<span class="grow"></span>${btn}</div><div class="pkp">${baht(PLAN_Y(v))}<small>/ปี · เฉลี่ย ${baht(PLAN_M[v])}/เดือน</small></div><ul>${mods.map(([n, d]) => `<li>✓ <span><b>${n}</b><small>${d}</small></span></li>`).join('')}</ul></div>`; };
  return `<div class="ph-h"><div><h1>ยอดใช้งานและค่าบริการ</h1><span class="muted">แบรนด์เปิดดูเองได้ตลอด — ตัวเลขชุดเดียวกับที่ใช้วางบิล ไม่ต้องเถียงกันตอนสิ้นงวด</span></div><button class="btn btn-w btn-sm" onclick="toast('Export ใบแจ้งหนี้ / ยอดใช้งาน (ตัวอย่าง)')">Export</button></div>
  <div class="note" style="margin-bottom:14px">ราคาในหน้านี้ใช้ชุดเดียวกับ demo Grandprix เป็นตัวอย่าง · รอกำหนดราคาจริงสำหรับ MD Clean Car</div>
  <div class="kpis">
    <div class="kpi dark"><span class="lb">แพ็กปัจจุบัน · สัญญารายปี</span><b>CRM ${tier}</b><span class="small">${baht(PLAN_Y(tier))}/ปี · เฉลี่ย ${baht(PLAN_M[tier])}/เดือน</span></div>
    <div class="kpi"><span class="lb">ยอดขายออนไลน์สะสมปีนี้</span><b class="num">${baht(ytd)}</b></div>
    <div class="kpi"><span class="lb">ค่าบริการร้านค้าสะสม</span><b class="num">${baht(fee)}</b></div>
    <div class="kpi warnk"><span class="lb">ใบแจ้งหนี้ ต.ค. 2026</span><b class="num">${baht(octFee + diff)}</b><span class="small muted">รอชำระ · ค่าแพ็กชำระรายปีแล้ว</span></div>
  </div>
  <div class="card pad"><b>แพ็กเกจ</b><div class="pk2">${card('Basic')}${card('Plus')}</div>
    ${S.planUp || S.planDown ? `<div class="note" style="margin-top:12px">${S.planUp ? `อัปเกรดเป็น Plus กลางปี · จ่าย Basic ทั้งปี + ส่วนต่าง ${baht(diff)} (${CYEAR.left} เดือนที่เหลือ)` : `ลดเป็น Basic ตอนต่ออายุ ${CYEAR.renew} · ใช้ Plus ได้ถึง ${CYEAR.end} · ปีนี้ยังคิด Plus เต็มปี (ไม่คืนเงิน)`}</div>` : ''}
    <p class="muted xs" style="margin:12px 0 0">สัญญารายปี ${CYEAR.start} – ${CYEAR.end} · อัปเกรดกลางปีจ่ายส่วนต่างตามเดือนที่เหลือ · ลดจาก Plus เป็น Basic กลางปี ปีนั้นยังคิด Plus เต็มปี (ไม่คืนเงิน) · ใช้ฟีเจอร์ Plus ได้ถึงวันต่ออายุ แล้วเป็น Basic</p></div>
  <div class="g2e" style="margin-top:14px">
    <div class="card pad"><b>โควตาแพ็ก ${tier}</b>${quota.map(([n, u, m, unit, buy]) => `<div class="quota"><span>${n}</span><span class="bar"><i style="width:${Math.max(2, Math.min(100, u / m * 100))}%;background:${u / m > .8 ? '#D97706' : 'var(--ink)'}"></i></span><b class="num">${u.toLocaleString()} / ${m.toLocaleString()}${unit}</b>${buy ? `<button class="btn btn-w btn-sm" onclick="toast('ซื้อเพิ่ม ${buy} — ตัวอย่าง')">ซื้อเพิ่ม <span class="muted xs">${buy}</span></button>` : '<span></span>'}</div>`).join('')}<p class="muted xs" style="margin:8px 0 0">พื้นที่เต็มแล้วไม่มีข้อมูลหาย — แค่อัปโหลดไฟล์ใหม่ไม่ได้จนกว่าจะเพิ่มพื้นที่</p></div>
    <div class="card pad"><b>ค่าบริการจากยอดขายออนไลน์ (ขั้นบันได)</b><div class="tierv">${MERCH_TIERS.map(([f, to, r]) => { const inT = Math.max(0, Math.min(ytd, to) - f), act = ytd > f && ytd <= to; return `<div class="${act ? 'act' : ''}"><span>${f.toLocaleString()} – ${to === Infinity ? 'ขึ้นไป' : to.toLocaleString()}</span><b>${r * 100}%</b>${inT ? `<span class="muted xs num">${inT.toLocaleString()} · ${baht(inT * r)}</span>` : ''}</div>`; }).join('')}</div>
      <p class="muted xs" style="margin:8px 0 0">คิดตั้งแต่บาทแรกแบบขั้นบันได — แต่ละขั้นคิดเฉพาะยอดในขั้นนั้น · วางบิลรายเดือนตามยอดจริง · ฐาน = ยอดที่ลูกค้าจ่ายผ่านเว็บ/LINE รวมค่าส่ง หักส่วนลดและคืนเงิน · ไม่รวมยอดขายส่งตัวแทน · เดือนนี้รวมออเดอร์ที่สร้างใน demo (${baht(liveOnline())})</p></div>
  </div>
  <div class="card pad" style="margin-top:14px"><b>ใบแจ้งหนี้</b><div class="tbl-wrap"><table class="t" style="margin-top:8px"><thead><tr><th>รอบ</th><th>รายการ</th><th style="text-align:right">ยอด</th><th>สถานะ</th></tr></thead><tbody>${inv.map(([mo, n, f, paid]) => `<tr><td>${mo}</td><td>${n}</td><td class="num" style="text-align:right"><b>${baht(f)}</b></td><td><span class="chip ${paid ? 'ok' : 'warn'}">${paid ? 'ชำระแล้ว' : 'รอชำระ'}</span></td></tr>`).join('')}</tbody></table></div>
    <div class="note" style="margin-top:10px">ค่าธรรมเนียม payment gateway และค่าแพ็กเกจ LINE OA / SMS แบรนด์จ่ายตรงกับผู้ให้บริการ ไม่รวมในบิลนี้ · ไม่มีค่าติดตั้งระบบ</div></div>
  <div class="card pad" style="margin-top:14px"><b>ที่มาของตัวเลข</b><table class="t" style="margin-top:8px"><tbody>
    <tr><td class="muted small" style="width:180px">นับจาก</td><td class="small">ยอดที่ลูกค้าจ่ายของออเดอร์เว็บ/LINE ที่ชำระสำเร็จ รวมค่าส่ง หักส่วนลดและคืนเงิน (ออเดอร์ที่ยกเลิก = คืนเงินครบ → ไม่นับ)</td></tr>
    <tr><td class="muted small">ไม่นับ</td><td class="small">ยอดขายส่งตัวแทน · ยอดขายที่ร้านสปอนเซอร์</td></tr>
    <tr><td class="muted small">ลูกค้าในระบบตอนนี้ (demo)</td><td class="small">${S.customers.length} คน · ${ordList().length} คำสั่งซื้อ</td></tr>
    <tr><td class="muted small">รอบวางบิล</td><td class="small">ค่าแพ็ก: ปีละครั้ง · ค่าบริการร้านค้า: รายเดือนตามยอดจริง · ดูย้อนหลังและ export ได้</td></tr></tbody></table></div>`;
}

/* --- dashboard --- */
function aDash() {
  const all = S.customers.map(c => ({c, s:st(c)}));
  const sold = S.orders;
  const sales = sold.reduce((s, o) => s + lineTotal(o), 0);
  const by = {}; sold.forEach(o => by[o.ch] = (by[o.ch] || 0) + lineTotal(o));
  const chOrder = ['dealer','line','web'].filter(k => by[k]);
  const repeat = all.filter(x => x.s.n >= 2).length;
  const linked = S.customers.filter(c => c.line).length;
  const refill = segMembers(SEGMENTS[0]).length, noLink = segMembers(SEGMENTS[1]).length, wb = segMembers(SEGMENTS[5]).length, dd = segMembers(SEGMENTS[7]).length;
  const newLeads = S.leads.filter(l => l.status === 'ใหม่').length;
  const top = all.sort((a, b) => b.s.spend - a.s.spend).slice(0, 6);
  return `<div class="ph-h"><div><h1>ภาพรวม</h1><span class="muted">ทุกช่องทาง · ปี 2026 · ข้อมูลตัวอย่าง</span></div><div class="row"><button class="btn btn-w btn-sm" onclick="toast('Export CSV (จำลอง)')">Export</button><a class="btn btn-o btn-sm" href="#/admin/campaigns/new">+ สร้างแคมเปญ</a></div></div>
  <div class="kpis">
    <div class="kpi"><span class="lb">ยอดขายรวม (แบรนด์)</span><b class="num">${baht(sales)}</b><span class="small muted">${sold.length} คำสั่งซื้อ</span></div>
    <div class="kpi"><span class="lb">ลูกค้าในระบบ</span><b class="num">${S.customers.length}</b><span class="small muted">ทั่วไป ${S.customers.filter(c => c.type === 'b2c').length} · คาร์แคร์ ${S.customers.filter(c => c.type === 'carcare').length} · ตัวแทน ${S.customers.filter(c => c.type === 'dealer').length}</span></div>
    <div class="kpi"><span class="lb">อัตราซื้อซ้ำ</span><b class="num">${Math.round(repeat / S.customers.length * 100)}%</b><span class="small muted">${repeat} คน ซื้อ 2 ครั้งขึ้นไป</span></div>
    <div class="kpi"><span class="lb">ผูก LINE แล้ว (ติดต่อตรงได้)</span><b class="num">${Math.round(linked / S.customers.length * 100)}%</b><span class="small muted">${linked} / ${S.customers.length} คน</span></div>
  </div>
  <div class="g2">
    <div style="display:grid;gap:16px;align-content:start">
      <div class="card pad">
        <div class="row between"><h3 style="font-size:16px">ยอดขายแยกตามช่องทาง</h3><span class="muted small">รวม ${baht(sales)}</span></div>
        <div class="stack" style="margin-top:14px">${chOrder.map(k => `<i style="flex:${by[k]};background:${CH[k][2]}" title="${CH[k][0]}"></i>`).join('')}</div>
        <div class="legend">${chOrder.map(k => `<div><i style="background:${CH[k][2]}"></i><span class="grow">${CH[k][0]}</span><b class="num">${baht(by[k])}</b><span class="muted small num" style="width:40px;text-align:right">${Math.round(by[k] / sales * 100)}%</span></div>`).join('')}</div>
      </div>
      <div class="insight">
        <div class="row" style="gap:6px"><span class="chip" style="background:#B8F227;color:#111">Insight</span><span class="xs" style="color:#B4B8BE">ลูกค้าปลีก (B2C)</span></div>
        <h3 style="font-size:19px;margin:10px 0 6px">${noLink} คนซื้อแล้วแต่ยังไม่ผูก LINE · ผูกแล้ว ${linked} คน</h3>
        <p class="small" style="color:#C9CDD3;margin:0 0 12px">ลูกค้ากลุ่มนี้ติดต่อได้แค่ SMS / อีเมล ซึ่งแพงกว่าและวัดผลยากกว่า LINE · ชวนผูก LINE รับ 50 แต้ม แล้วใช้การเตือนเติมน้ำยาทาง LINE ดึงให้ซื้อซ้ำ</p>
        <div class="row wrap"><a class="btn btn-o btn-sm" href="#/admin/campaigns/new?seg=nolink">ยิง SMS ชวนผูก LINE</a><a class="btn btn-sm" style="border:1px solid #4B5058;color:#fff" href="#/admin/segments">ดูกลุ่มลูกค้า</a></div>
      </div>
    </div>
    <div style="display:grid;gap:16px;align-content:start">
      <div class="card">
        <div class="ch-h"><h3>สิ่งที่ต้องทำวันนี้</h3></div>
        ${[
          ...(shipList().filter(x => x.dstat === 'รอแพ็ก').length ? [[I.ship, '#FEF3C7', '#92400E', `รอแพ็ก ${shipList().filter(x => x.dstat === 'รอแพ็ก').length} รายการ`, shipList().filter(x => x.dstat === 'รอแพ็ก').map(x => x.id).slice(0, 3).join(' · '), '#/admin/delivery', 'การจัดส่ง']] : []),
          ...(S.chats.reduce((t, c) => t + (c.closed ? 0 : c.unread), 0) ? [[I.msg, '#DBEAFE', '#1E40AF', `แชทยังไม่อ่าน ${S.chats.reduce((t, c) => t + (c.closed ? 0 : c.unread), 0)}`, S.chats.filter(c => c.unread && !c.closed).map(c => c.name.split(' ')[0]).join(' · '), '#/admin/chat', 'แชท']] : []),
          ...(PRODUCTS.filter(p => (S.stock[p.id] || 0) <= LOW).length ? [[I.inv, '#FEE2E2', '#991B1B', `สินค้าใกล้หมด ${PRODUCTS.filter(p => (S.stock[p.id] || 0) <= LOW).length}`, PRODUCTS.filter(p => (S.stock[p.id] || 0) <= LOW).slice(0, 2).map(p => p.short + ' · เหลือ ' + (S.stock[p.id] || 0)).join(' · '), '#/admin/inventory', 'คลังสินค้า']] : []),
          [I.refill, '#F0FDC7', '#4D6B00', `ถึงรอบเติมน้ำยา ${refill} คน`, 'ออโตเมชันส่งการ์ดสั่งซ้ำให้แล้ว', '#/admin/segments', 'ดูกลุ่ม'],
          [I.handshake, '#FEF3C7', '#8A6100', `ลีดตัวแทน / OEM ใหม่ ${newLeads}`, 'ตอบกลับภายใน 24 ชม.', '#/admin/dealers', 'เปิด'],
          [I.dash, '#FEE2E2', '#991B1B', `ตัวแทนยอดลดลง ${dd} ราย`, 'ยอด 60 วันล่าสุดต่ำกว่าก่อนหน้า', '#/admin/dealers', 'ดู'],
          [I.user, '#E0E7FF', '#3730A3', `หายไปเกิน 90 วัน ${wb} คน`, 'ออโตเมชันดึงกลับยังปิดอยู่', '#/admin/automation', 'เปิดใช้'],
        ].map(([ic, bg, fg, t, d, h, a]) => `<div class="todo"><div class="ic" style="background:${bg};color:${fg}">${ic}</div><div class="grow"><b style="font-size:13.5px">${t}</b><div class="muted xs">${d}</div></div><a class="small" style="font-weight:600;color:var(--o-dk)" href="${h}">${a} →</a></div>`).join('')}
      </div>
      <div class="card">
        <div class="ch-h"><h3>Top ลูกค้า</h3><a class="small" style="color:var(--o-dk);font-weight:600" href="#/admin/customers">ดูทั้งหมด →</a></div>
        ${top.map((x, i) => `<div class="todo" style="cursor:pointer" onclick="openCust('${x.c.id}')"><span class="muted num" style="width:16px">${i + 1}</span>${av(x.c, 30)}<div class="grow"><b style="font-size:13px">${esc(x.c.name)}</b><div class="row" style="gap:4px;margin-top:2px">${typeChip(x.c)}${tierChip(x.s)}<span class="muted xs">${x.s.n} ออเดอร์</span></div></div><b class="num">${baht(x.s.spend)}</b></div>`).join('')}
      </div>
    </div>
  </div>`;
}

/* --- view engine (same as Grandprix: ลูกค้า · คำสั่งซื้อ · การจัดส่ง) --- */
const VTIER = ['Member', 'Silver', 'Gold', 'Platinum', 'B2B'];
const VTC = {Member:'#F1F5F9|#475569', Silver:'#DBEAFE|#1E40AF', Gold:'#FEF3C7|#8A6100', Platinum:'#EEFBC8|#4D6B00', B2B:'#2C3036|#FFFFFF'};
const VSTAT = [...ORD_FLOW, 'คืนเงินบางส่วน', 'คืนเงิน'];
function personTier(c, s) { return c.type !== 'b2c' ? 'B2B' : (S.tierOv && S.tierOv[c.id]) || (s || st(c)).tier.k; }
function vPersonRows() {
  return S.customers.map(c => { const s = st(c); return {id:c.id, name:c.name, tier:personTier(c, s), spend:s.spend, nOrders:s.n, chans:s.chans.map(k => CH[k][0]), type:TYPE[c.type][0], region:c.region, line:!!c.line, lineId:c.line || '—', consent:!!c.consent, last:s.last ? s.last.date : '', due:s.due ? iso(s.due) : '', email:c.email, phone:c.phone}; });
}
function vOrderRows() { return ordList().map(o => ({id:o.id, cust:cust(o.cid).name, custId:o.cid, status:ordStatus(o), total:lineTotal(o), ch:CH[o.ch][0], items:o.items.reduce((a, it) => a + it[1], 0), ship:isDeliv(o) ? 'จัดส่ง' : 'ส่งตรงตัวแทน', date:o.date})); }
const VOBJ = {
  person:{n:'ลูกค้า', rows:vPersonRows, title:r => r.name, edit:['tier', 'consent'], f:() => [
    {k:'name', l:'ชื่อ', t:'avatar'}, {k:'tier', l:'ระดับสมาชิก', t:'select', o:VTIER, c:VTC},
    {k:'spend', l:'ยอดใช้จ่าย', t:'money'}, {k:'nOrders', l:'จำนวนครั้งที่ซื้อ', t:'num'},
    {k:'chans', l:'ช่องทางที่ซื้อ', t:'multi', o:Object.values(CH).map(x => x[0])},
    {k:'type', l:'ประเภท', t:'select', o:Object.values(TYPE).map(x => x[0])},
    {k:'region', l:'จังหวัด', t:'select', o:[...new Set(S.customers.map(c => c.region))]},
    {k:'line', l:'เชื่อม LINE', t:'bool'}, {k:'lineId', l:'LINE ID', t:'text'},
    {k:'consent', l:'รับข่าวสาร', t:'bool'}, {k:'last', l:'ซื้อล่าสุด', t:'date'}, {k:'due', l:'รอบเติมถัดไป', t:'date'},
    {k:'email', l:'อีเมล', t:'text'}, {k:'phone', l:'เบอร์โทร', t:'text'}],
    views:[
      {id:'p1', name:'ลูกค้าทั้งหมด', type:'table', cols:['name', 'tier', 'spend', 'nOrders', 'chans', 'line', 'last'], filters:[], logic:'and', group:'', sort:'spend', dir:'desc'},
      {id:'p2', name:'ซื้อซ้ำ', type:'table', cols:['name', 'tier', 'spend', 'nOrders', 'chans', 'due'], filters:[{f:'nOrders', op:'>=', v:'2'}], logic:'and', group:'tier', sort:'spend', dir:'desc'},
      {id:'p3', name:'ระดับสมาชิก', type:'kanban', cols:['name', 'spend', 'chans'], filters:[], logic:'and', group:'', sort:'spend', dir:'desc', kb:'tier'},
      {id:'p4', name:'ยิงแคมเปญได้', type:'gallery', cols:['tier', 'spend', 'last'], filters:[{f:'consent', op:'=', v:'true'}], logic:'and', group:'', sort:'spend', dir:'desc'}]},
  order:{n:'คำสั่งซื้อ', rows:vOrderRows, title:r => r.id, edit:['status'], f:() => [
    {k:'id', l:'เลขที่', t:'code'}, {k:'cust', l:'ลูกค้า', t:'avatar'}, {k:'status', l:'สถานะ', t:'select', o:VSTAT, c:OSC},
    {k:'total', l:'ยอด', t:'money'}, {k:'ch', l:'ช่องทาง', t:'select', o:['เว็บไซต์', 'LINE', 'ตัวแทน / ขายส่ง']}, {k:'items', l:'จำนวนชิ้น', t:'num'},
    {k:'ship', l:'การรับของ', t:'select', o:['จัดส่ง', 'ส่งตรงตัวแทน']}, {k:'date', l:'วันที่', t:'date'}],
    views:[
      {id:'o1', name:'ออเดอร์ทั้งหมด', type:'table', cols:['id', 'cust', 'status', 'total', 'ch', 'date'], filters:[], logic:'and', group:'', sort:'date', dir:'desc'},
      {id:'o2', name:'สถานะงาน (Kanban)', type:'kanban', cols:['cust', 'total', 'ch'], filters:[], logic:'and', group:'', sort:'total', dir:'desc', kb:'status'},
      {id:'o3', name:'ต้องจัดส่ง', type:'table', cols:['id', 'cust', 'status', 'total', 'ship', 'date'], filters:[{f:'ship', op:'=', v:'จัดส่ง'}, {f:'status', op:'!=', v:'สำเร็จ'}], logic:'and', group:'status', sort:'date', dir:'asc'},
      {id:'o4', name:'ปฏิทินคำสั่งซื้อ', type:'calendar', cols:['id', 'cust', 'total'], filters:[], logic:'and', group:'', sort:'date', dir:'asc', cal:'date'}]},
  shipment:{n:'การจัดส่ง', rows:shipList, title:r => r.id, edit:['dstat', 'carrier', 'trk'], f:() => [
    {k:'id', l:'เลขที่', t:'code'}, {k:'cust', l:'ลูกค้า', t:'avatar'}, {k:'dstat', l:'สถานะจัดส่ง', t:'select', o:DSTAT, c:DSC},
    {k:'carrier', l:'ขนส่ง', t:'select', o:CARRIER}, {k:'trk', l:'เลขพัสดุ', t:'text'}, {k:'total', l:'ยอด', t:'money'},
    {k:'addr', l:'ปลายทาง', t:'text'}, {k:'date', l:'วันที่', t:'date'}],
    views:[
      {id:'s1', name:'คิวจัดส่ง (Kanban)', type:'kanban', cols:['cust', 'total', 'carrier'], filters:[], logic:'and', group:'', sort:'date', dir:'asc', kb:'dstat'},
      {id:'s2', name:'ทั้งหมด', type:'table', cols:['id', 'cust', 'dstat', 'carrier', 'trk', 'total', 'date'], filters:[], logic:'and', group:'', sort:'date', dir:'desc'},
      {id:'s3', name:'ค้างส่ง', type:'table', cols:['id', 'cust', 'dstat', 'carrier', 'trk', 'date'], filters:[{f:'dstat', op:'!=', v:'ส่งสำเร็จ'}], logic:'and', group:'dstat', sort:'date', dir:'asc'}]},
};
let vObj = 'person', custMode = 'list', vDraft = null, vSel = {}, vPopOpen = null, vQ = '', vCalOff = 0, topF = {ch:'', cat:'all', n:10, q:''}, topSel = {}, c360 = null;
function veS() { if (!S.ve || !S.ve.views || Array.isArray(S.ve.views)) S.ve = {views:{}, cur:{}}; Object.keys(VOBJ).forEach(k => { if (!S.ve.views[k]) S.ve.views[k] = JSON.parse(JSON.stringify(VOBJ[k].views)); if (!S.ve.cur[k]) S.ve.cur[k] = VOBJ[k].views[0].id; }); if (!S.tierOv) S.tierOv = {}; return S.ve; }
const vO = () => VOBJ[vObj];
const VF = () => vO().f();
const vFld = k => VF().find(x => x.k === k);
const vViews = () => veS().views[vObj];
const vView = () => vDraft || vViews().find(x => x.id === veS().cur[vObj]) || vViews()[0];
function vUse(obj) { if (vObj !== obj) { vObj = obj; vDraft = null; vSel = {}; vQ = ''; vPopOpen = null; } veS(); }
function vRows() {
  let r = vO().rows(); const v = vView();
  if (vQ) { const q = vQ.toLowerCase(); r = r.filter(x => Object.values(x).join(' ').toLowerCase().includes(q)); }
  const tests = v.filters.map(f => x => {
    const F = vFld(f.f); let a = x[f.f], b = f.v; if (!F) return true;
    if (F.t === 'bool') return (b === 'true') === !!a;
    if (F.t === 'multi') return f.op === 'has' ? (a || []).includes(b) : !(a || []).includes(b);
    if (F.t === 'money' || F.t === 'num') { a = +a; b = +b; }
    switch (f.op) { case '=': return a == b; case '!=': return a != b; case '>=': return a >= b; case '<=': return a <= b; case 'contains': return String(a || '').toLowerCase().includes(String(b).toLowerCase()); default: return true; }
  });
  if (tests.length) r = r.filter(x => v.logic === 'or' ? tests.some(t => t(x)) : tests.every(t => t(x)));
  if (v.sort) { const F = vFld(v.sort); r.sort((a, b) => { let x = a[v.sort], y = b[v.sort]; if (F && (F.t === 'money' || F.t === 'num')) { x = +x; y = +y; } else { x = String(x); y = String(y); } return (x > y ? 1 : x < y ? -1 : 0) * (v.dir === 'desc' ? -1 : 1); }); }
  return r;
}
const vSum = list => list.length && list[0].total !== undefined ? list.reduce((a, b) => a + b.total, 0) : list.reduce((a, b) => a + (b.spend || 0), 0);
function vCell(r, k) {
  const F = vFld(k), v = r[k]; if (!F) return esc(v ?? '');
  switch (F.t) {
    case 'avatar': { const c = cust(r.custId || r.id); return `<span class="row" style="gap:8px">${c ? av(c, 26) : ''}<b>${esc(v)}</b></span>`; }
    case 'code': return `<b class="num" style="color:var(--o-dk)">${esc(v)}</b>`;
    case 'money': return `<span class="num">${baht(v)}</span>`;
    case 'num': return `<span class="num">${v}</span>`;
    case 'bool': return v ? '<span class="chip ok">รับ</span>' : '<span class="chip">ไม่รับ</span>';
    case 'multi': return (v || []).map(e => `<span class="chip" style="margin-right:3px">${esc(e)}</span>`).join('');
    case 'select': { const c = ((F.c && F.c[v]) || '#F1F5F9|#475569').split('|'); return `<span class="chip" style="background:${c[0]};color:${c[1]}">${esc(v === 'ชำระแล้ว' && vObj === 'order' ? 'PAID' : v)}</span>`; }
    case 'date': return v ? `<span class="num small">${thd(v, 1)}</span>` : '<span class="muted">—</span>';
    default: return `<span class="small">${esc(v ?? '')}</span>`;
  }
}
const vIco = t => ({table:I.vtable, kanban:I.vkanban, calendar:I.vcal, gallery:I.vgal})[t] || I.vtable;
function vMut() { if (!vDraft) vDraft = JSON.parse(JSON.stringify(vView())); return vDraft; }
function vPick(id) { vDraft = null; veS().cur[vObj] = id; vSel = {}; save(); route(); }
function vSet(k, val) { const v = vMut(); v[k] = val; if (k === 'type' && val === 'kanban' && !v.kb) v.kb = (VF().find(f => f.t === 'select') || {}).k; if (k === 'type' && val === 'calendar' && !v.cal) v.cal = (VF().find(f => f.t === 'date') || {}).k; vClosePop(); route(); }
function vSort(k) { const v = vMut(); v.dir = (v.sort === k && v.dir === 'asc') ? 'desc' : 'asc'; v.sort = k; route(); }
function vSave() { const L = vViews(), i = L.findIndex(x => x.id === vDraft.id); L[i] = vDraft; vDraft = null; save(); route(); toast('บันทึกมุมมองแล้ว'); }
function vNameModal(kind) {
  modal(`<div class="pad" style="padding:22px"><div class="row between"><h3 style="font-size:19px">${kind === 'new' ? 'สร้างมุมมองใหม่' : 'บันทึกเป็นมุมมองใหม่'}</h3><button class="x" onclick="closeLayer()" aria-label="ปิด">×</button></div>
    <label class="lb" style="margin-top:14px">ชื่อมุมมอง</label><input class="input" id="vname" value="${kind === 'new' ? 'มุมมองใหม่' : 'สำเนาของ ' + esc(vView().name)}" onkeydown="if(event.key==='Enter')vNameOk('${kind}')">
    <div class="row" style="justify-content:flex-end;margin-top:16px"><button class="btn btn-w btn-sm" onclick="closeLayer()">ยกเลิก</button><button class="btn btn-o btn-sm" onclick="vNameOk('${kind}')">บันทึก</button></div></div>`);
  setTimeout(() => { const e = document.getElementById('vname'); if (e) { e.focus(); e.select(); } }, 50);
}
function vNameOk(kind) {
  const n = (document.getElementById('vname').value || '').trim(); if (!n) return;
  const F = VF(), v = kind === 'new' ? {id:'v' + Date.now(), name:n, type:'table', cols:F.slice(0, 5).map(f => f.k), filters:[], logic:'and', group:'', sort:F[0].k, dir:'asc'} : {...vDraft, id:'v' + Date.now(), name:n};
  vViews().push(v); veS().cur[vObj] = v.id; vDraft = null; save(); closeLayer(); route(); toast(`สร้างมุมมอง "${esc(n)}" แล้ว`);
}
function vShare() { const v = vView(); v.shared = !v.shared; save(); route(); toast(v.shared ? 'แชร์มุมมองนี้ให้ทีมแล้ว — ทุกคนเห็นเงื่อนไขและคอลัมน์ชุดเดียวกัน' : 'เลิกแชร์แล้ว'); }
function vWrite(id, k, v) {
  if (vObj === 'order') { if (k === 'status') setOrdSt(id, v); return; }
  if (vObj === 'shipment') {
    if (k === 'dstat') { const o = S.orders.find(x => x.id === id), cur = shipRow(o).dstat; if (DSTAT.indexOf(v) < DSTAT.indexOf(cur)) { toast('ย้อนสถานะพัสดุไม่ได้'); route(); return; } if (v !== cur) { setShipSt(id, v); toast(`${id} → ${v} · แจ้งลูกค้าทาง LINE อัตโนมัติ`); } save(); route(); return; }
    setShip(id, k, v); return;
  }
  const c = cust(id);
  if (k === 'tier') { if (c.type !== 'b2c' || v === 'B2B') { toast('ลูกค้าธุรกิจใช้ระดับตัวแทน — ตั้งที่หน้า ตัวแทน & คาร์แคร์'); route(); return; } S.tierOv[id] = v; }
  if (k === 'consent') c.consent = !!v;
  save(); route();
}
function vEdit(td, id, k) {
  const F = vFld(k); if (!F || !vO().edit.includes(k)) return;
  const cur = vO().rows().find(x => x.id === id)[k];
  let el;
  if (F.t === 'select' || F.t === 'bool') {
    el = document.createElement('select');
    (F.t === 'bool' ? [['true', 'รับ'], ['false', 'ไม่รับ']] : (vObj === 'order' ? ORD_FLOW : F.o).map(o => [o, o])).forEach(([v, t]) => { const op = document.createElement('option'); op.value = v; op.textContent = t; el.appendChild(op); });
    el.value = F.t === 'bool' ? String(!!cur) : cur;
  } else { el = document.createElement('input'); el.value = cur; }
  el.className = 'input cell'; td.innerHTML = ''; td.appendChild(el); el.focus();
  let fired = 0; const done = () => { if (fired++) return; let v = el.value; if (F.t === 'bool') v = v === 'true'; if (v === cur) { route(); return; } vWrite(id, k, v); };
  el.onblur = done; el.onkeydown = e => { if (e.key === 'Enter') el.blur(); if (e.key === 'Escape') { fired = 1; route(); } };
  if (F.t === 'select' || F.t === 'bool') el.onchange = done;
}
let vDragId = null;
function vDrop(e, key, val) {
  e.preventDefault(); document.querySelectorAll('.kcol').forEach(c => c.classList.remove('over')); if (!vDragId) return; const id = vDragId; vDragId = null;
  if (!vO().edit.includes(key)) { toast('ฟิลด์นี้คำนวณจากระบบ — ย้ายไม่ได้'); route(); return; }
  const cur = (vO().rows().find(x => x.id === id) || {})[key]; if (cur === val) return;
  vWrite(id, key, val); if (vObj === 'person' && cust(id).type === 'b2c' && val !== 'B2B') toast(`ย้าย ${esc(cust(id).name)} → ${val}`);
}
function vSelAll(on) { vRows().forEach(x => vSel[x.id] = on); route(); }
function vBulk(a) { toast(a + ' · ' + Object.values(vSel).filter(Boolean).length + ' รายการ (ตัวอย่าง)'); }
function tierBulk() {
  const ids = Object.keys(vSel).filter(k => vSel[k]);
  modal(`<div class="pad" style="padding:22px"><div class="row between"><h3 style="font-size:19px">${I.crown} ตั้งระดับสมาชิก · ${ids.length} คน</h3><button class="x" onclick="closeLayer()" aria-label="ปิด">×</button></div>
    <label class="lb" style="margin-top:14px">ระดับใหม่</label><select class="input" id="tbv">${VTIER.filter(t => t !== 'B2B').map(o => `<option>${o}</option>`).join('')}</select>
    <p class="muted xs" style="margin:10px 0 0">ระดับที่ตั้งเองจะทับระดับที่คำนวณจากยอดซื้อ · ลูกค้าธุรกิจ (B2B) ข้ามให้อัตโนมัติ · ทุกการเปลี่ยนบันทึกใน audit log</p>
    <div class="row" style="justify-content:flex-end;margin-top:16px"><button class="btn btn-w btn-sm" onclick="closeLayer()">ยกเลิก</button><button class="btn btn-o btn-sm" onclick="tierBulkOk()">บันทึก</button></div></div>`);
}
function tierBulkOk() { const v = document.getElementById('tbv').value, ids = Object.keys(vSel).filter(k => vSel[k] && cust(k).type === 'b2c'); ids.forEach(id => S.tierOv[id] = v); vSel = {}; save(); closeLayer(); route(); toast(`ตั้งระดับ "${v}" ให้ ${ids.length} คนแล้ว`); }
function vClosePop() { vPopOpen = null; const e = document.getElementById('vpop'); if (e) e.innerHTML = ''; }
function vOps(k) {
  const F = vFld(k); if (!F) return [['=', 'เท่ากับ']];
  if (F.t === 'money' || F.t === 'num') return [['=', 'เท่ากับ'], ['>=', 'มากกว่าเท่ากับ'], ['<=', 'น้อยกว่าเท่ากับ']];
  if (F.t === 'multi') return [['has', 'มี'], ['nothas', 'ไม่มี']];
  if (F.t === 'bool') return [['=', 'เป็น']];
  if (F.t === 'select') return [['=', 'เท่ากับ'], ['!=', 'ไม่เท่ากับ']];
  return [['contains', 'มีคำว่า'], ['=', 'เท่ากับ']];
}
function vValInput(f, i) {
  const F = vFld(f.f); if (!F) return '';
  if (F.t === 'bool') return `<select class="input sm" onchange="vSetF(${i},'v',this.value)"><option value="true" ${f.v === 'true' ? 'selected' : ''}>รับ</option><option value="false" ${f.v === 'false' ? 'selected' : ''}>ไม่รับ</option></select>`;
  if (F.t === 'select' || F.t === 'multi') return `<select class="input sm" onchange="vSetF(${i},'v',this.value)">${F.o.map(x => `<option ${f.v === x ? 'selected' : ''}>${esc(x)}</option>`).join('')}</select>`;
  return `<input class="input sm" value="${esc(f.v)}" ${F.t === 'money' || F.t === 'num' ? 'inputmode="numeric"' : ''} onchange="vSetF(${i},'v',this.value)">`;
}
const vBtn = t => [...document.querySelectorAll('.vtb .tbtn')].find(b => b.dataset.k === t);
function vPop(kind, btn) {
  if (vPopOpen === kind) { vClosePop(); return; }
  vPopOpen = kind; const v = vView(), r = btn.getBoundingClientRect(); let h = '';
  if (kind === 'filter') h = `<h4>เงื่อนไข</h4>${v.filters.map((f, i) => `<div class="prow">
      ${i === 0 ? '<span class="lgc">เมื่อ</span>' : `<select class="input sm" onchange="vMut().logic=this.value;vPopOpen=null;route();vPop('filter',vBtn('filter'))"><option value="and" ${v.logic === 'and' ? 'selected' : ''}>และ</option><option value="or" ${v.logic === 'or' ? 'selected' : ''}>หรือ</option></select>`}
      <select class="input sm" onchange="vSetF(${i},'f',this.value)">${VF().map(x => `<option value="${x.k}" ${f.f === x.k ? 'selected' : ''}>${x.l}</option>`).join('')}</select>
      <select class="input sm" onchange="vSetF(${i},'op',this.value)">${vOps(f.f).map(o => `<option value="${o[0]}" ${f.op === o[0] ? 'selected' : ''}>${o[1]}</option>`).join('')}</select>
      ${vValInput(f, i)}<button class="x" style="width:28px;height:28px;font-size:15px" onclick="vDelF(${i})" aria-label="ลบเงื่อนไข">×</button></div>`).join('')}
      <button class="addf" onclick="vAddF()">+ เพิ่มเงื่อนไข</button>
      <div class="hint">เงื่อนไขผูกกับ <b>มุมมอง</b> ไม่ใช่กับหน้าจอ — เปลี่ยนแล้วกดบันทึกเพื่อให้ทีมเห็นเหมือนกัน</div>`;
  if (kind === 'group') h = `<h4>จัดกลุ่มตาม</h4><select class="input sm" style="width:100%" onchange="vSet('group',this.value)"><option value="">ไม่จัดกลุ่ม</option>${VF().filter(f => ['select', 'bool', 'num'].includes(f.t)).map(f => `<option value="${f.k}" ${v.group === f.k ? 'selected' : ''}>${f.l}</option>`).join('')}</select><div class="hint">จัดกลุ่มแล้วจะมีแถวหัวกลุ่มพร้อมยอดรวมให้อัตโนมัติ</div>`;
  if (kind === 'sort') h = `<h4>เรียงตาม</h4><div class="prow"><select class="input sm" onchange="vMut().sort=this.value;route()">${VF().map(f => `<option value="${f.k}" ${v.sort === f.k ? 'selected' : ''}>${f.l}</option>`).join('')}</select><select class="input sm" onchange="vMut().dir=this.value;route()"><option value="asc" ${v.dir === 'asc' ? 'selected' : ''}>น้อย → มาก</option><option value="desc" ${v.dir === 'desc' ? 'selected' : ''}>มาก → น้อย</option></select></div><div class="hint">กดหัวคอลัมน์ในตารางก็เรียงได้เหมือนกัน</div>`;
  if (kind === 'cols') h = `<h4>คอลัมน์ที่แสดง</h4>${VF().map(f => `<label class="ck"><input type="checkbox" ${v.cols.includes(f.k) ? 'checked' : ''} onchange="vTglCol('${f.k}')"> ${f.l}</label>`).join('')}<div class="hint">ผู้ใช้เลือกเองได้ว่าจะเห็นฟิลด์ไหน</div>`;
  const pw = kind === 'filter' ? Math.min(580, innerWidth - 16) : Math.min(390, innerWidth - 16);
  const el = document.getElementById('vpop'); if (el) el.innerHTML = `<div class="pop ${kind === 'filter' ? 'wide' : ''}" style="left:${Math.max(8, Math.min(r.left, innerWidth - pw - 8))}px;top:${r.bottom + 6}px">${h}</div>`;
}
function vSetF(i, k, val) { const v = vMut(); v.filters[i][k] = val; if (k === 'f') { v.filters[i].op = vOps(val)[0][0]; const F = vFld(val); v.filters[i].v = F.t === 'bool' ? 'true' : (F.o ? F.o[0] : ''); } vPopOpen = null; route(); vPop('filter', vBtn('filter')); }
function vAddF() { const v = vMut(), f = VF().find(x => x.t === 'money') || VF()[0]; v.filters.push({f:f.k, op:vOps(f.k)[0][0], v:f.t === 'money' ? '1000' : (f.o ? f.o[0] : '')}); vPopOpen = null; route(); vPop('filter', vBtn('filter')); }
function vDelF(i) { const v = vMut(); v.filters.splice(i, 1); vPopOpen = null; route(); vPop('filter', vBtn('filter')); }
function vTglCol(k) { const v = vMut(); const i = v.cols.indexOf(k); i < 0 ? v.cols.push(k) : v.cols.splice(i, 1); vPopOpen = null; route(); vPop('cols', vBtn('cols')); }
document.addEventListener('click', e => { if (vPopOpen && !e.target.closest('.pop') && !e.target.closest('.tbtn')) vClosePop(); });
function vToolbar(v) {
  const nf = v.filters.length;
  return `<div class="vtb"><div class="vseg">${[['table', 'ตาราง'], ['kanban', 'Kanban'], ['calendar', 'ปฏิทิน'], ['gallery', 'แกลเลอรี']].map(([t, n]) => `<button class="${v.type === t ? 'on' : ''}" onclick="vSet('type','${t}')">${vIco(t)} ${n}</button>`).join('')}</div>
    <button class="tbtn ${nf ? 'act' : ''}" data-k="filter" onclick="vPop('filter',this)">${I.vfilter} ฟิลเตอร์${nf ? `<span class="n">${nf}</span>` : ''}</button>
    <button class="tbtn ${v.group ? 'act' : ''}" data-k="group" onclick="vPop('group',this)">${I.vkanban} จัดกลุ่ม${v.group ? '<span class="n">1</span>' : ''}</button>
    <button class="tbtn" data-k="sort" onclick="vPop('sort',this)">${I.vsort} เรียง</button>
    <button class="tbtn" data-k="cols" onclick="vPop('cols',this)">${I.vcols} คอลัมน์ <span class="n">${v.cols.length}</span></button>
    <input class="input srch" placeholder="ค้นหา…" value="${esc(vQ)}" onchange="vQ=this.value;route()">
    <span class="grow"></span>
    ${vDraft ? `<span class="dirty">● แก้ไขแล้วยังไม่บันทึก <button class="tbtn" onclick="vDraft=null;route()">ทิ้ง</button><button class="btn btn-o btn-sm" onclick="vSave()">บันทึกมุมมอง</button><button class="tbtn" onclick="vNameModal('copy')">บันทึกเป็นใหม่</button></span>` : `<button class="tbtn" onclick="vShare()">${I.vshare} แชร์</button>`}</div>`;
}
function vTr(x, cols) {
  return `<tr class="${vSel[x.id] ? 'sel' : ''}"><td><input type="checkbox" ${vSel[x.id] ? 'checked' : ''} onchange="vSel['${x.id}']=this.checked;route()" aria-label="เลือก"></td>` +
    cols.map(k => { const F = vFld(k), open = F.t === 'avatar' || F.t === 'code', ed = !open && vO().edit.includes(k); return `<td class="${ed ? 'ed' : ''}" ${open ? `style="cursor:pointer" onclick="vOpen('${x.id}')"` : ed ? `onclick="vEdit(this,'${x.id}','${k}')"` : 'title="คำนวณจากระบบ — แก้ที่ต้นทาง"'}>${vCell(x, k)}</td>`; }).join('') + '</tr>';
}
function vTable(v, r) {
  const cols = v.cols.filter(vFld); let body = '';
  if (v.group) {
    const m = new Map(); r.forEach(x => { const g = Array.isArray(x[v.group]) ? (x[v.group][0] || '—') : (typeof x[v.group] === 'boolean' ? (x[v.group] ? 'ใช่' : 'ไม่ใช่') : (x[v.group] ?? '—')); if (!m.has(g)) m.set(g, []); m.get(g).push(x); });
    [...m.entries()].forEach(([g, list]) => { body += `<tr class="gh"><td colspan="${cols.length + 1}">▾ ${esc(g)}<span class="cn">${list.length} รายการ · ${baht(vSum(list))}</span></td></tr>`; list.forEach(x => body += vTr(x, cols)); });
  } else r.forEach(x => body += vTr(x, cols));
  return `<div class="tbl-wrap"><table class="t vtbl"><thead><tr><th style="width:38px"><input type="checkbox" onchange="vSelAll(this.checked)" aria-label="เลือกทั้งหมด"></th>${cols.map(k => `<th class="srt-h" onclick="vSort('${k}')">${vFld(k).l}${v.sort === k ? (v.dir === 'desc' ? ' ↓' : ' ↑') : ''}</th>`).join('')}</tr></thead><tbody>${body}</tbody></table></div>`;
}
function vKanban(v, r) {
  const key = v.kb || (VF().find(f => f.t === 'select') || {}).k, F = vFld(key), groups = (F && F.o) || [...new Set(r.map(x => x[key]))];
  return `<div class="kb" style="grid-template-columns:repeat(${groups.length},minmax(200px,1fr))">${groups.map(g => { const list = r.filter(x => x[key] === g), c = ((F.c && F.c[g]) || '#E2E8F0|#475569').split('|');
    return `<div class="kcol" ondragover="event.preventDefault();this.classList.add('over')" ondragleave="this.classList.remove('over')" ondrop="vDrop(event,'${key}','${esc(g)}')">
      <div class="kh"><span class="chip" style="background:${c[0]};color:${c[1]}">${esc(g === 'ชำระแล้ว' && vObj === 'order' ? 'PAID' : g)}</span><span class="muted small">${list.length}</span><span class="grow"></span><span class="xs muted num">${list.length ? baht(vSum(list)) : ''}</span></div>
      ${list.map(x => `<div class="kc" draggable="true" ondragstart="vDragId='${x.id}';this.classList.add('drag')" ondragend="this.classList.remove('drag')" onclick="vOpen('${x.id}')"><b>${esc(vO().title(x))}</b><div class="m">${v.cols.filter(k => k !== key && vFld(k) && vFld(k).t !== 'code' && !(vObj === 'person' && k === 'name')).slice(0, 3).map(k => vCell(x, k)).join(' ')}</div></div>`).join('') || '<div class="muted small" style="padding:10px 4px">ว่าง</div>'}
    </div>`; }).join('')}</div><p class="muted small" style="margin:10px 14px 14px">ลากการ์ดข้ามคอลัมน์เพื่อเปลี่ยน <b>${F ? F.l : ''}</b> — pipeline ที่ตั้งค่าได้ ไม่ใช่สถานะที่ฝังในโค้ด</p>`;
}
function vGallery(v, r) {
  return `<div class="gal">${r.map(x => { const c = cust(x.custId || x.id); return `<div class="gc" onclick="vOpen('${x.id}')"><div class="row" style="gap:8px;margin-bottom:8px">${c ? av(c, 30) : ''}<b>${esc(vO().title(x))}</b></div>${v.cols.filter(k => vFld(k) && !['avatar', 'code'].includes(vFld(k).t)).map(k => `<div class="row between small" style="padding:3px 0"><span class="muted">${vFld(k).l}</span><span>${vCell(x, k)}</span></div>`).join('')}</div>`; }).join('')}</div>`;
}
function vCalendar(v, r) {
  const key = v.cal || (VF().find(f => f.t === 'date') || {}).k, base = new Date(TODAY.getFullYear(), TODAY.getMonth() + vCalOff, 1), y = base.getFullYear(), mo = base.getMonth(), first = base.getDay(), nd = new Date(y, mo + 1, 0).getDate();
  let cells = ''; for (let i = 0; i < first; i++) cells += '<div class="cd off"></div>';
  for (let d = 1; d <= nd; d++) { const ds = y + '-' + String(mo + 1).padStart(2, '0') + '-' + String(d).padStart(2, '0'), list = r.filter(x => x[key] === ds), today = vCalOff === 0 && d === TODAY.getDate();
    cells += `<div class="cd ${today ? 'today' : ''}"><div class="dn">${d}</div>${list.slice(0, 3).map(x => `<div class="ce" onclick="vOpen('${x.id}')">${esc(vO().title(x))}${x.total ? ' · ' + baht(x.total) : ''}</div>`).join('')}${list.length > 3 ? `<div class="xs muted">+${list.length - 3}</div>` : ''}</div>`; }
  return `<div class="cal"><div class="row between wrap" style="margin-bottom:10px"><div class="row"><button class="btn btn-w btn-sm" onclick="vCalOff--;route()" aria-label="เดือนก่อน">‹</button><b>${TH_M[mo]} ${y}</b><button class="btn btn-w btn-sm" onclick="vCalOff++;route()" aria-label="เดือนถัดไป">›</button><span class="muted small">· วางตามฟิลด์ "${vFld(key).l}"</span></div><select class="input sm" style="width:auto" onchange="vSet('cal',this.value)">${VF().filter(f => f.t === 'date').map(f => `<option value="${f.k}" ${key === f.k ? 'selected' : ''}>${f.l}</option>`).join('')}</select></div>
    <div class="cgrid">${['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส'].map(x => `<div class="dh">${x}</div>`).join('')}${cells}</div></div>`;
}
function vBody(v) { const r = vRows(); if (!r.length) return '<div class="empty"><b>ไม่มีรายการที่ตรงกับเงื่อนไข</b></div>'; return v.type === 'kanban' ? vKanban(v, r) : v.type === 'gallery' ? vGallery(v, r) : v.type === 'calendar' ? vCalendar(v, r) : vTable(v, r); }
function vSelBar() {
  const n = Object.values(vSel).filter(Boolean).length; if (!n) return '';
  return `<div class="selbar"><span class="c">${n}</span> เลือกอยู่${vObj === 'person' ? '<button onclick="tierBulk()">ตั้งระดับสมาชิก</button>' : ''}<button onclick="vBulk('แก้ค่าเป็นชุด')">แก้ค่าเป็นชุด</button>${vObj === 'person' ? `<button onclick="vBulk('สร้างกลุ่มเป้าหมาย')">สร้างเป็น segment</button><button onclick="location.hash='#/admin/campaigns/new'">ส่งแคมเปญ</button>` : ''}${vObj === 'shipment' ? `<button onclick="Object.keys(vSel).filter(k=>vSel[k]).forEach(id=>dlvSel[id]=true);vSel={};bulkShip()">เลื่อนสถานะเป็นชุด</button>` : ''}<button onclick="vBulk('export CSV')">export CSV</button><button onclick="vSel={};route()">ยกเลิก</button></div>`;
}
function vOpen(id) {
  const r = vO().rows().find(x => x.id === id); if (!r) return;
  const c = cust(r.custId || r.id), o = vObj !== 'person' ? S.orders.find(x => x.id === id) : null, s = vObj === 'person' ? st(c) : null;
  const tl = vObj === 'person' ? [...s.os].reverse().slice(0, 5).map(x => [`${CH[x.ch][0] + ' · ' + x.id} · ${baht(lineTotal(x))}`, thd(x.date, 1)]).concat([['เริ่มเป็นลูกค้า', thd(c.joined, 1)]])
    : [['สร้างคำสั่งซื้อ', thd(o.date, 1)], ...(S.ordlog[id] || []).map(x => [(x.st.startsWith('คืนเงิน') ? '' : 'สถานะ: ') + esc(x.st), x.at])];
  drawer(`<div style="padding:20px 22px"><div class="row between"><div class="row" style="gap:10px">${c ? av(c, 40) : ''}<div><b style="font-size:16px">${esc(vO().title(r))}</b><div class="muted small">${vO().n} · ${esc(r.id)}${vObj !== 'person' ? ' · ' + esc(c.name) : ''}</div></div></div><button class="x" onclick="closeLayer()" aria-label="ปิด">×</button></div>
    <div class="vkv">${VF().map(f => `<span>${f.l}</span><div>${vCell(r, f.k)}</div>`).join('')}</div>
    <h4 class="xs muted" style="letter-spacing:.08em;margin:18px 0 8px">TIMELINE</h4>
    <div class="vtl">${tl.map(([t, d]) => `<div class="it">${t}<small>${d}</small></div>`).join('')}</div>
    <p style="margin-top:14px">${vObj === 'person' ? `<a href="javascript:closeLayer();openCust('${id}')" style="text-decoration:underline;font-weight:600;color:var(--o-dk)">เปิดใน Customer 360 →</a>` : `<a href="javascript:closeLayer();ordSel='${id}';ordF='';location.hash='#/admin/orders'" style="text-decoration:underline;font-weight:600;color:var(--o-dk)">เปิดในหน้าคำสั่งซื้อ →</a>`}</p></div>`);
}
function vEngine(sub) {
  const v = vView(), all = vO().rows().length;
  return `<div class="ve">${sub}
    <div class="muted small" style="margin:2px 0 10px">${vRows().length} จาก ${all} รายการ · มุมมองเป็นของผู้ใช้แต่ละคน แชร์ให้ทีมได้ · ข้อมูลชุดเดียวกับหน้า CRM และคำสั่งซื้อ</div>
    <div class="vtabs">${vViews().map(x => `<button class="vtab ${v.id === x.id ? 'on' : ''}" onclick="vPick('${x.id}')">${vIco(x.type)} ${esc(x.name)}${x.shared ? '<span class="lk">· แชร์</span>' : ''}</button>`).join('')}<button class="vtab add" onclick="vNameModal('new')">+ มุมมองใหม่</button></div>
    <div class="card vcard">${vToolbar(v)}<div class="vbody">${vBody(v)}</div></div>
    <div id="vpop"></div>${vSelBar()}</div>`;
}
function aViews(qs) {
  const obj = VOBJ[qs.get('obj')] && qs.get('obj') !== 'person' ? qs.get('obj') : 'order'; vUse(obj);
  return `${ordTabs(obj === 'order' ? 'o' : 's')}<div class="ph-h"><div><h1>${vO().n} <span class="chip k" style="font-style:normal;vertical-align:middle">View engine</span></h1><span class="muted">มุมมองข้อมูลที่ตั้งเองได้: ตาราง · Kanban · ปฏิทิน · แกลเลอรี · ฟิลเตอร์ · จัดกลุ่ม · แก้ค่าในตาราง</span></div>${obj === 'order' ? '<a class="btn btn-w btn-sm" href="#/admin/orders">← หน้าคำสั่งซื้อ</a>' : '<a class="btn btn-w btn-sm" href="#/admin/delivery">ศูนย์จัดส่ง →</a>'}</div>${vEngine('')}`;
}

function openCust(id) {
  c360 = id; closeLayer();
  if (location.hash === '#/admin/customers?f=top') route(); else location.hash = '#/admin/customers?f=top';
  setTimeout(() => { const e = document.getElementById('c360'); if (e) e.scrollIntoView({behavior:'smooth', block:'start'}); }, 120);
}
function spendOf(c, ch, cat) {
  return st(c).os.filter(o => !ch || o.ch === ch).reduce((t, o) => {
    if (cat === 'all') return t + lineTotal(o);
    const gross = o.items.reduce((a, [p, q]) => a + P[p].price * q, 0), part = o.items.filter(([p]) => P[p].cat === cat).reduce((a, [p, q]) => a + P[p].price * q, 0);
    return t + (gross ? lineTotal(o) * part / gross : 0);
  }, 0);
}
function lineCell(c) { return c.line ? `<span class="chip line">LINE</span><div class="xs muted num">${c.line}</div>` : '<span class="muted small">ยังไม่เชื่อม</span>'; }
function inviteSel() { const n = Object.values(topSel).filter(Boolean).length; if (!n) { toast('ติ๊กเลือกลูกค้าก่อน'); return; } toast(`เพิ่ม ${n} คนเข้ากลุ่ม "ชวนกลับมาซื้อซ้ำ" แล้ว — ใช้ยิงแคมเปญได้ที่หน้าแคมเปญ`); }
function aCustomers(qs) {
  custMode = qs.get('f') === 'top' ? 'top' : 'list';
  if (qs.get('open')) { c360 = qs.get('open'); custMode = 'top'; }
  const head = `<div class="ph-h"><div><h1>ลูกค้า</h1><span class="muted">${custMode === 'top' ? 'เรียงตามยอดใช้จ่าย — กรองช่องทางและหมวดสินค้า เพื่อหาคนที่ซื้อจริง' : 'ฐานลูกค้ารวมทุกช่องทางของแบรนด์ · มุมมองตั้งเองได้ แชร์ให้ทีมได้'} · <a href="#/admin/tiers" style="color:var(--o-dk);font-weight:600">ตั้งค่าระดับ & แต้ม →</a></span></div><button class="btn btn-w btn-sm" onclick="toast('Export — เฉพาะลูกค้าที่ให้ consent')">Export</button></div>
    <div class="tabs cmode"><a href="#/admin/customers" class="${custMode === 'list' ? 'on' : ''}">${I.users} รายชื่อทั้งหมด</a><a href="#/admin/customers?f=top" class="${custMode === 'top' ? 'on' : ''}">${I.crown} Top spender</a></div>`;
  if (custMode === 'top') return head + topSpender();
  vUse('person');
  return head + vEngine('');
}
function topSpender() {
  const masked = S.role !== 'admin';
  const all = S.customers;
  let rows = all.map(c => ({c, v:spendOf(c, topF.ch, topF.cat), items:st(c).os.filter(o => !topF.ch || o.ch === topF.ch).reduce((a, o) => a + o.items.filter(([p]) => topF.cat === 'all' || P[p].cat === topF.cat).length, 0)})).filter(r => r.v > 0);
  if (topF.q) { const k = topF.q.toLowerCase(); rows = rows.filter(r => (r.c.name + r.c.email + r.c.phone + r.c.id).toLowerCase().includes(k)); }
  rows.sort((a, b) => b.v - a.v);
  const shown = rows.slice(0, topF.n), sum = rows.reduce((a, r) => a + r.v, 0), selN = Object.values(topSel).filter(Boolean).length;
  const catL = (CATS.find(c => c[0] === topF.cat) || CATS[0])[1], chL = topF.ch ? CH[topF.ch][0] : 'ทุกช่องทาง';
  const c = c360 ? cust(c360) : null;
  return `<p class="muted small" style="margin:0 0 14px">รายชื่อลูกค้าเรียงตามยอดใช้จ่าย — กรองได้ทั้ง <b>ช่องทาง</b> และ <b>หมวดสินค้า</b> เพื่อหาคนที่เคยซื้อจริง ไว้ชวนกลับมาซื้อซ้ำ</p>
  <div class="kpis">
    <div class="kpi"><span class="lb">ลูกค้าที่ตรงเงื่อนไข</span><b>${rows.length}</b></div>
    <div class="kpi"><span class="lb">ยอดรวม (${catL === 'ทั้งหมด' ? 'ทุกหมวด' : catL})</span><b class="num">${baht(sum)}</b></div>
    <div class="kpi"><span class="lb">เฉลี่ย / คน</span><b class="num">${baht(rows.length ? sum / rows.length : 0)}</b></div>
    <div class="kpi"><span class="lb">เลือกไว้ชวนซื้อซ้ำ</span><b>${selN}</b></div>
  </div>
  <div class="card pad">
    <div class="filters" style="margin-bottom:10px"><button class="fbtn2 ${!topF.ch ? 'on' : ''}" onclick="topF.ch='';route()">ทุกช่องทาง <span class="cnt">${all.length}</span></button>${Object.entries(CH).map(([k, x]) => `<button class="fbtn2 ${topF.ch === k ? 'on' : ''}" onclick="topF.ch='${k}';route()"><i class="dot" style="background:${x[2]}"></i>${x[0]} <span class="cnt">${all.filter(c => st(c).chans.includes(k)).length}</span></button>`).join('')}</div>
    <div class="filters" style="margin-bottom:12px">${CATS.map(([k, t]) => `<button class="fbtn2 ${topF.cat === k ? 'on' : ''}" onclick="topF.cat='${k}';route()">${t}</button>`).join('')}</div>
    <div class="filters" style="margin-bottom:12px"><input class="input sm" style="width:170px" value="1 ม.ค. – 31 ธ.ค. 2026" aria-label="ช่วงวันที่"><select class="input sm" style="width:auto" onchange="topF.n=+this.value;route()">${[10, 50, 100].map(n => `<option value="${n}" ${topF.n === n ? 'selected' : ''}>Top ${n}</option>`).join('')}</select><input class="input sm" style="min-width:200px;width:auto" placeholder="ค้นหาชื่อ / อีเมล / เบอร์" value="${esc(topF.q)}" onchange="topF.q=this.value;route()"><span class="grow"></span><button class="btn btn-o btn-sm" onclick="inviteSel()">${I.mega} ชวนกลับมาซื้อซ้ำ (${selN})</button><button class="btn btn-w btn-sm" onclick="toast('Export Excel — เฉพาะลูกค้าที่ให้ consent')">Export</button></div>
    <p class="muted small" style="margin:0 0 12px;line-height:1.7">กำลังดู: <b>${chL}</b> · หมวด <b>${catL === 'ทั้งหมด' ? 'ทุกหมวด' : catL}</b>${topF.cat !== 'all' ? ' — นับเฉพาะหมวดนี้' : ''}<br>ตัวอย่างการใช้งาน: เลือก <b>LINE</b> + <b>ล้างรถ & โฟม</b> = คนที่ซื้อน้ำยาล้างรถผ่าน LINE มากที่สุด → ติ๊กเลือก → ชวนกลับมาซื้อซ้ำ</p>
    <div class="tbl-wrap"><table class="t"><thead><tr><th style="width:34px"></th><th style="width:44px">#</th><th>ลูกค้า</th><th>ติดต่อ</th><th>LINE</th><th>ช่องทางที่ซื้อ</th><th>ยอด (${catL === 'ทั้งหมด' ? 'ทุกหมวด' : catL})</th><th>รายการ</th></tr></thead><tbody>
    ${shown.map((r, i) => `<tr class="click ${c360 === r.c.id ? 'sel' : ''}" onclick="c360='${r.c.id}';route();setTimeout(()=>document.getElementById('c360').scrollIntoView({behavior:'smooth'}),60)">
      <td onclick="event.stopPropagation()"><input type="checkbox" ${topSel[r.c.id] ? 'checked' : ''} onchange="topSel['${r.c.id}']=this.checked;route()" aria-label="เลือก"></td>
      <td><span class="rank ${i < 3 ? 'r' + (i + 1) : ''}">${i + 1}</span></td>
      <td><b>${esc(r.c.name)}</b>${S.user === r.c.id ? ' <span class="chip o">คุณ (demo)</span>' : ''}<div class="muted xs">${r.c.id}</div></td>
      <td class="small">${masked ? esc(r.c.email.replace(/^(.).*(@.*)$/, '$1•••$2')) : esc(r.c.email)}<div class="muted xs">${masked ? esc(r.c.phone.slice(0, 7)) + ' •••' : esc(r.c.phone)}</div></td>
      <td>${lineCell(r.c)}</td>
      <td><div class="row wrap" style="gap:4px">${st(r.c).chans.map(chChip).join('')}</div></td>
      <td class="num"><b>${baht(r.v)}</b></td><td class="num">${r.items}</td></tr>`).join('') || '<tr><td colspan="8" class="muted" style="text-align:center;padding:48px 24px">ไม่มีลูกค้าที่ตรงเงื่อนไขนี้</td></tr>'}
    </tbody></table></div>
    <p class="muted xs" style="margin:12px 0 0">${masked ? ROLES[S.role][0] + ': อีเมล / เบอร์ถูก mask' : 'super-admin: เห็นทุกช่องทาง'} · กดแถวเพื่อเปิด Customer 360 ด้านล่าง</p>
  </div>
  ${c ? customer360(c) : ''}`;
}
function customer360(c) {
  const s = st(c), masked = S.role !== 'admin';
  return `<div class="card pad c360wrap" id="c360"><div class="row between" style="margin-bottom:14px"><b style="font-size:16px">Customer 360 — ลูกค้าคนเดียวกันทุกช่องทาง</b><button class="btn btn-w btn-sm" onclick="c360=null;route()">ปิด ×</button></div>
    <div class="c360">
      <div class="card pad prof">
        <div class="row" style="gap:12px">${av(c, 52)}<div><h2 style="font-size:20px">${esc(c.name)}</h2><div class="muted small">${c.id} · ${c.type === 'b2c' ? 'ลูกค้าทั่วไป' : typeChip(c)}</div></div></div>
        <div class="kv">
          <span>เชื่อม LINE</span><div>${lineCell(c)}</div>
          <span>อีเมล</span><div>${masked ? esc(c.email.replace(/^(.).*(@.*)$/, '$1•••$2')) : esc(c.email)} <span class="chip ok">✓ ยืนยันแล้ว</span></div>
          <span>เบอร์</span><div>${masked ? esc(c.phone.slice(0, 7)) + ' •••' : esc(c.phone)}</div>
          <span>ช่องทาง</span><div class="row wrap" style="gap:4px">${s.chans.map(chChip).join('') || '-'}</div>
          <span>ยอดรวม</span><div><b class="num">${baht(s.spend)}</b> · ${s.n} ครั้ง</div>
          <span>ระดับสมาชิก</span><div>${c.type === 'b2c' ? `<select class="input sm" style="width:auto" onchange="S.tierOv['${c.id}']=this.value;save();route();toast('ตั้งระดับสมาชิกแล้ว')">${VTIER.filter(t => t !== 'B2B').map(o => `<option ${personTier(c, s) === o ? 'selected' : ''}>${o}</option>`).join('')}</select> <span class="muted xs">ตั้งเองได้</span>` : `${typeChip(c)} <span class="muted xs">ตั้งที่หน้าตัวแทน</span>`}</div>
          ${c.type === 'b2c' ? `<span>แต้มคงเหลือ</span><div><b class="num">${s.pts.toLocaleString()}</b></div>` : ''}
          <span>รอบเติมถัดไป</span><div>${s.due ? thd(s.due, 1) + (s.dueIn !== null && s.dueIn <= 7 ? ' <span class="chip neon">ใกล้หมด</span>' : '') : '—'}</div>
          <span>Consent</span><div>${c.consent ? 'รับข่าวสาร ✓' : '<span style="color:var(--red)">ไม่รับข่าวสาร</span>'} · ${c.line ? 'LINE ✓' : 'LINE —'}</div>
        </div>
        <div class="note" style="margin-top:14px">ตัวตนยืนยันด้วยเบอร์โทร (OTP)${c.line ? ' · ลูกค้าผูก LINE เอง' : ''}</div>
        <button class="btn btn-o" style="margin-top:14px;width:100%" onclick="topSel['${c.id}']=true;route();toast('เพิ่มเข้ากลุ่มชวนกลับมาซื้อซ้ำแล้ว')">${I.mega} เพิ่มในกลุ่มชวนซื้อซ้ำ</button>
      </div>
      <div class="card pad"><b>Timeline</b>
        <div class="vtl" style="margin-top:12px">${[...s.os].reverse().map(o => `<div class="it">${chChip(o.ch)} <b>${o.id}</b> · ${baht(lineTotal(o))}<div class="small muted">${o.items.map(([p, q]) => P[p].short + ' ×' + q).join(', ')}${o.code ? ' · โค้ด ' + o.code : ''}</div><small>${thd(o.date, 1)}</small></div>`).join('')}<div class="it">เริ่มเป็นลูกค้า<small>${thd(c.joined, 1)}</small></div></div>
      </div>
    </div></div>`;
}

/* --- segments (same structure & actions as Grandprix) --- */
let bld = {name:'', ch:'', type:'', cat:'', min:0, rep:'', idle:0}, segView = 'list';
const SEG_IC = {refill:I.refill, nolink:I.chat, new:I.user, loyal:I.crown, cross:I.tag, winback:I.bolt, carcare:I.store, dealerdown:I.dash, bday:I.gift};
function bldMatch() { return S.customers.filter(c => matchCond(bld, c, st(c))); }
function setBld(k, v) { bld[k] = v; route(); }
function bldAutoName() { return `กลุ่มที่สร้างเอง · ${bld.ch ? CH[bld.ch][0] : 'ทุกช่องทาง'}${bld.type ? ' · ' + TYPE[bld.type][0] : ''}${bld.cat ? ' · ' + (CATS.find(c => c[0] === bld.cat) || ['', ''])[1] : ''}${bld.min > 0 ? ' · ใช้จ่าย ≥ ' + baht(bld.min) : ''}${bld.rep ? ' · ซื้อ ' + bld.rep + ' ครั้งขึ้นไป' : ''}${bld.idle ? ' · ไม่ซื้อ ' + bld.idle + ' วัน' : ''}`; }
function saveSeg() {
  const n = bldMatch().length, name = (bld.name || '').trim() || bldAutoName();
  S.customSegs.push({id:'cs' + Date.now(), name, desc:'สร้างเองจากตัวสร้างกลุ่ม', act:'เลือกช่องทางและเทมเพลตได้เอง', cond:{ch:bld.ch, type:bld.type, cat:bld.cat, min:+bld.min || 0, rep:bld.rep, idle:+bld.idle || 0}});
  save(); toast(`บันทึกกลุ่ม "${esc(name)}" (${n} คน) — ใช้ยิงแคมเปญได้แล้ว`);
}
function delSeg(id) { S.customSegs = S.customSegs.filter(x => x.id !== id); save(); route(); toast('ลบกลุ่มแล้ว'); }
function aSegments() {
  if (segView === 'new') return segBuilder();
  const L = allSegs(), tot = S.customers.length;
  return `<div class="ph-h"><div><h1>กลุ่มลูกค้า (Segment)</h1><span class="muted">${L.length} กลุ่ม — ${L.filter(x => !x.custom).length} กลุ่มสำเร็จรูป + ${L.filter(x => x.custom).length} กลุ่มที่สร้างเอง · ตัวเลขคำนวณสดจากข้อมูลจริง</span></div><div class="row"><button class="btn btn-w btn-sm" onclick="toast('Export รายชื่อ — เฉพาะคนที่ยินยอมรับข่าวสาร')">Export</button><button class="btn btn-o btn-sm" onclick="segView='new';route()">+ สร้างกลุ่ม</button></div></div>
  <div class="kpis">
    <div class="kpi"><span class="lb">กลุ่มทั้งหมด</span><b>${L.length}</b></div><div class="kpi"><span class="lb">ฐานลูกค้า</span><b>${tot}</b></div>
    <div class="kpi"><span class="lb">กลุ่มที่มีคน</span><b>${L.filter(x => segMembers(x).length).length}</b></div><div class="kpi"><span class="lb">กลุ่มที่สร้างเอง</span><b>${L.filter(x => x.custom).length}</b></div>
  </div>
  <div class="segs">${L.map(g => { const m = segMembers(g); return `<div class="seg ${m.length ? '' : 'zero'} ${g.hot ? 'hot' : ''}">
    <div class="row" style="align-items:flex-start;gap:10px"><span class="seg-ic">${SEG_IC[g.id] || I.seg}</span><div class="grow"><div class="row wrap" style="gap:6px"><b style="font-size:14.5px">${esc(g.name)}</b>${g.custom ? '<span class="chip blue">สร้างเอง</span>' : '<span class="chip">สำเร็จรูป</span>'}${g.id === 'dealerdown' ? '<span class="chip warn">ต้องเชื่อมระบบบัญชี</span>' : ''}</div><div class="muted small" style="margin-top:3px">${esc(g.desc)}</div></div>${g.custom ? `<button class="x" style="width:28px;height:28px;font-size:15px" title="ลบกลุ่ม" onclick="delSeg('${g.id}')">×</button>` : ''}</div>
    <div class="row seg-n" style="align-items:baseline;gap:6px"><span class="cnt num">${m.length}</span><span class="muted small">/ ${tot} คน</span></div>
    <div class="bar" style="height:6px"><i style="width:${tot ? m.length / tot * 100 : 0}%"></i></div>
    <div class="row seg-f"><span class="act grow">${g.act ? '➜ ' + esc(g.act) : ''}</span></div>
    <div class="row seg-btns"><button class="btn btn-w btn-sm grow" onclick="segList('${g.id}')">ดูรายชื่อ</button><button class="btn btn-k btn-sm grow" ${m.length ? '' : 'disabled'} onclick="location.hash='#/admin/campaigns/new?seg=${g.id}'">${isPlus() ? 'ยิงแคมเปญ →' : I.lock + ' ยิงแคมเปญ · PLUS'}</button></div>
  </div>`; }).join('')}</div>
  <div class="note" style="margin-top:14px">${SEGMENTS.length} กลุ่มสำเร็จรูปเป็น <b>template ของธุรกิจน้ำยา (สินค้าใช้แล้วหมด)</b> — ลูกค้ารายอื่นจะขอเงื่อนไขของตัวเอง ดังนั้นตัวสร้างกลุ่มต้องมาก่อน template</div>`;
}
function segBuilder() {
  const m = bldMatch(), tot = S.customers.length;
  const chip = (k, v, lab) => `<button class="fbtn2 ${String(bld[k]) === String(v) ? 'on' : ''}" onclick="setBld('${k}','${v}')">${lab}</button>`;
  return `<a class="small muted" href="javascript:segView='list';route()">← กลุ่มลูกค้า</a>
  <div class="ph-h" style="margin-top:6px"><div><h1>สร้างกลุ่มลูกค้า</h1><span class="muted">เงื่อนไขที่ใช้ได้จริงในระบบ: ช่องทาง · ประเภทลูกค้า · หมวดสินค้า · ยอดใช้จ่าย · จำนวนครั้งที่ซื้อ · ระยะที่ไม่ได้ซื้อ</span></div></div>
  <div class="sb2">
    <div class="card pad bldl">
      <label class="lb">ชื่อกลุ่ม</label><input class="input" placeholder="เช่น ลูกค้าภาคใต้ซื้อนีออนยอดสูง" value="${esc(bld.name)}" oninput="bld.name=this.value">
      <div class="fl"><span class="lb">ช่องทาง</span><div class="filters">${chip('ch', '', 'ทุกช่องทาง')}${Object.entries(CH).map(([k, x]) => chip('ch', k, x[0])).join('')}</div></div>
      <div class="fl"><span class="lb">ประเภทลูกค้า</span><div class="filters">${chip('type', '', 'ทุกประเภท')}${Object.entries(TYPE).map(([k, x]) => chip('type', k, x[0])).join('')}</div></div>
      <div class="fl"><span class="lb">หมวดสินค้าที่เคยซื้อ</span><div class="filters">${chip('cat', '', 'ทุกหมวด')}${CATS.filter(c => c[0] !== 'all').map(([k, t]) => chip('cat', k, t)).join('')}</div></div>
      <div class="fl"><span class="lb">ใช้จ่ายอย่างน้อย (฿)</span><div class="filters">${[0, 1000, 5000, 10000].map(v => chip('min', v, v ? v.toLocaleString() : 'ไม่กำหนด')).join('')}</div></div>
      <div class="fl"><span class="lb">ซื้อซ้ำ</span><div class="filters">${chip('rep', '', 'ไม่กำหนด')}${chip('rep', '2', '2 ครั้งขึ้นไป')}${chip('rep', '3', '3 ครั้งขึ้นไป')}</div></div>
      <div class="fl"><span class="lb">ไม่ได้ซื้อมาแล้ว</span><div class="filters">${[0, 30, 60, 90].map(v => chip('idle', v, v ? '≥ ' + v + ' วัน' : 'ไม่กำหนด')).join('')}</div></div>
      <button class="addf" onclick="toast('เพิ่มเงื่อนไขระดับสมาชิกหรือความยินยอม — ตัวอย่าง')">+ เพิ่มเงื่อนไข (ระดับสมาชิก · ความยินยอม)</button>
      <div class="note">ระบบตัดคนที่ไม่ยินยอมรับข่าวสารออกให้อัตโนมัติก่อนส่งเสมอ — override ไม่ได้</div>
    </div>
    <div class="card pad pvw"><span class="muted small">เข้าเงื่อนไข</span><div class="row" style="align-items:baseline;gap:6px;margin:4px 0 8px"><b class="cnt num">${m.length}</b><span class="muted small">/ ${tot} คน</span></div><div class="bar" style="height:6px"><i style="width:${tot ? m.length / tot * 100 : 0}%"></i></div>
      <div style="margin-top:14px;display:grid;gap:8px">${m.length ? m.slice(0, 5).map(c => `<div class="row" style="gap:8px">${av(c, 28)}<span class="grow small">${esc(c.name)}</span><b class="num small">${baht(st(c).spend)}</b></div>`).join('') + (m.length > 5 ? `<span class="muted xs">และอีก ${m.length - 5} คน</span>` : '') : '<div class="muted small" style="padding:10px 0">ไม่มีลูกค้าที่ตรงเงื่อนไข</div>'}</div>
      <div class="row" style="margin-top:16px"><button class="btn btn-w btn-sm grow" onclick="segView='list';route()">ยกเลิก</button><button class="btn btn-o btn-sm grow" ${m.length ? '' : 'disabled'} onclick="saveSeg();bld={name:'',ch:'',type:'',cat:'',min:0,rep:'',idle:0};segView='list';route()">บันทึกกลุ่ม</button></div></div>
  </div>`;
}
function segList(id) {
  const g = allSegs().find(x => x.id === id), m = segMembers(g);
  drawer(`<div style="padding:20px 22px"><div class="row between"><h3 style="font-size:19px">${g.name}</h3><button class="x" onclick="closeLayer()">×</button></div><p class="muted small">${g.desc} · ${m.length} คน</p>
    ${m.map(c => { const s = st(c); return `<div class="todo" style="padding:10px 0;cursor:pointer" onclick="openCust('${c.id}')">${av(c)}<div class="grow"><b class="small">${esc(c.name)}</b><div class="row wrap" style="gap:4px">${s.chans.map(chChip).join('')}${c.consent ? '' : '<span class="chip bad">ไม่ยินยอม</span>'}</div></div><b class="num small">${baht(s.spend)}</b></div>`; }).join('') || '<p class="muted">ไม่มีลูกค้าในกลุ่มนี้</p>'}
    <a class="btn btn-k" style="width:100%;margin-top:14px" href="#/admin/campaigns/new?seg=${g.id}" onclick="closeLayer()">ยิงแคมเปญถึงกลุ่มนี้</a></div>`);
}

/* --- tiers --- */
function aTiers() {
  const b2c = S.customers.filter(c => c.type === 'b2c').map(c => st(c));
  const colors = ['linear-gradient(135deg,#4B5058,#111316)', 'linear-gradient(135deg,#94A3B8,#334155)', 'linear-gradient(135deg,#F5B800,#7A5B00)', 'linear-gradient(135deg,#B8F227,#3D5400)'];
  return `<a class="small muted" href="#/admin/customers">← ลูกค้า</a><div style="height:6px"></div><div class="ph-h"><div><h1>ระดับสมาชิก & แต้ม</h1><span class="muted">ลูกค้าปลีก B2C · คำนวณจากยอดซื้อ 12 เดือนย้อนหลัง รวมทุกช่องทางที่ผูกไว้</span></div></div>
  <div class="kpis">${TIERS.map((t, i) => `<div class="tierc" style="background:${colors[i]}"><div class="row between"><h3>${t.k.toUpperCase()}</h3>${mdMark(24)}</div><div style="font-family:var(--fd);font-size:30px;font-weight:600;margin-top:8px">${b2c.filter(s => s.tier.k === t.k).length} <span style="font-size:13px;font-weight:400">คน</span></div><div class="small" style="opacity:.85">${t.min ? 'ยอด 12 เดือน ≥ ' + baht(t.min) : 'สมัครฟรี'}</div></div>`).join('')}</div>
  <div class="g2e">
    <div class="card"><div class="ch-h"><h3>เกณฑ์และสิทธิ์</h3><span class="chip warn">แก้ไขได้</span></div>
      <div class="tbl-wrap"><table class="t"><thead><tr><th>ระดับ</th><th>ยอด 12 เดือน</th><th>ตัวคูณแต้ม</th><th>สิทธิ์</th></tr></thead><tbody>
      ${TIERS.map((t, i) => `<tr><td><b>${t.k}</b></td><td><input class="input" style="width:110px;padding:5px 8px" value="${t.min}" ${i ? '' : 'disabled'} onchange="TIERS[${i}].min=+this.value;route()"></td><td>x${t.mult}</td><td class="small prod">${t.perks.join(' · ')}</td></tr>`).join('')}
      </tbody></table></div>
      <p class="muted small" style="padding:0 16px 14px">ลองเปลี่ยนเกณฑ์ Silver เป็น 2,500 → จำนวนคนในแต่ละระดับด้านบนเปลี่ยนทันที (ค่าที่แก้อยู่ในหน้านี้จนกว่าจะรีโหลด)</p></div>
    <div class="card"><div class="ch-h"><h3>วิธีได้แต้ม & ของรางวัล</h3></div>
      <div class="pad" style="display:grid;gap:8px">
        ${[['ซื้อสินค้าทุกช่องทาง', '1 แต้ม / ฿25'], ['ผูกบัญชี LINE', '+50 แต้ม'], ['รีวิวสินค้าพร้อมรูป', '+20 แต้ม'], ['แนะนำเพื่อนซื้อครั้งแรก', '+100 แต้ม']].map(([a, b]) => `<div class="row between small"><span>${a}</span><b>${b}</b></div>`).join('')}
        <hr style="border:0;border-top:1px solid var(--g2);width:100%">
        ${REWARDS.map(r => `<div class="row between small"><span>${r.name}</span><span class="chip o">${r.pts} แต้ม</span></div>`).join('')}
      </div></div>
  </div>
  <div class="card" style="margin-top:16px"><div class="ch-h"><h3>ระดับตัวแทนจำหน่าย (B2B)</h3><a class="small" style="color:var(--o-dk);font-weight:600" href="#/admin/dealers">ดูตัวแทน →</a></div>
    <div class="tbl-wrap"><table class="t"><thead><tr><th>ระดับ</th><th>ส่วนลดจากราคาปลีก</th><th>เงื่อนไข</th><th>จำนวน</th></tr></thead><tbody>
    ${Object.entries(DEALER_TIERS).map(([k, v]) => `<tr><td><b>${k}</b></td><td>${v.disc}%</td><td class="small">${v.min}</td><td>${S.customers.filter(c => c.tier === k).length}</td></tr>`).join('')}
    <tr><td><b>ร้านคาร์แคร์</b></td><td>15%</td><td class="small">ซื้อ MD INFINITY / SUPER TRUCK / ชุดถังโฟม</td><td>${S.customers.filter(c => c.type === 'carcare').length}</td></tr>
    </tbody></table></div></div>`;
}

/* --- campaigns --- */
const CHN = {line:['LINE OA', 'line', 0.10], sms:['SMS', 'blue', 0.20], email:['อีเมล', '', 0.004]};
function aCampaigns() {
  const sent = S.campaigns.filter(c => c.status === 'sent');
  const sales = sent.reduce((s, c) => s + c.sales, 0), msgs = sent.reduce((s, c) => s + c.sent, 0);
  const cost = sent.reduce((s, c) => s + c.sent * CHN[c.ch][2], 0);
  return `${subTabs([['campaigns', 'แคมเปญ'], ['automation', 'ออโตเมชัน']], 'campaigns')}<div class="ph-h"><div><h1>แคมเปญ</h1><span class="muted">เลือกกลุ่ม → ช่องทาง (LINE / SMS / อีเมล) → ประเมินค่าส่งก่อนยิง → วัดผลย้อนกลับถึงยอดขาย</span></div><a class="btn btn-o btn-sm" href="#/admin/campaigns/new">+ สร้างแคมเปญ</a></div>
  <div class="kpis">
    <div class="kpi"><span class="lb">แคมเปญทั้งหมด</span><b>${S.campaigns.length}</b></div>
    <div class="kpi"><span class="lb">ส่งไปแล้ว</span><b class="num">${msgs}</b><span class="small muted">ข้อความ</span></div>
    <div class="kpi"><span class="lb">ยอดขายที่เกิดจากแคมเปญ</span><b class="num">${baht(sales)}</b></div>
    <div class="kpi"><span class="lb">ค่าส่งรวม (ประมาณ) · ROI</span><b class="num">฿${cost.toFixed(2)}</b><span class="small muted">${cost ? Math.round(sales / cost).toLocaleString() + ' เท่า' : '-'}</span></div>
  </div>
  <div class="card"><div class="tbl-wrap"><table class="t">
    <thead><tr><th>แคมเปญ</th><th>กลุ่มเป้าหมาย</th><th>ช่องทาง</th><th>สถานะ</th><th>funnel (ส่ง → เปิด → คลิก)</th><th style="text-align:right">ยอดขาย</th><th></th></tr></thead>
    <tbody>${[...S.campaigns].reverse().map(c => { const g = allSegs().find(x => x.id === c.seg); return `<tr>
      <td><b>${esc(c.name)}</b><div class="muted xs">${thd(c.date, 1)}</div></td>
      <td><span class="chip">${g ? g.name : c.seg}</span></td>
      <td><span class="chip ${CHN[c.ch][1]}">${CHN[c.ch][0]}</span></td>
      <td><span class="chip ${c.status === 'sent' ? 'ok' : c.status === 'scheduled' ? 'blue' : ''}">${c.status === 'sent' ? 'ส่งแล้ว' : c.status === 'scheduled' ? 'ตั้งเวลา' : 'ร่าง'}</span></td>
      <td style="min-width:180px"><div class="bar" style="height:6px"><i style="width:100%;background:var(--ink)"></i></div><div class="bar" style="height:6px;margin-top:3px"><i style="width:${c.sent ? c.click / c.sent * 100 : 0}%"></i></div><div class="xs muted num" style="margin-top:3px">${c.sent} → ${c.open ?? '–'} → ${c.click}</div></td>
      <td class="num" style="text-align:right"><b>${baht(c.sales)}</b><div class="muted xs">${c.orders} order</div></td><td>${c.status === 'sent' ? '' : `<button class="x" style="width:28px;height:28px;font-size:15px" title="ลบร่าง" onclick="S.campaigns=S.campaigns.filter(x=>x.id!=='${c.id}');save();route();toast('ลบร่างแล้ว')">×</button>`}</td></tr>`; }).join('')}</tbody></table></div>
    <div class="muted xs" style="padding:12px 16px">ตัวเลขจำลอง · คลิกนับรายคนจากลิงก์ติดตามของเรา · ยอดขายนับเมื่อคนที่คลิกซื้อภายใน 7 วัน (หน้าร้าน / LINE) · "เปิด" ของ LINE เป็นตัวเลขรวมจาก LINE ผู้รับน้อยกว่า 20 คนแสดง – · SMS ไม่มีข้อมูลการเปิด</div></div>`;
}
const TPL = {
  refill:{t:'สั่งซ้ำ 1 คลิก', d:'การ์ดสินค้า + ปุ่มสั่ง', title:'ถึงรอบเติมน้ำยาแล้ว', msg:'คุณ{ชื่อ} นีออนที่ซื้อไปน่าจะใกล้หมดแล้ว สั่งซ้ำได้ในแชทนี้เลย ใช้โค้ดลดเพิ่ม 5%', code:'REFILL5'},
  promo:{t:'โปร + โค้ด', d:'การ์ดโปรพร้อมโค้ด', title:'MD 10.10 ลดทั้งร้าน', msg:'คุณ{ชื่อ} ลด 10% ทุกรายการ ถึง 15 ต.ค. นี้เท่านั้น', code:'MD10'},
  new:{t:'สินค้าใหม่', d:'แนะนำสินค้า', title:'ใหม่! MD REDDY แชมพูล้างรถพร้อมเคลือบสี', msg:'คุณ{ชื่อ} ล้างและเคลือบในขั้นตอนเดียว ลด ฿50 สำหรับคุณ', code:'NEON50'},
  review:{t:'ขอรีวิว', d:'ให้คะแนน + แต้ม', title:'ใช้แล้วเป็นยังไงบ้าง?', msg:'คุณ{ชื่อ} ช่วยรีวิวสินค้าพร้อมรูป รับทันที 20 แต้ม', code:''},
};
const EDM_BLK = {banner:'แบนเนอร์สินค้า', h:'หัวข้อ', p:'ข้อความ', prods:'สินค้าจากร้าน', btn:'ปุ่ม', code:'โค้ดส่วนลด', foot:'ท้ายอีเมล (ยกเลิกรับ)'};
const EDM_TPL = {
  refill:[{t:'banner', pid:'p1'}, {t:'h', v:'ถึงรอบเติมน้ำยาแล้ว'}, {t:'p', v:'คุณ{ชื่อ} นีออนที่ซื้อไปน่าจะใกล้หมดแล้ว สั่งซ้ำวันนี้ลดเพิ่ม 5% ส่งตรงจากโรงงาน'}, {t:'prods', ids:['p1', 'p3', 'p15']}, {t:'code', v:'REFILL5'}, {t:'btn', v:'สั่งซ้ำเลย'}, {t:'foot'}],
  promo:[{t:'banner', pid:'p5'}, {t:'h', v:'MD 10.10 ลดทั้งร้าน'}, {t:'p', v:'คุณ{ชื่อ} ลด 10% ทุกรายการ ถึง 15 ต.ค. นี้เท่านั้น'}, {t:'code', v:'MD10'}, {t:'prods', ids:['p5', 'p27', 'p28']}, {t:'btn', v:'ช้อปเลย'}, {t:'foot'}],
  new:[{t:'banner', pid:'p16'}, {t:'h', v:'ใหม่! MD REDDY แชมพูล้างรถพร้อมเคลือบสี'}, {t:'p', v:'คุณ{ชื่อ} ล้างและเคลือบในขั้นตอนเดียว ลด ฿50 สำหรับคุณ'}, {t:'prods', ids:['p16', 'p18', 'p21']}, {t:'btn', v:'ดูสินค้า'}, {t:'foot'}],
  review:[{t:'h', v:'ใช้แล้วเป็นยังไงบ้าง?'}, {t:'p', v:'คุณ{ชื่อ} ช่วยรีวิวสินค้าพร้อมรูป รับทันที 20 แต้ม'}, {t:'btn', v:'ให้คะแนนสินค้า'}, {t:'foot'}],
};
let edmDev = 'd';
function edmFrom(k) { return {subj:(TPL[k] || TPL.refill).title, pre:'สิทธิ์เฉพาะสมาชิก MD Clean Car', blocks:JSON.parse(JSON.stringify(EDM_TPL[k] || EDM_TPL.refill))}; }
function edmMail(m, name) {
  const nm = name || 'เอกชัย', img = id => (window.MD_PHOTOS || {})[id];
  return `<div class="em-body"><div class="em-pre">${esc(m.pre)}</div><div class="em-hd">${mdMark(30)}<b>MD CLEAN CAR</b></div>${m.blocks.map(b => {
    if (b.t === 'banner') return `<div class="em-ban">${img(b.pid) ? `<img src="${img(b.pid)}" alt="">` : ''}<div><small>MD CLEAN CAR</small><b>${esc(P[b.pid] ? P[b.pid].short : '')}</b></div></div>`;
    if (b.t === 'h') return `<h2 class="em-h">${esc(b.v)}</h2>`;
    if (b.t === 'p') return `<p class="em-p">${esc(b.v).replace(/\{ชื่อ\}/g, esc(nm))}</p>`;
    if (b.t === 'prods') return `<div class="em-prods">${b.ids.filter(id => P[id]).map(id => `<div>${img(id) ? `<img src="${img(id)}" alt="">` : ''}<small>${esc(P[id].short)}</small><b>${baht(P[id].price)}</b></div>`).join('')}</div>`;
    if (b.t === 'code') return `<div class="code" style="margin:12px 18px">${esc(b.v)}</div>`;
    if (b.t === 'btn') return `<div style="padding:6px 18px 14px"><span class="em-btn">${esc(b.v)}</span></div>`;
    return `<div class="em-foot">บริษัท เอ็ม ดี คลีน จำกัด · สุราษฎร์ธานี<br><u>ยกเลิกการรับอีเมล</u> · ส่งเฉพาะผู้ที่ยินยอมรับข่าวสาร (PDPA)</div>`;
  }).join('')}</div>`;
}
function edmPv() { const e = document.getElementById('edmpv'); if (e) e.innerHTML = edmMail(cw.mail); }
function edmMv(i, d) { const b = cw.mail.blocks, j = i + d; if (j < 0 || j >= b.length || b[j].t === 'foot') return; [b[i], b[j]] = [b[j], b[i]]; route(); }
function edmDel(i) { cw.mail.blocks.splice(i, 1); route(); }
function edmAdd(t) { const b = cw.mail.blocks; b.splice(Math.max(0, b.length - 1), 0, t === 'prods' ? {t, ids:['p1', 'p5']} : t === 'banner' ? {t, pid:'p1'} : t === 'code' ? {t, v:'MD10'} : {t, v:t === 'btn' ? 'ดูรายละเอียด' : t === 'h' ? 'หัวข้อใหม่' : 'พิมพ์ข้อความ'}); route(); }
function edmEditor() {
  const m = cw.mail;
  return `<a class="small muted" href="javascript:cw.view='';route()">← กลับไปสร้างแคมเปญ</a>
  <div class="ph-h" style="margin-top:6px"><div><h1>ออกแบบอีเมล (EDM)</h1><span class="muted">เทมเพลต ${esc(TPL[cw.tpl].t)} · แก้ข้อความทางซ้าย ตัวอย่างทางขวาอัปเดตทันที · กลุ่มผู้รับเลือกในหน้าแคมเปญ</span></div><div class="row"><button class="btn btn-w btn-sm" onclick="toast('ส่งอีเมลทดสอบไปที่ marketing@mdcleancar.example แล้ว')">ส่งทดสอบ</button><button class="btn btn-o btn-sm" onclick="cw.view='';route();toast('ใช้อีเมลนี้ในแคมเปญแล้ว')">✓ ใช้อีเมลนี้</button></div></div>
  <div class="edm2"><div class="card pad">
    <label class="lb">หัวเรื่อง</label><input class="input" value="${esc(m.subj)}" oninput="cw.mail.subj=this.value;edmPv()">
    <label class="lb" style="margin-top:10px">ข้อความตัวอย่าง (preheader)</label><input class="input" value="${esc(m.pre)}" oninput="cw.mail.pre=this.value;edmPv()">
    <label class="lb" style="margin-top:16px">บล็อกในอีเมล</label>
    ${m.blocks.map((b, i) => `<div class="eb"><span class="t">${EDM_BLK[b.t]}</span>
      ${b.t === 'h' || b.t === 'btn' || b.t === 'code' ? `<input class="input sm" value="${esc(b.v)}" oninput="cw.mail.blocks[${i}].v=this.value;edmPv()">` : b.t === 'p' ? `<textarea class="input sm" rows="2" oninput="cw.mail.blocks[${i}].v=this.value;edmPv()">${esc(b.v)}</textarea>`
        : b.t === 'banner' ? `<select class="input sm" onchange="cw.mail.blocks[${i}].pid=this.value;edmPv()">${PRODUCTS.filter(isOn).map(p => `<option value="${p.id}" ${b.pid === p.id ? 'selected' : ''}>${esc(p.short)}</option>`).join('')}</select>`
        : b.t === 'prods' ? `<div class="small">${b.ids.map(id => esc((P[id] || {}).short || id)).join(' · ')}<select class="input sm" style="margin-top:6px" onchange="if(this.value){const L=cw.mail.blocks[${i}].ids;L.includes(this.value)?L.splice(L.indexOf(this.value),1):L.push(this.value);route()}"><option value="">+ เพิ่ม / เอาสินค้าออก</option>${PRODUCTS.filter(isOn).map(p => `<option value="${p.id}">${b.ids.includes(p.id) ? '✓ ' : ''}${esc(p.short)}</option>`).join('')}</select></div>` : '<small class="muted">บังคับมีทุกฉบับ (PDPA)</small>'}
      <span class="a">${b.t === 'foot' ? '' : `<button onclick="edmMv(${i},-1)" title="ขึ้น" aria-label="ขึ้น">↑</button><button onclick="edmMv(${i},1)" title="ลง" aria-label="ลง">↓</button><button onclick="edmDel(${i})" title="ลบ" aria-label="ลบ">✕</button>`}</span></div>`).join('')}
    <div class="eadd">${['h', 'p', 'prods', 'btn', 'code', 'banner'].map(t => `<button class="fbtn2" onclick="edmAdd('${t}')">+ ${EDM_BLK[t]}</button>`).join('')}</div>
  </div>
  <div class="card pad epv"><div class="row between"><b>ตัวอย่าง</b><div class="seg3">${[['d', 'Desktop'], ['m', 'มือถือ']].map(([k, n]) => `<button class="${edmDev === k ? 'on' : ''}" onclick="edmDev='${k}';route()">${n}</button>`).join('')}</div></div>
    <div class="em ${edmDev === 'm' ? 'm' : ''}"><div class="em-from">จาก <b>MD Clean Car</b> &lt;news@mdcleancar.example&gt; · <b>${esc(m.subj)}</b></div><div id="edmpv">${edmMail(m)}</div></div></div></div>`;
}
let cw = null;
function aCampNew(qs) {
  if (!cw || qs.get('seg')) cw = {name:'', seg: qs.get('seg') || 'refill', ch:'line', tpl:'refill', msg:TPL.refill.msg, code:TPL.refill.code, title:TPL.refill.title};
  if (qs.get('seg')) history.replaceState(null, '', '#/admin/campaigns/new');
  if (cw.ch === 'email' && !cw.mail) cw.mail = edmFrom(cw.tpl);
  if (cw.view === 'email' && cw.mail) return edmEditor();
  const segs = allSegs(), g = segs.find(x => x.id === cw.seg) || segs[0], m = segMembers(g);
  const noC = m.filter(c => !c.consent).length;
  const ok = m.filter(c => c.consent);
  const noCh = cw.ch === 'line' ? ok.filter(c => !c.line).length : cw.ch === 'email' ? ok.filter(c => !c.email).length : 0;
  const reach = ok.length - noCh;
  const cost = reach * CHN[cw.ch][2];
  const u1 = cust('C-1001');
  const prevName = (m[0] || u1).name.split(' ')[0];
  const preview = cw.ch === 'line'
    ? `<div style="padding:12px 8px;display:flex;gap:6px;align-items:flex-start"><div style="width:26px;height:26px;border-radius:50%;background:#111316;display:grid;place-items:center;flex:none">${mdMark(18)}</div>${flexHTML({type:'campaign', title:cw.title, msg:cw.msg.replace('{ชื่อ}', prevName), code:cw.code, tpl:cw.tpl}).replace('width:250px', '')}</div>`
    : cw.ch === 'sms'
      ? `<div style="background:#fff;min-height:330px;padding:14px"><div class="xs muted" style="text-align:center">SMS · MDCleanCar</div><div style="background:#E9E9EB;border-radius:16px;padding:10px 12px;margin-top:10px;font-size:13px">[MD Clean Car] ${esc(cw.msg.replace('{ชื่อ}', prevName))}${cw.code ? ' โค้ด ' + cw.code : ''} สั่งเลย mdclean.co/r/${cw.tpl} ยกเลิก*137</div></div>`
      : `<div class="em m" style="border:0">${edmMail(cw.mail, prevName)}</div>`;
  return `<a class="small muted" href="#/admin/campaigns">← แคมเปญ</a>
  <div class="ph-h" style="margin-top:6px"><h1>สร้างแคมเปญ</h1><div class="steps"><span><b>1</b>เลือกกลุ่ม</span>—<span><b>2</b>ช่องทาง · เทมเพลต</span>—<span><b>3</b>ตรวจค่าส่ง & ยิง</span></div></div>
  <div class="g2">
    <div style="display:grid;gap:14px;align-content:start">
      <div class="card pad"><h3 style="font-size:15px;margin-bottom:10px">1 · กลุ่มเป้าหมาย</h3>
        <label class="lb">ชื่อแคมเปญ</label><input class="input" id="cname" placeholder="เช่น เติมนีออนรอบ ต.ค." value="${esc(cw.name)}" oninput="cw.name=this.value">
        <div class="row" style="margin-top:10px"><select class="input" onchange="cw.seg=this.value;route()">${segs.map(s => `<option value="${s.id}" ${s.id === cw.seg ? 'selected' : ''}>${s.name} (${segMembers(s).length} คน)</option>`).join('')}</select><a class="small" style="white-space:nowrap;color:var(--o-dk);font-weight:600" href="#/admin/segments">จัดการกลุ่ม →</a></div>
        <p class="muted small" style="margin:8px 0 0">${g.desc}</p></div>
      <div class="card pad"><h3 style="font-size:15px;margin-bottom:10px">2 · ช่องทาง · เทมเพลต · ข้อความ</h3>
        <div class="row wrap">${Object.entries(CHN).map(([k, v]) => { const n = k === 'line' ? ok.filter(c => c.line).length : k === 'email' ? ok.filter(c => c.email).length : ok.length; return `<button class="opt ${cw.ch === k ? 'on' : ''}" onclick="cw.ch='${k}';route()"><b>${v[0]}</b><span>ส่งได้ ${n} คน · ~฿${v[2] < 0.01 ? v[2].toFixed(3) : v[2].toFixed(2)}/ข้อความ</span></button>`; }).join('')}</div>
        <label class="lb" style="margin-top:14px">เทมเพลต</label>
        <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px">${Object.entries(TPL).map(([k, t]) => `<button class="opt ${cw.tpl === k ? 'on' : ''}" onclick="Object.assign(cw,{tpl:'${k}',msg:TPL.${k}.msg,code:TPL.${k}.code,title:TPL.${k}.title,mail:cw.ch==='email'?edmFrom('${k}'):null});route()"><b>${t.t}</b><span>${t.d}</span></button>`).join('')}</div>
        ${cw.ch === 'email' ? `<label class="lb" style="margin-top:14px">หัวเรื่องอีเมล</label><input class="input" value="${esc(cw.mail.subj)}" onchange="cw.mail.subj=this.value;route()">
        <div class="emsum"><span class="small">${cw.mail.blocks.map(b => EDM_BLK[b.t]).join(' · ')}</span><button class="btn btn-o btn-sm" onclick="cw.view='email';route()">✎ ออกแบบอีเมล (EDM)</button></div>` : `<label class="lb" style="margin-top:14px">หัวข้อ</label><input class="input" value="${esc(cw.title)}" onchange="cw.title=this.value;route()">
        <label class="lb" style="margin-top:10px">ข้อความ <span class="muted" style="font-weight:400">· ใช้ {ชื่อ} แทนชื่อลูกค้า</span></label><textarea class="input" rows="3" onchange="cw.msg=this.value;route()">${esc(cw.msg)}</textarea>
        <div class="row" style="gap:6px;margin-top:6px"><button class="fbtn2" onclick="cw.msg=(cw.msg||'')+' {ชื่อ}';route()">+ ชื่อลูกค้า</button><button class="fbtn2" onclick="cw.msg=(cw.msg||'')+' '+(cw.code||'MD10');route()">+ โค้ดส่วนลด</button></div>`}
        <div class="row" style="margin-top:10px"><label class="lb" style="margin:0">โค้ดส่วนลด</label><select class="input" style="max-width:220px" onchange="cw.code=this.value;route()"><option value="">ไม่แนบโค้ด</option>${S.codes.filter(c => c.on).map(c => `<option ${c.code === cw.code ? 'selected' : ''}>${c.code}</option>`).join('')}</select></div></div>
      <div class="card pad"><h3 style="font-size:15px;margin-bottom:10px">3 · ประเมินก่อนยิง</h3>
        <div class="small">ในกลุ่ม <b>${m.length}</b> · ไม่ยินยอม <b style="color:var(--red)">−${noC}</b>${cw.ch !== 'sms' ? ` · ไม่มี${cw.ch === 'line' ? ' LINE' : 'อีเมล'} <b style="color:var(--red)">−${noCh}</b>` : ''} → <b style="font-size:15px">ส่งถึง ${reach} คน</b> · ค่าส่งประมาณ <b>฿${cost.toFixed(2)}</b></div>
        ${cw.ch === 'line' && noCh ? `<div class="note" style="margin-top:8px">มี ${noCh} คนที่ยังไม่ผูก LINE — ส่ง SMS แทนอัตโนมัติได้ (fallback) หรือชวนผูก LINE ก่อนผ่านหน้าสมาชิก</div>` : ''}
        <div class="row wrap" style="margin-top:14px"><a class="btn btn-w btn-sm" href="#/admin/campaigns">ยกเลิก</a><button class="btn btn-w btn-sm" onclick="toast('ส่งทดสอบถึงทีมการตลาดแล้ว')">ส่งทดสอบ</button><button class="btn btn-w btn-sm" onclick="sendCamp(${reach},'scheduled')">ตั้งเวลา</button><span style="flex:1"></span><button class="btn btn-o" ${reach ? '' : 'disabled'} onclick="sendCamp(${reach},'sent')">ส่งแคมเปญ · ${reach} คน</button></div></div>
    </div>
    <div><div class="card pad" style="position:sticky;top:110px"><h3 style="font-size:15px;margin-bottom:12px">ตัวอย่างที่ลูกค้าจะเห็น · ${CHN[cw.ch][0]}</h3>
      <div class="preview-phone" style="${cw.ch !== 'line' ? 'background:#fff' : ''}">${preview}</div>
      <p class="muted xs" style="text-align:center;margin-top:10px">ส่งถึงเฉพาะคนที่ยินยอมรับข่าวสาร · มีปุ่มหยุดรับทุกข้อความ (PDPA)</p></div></div>
  </div>`;
}
function sendCamp(reach, status) {
  const g = allSegs().find(x => x.id === cw.seg), m = segMembers(g);
  const name = cw.name || (cw.ch === 'email' && cw.mail ? cw.mail.subj : cw.title);
  const click = status === 'sent' ? Math.max(1, Math.round(reach * .45)) : 0, orders = status === 'sent' ? Math.max(reach ? 1 : 0, Math.round(reach * .2)) : 0;
  S.campaigns.push({id:'cp' + Date.now(), name, seg:cw.seg, ch:cw.ch, date:iso(TODAY), status, sent: status === 'sent' ? reach : 0, open: cw.ch === 'email' && status === 'sent' ? Math.round(reach * .6) : null, click, orders, sales: orders * (cw.tpl === 'refill' ? 597 : 520)});
  let pushed = false;
  const u = cust('C-1001');
  if (status === 'sent' && cw.ch === 'line' && m.includes(u) && u.line && u.consent) { pushLine({type:'campaign', title:cw.title, msg:cw.msg, code:cw.code, tpl:cw.tpl}); pushed = true; }
  save(); cw = null;
  location.hash = '#/admin/campaigns';
  toast(status === 'sent' ? `ส่งแล้ว ${reach} คน${pushed ? ' · เปิด LINE OA ดูข้อความที่เอกชัยได้รับ' : m.includes(u) && !u.line ? ' · เอกชัยยังไม่ผูก LINE จึงไม่ได้รับ' : ''}` : 'ตั้งเวลาส่งแล้ว');
}

/* --- automation --- */
function aAuto() {
  const on = S.autos.filter(a => a.on).length;
  const sales = S.autos.reduce((s, a) => s + a.stat.sales, 0);
  return `${subTabs([['campaigns', 'แคมเปญ'], ['automation', 'ออโตเมชัน']], 'automation')}<div class="ph-h"><div><h1>ออโตเมชัน</h1><span class="muted">ตั้งครั้งเดียว ระบบส่งเองตามพฤติกรรมลูกค้า · เหมาะกับสินค้าที่ใช้แล้วหมดและต้องซื้อซ้ำ</span></div><button class="btn btn-o btn-sm" onclick="toast('ตัวสร้าง flow แบบลากวาง — อยู่ในเฟสถัดไป')">+ สร้าง flow</button></div>
  <div class="kpis">
    <div class="kpi"><span class="lb">flow ที่เปิดอยู่</span><b>${on} / ${S.autos.length}</b></div>
    <div class="kpi"><span class="lb">ข้อความที่ส่ง (30 วัน)</span><b class="num">${S.autos.reduce((s, a) => s + a.stat.sent, 0)}</b></div>
    <div class="kpi"><span class="lb">ลูกค้ากลับมาซื้อ</span><b class="num">${S.autos.reduce((s, a) => s + a.stat.conv, 0)}</b></div>
    <div class="kpi"><span class="lb">ยอดขายจากออโตเมชัน</span><b class="num">${baht(sales)}</b></div>
  </div>
  <div style="display:grid;gap:12px">${S.autos.map((a, i) => `<div class="card pad" style="${a.on ? '' : 'opacity:.75'}">
    <div class="row between wrap" style="gap:10px"><div class="row"><button class="toggle ${a.on ? 'on' : ''}" onclick="S.autos[${i}].on=!S.autos[${i}].on;save();route();toast('${a.name}: '+(S.autos[${i}].on?'เปิดแล้ว':'ปิดแล้ว'))" aria-label="เปิดปิด"></button><div><b style="font-size:15px">${a.name}</b><div class="muted xs">เริ่มเมื่อ: ${a.trig}</div></div></div>
      <div class="row small" style="gap:14px"><span><span class="muted">เข้าเงื่อนไข</span> <b>${a.stat.enter}</b></span><span><span class="muted">ส่ง</span> <b>${a.stat.sent}</b></span><span><span class="muted">สำเร็จ</span> <b>${a.stat.conv}</b></span><span><span class="muted">ยอด</span> <b>${baht(a.stat.sales)}</b></span></div></div>
    <div class="flow" style="margin-top:12px">${a.steps.map(([k, t], j) => `${j ? '<span class="ar">→</span>' : ''}<span class="nd ${k}">${t}</span>`).join('')}</div>
  </div>`).join('')}</div>
  <p class="muted small" style="margin-top:12px">สีเขียว = LINE · สีฟ้า = SMS (fallback เมื่อไม่มี LINE หรือไม่ตอบสนอง) · ทุก flow ตัดคนที่ไม่ยินยอมรับข่าวสารออกอัตโนมัติ</p>`;
}

/* --- promos --- */
let codeF = 'all', codeQ = '', nc = null;
const codeOrders = k => S.orders.filter(o => o.code === k && !['ยกเลิก', 'คืนเงิน'].includes(ordStatus(o)));
const codeUsed = c => (c.used || 0) + codeOrders(c.code).length;
const codeDisc = c => (c.disc0 || 0) + codeOrders(c.code).reduce((a, o) => a + (o.refund ? o.items.reduce((t, it, i) => t + (o.refund.lines.includes(i) ? 0 : P[it[0]].price * it[1] - lineNet(o, i)), 0) : o.off || 0), 0);
function aPromos() {
  const q = codeQ.trim().toUpperCase(), onN = S.codes.filter(c => c.on).length;
  const rows = S.codes.map((c, i) => [c, i]).filter(([c]) => (!q || c.code.includes(q)) && (codeF === 'all' || (codeF === 'on') === !!c.on));
  return `<div class="ph-h"><div><h1>ส่วนลด & โปรโมชัน</h1><span class="muted">โค้ดส่วนลดแยกตามหมวดสินค้า · ลูกค้าใส่โค้ดที่หน้าตะกร้า (เว็บและ LINE) · ปิดโค้ดแล้วใช้ไม่ได้ทันที</span></div><button class="btn btn-o btn-sm" onclick="openCode()">+ สร้างโค้ด</button></div>
  <div class="card"><div class="ch-h pl-f"><h3>โค้ดส่วนลด</h3><span class="muted small">${S.codes.length} โค้ด · เปิดใช้ ${onN}</span><span class="grow"></span>
      <div class="seg3">${[['all', 'ทั้งหมด'], ['on', 'เปิดใช้'], ['off', 'ปิดแล้ว']].map(([k, n]) => `<button class="${codeF === k ? 'on' : ''}" onclick="codeF='${k}';route()">${n}</button>`).join('')}</div>
      <label class="pl-s">${I.search}<input placeholder="ค้นหาโค้ด" value="${esc(codeQ)}" oninput="codeQ=this.value;clearTimeout(window._cq);window._cq=setTimeout(route,250)" aria-label="ค้นหาโค้ด"></label></div>
    <div class="tbl-wrap"><table class="t">
    <thead><tr><th>โค้ด</th><th>ใช้กับ</th><th>ส่วนลด</th><th>ขั้นต่ำ</th><th style="text-align:right">ใช้ไปแล้ว</th><th style="text-align:right">ส่วนลดรวม</th><th>เปิดใช้</th></tr></thead>
    <tbody>${rows.map(([c, i]) => `<tr class="${c.on ? '' : 'off'}"><td><b class="codek">${c.code}</b><div class="muted xs">${esc(c.desc)}</div></td>
      <td class="nw">${c.cat ? `<span class="chip o">${esc(catName(c.cat))}</span>` : '<span class="chip">ทุกสินค้า</span>'}</td>
      <td class="nw">${c.type === 'pct' ? 'ลด ' + c.val + '%' : 'ลด ' + baht(c.val)}</td><td class="nw">${c.min ? baht(c.min) : '—'}</td>
      <td class="num nw" style="text-align:right">${codeUsed(c)} ครั้ง</td><td class="num nw" style="text-align:right">${baht(codeDisc(c))}</td>
      <td><button class="toggle ${c.on ? 'on' : ''}" onclick="S.codes[${i}].on=!S.codes[${i}].on;save();route();toast(S.codes[${i}].on?'เปิดใช้โค้ด ${c.code} แล้ว':'ปิดโค้ด ${c.code} แล้ว · ใช้ที่ตะกร้าไม่ได้ทันที')" aria-label="${c.on ? 'ปิดใช้' : 'เปิดใช้'}" title="${c.on ? 'ปิดใช้' : 'เปิดใช้'}"></button></td></tr>`).join('')
      || `<tr><td colspan="7" class="muted" style="text-align:center;padding:48px 24px">${S.codes.length ? 'ไม่พบโค้ดที่ค้นหา' : 'ยังไม่มีโค้ด — กด "สร้างโค้ด"'}</td></tr>`}</tbody></table></div></div>
  <div class="card" style="margin-top:16px"><div class="ch-h"><h3>โปรโมชันอัตโนมัติ</h3><span class="muted small">ไม่ต้องใช้โค้ด · คำนวณที่ตะกร้าเอง</span></div>
    <div class="tbl-wrap"><table class="t"><thead><tr><th>โปรโมชัน</th><th>เงื่อนไข</th><th>สถานะ</th></tr></thead><tbody>
      ${[[I.truck, 'ส่งฟรีเมื่อซื้อครบ ฿500', 'ทุกช่องทางซื้อตรง · คำนวณที่ตะกร้า', 1], [I.crown, 'สมาชิก Gold ขึ้นไป แต้ม x1.5 – x2', 'ตามระดับสมาชิก', 1], [I.tag, 'ซื้อเซตนีออน 2 ชุด แถมขวดสเปรย์', 'เซตนีออน · ถึง 31 ต.ค.', 0]].map(([ic, n, d, on]) => `<tr><td><div class="row" style="gap:10px"><span class="pr-ic">${ic}</span><b>${n}</b></div></td><td class="small muted">${d}</td><td>${on ? '<span class="chip ok">เปิดใช้</span>' : '<span class="chip">ยังไม่เปิด</span>'}</td></tr>`).join('')}
    </tbody></table></div></div>`;
}
function openCode() { nc = {code:'', cat:'', type:'pct', val:10, min:0}; codeModal(); }
function codeModal() {
  modal(`<div class="pad" style="padding:24px">
    <div class="row between"><h3 style="font-size:20px" class="row">${I.tag} สร้างโค้ดส่วนลด</h3><button class="x" onclick="closeLayer()" aria-label="ปิด">×</button></div>
    <div style="display:grid;gap:12px;margin-top:14px">
      <div><label class="lb">โค้ด</label><input class="input codek" id="nc-code" placeholder="เช่น RAINY15" value="${esc(nc.code)}" maxlength="20" oninput="this.value=this.value.toUpperCase().replace(/\\s/g,'');nc.code=this.value"></div>
      <div><label class="lb">ใช้กับ</label><select class="input" onchange="nc.cat=this.value"><option value="">ทุกสินค้า</option>${S.cats.map(c => `<option value="${c[0]}" ${nc.cat === c[0] ? 'selected' : ''}>หมวด ${esc(c[1])}</option>`).join('')}</select></div>
      <div><label class="lb">ประเภทส่วนลด</label><div class="seg3" style="width:fit-content">${[['pct', 'ลด %'], ['amt', 'ลดเป็นบาท']].map(([k, n]) => `<button class="${nc.type === k ? 'on' : ''}" onclick="nc.code=document.getElementById('nc-code').value;nc.type='${k}';codeModal()">${n}</button>`).join('')}</div></div>
      <div class="row" style="gap:10px;align-items:flex-start"><div class="grow"><label class="lb">${nc.type === 'pct' ? 'ลด (%)' : 'ลด (฿)'}</label><input class="input" type="number" min="1" value="${nc.val}" oninput="nc.val=+this.value"></div><div class="grow"><label class="lb">ยอดขั้นต่ำ (฿)</label><input class="input" type="number" min="0" value="${nc.min || ''}" placeholder="ไม่มี" oninput="nc.min=+this.value"></div></div>
      <p class="muted small" style="margin:0">ลูกค้าใส่โค้ดที่หน้าตะกร้า (เว็บและ LINE) · ถ้าเลือกหมวด ส่วนลดคิดเฉพาะสินค้าในหมวดนั้น · ปิดโค้ดได้ทุกเมื่อ</p>
    </div>
    <div class="row" style="justify-content:flex-end;margin-top:18px"><button class="btn btn-w btn-sm" onclick="closeLayer()">ยกเลิก</button><button class="btn btn-o btn-sm" onclick="addCode()">สร้างโค้ด</button></div></div>`);
  setTimeout(() => { const e = document.getElementById('nc-code'); if (e && !nc.code) e.focus(); }, 60);
}
function addCode() {
  const k = (nc.code || '').trim().toUpperCase();
  if (!k) { toast('ใส่ชื่อโค้ดก่อน'); return; }
  if (!/^[A-Z0-9_-]{3,20}$/.test(k)) { toast('โค้ดใช้ A–Z ตัวเลข - _ ยาว 3–20 ตัว'); return; }
  if (S.codes.some(c => c.code === k)) { toast('โค้ดนี้มีอยู่แล้ว'); return; }
  if (!(nc.val > 0) || (nc.type === 'pct' && nc.val > 100)) { toast(nc.type === 'pct' ? 'ส่วนลดต้องอยู่ระหว่าง 1–100%' : 'ใส่มูลค่าส่วนลด'); return; }
  const off = nc.type === 'pct' ? 'ลด ' + nc.val + '%' : 'ลด ' + baht(nc.val);
  S.codes.unshift({code:k, desc:(nc.cat ? 'หมวด ' + catName(nc.cat) + ' ' : 'ทั้งร้าน ') + off + (nc.min ? ' (ขั้นต่ำ ' + baht(nc.min) + ')' : ''), type:nc.type, val:nc.val, min:nc.min || 0, cat:nc.cat, used:0, on:true});
  codeF = 'all'; codeQ = ''; save(); closeLayer(); route(); toast('สร้างโค้ด ' + k + ' แล้ว — ใช้ที่หน้าตะกร้าได้เลย');
}

/* --- dealers --- */
function bizModal(li) {
  const l = li == null ? null : S.leads[li], t = l && l.type !== 'oem' ? l.type : 'dealer';
  const opt = (k, n) => `<button class="opt ${k === t ? 'on' : ''}" data-k="${k}" onclick="document.querySelectorAll('#bt .opt').forEach(b=>b.classList.remove('on'));this.classList.add('on');document.getElementById('bz-d').style.display=this.dataset.k==='dealer'?'':'none';document.getElementById('bz-c').style.display=this.dataset.k==='carcare'?'':'none'"><b>${n}</b></button>`;
  modal(`<div class="pad" style="padding:24px">
    <div class="row between"><h3 style="font-size:20px">${l ? 'อนุมัติเป็นลูกค้าธุรกิจ' : 'เพิ่มลูกค้าธุรกิจ'}</h3><button class="x" onclick="closeLayer()">×</button></div>
    <p class="muted small">${l ? `จากลีด ${l.id} · ${thd(l.date)}` : 'สำหรับร้านที่เซลส์ไปเปิดบัญชีเอง หรือร้านเดิมที่ยังไม่อยู่ในระบบ'}</p>
    <div class="row" style="gap:8px;margin:12px 0" id="bt">${opt('dealer', 'ตัวแทนจำหน่าย')}${opt('carcare', 'ร้านคาร์แคร์')}</div>
    <div style="display:grid;gap:10px">
      <div><label class="lb">ชื่อร้าน / บริษัท</label><input class="input" id="bz-n" value="${esc(l ? l.shop : '')}" placeholder="เช่น หจก. ชุมพร ออโต้"></div>
      <div class="row" style="gap:10px"><div class="grow"><label class="lb">ผู้ติดต่อ</label><input class="input" id="bz-p" value="${esc(l ? l.name : '')}"></div><div class="grow"><label class="lb">เบอร์โทร</label><input class="input" id="bz-ph" value="${esc(l ? l.phone : '')}"></div></div>
      <div class="row" style="gap:10px"><div class="grow"><label class="lb">จังหวัด / พื้นที่</label><input class="input" id="bz-r" value="${esc(l ? l.prov : '')}"></div><div class="grow"><label class="lb">อีเมล (ไม่บังคับ)</label><input class="input" id="bz-e"></div></div>
      <div><label class="lb">ที่อยู่ร้าน (ใช้จัดส่งและออกใบกำกับภาษี)</label><input class="input" id="bz-a" placeholder="เลขที่ · ถนน · ตำบล · อำเภอ"></div>
      <div><label class="lb">เลขประจำตัวผู้เสียภาษี (13 หลัก · ไม่บังคับ)</label><input class="input" id="bz-x" inputmode="numeric" maxlength="17" placeholder="ร้านกรอกเองในพอร์ทัลตัวแทนได้ภายหลัง"></div>
      <div id="bz-d" style="${t === 'dealer' ? '' : 'display:none'}"><label class="lb">ระดับราคาตัวแทน</label><select class="input" id="bz-t">${Object.entries(DEALER_TIERS).map(([k, v]) => `<option value="${k}">${k} · ลด ${v.disc}% · ขั้นต่ำ ${v.min}</option>`).join('')}</select></div>
      <div id="bz-c" style="${t === 'carcare' ? '' : 'display:none'}"><label class="lb">จำนวนช่องล้าง</label><input class="input" id="bz-b" type="number" min="1" value="2"><div class="muted xs" style="margin-top:4px">ร้านคาร์แคร์ได้ราคาส่ง −15% คงที่</div></div>
      <div><label class="lb">เป้ายอดสั่งต่อเดือน (บาท)</label><input class="input" id="bz-g" type="number" min="0" step="1000" value="12000"></div>
      <label class="row small" style="gap:8px"><input type="checkbox" id="bz-l" checked> ส่งลิงก์เปิดบัญชี / พอร์ทัลตัวแทนทาง LINE (จำลอง)</label>
    </div>
    <button class="btn btn-o" style="width:100%;margin-top:16px;padding:12px" onclick="saveBiz(${li == null ? 'null' : li})">${l ? 'อนุมัติและเพิ่มร้าน' : 'เพิ่มลูกค้าธุรกิจ'}</button></div>`);
}
function saveBiz(li) {
  const g = id => document.getElementById(id).value.trim();
  if (!g('bz-n')) { toast('กรอกชื่อร้านก่อน'); return; }
  const type = document.querySelector('#bt .opt.on').dataset.k;
  let n = 1001; while (S.customers.some(c => c.id === 'C-' + n)) n++;
  const c = {id:'C-' + n, name:g('bz-n') + (g('bz-p') ? ` (${g('bz-p')})` : ''), type, region:g('bz-r') || '-', phone:g('bz-ph'), email:g('bz-e'), line:'', fb:false, consent:true, bday:null, joined:iso(TODAY), target:+g('bz-g') || 0};
  if (type === 'dealer') c.tier = g('bz-t'); else c.bays = +g('bz-b') || 1;
  const z = Object.keys(ZIP).find(k => ZIP[k][0] === c.region), nm = g('bz-n');
  if (g('bz-a')) c.addrs = [{id:'a1', label:'ที่ทำงาน', name:nm, tel:c.phone, line:g('bz-a'), sub:'', dist:z ? ZIP[z][1] : '', prov:c.region, zip:z || '', def:1}];
  const tid = g('bz-x').replace(/\D/g, ''); if (tid.length === 13) c.tax = {type:'company', name:nm, taxId:tid, branch:'สำนักงานใหญ่', addrId:'a1'};
  S.customers.push(c);
  if (li != null) Object.assign(S.leads[li], {status:'อนุมัติ', cid:c.id});
  save(); closeLayer(); route();
  toast(`เพิ่ม ${g('bz-n')} แล้ว (${c.id})${document.getElementById('bz-l') && document.getElementById('bz-l').checked ? ' · ส่งลิงก์เปิดบัญชีทาง LINE (จำลอง)' : ''}`);
}
function aDealers() {
  const ds = S.customers.filter(c => c.type === 'dealer' || c.type === 'carcare').map(c => ({c, s:st(c)}));
  const LT = {dealer:['ตัวแทน', 'gold'], carcare:['คาร์แคร์', 'neon'], oem:['OEM', 'k']};
  return `<div class="ph-h"><div><h1>ตัวแทน & คาร์แคร์</h1><span class="muted">ลูกค้าธุรกิจ · ราคาตามระดับ · เป้ายอดรายเดือน · ลีดที่เข้ามาจากหน้าร้านและ LINE</span></div><button class="btn btn-o btn-sm" onclick="bizModal()">+ เพิ่มลูกค้าธุรกิจ</button></div>
  <div class="card" style="margin-bottom:16px"><div class="ch-h"><h3>ลีดใหม่ (สมัครตัวแทน / คาร์แคร์ / OEM)</h3><span class="chip warn">${S.leads.filter(l => l.status === 'ใหม่').length} รอติดต่อ</span></div><div class="tbl-wrap"><table class="t">
    <thead><tr><th>วันที่</th><th>ผู้ติดต่อ</th><th>ประเภท</th><th>จังหวัด</th><th>หมายเหตุ</th><th>สถานะ</th><th></th></tr></thead>
    <tbody>${S.leads.map((l, i) => `<tr><td class="small" style="white-space:nowrap">${thd(l.date)}</td><td style="min-width:180px"><b>${esc(l.shop)}</b><div class="muted xs">${esc(l.name)} · ${esc(l.phone)}</div></td><td><span class="chip ${LT[l.type][1]}">${LT[l.type][0]}</span></td><td class="small">${esc(l.prov)}</td><td class="small muted prod">${esc(l.note || '—')}</td>
      <td><span class="chip ${l.status === 'ใหม่' ? 'warn' : l.status === 'อนุมัติ' ? 'ok' : 'blue'}">${l.status}</span></td>
      <td style="white-space:nowrap">${l.status !== 'อนุมัติ' && l.status !== 'ส่งต่อทีม OEM' ? `<button class="btn btn-w btn-sm" onclick="S.leads[${i}].status='นัดคุย';save();route()">นัดคุย</button> ${l.type === 'oem' ? `<button class="btn btn-k btn-sm" onclick="S.leads[${i}].status='ส่งต่อทีม OEM';save();route();toast('ส่งต่อทีม OEM แล้ว')">ส่งต่อทีม OEM</button>` : `<button class="btn btn-k btn-sm" onclick="bizModal(${i})">อนุมัติ</button>`}` : l.cid ? `<button class="btn btn-w btn-sm" onclick="openCust('${l.cid}')">ดูร้าน →</button>` : ''}</td></tr>`).join('')}</tbody></table></div></div>
  <div class="card"><div class="ch-h"><h3>ลูกค้าธุรกิจ</h3><span class="muted small">${ds.length} ราย</span></div><div class="tbl-wrap"><table class="t">
    <thead><tr><th>ร้าน</th><th>ระดับ</th><th>พื้นที่</th><th>ยอด 30 วัน vs เป้า</th><th>แนวโน้ม 60 วัน</th><th>สั่งล่าสุด</th></tr></thead>
    <tbody>${ds.sort((a, b) => b.s.spend - a.s.spend).map(({c, s}) => { const tgt = c.target || 6000; const pct = Math.min(100, s.month / tgt * 100); const up = s.l60 >= s.p60; return `<tr class="click" onclick="openCust('${c.id}')">
      <td style="min-width:220px"><div class="row">${av(c)}<div><b>${esc(c.name)}</b><div class="muted xs">${c.id}${c.bays ? ' · ' + c.bays + ' ช่องล้าง' : ''}</div></div></div></td>
      <td>${typeChip(c)} <span class="muted xs">−${c.type === 'dealer' ? DEALER_TIERS[c.tier].disc : 15}%</span></td>
      <td class="small" style="white-space:nowrap"><span class="row" style="gap:4px">${I.pin} ${c.region}</span></td>
      <td style="min-width:180px"><div class="row between small"><b class="num">${baht(s.month)}</b><span class="muted num">${baht(tgt)}</span></div><div class="bar" style="margin-top:4px"><i style="width:${pct}%;background:${pct >= 80 ? 'var(--ok)' : pct >= 40 ? 'var(--gold)' : 'var(--red)'}"></i></div></td>
      <td><span class="chip ${up ? 'ok' : 'bad'}">${up ? '▲' : '▼'} ${s.p60 ? Math.round((s.l60 - s.p60) / s.p60 * 100) + '%' : 'ใหม่'}</span></td>
      <td class="small">${s.last ? thd(s.last.date) : '-'}</td></tr>`; }).join('')}</tbody></table></div>
    <div class="muted xs" style="padding:12px 16px">ระบบจริง: ตัวแทนสั่งของผ่าน LINE / พอร์ทัลตัวแทนด้วยราคาตามระดับ · เซลส์เห็นยอดตามพื้นที่ที่ดูแล</div></div>`;
}

/* =========================================================
   ROUTER
   ========================================================= */
// keep scroll positions (page + inner scroll panes) when a page re-renders itself
function scrollKey(el, root) { const sel = el.id ? '#' + CSS.escape(el.id) : el.tagName.toLowerCase() + [...el.classList].filter(c => !/^(rv|on|sel|page-in)$/.test(c)).map(c => '.' + CSS.escape(c)).join(''); return [sel, [...root.querySelectorAll(sel)].indexOf(el)]; }
function saveScroll(root) { const out = []; root.querySelectorAll('*').forEach(el => { if ((el.scrollTop || el.scrollLeft) && !el.matches('#lchat, .cmsgs')) out.push([...scrollKey(el, root), el.scrollTop, el.scrollLeft]); }); return out; }
function restoreScroll(root, list) { list.forEach(([sel, i, t, l]) => { const el = root.querySelectorAll(sel)[i]; if (el) { el.scrollTop = t; el.scrollLeft = l; } }); }
function route() {
  const h = location.hash.slice(1) || '/';
  const [path, q] = h.split('?');
  const qs = new URLSearchParams(q || '');
  const parts = path.split('/').filter(Boolean);
  demobar(path);
  clearInterval(slideT);
  const app = document.getElementById('app');
  const prevPath = route._p; route._p = path;
  const h1 = () => (app.querySelector('h1') || {}).textContent, t0 = h1(), y = scrollY;
  let keep = prevPath === path;
  const inAdmin = !keep && /^\/admin/.test(prevPath || '') && /^\/admin/.test(path), side = app.querySelector('.side'), sideY = side ? side.scrollTop : 0, sideX = side ? side.scrollLeft : 0;
  const inner = keep ? saveScroll(app) : [], af = document.activeElement, afKey = keep && af && af !== document.body && app.contains(af) ? scrollKey(af, app) : null;
  if (parts[0] === 'store' && parts[1] === 'p') {
    if (prevPath !== path) { pdImg = 0; pdQty = 1; pdTab = 'desc'; }
    app.innerHTML = vProduct(parts[2]);
  }
  else if (parts[0] === 'store') {
    app.innerHTML = vStore();
    slideT = setInterval(() => { if (!layer.innerHTML) goSlide((slideI + 1) % SLIDES.length); }, 6000);
  }
  else if (parts[0] === 'me') app.innerHTML = vMe();
  else if (parts[0] === 'line') { app.innerHTML = vLine(); renderChat(); }
  else if (parts[0] === 'admin') { document.body.style.background = 'var(--g1)'; app.innerHTML = vAdmin(parts.slice(1), qs); }
  else app.innerHTML = vIndex();
  document.body.style.background = parts[0] === 'store' || parts[0] === 'me' ? '#FAFAF9' : 'var(--g1)';
  if (!keep) app.style.minHeight = '';
  if (keep && h1() !== t0) { keep = false; app.style.minHeight = ''; scrollTo(0, 0); } // same URL but a different screen (e.g. builder / editor)
  if (inAdmin) { // moving between back-office pages: sidebar stays put, only the content fades
    closeLayer(); scrollTo(0, 0); app.classList.remove('page-in');
    const sd = app.querySelector('.side'); if (sd) { sd.scrollTop = sideY; sd.scrollLeft = sideX; }
    const ab = app.querySelector('.abody'); if (ab) { ab.classList.remove('fade-in'); void ab.offsetWidth; ab.classList.add('fade-in'); }
  }
  else if (prevPath !== path) { closeLayer(); scrollTo(0, 0); app.classList.remove('page-in'); void app.offsetWidth; app.classList.add('page-in'); }
  else if (keep) { restoreScroll(app, inner); const need = y + innerHeight - (document.documentElement.scrollHeight - app.offsetHeight); if (app.offsetHeight < need) app.style.minHeight = need + 'px'; if (scrollY !== y) scrollTo(0, y); if (afKey && /^(input|select|textarea)/.test(afKey[0])) { const el = app.querySelectorAll(afKey[0])[afKey[1]]; if (el) { el.focus({preventScroll:true}); if (el.setSelectionRange && /text|search/.test(el.type || 'text')) try { el.setSelectionRange(el.value.length, el.value.length); } catch (e) {} } } }
  app.querySelectorAll('.cmsgs').forEach(e => { e.scrollTop = e.scrollHeight; }); // chat panes always show the newest message
  reveal(app, prevPath !== path && !inAdmin); if (prevPath !== path) countUp(app);
}
window.addEventListener('hashchange', route);
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLayer(); });

const REV = '.pc,.stat,.use,.kpi,.seg,.ic-card,.flowlist li,.map>div,.footer-strip>div,.b2b,.reorder,.me-grid>.card,.side-cards>.sc,.g2>div>*,.g2e>*,.tierc,.abody>.card,.abody>div>.card';
function reveal(root, animate) {
  if (!root || !animate) return;
  const idx = new Map();
  root.querySelectorAll(REV).forEach(el => { const p = el.parentNode, n = idx.get(p) || 0; idx.set(p, n + 1); el.style.setProperty('--d', Math.min(n, 8) * 55 + 'ms'); el.classList.remove('rv'); void el.offsetWidth; el.classList.add('rv'); });
}
function countUp(root) {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  root.querySelectorAll('.kpi b, .stat b, .mcard .pts, .seg .cnt, .b2b .r b').forEach(el => {
    const txt = el.textContent, m = txt.match(/^([^0-9]*)([0-9][0-9,]*)(.*)$/);
    if (!m || el.children.length) return;
    const end = +m[2].replace(/,/g, ''), dur = 900, t0 = performance.now();
    if (!end) return;
    const f = t => { const p = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - p, 3); el.textContent = m[1] + Math.round(end * e).toLocaleString('en-US') + m[3]; if (p < 1) requestAnimationFrame(f); else el.textContent = txt; };
    requestAnimationFrame(f);
  });
}

route();
