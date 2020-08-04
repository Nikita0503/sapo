import React from 'react';
import { connect } from 'react-redux';
import LoadingScreen from './LoadingScreen';
import {
  setIsActivated
} from '../../../redux/home/actions';

class LoadingContainer extends React.Component {
  render() {
    return (
      <LoadingScreen
        navigation={this.props.navigation}
        token={this.props.token}
        workPeriods={this.props.workPeriods}
        allApartmentData={this.props.allApartmentData}
        currentWorkPeriod={this.props.currentWorkPeriod}
        isActivated={this.props.isActivated}
        setIsActivated={this.props.setIsActivated}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.login.token,
    workPeriods: state.home.workPeriods,
    allApartmentData: state.home.allApartmentData,
    currentWorkPeriod: state.header.currentWorkPeriod,
    isActivated: state.home.isActivated
  };
};

const mapDispatchToProps = {
  setIsActivated: setIsActivated
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoadingContainer);
