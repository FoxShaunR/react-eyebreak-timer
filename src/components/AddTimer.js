import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addTimer } from '../actions/actions';

class AddTimer extends React.Component {
  render() {
    let nameInput;
    let durationInput;
    return (
      <div className="AddTimer">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!nameInput.value.trim() || !durationInput.value.trim()) {
              return null;
            }

            this.props.addTimerToState(nameInput.value, Number(durationInput.value) * 60);
            nameInput.value = '';
            durationInput.value = '';
            return true;
            }
        }
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
          <button type="submit">
            Add Timer
          </button>
        </form>
      </div>
    );
  }
}

AddTimer.propTypes = {
  addTimerToState: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  addTimerToState: (text, currentDuration) => dispatch(addTimer(text, currentDuration)),
});

export default connect(
  null,
  mapDispatchToProps,
)(AddTimer);
