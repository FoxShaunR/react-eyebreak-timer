import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';
import { addTimer, pauseTimer, deleteTimer, repeatTimer, animate } from '../actions/actions';
import Timer from './Timer';
import bellSound from './bell.wav';
import bellCaptions from './bell.srt';

let animation = null;

class TimerList extends React.Component {
  componentDidMount() {
    // Request notification permission
    if (('Notification' in window) && Notification.permission !== 'denied') {
      Notification.requestPermission();
    }
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
      onRepeatClick,
      onDeleteClick,
    } = this.props;

    return (!Timers ? <ul /> :
    <div>
      <ul>
        { Timers.map(timer => (
          <Timer
            key={timer.id}
            {...timer}
            onPauseClick={() => onPauseClick(timer.id)}
            onDeleteClick={() => onDeleteClick(timer)}
            onRepeatClick={() => onRepeatClick(timer.id)}
          />
        )) }
      </ul>
      <audio id="bell">
        <source src={bellSound} type="audio/wav" />
        <track src={bellCaptions} kind="captions" />
      </audio>
    </div>);
  }
}

TimerList.propTypes = {
  Timers: PropTypes.arrayOf(PropTypes.shape),
  onDeleteClick: PropTypes.func.isRequired,
  onPauseClick: PropTypes.func.isRequired,
  onRepeatClick: PropTypes.func.isRequired,
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
  onRepeatClick: (timer) => { dispatch(repeatTimer(timer)); },
  addTimer: (timer) => { dispatch(addTimer(timer)); },
  animateTimers: (frame) => { dispatch(animate(frame)); },
});

export default connect(mapStateToProps, mapDispatchToProps)(TimerList);
