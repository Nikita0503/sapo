import React from 'react';
import { connect } from 'react-redux';
import { setSelectedOfferComments, setSelectedFile } from '../../../../redux/requests/selectedRequest/actions';
import SelectedRequestScreen from './SelectedRequestScreen';

class SelectedRequestContainer extends React.Component {
  render() {
    return (
      <SelectedRequestScreen
        navigation={this.props.navigation}
        token={this.props.token}
        osbbId={this.props.osbbId}
        accountId={this.props.accountId}
        workPeriods={this.props.workPeriods}
        currentWorkPeriod={this.props.currentWorkPeriod}
        selectedOfferData={this.props.selectedOfferData}
        selectedOfferComments={this.props.selectedOfferComments}
        offerSelectedFile={this.props.offerSelectedFile}
        userData={this.props.userData}
        imageAvatar={this.props.imageAvatar}
        setSelectedOfferComments={this.props.setSelectedOfferComments}
        setSelectedFile={this.props.setSelectedFile}
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
    currentWorkPeriod: state.header.currentWorkPeriod,
    selectedOfferData: state.applicationsAndOffers.selectedOfferData,
    selectedOfferComments: state.selectedOffer.selectedOfferComments,
    offerSelectedFile: state.selectedOffer.offerSelectedFile,
    userData: state.home.userData,
    imageAvatar: state.profile.imageAvatar
  };
};

const mapDispatchToProps = {
  setSelectedOfferComments,
  setSelectedFile
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectedRequestContainer);
