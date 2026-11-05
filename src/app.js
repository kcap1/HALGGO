import { firebaseConfig } from './firebase-config.js';

const FIREBASE_VERSION = '10.12.2';
const DEMO = !firebaseConfig || !firebaseConfig.apiKey || String(firebaseConfig.apiKey).startsWith('YOUR_');

/* ---------- Language: follows the device language (ko / en / ja / zh, others → en). ?lang=xx overrides. ---------- */
const LANGS = ['ko', 'en', 'ja', 'zh'];
const LANG = (() => {
  const q = new URLSearchParams(location.search).get('lang');
  const prefs = [q, ...(navigator.languages || []), navigator.language].filter(Boolean);
  for (const p of prefs) { const b = String(p).toLowerCase().split('-')[0]; if (LANGS.includes(b)) return b; }
  return 'en';
})();
const LOC = LANG === 'zh' ? 'zh-CN' : LANG;
document.documentElement.lang = LOC;

const I18N = {
  ko: {
    title: '할 일', cols: ['할 일', '수행 중', '완료'],
    cats: ['업무', '개인', '집안일', '쇼핑', '운동·건강', '약속', '공부', '금융'],
    newTask: '새로운 할 일', addTask: '할 일 추가', pickCat: '카테고리 선택', changeCat: '카테고리 변경',
    stats: '성과', yearIn: y => `${y}년 성과`, byMonth: '월별 완료', byCat: '카테고리별', topCat: '가장 많이 한 일', busiest: '가장 바빴던 달', noData: '아직 기록이 없어요', prevYear: '이전 해', nextYear: '다음 해', rate: '완료율', legendDone: '완료', legendAll: '전체 할 일',
    endHint: '기간 (끝나는 날)', endPick: '끝나는 날 선택', dayOf: (n, N) => `${n}/${N}일째`, removeEnd: '기간 지우기',
    nDays: n => `${n}일간`, oneDay: '하루',
    allDay: '종일',
    editTask: '할 일 수정', titlePh: '제목', reorderHint: '길게 눌러 순서 바꾸기',
    weekBtn: '주', monthBtn: '월', thisWeek: '이번 주',
    catManage: '카테고리 편집', edit: '편집', catAdd: '카테고리 추가', catReset: '기본값으로 초기화', catResetQ: '카테고리를 기본값으로 되돌릴까요? 추가한 카테고리와 바꾼 이름·색이 사라져요.', catNamePh: '카테고리 이름', done: '완료', catSaveFail: '카테고리를 이 기기에만 저장했어요. 다른 기기와 맞추려면 보안 규칙 업데이트가 필요해요.', catDel: '삭제', catColor: '색 바꾸기', alarm: '알림', alarmNone: '없음', alarmAt: '정시', alarmMin: n => `${n}분 전`, alarmHour: n => `${n}시간 전`, alarmDay: '하루 전', notifNeedHome: '알림을 받으려면 Safari에서 「홈 화면에 추가」로 앱을 설치해 주세요.', notifDenied: '알림이 꺼져 있어요. 기기 설정에서 HALGGO 알림을 허용해 주세요.', notifOn: '알림이 켜졌어요', allDayAlarm: '종일 할 일은 그날 오전 9시를 기준으로 알려 드려요.',
    today: '오늘', thisMonth: '이번 달', thisYear: '올해', progress: '진행도',
    ring: (l, p, t, d) => `${l} 진행률 ${p}%, ${t}개 중 ${d}개 완료`, doneWord: '완료',
    openLeft: n => `, 남은 할 일 ${n}개`, calendar: '캘린더', collapse: '접기', monthView: '한 달 보기',
    prevMonth: '이전 달', nextMonth: '다음 달', prevWeek: '이전 주', nextWeek: '다음 주',
    monthLeft: '이번 달 남은 할 일', count: n => `${n}개`,
    taskName: '할 일 이름', date: '날짜', time: '시간', del: '삭제', cancel: '취소', save: '저장',
    backTo: (t, c) => `${t}: ${c}(으)로 되돌리기`, editAria: t => `수정: ${t}`, empty: '비어 있음',
    board: '칸반 보드', status: '상태', selDay: '선택한 날', all: '전체', view: '보기', allDates: '모든 날짜',
    demo: '체험 모드', logout: '로그아웃', switchAcct: '계정 전환', account: '계정',
    loginText: '캘린더와 칸반보드로 오늘, 이번 달, 올해 할 일을 관리하세요. 휴대폰과 컴퓨터에서 같은 목록이 보여요.',
    google: 'Google로 시작하기', undo: '되돌리기', loading: '불러오는 중…', retry: '다시 시도',
    demoNotice: '<strong>체험 모드예요.</strong> 지금은 이 브라우저에만 저장돼요. 설정 가이드대로 Firebase를 연결하면 구글 로그인과 휴대폰·PC 동기화가 켜져요.',
    saveFail: '저장하지 못했어요. 인터넷 연결을 확인해 주세요.', deleted: '삭제했어요', loadFail: '목록을 불러오지 못했어요. 새로고침해 주세요.',
    timeAdd: '시간 추가', timeChange: t => `시간 ${t}, 바꾸기`, timePick: '시간 선택', hour: '시', minute: '분', clear: '취소', ok: '설정',
    eDomain: '이 주소가 Firebase에 등록되지 않았어요. Authentication → 설정 → 승인된 도메인에 이 사이트 주소를 추가해 주세요.',
    eNet: '인터넷 연결을 확인하고 다시 시도해 주세요.',
    eOff: 'Firebase에서 Google 로그인이 아직 꺼져 있어요. Authentication → 로그인 방법에서 Google을 사용 설정하고 저장해 주세요.',
    eKey: 'Firebase 설정값(apiKey)이 맞지 않아요.', eStorage: '브라우저 설정에서 쿠키와 사이트 데이터를 허용한 뒤 다시 시도해 주세요.',
    eLogin: c => `로그인하지 못했어요. 잠시 후 다시 시도해 주세요. (오류 코드: ${c})`, unknown: '알 수 없음',
    eApp: '앱을 불러오지 못했어요. 인터넷 연결을 확인하고 새로고침해 주세요.',
    eInApp: '로그인 정보를 불러오지 못했어요. 메신저나 다른 앱 안에서 열었다면 Safari나 Chrome에서 다시 열어 주세요.'
  },
  en: {
    title: 'To-do', cols: ['To do', 'In progress', 'Done'],
    cats: ['Work', 'Personal', 'Chores', 'Shopping', 'Health', 'Plans', 'Study', 'Finance'],
    newTask: 'New task', addTask: 'Add task', pickCat: 'Choose category', changeCat: 'Change category',
    stats: 'Insights', yearIn: y => `${y} in review`, byMonth: 'Completed by month', byCat: 'By category', topCat: 'Top category', busiest: 'Busiest month', noData: 'No tasks yet', prevYear: 'Previous year', nextYear: 'Next year', rate: 'Completion', legendDone: 'Done', legendAll: 'All tasks',
    endHint: 'Multi-day (end date)', endPick: 'Choose end date', dayOf: (n, N) => `Day ${n}/${N}`, removeEnd: 'Remove end date',
    nDays: n => `${n} days`, oneDay: 'One day',
    allDay: 'All day',
    editTask: 'Edit task', titlePh: 'Title', reorderHint: 'Press and hold to reorder',
    weekBtn: 'Week', monthBtn: 'Month', thisWeek: 'This week',
    catManage: 'Edit categories', edit: 'Edit', catAdd: 'Add category', catReset: 'Reset to defaults', catResetQ: 'Reset categories to the defaults? Added categories and changed names/colors will be removed.', catNamePh: 'Category name', done: 'Done', catSaveFail: 'Categories were saved on this device only. Update the security rules to sync them.', catDel: 'Delete', catColor: 'Change color', alarm: 'Alert', alarmNone: 'None', alarmAt: 'At time', alarmMin: n => `${n} min before`, alarmHour: n => `${n} hr before`, alarmDay: '1 day before', notifNeedHome: 'To get alerts, add this app to your Home Screen from Safari.', notifDenied: 'Notifications are off. Allow them for HALGGO in Settings.', notifOn: 'Alerts are on', allDayAlarm: 'All-day tasks alert at 9:00 AM that day.',
    today: 'Today', thisMonth: 'This month', thisYear: 'This year', progress: 'Progress',
    ring: (l, p, t, d) => `${l} ${p}% complete, ${d} of ${t} done`, doneWord: 'done',
    openLeft: n => `, ${n} left`, calendar: 'Calendar', collapse: 'Less', monthView: 'Month',
    prevMonth: 'Previous month', nextMonth: 'Next month', prevWeek: 'Previous week', nextWeek: 'Next week',
    monthLeft: 'Left this month', count: n => `${n}`,
    taskName: 'Task name', date: 'Date', time: 'Time', del: 'Delete', cancel: 'Cancel', save: 'Save',
    backTo: (t, c) => `${t}: move back to ${c}`, editAria: t => `Edit: ${t}`, empty: 'Empty',
    board: 'Kanban board', status: 'Status', selDay: 'Selected', all: 'All', view: 'View', allDates: 'All dates',
    demo: 'Demo', logout: 'Sign out', switchAcct: 'Switch account', account: 'Account',
    loginText: 'Plan today, this month and this year with a calendar and a kanban board. Your list syncs between phone and computer.',
    google: 'Continue with Google', undo: 'Undo', loading: 'Loading…', retry: 'Try again',
    demoNotice: '<strong>Demo mode.</strong> Tasks are saved only in this browser. Connect Firebase to turn on Google sign-in and sync.',
    saveFail: "Couldn't save. Check your internet connection.", deleted: 'Deleted', loadFail: "Couldn't load your list. Please refresh.",
    timeAdd: 'Add time', timeChange: t => `Time ${t}, change`, timePick: 'Choose time', hour: 'Hour', minute: 'Minute', clear: 'Cancel', ok: 'Set',
    eDomain: 'This address is not registered in Firebase. Add it under Authentication → Settings → Authorized domains.',
    eNet: 'Check your internet connection and try again.',
    eOff: 'Google sign-in is turned off in Firebase. Enable Google under Authentication → Sign-in method.',
    eKey: 'The Firebase apiKey is not valid.', eStorage: 'Allow cookies and site data in your browser settings, then try again.',
    eLogin: c => `Couldn't sign in. Please try again shortly. (Error code: ${c})`, unknown: 'unknown',
    eApp: "Couldn't load the app. Check your internet connection and refresh.",
    eInApp: "Couldn't load your sign-in. If you opened this inside a messenger or another app, open it in Safari or Chrome."
  },
  ja: {
    title: 'やること', cols: ['やること', '進行中', '完了'],
    cats: ['仕事', '個人', '家事', '買い物', '健康', '予定', '勉強', 'お金'],
    newTask: '新しいやること', addTask: 'やることを追加', pickCat: 'カテゴリを選択', changeCat: 'カテゴリを変更',
    stats: '実績', yearIn: y => `${y}年の実績`, byMonth: '月別の完了', byCat: 'カテゴリ別', topCat: '一番多いカテゴリ', busiest: '一番忙しかった月', noData: 'まだ記録がありません', prevYear: '前の年', nextYear: '次の年', rate: '完了率', legendDone: '完了', legendAll: 'すべて',
    endHint: '期間（終了日）', endPick: '終了日を選択', dayOf: (n, N) => `${n}/${N}日目`, removeEnd: '期間を削除',
    nDays: n => `${n}日間`, oneDay: '1日',
    allDay: '終日',
    editTask: 'やることを編集', titlePh: 'タイトル', reorderHint: '長押しで並べ替え',
    weekBtn: '週', monthBtn: '月', thisWeek: '今週',
    catManage: 'カテゴリを編集', edit: '編集', catAdd: 'カテゴリを追加', catReset: '初期設定に戻す', catResetQ: 'カテゴリを初期設定に戻しますか？追加したカテゴリと変更した名前・色は消えます。', catNamePh: 'カテゴリ名', done: '完了', catSaveFail: 'カテゴリはこの端末にのみ保存されました。同期するにはセキュリティルールの更新が必要です。', catDel: '削除', catColor: '色を変更', alarm: '通知', alarmNone: 'なし', alarmAt: '開始時', alarmMin: n => `${n}分前`, alarmHour: n => `${n}時間前`, alarmDay: '1日前', notifNeedHome: '通知を受け取るには、Safariで「ホーム画面に追加」してください。', notifDenied: '通知がオフです。設定でHALGGOの通知を許可してください。', notifOn: '通知がオンになりました', allDayAlarm: '終日のやることは当日午前9時を基準に通知します。',
    today: '今日', thisMonth: '今月', thisYear: '今年', progress: '進捗',
    ring: (l, p, t, d) => `${l} 進捗 ${p}%、${t}件中${d}件完了`, doneWord: '完了',
    openLeft: n => `、残り${n}件`, calendar: 'カレンダー', collapse: '閉じる', monthView: '月表示',
    prevMonth: '前の月', nextMonth: '次の月', prevWeek: '前の週', nextWeek: '次の週',
    monthLeft: '今月の残り', count: n => `${n}件`,
    taskName: 'やることの名前', date: '日付', time: '時間', del: '削除', cancel: 'キャンセル', save: '保存',
    backTo: (t, c) => `${t}: ${c}に戻す`, editAria: t => `編集: ${t}`, empty: 'なし',
    board: 'カンバンボード', status: '状態', selDay: '選択日', all: 'すべて', view: '表示', allDates: 'すべての日付',
    demo: '体験モード', logout: 'ログアウト', switchAcct: 'アカウントを切り替え', account: 'アカウント',
    loginText: 'カレンダーとカンバンボードで、今日・今月・今年のやることを管理しましょう。スマホとパソコンで同じリストが見られます。',
    google: 'Googleで始める', undo: '元に戻す', loading: '読み込み中…', retry: '再試行',
    demoNotice: '<strong>体験モードです。</strong> このブラウザにだけ保存されます。Firebaseを接続するとGoogleログインと同期が使えます。',
    saveFail: '保存できませんでした。インターネット接続を確認してください。', deleted: '削除しました', loadFail: 'リストを読み込めませんでした。再読み込みしてください。',
    timeAdd: '時間を追加', timeChange: t => `時間 ${t}、変更`, timePick: '時間を選択', hour: '時', minute: '分', clear: 'キャンセル', ok: '設定',
    eDomain: 'このアドレスはFirebaseに登録されていません。Authentication → 設定 → 承認済みドメインに追加してください。',
    eNet: 'インターネット接続を確認して、もう一度お試しください。',
    eOff: 'FirebaseでGoogleログインがオフになっています。Authentication → ログイン方法でGoogleを有効にしてください。',
    eKey: 'Firebaseの設定値(apiKey)が正しくありません。', eStorage: 'ブラウザの設定でCookieとサイトデータを許可してから、もう一度お試しください。',
    eLogin: c => `ログインできませんでした。しばらくしてからお試しください。(エラーコード: ${c})`, unknown: '不明',
    eApp: 'アプリを読み込めませんでした。インターネット接続を確認して再読み込みしてください。',
    eInApp: 'ログイン情報を読み込めませんでした。メッセンジャーなどのアプリ内で開いた場合は、SafariかChromeで開き直してください。'
  },
  zh: {
    title: '待办', cols: ['待办', '进行中', '已完成'],
    cats: ['工作', '个人', '家务', '购物', '运动健康', '约会', '学习', '财务'],
    newTask: '新的待办', addTask: '添加待办', pickCat: '选择类别', changeCat: '更改类别',
    stats: '成果', yearIn: y => `${y}年成果`, byMonth: '每月完成', byCat: '按类别', topCat: '最多类别', busiest: '最忙的月份', noData: '还没有记录', prevYear: '上一年', nextYear: '下一年', rate: '完成率', legendDone: '已完成', legendAll: '全部',
    endHint: '多天（结束日期）', endPick: '选择结束日期', dayOf: (n, N) => `第${n}/${N}天`, removeEnd: '删除结束日期',
    nDays: n => `${n}天`, oneDay: '一天',
    allDay: '全天',
    editTask: '编辑待办', titlePh: '标题', reorderHint: '长按可调整顺序',
    weekBtn: '周', monthBtn: '月', thisWeek: '本周',
    catManage: '编辑类别', edit: '编辑', catAdd: '添加类别', catReset: '恢复默认', catResetQ: '要将类别恢复为默认吗？添加的类别和修改的名称、颜色将被删除。', catNamePh: '类别名称', done: '完成', catSaveFail: '类别仅保存在此设备上。要同步，需要更新安全规则。', catDel: '删除', catColor: '更改颜色', alarm: '提醒', alarmNone: '无', alarmAt: '准时', alarmMin: n => `提前${n}分钟`, alarmHour: n => `提前${n}小时`, alarmDay: '提前1天', notifNeedHome: '要接收提醒，请在 Safari 中“添加到主屏幕”。', notifDenied: '通知已关闭。请在设置中允许 HALGGO 的通知。', notifOn: '提醒已开启', allDayAlarm: '全天待办以当天上午9点为准提醒。',
    today: '今天', thisMonth: '本月', thisYear: '今年', progress: '进度',
    ring: (l, p, t, d) => `${l} 进度 ${p}%，共${t}项，已完成${d}项`, doneWord: '完成',
    openLeft: n => `，剩余${n}项`, calendar: '日历', collapse: '收起', monthView: '月视图',
    prevMonth: '上个月', nextMonth: '下个月', prevWeek: '上一周', nextWeek: '下一周',
    monthLeft: '本月剩余', count: n => `${n}项`,
    taskName: '待办名称', date: '日期', time: '时间', del: '删除', cancel: '取消', save: '保存',
    backTo: (t, c) => `${t}：退回到${c}`, editAria: t => `编辑：${t}`, empty: '空',
    board: '看板', status: '状态', selDay: '所选日期', all: '全部', view: '视图', allDates: '所有日期',
    demo: '体验模式', logout: '退出登录', switchAcct: '切换账号', account: '账号',
    loginText: '用日历和看板管理今天、本月和今年的待办事项。手机和电脑同步显示同一份清单。',
    google: '使用 Google 开始', undo: '撤销', loading: '加载中…', retry: '重试',
    demoNotice: '<strong>体验模式。</strong> 目前只保存在此浏览器中。连接 Firebase 后即可使用 Google 登录和同步。',
    saveFail: '保存失败。请检查网络连接。', deleted: '已删除', loadFail: '无法加载清单，请刷新。',
    timeAdd: '添加时间', timeChange: t => `时间 ${t}，更改`, timePick: '选择时间', hour: '时', minute: '分', clear: '取消', ok: '设定',
    eDomain: '此地址未在 Firebase 中注册。请在 Authentication → 设置 → 已授权网域中添加。',
    eNet: '请检查网络连接后重试。',
    eOff: 'Firebase 中的 Google 登录尚未开启。请在 Authentication → 登录方法中启用 Google。',
    eKey: 'Firebase 配置(apiKey)不正确。', eStorage: '请在浏览器设置中允许 Cookie 和网站数据后重试。',
    eLogin: c => `登录失败，请稍后重试。（错误代码：${c}）`, unknown: '未知',
    eApp: '无法加载应用。请检查网络连接并刷新。',
    eInApp: '无法加载登录信息。如果是在聊天软件等应用内打开的，请用 Safari 或 Chrome 重新打开。'
  }
};
const L = I18N[LANG];

const dtf = o => new Intl.DateTimeFormat(LOC, o);
const F_LONG = dtf({ month: 'long', day: 'numeric', weekday: 'long' });
const F_MD = dtf({ month: 'short', day: 'numeric' });
const F_YM = dtf({ year: 'numeric', month: 'long' });
const F_M = dtf({ month: 'long' });
const F_Y = dtf({ year: 'numeric' });
const DAYS = [0, 1, 2, 3, 4, 5, 6].map(i => dtf({ weekday: LANG === 'en' ? 'short' : 'narrow' }).format(new Date(2023, 0, 1 + i)));
const REL = new Intl.RelativeTimeFormat(LOC, { numeric: 'auto' });
const cap = s => s.charAt(0).toUpperCase() + s.slice(1);

/* ---------- Holidays & special days for the device's country (KR / JP / CN / US). off = public holiday (shown red). ---------- */
const HOL_REGION = (() => {
  const q = new URLSearchParams(location.search).get('lang');
  const tag = [q, ...(navigator.languages || []), navigator.language].filter(Boolean).map(String)
    .find(t => t.toLowerCase().split('-')[0] === LANG) || LANG;
  const region = (tag.split('-').slice(1).find(p => /^[A-Za-z]{2}$/.test(p)) || '').toUpperCase();
  if (LANG === 'ko') return 'KR';
  if (LANG === 'ja') return 'JP';
  if (LANG === 'zh') return ['TW', 'HK', 'MO'].includes(region) || /hant/i.test(tag) ? null : 'CN';
  if (LANG === 'en') return !region || region === 'US' ? 'US' : null;
  return null;
})();

const hk = (y, m, d) => ymd(new Date(y, m - 1, d));
// n-th weekday (dow 0=Sun) of a month; n = -1 → last one.
function nthDow(y, m, dow, n) {
  if (n < 0) { const last = new Date(y, m, 0); return ymd(new Date(y, m - 1, last.getDate() - ((last.getDay() - dow + 7) % 7))); }
  const first = new Date(y, m - 1, 1).getDay();
  return hk(y, m, 1 + ((dow - first + 7) % 7) + (n - 1) * 7);
}
// Lunar month/day → date in Gregorian year y (leap months skipped). Uses the browser's built-in Chinese/Korean calendar.
function lunarMap(y, ca) {
  let f;
  try { f = new Intl.DateTimeFormat('en-u-ca-' + ca, { month: 'numeric', day: 'numeric', timeZone: 'UTC' }); } catch (e) { return {}; }
  const out = {};
  for (let d = new Date(Date.UTC(y, 0, 1, 12)); d.getUTCFullYear() === y; d.setUTCDate(d.getUTCDate() + 1)) {
    const parts = f.formatToParts(d), mo = parts.find(p => p.type === 'month').value, da = parts.find(p => p.type === 'day').value;
    if (/^\d+$/.test(mo)) out[`${+mo}-${+da}`] = `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())}`;
  }
  return out;
}
function easter(y) {
  const a = y % 19, b = Math.floor(y / 100), c = y % 100, d = Math.floor(b / 4), e = b % 4, f = Math.floor((b + 8) / 25), g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30, i = Math.floor(c / 4), k = c % 4, l = (32 + 2 * e + 2 * i - h - k) % 7, m = Math.floor((a + 11 * h + 22 * l) / 451);
  return hk(y, Math.floor((h + l - 7 * m + 114) / 31), ((h + l - 7 * m + 114) % 31) + 1);
}
const dow = k => parse(k).getDay();

function buildHolidays(y) {
  const H = {};
  const add = (k, name, off) => { if (!k || k.slice(0, 4) !== String(y)) return; const h = H[k] || (H[k] = { names: [], off: false }); if (!h.names.includes(name)) h.names.push(name); h.off = h.off || off; };
  const isOff = k => !!(H[k] && H[k].off);
  const nextFree = (k, skipSat) => { let n = addDays(k, 1); while (isOff(n) || dow(n) === 0 || (skipSat && dow(n) === 6)) n = addDays(n, 1); return n; };

  if (HOL_REGION === 'KR') {
    const lu = lunarMap(y, 'dangi');
    const seol = lu['1-1'], chu = lu['8-15'];
    [['01-01', '신정'], ['03-01', '삼일절'], ['05-05', '어린이날'], ['06-06', '현충일'], ['08-15', '광복절'], ['10-03', '개천절'], ['10-09', '한글날'], ['12-25', '성탄절']]
      .forEach(([md, n]) => add(`${y}-${md}`, n, true));
    const groups = [];
    if (seol) { const g = [addDays(seol, -1), seol, addDays(seol, 1)]; g.forEach((k, i) => add(k, i === 1 ? '설날' : '설날 연휴', true)); groups.push(g); }
    if (chu) { const g = [addDays(chu, -1), chu, addDays(chu, 1)]; g.forEach((k, i) => add(k, i === 1 ? '추석' : '추석 연휴', true)); groups.push(g); }
    if (lu['4-8']) add(lu['4-8'], '부처님오신날', true);
    // 대체공휴일: 설·추석은 일요일이나 다른 공휴일과 겹칠 때, 그 밖에는 토·일요일과 겹칠 때 다음 평일.
    const subs = [];
    groups.forEach(g => { if (g.some(k => dow(k) === 0 || (H[k] && H[k].names.length > 1))) subs.push([g[2], false]); });
    ['03-01', '05-05', '08-15', '10-03', '10-09', '12-25'].forEach(md => { const k = `${y}-${md}`; if (dow(k) === 0 || dow(k) === 6 || H[k].names.length > 1) subs.push([k, true]); });
    if (lu['4-8'] && (dow(lu['4-8']) % 6 === 0 || H[lu['4-8']].names.length > 1)) subs.push([lu['4-8'], true]);
    subs.sort((a, b) => a[0].localeCompare(b[0])).forEach(([k]) => add(nextFree(k, true), '대체공휴일', true));
    [['04-05', '식목일'], ['05-08', '어버이날'], ['05-15', '스승의 날'], ['07-17', '제헌절'], ['10-01', '국군의 날']].forEach(([md, n]) => add(`${y}-${md}`, n, false));
    if (lu['1-15']) add(lu['1-15'], '정월대보름', false);
    if (lu['5-5']) add(lu['5-5'], '단오', false);
  } else if (HOL_REGION === 'JP') {
    const off = (y - 1980), shun = Math.floor(20.8431 + 0.242194 * off - Math.floor(off / 4)), shu = Math.floor(23.2488 + 0.242194 * off - Math.floor(off / 4));
    [['01-01', '元日'], ['02-11', '建国記念の日'], ['02-23', '天皇誕生日'], ['04-29', '昭和の日'], ['05-03', '憲法記念日'], ['05-04', 'みどりの日'],
     ['05-05', 'こどもの日'], ['08-11', '山の日'], ['11-03', '文化の日'], ['11-23', '勤労感謝の日']].forEach(([md, n]) => add(`${y}-${md}`, n, true));
    add(nthDow(y, 1, 1, 2), '成人の日', true); add(nthDow(y, 7, 1, 3), '海の日', true);
    add(nthDow(y, 9, 1, 3), '敬老の日', true); add(nthDow(y, 10, 1, 2), 'スポーツの日', true);
    add(hk(y, 3, shun), '春分の日', true); add(hk(y, 9, shu), '秋分の日', true);
    const base = Object.keys(H).sort();
    base.forEach(k => { if (dow(k) === 0) add(nextFree(k, false), '振替休日', true); });
    base.forEach(k => { const n2 = addDays(k, 2), mid = addDays(k, 1); if (isOff(n2) && !H[mid] && dow(mid) !== 0) add(mid, '国民の休日', true); });
    [['02-14', 'バレンタインデー'], ['03-03', 'ひな祭り'], ['03-14', 'ホワイトデー'], ['07-07', '七夕'], ['12-24', 'クリスマス・イブ'], ['12-25', 'クリスマス'], ['12-31', '大晦日']]
      .forEach(([md, n]) => add(`${y}-${md}`, n, false));
    add(nthDow(y, 5, 0, 2), '母の日', false); add(nthDow(y, 6, 0, 3), '父の日', false);
  } else if (HOL_REGION === 'CN') {
    const lu = lunarMap(y, 'chinese');
    add(`${y}-01-01`, '元旦', true);
    if (lu['1-1']) { add(addDays(lu['1-1'], -1), '除夕', true); [0, 1, 2].forEach(i => add(addDays(lu['1-1'], i), '春节', true)); }
    const yy = y % 100; add(hk(y, 4, Math.floor(yy * 0.2422 + 4.81) - Math.floor(yy / 4)), '清明节', true);
    add(`${y}-05-01`, '劳动节', true); add(`${y}-05-02`, '劳动节', true);
    if (lu['5-5']) add(lu['5-5'], '端午节', true);
    if (lu['8-15']) add(lu['8-15'], '中秋节', true);
    [1, 2, 3].forEach(d => add(hk(y, 10, d), '国庆节', true));
    [['03-08', '妇女节'], ['03-12', '植树节'], ['05-04', '青年节'], ['06-01', '儿童节'], ['07-01', '建党节'], ['08-01', '建军节'], ['09-10', '教师节']]
      .forEach(([md, n]) => add(`${y}-${md}`, n, false));
    [['1-15', '元宵节'], ['7-7', '七夕'], ['9-9', '重阳节'], ['12-8', '腊八节']].forEach(([md, n]) => lu[md] && add(lu[md], n, false));
  } else if (HOL_REGION === 'US') {
    const fixed = [['01-01', "New Year's Day"], ['06-19', 'Juneteenth'], ['07-04', 'Independence Day'], ['11-11', 'Veterans Day'], ['12-25', 'Christmas Day']];
    fixed.forEach(([md, n]) => {
      const k = `${y}-${md}`; add(k, n, true);
      if (dow(k) === 6) add(addDays(k, -1), `${n} (observed)`, true);
      if (dow(k) === 0) add(addDays(k, 1), `${n} (observed)`, true);
    });
    if (dow(`${y + 1}-01-01`) === 6) add(`${y}-12-31`, "New Year's Day (observed)", true);
    add(nthDow(y, 1, 1, 3), 'Martin Luther King Jr. Day', true); add(nthDow(y, 2, 1, 3), "Presidents' Day", true);
    add(nthDow(y, 5, 1, -1), 'Memorial Day', true); add(nthDow(y, 9, 1, 1), 'Labor Day', true);
    add(nthDow(y, 10, 1, 2), 'Columbus Day', true); add(nthDow(y, 11, 4, 4), 'Thanksgiving', true);
    [['02-14', "Valentine's Day"], ['03-17', "St. Patrick's Day"], ['10-31', 'Halloween'], ['12-24', 'Christmas Eve'], ['12-31', "New Year's Eve"]]
      .forEach(([md, n]) => add(`${y}-${md}`, n, false));
    add(easter(y), 'Easter', false); add(nthDow(y, 5, 0, 2), "Mother's Day", false); add(nthDow(y, 6, 0, 3), "Father's Day", false);
  }
  return H;
}
const holCache = {};
function holidayOf(k) {
  if (!HOL_REGION || !k) return null;
  const y = +k.slice(0, 4);
  if (!holCache[y]) holCache[y] = buildHolidays(y);
  const h = holCache[y][k];
  return h ? { name: h.names.join(', '), off: h.off } : null;
}

const COLS = [
  { id: 'todo', label: L.cols[0], dot: 'var(--fg-3)' },
  { id: 'doing', label: L.cols[1], dot: 'var(--orange)' },
  { id: 'done', label: L.cols[2], dot: 'var(--green)' }
];
const ORDER = COLS.map(c => c.id);
const DEFAULT_CATS = [
  // Ordered by how often people use them. ids are stored in Firestore — never rename them.
  { id: 'work', label: L.cats[0], color: '#64D2FF' },
  { id: 'life', label: L.cats[1], color: '#BF5AF2' },
  { id: 'home', label: L.cats[2], color: '#FF9F0A' },
  { id: 'shopping', label: L.cats[3], color: '#C9A47A' },
  { id: 'health', label: L.cats[4], color: '#30D158' },
  { id: 'social', label: L.cats[5], color: '#FF6482' },
  { id: 'study', label: L.cats[6], color: '#7D7AFF' },
  { id: 'money', label: L.cats[7], color: '#FFD60A' }
];
// User categories: [{ id, color, label? }] saved in users/{uid}/meta/settings (+ this device). null = the defaults.
// Default ids keep their translated name unless the user renamed them. Custom ids start with "c_".
let CATS = DEFAULT_CATS.map(c => ({ ...c }));
let CAT = Object.fromEntries(CATS.map(c => [c.id, c]));
const CAT_KEY = 'halggo-cats';
const SWATCHES = ['#64D2FF', '#0A84FF', '#5E5CE6', '#7D7AFF', '#BF5AF2', '#FF6482', '#FF453A', '#FF9F0A', '#FFD60A', '#30D158', '#66D4CF', '#C9A47A', '#A2845E', '#8E8E93'];
function applyCats(cfg) {
  const def = Object.fromEntries(DEFAULT_CATS.map(c => [c.id, c]));
  CATS = Array.isArray(cfg) && cfg.length
    ? cfg.filter(c => c && c.id).map(c => ({ id: c.id, color: c.color || (def[c.id] || {}).color || '#8E8E93', label: c.label || (def[c.id] || {}).label || c.id }))
    : DEFAULT_CATS.map(c => ({ ...c }));
  // Default categories can be renamed/recoloured but never disappear (old tasks point at them).
  DEFAULT_CATS.forEach(d => { if (!CATS.some(c => c.id === d.id)) CATS.push({ ...d }); });
  CAT = Object.fromEntries(CATS.map(c => [c.id, c]));
}
try { applyCats(JSON.parse(localStorage.getItem(CAT_KEY))); } catch (e) { /* defaults */ }
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
const longDate = k => F_LONG.format(parse(k));

const ICON = {
  leftBig: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg>',
  rightBig: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg>',
  se: '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" aria-hidden="true"><path d="M20 7v10.5a2.5 2.5 0 0 1-2.5 2.5H7z"/></svg>',
  ne: '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" aria-hidden="true"><path d="M4 17V6.5A2.5 2.5 0 0 1 6.5 4H17z"/></svg>',
  down: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>',
  up: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 15l6-6 6 6"/></svg>',
  trashBig: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 7h16M10 11v6M14 11v6M6 7l1 12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-12M9 7V4h6v3"/></svg>',
  left: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 6l-6 6 6 6"/></svg>',
  right: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>',
  ok: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>',
  chart: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M5 20V12M12 20V5M19 20v-9"/></svg>',
  list: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M9 6h11M9 12h11M9 18h11M4.5 6h.01M4.5 12h.01M4.5 18h.01"/></svg>',
  range: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3.5" y="5" width="17" height="15" rx="3"/><path d="M3.5 10h17M8 3v4M16 3v4M7.5 14.5h9"/></svg>',
  tag: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3.5 12.5V5a1.5 1.5 0 0 1 1.5-1.5h7.5L21 12l-8.5 8.5z"/><circle cx="8" cy="8" r="1.4"/></svg>',
  bell: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 16V11a6 6 0 1 1 12 0v5l1.5 2h-15zM10 20.5a2 2 0 0 0 4 0"/></svg>',
  bellSm: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 16V11a6 6 0 1 1 12 0v5l1.5 2h-15zM10 20.5a2 2 0 0 0 4 0"/></svg>',
  plus: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>',
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
    async remove(id) { tasks = tasks.filter(x => x.id !== id); save(); },
    async saveSettings() { /* demo: this device only (localStorage) */ }
  };
}

function authMessage(e) {
  const code = e && e.code || '';
  if (code === 'auth/popup-closed-by-user' || code === 'auth/cancelled-popup-request') return '';
  if (code === 'auth/unauthorized-domain') return L.eDomain;
  if (code === 'auth/network-request-failed') return L.eNet;
  if (code === 'auth/operation-not-allowed' || code === 'auth/configuration-not-found') return L.eOff;
  if (code === 'auth/invalid-api-key' || code === 'auth/api-key-not-valid.-please-pass-a-valid-api-key.') return L.eKey;
  if (code === 'auth/web-storage-unsupported') return L.eStorage;
  return L.eLogin(code || (e && e.message) || L.unknown);
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
    S.error = L.eApp;
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
    S.error = L.eInApp;
    render();
  }, 10000);

  let unsub = null, unsubSet = null;
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
      remove: id => F.deleteDoc(F.doc(col, id)),
      saveSettings: data => F.setDoc(F.doc(db, 'users', user.uid, 'meta', 'settings'), data, { merge: true })
    };
    if (unsubSet) unsubSet();
    unsubSet = F.onSnapshot(F.doc(db, 'users', user.uid, 'meta', 'settings'), d => {
      const cfg = d.exists() ? d.data().cats : undefined;
      if (cfg === undefined) return;
      try { localStorage.setItem(CAT_KEY, JSON.stringify(cfg)); } catch (e) { /* ignore */ }
      applyCats(cfg); render();
    }, () => { /* rules not updated yet: keep the device copy */ });
    unsub = F.onSnapshot(col, snap => {
      S.tasks = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      render();
    }, () => {
      showToast(L.loadFail);
    });
    render();
  });
}

/* ---------- Derived data ---------- */

/* Multi-day tasks: optional `end` (YYYY-MM-DD, after `date`). A task belongs to every day/month/year it overlaps. */
const tEnd = t => (t.end && t.end > (t.date || '')) ? t.end : (t.date || '');
const isRange = t => tEnd(t) !== (t.date || '');
const covers = (t, k) => (t.date || '') <= k && k <= tEnd(t);
const overlaps = (t, a, b) => (t.date || '') <= b && tEnd(t) >= a;
const weekOf = k => { const d = parse(k), s0 = addDays(k, -d.getDay()); return [s0, addDays(s0, 6)]; };
const daysBetween = (a, b) => Math.round((parse(b) - parse(a)) / 86400000);

function stat(a, b) {
  const ts = S.tasks.filter(t => overlaps(t, a, b));
  const done = ts.filter(t => t.status === 'done').length;
  const doing = ts.filter(t => t.status === 'doing').length;
  const pct = ts.length ? Math.round(done / ts.length * 100) : 0;
  return { total: ts.length, done, doing, todo: ts.length - done - doing, pct };
}

function dotsFor(key) {
  const counts = {};
  for (const t of S.tasks) if (t.date === key && !isRange(t)) counts[t.cat] = (counts[t.cat] || 0) + 1;
  return Object.keys(counts).sort((a, b) => counts[b] - counts[a]).slice(0, 3)
    .map(k => `<i style="background:${(CAT[k] || CAT.life).color};opacity:${counts[k] >= 3 ? 1 : counts[k] === 2 ? 0.6 : 0.28}"></i>`).join('');
}

// Card date: "오늘", or for multi-day "11월 5일~9일 · 2/5일째" (day count shown while the range includes the day being looked at).
function dateLabel(t) {
  if (!isRange(t)) return relLabel(t.date);
  let txt;
  try { txt = F_MD.formatRange(parse(t.date), parse(tEnd(t))); } catch (e) { txt = `${F_MD.format(parse(t.date))} – ${F_MD.format(parse(tEnd(t)))}`; }
  const ref = S.view === 'day' ? S.sel : today();
  if (covers(t, ref)) txt += ` · ${L.dayOf(daysBetween(t.date, ref) + 1, daysBetween(t.date, tEnd(t)) + 1)}`;
  return txt;
}

function relLabel(k) {
  const t = today();
  for (const n of [0, 1, -1]) if (k === addDays(t, n)) return cap(REL.format(n, 'day'));
  return F_MD.format(parse(k));
}

function visibleTasks() {
  const mk = S.sel.slice(0, 7);
  const [w0, w1] = weekOf(S.sel);
  const list = S.view === 'day' ? S.tasks.filter(t => covers(t, S.sel))
    : S.view === 'week' ? S.tasks.filter(t => overlaps(t, w0, w1))
    : S.tasks.filter(t => overlaps(t, mk + '-01', mk + '-31'));
  // Priority: the order the user dragged cards into (field `order`) comes first, then time, then creation.
  const ord = t => (typeof t.order === 'number' ? t.order : 1e15);
  return list.sort((a, b) => (S.view === 'day' ? 0 : (a.date || '').localeCompare(b.date || ''))
    || ord(a) - ord(b)
    || (a.time || '99:99').localeCompare(b.time || '99:99')
    || (a.created || 0) - (b.created || 0));
}

/* Time picker (iOS-style wheel). target 'tn' / 'tnm' = new task (S.draftTime), 'te' = task being edited (S.edit.time). */
function getTime(target) { return target === 'te' ? (S.edit && S.edit.time) : target === 'tee' ? (S.edit && S.edit.endTime) : S.draftTime; }
function setTime(target, t) { if (target === 'te') { if (S.edit) S.edit.time = t; } else if (target === 'tee') { if (S.edit) S.edit.endTime = t; } else S.draftTime = t; }
const CLOCK = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>';
const ITEM_H = 34;

function timePill(target) {
  const t = getTime(target);
  const open = S.timeOpen === target;
  const label = t ? L.timeChange(showTime(t)) : L.timeAdd;
  return `<button type="button" class="time-pill ${t ? 'set' : ''}" data-act="time-open" data-target="${target}" aria-haspopup="dialog" aria-expanded="${open}" aria-label="${label}">${t ? `<span class="num">${showTime(t)}</span>` : CLOCK}</button>`;
}

// 12-hour wheel like the iPhone alarm: [AM/PM] [1–12] : [00–59]. Stored time stays 24-hour ("HH:MM").
const F_HM = dtf({ hour: 'numeric', minute: '2-digit', hour12: true });
const PERIODS = [9, 21].map(h => (dtf({ hour: 'numeric', hour12: true }).formatToParts(new Date(2024, 0, 1, h)).find(p => p.type === 'dayPeriod') || { value: h < 12 ? 'AM' : 'PM' }).value);
const showTime = t => t ? F_HM.format(new Date(2024, 0, 1, t.h, t.m)) : '';
const h12 = h => String(h % 12 || 12);
function wheelVal(part, t) { return part === 'ap' ? (t.h >= 12 ? 1 : 0) : part === 'h' ? t.h : t.m; }
function wheelItems(part, val) {
  let out = '';
  for (let o = -2; o <= 2; o++) {
    let label;
    if (part === 'ap') label = PERIODS[val + o] || '';
    else if (part === 'h') label = h12((val + o + 24) % 24);
    else label = pad((val + o + 60) % 60);
    out += `<span class="tw-item d${Math.abs(o)}">${label}</span>`;
  }
  return out;
}

function timeWheel(target) {
  if (S.timeOpen !== target) return '';
  const t = getTime(target) || nowRounded();
  return `<div class="tw" data-target="${target}" role="dialog" aria-label="${L.timePick}">
    <button type="button" class="tw-clear" data-act="time-off" data-target="${target}">${L.clear}</button>
    <div class="tw-main">
    <div class="tw-body">
      <div class="tw-band" aria-hidden="true"></div>
      <div class="tw-col tw-ap" id="${target}-ap" data-part="ap" tabindex="0" role="spinbutton" aria-label="${PERIODS.join(' / ')}" aria-valuetext="${PERIODS[wheelVal('ap', t)]}">${wheelItems('ap', wheelVal('ap', t))}</div>
      <div class="tw-col" id="${target}-h" data-part="h" tabindex="0" role="spinbutton" aria-label="${L.hour}" aria-valuemin="0" aria-valuemax="23" aria-valuenow="${t.h}">${wheelItems('h', t.h)}</div>
      <span class="tw-colon" aria-hidden="true">:</span>
      <div class="tw-col" id="${target}-m" data-part="m" tabindex="0" role="spinbutton" aria-label="${L.minute}" aria-valuemin="0" aria-valuemax="59" aria-valuenow="${t.m}">${wheelItems('m', t.m)}</div>
    </div>
    </div>
    <button type="button" class="btn-primary tw-ok" data-act="time-close">${L.ok}</button>
  </div>`;
}

function refreshTime(target) {
  const t = getTime(target);
  if (!t) return;
  root.querySelectorAll(`.tw[data-target="${target}"] .tw-col`).forEach(col => {
    const v = wheelVal(col.dataset.part, t);
    col.innerHTML = wheelItems(col.dataset.part, v);
    if (col.dataset.part === 'ap') col.setAttribute('aria-valuetext', PERIODS[v]);
    else col.setAttribute('aria-valuenow', v);
  });
  root.querySelectorAll(`.when-big[data-target="${target}"]`).forEach(el => { el.textContent = showTime(t); el.classList.remove('dim'); });
  root.querySelectorAll('.allday').forEach(el => { el.classList.remove('on'); el.setAttribute('aria-pressed', 'false'); });
  root.querySelectorAll(`.time-pill[data-target="${target}"]`).forEach(pill => {
    pill.classList.add('set');
    pill.innerHTML = `<span class="num">${showTime(t)}</span>`;
    pill.setAttribute('aria-label', L.timeChange(showTime(t)));
  });
}

// Minutes carry into hours: 09:59 → 10:00, and 00:00 back one → 23:59.
function stepTime(target, part, dir) {
  const t = getTime(target);
  if (!t) return;
  let next;
  // Hours run 11 → 12 into the afternoon (and 11 PM → 12 AM), switching AM/PM like the iPhone alarm.
  if (part === 'ap') { const pm = t.h >= 12; if ((dir > 0) === pm) return; next = { h: (t.h + 12) % 24, m: t.m }; }
  else if (part === 'h') next = { h: (t.h + dir + 24) % 24, m: t.m };
  else { const total = (t.h * 60 + t.m + dir + 1440) % 1440; next = { h: Math.floor(total / 60), m: total % 60 }; }
  setTime(target, next);
  refreshTime(target);
}

/* ---------- Views ---------- */

function chips(current, act, editable) {
  return CATS.map(c => `<button type="button" class="chip" data-act="${act}" data-cat="${c.id}" aria-pressed="${current === c.id}"><i style="background:${c.color}"></i>${esc(c.label)}</button>`).join('')
    + (editable ? `<button type="button" class="chip chip-edit" data-act="cat-manage">${ICON.pencil}${L.edit}</button>` : '');
}

/* Category manager: rename, recolour, add, delete (custom only), reset to defaults. Edits a draft; 「완료」 saves. */
function catSheetView() {
  if (!S.catDraft) return '';
  const rows = S.catDraft.map((c, i) => `<div class="cat-row">
      <button type="button" class="cat-dot" data-act="cat-color" data-i="${i}" style="background:${c.color}" aria-label="${L.catColor}"></button>
      <input class="cat-name" data-i="${i}" id="catname-${i}" value="${esc(c.label)}" placeholder="${L.catNamePh}" maxlength="20" autocomplete="off">
      ${c.id.startsWith('c_') ? `<button type="button" class="cat-del" data-act="cat-del" data-i="${i}" aria-label="${L.catDel}">${ICON.trash}</button>` : '<span class="cat-del-sp"></span>'}
    </div>
    ${S.catPick === i ? `<div class="swatches">${SWATCHES.map(sw => `<button type="button" class="swatch ${sw === c.color ? 'on' : ''}" data-act="cat-swatch" data-i="${i}" data-c="${sw}" style="background:${sw}" aria-label="${sw}"></button>`).join('')}</div>` : ''}`).join('');
  return `<div class="sheet-bg layer2" data-act="cat-cancel"></div>
  <div class="sheet layer2" role="dialog" aria-modal="true" aria-label="${L.catManage}">
    <div class="sheet-grip" aria-hidden="true"></div>
    <div class="sheet-head">
      <button type="button" class="sh-cancel" data-act="cat-cancel">${L.cancel}</button>
      <span class="sh-title">${L.catManage}</span>
      <button type="button" class="sh-save" data-act="cat-done">${L.done}</button>
    </div>
    <div class="cat-list">${rows}</div>
    <button type="button" class="cat-add" data-act="cat-add">${ICON.plus}<span>${L.catAdd}</span></button>
    <button type="button" class="cat-reset" data-act="cat-reset">${L.catReset}</button>
  </div>`;
}

function saveCats(draft) {
  const def = Object.fromEntries(DEFAULT_CATS.map(c => [c.id, c]));
  const clean = draft.filter(c => c.label.trim() || def[c.id]).map(c => {
    const o = { id: c.id, color: c.color }, name = c.label.trim();
    if (!def[c.id] || (name && name !== def[c.id].label)) o.label = name || def[c.id].label;
    return o;
  });
  const isDefault = clean.length === DEFAULT_CATS.length && clean.every((c, i) => c.id === DEFAULT_CATS[i].id && c.color === DEFAULT_CATS[i].color && !c.label);
  const cfg = isDefault ? null : clean;
  try { if (cfg) localStorage.setItem(CAT_KEY, JSON.stringify(cfg)); else localStorage.removeItem(CAT_KEY); } catch (e) { /* ignore */ }
  applyCats(cfg);
  if (store && store.saveSettings) store.saveSettings({ cats: cfg }).catch(() => showToast(L.catSaveFail));
}

// Multi-day: a small calendar button over a hidden native date picker (end date). Shows "~11월 9일" once set.
function rangePill(id, val, min) {
  const set = val && val > min;
  return `<label class="range-pill ${set ? 'set' : ''}" title="${L.endHint}"><span class="num">${set ? '~' + esc(F_MD.format(parse(val))) : ICON.range}</span>
    <input id="${id}" class="range-in" type="date" min="${addDays(min, 1)}" value="${set ? esc(val) : ''}" aria-label="${L.endPick}"></label>`;
}

function composer(id, cls) {
  const target = cls ? 'tnm' : 'tn';
  return `<form class="composer ${cls}" data-form="add">
    <div class="composer-row">
      <label class="sr" for="${id}">${L.newTask}</label>
      <input id="${id}" class="composer-input" placeholder="${L.newTask}" maxlength="200" autocomplete="off" enterkeyhint="done" value="${esc(S.draft)}">
      ${timePill(target)}
      ${rangePill(target + '-end', S.draftEnd, S.sel)}
    </div>
    <button type="submit" class="add-btn" aria-label="${L.addTask}">${ICON.ok}</button>
    ${timeWheel(target)}
    <div class="chips" role="group" aria-label="${L.pickCat}">${chips(S.newCat, 'newcat')}</div>
  </form>`;
}

function rangeText(a, b) {
  try { return F_MD.formatRange(parse(a), parse(b)); } catch (e) { return `${F_MD.format(parse(a))} – ${F_MD.format(parse(b))}`; }
}

function progressView() {
  const t = today(), mk = t.slice(0, 7), yk = t.slice(0, 4);
  const now = new Date();
  const [w0, w1] = weekOf(t);
  const items = [{ label: L.today, sub: F_MD.format(now), color: 'var(--orange)', s: stat(t, t) }];
  if (S.view === 'day' && S.sel !== t) items[0] = { label: L.selDay, sub: F_MD.format(parse(S.sel)), color: 'var(--orange)', s: stat(S.sel, S.sel) };
  if (S.view === 'week' || S.view === 'month') items.push({ label: L.thisWeek, sub: rangeText(w0, w1), color: 'var(--green)', s: stat(w0, w1) });
  if (S.view === 'month') items.push({ label: L.thisMonth, sub: F_M.format(now), color: 'var(--blue-text)', s: stat(mk + '-01', mk + '-31') });
  return `<section class="progress cols-${items.length}" aria-label="${L.progress}">${items.map(p => `
    <div class="pcard">
      <div class="ring-box">
        <svg viewBox="0 0 64 64" role="img" aria-label="${L.ring(p.label, p.s.pct, p.s.total, p.s.done)}">
          <circle cx="32" cy="32" r="26" fill="none" class="track" stroke-width="7"></circle>
          <circle cx="32" cy="32" r="26" fill="none" stroke="${p.color}" stroke-width="7" stroke-dasharray="${(RING_C * p.s.pct / 100).toFixed(1)} ${RING_C.toFixed(1)}" transform="rotate(-90 32 32)"></circle>
        </svg>
        <span class="pct num" aria-hidden="true">${p.s.pct}%</span>
      </div>
      <div class="ptext">
        <div class="head"><h2>${p.label}</h2><span class="muted">${p.sub}</span></div>
        <span class="frac num"><strong>${p.s.done}</strong> / ${p.s.total} ${L.doneWord}</span>
        <span class="counts num"><span>${L.cols[0]} ${p.s.todo}</span><span>${L.cols[1]} ${p.s.doing}</span></span>
      </div>
    </div>`).join('')}</section>`;
}

/* ---------- Year in review (separate 성과 page) ---------- */
function statsView() {
  const y = S.statYear || +today().slice(0, 4), yk = String(y);
  const ts = S.tasks.filter(t => overlaps(t, yk + '-01-01', yk + '-12-31'));
  const s = stat(yk + '-01-01', yk + '-12-31');
  const months = Array.from({ length: 12 }, (_, i) => {
    const mk = `${yk}-${pad(i + 1)}`, list = ts.filter(t => overlaps(t, mk + '-01', mk + '-31'));
    return { i, total: list.length, done: list.filter(t => t.status === 'done').length };
  });
  const cats = CATS.map(c => {
    const list = ts.filter(t => (CAT[t.cat] ? t.cat : 'life') === c.id);
    return { c, total: list.length, done: list.filter(t => t.status === 'done').length };
  }).filter(x => x.total).sort((a, b) => b.total - a.total);
  const maxM = Math.max(1, ...months.map(m => m.total));
  const busiest = months.reduce((a, b) => (b.total > a.total ? b : a), months[0]);
  const curM = yk === today().slice(0, 4) ? new Date().getMonth() : -1;
  const mName = i => F_M.format(new Date(y, i, 1));
  const mShort = i => LANG === 'en' ? dtf({ month: 'narrow' }).format(new Date(y, i, 1)) : String(i + 1);
  const R2 = 2 * Math.PI * 44;

  const hero = `<section class="panel stat-hero">
    <div class="year-nav"><button data-act="year" data-d="-1" aria-label="${L.prevYear}">${ICON.left}</button><h2>${esc(L.yearIn(y))}</h2><button data-act="year" data-d="1" aria-label="${L.nextYear}">${ICON.right}</button></div>
    <div class="hero-body">
      <div class="ring-box big">
        <svg viewBox="0 0 100 100" role="img" aria-label="${L.ring(F_Y.format(new Date(y, 0, 1)), s.pct, s.total, s.done)}">
          <circle cx="50" cy="50" r="44" fill="none" class="track" stroke-width="10"></circle>
          <circle cx="50" cy="50" r="44" fill="none" stroke="var(--green)" stroke-width="10" stroke-linecap="round" stroke-dasharray="${(R2 * s.pct / 100).toFixed(1)} ${R2.toFixed(1)}" transform="rotate(-90 50 50)"></circle>
        </svg>
        <span class="pct num"><strong>${s.pct}%</strong><small>${L.rate}</small></span>
      </div>
      <div class="hero-nums">
        <div><span class="num big-n">${s.done}</span><span class="lbl">${L.cols[2]}</span></div>
        <div><span class="num">${s.doing}</span><span class="lbl">${L.cols[1]}</span></div>
        <div><span class="num">${s.todo}</span><span class="lbl">${L.cols[0]}</span></div>
      </div>
    </div>
  </section>`;

  const tiles = `<section class="stat-tiles">
    <div class="panel tile"><span class="lbl">${L.topCat}</span><strong>${cats[0] ? `<i style="background:${cats[0].c.color}"></i>${esc(cats[0].c.label)}` : '—'}</strong><span class="num sub2">${cats[0] ? L.count(cats[0].total) : ''}</span></div>
    <div class="panel tile"><span class="lbl">${L.busiest}</span><strong>${busiest.total ? esc(mName(busiest.i)) : '—'}</strong><span class="num sub2">${busiest.total ? L.count(busiest.total) : ''}</span></div>
  </section>`;

  const bars = months.map(m => {
    const th = m.total / maxM * 100, dh = m.done / maxM * 100;
    const tip = `${mName(m.i)} · ${L.legendDone} ${m.done} / ${m.total}`;
    return `<div class="mbar ${m.i === curM ? 'cur' : ''}" title="${esc(tip)}" aria-label="${esc(tip)}" role="img" tabindex="0">
      <div class="mcol"><span class="mtrack" style="height:${th.toFixed(1)}%"></span><span class="mfill" style="height:${dh.toFixed(1)}%"></span>${m.i === busiest.i && m.total ? `<span class="mval num" style="bottom:${th.toFixed(1)}%">${m.done}/${m.total}</span>` : ''}</div>
      <span class="mlabel">${mShort(m.i)}</span>
    </div>`;
  }).join('');
  const monthly = `<section class="panel stat-card">
    <div class="stat-head"><h3>${L.byMonth}</h3><span class="legend"><i class="lg-done"></i>${L.legendDone}<i class="lg-all"></i>${L.legendAll}</span></div>
    ${s.total ? `<div class="mchart">${bars}</div>` : `<p class="empty">${L.noData}</p>`}
  </section>`;

  const maxC = Math.max(1, ...cats.map(x => x.total));
  const catRows = cats.map(x => `<div class="crow" title="${esc(`${x.c.label} · ${L.legendDone} ${x.done} / ${x.total}`)}">
      <span class="cname"><i style="background:${x.c.color}"></i>${esc(x.c.label)}</span>
      <span class="cbar"><span class="ctrack" style="width:${(x.total / maxC * 100).toFixed(1)}%"></span><span class="cfill" style="width:${(x.done / maxC * 100).toFixed(1)}%;background:${x.c.color}"></span></span>
      <span class="cnum num">${x.done}<small>/${x.total}</small></span>
    </div>`).join('');
  const byCat = `<section class="panel stat-card">
    <div class="stat-head"><h3>${L.byCat}</h3></div>
    ${cats.length ? `<div class="clist">${catRows}</div>` : `<p class="empty">${L.noData}</p>`}
  </section>`;

  return `<div class="stats">${hero}${tiles}${monthly}${byCat}</div>`;
}

// Hex color → translucent fill for multi-day bars.
const tint = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16 & 255},${n >> 8 & 255},${n & 255},${a})`; };
const ITEM_LINES = 3;

// One calendar cell: date number + up to 3 lines of tasks (title with a color stripe).
// Multi-day tasks are a tinted band that runs across the days, keeping the same line (lane); the title shows where it starts or a new week begins.
function dayItems(key) {
  const lines = new Array(ITEM_LINES).fill(null);
  const ranged = S.tasks.filter(t => isRange(t) && covers(t, key));
  let hidden = 0;
  ranged.forEach(t => { const l = LANES[t.id]; if (l < ITEM_LINES) lines[l] = t; else hidden++; });
  const singles = S.tasks.filter(t => !isRange(t) && t.date === key)
    .sort((a, b) => (a.time || '99:99').localeCompare(b.time || '99:99') || (a.created || 0) - (b.created || 0));
  singles.forEach(t => { const l = lines.indexOf(null); if (l >= 0) lines[l] = t; else hidden++; });
  if (hidden) { const last = ITEM_LINES - 1; if (lines[last]) hidden++; lines[last] = { more: hidden }; }
  const wd = parse(key).getDay();
  return lines.map(t => {
    if (!t) return '<span class="it empty"></span>';
    if (t.more) return `<span class="it more">+${t.more}</span>`;
    const c = (CAT[t.cat] || CAT.life).color, done = t.status === 'done' ? ' fin' : '';
    if (!isRange(t)) return `<span class="it${done}"><i style="background:${c}"></i><b>${esc(t.title)}</b></span>`;
    const st = key === t.date, en = key === tEnd(t);
    const label = st || wd === 0 || key.slice(8) === '01';
    // The title may run over the following days of the band (up to the end of the week).
    const span = Math.min(daysBetween(key, tEnd(t)) + 1, 7 - wd);
    return `<span class="it band${st ? ' s' : ''}${en ? ' e' : ''}${done}" style="background:${tint(c, .28)}">${st ? `<i style="background:${c}"></i>` : ''}${label ? `<b style="max-width:calc(${span * 100}% - 8px)">${esc(t.title)}</b>` : ''}</span>`;
  }).join('');
}

function dayButton(key, label, extra, out) {
  const t = today();
  const hol = holidayOf(key), wd = parse(key).getDay();
  const cls = [key === S.sel ? 'sel' : '', key === t ? 'today' : '', out ? 'out' : '', hol && hol.off ? 'hol' : wd === 0 ? 'sun' : wd === 6 ? 'sat' : ''].join(' ');
  const open = S.tasks.filter(x => covers(x, key) && x.status !== 'done').length;
  const d = parse(key);
  const aria = `${F_MD.format(d)}${hol ? ` ${hol.name}` : ''}${open ? L.openLeft(open) : ''}`;
  return `<button class="day ${cls}" data-act="pick" data-date="${key}" aria-label="${aria}" aria-pressed="${key === S.sel}">${extra || ''}<span class="n">${label}</span><span class="items" aria-hidden="true">${dayItems(key)}</span></button>`;
}

// Lanes keep each multi-day task on the same line across the calendar.
let LANES = {};
function assignLanes() {
  LANES = {};
  const ends = [];
  S.tasks.filter(isRange).sort((a, b) => a.date.localeCompare(b.date) || tEnd(b).localeCompare(tEnd(a))).forEach(t => {
    let i = ends.findIndex(e => e < t.date);
    if (i < 0) { i = ends.length; ends.push(''); }
    ends[i] = tEnd(t); LANES[t.id] = i;
  });
}
function spansFor(key) {
  return S.tasks.filter(t => isRange(t) && covers(t, key) && LANES[t.id] < 2).map(t => {
    const c = (CAT[t.cat] || CAT.life).color;
    return `<i class="span l${LANES[t.id]}${key === t.date ? ' s' : ''}${key === tEnd(t) ? ' e' : ''}${t.status === 'done' ? ' fin' : ''}" style="background:${c}"></i>`;
  }).join('');
}

// "11월" large with a small year next to it.
function monthTitle(d) { return `<b>${esc(F_M.format(d))}</b><small>${esc(F_Y.format(d))}</small>`; }

function calendarView() {
  assignLanes();
  const { y, m } = S.ym;
  const first = new Date(y, m, 1).getDay();
  const dim = new Date(y, m + 1, 0).getDate();
  let cells = '';
  // Leading/trailing days of the neighbouring months fill the grid (faded), like a wall calendar.
  for (let i = first; i > 0; i--) { const dd = new Date(y, m, 1 - i); cells += dayButton(ymd(dd), dd.getDate(), '', true); }
  for (let d = 1; d <= dim; d++) cells += dayButton(ymd(new Date(y, m, d)), d);
  const tail = (7 - (first + dim) % 7) % 7;
  for (let i = 1; i <= tail; i++) { const dd = new Date(y, m + 1, i); cells += dayButton(ymd(dd), dd.getDate(), '', true); }
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

  return `<section class="panel cal ${S.calOpen ? 'expanded' : ''}" aria-label="${L.calendar}">
    <div class="cal-month">
      <div class="cal-head">
        <label class="cal-title">${monthTitle(new Date(y, m, 1))}<input type="month" class="month-in" value="${y}-${pad(m + 1)}" aria-label="${L.calendar}"></label>
        <div class="nav"><button data-act="month" data-d="-1" aria-label="${L.prevMonth}">${ICON.left}</button><button data-act="month" data-d="1" aria-label="${L.nextMonth}">${ICON.right}</button></div>
      </div>
      <div class="dow" aria-hidden="true">${DAYS.map((d, i) => `<span class="${i === 0 ? 'sun' : i === 6 ? 'sat' : ''}">${d}</span>`).join('')}</div>
      <div class="grid7">${cells}</div>
    </div>
    <div class="week">
      <div class="cal-head">
        <label class="cal-title">${monthTitle(mid)}<input type="month" class="month-in" value="${mid.getFullYear()}-${pad(mid.getMonth() + 1)}" aria-label="${L.calendar}"></label>
        <div class="nav"><button data-act="week" data-d="-7" aria-label="${L.prevWeek}">${ICON.left}</button><button data-act="week" data-d="7" aria-label="${L.nextWeek}">${ICON.right}</button></div>
      </div>
      <div class="grid7">${week}</div>
    </div>
    <button class="cal-more" data-act="cal-toggle" aria-expanded="${S.calOpen}" aria-label="${S.calOpen ? L.collapse : L.monthView}">${S.calOpen ? ICON.ne : ICON.se}</button>
    <div class="cal-foot"><span>${L.monthLeft}</span><span class="num">${L.count(monthOpen)}</span></div>
  </section>`;
}

// Date in the edit form: "11월 5일 목요일" (year added when it is not this year).
const F_LONG_Y = dtf({ year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' });
function editDateText(k) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(k || '')) return L.date;
  return (k.slice(0, 4) === today().slice(0, 4) ? F_LONG : F_LONG_Y).format(parse(k));
}

// Edit form "when" row, calendar-app style:  🕐  [11월 26일 (목) / 오후 8:00]  ›  [11월 28일 (토) / 3일간]
// Start: tap the date for a date picker, the time for the wheel. End: tap to pick the last day (same day = one-day task).
const F_MDW = dtf({ month: 'long', day: 'numeric', weekday: 'short' });
function whenRow() {
  const e = S.edit, end = e.end && e.end > e.date ? e.end : e.date;
  const tBtn = (target, t) => `<button type="button" class="when-big ${t ? '' : 'dim'}" data-act="time-open" data-target="${target}" aria-label="${t ? L.timeChange(showTime(t)) : L.timeAdd}">${esc(t ? showTime(t) : L.timeAdd)}</button>`;
  return `<div class="sh-row when">
    <span class="sh-ico" aria-hidden="true">${CLOCK}</span>
    <div class="when-body">
      <div class="when-block">
        <label class="when-date">${esc(F_MDW.format(parse(e.date)))}<input id="edit-date" type="date" value="${esc(e.date)}" aria-label="${L.date}"></label>
        ${tBtn('te', e.time)}
      </div>
      <span class="when-arrow" aria-hidden="true">${ICON.right}</span>
      <div class="when-block">
        <label class="when-date">${esc(F_MDW.format(parse(end)))}<input id="edit-end" type="date" min="${esc(e.date)}" value="${esc(end)}" aria-label="${L.endPick}"></label>
        ${tBtn('tee', e.endTime)}
      </div>
      <button type="button" class="allday ${e.time ? '' : 'on'}" data-act="allday" aria-pressed="${!e.time}">${L.allDay}</button>
    </div>
  </div>`;
}

// Add / edit sheet (minical-style): slides up over the page, title on top so the keyboard never covers it.
function sheetView() {
  if (!S.edit) return '';
  const e = S.edit, c = CAT[e.cat] || CAT.life, isNew = !S.editId;
  return `<div class="sheet-bg" data-act="cancel"></div>
  <form class="sheet" data-form="sheet" role="dialog" aria-modal="true" aria-label="${isNew ? L.newTask : L.editTask}">
    <div class="sheet-grip" aria-hidden="true"></div>
    <div class="sheet-head">
      <button type="button" class="sh-cancel" data-act="cancel">${L.cancel}</button>
      <span class="sh-title">${isNew ? L.newTask : L.editTask}</span>
      <button type="submit" class="sh-save">${L.save}</button>
    </div>
    <div class="sh-row sh-titlebox">
      <span class="sh-ico"><i style="background:${c.color}"></i></span>
      <input id="edit-title" class="sh-input" placeholder="${L.titlePh}" maxlength="200" autocomplete="off" enterkeyhint="done" value="${esc(e.title)}" aria-label="${L.taskName}">
    </div>
    ${whenRow()}
    ${S.timeOpen === 'te' || S.timeOpen === 'tee' ? `<div class="sh-wheel">${timeWheel(S.timeOpen)}</div>` : ''}
    <div class="sh-row">
      <span class="sh-ico" aria-hidden="true">${ICON.tag}</span>
      <div class="chips" role="group" aria-label="${L.changeCat}">${chips(e.cat, 'editcat', true)}</div>
    </div>
    <div class="sh-row">
      <span class="sh-ico" aria-hidden="true">${ICON.bell}</span>
      <div class="alarm-opts" role="group" aria-label="${L.alarm}">${ALARMS.map(a => `<button type="button" class="chip alarm-chip" data-act="alarm" data-v="${a}" aria-pressed="${(e.alarm ?? '') === a}">${alarmLabel(a)}</button>`).join('')}</div>
    </div>
    ${isNew ? '' : `<button type="button" class="sh-del" data-act="del" data-id="${esc(S.editId)}">${ICON.trash}<span>${L.del}</span></button>`}
  </form>`;
}

const ALARMS = ['', 0, 10, 30, 60, 1440];
const alarmLabel = a => a === '' ? L.alarmNone : a === 0 ? L.alarmAt : a < 60 ? L.alarmMin(a) : a < 1440 ? L.alarmHour(a / 60) : L.alarmDay;

function openAdd(date) {
  S.editId = null;
  S.edit = { title: '', date, end: '', cat: S.newCat || 'work', time: null, endTime: null, alarm: '' };
  S.timeOpen = null; S.focusId = 'edit-title';
}

// Left time column, calendar-app style: big "8:00" with a small 오후/PM; multi-day shows the end day under it; no time = 「종일」.
function timeCol(t) {
  const tm = parseTime(t.time);
  let main = `<span class="ct-all">${L.allDay}</span>`;
  if (tm) {
    const parts = F_HM.formatToParts(new Date(2024, 0, 1, tm.h, tm.m));
    const per = (parts.find(p => p.type === 'dayPeriod') || {}).value || '';
    const hm = parts.filter(p => p.type !== 'dayPeriod').map(p => p.value).join('').trim();
    const before = parts.findIndex(p => p.type === 'dayPeriod') < parts.findIndex(p => p.type === 'hour');
    const perHtml = per ? `<span class="ct-per">${esc(per)}</span>` : '';
    main = `<span class="ct-line">${before ? perHtml : ''}<b class="ct-big num">${esc(hm)}</b>${before ? '' : perHtml}</span>`;
  }
  const et = parseTime(t.endTime);
  const sub = et ? `<span class="ct-sub num">~${esc(showTime(et))}</span>` : isRange(t) ? `<span class="ct-sub">~${esc(F_MD.format(parse(tEnd(t))))}</span>` : '';
  return `<div class="c-time${t.status === 'done' ? ' fin' : ''}">${main}${sub}</div>`;
}

function card(t, ci) {
  const c = CAT[t.cat] || CAT.life;
  const done = t.status === 'done';
  // Minimal card: the date line only when it adds something (multi-day, or a list that isn't a single day).
  const meta = isRange(t) || S.view !== 'day' ? dateLabel(t) : '';
  const prev = ORDER[ci - 1], next = ORDER[ci + 1];
  const id = esc(t.id), title = esc(t.title);
  return `<div class="swipe ${S.openSwipe === t.id ? 'open' : ''}" data-id="${id}">
    ${next ? `<div class="swipe-move to-${next}" aria-hidden="true">${ICON.rightBig}<span>${COLS[ci + 1].label}</span></div>` : ''}
    <button class="swipe-del" data-act="del" data-id="${id}" tabindex="-1" aria-label="${L.del}: ${title}">${ICON.trashBig}<span>${L.del}</span></button>
    <article class="card ${prev ? 'has-back' : ''}" data-swipe data-id="${id}" data-next="${next || ''}">
      ${timeCol(t)}
      <i class="c-bar" style="background:${c.color}" aria-hidden="true"></i>
      <div class="card-main">
        <button class="title ${done ? 'done' : ''}" data-act="edit" data-id="${id}" aria-label="${L.editAria(title)}">${title}${typeof t.alarm === 'number' && !done ? `<span class="c-bell">${ICON.bellSm}</span>` : ''}</button>
        ${meta ? `<span class="cat">${esc(meta)}</span>` : ''}
      </div>
      ${prev ? `<button class="arrow back" data-act="move" data-id="${id}" data-to="${prev}" aria-label="${L.backTo(title, COLS[ci - 1].label)}"><span class="back-box">${ICON.leftBig}</span></button>` : ''}
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
      ${cards.map(t => card(t, ci)).join('')}
      ${cards.length === 0 && c.id !== 'todo' ? `<p class="empty">${L.empty}</p>` : ''}
      ${c.id === 'todo' ? `<button type="button" class="add-row" data-act="add-open">${ICON.plus}<span>${L.newTask}</span></button>` : ''}
    </div>`;
  }).join('');
  // Phone: [할 일 | 수행 중 | 완료] [+] in one row; + opens the input under it (+ turns into ×).
  const heading = S.view === 'day' ? (S.sel.slice(0, 4) === today().slice(0, 4) ? F_MDW : dtf({ year: 'numeric', month: 'long', day: 'numeric', weekday: 'short' })).format(parse(S.sel))
    : S.view === 'week' ? rangeText(...weekOf(S.sel)) : F_YM.format(parse(S.sel));
  return `<section class="board" aria-label="${L.board}">
    <h2 class="day-title">${esc(heading)}</h2>
    <div class="tabs-row">
      <div class="tabs" role="group" aria-label="${L.status}">${tabs}</div>
      <button type="button" class="add-toggle" data-act="add-open" aria-label="${L.addTask}">${ICON.plus}</button>
    </div>
    ${cols}
  </section>`;
}

function holTag(k) {
  const h = holidayOf(k);
  return h ? ` <span class="hol-name ${h.off ? 'off' : ''}">· ${esc(h.name)}</span>` : '';
}

function headerView() {
  const isToday = S.sel === today(), day = S.view === 'day';
  const views = [
    `<button data-act="today" aria-pressed="${day && isToday}">${L.today}</button>`,
    isToday ? '' : `<button data-act="view" data-view="day" aria-pressed="${day}">${L.selDay}</button>`,
    `<button data-act="view" data-view="week" aria-pressed="${S.view === 'week'}">${L.weekBtn}</button>`,
    `<button data-act="view" data-view="month" aria-pressed="${S.view === 'month'}">${L.monthBtn}</button>`
  ].join('');
  const stats = S.page === 'stats';
  const pageBtn = stats
    ? `<button class="pill page-btn" data-act="page" data-page="tasks">${ICON.list}<span>${L.title}</span></button>`
    : `<button class="pill page-btn" data-act="page" data-page="stats">${ICON.chart}<span>${L.stats}</span></button>`;
  let account = '';
  if (DEMO) account = `<span class="badge">${L.demo}</span>`;
  else if (S.user) {
    const u = S.user, initial = esc(((u.displayName || u.email || '?').trim()[0] || '?').toUpperCase());
    const face = u.photoURL ? `<img class="avatar" src="${esc(u.photoURL)}" alt="" referrerpolicy="no-referrer">` : `<span class="avatar">${initial}</span>`;
    const menu = S.menuOpen ? `<div class="acct-menu" role="menu">
        ${u.email ? `<div class="acct-mail">${esc(u.email)}</div>` : ''}
        <button role="menuitem" data-act="switch-acct">${L.switchAcct}</button>
        <button role="menuitem" class="acct-out" data-act="logout">${L.logout}</button>
      </div>` : '';
    account = `<div class="account"><button class="avatar-btn" data-act="acct-menu" aria-haspopup="menu" aria-expanded="${!!S.menuOpen}" aria-label="${L.account}">${face}</button>${menu}</div>`;
  }
  return `<header class="top">
    <div class="title-group"><h1>${stats ? L.stats : L.title}</h1><span class="sub">${stats ? '' : S.view === 'day' ? longDate(S.sel) + holTag(S.sel) : S.view === 'week' ? esc(rangeText(...weekOf(S.sel))) : F_YM.format(parse(S.sel))}</span></div>
    <div class="top-actions">
      ${stats ? '<span class="seg-spacer"></span>' : `<div class="seg" role="group" aria-label="${L.view}">${views}</div>`}
      ${pageBtn}
      ${account}
    </div>
  </header>`;
}

function loginView() {
  return `<main class="login"><div class="login-card">
    <div class="logo">${ICON.check}</div>
    <h1>HALGGO</h1>
    <p>${L.loginText}</p>
    <button class="google" data-act="login">${ICON.google}${L.google}</button>
    ${S.error ? `<p class="err" role="alert">${esc(S.error)}</p>` : ''}
  </div></main>`;
}

function toastView() {
  if (!S.toast) return '';
  return `<div class="toast" role="status">${esc(S.toast.text)}${S.toast.undo ? `<button data-act="undo">${L.undo}</button>` : ''}</div>`;
}

function render() {
  const a = document.activeElement;
  // Never re-focus a date field after re-rendering: on phones that reopens the date picker again and again.
  const fid = S.focusId || (a && a.id && a.type !== 'date' ? a.id : null);
  let ss = null, se = null;
  if (!S.focusId && a && a.id) { try { ss = a.selectionStart; se = a.selectionEnd; } catch (e) { /* not a text field */ } }

  let html;
  if (S.mode === 'loading') html = `<p class="boot">${L.loading}</p>`;
  else if (S.mode === 'fatal') html = `<main class="login"><div class="login-card"><h1>HALGGO</h1><p>${esc(S.error)}</p><button class="google" data-act="reload">${L.retry}</button></div></main>`;
  else if (S.mode === 'login') html = loginView();
  else {
    html = `<div class="wrap">
      ${headerView()}
      ${DEMO ? `<p class="notice">${L.demoNotice}</p>` : ''}
      ${S.page === 'stats' ? statsView() : `${progressView()}
      <div class="main">${calendarView()}${boardView()}</div>`}
    </div>`;
  }
  root.innerHTML = html + (S.mode === 'app' ? sheetView() + catSheetView() : '') + toastView();
  scheduleAlarms();
  document.documentElement.classList.toggle('sheet-open', !!(S.edit || S.catDraft) && S.mode === 'app');

  if (fid) {
    const el = document.getElementById(fid);
    if (el) {
      el.focus({ preventScroll: true });
      if (ss != null) { try { el.setSelectionRange(ss, se); } catch (e) { /* ignore */ } }
      else if (S.focusId && el.select) { try { const n = el.value.length; el.setSelectionRange(n, n); } catch (e) { /* ignore */ } }
    }
  }
  S.focusId = null;
  alignBack();
}

// The ‹ button sits right under the count above it: the 「완료」 tab number on phones, each column's count badge on PC.
function alignBack() {
  const phone = window.matchMedia('(max-width: 760px)').matches;
  root.querySelectorAll('.board > .col').forEach(col => {
    const ref = phone ? root.querySelector('.board .tabs button:last-child .num') : col.querySelector('.col-head .count');
    const wrap = col.querySelector('.card.has-back');
    if (!ref || !wrap) return;
    const r = ref.getBoundingClientRect(), c = wrap.parentElement.getBoundingClientRect();
    if (!r.width || !c.width) return;
    col.style.setProperty('--back-r', '6px'); void r; void c;
  });
}
window.addEventListener('resize', () => alignBack());

/* Phone keyboard: keep the form being typed in (new-task input or edit form) fully above the keyboard. */
function fitEdit() {
  const a = document.activeElement;
  const f = (a && a.closest && a.closest('form.composer, form.card.edit')) || root.querySelector('form.card.edit');
  if (!f || !f.offsetParent) return;
  const vv = window.visualViewport, top = vv ? vv.offsetTop : 0, h = vv ? vv.height : window.innerHeight;
  const r = f.getBoundingClientRect();
  const over = r.bottom + 12 - (top + h);
  if (over > 0) window.scrollBy({ top: Math.min(over, r.top - top - 12), behavior: 'smooth' });
  else if (r.top < top + 8) window.scrollBy({ top: r.top - top - 12, behavior: 'smooth' });
}
root.addEventListener('focusin', e => {
  if (e.target.closest && e.target.closest('form.composer, form.card.edit')) { setTimeout(fitEdit, 350); setTimeout(fitEdit, 700); }
});
if (window.visualViewport) {
  let kbT = null;
  window.visualViewport.addEventListener('resize', () => {
    const kb = Math.max(0, Math.round(window.innerHeight - window.visualViewport.height));
    document.documentElement.style.setProperty('--kb', kb + 'px');
    clearTimeout(kbT); kbT = setTimeout(fitEdit, 80);
  });
}

/* ---------- Actions ---------- */

let toastTimer = null;
function showToast(text, undo) {
  clearTimeout(toastTimer);
  S.toast = { text, undo };
  render();
  toastTimer = setTimeout(() => { S.toast = null; render(); }, 5000);
}

function fail() { showToast(L.saveFail); }

function syncMonth() { const d = parse(S.sel); S.ym = { y: d.getFullYear(), m: d.getMonth() }; }

function deleteTask(id) {
  const t = S.tasks.find(x => x.id === id);
  if (!t || !store) return;
  if (S.editId === id) { S.editId = null; S.edit = null; S.timeOpen = null; }
  S.openSwipe = null;
  store.remove(id).then(() => {
    const { id: _drop, ...rest } = t;
    showToast(L.deleted, rest);
  }).catch(fail);
  render();
}

let suppressClick = false;
function swallowNextClick() { suppressClick = true; setTimeout(() => { suppressClick = false; }, 400); }

root.addEventListener('click', e => {
  if (suppressClick) { e.preventDefault(); e.stopPropagation(); suppressClick = false; return; }
  // A submit button must reach its form's submit event — re-rendering here would detach the form first.
  if (e.target.closest('button[type="submit"]')) return;
  let dirty = false;
  // Tapping anywhere else closes an open swipe or time wheel.
  if (S.openSwipe && !e.target.closest(`.swipe[data-id="${CSS.escape(S.openSwipe)}"] .swipe-del`)) { S.openSwipe = null; dirty = true; }
  if (S.timeOpen && !e.target.closest('.tw') && !e.target.closest('.time-pill')) { S.timeOpen = null; dirty = true; }
  if (S.menuOpen && !e.target.closest('.account')) { S.menuOpen = false; dirty = true; }
  const b = e.target.closest('[data-act]');
  if (!b) { if (dirty) render(); return; }
  const act = b.dataset.act, id = b.dataset.id;
  switch (act) {
    case 'login': signIn(); return;
    case 'reload': location.reload(); return;
    case 'logout': S.menuOpen = false; render(); signOutFn(); return;
    case 'acct-menu': S.menuOpen = !S.menuOpen; break;
    case 'switch-acct': S.menuOpen = false; render(); signIn(); return;
    case 'pick':
      // Tapping the day that is already selected opens "new task" for that day (minical-style).
      if (b.dataset.date === S.sel && S.view === 'day') { openAdd(S.sel); break; }
      S.sel = b.dataset.date; S.view = 'day'; syncMonth(); break;
    case 'add-open': S.tab = 'todo'; openAdd(S.sel); break;
    case 'alarm':
      if (!S.edit) break;
      S.edit.alarm = b.dataset.v === '' ? '' : Number(b.dataset.v);
      if (S.edit.alarm !== '') { askNotify(); if (!S.edit.time) showToast(L.allDayAlarm); }
      break;
    case 'cat-manage': S.catDraft = CATS.map(c => ({ id: c.id, label: c.label, color: c.color })); S.catPick = null; break;
    case 'cat-cancel': S.catDraft = null; S.catPick = null; break;
    case 'cat-color': S.catPick = S.catPick === Number(b.dataset.i) ? null : Number(b.dataset.i); break;
    case 'cat-swatch': if (S.catDraft) S.catDraft[Number(b.dataset.i)].color = b.dataset.c; S.catPick = null; break;
    case 'cat-del': if (S.catDraft) S.catDraft.splice(Number(b.dataset.i), 1); S.catPick = null; break;
    case 'cat-add': {
      if (!S.catDraft) break;
      const used = new Set(S.catDraft.map(c => c.color));
      S.catDraft.push({ id: 'c_' + Date.now().toString(36), label: '', color: SWATCHES.find(c => !used.has(c)) || SWATCHES[0] });
      S.catPick = null; S.focusId = 'catname-' + (S.catDraft.length - 1);
      break;
    }
    case 'cat-reset':
      if (!window.confirm(L.catResetQ)) return;
      S.catDraft = DEFAULT_CATS.map(c => ({ id: c.id, label: c.label, color: c.color })); S.catPick = null;
      break;
    case 'cat-done':
      if (S.catDraft) { saveCats(S.catDraft); if (S.edit && !CAT[S.edit.cat]) S.edit.cat = 'work'; }
      S.catDraft = null; S.catPick = null;
      break;
    case 'allday':
      if (!S.edit) break;
      if (S.edit.time) { S.edit.time = null; S.edit.endTime = null; S.timeOpen = null; }
      else { S.timeBefore = null; S.edit.time = nowRounded(); S.timeOpen = 'te'; S.focusId = 'te-h'; }
      break;
    case 'month': {
      let m = S.ym.m + Number(b.dataset.d), y = S.ym.y;
      if (m < 0) { m = 11; y--; } if (m > 11) { m = 0; y++; }
      S.ym = { y, m }; break;
    }
    case 'week': S.sel = addDays(S.sel, Number(b.dataset.d)); S.view = 'day'; syncMonth(); break;
    case 'cal-toggle': S.calOpen = !S.calOpen; syncMonth(); break;
    case 'today': S.sel = today(); S.view = 'day'; syncMonth(); break;
    case 'view': S.view = b.dataset.view; break;
    case 'page': S.page = b.dataset.page; S.statYear = S.statYear || +today().slice(0, 4); window.scrollTo(0, 0); break;
    case 'year': S.statYear += Number(b.dataset.d); break;
    case 'tab': S.tab = b.dataset.tab; break;
    case 'newcat': S.newCat = b.dataset.cat; break;
    case 'editcat': if (S.edit) S.edit.cat = b.dataset.cat; break;
    case 'time-open': {
      const tg = b.dataset.target;
      if (S.timeOpen === tg) { S.timeOpen = null; break; }
      S.timeBefore = getTime(tg) || null;
      if (!getTime(tg)) {
        // End time starts one hour after the start time.
        if (tg === 'tee' && S.edit && !S.edit.time) S.edit.time = nowRounded();
        const st = S.edit && S.edit.time;
        setTime(tg, tg === 'tee' && st ? { h: (st.h + 1) % 24, m: st.m } : nowRounded());
      }
      S.timeOpen = tg; S.focusId = tg + '-h';
      break;
    }
    case 'time-close': S.timeOpen = null; break;
    // 취소: put back the time it had before the wheel opened (none → no time).
    case 'time-off': setTime(b.dataset.target, S.timeBefore || null); S.timeOpen = null; break;
    case 'move': store && store.update(id, { status: b.dataset.to }).catch(fail); if (dirty) render(); return;
    case 'del': deleteTask(id); return;
    case 'undo':
      if (S.toast && S.toast.undo && store) store.add(S.toast.undo).catch(fail);
      clearTimeout(toastTimer); S.toast = null; break;
    case 'edit': {
      const t = S.tasks.find(x => x.id === id);
      if (!t) return;
      S.editId = id; S.edit = { title: t.title, date: t.date, end: isRange(t) ? t.end : '', cat: CAT[t.cat] ? t.cat : 'life', time: parseTime(t.time), endTime: parseTime(t.endTime), alarm: typeof t.alarm === 'number' ? t.alarm : '' };
      S.timeOpen = null;
      break;
    }
    case 'end-clear': if (S.edit) S.edit.end = ''; break;
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
  if (e.key === 'Escape' && S.catDraft) { S.catDraft = null; render(); return; }
  if (e.key === 'Escape' && S.edit) { S.editId = null; S.edit = null; render(); return; }
  const col = e.target.closest && e.target.closest('.tw-col');
  if (!col || (e.key !== 'ArrowUp' && e.key !== 'ArrowDown')) return;
  e.preventDefault();
  stepTime(col.closest('.tw').dataset.target, col.dataset.part, e.key === 'ArrowUp' ? 1 : -1);
});

const DEL_W = 88;
const moveAt = card => Math.min(120, card.offsetWidth * 0.35);
let drag = null, sw = null, tabSw = null, calSw = null, rd = null;

root.addEventListener('pointerdown', e => {
  const col = e.target.closest('.tw-col');
  if (col) {
    drag = { col, target: col.closest('.tw').dataset.target, part: col.dataset.part, y: e.clientY, startY: e.clientY, moved: false };
    try { col.setPointerCapture(e.pointerId); } catch (er) { /* ignore */ }
    e.preventDefault();
    return;
  }
  const cardEl = e.target.closest('.card[data-swipe]');
  if (e.target.closest('.cal .grid7')) { calSw = { x: e.clientX, y: e.clientY }; return; }
  if (e.target.closest('.board .tabs')) {
    tabSw = { x: e.clientX, y: e.clientY };
    return;
  }
  if (!cardEl || (e.pointerType === 'mouse' && e.button !== 0)) return;
  sw = { card: cardEl, wrap: cardEl.parentElement, id: cardEl.dataset.id, next: cardEl.dataset.next, x: e.clientX, y: e.clientY, dx: 0, active: false,
         base: cardEl.parentElement.classList.contains('open') ? -DEL_W : 0, pid: e.pointerId };
  // Press and hold → pick the card up and drag it up/down to set its priority.
  const mine = sw;
  sw.lp = setTimeout(() => { if (sw === mine && !mine.active) startReorder(mine); }, 380);
});

function startReorder(s) {
  sw = null;
  rd = { wrap: s.wrap, col: s.wrap.parentElement, y0: s.y, pid: s.pid };
  try { s.card.setPointerCapture(s.pid); } catch (er) { /* ignore */ }
  s.wrap.classList.add('lifting');
  if (navigator.vibrate) navigator.vibrate(12);
}
function moveReorder(y) {
  const { wrap, col } = rd;
  const gap = parseFloat(getComputedStyle(col).rowGap) || 8;
  let prev = wrap.previousElementSibling, next = wrap.nextElementSibling;
  if (prev && prev.classList.contains('swipe')) {
    const r = prev.getBoundingClientRect();
    if (y < r.top + r.height / 2) { col.insertBefore(wrap, prev); rd.y0 -= r.height + gap; }
  }
  if (next && next.classList.contains('swipe')) {
    const r = next.getBoundingClientRect();
    if (y > r.top + r.height / 2) { col.insertBefore(next, wrap); rd.y0 += r.height + gap; }
  }
  wrap.style.transform = `translateY(${y - rd.y0}px)`;
}
function endReorder() {
  const { wrap, col } = rd; rd = null;
  wrap.classList.remove('lifting'); wrap.style.transform = '';
  swallowNextClick();
  [...col.querySelectorAll(':scope > .swipe')].forEach((w, i) => {
    const t = S.tasks.find(x => x.id === w.dataset.id), o = (i + 1) * 1000;
    if (t && t.order !== o) { t.order = o; if (store) store.update(t.id, { order: o }).catch(fail); }
  });
  render();
}
// While a card is picked up, stop the page from scrolling under the finger.
root.addEventListener('touchmove', e => { if (rd) e.preventDefault(); }, { passive: false });
root.addEventListener('contextmenu', e => { if (e.target.closest('.card[data-swipe]')) e.preventDefault(); });

root.addEventListener('pointermove', e => {
  if (rd) { e.preventDefault(); moveReorder(e.clientY); return; }
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
    } else if (Math.abs(dy) > 10) { clearTimeout(sw.lp); sw = null; return; } else return;
  }
  if (sw.lp) { clearTimeout(sw.lp); sw.lp = null; }
  sw.dx = Math.min(sw.next && !sw.base ? sw.card.offsetWidth : 0, sw.base + dx);
  sw.card.style.transform = `translateX(${sw.dx}px)`;
  sw.wrap.classList.toggle('far', sw.dx < -sw.card.offsetWidth * 0.55);
  sw.wrap.classList.toggle('fwd', sw.dx > 0);
  sw.wrap.classList.toggle('go', sw.dx > moveAt(sw.card));
});

function endPointer(e) {
  if (rd) { endReorder(); return; }
  if (sw && sw.lp) clearTimeout(sw.lp);
  if (calSw) {
    const c = calSw; calSw = null;
    const dx = e.clientX - c.x, dy = e.clientY - c.y;
    if (e.type !== 'pointerup' || Math.abs(dx) < 50 || Math.abs(dx) < Math.abs(dy) * 1.5) return;
    swallowNextClick();
    const dir = dx < 0 ? 1 : -1;   // swipe left → next month / week
    const phoneWeek = window.matchMedia('(max-width: 760px)').matches && !S.calOpen;
    if (phoneWeek) { S.sel = addDays(S.sel, 7 * dir); S.view = 'day'; syncMonth(); }
    else { let m = S.ym.m + dir, y = S.ym.y; if (m < 0) { m = 11; y--; } if (m > 11) { m = 0; y++; } S.ym = { y, m }; }
    render();
    return;
  }
  if (tabSw) {
    const t = tabSw; tabSw = null;
    const dx = e.clientX - t.x, dy = e.clientY - t.y;
    if (e.type !== 'pointerup' || Math.abs(dx) < 40 || Math.abs(dx) < Math.abs(dy) * 1.5) return;
    // The blue highlight follows the finger: swipe right → next tab, left → previous.
    const i = ORDER.indexOf(S.tab) + Math.sign(dx);
    if (i < 0 || i >= ORDER.length) return;
    swallowNextClick();
    S.tab = ORDER[i];
    render();
    return;
  }
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

// Date pickers re-render only when the choice is final ('change'), so the native picker isn't closed mid-scroll.
root.addEventListener('change', e => {
  const el = e.target;
  if (el.type === 'date' || el.type === 'month') el.blur();
  if (el.classList && el.classList.contains('month-in') && el.value) {
    const [yy, mm] = el.value.split('-').map(Number);
    S.sel = el.value === today().slice(0, 7) ? today() : `${el.value}-01`;
    S.ym = { y: yy, m: mm - 1 }; S.view = 'day'; render(); return;
  }
  if (el.id === 'edit-end' && S.edit) { S.edit.end = el.value > S.edit.date ? el.value : ''; render(); }
  else if (el.id === 'edit-date' && S.edit && el.value) { S.edit.date = el.value; if (S.edit.end && S.edit.end <= el.value) S.edit.end = ''; render(); }
  else if (el.classList && el.classList.contains('range-in')) { S.draftEnd = el.value; render(); }
});

root.addEventListener('input', e => {
  const el = e.target;
  if (el.classList.contains('composer-input')) S.draft = el.value;
  else if (el.id === 'edit-title' && S.edit) S.edit.title = el.value;
  else if (el.classList.contains('cat-name') && S.catDraft) S.catDraft[Number(el.dataset.i)].label = el.value;
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
    if (S.draftEnd && S.draftEnd > S.sel) task.end = S.draftEnd;
    S.draftEnd = '';
    store.add(task).catch(fail);
    S.draft = '';
    S.draftTime = null;
    S.timeOpen = null;
    S.tab = 'todo';
    S.focusId = f.querySelector('input').id;
    render();
  } else if (f.dataset.form === 'sheet' && S.edit) {
    const title = (S.edit.title || '').trim();
    if (!title) { const el = document.getElementById('edit-title'); if (el) el.focus(); return; }
    if (!S.editId) {
      const e2 = S.edit, task = { title, date: e2.date, status: 'todo', cat: e2.cat, created: Date.now() };
      if (e2.time) task.time = fmtTime(e2.time);
      if (e2.time && e2.endTime) task.endTime = fmtTime(e2.endTime);
      if (typeof e2.alarm === 'number') task.alarm = e2.alarm;
      if (e2.end && e2.end > e2.date) task.end = e2.end;
      S.newCat = e2.cat;
      store.add(task).catch(fail);
      S.sel = e2.date; S.view = 'day'; S.tab = 'todo'; syncMonth();
      S.edit = null; S.timeOpen = null;
      render();
      return;
    }
    const patch = { title, cat: S.edit.cat, time: S.edit.time ? fmtTime(S.edit.time) : '', endTime: S.edit.time && S.edit.endTime ? fmtTime(S.edit.endTime) : '', alarm: typeof S.edit.alarm === 'number' ? S.edit.alarm : '' };
    if (/^\d{4}-\d{2}-\d{2}$/.test(S.edit.date || '')) patch.date = S.edit.date;
    const d0 = patch.date || S.edit.date;
    patch.end = /^\d{4}-\d{2}-\d{2}$/.test(S.edit.end || '') && S.edit.end > d0 ? S.edit.end : '';
    store.update(S.editId, patch).catch(fail);
    S.editId = null; S.edit = null; S.timeOpen = null;
    render();
  }
});

// Re-render when the day changes or the layout crosses the phone breakpoint.
let lastDay = today();
setInterval(() => { if (today() !== lastDay) { lastDay = today(); render(); } }, 60000);
window.matchMedia('(max-width: 760px)').addEventListener('change', () => render());

/* ---------- Alerts (banner notifications) ----------
   While the app is open or in the background, alerts fire at the set time through the service worker.
   iPhone: works for the Home Screen app (iOS 16.4+). Alerts while the app is fully closed would need a push server. */
let swReg = null;
if ('serviceWorker' in navigator && location.protocol === 'https:') {
  navigator.serviceWorker.register('/sw.js').then(r => { swReg = r; }).catch(() => {});
}
function askNotify() {
  if (!('Notification' in window)) { showToast(L.notifNeedHome); return; }
  if (Notification.permission === 'granted') return;
  if (Notification.permission === 'denied') { showToast(L.notifDenied); return; }
  Notification.requestPermission().then(p => showToast(p === 'granted' ? L.notifOn : L.notifDenied));
}
const FIRED_KEY = 'halggo-fired';
let alarmTimers = [];
function alarmAt(t) {
  if (typeof t.alarm !== 'number' || t.status === 'done' || !t.date) return null;
  const tm = parseTime(t.time) || { h: 9, m: 0 };
  const d = parse(t.date); d.setHours(tm.h, tm.m, 0, 0);
  return d.getTime() - t.alarm * 60000;
}
function scheduleAlarms() {
  alarmTimers.forEach(clearTimeout); alarmTimers = [];
  if (S.mode !== 'app') return;
  let fired = {};
  try { fired = JSON.parse(localStorage.getItem(FIRED_KEY)) || {}; } catch (e) { fired = {}; }
  const now = Date.now(), horizon = now + 2 * 86400000;
  for (const t of S.tasks) {
    const at = alarmAt(t);
    if (at == null || at < now - 60000 || at > horizon) continue;
    const key = `${t.id}@${at}`;
    if (fired[key]) continue;
    alarmTimers.push(setTimeout(() => fireAlarm(t, key), Math.max(0, at - now)));
  }
}
function fireAlarm(t, key) {
  let fired = {};
  try { fired = JSON.parse(localStorage.getItem(FIRED_KEY)) || {}; } catch (e) { fired = {}; }
  if (fired[key]) return;
  const cut = Date.now() - 7 * 86400000;
  Object.keys(fired).forEach(k => { if (fired[k] < cut) delete fired[k]; });
  fired[key] = Date.now();
  try { localStorage.setItem(FIRED_KEY, JSON.stringify(fired)); } catch (e) { /* ignore */ }
  const when = t.time ? showTime(parseTime(t.time)) : L.allDay;
  const body = `${when} · ${(CAT[t.cat] || CAT.life).label}`;
  if ('Notification' in window && Notification.permission === 'granted') {
    const opt = { body, tag: key, icon: '/icon-512.png', badge: '/icon-180.png', data: { url: '/' } };
    (swReg ? swReg.showNotification(t.title, opt) : Promise.reject()).catch(() => { try { new Notification(t.title, opt); } catch (e) { /* ignore */ } });
  }
  showToast(`🔔 ${t.title} · ${when}`);
}
setInterval(scheduleAlarms, 30 * 60000);

/* ---------- Boot ---------- */

if (DEMO) {
  store = demoStore();
  S.mode = 'app';
  store.subscribe(tasks => { S.tasks = tasks; render(); });
} else {
  initCloud();
}
