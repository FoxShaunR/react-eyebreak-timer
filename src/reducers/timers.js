import Moment from 'moment';
import {
  ACTION_TIMER_ADD,
  ACTION_TIMER_PAUSE,
  ACTION_TIMER_REMOVE,
  ACTION_TIMER_ANIMATE,
  ACTION_TIMER_REPEAT,
  ACTION_TIMER_RESET,
  ACTION_TIMER_SET_NOTIFIED,
} from '../actions/actions';

const getRemainingTime = (startTime, currentDuration) => {
  const currentTime = Moment();
  const remainingSeconds = currentTime.clone().diff(startTime, 'seconds');

  return Moment.duration(currentDuration - remainingSeconds, 'seconds').asSeconds() >= 0
    ? Moment.duration(currentDuration - remainingSeconds, 'seconds').asSeconds() : 0;
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
        Timers: state.Timers.map((timer) => ((timer.id === action.id) ? {
          ...timer,
          paused: !timer.paused,
          currentDuration: timer.remainingTime,
          startTime: new Date(),
        } : timer)),
      };
    case ACTION_TIMER_RESET:
      return {
        ...state,
        Timers: state.Timers.map((timer) => ((timer.id === action.id) ? {
          ...timer,
          paused: false,
          currentDuration: timer.originalDuration,
          remainingTime: getRemainingTime(new Date(), timer.originalDuration),
          startTime: new Date(),
          wasNotified: false,
        } : timer)),
      };
    case ACTION_TIMER_REPEAT:
      return {
        ...state,
        Timers: state.Timers.map((timer) => ((timer.id === action.id) ? {
          ...timer,
          repeat: !timer.repeat,
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
    case ACTION_TIMER_SET_NOTIFIED: {
      return {
        ...state,
        Timers: state.Timers.map((timer) => ((timer.id === action.id) ? {
          ...timer,
          wasNotified: action.wasNotified,
        } : timer)),
      };
    }
    case ACTION_TIMER_ANIMATE: {
      return {
        ...state,
        animationFrame: action.animationFrame,
        Timers: !state.Timers ? null : state.Timers.map((timer) => ({
          ...timer,
          remainingTime: timer.paused
            ? timer.remainingTime : getRemainingTime(timer.startTime, timer.currentDuration),
        })),
      };
    }
    default:
      return state;
  }
};

export default timers;
