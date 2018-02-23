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
import bellSound from './bell.wav';


const formatRemainingTime = duration => (
  Moment.duration(duration).format('HH:mm:ss', {
    trim: false,
  })
);

class Timer extends React.Component {
  onTimerFinish() {
    if (this.props.repeat) {
      // TODO: Implement timer reset
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

    if (remainingTime <= 0) {
      this.onTimerFinish();
    }

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
          <audio id="bell" autoPlay>
            {remainingTime <= 0 ?
              <source src={bellSound} type="audio/wav" />
              : null
            }
            <track kind="captions" src="./bell.srt" />
          </audio>
        </div>
      </li>
    );
  }
}

Timer.propTypes = {
  name: PropTypes.string,
  // duration: PropTypes.instanceOf(Moment.Duration).isRequired,
  // startTime: PropTypes.instanceOf(Moment).isRequired,
  // remainingTime: PropTypes.instanceOf(Moment.Duration),
  paused: PropTypes.bool,
  repeat: PropTypes.bool,
  onPauseClick: PropTypes.func.isRequired,
  onRepeatClick: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
};

Timer.defaultProps = {
  name: '',
  paused: false,
  repeat: false,
};

export default connect(null, null)(Timer);
