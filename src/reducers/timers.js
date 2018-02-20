import {
  ACTION_TIMER_ADD,
  ACTION_TIMER_PAUSE,
  ACTION_TIMER_REMOVE,
} from '../actions/actions';

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
          ((timer.id === action.id) ? { ...timer, paused: !timer.paused } : timer)),
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
    default:
      return state;
  }
};

export default timers;
