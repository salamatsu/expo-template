import { createContext, useContext, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { BASE_URL } from "../../constants";
import { useUserAuthStore } from "../../store/useUserAuthStore";

const SocketContext = createContext();

export const useSocketContext = () => useContext(SocketContext);

const SocketProvider = ({ children }) => {
  const sockets = useRef({});
  const { token } = useUserAuthStore()

  const createSocketInstance = (namespace) => {
    return io(`${BASE_URL}${namespace}`, {
      auth: {
        serverOffset: 0, // Example auth parameter
        token
      },
      // reconnectionAttempts: 3,
      // timeout: 10000,
      transports: ["websocket"],
    });
  };

  // useEffect(() => {
  //   // Define your namespaces
  //   const namespaces = ["/", "/posts", "/chat"];

  //   namespaces.forEach((namespace) => {
  //     const socketInstance = createSocketInstance(namespace);

  //     const handleConnect = () => {
  //       console.log(`Socket connected to ${namespace}:`, socketInstance.id);
  //       sockets.current[namespace] = socketInstance;
  //     };

  //     const handleDisconnect = () => {
  //       console.log(`Socket disconnected from ${namespace}:`, socketInstance.id);
  //     };

  //     socketInstance.on("connect", handleConnect);
  //     socketInstance.on("disconnect", handleDisconnect);

  //     // Add the socket instance to the sockets object
  //     sockets.current[namespace] = socketInstance;
  //   });

  //   // Cleanup on unmount
  //   return () => {
  //     Object.values(sockets.current).forEach((socket) => {
  //       socket.off("connect");
  //       socket.off("disconnect");
  //       socket.disconnect();
  //     });
  //   };
  // }, []);

  const getSocket = (namespace = "/") => {
    return sockets.current[namespace];
  };

  return (
    <SocketContext.Provider value={{ getSocket }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;