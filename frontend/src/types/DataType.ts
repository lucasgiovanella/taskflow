import { Table } from "antd";

export interface DataTypeTableComputer{
  id: string; 
  computerName: string; 
  macAddress: string;
  local: string; 
  type: string; 
  pendences: string; 
  responsible: string;
  replace: string; 
  checked: boolean; 
  status: boolean; 
  isDroped: boolean;
  updatedBy: string; 
  createdAt: string; 
  updatedAt: string; 
}

// Interface para os dados da tabela de histórico de computadores
export interface DataTypeTableHistoric {
  id: string; // ID do registro histórico
  name: string; // Nome do computador
  macAddress: string; // Endereço MAC do computador
  createdAt: string; // Data de criação
  responsible?: string; // Responsável pelo computador (opcional)
  requestor?: string; // Solicitante (opcional)
  replace?: string; // Informação sobre substituição (opcional)
  type: string; // Tipo de computador
  tag: string; // Tag do computador
  local: string; // Localização do computador
  discarded?: boolean; // Indicação se foi descartado (opcional)
}

export interface DataTypeTableDeleted {
  id: string;
  name: string;
  type: string;
  updatedBy: string;
  updatedAt: string;
}

// Interface para os dados de login
export interface DataTypeLogin {
  email: string; // Email do usuário
  password: string; // Senha do usuário
}

// Interface para atualização de dados do usuário
export interface UserDataUpdate {
  name: string; // Novo nome do usuário
  password: string; // Nova senha do usuário
  avatar: File | null; // Nova imagem do usuário
}

export interface Item {
  id: string;
  name: string;
  createdAt: string;
  responsible: string;
  local: string;
  type: string;
  pendences: string;
  requestor: string;
  replace: string;
  checked: boolean;
  status: boolean;
  updatedBy: string;
  updatedAt: string;
}

export type ColumnTypes = Exclude<
  Parameters<typeof Table>[0]["columns"],
  undefined
>;

export interface DataTypeTableStock {
  id: string;
  name: string;
  year: string;
  model: string;
  inUse: boolean;
  notes?: string;
}
