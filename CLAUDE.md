# HALGGO — 프로젝트 안내 (Claude가 먼저 읽을 것)

캘린더 + 칸반보드(할 일 / 수행 중 / 완료) + 진행도 그래프가 있는 개인 할 일 웹앱.
구글 로그인으로 각자 자기 목록을 쓰고, 휴대폰·PC가 실시간 동기화된다.
사용자는 비개발자이고 주로 **휴대폰**으로 작업한다. 설명은 한국어로, 단계별·링크 위주로 짧게.

## 운영 정보
- 사이트: https://halggo-6e9d.vercel.app (Vercel, GitHub `kcap1/HALGGO` main 브랜치 push 시 자동 배포)
- Firebase 프로젝트: `halggo` (Authentication: Google 로그인 / Firestore: 서울 asia-northeast3)
  - 승인된 도메인에 `halggo-6e9d.vercel.app` 등록되어 있음. 도메인이 바뀌면 다시 추가해야 로그인됨.
  - 콘솔: https://console.firebase.google.com/project/halggo
- 데이터 경로: `users/{uid}/tasks/{taskId}` — 필드 `title, date(YYYY-MM-DD), time('HH:MM' 또는 ''), status(todo|doing|done), cat, created(ms)`
- 보안 규칙: `firestore.rules` (변경 시 사용자가 콘솔 → Firestore → 규칙에 붙여 넣고 게시해야 함)

## 파일 구조
- `index.html` — **배포되는 단일 파일** (빌드 결과물. 직접 고치지 말 것)
- `src/` — 원본 소스: `app.js`(모든 동작, 바닐라 JS 모듈), `style.css`, `index.html`(헤드 템플릿), `firebase-config.js`, 아이콘, manifest
- `tools/build_single.py` — `src/` → 루트 `index.html` 합치기. **src 수정 후 반드시 실행**: `python3 tools/build_single.py`
- `firestore.rules` — Firestore 보안 규칙
- `design/` — 초기 디자인 시안(Claude Design 캔버스 원본, 참고용)
- Firebase JS SDK 10.12.2 를 gstatic CDN에서 동적 import. 빌드 도구·npm 없음.
- `firebase-config.js` 의 apiKey 가 `YOUR_` 로 시작하면 **체험 모드**(localStorage, 로그인 없음) — 로컬 테스트용.

## 지금까지 반영된 사용자 요구사항 (바꾸지 말 것)
1. 다크 모드, 애플 느낌의 심플·컴팩트 디자인. 달력·보드·입력칸이 같은 패널 스타일로 조화롭게.
2. 브라우저 탭/홈 화면/로그인 화면 이름은 **HALGGO**, 앱 안 제목은 **할 일**.
3. 진행도 원형 그래프: "선택한 날" 보기 = 오늘·이번 달, **"전체" 보기에서만 올해** 추가.
4. 칸반 3칸: 할 일 / 수행 중 / 완료. 카드 오른쪽 가운데에 큰 ‹ › 화살표로 칸 이동.
5. 삭제: 카드를 **왼쪽으로 밀면** 빨간 삭제 버튼, 끝까지 밀면 즉시 삭제, 5초간 되돌리기. 수정 화면에도 삭제 버튼.
6. 카테고리 8종: 업무 · 공부 · 운동·건강 · 재테크 · 집안일 · 약속 · 쇼핑 · 개인(id `life`, 예전 "생활").
7. 캘린더 날짜 밑 카테고리 점 최대 3개(많은 순). 같은 카테고리 개수 1/2/3+ → 농도 연함/중간/진함.
8. 시간 입력: 입력칸의 ＋ 버튼 **왼쪽** 시계 버튼 → 아이폰 알람식 시·분 휠이 아래로 펼쳐짐.
   마우스 휠/끌기/숫자 탭/화살표키로 변경, **분이 넘어가면 시도 같이 변경**(09:59→10:00).
9. 휴대폰: 달력은 기본 한 주, **「한 달 보기」로 펼치기 / 「접기」**. 칸반은 탭 전환.
10. 할 일 제목을 누르면 그 자리에서 이름·날짜·시간·카테고리 수정.
11. 휴대폰 홈 화면 추가 지원, 오프라인 캐시(Firestore persistentLocalCache).

## 작업 방식 메모
- 사용자는 파일 업로드가 번거로우니, GitHub 권한이 있으면 직접 커밋·push 해서 Vercel 자동 배포까지 처리할 것.
- 변경 후: `src/` 수정 → `python3 tools/build_single.py` → 루트 `index.html` 포함 커밋 → push.
- 보안 규칙을 바꿔야 하는 변경(새 필드 제약 등)은 사용자에게 콘솔에 붙여 넣을 규칙 전문과 링크를 줄 것.
- 메신저/앱 내 브라우저에서는 로그인 저장소가 막혀 로딩이 멈출 수 있음 → 10초 후 안내가 뜨게 되어 있음. Safari/Chrome 권장.
