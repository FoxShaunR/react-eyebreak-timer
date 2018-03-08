let count = 0;

function timerTick() {
  count += 1;
  postMessage(count);
  setTimeout(timerTick, 1000);
}

timerTick();
