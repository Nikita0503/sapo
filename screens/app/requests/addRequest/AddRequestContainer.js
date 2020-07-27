import React from 'react';
import { connect } from 'react-redux';
import { setAddOfferTopic, 
         setAddOfferText, 
         setAddOfferSystem, 
         setAddOfferPublicity, 
         setAddOfferButtonSendIsDisabled 
        } from '../../../../redux/requests/addRequest/actions';
import AddRequestScreen from './AddRequestScreen';

class AddRequestContainer extends React.Component {
  render() {
    return (
      <AddRequestScreen
        navigation={this.props.navigation}
        token={this.props.token}
        osbbId={this.props.osbbId}
        accountId={this.props.accountId}
        workPeriods={this.props.workPeriods}
        addOfferTopic={this.props.addOfferTopic}
        addOfferText={this.props.addOfferText}
        addOfferSystem={this.props.addOfferSystem}
        addOfferPublicity={this.props.addOfferPublicity}
        addOfferIsDisabled={this.props.addOfferIsDisabled}
        setAddOfferTopic={this.props.setAddOfferTopic}
        setAddOfferText={this.props.setAddOfferText}
        setAddOfferSystem={this.props.setAddOfferSystem}
        setAddOfferPublicity={this.props.setAddOfferPublicity}
        setAddOfferButtonSendIsDisabled={this.props.setAddOfferButtonSendIsDisabled}
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
    addOfferTopic: state.addOffer.addOfferTopic,
    addOfferText: state.addOffer.addOfferText,
    addOfferSystem: state.addOffer.addOfferSystem,
    addOfferPublicity: state.addOffer.addOfferPublicity,
    addOfferIsDisabled: state.addOffer.addOfferIsDisabled
  };
};

const mapDispatchToProps = {
  setAddOfferTopic: setAddOfferTopic,
  setAddOfferText: setAddOfferText,
  setAddOfferSystem: setAddOfferSystem,
  setAddOfferPublicity: setAddOfferPublicity,
  setAddOfferButtonSendIsDisabled: setAddOfferButtonSendIsDisabled
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddRequestContainer);