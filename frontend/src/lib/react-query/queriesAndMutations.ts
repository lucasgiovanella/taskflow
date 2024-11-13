import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  deleteUser,
  getAllComputers,
  getAllUsers,
  getInstalledComputers,
  getRemovedComputers,
  postNewUser,
  postComputer,
  sendMail,
  signInAccount,
  updateProfile,
  updateComputer,
  deleteComputer,
  getDepositComputer,
  getComputers,
  postDepositComputer,
  updateDepositComputer,
  deleteDepositComputer,
  updateProfileImage,
} from "../server/api";

// Definindo chaves constantes para evitar erros de digitação
const queryKeys = {
  installedComputers: "installedComputers",
  removedComputers: "removedComputers",
  allComputers: "allComputers",
  allUsers: "allUsers",
  stock: "stock",
  inUse: "inUse",
  checkedComputer: "checkedComputer",
  installedComputer: "installedComputer",
  removedComputer: "removedComputer",
} as const;

// Queries
export const useSignInAccount = () => {
  return useMutation({
    mutationFn: (user: { email: string; password: string }) =>
      signInAccount(user),
  });
};

export const useInstalledComputers = () => {
  return useQuery({
    queryKey: [queryKeys.installedComputers],
    queryFn: getInstalledComputers,
    staleTime: 0,
    refetchInterval: 10000,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });
};

export const useRemovedComputers = () => {
  return useQuery({
    queryKey: [queryKeys.removedComputers],
    queryFn: getRemovedComputers,
    staleTime: 0,
    refetchInterval: 10000,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });
};

export const useAllComputers = () => {
  return useQuery({
    queryKey: [queryKeys.allComputers],
    queryFn: getAllComputers,
    staleTime: 0,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });
};

export const useGetComputer = ({
  checked,
  type,
}: {
  checked: boolean;
  type?: "ADD" | "REMO";
}) => {
  const queryKey = checked
    ? queryKeys.checkedComputer
    : type === "ADD"
    ? queryKeys.installedComputer
    : queryKeys.removedComputer;

  return useQuery({
    queryKey: [queryKey],
    queryFn: () => getComputers({ checked, type }),
    staleTime: 0,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });
};

export const useAllUsers = () => {
  return useQuery({
    queryKey: [queryKeys.allUsers],
    queryFn: getAllUsers,
    staleTime: 0,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });
};

export const useGetDepositComputer = ({ inUse }: { inUse: boolean }) => {
  return useQuery({
    queryKey: [inUse ? queryKeys.inUse : queryKeys.stock],
    queryFn: () => getDepositComputer({ inUse }),
    staleTime: 0,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });
};

// Mutations
export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: {
      id: string;
      name?: string;
      password?: string;
      role?: string;
    }) => updateProfile(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [queryKeys.allUsers] });
      await queryClient.refetchQueries({ queryKey: [queryKeys.allUsers] });
    },
    onError: (error) => {
      console.error("Erro ao atualizar perfil:", error);
    },
  });
};

export const useSendMail = () => {
  return useMutation({
    mutationFn: (data: {
      title: string;
      computerName: string;
      body: string;
      to: string;
    }) => sendMail(data),
    onError: (error) => {
      console.error("Erro ao enviar email:", error);
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteUser(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [queryKeys.allUsers] });
      await queryClient.refetchQueries({ queryKey: [queryKeys.allUsers] });
    },
    onError: (error) => {
      console.error("Erro ao deletar usuário:", error);
    },
  });
};

export const usePostNewUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (user: { name: string; email: string }) => postNewUser(user),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [queryKeys.allUsers] });
      await queryClient.refetchQueries({ queryKey: [queryKeys.allUsers] });
    },
    onError: (error) => {
      console.error("Erro ao adicionar novo usuário:", error);
    },
  });
};

export const useUpdateDepositComputer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (computer: {
      id: string;
      name?: string;
      model?: string;
      year?: number;
      notes?: string;
      inUse?: boolean;
    }) => updateDepositComputer(computer),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: [queryKeys.stock] }),
        queryClient.invalidateQueries({ queryKey: [queryKeys.inUse] }),
      ]);

      await Promise.all([
        queryClient.refetchQueries({ queryKey: [queryKeys.stock] }),
        queryClient.refetchQueries({ queryKey: [queryKeys.inUse] }),
      ]);
    },
    onError: (error) => {
      console.error("Erro ao atualizar computador de depósito:", error);
    },
  });
};

export const usePostDepositComputer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (computer: {
      name: string;
      addedBy: string;
      model: string;
      year?: number;
      notes?: string;
    }) => postDepositComputer(computer),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [queryKeys.stock] });
      await queryClient.refetchQueries({ queryKey: [queryKeys.stock] });
    },
    onError: (error) => {
      console.error("Erro ao adicionar computador de depósito:", error);
    },
  });
};

export const useDeleteDepositComputer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (computer: { id: string }) => deleteDepositComputer(computer),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: [queryKeys.stock] }),
        queryClient.invalidateQueries({ queryKey: [queryKeys.inUse] }),
      ]);

      await Promise.all([
        queryClient.refetchQueries({ queryKey: [queryKeys.stock] }),
        queryClient.refetchQueries({ queryKey: [queryKeys.inUse] }),
      ]);
    },
    onError: (error) => {
      console.error("Erro ao deletar computador de depósito:", error);
    },
  });
};

export const useUpdateProfileImage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { id: string; avatar: File }) =>
      updateProfileImage(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [queryKeys.allUsers] });
      await queryClient.refetchQueries({ queryKey: [queryKeys.allUsers] });
    },
    onError: (error) => {
      console.error("Erro ao atualizar imagem do perfil:", error);
    },
  });
};

// Re-export das funções que já estavam no arquivo anterior
export const usePostComputer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (computer: {
      computerName: string;
      responsible: string;
      macAddress?: string;
      local?: string;
      type: string;
      replace?: string;
      isDroped?: boolean;
    }) => postComputer(computer),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: [queryKeys.allComputers] }),
        queryClient.invalidateQueries({
          queryKey: [queryKeys.installedComputers],
        }),
        queryClient.invalidateQueries({
          queryKey: [queryKeys.removedComputers],
        }),
      ]);

      await Promise.all([
        queryClient.refetchQueries({ queryKey: [queryKeys.allComputers] }),
        queryClient.refetchQueries({
          queryKey: [queryKeys.installedComputers],
        }),
        queryClient.refetchQueries({ queryKey: [queryKeys.removedComputers] }),
      ]);
    },
    onError: (error) => {
      console.error("Erro ao adicionar computador:", error);
    },
  });
};

export const useUpdateComputer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (computer: {
      id: string;
      name?: string;
      responsible?: string;
      replace?: string;
      local?: string;
      pendences?: string;
      checked?: boolean;
      status?: boolean;
      updatedBy: string;
    }) => updateComputer(computer),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: [queryKeys.allComputers] }),
        queryClient.invalidateQueries({
          queryKey: [queryKeys.installedComputers],
        }),
        queryClient.invalidateQueries({
          queryKey: [queryKeys.removedComputers],
        }),
        queryClient.invalidateQueries({
          queryKey: [queryKeys.checkedComputer],
        }),
        queryClient.invalidateQueries({
          queryKey: [queryKeys.installedComputer],
        }),
        queryClient.invalidateQueries({
          queryKey: [queryKeys.removedComputer],
        }),
      ]);

      await Promise.all([
        queryClient.refetchQueries({ queryKey: [queryKeys.allComputers] }),
        queryClient.refetchQueries({
          queryKey: [queryKeys.installedComputers],
        }),
        queryClient.refetchQueries({ queryKey: [queryKeys.removedComputers] }),
        queryClient.refetchQueries({ queryKey: [queryKeys.checkedComputer] }),
        queryClient.refetchQueries({ queryKey: [queryKeys.installedComputer] }),
        queryClient.refetchQueries({ queryKey: [queryKeys.removedComputer] }),
      ]);
    },
    onError: (error) => {
      console.error("Erro ao atualizar computador:", error);
    },
  });
};

export const useDeleteComputer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (computer: { id: string }) => deleteComputer(computer),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: [queryKeys.allComputers] }),
        queryClient.invalidateQueries({
          queryKey: [queryKeys.installedComputers],
        }),
        queryClient.invalidateQueries({
          queryKey: [queryKeys.removedComputers],
        }),
        queryClient.invalidateQueries({
          queryKey: [queryKeys.checkedComputer],
        }),
        queryClient.invalidateQueries({
          queryKey: [queryKeys.installedComputer],
        }),
        queryClient.invalidateQueries({
          queryKey: [queryKeys.removedComputer],
        }),
      ]);

      await Promise.all([
        queryClient.refetchQueries({ queryKey: [queryKeys.allComputers] }),
        queryClient.refetchQueries({
          queryKey: [queryKeys.installedComputers],
        }),
        queryClient.refetchQueries({ queryKey: [queryKeys.removedComputers] }),
        queryClient.refetchQueries({ queryKey: [queryKeys.checkedComputer] }),
        queryClient.refetchQueries({ queryKey: [queryKeys.installedComputer] }),
        queryClient.refetchQueries({ queryKey: [queryKeys.removedComputer] }),
      ]);
    },
    onError: (error) => {
      console.error("Erro ao deletar computador:", error);
    },
  });
};
