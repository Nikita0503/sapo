import React from 'react';
import { connect } from 'react-redux';
import {setLiqpayData, 
        setChargesData, 
        setSelectedCharge,
        setSelectedChargeValue, 
        setSelectedChargeContribution
        } from '../../../../redux/home/liqpay/actions';
import PaymentSelectionScreen from './PaymentSelectionScreen';

class PaymentSelectionContainer extends React.Component {
  render() {
    return (
      <PaymentSelectionScreen
        navigation={this.props.navigation}
        token={this.props.token}
        osbbId={this.props.osbbId}
        accountId={this.props.accountId}
        workPeriods={this.props.workPeriods} 
        liqpayData={this.props.liqpayData}
        chargesData={this.props.chargesData}
        selectedCharge={this.props.selectedCharge}
        selectedChargeValue={this.props.selectedChargeValue}
        selectedChargeContribution={this.props.selectedChargeContribution}
        setLiqpayData={this.props.setLiqpayData}
        setChargesData={this.props.setChargesData}
        setSelectedCharge={this.props.setSelectedCharge}
        setSelectedChargeValue={this.props.setSelectedChargeValue}
        setSelectedChargeContribution={this.props.setSelectedChargeContribution}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.login.token,
    osbbId: state.home.osbbId,
    accountId: state.home.accountId,
    workPeriods: state.home.workPeriods,
    liqpayData: state.paymentSelection.liqpayData,
    chargesData: state.paymentSelection.chargesData,
    selectedCharge: state.paymentSelection.selectedCharge,
    selectedChargeValue: state.paymentSelection.selectedChargeValue,
    selectedChargeContribution: state.paymentSelection.selectedChargeContribution
  };
};

const mapDispatchToProps = {
  setLiqpayData,
  setChargesData,
  setSelectedCharge,
  setSelectedChargeValue,
  setSelectedChargeContribution
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PaymentSelectionContainer);
