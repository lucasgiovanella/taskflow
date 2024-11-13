// src/contexts/SocketContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { queryClient } from "../lib/react-query/QueryProvider";
import { QueryKeys, SocketEvents } from "../types/socket-type";
import { socketToQueryKeysMap } from "../utils/socket-map";

interface SocketContextData {
  socket: Socket | null;
  isConnected: boolean;
  // Funções de emissão tipadas
  emitComputerUpdate: () => void;
  emitComputerCreate: () => void;
  emitComputerDelete: () => void;
  emitDepositUpdate: () => void;
  emitDepositCreate: () => void;
  emitDepositDelete: () => void;
}

const SocketContext = createContext<SocketContextData>({} as SocketContextData);

const SOCKET_URL = process.env.SERVER_URL || "http://192.168.0.22:8001/socket.io";

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const socketInstance = io(SOCKET_URL, {
      transports: ["websocket"],
      autoConnect: true,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    setSocket(socketInstance);

    // Função genérica para invalidar queries
    const invalidateQueriesForEvent = (event: SocketEvents) => {
      const queriesToInvalidate = socketToQueryKeysMap[event];
      queriesToInvalidate.forEach((queryKey: QueryKeys) => {
        queryClient.invalidateQueries({ queryKey: [queryKey] });
      });
    };

    // Configurar listeners para eventos
    Object.keys(socketToQueryKeysMap).forEach((event) => {
      socketInstance.on(event, () => {
        invalidateQueriesForEvent(event as SocketEvents);
      });
    });

    // Handlers de conexão
    socketInstance.on("connect", () => {
      setIsConnected(true);
      console.log("Socket conectado:", socketInstance.id);
    });

    socketInstance.on("disconnect", () => {
      setIsConnected(false);
      console.log("Socket desconectado");
    });

    socketInstance.on("connect_error", (error) => {
      console.error("Erro de conexão:", error);
    });

    return () => {
      socketInstance.removeAllListeners();
      socketInstance.disconnect();
    };
  }, []); // Removido queryClient das dependências

  // Funções de emissão de eventos
  const emitComputerUpdate = () => {
    if (socket?.connected) {
      socket.emit("computerUpdate");
    }
  };

  const emitComputerCreate = () => {
    if (socket?.connected) {
      socket.emit("computerCreate");
    }
  };

  const emitComputerDelete = () => {
    if (socket?.connected) {
      socket.emit("computerDelete");
    }
  };

  const emitDepositUpdate = () => {
    if (socket?.connected) {
      socket.emit("depositUpdate");
    }
  };

  const emitDepositCreate = () => {
    if (socket?.connected) {
      socket.emit("depositCreate");
    }
  };

  const emitDepositDelete = () => {
    if (socket?.connected) {
      socket.emit("depositDelete");
    }
  };

  return (
    <SocketContext.Provider
      value={{
        socket,
        isConnected,
        emitComputerUpdate,
        emitComputerCreate,
        emitComputerDelete,
        emitDepositUpdate,
        emitDepositCreate,
        emitDepositDelete,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

// Hook personalizado para usar o contexto
export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket deve ser usado dentro de um SocketProvider");
  }
  return context;
};
