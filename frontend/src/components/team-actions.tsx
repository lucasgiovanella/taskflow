import { Button, Popconfirm, Select, Space } from "antd";
import { IoMdRemoveCircle } from "react-icons/io";
import {
  useDeleteUser,
  useUpdateProfile,
} from "../lib/react-query/queriesAndMutations";
import { useNotify } from "../hooks/useNotify";
import { IUser } from "../types";

const TeamActions = ({ user }: { user: IUser }) => {
  const { mutate: updateUser } = useUpdateProfile();
  const { mutate: deleteUser } = useDeleteUser();
  const { notify, contextHolder } = useNotify();

  const handleDropUser = () => {
    deleteUser(user.id);
    notify({
      type: "success",
      message: "Usuário removido com sucesso!",
    });
  };

  const handleRoleChange = (value: string) => {
    updateUser({ id: user.id, role: value });
    notify({
      type: "success",
      message: "Usuário atualizado com sucesso!",
    });
  };

  return (
    <>
      {contextHolder}
      <Space direction="horizontal" size={10}>
        <Select
          onChange={handleRoleChange}
          defaultValue={user.role}
          style={{
            border: "none",
            width: "100px",
            marginLeft: "10px",
          }}
          options={[
            { value: "ADMIN", label: "ADMIN" },
            { value: "MODERATOR", label: "MODERATOR" },
          ]}
        />
        <Popconfirm
          title="Remover Usuário?"
          trigger="click"
          placement="rightTop"
          onConfirm={handleDropUser}
        >
          <Button
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            size="middle"
            danger
            icon={<IoMdRemoveCircle />}
          />
        </Popconfirm>
      </Space>
    </>
  );
};

export default TeamActions;
