const chestBtn = document.getElementById('chestBtn');
const leftEl = document.getElementById('left');
const chestImg = document.getElementById('chestImg');
const glowLayer = document.getElementById('glowLayer');
const modal = document.getElementById('cardModal');
const openPdfBtn = document.getElementById('openPdf');
const closeModalBtn = document.getElementById('closeModal');

let tapsLeft = 3;
let busy = false;

function updateLeft() {
  leftEl.textContent = `还剩 ${tapsLeft} 圈`;
}

function spinOnce() {
  chestBtn.classList.remove('spin');
  // force reflow to restart animation
  void chestBtn.offsetWidth;
  chestBtn.classList.add('spin');
}

async function openSequence() {
  chestImg.src = 'chest_open_glow.png';
  glowLayer.classList.add('glow-on');
  await new Promise(r => setTimeout(r, 700));
  // 打开贺卡弹层
  modal.setAttribute('aria-hidden', 'false');
}

chestBtn.addEventListener('click', async () => {
  if (busy) return;
  if (tapsLeft <= 0) return;
  busy = true;

  spinOnce();
  await new Promise(r => setTimeout(r, 620));
  tapsLeft -= 1;
  updateLeft();

  if (tapsLeft === 0) {
    leftEl.textContent = '解锁成功';
    await openSequence();
  }
  busy = false;
}, { passive: true });

openPdfBtn.addEventListener('click', () => {
  window.open('qixi_card.pdf', '_blank', 'noreferrer');
});

closeModalBtn.addEventListener('click', () => {
  modal.setAttribute('aria-hidden', 'true');
});

// PWA: 注册SW
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch(console.warn);
  });
}

// 初始
updateLeft();