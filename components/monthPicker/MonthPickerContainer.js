import React from 'react';
import { connect } from 'react-redux';
import MonthPicker from './MonthPicker';

class MonthPickerContainer extends React.Component {
  render() {
    return (
      <MonthPicker
        
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    
  };
};

const mapDispatchToProps = {
  
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MonthPickerContainer);
