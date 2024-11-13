import axios from "axios";
import {
  routeSignIn,
  routeUsers,
  routeComputers,
  routeDepositComputer,
} from "./config";
import Cookies from "js-cookie";

export async function signInAccount(user: { email: string; password: string }) {
  try {
    const { data } = await axios.post(routeSignIn, user);
    Cookies.set("token", data.access_token, {
      expires: 1,
    });
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function getCurrentUser() {
  try {
    const { data } = await axios.get(routeUsers, {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });
    return data.user;
  } catch (error) {
    console.error(error);
  }
}

export function signOut() {
  Cookies.remove("token");
  window.location.reload();
}

export async function getInstalledComputers() {
  try {
    const { data } = await axios.get(
      `${routeComputers}?checked=false&type=ADD`,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }
    );
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function getRemovedComputers() {
  try {
    const { data } = await axios.get(
      `${routeComputers}?checked=false&type=REMO`,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }
    );
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function getAllComputers() {
  try {
    const { data } = await axios.get(`${routeComputers}?checked=true`, {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function getComputers({
  type,
  checked,
}: {
  type?: string;
  checked: boolean;
}) {
  try {
    const { data } = await axios.get(
      `${routeComputers}?checked=${checked}&type=${type}`,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }
    );
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function updateComputer(computer: {
  id: string;
  computerName?: string;
  responsible?: string;
  replace?: string;
  local?: string;
  pendences?: string;
  checked?: boolean;
  status?: boolean;
  updatedBy: string;
}) {
  try {
    const { data } = await axios.put(
      `${routeComputers}/${computer.id}`,
      computer,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }
    );
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function deleteComputer(computer: { id: string }) {
  try {
    await axios.delete(`${routeComputers}/${computer.id}`, {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });
  } catch (error) {
    console.error(error);
  }
}

export async function updateProfile(data: {
  id: string;
  name?: string;
  password?: string;
  role?: string;
}) {
  try {
    // Demais dados do usuário
    if (data.name || data.password || data.role) {
      const userData = {
        name: data.name,
        password: data.password,
        role: data.role,
      };

      const response = await axios.put(`${routeUsers}/${data.id}`, userData, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      console.log(response);
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function updateProfileImage(data: { id: string; avatar: File }) {
  try {
    if (data.avatar) {
      const formData = new FormData();
      formData.append("avatar", data.avatar);

      const response = await axios.put(
        `${routeUsers}/${data.id}/image`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function postComputer(computer: {
  computerName: string;
  responsible: string;
  macAddress?: string;
  local?: string;
  type: string;
  replace?: string;
  isDroped?: boolean;
}) {
  try {
    const { data } = await axios.post(routeComputers, computer, {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });
    return data;
  } catch (error) {
    console.error(error);
  }
}

export const sendMail = async (data: {
  title: string;
  computerName: string;
  body: string;
  to: string;
}) => {
  // Garantir que a URL está completa
  const emailUrl = `${process.env.EMAIL_URL || 'http://192.168.0.22:5000'}/mail-send`;
  
  const response = await axios.post(emailUrl, {
    token: "elTLSIvorZSfju3pAvHssH0Yq2eEeQDTo3kKO5t6gKalLk705S",
    ...data,
  });
  return response.data;
};

export async function getAllUsers() {
  try {
    const { data } = await axios.get(routeUsers, {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });

    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function deleteUser(id: string) {
  try {
    const { data } = await axios.delete(`${routeUsers}/${id}`, {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function postNewUser(user: { name: string; email: string }) {
  try {
    const { data } = await axios.post(routeUsers, user, {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function getDepositComputer({ inUse }: { inUse: boolean }) {
  try {
    const { data } = await axios.get(`${routeDepositComputer}?inUse=${inUse}`, {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function postDepositComputer(computer: {
  name: string;
  addedBy: string;
  model: string;
  year?: number;
  notes?: string;
}) {
  try {
    const { data } = await axios.post(routeDepositComputer, computer, {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function updateDepositComputer(computer: {
  id: string;
  name?: string;
  model?: string;
  year?: number;
  notes?: string;
  inUse?: boolean;
}) {
  try {
    const { data } = await axios.put(
      `${routeDepositComputer}/${computer.id}`,
      computer,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }
    );
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function deleteDepositComputer(computer: { id: string }) {
  try {
    await axios.delete(`${routeDepositComputer}/${computer.id}`, {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });
  } catch (error) {
    console.error(error);
  }
}
