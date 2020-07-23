import React from 'react';
import { connect } from 'react-redux';
import { setCurrentWorkPeriod } from '../../redux/monthPicker/actions';
import {
  setCurrentCostsData,
  setAccountId
} from '../../redux/home/actions';
import MonthPicker from './MonthPicker';

class MonthPickerContainer extends React.Component {
  render() {
    return (
      <MonthPicker
        accountId={this.props.accountId}
        accountIds={this.props.accountIds}
        workPeriods={this.props.workPeriods}
        currentWorkPeriod={this.props.currentWorkPeriod}
        allApartmentData={this.props.allApartmentData}
        currentApartmentData={this.props.currentApartmentData}
        allCostsData={this.props.allCostsData}
        setCurrentWorkPeriod={this.props.setCurrentWorkPeriod}
        setCurrentCostsData={this.props.setCurrentCostsData}
        setAccountId={this.props.setAccountId}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.login.token,
    accountId: state.home.accountId,
    accountIds: state.home.accountIds,
    workPeriods: state.home.workPeriods,
    currentWorkPeriod: state.header.currentWorkPeriod,
    allApartmentData: state.home.allApartmentData,
    currentApartmentData: state.home.currentApartmentData,
    allCostsData: state.home.allCostsData,
  };
};

const mapDispatchToProps = {
  setCurrentWorkPeriod,
  setCurrentCostsData,
  setAccountId
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MonthPickerContainer);
