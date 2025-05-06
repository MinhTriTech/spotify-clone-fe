import axios from '../axios';

export const fetchChatRooms = async () => {
  try {
    const response = await axios.get('api/chat/chatrooms/');
    return response.data; 
  } catch (err) {
    console.error('❌ Failed to fetch conversations:', err);
    throw err;
  }
};

export const fetchMessages = async (chatRoomId) => {
  try {
    const response = await axios.get(`api/chat/chatrooms/${chatRoomId}/messages/`);
    return response.data; 
  } catch (error) {
    console.error('❌ Error fetching messages:', error);
    throw error;
  }
};

export const sendMessage = async ({ content, recipient_id, chatroom_id }) => {
  try {
    const response = await axios.post('api/chat/send-message/', {
      content,
      recipient_id,
      chatroom_id,
    });
    return response.data;
  } catch (error) {
    console.error('❌ Failed to send message via API:', error);
    throw error;
  }
};



