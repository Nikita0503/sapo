import React from 'react';
import { connect } from 'react-redux';
import {

} from '../../../../redux/home/payment/actions';
import PaymentScreen from './PaymentScreen';

class PaymentContainer extends React.Component {
  render() {
    return (
      <PaymentScreen
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
