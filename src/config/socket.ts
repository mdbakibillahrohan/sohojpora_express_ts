import { Server } from 'socket.io';
import http from 'http';

export function setupSocketIO(server: http.Server) {
  const io = new Server(server);

  io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('disconnect', () => {
      console.log('A user disconnected');
    });
  });

  return io;
}