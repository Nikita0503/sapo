import React from 'react';
import { connect } from 'react-redux';
import AccrualHistoryScreen from './AccrualHistoryScreen';

class AccrualHistoryContainer extends React.Component {
  render() {
    return (
      <AccrualHistoryScreen
        navigation={this.props.navigation}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
  };
};

const mapDispatchToProps = {
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccrualHistoryContainer);
