import React from 'react';
import { connect } from 'react-redux';
import {
  fetchAccrualHistory,
  setCurrentAccrualsData,
  setSelectedAccrualsData
} from '../../../../redux/home/accrualHistory/actions';
import AccrualHistoryScreen from './AccrualHistoryScreen';

class AccrualHistoryContainer extends React.Component {
  render() {
    return (
      <AccrualHistoryScreen
        navigation={this.props.navigation}
        token={this.props.token}
        osbbId={this.props.osbbId}
        accountId={this.props.accountId}
        currentWorkPeriod={this.props.currentWorkPeriod}
        accrualHistoryCurrentData={this.props.accrualHistoryCurrentData}
        accrualHistoryCurrentSelectedData={this.props.accrualHistoryCurrentSelectedData}
        fetchAccrualHistory={this.props.fetchAccrualHistory}
        setCurrentAccrualsData={this.props.setCurrentAccrualsData}
        setSelectedAccrualsData={this.props.setSelectedAccrualsData}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.login.token,
    osbbId: state.home.osbbId,
    accountId: state.home.accountId,
    currentWorkPeriod: state.header.currentWorkPeriod,
    isSelected: state.accrualHistory.isSelected,
    accrualHistoryCurrentData: state.accrualHistory.accrualHistoryCurrentData,
    accrualHistoryCurrentSelectedData: state.accrualHistory.accrualHistoryCurrentSelectedData
  };
};

const mapDispatchToProps = {
  fetchAccrualHistory,
  setCurrentAccrualsData,
  setSelectedAccrualsData
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccrualHistoryContainer);
