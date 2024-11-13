// Tipo de contexto de aplicação
export type IContextType = {
  user: IUser; // Informações do usuário atual
  isLoading: boolean; // Indicação se está carregando os dados do usuário
  setUser: React.Dispatch<React.SetStateAction<IUser>>; // Função para atualizar as informações do usuário
  isAuthenticated: boolean; // Indicação se o usuário está autenticado
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>; // Função para atualizar o status de autenticação do usuário
  checkAuthUser: () => Promise<boolean>; // Função para verificar a autenticação do usuário
};

// Tipo de usuário
export type IUser = {
  id: string; // ID do usuário
  name: string; // Nome de usuário
  email: string; // Email do usuário
  imageId: string; // URL da imagem do usuário
  role: string; // Papel ou função do usuário
};


export type TokenPayload = {
  sub: string;
  name: string;
  email: string;
  imageId: string;
  role: string;
  iat: number;
  exp: number;
};