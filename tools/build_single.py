"""src/ 의 파일들을 합쳐 저장소 루트의 index.html(배포용 단일 파일)을 만든다.

사용법 (저장소 루트에서):  python3 tools/build_single.py
Vercel은 루트의 index.html 하나만 서비스한다. src/ 를 고친 뒤 반드시 다시 빌드할 것.
"""
import base64
import pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent
SRC = ROOT / "src"

css = (SRC / "style.css").read_text(encoding="utf-8")
js = (SRC / "app.js").read_text(encoding="utf-8")
cfg = (SRC / "firebase-config.js").read_text(encoding="utf-8").replace(
    "export const firebaseConfig", "const firebaseConfig")
js = js.replace("import { firebaseConfig } from './firebase-config.js';", cfg)
assert "import {" not in js, "app.js 에 처리하지 못한 import 가 남아 있어요"

_ico = base64.b64encode((SRC / "icon-180.png").read_bytes()).decode()
svg = base64.b64encode((SRC / "icon.svg").read_bytes()).decode()
head = (SRC / "index.html").read_text(encoding="utf-8").split('<link rel="manifest"')[0]

# 아이콘·링크 미리보기 이미지는 루트에 파일로도 둔다 (Vercel이 그대로 서비스, 메신저 미리보기·홈 화면 아이콘용).
SITE = "https://halggo-6e9d.vercel.app"
for name in ["icon.svg", "icon-180.png", "icon-512.png", "og.png", "manifest.webmanifest"]:
    (ROOT / name).write_bytes((SRC / name).read_bytes())
(ROOT / "apple-touch-icon.png").write_bytes((SRC / "icon-180.png").read_bytes())

html = head + f'''<meta property="og:type" content="website">
<meta property="og:site_name" content="HALGGO">
<meta property="og:title" content="HALGGO">
<meta property="og:description" content="한손으로 처리하는 세상 모든 일">
<meta property="og:url" content="{SITE}/">
<meta property="og:image" content="{SITE}/og.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="HALGGO">
<meta name="twitter:description" content="한손으로 처리하는 세상 모든 일">
<meta name="twitter:image" content="{SITE}/og.png">
<link rel="manifest" href="/manifest.webmanifest">
<link rel="icon" href="data:image/svg+xml;base64,{svg}" type="image/svg+xml">
<link rel="icon" href="/icon-512.png" type="image/png" sizes="512x512">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;600;700&display=swap">
<style>
{css}
</style>
</head>
<body>
<div id="app"><p class="boot">…</p></div>
<script type="module">
{js}
</script>
</body>
</html>
'''
(ROOT / "index.html").write_text(html, encoding="utf-8")
print("index.html 생성:", len(html), "chars")
