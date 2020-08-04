import React from 'react';
import { connect } from 'react-redux';
import {
  setShowPasswords,
  setOldPassword,
  setNewPassword,
  setNewRepeatPassword,
  setAvatarImage,
  setPhoneNumber
} from '../../../redux/profile/actions';

import {
  setUserData
} from '../../../redux/home/actions';

import {
  setToken
} from '../../../redux/login/actions';

import ProfileScreen from './ProfileScreen';

class ProfileContainer extends React.Component {
  render() {
    return (
      <ProfileScreen
        navigation={this.props.navigation}
        token={this.props.token}
        osbbId={this.props.osbbId}
        accountId={this.props.accountId}
        accountIds={this.props.accountIds}
        currentWorkPeriod={this.props.currentWorkPeriod}
        workPeriods={this.props.workPeriods}
        showPasswords={this.props.showPasswords}
        oldPassword={this.props.oldPassword}
        newRepeatPassword={this.props.newRepeatPassword}
        newPassword={this.props.newPassword}
        userData={this.props.userData}
        imageAvatar={this.props.imageAvatar}
        phoneNumber={this.props.phoneNumber}
        setShowPasswords={this.props.setShowPasswords}
        setOldPassword={this.props.setOldPassword}
        setNewPassword={this.props.setNewPassword}
        setNewRepeatPassword={this.props.setNewRepeatPassword}
        setAvatarImage={this.props.setAvatarImage}
        setPhoneNumber={this.props.setPhoneNumber}
        setUserData={this.props.setUserData}
        setToken={this.props.setToken}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.login.token,
    osbbId: state.home.osbbId,
    accountId: state.home.accountId,
    accountIds: state.home.accountIds,
    currentWorkPeriod: state.header.currentWorkPeriod,
    workPeriods: state.home.workPeriods,
    showPasswords: state.profile.showPasswords,
    oldPassword: state.profile.oldPassword,
    newPassword: state.profile.newPassword,
    newRepeatPassword: state.profile.newRepeatPassword,
    userData: state.home.userData,
    imageAvatar: state.profile.imageAvatar,
    phoneNumber: state.profile.phoneNumber,
  };
};

const mapDispatchToProps = {
  setShowPasswords,
  setOldPassword,
  setNewPassword,
  setNewRepeatPassword,
  setAvatarImage,
  setPhoneNumber,
  setUserData,
  setToken
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileContainer);
