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
import { resetTimer as resetTimeAction, setNotified as setNotifiedAction } from '../actions/actions';
import notificationIcon from './notification-icon.png';

const formatRemainingTime = (currentDuration) => (
  Moment.duration(currentDuration, 'seconds').format('HH:mm:ss', {
    trim: false,
  })
);

class Timer extends React.Component {
  componentDidUpdate() {
    const {
      remainingTime,
      paused,
      wasNotified,
      name,
      id,
      repeat,
      resetTimer,
      setNotified,
    } = this.props;
    if (remainingTime <= 0 && !paused) {
      document.getElementById('bell').play();
      if (!wasNotified) {
        // Display a desktop notification
        if (Notification) {
          // eslint-disable-next-line no-unused-vars
          const thisNotification = new Notification(name, { icon: notificationIcon, body: 'Time expired.' });
        }
        // Update notification sent
        setNotified(id, true);
      }
      if (repeat) {
        resetTimer(id);
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

    let cleanName = name;

    if (cleanName.length > 18) {
      cleanName = `${cleanName.slice(0, 16)}...`;
    }

    return (
      <li className="Timer">
        <h3 className="TimerName">{cleanName}</h3>
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
  setNotified: PropTypes.func.isRequired,
  resetTimer: PropTypes.func.isRequired,
  wasNotified: PropTypes.bool,
};

Timer.defaultProps = {
  name: '',
  paused: false,
  repeat: false,
  wasNotified: false,
};

const mapDispatchToProps = (dispatch) => ({
  resetTimer: (id) => { dispatch(resetTimeAction(id)); },
  setNotified: (id, wasNotified) => { dispatch(setNotifiedAction(id, wasNotified)); },
});

export default connect(null, mapDispatchToProps)(Timer);
