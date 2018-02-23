import Moment from 'moment';

export const ACTION_TIMER_ADD = 'ACTION_TIMER_ADD';
export const ACTION_TIMER_PAUSE = 'ACTION_TIMER_PAUSE';
export const ACTION_TIMER_REPEAT = 'ACTION_TIMER_REPEAT';
export const ACTION_TIMER_REMOVE = 'ACTION_TIMER_REMOVE';
export const ACTION_TIMER_RESET = 'ACTION_TIMER_RESET';
export const ACTION_TIMER_ANIMATE = 'ACTION_TIMER_ANIMATE';

let nextTimerId = 0;
export const addTimer = (text, currentDuration) => {
  nextTimerId += 1;
  const currentDate = Moment();
  return {
    type: ACTION_TIMER_ADD,
    newTimer: {
      id: nextTimerId,
      name: text,
      originalDuration: Moment.duration(currentDuration),
      currentDuration: Moment.duration(currentDuration),
      startTime: currentDate,
      remainingTime: Moment.duration(currentDuration),
      paused: false,
      repeat: false,
    },
  };
};

export const pauseTimer = id => ({
  type: ACTION_TIMER_PAUSE,
  id,
});

export const resetTimer = id => ({
  type: ACTION_TIMER_RESET,
  id,
});

export const repeatTimer = id => ({
  type: ACTION_TIMER_REPEAT,
  id,
});

export const deleteTimer = timer => ({
  type: ACTION_TIMER_REMOVE,
  timer,
});

export const animate = frame => ({
  type: ACTION_TIMER_ANIMATE,
  animationFrame: frame,
});
