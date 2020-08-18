import React from 'react';
import { connect } from 'react-redux';
import { setAddOfferTopic, 
         setAddOfferText, 
         setAddOfferSystem, 
         setAddOfferPublicity, 
         setAddOfferButtonSendIsDisabled,
         addOffer
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
        userData={this.props.userData}
        imageAvatar={this.props.imageAvatar}
        setAddOfferTopic={this.props.setAddOfferTopic}
        setAddOfferText={this.props.setAddOfferText}
        setAddOfferSystem={this.props.setAddOfferSystem}
        setAddOfferPublicity={this.props.setAddOfferPublicity}
        setAddOfferButtonSendIsDisabled={this.props.setAddOfferButtonSendIsDisabled}
        addOffer={this.props.addOffer}
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
    addOfferIsDisabled: state.addOffer.addOfferIsDisabled,
    userData: state.home.userData,
    imageAvatar: state.profile.imageAvatar
  };
};

const mapDispatchToProps = {
  setAddOfferTopic,
  setAddOfferText,
  setAddOfferSystem,
  setAddOfferPublicity,
  setAddOfferButtonSendIsDisabled,
  addOffer
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddRequestContainer);
