import { createContext, PropsWithChildren, useContext } from 'react';
import { io } from 'socket.io-client';

const socket = io('ws://localhost:4000');

const SocketContext = createContext<typeof socket | null>(null);

export const SocketProvider = (props: PropsWithChildren) => {
  return <SocketContext.Provider value={socket} {...props} />;
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket should be used within SocketProvider');
  }

  return context;
};
