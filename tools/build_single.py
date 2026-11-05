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

ico = base64.b64encode((SRC / "icon-180.png").read_bytes()).decode()
svg = base64.b64encode((SRC / "icon.svg").read_bytes()).decode()
head = (SRC / "index.html").read_text(encoding="utf-8").split('<link rel="manifest"')[0]

html = head + f'''<link rel="icon" href="data:image/svg+xml;base64,{svg}" type="image/svg+xml">
<link rel="apple-touch-icon" href="data:image/png;base64,{ico}">
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
