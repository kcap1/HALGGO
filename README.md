# HALGGO — 설정 가이드

> 개발 메모와 반영된 요구사항은 `CLAUDE.md`를 보세요. 코드 수정은 `src/`에서 하고 `python3 tools/build_single.py`로 루트 `index.html`을 다시 만들어요.

구글 로그인으로 누구나 자기 할 일 목록을 쓰고, 휴대폰과 PC에서 자동으로 동기화되는 웹앱이에요.
아래 순서대로 하면 20~30분 정도 걸려요. 모두 무료 요금제로 충분해요.

- **Firebase** (구글 서비스): 로그인과 데이터 저장
- **GitHub + Vercel**: 코드를 GitHub에 올리면 Vercel이 웹사이트 주소를 만들어 줘요

---

## 1. Firebase 프로젝트 만들기

1. https://console.firebase.google.com 에 구글 계정으로 들어가요.
2. **프로젝트 추가** → 이름 입력(예: `my-todo`) → Google 애널리틱스는 **사용 안 함** → **프로젝트 만들기**.

## 2. 웹 앱 등록하고 설정값 복사

1. 프로젝트 첫 화면에서 **`</>`(웹)** 아이콘을 눌러요.
2. 앱 닉네임 입력(예: `할 일`) → **앱 등록**. (Firebase 호스팅 체크는 하지 않아도 돼요.)
3. 화면에 나오는 `const firebaseConfig = { ... }` 안의 값을 복사해요.
4. 이 폴더의 `firebase-config.js`를 메모장으로 열고, `YOUR_...`로 된 값을 복사한 값으로 바꿔 저장해요.
   - 어려우면 복사한 내용을 Claude에게 붙여 넣어 주세요. 대신 넣어 드려요. (이 값은 원래 공개되는 값이라 비밀이 아니에요.)

## 3. 구글 로그인 켜기

1. 왼쪽 메뉴 **빌드 → Authentication** → **시작하기**.
2. **로그인 방법** 탭 → **Google** → **사용 설정** → 지원 이메일 선택 → **저장**.

## 4. 데이터베이스 만들기

1. 왼쪽 메뉴 **빌드 → Firestore Database** → **데이터베이스 만들기**.
2. 위치는 **asia-northeast3 (서울)** 을 고르고, **프로덕션 모드**로 시작해요.
3. 만들어지면 **규칙** 탭을 열고, 내용을 전부 지운 뒤 이 폴더의 `firestore.rules` 내용을 붙여 넣고 **게시**를 눌러요.
   - 이 규칙 덕분에 각 사람은 자기 할 일만 볼 수 있어요.

## 5. GitHub에 올리기

1. https://github.com/new 에서 새 저장소를 만들어요. (예: `todo-app`, Public이나 Private 모두 괜찮아요)
2. 이 폴더 안의 파일들을 올려요. 둘 중 편한 방법으로 하세요.
   - **웹에서:** 저장소 화면의 **uploading an existing file** → 폴더 안 파일을 전부 끌어다 놓기 → **Commit changes**
   - **git으로:** 이 폴더에서 아래 명령을 실행
     ```bash
     git init
     git add .
     git commit -m "할 일 앱"
     git branch -M main
     git remote add origin https://github.com/내아이디/todo-app.git
     git push -u origin main
     ```
   - `index.html`이 저장소 맨 위(루트)에 있어야 해요. `checklist-app` 폴더째 올라가면 안 돼요.

> `firebase-config.js`가 GitHub에 올라가도 괜찮아요. 웹앱에 원래 공개되는 값이고, 데이터는 4번의 규칙과 6번의 승인된 도메인으로 보호돼요.

## 6. Vercel로 배포하고 주소를 Firebase에 등록

1. https://vercel.com/new 에서 GitHub 계정으로 로그인 → 방금 만든 저장소 옆 **Import**.
2. **Framework Preset**은 **Other** 그대로, 빌드 설정은 건드리지 말고 **Deploy**.
3. 끝나면 `https://todo-app-xxxx.vercel.app` 같은 주소가 생겨요. (프로젝트 **Settings → Domains**에서 주소를 바꿀 수 있어요.)
4. Firebase **Authentication → 설정 → 승인된 도메인** → **도메인 추가** → `https://`를 뺀 주소(예: `todo-app-xxxx.vercel.app`)를 넣고 **추가**.
   - 이걸 빠뜨리면 로그인할 때 "이 주소가 Firebase에 등록되지 않았어요"라는 안내가 나와요.
   - Settings → Domains에서 주소를 바꿨다면 바꾼 주소도 추가해 주세요.

## 7. 사용하고 공유하기

- 주소를 열고 **Google로 시작하기** → 바로 사용할 수 있어요.
- 다른 사람에게는 주소만 보내 주면 돼요. 각자 자기 구글 계정으로 로그인하고, 서로의 목록은 보이지 않아요.
- **휴대폰 홈 화면에 앱처럼 추가하기**
  - 아이폰(Safari): 공유 버튼 → **홈 화면에 추가**
  - 안드로이드(Chrome): 메뉴 ⋮ → **홈 화면에 추가** (또는 **앱 설치**)

---

## 나중에 고치고 싶을 때

파일을 고쳐서 GitHub에 다시 올리면(commit/push) Vercel이 자동으로 다시 배포해요. 주소는 그대로이고 저장된 할 일도 남아요.

## 파일 설명

| 파일 | 내용 |
|---|---|
| `index.html` | 앱 화면의 뼈대 |
| `style.css` | 디자인 (다크 모드, 휴대폰 화면 대응) |
| `app.js` | 동작 (캘린더, 칸반, 추가·수정·삭제, 진행도, 로그인, 동기화) |
| `firebase-config.js` | Firebase 설정값 (2번에서 넣는 곳) |
| `firestore.rules` | 데이터 보호 규칙 (4번에서 붙여 넣는 내용) |
| `manifest.webmanifest`, `icon*` | 홈 화면 추가용 앱 이름과 아이콘 |

## 참고

- 설정값을 넣기 전에는 **체험 모드**로 열려요. 이때는 그 브라우저에만 저장되고 로그인은 없어요.
- 무료 요금제(Spark)는 하루 읽기 5만 번, 쓰기 2만 번까지라 개인이나 지인들이 쓰기에는 충분해요.
- 인터넷이 끊겨도 마지막으로 본 목록은 보이고, 연결되면 자동으로 동기화돼요.
