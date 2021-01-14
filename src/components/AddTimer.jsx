import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addTimer } from '../actions/actions';

let shouldRepeat = false;

class AddTimer extends React.Component {
  render() {
    const {
      addTimerToState,
    } = this.props;
    let nameInput;
    let durationInput;
    return (
      <div className="AddTimer">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const dur = Number(durationInput.value) * 60;
            if (!nameInput.value.trim() || !durationInput.value.trim()) {
              return null;
            }

            addTimerToState(nameInput.value, dur, shouldRepeat);
            nameInput.value = '';
            durationInput.value = '';
            shouldRepeat = false;
            return true;
          }}
        >
          <input
            ref={(node) => {
              nameInput = node;
            }}
            className="AddTimerInput"
            placeholder="Name"
            maxLength={30}
          />
          <input
            ref={(node) => {
              durationInput = node;
            }}
            type="number"
            className="AddTimerInput"
            placeholder="Minutes"
            max={9999}
            min={1}
          />
          <button className="AddTimerButton" type="submit">
            Add Timer
          </button>
          <button
            className="AddTimerButton"
            type="submit"
            onClick={() => {
              shouldRepeat = true;
              nameInput.value = 'Rest \'em now';
              durationInput.value = 35;
            }}
          >
            Give &#39;Em a Break
          </button>
        </form>
      </div>
    );
  }
}

AddTimer.propTypes = {
  addTimerToState: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  addTimerToState: (text, duration, repeat) => dispatch(addTimer(text, duration, repeat)),
});

export default connect(
  null,
  mapDispatchToProps,
)(AddTimer);
