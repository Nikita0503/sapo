export const CHANGE_ALL_CHATS = 'CHANGE_ALL_CHATS';
export const CHATS_ALL_CHATS_CLEAR = 'CHATS_ALL_CHATS_CLEAR';
export const CHANGE_ALL_USERS = 'CHANGE_ALL_USERS';
export const CHANGE_SELECTED_CHAT = 'CHANGE_SELECTED_CHAT';

export const setChatsAllChats = allChats => ({
  type: CHANGE_ALL_CHATS,
  payload: allChats
});

export const setChatsAllChatsClear = allChats => ({
  type: CHATS_ALL_CHATS_CLEAR,
  payload: allChats
})

export const setChatsAllUsers = allUsers => ({
  type: CHANGE_ALL_USERS,
  payload: allUsers
});

export const setAllChatsSelectedChat = selectedChat => ({
  type: CHANGE_SELECTED_CHAT,
  payload: selectedChat
});
