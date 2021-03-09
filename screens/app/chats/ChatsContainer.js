import React from 'react';
import { connect } from 'react-redux';
import {setChatsAllChats, 
        setChatsAllChatsClear, 
        setChatsAllUsers, 
        setAllChatsSelectedChat,
        fetchAllChats,
        setToggleShowMembers,
        setToggleShowMembersGroup,
        addChat,
        removeChat,
        setSelectedUser,
        addGroupChat,
        setNewGroupNmae} from '../../../redux/chats/actions';
import ChatsScreen from './ChatsScreen';

class ChatsContainer extends React.Component {
  render() {
    return (
      <ChatsScreen
        navigation={this.props.navigation}
        token={this.props.token}
        osbbId={this.props.osbbId}
        accountId={this.props.accountId}
        workPeriods={this.props.workPeriods}
        allChats={this.props.allChats}
        allUsers={this.props.allUsers}
        selectedChat={this.props.selectedChat}
        userData={this.props.userData}
        imageAvatar={this.props.imageAvatar}
        newGroupName={this.props.newGroupName}
        showMembers={this.props.showMembers}
        showMembersGroup={this.props.showMembersGroup}
        setChatsAllChats={this.props.setChatsAllChats}
        setChatsAllChatsClear={this.props.setChatsAllChatsClear}
        setChatsAllUsers={this.props.setChatsAllUsers}
        setAllChatsSelectedChat={this.props.setAllChatsSelectedChat}
        fetchAllChats={this.props.fetchAllChats}
        setToggleShowMembers={this.props.setToggleShowMembers}
        setToggleShowMembersGroup={this.props.setToggleShowMembersGroup}
        addChat={this.props.addChat}
        removeChat={this.props.removeChat}
        setSelectedUser={this.props.setSelectedUser}
        addGroupChat={this.props.addGroupChat}
        setNewGroupNmae={this.props.setNewGroupNmae}
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
    allChats: state.allChats.allChats,
    allUsers: state.allChats.allUsers,
    selectedChat: state.allChats.selectedChat,
    userData: state.home.userData,
    imageAvatar: state.profile.imageAvatar,
    showMembers: state.allChats.showMembers,
    showMembersGroup: state.allChats.showMembersGroup,
    newGroupName: state.allChats.newGroupName
  };
};

const mapDispatchToProps = {
  setChatsAllChats,
  setChatsAllChatsClear,
  setChatsAllUsers,
  setAllChatsSelectedChat,
  fetchAllChats,
  setToggleShowMembers,
  setToggleShowMembersGroup,
  addChat,
  removeChat,
  setSelectedUser,
  addGroupChat,
  setNewGroupNmae
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatsContainer);
