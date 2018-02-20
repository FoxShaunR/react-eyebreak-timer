import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'moment';
// eslint-disable-next-line no-unused-vars
import MomentFormat from 'moment-duration-format';


class Timer extends React.Component {
  getRemainingTime() {
    const currentTime = Moment();
    const remainingSeconds = currentTime.clone().diff(this.props.startTime, 'seconds');

    return Moment.duration(remainingSeconds - this.props.duration, 'seconds').format('hh:mm:ss');
  }

  render() {
    const {
      name,
      paused,
      onPauseClick,
      onDeleteClick,
    } = this.props;

    return (
      <li>
        {`${name} - ${this.getRemainingTime()}` }
        <button
          onClick={onPauseClick}
          style={paused ? { fontWeight: 'bold' } : { fontWeight: 'normal' }}
        >
        [||]
        </button>
        <button onClick={onDeleteClick}>
          [-]
        </button>
      </li>
    );
  }
}

Timer.propTypes = {
  name: PropTypes.string,
  duration: PropTypes.number.isRequired,
  startTime: PropTypes.instanceOf(Moment).isRequired,
  paused: PropTypes.bool,
  onPauseClick: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
};

Timer.defaultProps = {
  name: '',
  paused: false,
};

export default connect(null, null)(Timer);
