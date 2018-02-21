import Moment from 'moment';
// eslint-disable-next-line no-unused-vars
import MomentFormat from 'moment-duration-format';

import {
  ACTION_TIMER_ADD,
  ACTION_TIMER_PAUSE,
  ACTION_TIMER_REMOVE,
  ACTION_TIMER_ANIMATE,
} from '../actions/actions';

const getRemainingTime = (startTime, duration) => {
  const currentTime = Moment();
  const remainingSeconds = currentTime.clone().diff(startTime, 'seconds');

  return Moment.duration(remainingSeconds - duration, 'seconds');
};

const timers = (state = [], action) => {
  switch (action.type) {
    case ACTION_TIMER_ADD:
      return {
        ...state,
        Timers: !state.Timers ? [action.newTimer] : [...state.Timers, action.newTimer],
      };
    case ACTION_TIMER_PAUSE:
      return {
        ...state,
        Timers: state.Timers.map(timer =>
          ((timer.id === action.id) ? {
            ...timer,
            paused: !timer.paused,
            duration: (-1 * timer.remainingTime) / 1000,
            startTime: Moment(),
          } : timer)),
      };
    case ACTION_TIMER_REMOVE: {
      const index = state.Timers.indexOf(action.timer);
      if (index >= 0) {
        return {
          ...state,
          Timers: [
            ...state.Timers.slice(0, index),
            ...state.Timers.slice(index + 1),
          ],
        };
      }
      return state;
    }
    case ACTION_TIMER_ANIMATE: {
      return {
        ...state,
        animationFrame: action.animationFrame,
        Timers: !state.Timers ? null : state.Timers.map(timer =>
          ({
            ...timer,
            remainingTime: timer.paused ?
              timer.remainingTime : getRemainingTime(timer.startTime, timer.duration),
          })),
      };
    }
    default:
      return state;
  }
};

export default timers;
