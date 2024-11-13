import { Button, Drawer, Form, Input, Space, Spin } from "antd";
import { useEffect, useState } from "react";
import { usePostNewUser } from "../lib/react-query/queriesAndMutations";
import { useNotify } from "../hooks/useNotify";

const AddNewUser = () => {
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState({
    name: "",
    email: "",
  });
  const { mutate: postNewUser, isPending } = usePostNewUser();
  const { notify, contextHolder } = useNotify();

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    try {
      postNewUser(values);
      notify({
        type: "success",
        message: "Usuário adicionado com sucesso!",
      })
    } catch (error) {
      notify({
        type: "error",
        message: "Erro ao adicionar usuário!",
      })
    }
    onClose();
  };

  useEffect(() => {
    setValues({
      name: "",
      email: "",
    });
  }, []);

  return (
    <>
      {contextHolder}
      <Button type="primary" onClick={showDrawer}>
        Adicionar membro
      </Button>
      <Drawer
        title="Adicionar Usuário"
        placement="right"
        closable={true}
        onClose={onClose}
        open={open}
        style={{
          zIndex: 1000,
          height: "100%",
          overflow: "auto",
          backgroundColor: "#1c1c1c",
        }}
        extra={
          <Space>
            <Button onClick={onClose}>Cancelar</Button>
            <Button type="primary" onClick={handleSubmit}>
              {isPending ? <Spin /> : "Salvar"}{" "}
            </Button>
          </Space>
        }
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            height: "100%",
          }}
        >
          <Form
            autoComplete="off"
            name="add-new-user"
            style={{
              width: "100%",
              display: "flex",
              height: "100%",
              flexDirection: "column",
            }}
          >
            <Space direction="vertical" size={18}>
              <Form.Item
                name="name"
                rules={[
                  { required: true, message: "Insira o nome do Usuário!" },
                ]}
              >
                <Input
                  size="large"
                  placeholder="Nome"
                  style={{ width: "100%" }}
                  onChange={(e) =>
                    setValues({ ...values, name: e.target.value })
                  }
                />
              </Form.Item>
              <Form.Item name="email" rules={[{ required: true }]}>
                <Input
                  size="large"
                  placeholder="Email"
                  style={{ width: "100%" }}
                  onChange={(e) =>
                    setValues({ ...values, email: e.target.value })
                  }
                />
              </Form.Item>
            </Space>
          </Form>
        </div>
      </Drawer>
    </>
  );
};

export default AddNewUser;
