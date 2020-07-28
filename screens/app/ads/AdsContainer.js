import React from 'react';
import { connect } from 'react-redux';
import {
  setAdvertisementOsbbName,
  setAdvertisementData,
  setSelectedPost,
  setAllComments,
  setAllCommentsClear,
  setSelectedPostComments,
  setAdvertisementSelectedFile
} from '../../../redux/ads/actions';
import AdsScreen from './AdsScreen';

class AdsContainer extends React.Component {
  render() {
    return (
      <AdsScreen
        navigation={this.props.navigation}
        token={this.props.token}
        osbbId={this.props.osbbId}
        accountId={this.props.accountId}
        workPeriods={this.props.workPeriods}
        advertisementOsbbName={this.props.advertisementOsbbName}
        advertisementData={this.props.advertisementData}
        selectedPost={this.props.selectedPost}
        selectedPostComments={this.props.selectedPostComments}
        allComments={this.props.allComments}
        advertisementSelectedFile={this.props.advertisementSelectedFile}
        userData={this.props.userData}
        imageAvatar={this.props.imageAvatar}
        setAdvertisementOsbbName={this.props.setAdvertisementOsbbName}
        setAdvertisementData={this.props.setAdvertisementData}
        setSelectedPost={this.props.setSelectedPost}
        setSelectedPostComments={this.props.setSelectedPostComments}
        setAllComments={this.props.setAllComments}
        setAllCommentsClear={this.props.setAllCommentsClear}
        setAdvertisementSelectedFile={this.props.setAdvertisementSelectedFile}
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
    advertisementOsbbName: state.advertisement.advertisementOsbbName,
    advertisementData: state.advertisement.advertisementData,
    selectedPostComments: state.advertisement.selectedPostComments,
    selectedPost: state.advertisement.selectedPost,
    allComments: state.advertisement.allComments,
    advertisementSelectedFile: state.advertisement.advertisementSelectedFile,
    userData: state.home.userData,
    imageAvatar: state.profile.imageAvatar
  };
};

const mapDispatchToProps = {
  setAdvertisementOsbbName,
  setAdvertisementData,
  setSelectedPost,
  setSelectedPostComments,
  setAllComments,
  setAllCommentsClear,
  setAdvertisementSelectedFile
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdsContainer);
