import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React, { useMemo } from "react";
import { useSocket } from "../../context/SocketContext";
import { SocketEvents } from "../../types/socket-type";
import { socketToQueryKeysMap } from "../../utils/socket-map";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        if (error instanceof Error && error.message === "Network Error") {
          return failureCount < 3;
        }
        return false;
      },
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
  },
});

export const QueryProvider = ({ children }: { children: React.ReactNode }) => {
  const { socket } = useSocket();

  // Crie uma instância do QueryClient com configurações padrão
  const queryClient = useMemo(() => {
    return new QueryClient({
      defaultOptions: {
        queries: {
          retry: (failureCount, error) => {
            if (error instanceof Error && error.message === "Network Error") {
              return failureCount < 3;
            }
            return false;
          },
          retryDelay: (attemptIndex) =>
            Math.min(1000 * 2 ** attemptIndex, 30000),
        },
      },
    });
  }, []);

  // Registrar listeners de eventos do Socket.IO
  React.useEffect(() => {
    if (socket) {
      const handlersMap: { [key: string]: () => void } = {};

      Object.keys(socketToQueryKeysMap).forEach((event) => {
        const handler = () => {
          const queryKeys = socketToQueryKeysMap[event as SocketEvents];
          if (queryKeys) {
            queryKeys.forEach((queryKey) => {
              // @ts-expect-error - Não é possível inferir o tipo de queryKey
              queryClient.invalidateQueries([queryKey]);
            });
          }
        };

        socket.on(event, handler);
        handlersMap[event] = handler;
      });

      return () => {
        // Limpar os listeners ao desmontar o componente
        Object.keys(handlersMap).forEach((event) => {
          socket.off(event, handlersMap[event]);
        });
      };
    }
  }, [socket, queryClient]);

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};

export { queryClient };
