export const CHANGE_ADVERTISEMENT_OSBB_NAME = 'CHANGE_ADVERTISEMENT_OSBB_NAME';
export const CHANGE_ADVERTISEMENT_DATA = 'CHANGE_ADVERTISEMENT_DATA';
export const CHANGE_ADVERTISEMENT_SELECTED_POST = 'CHANGE_ADVERTISEMENT_SELECTED_POST';
export const CHANGE_ADVERTISEMENT_SELECTED_POST_COMMENTS = 'CHANGE_ADVERTISEMENT_SELECTED_POST_COMMENTS';
export const CHANGE_ADVERTISEMENT_ALL_COMMENTS = 'CHANGE_ADVERTISEMENT_ALL_COMMENTS';
export const CHANGE_ADVERTISEMENT_ALL_COMMENTS_CLEAR = 'CHANGE_ADVERTISEMENT_ALL_COMMENTS_CLEAR';
export const CHANGE_ADVERTISEMENT_SELECTED_FILE = 'CHANGE_ADVERTISEMENT_SELECTED_FILE';

export const setAdvertisementOsbbName = advertisementOsbbName => ({
  type: CHANGE_ADVERTISEMENT_OSBB_NAME,
  payload: advertisementOsbbName
});

export const setAdvertisementData = advertisementData => ({
  type: CHANGE_ADVERTISEMENT_DATA,
  payload: advertisementData
});

export const setSelectedPost = selectedPost => ({
  type: CHANGE_ADVERTISEMENT_SELECTED_POST,
  payload: selectedPost
});

export const setSelectedPostComments = selectedPost => ({
  type: CHANGE_ADVERTISEMENT_SELECTED_POST_COMMENTS,
  payload: selectedPost
});

export const setAllComments = allComments => ({
  type: CHANGE_ADVERTISEMENT_ALL_COMMENTS,
  payload: allComments
});

export const setAllCommentsClear = allComments => ({
  type: CHANGE_ADVERTISEMENT_ALL_COMMENTS_CLEAR,
  payload: allComments
});

export const setAdvertisementSelectedFile = selectedFile => ({
  type: CHANGE_ADVERTISEMENT_SELECTED_FILE,
  payload: selectedFile
});