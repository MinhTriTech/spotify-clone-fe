let socket = null;
let listeners = [];

export const initSocket = () => {
  if (!socket || socket.readyState !== WebSocket.OPEN) {
    socket = new WebSocket(`ws://127.0.0.1:8000/ws/chat/`);

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
  listeners.push(callback);
  return () => {
    listeners = listeners.filter((cb) => cb !== callback);
  };
};

export const sendToSocket = (data) => {
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify(data));
  } else {
    console.warn('⚠️ WebSocket is not connected. Message not sent.');
  }
};

