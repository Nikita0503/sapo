import React from 'react';
import { connect } from 'react-redux';
import {

} from '../../../../redux/home/payment/actions';
import ScreenPayment from './ScreenPayment';

class PaymentContainer extends React.Component {
  render() {
    return (
      <ScreenPayment
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
)(PaymentContainer);
