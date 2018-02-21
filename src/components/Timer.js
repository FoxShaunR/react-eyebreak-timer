import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'moment';
// eslint-disable-next-line no-unused-vars
import MomentFormat from 'moment-duration-format';


const formatRemainingTime = duration => (
  Moment.duration(duration).format('hh:mm:ss')
);

const Timer = ({
  name,
  paused,
  remainingTime,
  onPauseClick,
  onDeleteClick,
}) =>
  (
    <li>
      {`${name}  ${formatRemainingTime(remainingTime)}` }
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

Timer.propTypes = {
  name: PropTypes.string,
  // duration: PropTypes.instanceOf(Moment.Duration).isRequired,
  // startTime: PropTypes.instanceOf(Moment).isRequired,
  // remainingTime: PropTypes.instanceOf(Moment.Duration),
  paused: PropTypes.bool,
  onPauseClick: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
};

Timer.defaultProps = {
  name: '',
  paused: false,
};

export default connect(null, null)(Timer);
