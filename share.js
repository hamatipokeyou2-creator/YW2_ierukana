'use strict';

function resultShareUrl(pageUrl) {
  const url = new URL(pageUrl);
  if (!['https:', 'http:'].includes(url.protocol)) return '';
  url.search = '';
  url.hash = '';
  if (url.pathname.endsWith('/index.html')) {
    url.pathname = url.pathname.slice(0, -'index.html'.length);
  }
  return url.href;
}

function resultTweetText({ count, total, modeLabel, elapsedMs, pageUrl }) {
  const seconds = Math.floor(Math.max(0, elapsedMs) / 1000);
  const time = [Math.floor(seconds / 3600), Math.floor(seconds / 60) % 60, seconds % 60]
    .map(n => String(n).padStart(2, '0')).join(':');
  const score = count === total
    ? `${count}/${total}体、全妖怪コンプリート！`
    : `${count}/${total}体の妖怪を思い出せた！`;
  return [
    '「妖怪ウォッチ2 全妖怪言えるかな？」に挑戦！',
    score,
    `難易度：${modeLabel}｜タイム：${time}`,
    '#妖怪ウォッチ2 #全妖怪言えるかな',
    resultShareUrl(pageUrl)
  ].filter(Boolean).join('\n');
}

function resultTweetIntent(result) {
  const url = new URL('https://x.com/intent/tweet');
  url.searchParams.set('text', resultTweetText(result));
  return url.href;
}
