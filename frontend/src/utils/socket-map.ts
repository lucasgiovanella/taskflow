import { QueryKeys, SocketEvents } from "../types/socket-type";

export const socketToQueryKeysMap: Record<SocketEvents, QueryKeys[]> = {
  computerUpdate: ['allComputers', 'installedComputers', 'removedComputers'],
  computerCreate: ['allComputers', 'installedComputers', 'removedComputers'],
  computerDelete: ['allComputers', 'installedComputers', 'removedComputers'],
  depositUpdate: ['stock', 'inUse'],
  depositCreate: ['stock', 'inUse'],
  depositDelete: ['stock', 'inUse']
};
