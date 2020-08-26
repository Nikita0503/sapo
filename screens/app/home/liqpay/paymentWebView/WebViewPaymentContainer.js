import React from 'react';
import { connect } from 'react-redux';
import {setLoading, setData, setSignature, sendPaymentRequest} from '../../../../../redux/home/liqpay/webView/actions';
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
        loading={this.props.loading}
        data={this.props.data}
        signature={this.props.signature}
        selectedChargeContribution={this.props.selectedChargeContribution}
        selectedChargeValue={this.props.selectedChargeValue}
        setLoading={this.props.setLoading}
        setData={this.props.setData}
        setSignature={this.props.setSignature}
        sendPaymentRequest={this.props.sendPaymentRequest}
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
    selectedChargeValue: state.paymentSelection.selectedChargeValue,
    loading: state.webView.loading,
    data: state.webView.data,
    signature: state.webView.signature
  };
};

const mapDispatchToProps = {
  setLoading,
  setData,
  setSignature,
  sendPaymentRequest
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WebViewPaymentContainer);
