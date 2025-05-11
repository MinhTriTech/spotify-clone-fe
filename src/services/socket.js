let socket = null;
let listeners = new Set();

export const initSocket = () => {
  if (!socket || socket.readyState !== WebSocket.OPEN) {
    socket = new WebSocket(`ws://${import.meta.env.VITE_API_PORT}/ws/chat/`);

    socket.onopen = () => console.log('🔌 Socket connected');

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      listeners.forEach((callback) => callback(data));
    };

    socket.onclose = () => console.log('❌ Socket closed');
  }
};

export const getSocket = () => socket;

export const subscribeToSocket = (callback) => {
  listeners.add(callback); 
  return () => {
    listeners.delete(callback); 
  };
};

export const sendToSocket = (data) => {
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify(data));
  } else {
    console.warn('⚠️ WebSocket is not connected. Message not sent.');
  }
};