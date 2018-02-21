import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';
import { addTimer, pauseTimer, deleteTimer, animate } from '../actions/actions';
import Timer from './Timer';

let animation = null;

class TimerList extends React.Component {
  componentDidMount() {
    animation = requestAnimationFrame(this.animateList.bind(this));
  }

  componentWillUnmount() {
    if (animation) cancelAnimationFrame(animation);
  }

  animateList() {
    this.props.animateTimers(animation = requestAnimationFrame(this.animateList.bind(this)));
    this.forceUpdate.bind(this);
  }

  render() {
    const {
      Timers,
      onPauseClick,
      onDeleteClick,
    } = this.props;

    return (!Timers ? <ul /> :
    <ul>
      { Timers.map(timer => (
        <Timer
          key={timer.id}
          {...timer}
          onPauseClick={() => onPauseClick(timer.id)}
          onDeleteClick={() => onDeleteClick(timer)}
        />
      )) }
    </ul>);
  }
}

TimerList.propTypes = {
  Timers: PropTypes.arrayOf(PropTypes.shape),
  onDeleteClick: PropTypes.func.isRequired,
  onPauseClick: PropTypes.func.isRequired,
  animateTimers: PropTypes.func.isRequired,
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
  animateTimers: (frame) => { dispatch(animate(frame)); },
});

export default connect(mapStateToProps, mapDispatchToProps)(TimerList);
