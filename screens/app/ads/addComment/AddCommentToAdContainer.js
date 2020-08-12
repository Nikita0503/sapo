import React from 'react';
import { connect } from 'react-redux';
import {
  setAddCommentToAdvertisementText,
  setAddCommentToAdvertisementButtonSend,
  sendComment
} from '../../../../redux/ads/addComment/actions';
import AddCommentToAdScreen from './AddCommentToAdScreen';

class AddCommentToAdContainer extends React.Component {
  render() {
    return (
      <AddCommentToAdScreen
        navigation={this.props.navigation}
        token={this.props.token}
        osbbId={this.props.osbbId}
        accountId={this.props.accountId}
        workPeriods={this.props.workPeriods}
        selectedPost={this.props.selectedPost}
        addCommentToAdvertisementText={this.props.addCommentToAdvertisementText}
        isDisabledButtonSend={this.props.isDisabledButtonSend}
        setAddCommentToAdvertisementText={this.props.setAddCommentToAdvertisementText}
        setAddCommentToAdvertisementButtonSend={this.props.setAddCommentToAdvertisementButtonSend}
        sendComment={this.props.sendComment}
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
    selectedPost: state.advertisement.selectedPost,
    addCommentToAdvertisementText: state.addCommentToAdvertisement.addCommentToAdvertisementText, 
    isDisabledButtonSend: state.addCommentToAdvertisement.isDisabledButtonSend
  };
};

const mapDispatchToProps = {
  setAddCommentToAdvertisementText,
  setAddCommentToAdvertisementButtonSend,
  sendComment
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddCommentToAdContainer);