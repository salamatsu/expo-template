import { createContext, useContext, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { BASE_URL } from "../../constants";

const SocketContext = createContext();

export const useSocketContext = () => useContext(SocketContext);

const SocketProvider = ({ children }) => {
  const socket = useRef(null);

  useEffect(() => {
    const socketInstance = io(BASE_URL, {
      auth: {
        serverOffset: 0, // Example auth parameter
      },
      reconnectionAttempts: 3, // Retry connection 3 times
      timeout: 10000, // Connection timeout
      transports: ["websocket"], // Use WebSocket transport
    });

    // Handle connection
    const handleConnect = () => {
      console.log("Socket connected:", socketInstance.id);
      socket.current = socketInstance
    };

    // Handle disconnection
    const handleDisconnect = () => {
      console.log("Socket disconnected:", socketInstance.id);
      socket.current = socketInstance
    };

    socketInstance.on("connect", handleConnect);
    socketInstance.on("disconnect", handleDisconnect);

    // Cleanup on unmount
    return () => {
      socketInstance.off("connect", handleConnect);
      socketInstance.off("disconnect", handleDisconnect);
      socketInstance.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
