// Runs before the app (plain script, old-browser safe).
// 1) Messenger in-app browsers (KakaoTalk, LINE, Instagram, Facebook, NAVER, Band…) block Google sign-in →
//    jump to the phone's real browser when the app allows it, otherwise show how to open it there.
// 2) If the app never starts (very old browser, script error), show a message instead of a blank page.
(function () {
  var ua = navigator.userAgent || '', url = location.href, app = document.getElementById('app');
  var lang = ((navigator.languages && navigator.languages[0]) || navigator.language || 'en').slice(0, 2);
  var T = {
    ko: ['이 앱은 메신저 안의 브라우저에서는 로그인이 막혀 있어요.', 'Safari나 Chrome에서 열어 주세요.', '링크 복사', '복사했어요. Safari·Chrome 주소창에 붙여 넣으세요.', '오른쪽 위(또는 아래) ⋯ 메뉴 → 「다른 브라우저로 열기」/「Safari로 열기」를 눌러도 돼요.', '이 브라우저에서는 앱을 열 수 없어요.', '휴대폰을 최신 버전으로 업데이트하거나 최신 Safari·Chrome에서 열어 주세요.', '다시 시도'],
    en: ['Sign-in is blocked inside messenger in-app browsers.', 'Please open this link in Safari or Chrome.', 'Copy link', 'Copied. Paste it into Safari or Chrome.', 'You can also use the ⋯ menu → "Open in browser".', "This browser can't run the app.", 'Update your phone or open it in the latest Safari or Chrome.', 'Try again'],
    ja: ['メッセンジャー内のブラウザではログインできません。', 'SafariかChromeで開いてください。', 'リンクをコピー', 'コピーしました。Safari・Chromeに貼り付けてください。', '⋯ メニュー →「ブラウザで開く」でも開けます。', 'このブラウザではアプリを開けません。', '端末を最新にするか、最新のSafari・Chromeで開いてください。', '再試行'],
    zh: ['在聊天软件内置浏览器中无法登录。', '请用 Safari 或 Chrome 打开。', '复制链接', '已复制，请粘贴到 Safari 或 Chrome。', '也可以点 ⋯ 菜单 →“在浏览器中打开”。', '此浏览器无法运行该应用。', '请更新手机系统，或用最新的 Safari、Chrome 打开。', '重试']
  }[lang] || null;
  if (!T) T = ['Sign-in is blocked inside messenger in-app browsers.', 'Please open this link in Safari or Chrome.', 'Copy link', 'Copied. Paste it into Safari or Chrome.', 'You can also use the ⋯ menu → "Open in browser".', "This browser can't run the app.", 'Update your phone or open it in the latest Safari or Chrome.', 'Try again'];

  function card(html) {
    app.innerHTML = '<main class="login"><div class="login-card"><h1>HALGGO</h1>' + html + '</div></main>';
  }
  var inApp = /KAKAOTALK|Line\/|Instagram|FBAN|FBAV|FB_IAB|NAVER\(inapp|DaumApps|BAND\/|everytimeApp|; wv\)/i.test(ua);
  if (inApp) {
    window.__halggoInApp = true;
    if (/KAKAOTALK/i.test(ua)) { location.href = 'kakaotalk://web/openExternal?url=' + encodeURIComponent(url); }
    else if (/Line\//i.test(ua) && url.indexOf('openExternalBrowser=1') < 0) { location.href = url + (url.indexOf('?') < 0 ? '?' : '&') + 'openExternalBrowser=1'; }
    setTimeout(function () {
      card('<p>' + T[0] + '<br>' + T[1] + '</p><button class="google" id="hg-copy">' + T[2] + '</button><p class="hg-hint">' + T[4] + '</p>');
      var b = document.getElementById('hg-copy');
      if (b) b.onclick = function () {
        var done = function () { b.textContent = T[3]; };
        if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(url).then(done, function () { prompt('', url); });
        else prompt('', url);
      };
    }, 600);
    return;
  }
  setTimeout(function () {
    if (window.__halggoReady) return;
    card('<p>' + T[5] + '<br>' + T[6] + '</p><button class="google" onclick="location.reload()">' + T[7] + '</button>');
  }, 12000);
})();
