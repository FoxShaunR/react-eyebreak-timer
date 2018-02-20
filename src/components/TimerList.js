import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';
import { addTimer, pauseTimer, deleteTimer } from '../actions/actions';
import Timer from './Timer';

const TimerList = ({ Timers, onDeleteClick, onPauseClick }) => (
  !Timers ? <ul /> :
  <ul>
    { Timers.map(timer => (
      <Timer
        key={timer.id}
        {...timer}
        onPauseClick={() => onPauseClick(timer.id)}
        onDeleteClick={() => onDeleteClick(timer)}
      />
    )) }
  </ul>
);

TimerList.propTypes = {
  Timers: PropTypes.arrayOf(PropTypes.shape),
  onDeleteClick: PropTypes.func.isRequired,
  onPauseClick: PropTypes.func.isRequired,
};

TimerList.defaultProps = {
  Timers: null,
};

const mapStateToProps = (state) => {
  const { Timers } = state;
  return {
    Timers,
  };
};

const mapDispatchToProps = dispatch => ({
  onPauseClick: (id) => { dispatch(pauseTimer(id)); },
  onDeleteClick: (timer) => { dispatch(deleteTimer(timer)); },
  addTimer: (timer) => { dispatch(addTimer(timer)); },
});

export default connect(mapStateToProps, mapDispatchToProps)(TimerList);
