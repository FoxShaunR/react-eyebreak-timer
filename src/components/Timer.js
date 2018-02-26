import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'moment';
// eslint-disable-next-line no-unused-vars
import MomentFormat from 'moment-duration-format';
import playButtonImage from './play-button.png';
import pauseButtonImage from './pause-button.png';
import deleteButtonImage from './delete-button.png';
import repeatButtonImage from './repeat-button.png';
import repeatButtonOffImage from './repeat-off-button.png';
import { resetTimer } from '../actions/actions';


const formatRemainingTime = currentDuration => (
  Moment.duration(currentDuration, 'seconds').format('HH:mm:ss', {
    trim: false,
  })
);

class Timer extends React.Component {
  componentDidUpdate() {
    if (this.props.remainingTime <= 0 && !this.props.paused) {
      document.getElementById('bell').play();
      if (this.props.repeat) {
        this.props.resetTimer(this.props.id);
      }
    }
  }
  render() {
    const {
      name,
      paused,
      repeat,
      remainingTime,
      onPauseClick,
      onDeleteClick,
      onRepeatClick,
    } = this.props;

    return (
      <li className="Timer">
        <h3 className="TimerName">{name}</h3>
        <h3 className="TimerRemaining">{formatRemainingTime(remainingTime)}</h3>
        <div className="TimerButtons">
          <input
            type="image"
            onClick={onPauseClick}
            className="TimerButton"
            src={paused ? playButtonImage : pauseButtonImage}
            alt="Pause"
          />
          <input
            type="image"
            onClick={onRepeatClick}
            className="TimerButton"
            src={repeat ? repeatButtonImage : repeatButtonOffImage}
            alt="Repeat"
          />
          <input
            type="image"
            onClick={onDeleteClick}
            className="TimerButton"
            src={deleteButtonImage}
            alt="Remove"
          />
        </div>
      </li>
    );
  }
}

Timer.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string,
  // originalDuration: PropTypes.number.isRequired,
  // currentDuration: PropTypes.number.isRequired,
  // startTime: PropTypes.instanceOf(date).isRequired,
  remainingTime: PropTypes.number.isRequired,
  paused: PropTypes.bool,
  repeat: PropTypes.bool,
  onPauseClick: PropTypes.func.isRequired,
  onRepeatClick: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  resetTimer: PropTypes.func.isRequired,
};

Timer.defaultProps = {
  name: '',
  paused: false,
  repeat: false,
};

const mapDispatchToProps = dispatch => ({
  resetTimer: (id) => { dispatch(resetTimer(id)); },
});

export default connect(null, mapDispatchToProps)(Timer);
