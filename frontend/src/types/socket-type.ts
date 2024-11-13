export type SocketEvents = 
  | 'computerUpdate' 
  | 'computerCreate' 
  | 'computerDelete'
  | 'depositUpdate'
  | 'depositCreate' 
  | 'depositDelete';

export type QueryKeys = 
  | 'allComputers'
  | 'installedComputers'
  | 'removedComputers'
  | 'stock'
  | 'inUse';