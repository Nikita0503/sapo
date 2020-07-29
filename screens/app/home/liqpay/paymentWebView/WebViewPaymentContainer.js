import React from 'react';
import { connect } from 'react-redux';
import WebViewPaymentScreen from './WebViewPaymentScreen';

class WebViewPaymentContainer extends React.Component {
  render() {
    return (
      <WebViewPaymentScreen
        navigation={this.props.navigation}
        token={this.props.token}
        osbbId={this.props.osbbId}
        accountId={this.props.accountId}
        workPeriods={this.props.workPeriods} 
        liqpayData={this.props.liqpayData}
        selectedChargeContribution={this.props.selectedChargeContribution}
        selectedChargeValue={this.props.selectedChargeValue}
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
    selectedChargeContribution: state.paymentSelection.selectedChargeContribution,
    selectedChargeValue: state.paymentSelection.selectedChargeValue
  };
};

const mapDispatchToProps = {
  
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WebViewPaymentContainer);
