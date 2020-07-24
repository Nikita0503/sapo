import React from 'react';
import { connect } from 'react-redux';
import {
  setCurrentPaymentsData,
  fetchPayment
} from '../../../../redux/home/payment/actions';
import PaymentScreen from './PaymentScreen';

class PaymentContainer extends React.Component {
  render() {
    return (
      <PaymentScreen
        navigation={this.props.navigation}
        token={this.props.token}
        osbbId={this.props.osbbId}
        accountId={this.props.accountId}
        currentWorkPeriod={this.props.currentWorkPeriod}
        currentPaymentsData={this.props.currentPaymentsData}
        setCurrentPaymentsData={this.props.setCurrentPaymentsData}
        fetchPayment={this.props.fetchPayment}
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
    currentPaymentsData: state.payments.currentPaymentsData,
  };
};

const mapDispatchToProps = {
  setCurrentPaymentsData,
  fetchPayment
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PaymentContainer);
