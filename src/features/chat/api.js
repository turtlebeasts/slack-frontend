import { apiClient } from "../../shared/lib/apiClient";

export const chatApi = {
  getJoinedChannels: () => apiClient.get("/channels/joined"),
  getAllChannels: () => apiClient.get("/channels"), // for joining
  createChannel: (name, description) =>
    apiClient.post("/channels", { name, description }),
  joinChannel: (channelId) => apiClient.post(`/channels/${channelId}/join`),
  leaveChannel: (channelId) => apiClient.post(`/channels/${channelId}/leave`),
  getMessages: (channelId, cursor, limit = 20) =>
    apiClient.get(`/messages/${channelId}`, {
      params: { cursor, limit },
    }),
  getChannelDetails: (channelId) => apiClient.get(`/channels/${channelId}`),
};
