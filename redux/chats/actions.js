export const CHANGE_ALL_CHATS = 'CHANGE_ALL_CHATS';
export const CHATS_ALL_CHATS_CLEAR = 'CHATS_ALL_CHATS_CLEAR';
export const CHANGE_ALL_USERS = 'CHANGE_ALL_USERS';
export const CHANGE_SELECTED_CHAT = 'CHANGE_SELECTED_CHAT';
export const CHANGE_TOGGLE_SHOW_MEMBERS = 'CHANGE_TOGGLE_SHOW_MEMBERS'; 
export const CHANGE_TOGGLE_SHOW_MEMBERS_GROUP = 'CHANGE_TOGGLE_SHOW_MEMBERS_GROUP';
export const SELECT_USER = 'SELECT_USER';
export const CHANGE_NEW_GROUP_NAME = 'CHANGE_NEW_GROUP_NAME';

export const setChatsAllChats = allChats => ({
  type: CHANGE_ALL_CHATS,
  payload: allChats
});

export const setChatsAllChatsClear = () => ({
  type: CHATS_ALL_CHATS_CLEAR
})

export const setChatsAllUsers = allUsers => ({
  type: CHANGE_ALL_USERS,
  payload: allUsers
});

export const setAllChatsSelectedChat = selectedChat => ({
  type: CHANGE_SELECTED_CHAT,
  payload: selectedChat
});

export const setToggleShowMembers = () => ({
  type: CHANGE_TOGGLE_SHOW_MEMBERS,
});

export const setToggleShowMembersGroup = () => ({
  type: CHANGE_TOGGLE_SHOW_MEMBERS_GROUP,
});

export const setSelectedUser = (id) => ({
  type: SELECT_USER,
  payload: id
})

export const setNewGroupNmae = (name) => ({
  type: CHANGE_NEW_GROUP_NAME,
  payload: name
})

var ws;

export const fetchAllChats = (workPeriods, token) => {
  return async dispatch => {
      try {
        ws = new WebSocket(
          'wss://app.gsoft.net.ua/socket.io/?auth_token=' +
            token +
            '&EIO=3&transport=websocket'
        );
        ws.onopen = () => {
          ws.send(
            '425["/chat/user/list",{"workPeriod":"' +
            workPeriods[workPeriods.length - 1] +
              '"}]'
          );
          ws.send(
            '427["/chat/conversation/list",{"workPeriod":"' +
            workPeriods[workPeriods.length - 1] +
              '"}]'
          );
        };
        ws.onmessage = e => {
          if (e.data.substring(0, 2) == '42') {
            const myObjStr = JSON.stringify(e.data.substring(2, e.data.length));
            var myObj = JSON.parse(myObjStr);
            var data = JSON.parse(myObj);
            if (data[0] == 'conversationList') {
              //console.log('convList', data[1]);
              dispatch(setChatsAllChats(data[1]));
            }
            if (data[0] == 'userList') {
              dispatch(setChatsAllUsers(data[1]));
            }
          }
        };
      } catch (error) {
          console.log("fetchAllChats", "error");
      }
    }
  }

export const addChat = (workPeriods, user) => {
  return async dispatch => {
      try {
        ws.send(`427["/chat/conversation/create",{"userIds":[${user.id}],"title":"${user.fullName}","type":"private","workPeriod":"${workPeriods[workPeriods.length - 1]}"}]`) 
        dispatch(setToggleShowMembers())
      } catch (error) {
        console.log("addChat", "error");
      }
    }
  }

export const addGroupChat = (workPeriods, users, newGroupName) => {
  return async dispatch => {
    try {
      var selectedUsers = [];
      for(var i = 0; i < users.length; i++){
        if(users[i].isSelected){
          selectedUsers.push(users[i].id)
        }
      }
      if(selectedUsers.length === 0){
        return
      }
      var selectedUsersStr = ""
      for(var i = 0; i < selectedUsers.length; i++){
        selectedUsersStr += `${selectedUsers[i]},`
      }
      selectedUsersStr = selectedUsersStr.substring(0, selectedUsersStr.length - 1);
      console.log("SELECTED USERS => ", selectedUsersStr)
      ws.send(`427["/chat/conversation/create",{"userIds":[${selectedUsersStr}],"title":"${newGroupName}","type":"group","workPeriod":"${workPeriods[workPeriods.length - 1]}"}]`)
      dispatch(setToggleShowMembersGroup())
      dispatch(setNewGroupNmae(''))
    } catch (error) {
      console.log("addGroupChat", "error")
    }
  }
}

export const removeChat = (chat) => {
  return async dispatch => {
      try {
        ws.send(`427["/chat/conversation/leave",${chat.id}]`) 
      } catch (error) {
        console.log("fetchAllChats", "error");
      }
    }
  }