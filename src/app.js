import { firebaseConfig } from './firebase-config.js';

const FIREBASE_VERSION = '10.12.2';
const DEMO = !firebaseConfig || !firebaseConfig.apiKey || String(firebaseConfig.apiKey).startsWith('YOUR_');

const DAYS = ['일', '월', '화', '수', '목', '금', '토'];
const COLS = [
  { id: 'todo', label: '할 일', dot: 'var(--fg-3)' },
  { id: 'doing', label: '수행 중', dot: 'var(--orange)' },
  { id: 'done', label: '완료', dot: 'var(--green)' }
];
const ORDER = COLS.map(c => c.id);
const CATS = [
  { id: 'work', label: '업무', color: '#64D2FF' },
  { id: 'study', label: '공부', color: '#7D7AFF' },
  { id: 'health', label: '운동·건강', color: '#30D158' },
  { id: 'money', label: '재테크', color: '#FFD60A' },
  { id: 'home', label: '집안일', color: '#FF9F0A' },
  { id: 'social', label: '약속', color: '#FF6482' },
  { id: 'shopping', label: '쇼핑', color: '#C9A47A' },
  { id: 'life', label: '개인', color: '#BF5AF2' }
];
const CAT = Object.fromEntries(CATS.map(c => [c.id, c]));
const parseTime = s => { const m = /^(\d{2}):(\d{2})$/.exec(s || ''); return m ? { h: +m[1], m: +m[2] } : null; };
const fmtTime = t => t ? `${pad(t.h)}:${pad(t.m)}` : '';
const nowRounded = () => { const d = new Date(); let total = d.getHours() * 60 + Math.ceil(d.getMinutes() / 5) * 5; total %= 1440; return { h: Math.floor(total / 60), m: total % 60 }; };
const RING_C = 2 * Math.PI * 26;

const pad = n => String(n).padStart(2, '0');
const ymd = d => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const parse = k => { const [y, m, d] = k.split('-').map(Number); return new Date(y, m - 1, d); };
const addDays = (k, n) => { const d = parse(k); d.setDate(d.getDate() + n); return ymd(d); };
const today = () => ymd(new Date());
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const longDate = k => { const d = parse(k); return `${d.getMonth() + 1}월 ${d.getDate()}일 ${DAYS[d.getDay()]}요일`; };

const ICON = {
  leftBig: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg>',
  rightBig: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg>',
  down: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>',
  up: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 15l6-6 6 6"/></svg>',
  trashBig: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 7h16M10 11v6M14 11v6M6 7l1 12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-12M9 7V4h6v3"/></svg>',
  left: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 6l-6 6 6 6"/></svg>',
  right: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>',
  plus: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>',
  trash: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 7h16M10 11v6M14 11v6M6 7l1 12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-12M9 7V4h6v3"/></svg>',
  pencil: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--fg-3)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 20h4L19 9l-4-4L4 16v4z"/></svg>',
  check: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>',
  google: '<svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true"><path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.8 2.4 30.3 0 24 0 14.6 0 6.6 5.4 2.7 13.3l7.9 6.1C12.5 13.6 17.8 9.5 24 9.5z"/><path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3-2.3 5.5-4.8 7.2l7.7 6c4.5-4.2 6.9-10.3 6.9-17.7z"/><path fill="#FBBC05" d="M10.6 28.6c-.5-1.4-.8-3-.8-4.6s.3-3.2.8-4.6l-7.9-6.1C1 16.6 0 20.2 0 24s1 7.4 2.7 10.7l7.9-6.1z"/><path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.7-6c-2.1 1.4-4.9 2.3-8.2 2.3-6.2 0-11.5-4.1-13.4-9.9l-7.9 6.1C6.6 42.6 14.6 48 24 48z"/></svg>'
};

const S = {
  mode: 'loading',      // loading | login | app | fatal
  user: null,
  tasks: [],
  sel: today(),
  view: 'day',
  ym: { y: new Date().getFullYear(), m: new Date().getMonth() },
  tab: 'todo',
  newCat: 'work',
  draft: '',
  draftTime: null,
  timeOpen: null,
  openSwipe: null,
  calOpen: false,
  editId: null,
  edit: null,
  toast: null,
  error: '',
  focusId: null
};

let store = null;
let signIn = async () => {};
let signOutFn = async () => {};
const root = document.getElementById('app');

/* ---------- Stores ---------- */

function demoStore() {
  const KEY = 'todo-demo-v1';
  let tasks = null;
  try { tasks = JSON.parse(localStorage.getItem(KEY)); } catch (e) { tasks = null; }
  if (!Array.isArray(tasks)) {
    const t = today();
    const y = new Date().getFullYear();
    tasks = [
      { title: '주간 업무 보고서 작성', date: t, status: 'doing', cat: 'work' },
      { title: '팀 회의 안건 정리', date: t, status: 'todo', cat: 'work' },
      { title: '적금 자동이체 확인', date: t, status: 'todo', cat: 'money' },
      { title: '아침 러닝 5km', date: t, status: 'done', cat: 'health' },
      { title: 'ETF 리밸런싱 검토', date: addDays(t, 1), status: 'todo', cat: 'money' },
      { title: '부모님께 안부 전화', date: addDays(t, 2), status: 'todo', cat: 'life' },
      { title: '건강검진 받기', date: addDays(t, -40), status: 'done', cat: 'health' },
      { title: '연말 가족 여행 계획', date: `${y}-12-20`, status: 'todo', cat: 'life' }
    ].filter(x => x.date.startsWith(String(y))).map((x, i) => ({ ...x, id: 'ex' + i, created: i }));
  }
  let cb = null;
  const save = () => {
    try { localStorage.setItem(KEY, JSON.stringify(tasks)); } catch (e) { /* storage unavailable */ }
    cb && cb(tasks.slice());
  };
  return {
    subscribe(f) { cb = f; f(tasks.slice()); },
    async add(t) { tasks.push({ ...t, id: 'd' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6) }); save(); },
    async update(id, p) { tasks = tasks.map(x => x.id === id ? { ...x, ...p } : x); save(); },
    async remove(id) { tasks = tasks.filter(x => x.id !== id); save(); }
  };
}

function authMessage(e) {
  const code = e && e.code || '';
  if (code === 'auth/popup-closed-by-user' || code === 'auth/cancelled-popup-request') return '';
  if (code === 'auth/unauthorized-domain') return '이 주소가 Firebase에 등록되지 않았어요. Authentication → 설정 → 승인된 도메인에 이 사이트 주소를 추가해 주세요.';
  if (code === 'auth/network-request-failed') return '인터넷 연결을 확인하고 다시 시도해 주세요.';
  if (code === 'auth/operation-not-allowed' || code === 'auth/configuration-not-found') return 'Firebase에서 Google 로그인이 아직 꺼져 있어요. Authentication → 로그인 방법에서 Google을 사용 설정하고 저장해 주세요.';
  if (code === 'auth/invalid-api-key' || code === 'auth/api-key-not-valid.-please-pass-a-valid-api-key.') return 'Firebase 설정값(apiKey)이 맞지 않아요.';
  if (code === 'auth/web-storage-unsupported') return '브라우저 설정에서 쿠키와 사이트 데이터를 허용한 뒤 다시 시도해 주세요.';
  return `로그인하지 못했어요. 잠시 후 다시 시도해 주세요. (오류 코드: ${code || (e && e.message) || '알 수 없음'})`;
}

async function initCloud() {
  const base = `https://www.gstatic.com/firebasejs/${FIREBASE_VERSION}/`;
  let A, F, initializeApp;
  try {
    const mods = await Promise.all([
      import(base + 'firebase-app.js'),
      import(base + 'firebase-auth.js'),
      import(base + 'firebase-firestore.js')
    ]);
    initializeApp = mods[0].initializeApp; A = mods[1]; F = mods[2];
  } catch (e) {
    S.mode = 'fatal';
    S.error = '앱을 불러오지 못했어요. 인터넷 연결을 확인하고 새로고침해 주세요.';
    render();
    return;
  }
  const app = initializeApp(firebaseConfig);
  const auth = A.getAuth(app);
  let db;
  try {
    db = F.initializeFirestore(app, { localCache: F.persistentLocalCache({ tabManager: F.persistentMultipleTabManager() }) });
  } catch (e) {
    db = F.getFirestore(app);
  }
  const provider = new A.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });

  signIn = async () => {
    S.error = '';
    try {
      await A.signInWithPopup(auth, provider);
    } catch (e) {
      if (e && (e.code === 'auth/popup-blocked' || e.code === 'auth/operation-not-supported-in-this-environment')) {
        await A.signInWithRedirect(auth, provider);
        return;
      }
      S.error = authMessage(e);
      render();
    }
  };
  signOutFn = () => A.signOut(auth);
  A.getRedirectResult(auth).catch(e => { S.error = authMessage(e); render(); });

  // Some in-app browsers (messengers, app webviews) block the storage sign-in needs and never answer.
  setTimeout(() => {
    if (S.mode !== 'loading') return;
    S.mode = 'fatal';
    S.error = '로그인 정보를 불러오지 못했어요. 메신저나 다른 앱 안에서 열었다면 Safari나 Chrome에서 다시 열어 주세요.';
    render();
  }, 10000);

  let unsub = null;
  A.onAuthStateChanged(auth, user => {
    if (unsub) { unsub(); unsub = null; }
    S.user = user;
    S.tasks = [];
    if (!user) { S.mode = 'login'; store = null; render(); return; }
    S.mode = 'app';
    const col = F.collection(db, 'users', user.uid, 'tasks');
    store = {
      add: t => F.addDoc(col, t),
      update: (id, p) => F.updateDoc(F.doc(col, id), p),
      remove: id => F.deleteDoc(F.doc(col, id))
    };
    unsub = F.onSnapshot(col, snap => {
      S.tasks = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      render();
    }, () => {
      showToast('목록을 불러오지 못했어요. 새로고침해 주세요.');
    });
    render();
  });
}

/* ---------- Derived data ---------- */

function stat(pred) {
  const ts = S.tasks.filter(t => pred(t.date || ''));
  const done = ts.filter(t => t.status === 'done').length;
  const doing = ts.filter(t => t.status === 'doing').length;
  const pct = ts.length ? Math.round(done / ts.length * 100) : 0;
  return { total: ts.length, done, doing, todo: ts.length - done - doing, pct };
}

function dotsFor(key) {
  const counts = {};
  for (const t of S.tasks) if (t.date === key) counts[t.cat] = (counts[t.cat] || 0) + 1;
  return Object.keys(counts).sort((a, b) => counts[b] - counts[a]).slice(0, 3)
    .map(k => `<i style="background:${(CAT[k] || CAT.life).color};opacity:${counts[k] >= 3 ? 1 : counts[k] === 2 ? 0.6 : 0.28}"></i>`).join('');
}

function relLabel(k) {
  const t = today();
  if (k === t) return '오늘';
  if (k === addDays(t, 1)) return '내일';
  if (k === addDays(t, -1)) return '어제';
  const d = parse(k);
  return `${d.getMonth() + 1}월 ${d.getDate()}일`;
}

function visibleTasks() {
  const list = S.view === 'day' ? S.tasks.filter(t => t.date === S.sel) : S.tasks.slice();
  return list.sort((a, b) => (a.date || '').localeCompare(b.date || '')
    || (a.time || '99:99').localeCompare(b.time || '99:99')
    || (a.created || 0) - (b.created || 0));
}

/* Time picker (iOS-style wheel). target 'tn' / 'tnm' = new task (S.draftTime), 'te' = task being edited (S.edit.time). */
function getTime(target) { return target === 'te' ? (S.edit && S.edit.time) : S.draftTime; }
function setTime(target, t) { if (target === 'te') { if (S.edit) S.edit.time = t; } else S.draftTime = t; }
const CLOCK = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>';
const ITEM_H = 34;

function timePill(target) {
  const t = getTime(target);
  const open = S.timeOpen === target;
  const label = t ? `시간 ${fmtTime(t)}, 바꾸기` : '시간 추가';
  return `<button type="button" class="time-pill ${t ? 'set' : ''}" data-act="time-open" data-target="${target}" aria-haspopup="dialog" aria-expanded="${open}" aria-label="${label}">${t ? `<span class="num">${fmtTime(t)}</span>` : CLOCK}</button>`;
}

function wheelItems(part, val) {
  const n = part === 'h' ? 24 : 60;
  let out = '';
  for (let o = -2; o <= 2; o++) out += `<span class="tw-item d${Math.abs(o)}">${pad((val + o + n) % n)}</span>`;
  return out;
}

function timeWheel(target) {
  if (S.timeOpen !== target) return '';
  const t = getTime(target) || nowRounded();
  return `<div class="tw" data-target="${target}" role="dialog" aria-label="시간 선택">
    <div class="tw-body">
      <div class="tw-band" aria-hidden="true"></div>
      <div class="tw-col" id="${target}-h" data-part="h" tabindex="0" role="spinbutton" aria-label="시" aria-valuemin="0" aria-valuemax="23" aria-valuenow="${t.h}">${wheelItems('h', t.h)}</div>
      <span class="tw-colon" aria-hidden="true">:</span>
      <div class="tw-col" id="${target}-m" data-part="m" tabindex="0" role="spinbutton" aria-label="분" aria-valuemin="0" aria-valuemax="59" aria-valuenow="${t.m}">${wheelItems('m', t.m)}</div>
    </div>
    <div class="tw-actions">
      <button type="button" class="btn-ghost" data-act="time-off" data-target="${target}">지우기</button>
      <button type="button" class="btn-primary" data-act="time-close">완료</button>
    </div>
  </div>`;
}

function refreshTime(target) {
  const t = getTime(target);
  if (!t) return;
  root.querySelectorAll(`.tw[data-target="${target}"] .tw-col`).forEach(col => {
    const v = col.dataset.part === 'h' ? t.h : t.m;
    col.innerHTML = wheelItems(col.dataset.part, v);
    col.setAttribute('aria-valuenow', v);
  });
  root.querySelectorAll(`.time-pill[data-target="${target}"]`).forEach(pill => {
    pill.classList.add('set');
    pill.innerHTML = `<span class="num">${fmtTime(t)}</span>`;
    pill.setAttribute('aria-label', `시간 ${fmtTime(t)}, 바꾸기`);
  });
}

// Minutes carry into hours: 09:59 → 10:00, and 00:00 back one → 23:59.
function stepTime(target, part, dir) {
  const t = getTime(target);
  if (!t) return;
  let next;
  if (part === 'h') next = { h: (t.h + dir + 24) % 24, m: t.m };
  else { const total = (t.h * 60 + t.m + dir + 1440) % 1440; next = { h: Math.floor(total / 60), m: total % 60 }; }
  setTime(target, next);
  refreshTime(target);
}

/* ---------- Views ---------- */

function chips(current, act) {
  return CATS.map(c => `<button type="button" class="chip" data-act="${act}" data-cat="${c.id}" aria-pressed="${current === c.id}"><i style="background:${c.color}"></i>${c.label}</button>`).join('');
}

function composer(id, cls) {
  const target = cls ? 'tnm' : 'tn';
  return `<form class="composer ${cls}" data-form="add">
    <div class="composer-row">
      <label class="sr" for="${id}">새로운 할 일</label>
      <input id="${id}" class="composer-input" placeholder="새로운 할 일" maxlength="200" autocomplete="off" enterkeyhint="done" value="${esc(S.draft)}">
      ${timePill(target)}
      <button type="submit" class="add-btn" aria-label="할 일 추가">${ICON.plus}</button>
    </div>
    ${timeWheel(target)}
    <div class="chips" role="group" aria-label="카테고리 선택">${chips(S.newCat, 'newcat')}</div>
  </form>`;
}

function progressView() {
  const t = today(), mk = t.slice(0, 7), yk = t.slice(0, 4);
  const now = new Date();
  const items = [
    { label: '오늘', sub: `${now.getMonth() + 1}월 ${now.getDate()}일`, color: 'var(--blue-text)', s: stat(k => k === t) },
    { label: '이번 달', sub: `${now.getMonth() + 1}월`, color: 'var(--orange)', s: stat(k => k.slice(0, 7) === mk) }
  ];
  if (S.view === 'all') items.push({ label: '올해', sub: `${yk}년`, color: 'var(--green)', s: stat(k => k.slice(0, 4) === yk) });
  return `<section class="progress cols-${items.length}" aria-label="진행도">${items.map(p => `
    <div class="pcard">
      <div class="ring-box">
        <svg viewBox="0 0 64 64" role="img" aria-label="${p.label} 진행률 ${p.s.pct}%, ${p.s.total}개 중 ${p.s.done}개 완료">
          <circle cx="32" cy="32" r="26" fill="none" class="track" stroke-width="7"></circle>
          <circle cx="32" cy="32" r="26" fill="none" stroke="${p.color}" stroke-width="7" stroke-dasharray="${(RING_C * p.s.pct / 100).toFixed(1)} ${RING_C.toFixed(1)}" transform="rotate(-90 32 32)"></circle>
        </svg>
        <span class="pct num" aria-hidden="true">${p.s.pct}%</span>
      </div>
      <div class="ptext">
        <div class="head"><h2>${p.label}</h2><span class="muted">${p.sub}</span></div>
        <span class="frac num"><strong>${p.s.done}</strong> / ${p.s.total} 완료</span>
        <span class="counts num"><span>할 일 ${p.s.todo}</span><span>수행 중 ${p.s.doing}</span></span>
      </div>
    </div>`).join('')}</section>`;
}

function dayButton(key, label, extra) {
  const t = today();
  const cls = key === S.sel ? 'sel' : key === t ? 'today' : '';
  const open = S.tasks.filter(x => x.date === key && x.status !== 'done').length;
  const d = parse(key);
  const aria = `${d.getMonth() + 1}월 ${d.getDate()}일${open ? `, 남은 할 일 ${open}개` : ''}`;
  return `<button class="day ${cls}" data-act="pick" data-date="${key}" aria-label="${aria}" aria-pressed="${key === S.sel}">${extra || ''}<span class="n">${label}</span><span class="dots" aria-hidden="true">${dotsFor(key)}</span></button>`;
}

function calendarView() {
  const { y, m } = S.ym;
  const first = new Date(y, m, 1).getDay();
  const dim = new Date(y, m + 1, 0).getDate();
  let cells = '';
  for (let i = 0; i < first; i++) cells += '<span class="day"></span>';
  for (let d = 1; d <= dim; d++) cells += dayButton(ymd(new Date(y, m, d)), d);
  const mk = `${y}-${pad(m + 1)}`;
  const monthOpen = S.tasks.filter(t => (t.date || '').startsWith(mk) && t.status !== 'done').length;

  const sd = parse(S.sel);
  const ws = new Date(sd.getFullYear(), sd.getMonth(), sd.getDate() - sd.getDay());
  const mid = new Date(ws.getFullYear(), ws.getMonth(), ws.getDate() + 3);
  let week = '';
  for (let i = 0; i < 7; i++) {
    const d = new Date(ws.getFullYear(), ws.getMonth(), ws.getDate() + i);
    week += dayButton(ymd(d), d.getDate(), `<span class="w">${DAYS[i]}</span>`);
  }

  return `<section class="panel cal ${S.calOpen ? 'expanded' : ''}" aria-label="캘린더">
    <div class="cal-month">
      <div class="cal-head">
        <h2>${y}년 ${m + 1}월</h2>
        <button class="cal-toggle" data-act="cal-toggle" aria-expanded="true">접기 ${ICON.up}</button>
        <div class="nav"><button data-act="month" data-d="-1" aria-label="이전 달">${ICON.left}</button><button data-act="month" data-d="1" aria-label="다음 달">${ICON.right}</button></div>
      </div>
      <div class="dow" aria-hidden="true">${DAYS.map(d => `<span>${d}</span>`).join('')}</div>
      <div class="grid7">${cells}</div>
    </div>
    <div class="week">
      <div class="cal-head">
        <h2>${mid.getFullYear()}년 ${mid.getMonth() + 1}월</h2>
        <button class="cal-toggle" data-act="cal-toggle" aria-expanded="false">한 달 보기 ${ICON.down}</button>
        <div class="nav"><button data-act="week" data-d="-7" aria-label="이전 주">${ICON.left}</button><button data-act="week" data-d="7" aria-label="다음 주">${ICON.right}</button></div>
      </div>
      <div class="grid7">${week}</div>
    </div>
    <div class="cal-foot"><span>이번 달 남은 할 일</span><span class="num">${monthOpen}개</span></div>
  </section>`;
}

function card(t, ci) {
  if (S.editId === t.id && S.edit) {
    return `<form class="card edit" data-form="edit" data-id="${esc(t.id)}">
      <label class="sr" for="edit-title">할 일 이름</label>
      <input id="edit-title" class="field" maxlength="200" autocomplete="off" value="${esc(S.edit.title)}">
      <label class="sr" for="edit-date">날짜</label>
      <input id="edit-date" class="field" type="date" value="${esc(S.edit.date)}">
      <div class="edit-time"><span>시간</span>${timePill('te')}</div>
      ${timeWheel('te')}
      <div class="chips" role="group" aria-label="카테고리 변경">${chips(S.edit.cat, 'editcat')}</div>
      <div class="row-end"><button type="button" class="btn-danger" data-act="del" data-id="${esc(t.id)}">삭제</button><span class="spacer"></span><button type="button" class="btn-ghost" data-act="cancel">취소</button><button type="submit" class="btn-primary">저장</button></div>
    </form>`;
  }
  const c = CAT[t.cat] || CAT.life;
  const done = t.status === 'done';
  const prev = ORDER[ci - 1], next = ORDER[ci + 1];
  const id = esc(t.id), title = esc(t.title);
  return `<div class="swipe ${S.openSwipe === t.id ? 'open' : ''}" data-id="${id}">
    ${next ? `<div class="swipe-move to-${next}" aria-hidden="true">${ICON.rightBig}<span>${COLS[ci + 1].label}</span></div>` : ''}
    <button class="swipe-del" data-act="del" data-id="${id}" tabindex="-1" aria-label="삭제: ${title}">${ICON.trashBig}<span>삭제</span></button>
    <article class="card ${prev ? 'has-back' : ''}" data-swipe data-id="${id}" data-next="${next || ''}">
      ${prev ? `<button class="arrow back" data-act="move" data-id="${id}" data-to="${prev}" aria-label="${title}: ${COLS[ci - 1].label}(으)로 되돌리기">${ICON.leftBig}</button>` : ''}
      <div class="card-main">
        <button class="title ${done ? 'done' : ''}" data-act="edit" data-id="${id}" aria-label="수정: ${title}">${title}${done ? '' : ICON.pencil}</button>
        <span class="cat"><i style="background:${c.color}"></i>${c.label} · ${relLabel(t.date)}${t.time ? ` <span class="num">${esc(t.time)}</span>` : ''}</span>
      </div>
    </article>
  </div>`;
}

function boardView() {
  const vis = visibleTasks();
  const tabs = COLS.map(c => `<button data-act="tab" data-tab="${c.id}" aria-pressed="${S.tab === c.id}">${c.label} <span class="num">${vis.filter(t => t.status === c.id).length}</span></button>`).join('');
  const cols = COLS.map((c, ci) => {
    const cards = vis.filter(t => t.status === c.id);
    return `<div class="col panel ${S.tab === c.id ? 'active' : ''}">
      <div class="col-head"><span class="dot" style="background:${c.dot}" aria-hidden="true"></span><h3>${c.label}</h3><span class="count num">${cards.length}</span></div>
      ${c.id === 'todo' ? composer('new-title', '') : ''}
      ${cards.map(t => card(t, ci)).join('')}
      ${cards.length === 0 && (c.id !== 'todo' || window.matchMedia('(max-width: 760px)').matches) ? '<p class="empty">비어 있음</p>' : ''}
    </div>`;
  }).join('');
  return `<section class="board" aria-label="칸반 보드">
    ${composer('new-title-m', 'composer-m')}
    <div class="tabs" role="group" aria-label="상태">${tabs}</div>
    ${cols}
  </section>`;
}

function headerView() {
  const isToday = S.sel === today(), day = S.view === 'day';
  const views = [
    `<button data-act="today" aria-pressed="${day && isToday}">오늘</button>`,
    isToday ? '' : `<button data-act="view" data-view="day" aria-pressed="${day}">선택한 날</button>`,
    `<button data-act="view" data-view="all" aria-pressed="${!day}">전체</button>`
  ].join('');
  let account = '';
  if (DEMO) account = '<span class="badge">체험 모드</span>';
  else if (S.user) {
    const photo = S.user.photoURL ? `<img class="avatar" src="${esc(S.user.photoURL)}" alt="" referrerpolicy="no-referrer">` : '';
    account = `<div class="account">${photo}<button class="pill" data-act="logout">로그아웃</button></div>`;
  }
  return `<header class="top">
    <div class="title-group"><h1>할 일</h1><span class="sub">${S.view === 'day' ? longDate(S.sel) : '모든 날짜'}</span></div>
    <div class="top-actions">
      <div class="seg" role="group" aria-label="보기">${views}</div>
      ${account}
    </div>
  </header>`;
}

function loginView() {
  return `<main class="login"><div class="login-card">
    <div class="logo">${ICON.check}</div>
    <h1>HALGGO</h1>
    <p>캘린더와 칸반보드로 오늘, 이번 달, 올해 할 일을 관리하세요. 휴대폰과 컴퓨터에서 같은 목록이 보여요.</p>
    <button class="google" data-act="login">${ICON.google}Google로 시작하기</button>
    ${S.error ? `<p class="err" role="alert">${esc(S.error)}</p>` : ''}
  </div></main>`;
}

function toastView() {
  if (!S.toast) return '';
  return `<div class="toast" role="status">${esc(S.toast.text)}${S.toast.undo ? '<button data-act="undo">되돌리기</button>' : ''}</div>`;
}

function render() {
  const a = document.activeElement;
  const fid = S.focusId || (a && a.id) || null;
  let ss = null, se = null;
  if (!S.focusId && a && a.id) { try { ss = a.selectionStart; se = a.selectionEnd; } catch (e) { /* not a text field */ } }

  let html;
  if (S.mode === 'loading') html = '<p class="boot">불러오는 중…</p>';
  else if (S.mode === 'fatal') html = `<main class="login"><div class="login-card"><h1>HALGGO</h1><p>${esc(S.error)}</p><button class="google" data-act="reload">다시 시도</button></div></main>`;
  else if (S.mode === 'login') html = loginView();
  else {
    html = `<div class="wrap">
      ${headerView()}
      ${DEMO ? '<p class="notice"><strong>체험 모드예요.</strong> 지금은 이 브라우저에만 저장돼요. 설정 가이드대로 Firebase를 연결하면 구글 로그인과 휴대폰·PC 동기화가 켜져요.</p>' : ''}
      ${progressView()}
      <div class="main">${calendarView()}${boardView()}</div>
    </div>`;
  }
  root.innerHTML = html + toastView();

  if (fid) {
    const el = document.getElementById(fid);
    if (el) {
      el.focus({ preventScroll: true });
      if (ss != null) { try { el.setSelectionRange(ss, se); } catch (e) { /* ignore */ } }
      else if (S.focusId && el.select) { try { const n = el.value.length; el.setSelectionRange(n, n); } catch (e) { /* ignore */ } }
    }
  }
  S.focusId = null;
}

/* ---------- Actions ---------- */

let toastTimer = null;
function showToast(text, undo) {
  clearTimeout(toastTimer);
  S.toast = { text, undo };
  render();
  toastTimer = setTimeout(() => { S.toast = null; render(); }, 5000);
}

function fail() { showToast('저장하지 못했어요. 인터넷 연결을 확인해 주세요.'); }

function syncMonth() { const d = parse(S.sel); S.ym = { y: d.getFullYear(), m: d.getMonth() }; }

function deleteTask(id) {
  const t = S.tasks.find(x => x.id === id);
  if (!t || !store) return;
  if (S.editId === id) { S.editId = null; S.edit = null; S.timeOpen = null; }
  S.openSwipe = null;
  store.remove(id).then(() => {
    const { id: _drop, ...rest } = t;
    showToast('삭제했어요', rest);
  }).catch(fail);
  render();
}

let suppressClick = false;
function swallowNextClick() { suppressClick = true; setTimeout(() => { suppressClick = false; }, 400); }

root.addEventListener('click', e => {
  if (suppressClick) { e.preventDefault(); e.stopPropagation(); suppressClick = false; return; }
  let dirty = false;
  // Tapping anywhere else closes an open swipe or time wheel.
  if (S.openSwipe && !e.target.closest(`.swipe[data-id="${CSS.escape(S.openSwipe)}"] .swipe-del`)) { S.openSwipe = null; dirty = true; }
  if (S.timeOpen && !e.target.closest('.tw') && !e.target.closest('.time-pill')) { S.timeOpen = null; dirty = true; }
  const b = e.target.closest('[data-act]');
  if (!b) { if (dirty) render(); return; }
  const act = b.dataset.act, id = b.dataset.id;
  switch (act) {
    case 'login': signIn(); return;
    case 'reload': location.reload(); return;
    case 'logout': signOutFn(); return;
    case 'pick': S.sel = b.dataset.date; S.view = 'day'; syncMonth(); break;
    case 'month': {
      let m = S.ym.m + Number(b.dataset.d), y = S.ym.y;
      if (m < 0) { m = 11; y--; } if (m > 11) { m = 0; y++; }
      S.ym = { y, m }; break;
    }
    case 'week': S.sel = addDays(S.sel, Number(b.dataset.d)); S.view = 'day'; syncMonth(); break;
    case 'cal-toggle': S.calOpen = !S.calOpen; syncMonth(); break;
    case 'today': S.sel = today(); S.view = 'day'; syncMonth(); break;
    case 'view': S.view = b.dataset.view; break;
    case 'tab': S.tab = b.dataset.tab; break;
    case 'newcat': S.newCat = b.dataset.cat; break;
    case 'editcat': if (S.edit) S.edit.cat = b.dataset.cat; break;
    case 'time-open': {
      const tg = b.dataset.target;
      if (S.timeOpen === tg) { S.timeOpen = null; break; }
      if (!getTime(tg)) setTime(tg, nowRounded());
      S.timeOpen = tg; S.focusId = tg + '-h';
      break;
    }
    case 'time-close': S.timeOpen = null; break;
    case 'time-off': setTime(b.dataset.target, null); S.timeOpen = null; break;
    case 'move': store && store.update(id, { status: b.dataset.to }).catch(fail); if (dirty) render(); return;
    case 'del': deleteTask(id); return;
    case 'undo':
      if (S.toast && S.toast.undo && store) store.add(S.toast.undo).catch(fail);
      clearTimeout(toastTimer); S.toast = null; break;
    case 'edit': {
      const t = S.tasks.find(x => x.id === id);
      if (!t) return;
      S.editId = id; S.edit = { title: t.title, date: t.date, cat: CAT[t.cat] ? t.cat : 'life', time: parseTime(t.time) };
      S.timeOpen = null; S.focusId = 'edit-title';
      break;
    }
    case 'cancel': S.editId = null; S.edit = null; S.timeOpen = null; break;
    default: if (dirty) render(); return;
  }
  render();
});

/* Time wheel: mouse wheel, drag (mouse or finger), tap a number, arrow keys. Card swipe-to-delete. */
let wheelAcc = 0;
root.addEventListener('wheel', e => {
  const col = e.target.closest('.tw-col');
  if (!col) return;
  e.preventDefault();
  const dy = e.deltaMode === 1 ? e.deltaY * 33 : e.deltaY;
  const target = col.closest('.tw').dataset.target;
  if (Math.abs(dy) >= 50) { wheelAcc = 0; stepTime(target, col.dataset.part, Math.sign(dy)); return; }
  wheelAcc += dy;
  if (Math.abs(wheelAcc) >= 50) { const dir = Math.sign(wheelAcc); wheelAcc = 0; stepTime(target, col.dataset.part, dir); }
}, { passive: false });

root.addEventListener('keydown', e => {
  if (e.key === 'Escape' && S.timeOpen) { S.timeOpen = null; render(); return; }
  const col = e.target.closest && e.target.closest('.tw-col');
  if (!col || (e.key !== 'ArrowUp' && e.key !== 'ArrowDown')) return;
  e.preventDefault();
  stepTime(col.closest('.tw').dataset.target, col.dataset.part, e.key === 'ArrowUp' ? 1 : -1);
});

const DEL_W = 88;
const moveAt = card => Math.min(120, card.offsetWidth * 0.35);
let drag = null, sw = null;

root.addEventListener('pointerdown', e => {
  const col = e.target.closest('.tw-col');
  if (col) {
    drag = { col, target: col.closest('.tw').dataset.target, part: col.dataset.part, y: e.clientY, startY: e.clientY, moved: false };
    try { col.setPointerCapture(e.pointerId); } catch (er) { /* ignore */ }
    e.preventDefault();
    return;
  }
  const cardEl = e.target.closest('.card[data-swipe]');
  if (!cardEl || (e.pointerType === 'mouse' && e.button !== 0)) return;
  sw = { card: cardEl, wrap: cardEl.parentElement, id: cardEl.dataset.id, next: cardEl.dataset.next, x: e.clientX, y: e.clientY, dx: 0, active: false,
         base: cardEl.parentElement.classList.contains('open') ? -DEL_W : 0, pid: e.pointerId };
});

root.addEventListener('pointermove', e => {
  if (drag) {
    const step = ITEM_H * 0.8;
    if (Math.abs(e.clientY - drag.startY) > 4) drag.moved = true;
    while (e.clientY - drag.y <= -step) { stepTime(drag.target, drag.part, 1); drag.y -= step; }
    while (e.clientY - drag.y >= step) { stepTime(drag.target, drag.part, -1); drag.y += step; }
    return;
  }
  if (!sw) return;
  const dx = e.clientX - sw.x, dy = e.clientY - sw.y;
  if (!sw.active) {
    if (Math.abs(dx) > 8 && Math.abs(dx) > Math.abs(dy) * 1.2) {
      sw.active = true;
      try { sw.card.setPointerCapture(sw.pid); } catch (er) { /* ignore */ }
      sw.card.style.transition = 'none';
      sw.wrap.classList.add('swiping');
    } else if (Math.abs(dy) > 10) { sw = null; return; } else return;
  }
  sw.dx = Math.min(sw.next && !sw.base ? sw.card.offsetWidth : 0, sw.base + dx);
  sw.card.style.transform = `translateX(${sw.dx}px)`;
  sw.wrap.classList.toggle('far', sw.dx < -sw.card.offsetWidth * 0.55);
  sw.wrap.classList.toggle('fwd', sw.dx > 0);
  sw.wrap.classList.toggle('go', sw.dx > moveAt(sw.card));
});

function endPointer(e) {
  if (drag) {
    const d = drag; drag = null;
    if (!d.moved && e.type === 'pointerup') {
      const r = d.col.getBoundingClientRect();
      const off = Math.round((e.clientY - (r.top + r.height / 2)) / ITEM_H);
      for (let i = 0; i < Math.abs(off); i++) stepTime(d.target, d.part, Math.sign(off));
    }
    return;
  }
  if (!sw) return;
  const s = sw; sw = null;
  if (!s.active) return;
  swallowNextClick();
  s.wrap.classList.remove('swiping', 'far', 'fwd', 'go');
  s.card.style.transition = '';
  if (e.type === 'pointerup' && s.dx < -s.card.offsetWidth * 0.55) { deleteTask(s.id); return; }
  if (e.type === 'pointerup' && s.next && s.dx > moveAt(s.card)) {
    S.openSwipe = null;
    s.card.style.transform = '';
    if (store) store.update(s.id, { status: s.next }).catch(fail);
    render();
    return;
  }
  S.openSwipe = s.dx < -DEL_W / 2 ? s.id : null;
  s.card.style.transform = '';
  render();
}
root.addEventListener('pointerup', endPointer);
root.addEventListener('pointercancel', endPointer);

root.addEventListener('input', e => {
  const el = e.target;
  if (el.classList.contains('composer-input')) S.draft = el.value;
  else if (el.id === 'edit-title' && S.edit) S.edit.title = el.value;
  else if (el.id === 'edit-date' && S.edit) S.edit.date = el.value;
});

root.addEventListener('submit', e => {
  e.preventDefault();
  const f = e.target;
  if (!store) return;
  if (f.dataset.form === 'add') {
    const title = S.draft.trim();
    if (!title) return;
    const task = { title, date: S.sel, status: 'todo', cat: S.newCat, created: Date.now() };
    if (S.draftTime) task.time = fmtTime(S.draftTime);
    store.add(task).catch(fail);
    S.draft = '';
    S.draftTime = null;
    S.timeOpen = null;
    S.tab = 'todo';
    S.focusId = f.querySelector('input').id;
    render();
  } else if (f.dataset.form === 'edit' && S.edit) {
    const title = (S.edit.title || '').trim();
    if (!title) return;
    const patch = { title, cat: S.edit.cat, time: S.edit.time ? fmtTime(S.edit.time) : '' };
    if (/^\d{4}-\d{2}-\d{2}$/.test(S.edit.date || '')) patch.date = S.edit.date;
    store.update(f.dataset.id, patch).catch(fail);
    S.editId = null; S.edit = null; S.timeOpen = null;
    render();
  }
});

// Re-render when the day changes or the layout crosses the phone breakpoint.
let lastDay = today();
setInterval(() => { if (today() !== lastDay) { lastDay = today(); render(); } }, 60000);
window.matchMedia('(max-width: 760px)').addEventListener('change', () => render());

/* ---------- Boot ---------- */

if (DEMO) {
  store = demoStore();
  S.mode = 'app';
  store.subscribe(tasks => { S.tasks = tasks; render(); });
} else {
  initCloud();
}
