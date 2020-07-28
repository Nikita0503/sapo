import React from 'react';
import { connect } from 'react-redux';
import { 
    setAddCommentToOffer, 
    setIsDisabledButtonSendChange } from '../../../../../redux/requests/selectedRequest/addComment/actions';
import AddCommentToSelectedRequestScreen from './AddCommentToSelectedRequestScreen';

class AddCommentToSelectedRequestContainer extends React.Component {
  render() {
    return (
      <AddCommentToSelectedRequestScreen
        navigation={this.props.navigation}
        token={this.props.token}
        osbbId={this.props.osbbId}
        accountId={this.props.accountId}
        workPeriods={this.props.workPeriods}
        userData={this.props.userData}
        imageAvatar={this.props.imageAvatar}
        addCommentToOfferComment={this.props.addCommentToOfferComment}
        isDisabledButtonSend={this.props.isDisabledButtonSend}
        setAddCommentToOffer={this.props.setAddCommentToOffer}
        selectedOfferData={this.props.selectedOfferData}
        setIsDisabledButtonSendChange={this.props.setIsDisabledButtonSendChange}
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
    addCommentToOfferComment: state.addCommentToOffer.addCommentToOfferComment,
    selectedOfferData: state.applicationsAndOffers.selectedOfferData,
    isDisabledButtonSend: state.addCommentToOffer.isDisabledButtonSend,
    userData: state.home.userData,
    imageAvatar: state.profile.imageAvatar
  };
};

const mapDispatchToProps = {
  setAddCommentToOffer,
  setIsDisabledButtonSendChange
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddCommentToSelectedRequestContainer);