let count = 0;

function timerTick() {
  count += 1;
  postMessage(count, 'https://foxshaunr.github.io');
  setTimeout(timerTick, 1000);
}

timerTick();
