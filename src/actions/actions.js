import Moment from 'moment';

export const ACTION_TIMER_ADD = 'ACTION_TIMER_ADD';
export const ACTION_TIMER_PAUSE = 'ACTION_TIMER_PAUSE';
export const ACTION_TIMER_REMOVE = 'ACTION_TIMER_REMOVE';

let nextTimerId = 0;
export const addTimer = (text, duration) => {
  nextTimerId += 1;
  const currentDate = Moment();
  return {
    type: ACTION_TIMER_ADD,
    newTimer: {
      id: nextTimerId,
      name: text,
      duration,
      startTime: currentDate,
      paused: false,
    },
  };
};

export const pauseTimer = id => ({
  type: ACTION_TIMER_PAUSE,
  id,
});

export const deleteTimer = timer => ({
  type: ACTION_TIMER_REMOVE,
  timer,
});
