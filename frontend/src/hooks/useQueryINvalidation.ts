// hooks/useQueryInvalidation.ts
import { useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';
import { SocketEvents } from '../types/socket-type';
import { socketToQueryKeysMap } from '../utils/socket-map';

export const useQueryInvalidation = () => {
  const queryClient = useQueryClient();

  const invalidateQueriesForEvent = useCallback(async (event: SocketEvents) => {
    const queryKeys = socketToQueryKeysMap[event];
    if (!queryKeys) return;

    // Invalidar e refetch em sequência para garantir dados atualizados
    await Promise.all(
      queryKeys.map(async (key) => {
        await queryClient.invalidateQueries({ queryKey: [key] });
        await queryClient.refetchQueries({ queryKey: [key] });
      })
    );
  }, [queryClient]);

  return { invalidateQueriesForEvent };
};