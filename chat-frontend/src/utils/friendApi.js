import api from "./axiosCustomize";

// User search
export const searchUsers = (keyword) =>
  api.get("/user/search", { params: { q: keyword } });

// Friend Requests
export const sendFriendRequest = (receiverId) =>
  api.post("/friend-requests", { receiverId });

export const getReceivedRequests = () => api.get("/friend-requests/received");

export const getSentRequests = () => api.get("/friend-requests/sent");

export const acceptFriendRequest = (requestId) =>
  api.patch(`/friend-requests/${requestId}/accept`);

export const rejectFriendRequest = (requestId) =>
  api.patch(`/friend-requests/${requestId}/reject`);

export const cancelFriendRequest = (requestId) =>
  api.patch(`/friend-requests/${requestId}/cancel`);

// Friends
export const getFriends = (favoriteOnly = false) =>
  api.get("/friends", { params: favoriteOnly ? { favorite: true } : {} });

export const removeFriend = (friendId) => api.delete(`/friends/${friendId}`);

export const updateNickname = (friendId, nickname) =>
  api.patch(`/friends/${friendId}/nickname`, { nickname });

export const updateFavorite = (friendId, isFavorite) =>
  api.patch(`/friends/${friendId}/favorite`, { isFavorite });
