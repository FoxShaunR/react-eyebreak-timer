export const ACTION_TIMER_ADD = 'ACTION_TIMER_ADD';
export const ACTION_TIMER_PAUSE = 'ACTION_TIMER_PAUSE';
export const ACTION_TIMER_REPEAT = 'ACTION_TIMER_REPEAT';
export const ACTION_TIMER_REMOVE = 'ACTION_TIMER_REMOVE';
export const ACTION_TIMER_SET_NOTIFIED = 'ACTION_TIMER_SET_NOTIFIED';
export const ACTION_TIMER_RESET = 'ACTION_TIMER_RESET';
export const ACTION_TIMER_ANIMATE = 'ACTION_TIMER_ANIMATE';

let nextTimerId = 0;
export const addTimer = (text, currentDuration, repeat) => {
  nextTimerId += 1;
  const currentDate = new Date();
  return {
    type: ACTION_TIMER_ADD,
    newTimer: {
      id: nextTimerId,
      name: text,
      originalDuration: currentDuration,
      currentDuration,
      startTime: currentDate,
      remainingTime: currentDuration,
      paused: false,
      repeat,
    },
  };
};

export const pauseTimer = (id) => ({
  type: ACTION_TIMER_PAUSE,
  id,
});

export const resetTimer = (id) => ({
  type: ACTION_TIMER_RESET,
  id,
});

export const repeatTimer = (id) => ({
  type: ACTION_TIMER_REPEAT,
  id,
});

export const deleteTimer = (timer) => ({
  type: ACTION_TIMER_REMOVE,
  timer,
});

export const setNotified = (id, wasNotified) => ({
  type: ACTION_TIMER_SET_NOTIFIED,
  id,
  wasNotified,
});

export const animate = (frame) => ({
  type: ACTION_TIMER_ANIMATE,
  animationFrame: frame,
});
