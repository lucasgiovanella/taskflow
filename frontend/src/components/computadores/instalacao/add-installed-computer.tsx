import { Button, Drawer, Form, Input, Space, Spin } from "antd";
import { useEffect, useMemo, useState } from "react";
import { useUserContext } from "../../../context/AuthContext";
import { usePostComputer } from "../../../lib/react-query/queriesAndMutations";
import { useNotify } from "../../../hooks/useNotify";
// import useSocket from "../../../hooks/useSocket";
import { useSocket } from "../../../context/SocketContext";

const AddInstalledComputer = () => {
  const [open, setOpen] = useState(false);
  const { user } = useUserContext();
  const [form] = Form.useForm();
  const { mutate: postComputer, isPending } = usePostComputer();
  const { notify, contextHolder } = useNotify();
  const { emitComputerCreate } = useSocket();

  const defaultValues = useMemo(
    () => ({
      computerName: "",
      responsible: user.email,
      macAddress: "",
      local: "",
      replace: "",
      type: "ADD",
    }),
    [user.email]
  );

  const showDrawer = () => {
    setOpen(true);
    form.setFieldsValue(defaultValues);
  };

  const onClose = () => {
    form.resetFields();
    setOpen(false);
  };

  const handleSubmit = async () => {
    try {
      await form.validateFields();
      const values = form.getFieldsValue();
      const valuesWithType = { ...values, type: "ADD" };
      postComputer(valuesWithType);
      emitComputerCreate();
      notify({
        type: "success",
        message: "Computador adicionado com sucesso!",
      });
      onClose();
    } catch (error) {
      notify({
        type: "error",
        message: "Erro ao adicionar computador!",
      });
    }
  };

  useEffect(() => {
    form.setFieldsValue(defaultValues);
  }, [defaultValues, form, user.email]);

  return (
    <>
      {contextHolder}
      <Button
        type="primary"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "10px",
        }}
        onClick={showDrawer}
      >
        Adicionar Computador
      </Button>
      <Drawer
        title="Adicionar Computador"
        placement="right"
        closable={false}
        open={open}
        style={{
          zIndex: 1000,
          height: "100%",
          overflow: "auto",
          backgroundColor: "#1c1c1c",
        }}
        extra={
          <Space>
            <Button onClick={onClose}>X</Button>
            <Button type="primary" onClick={handleSubmit}>
              {isPending ? <Spin /> : "Salvar"}
            </Button>
          </Space>
        }
      >
        <Form
          style={{
            width: "100%",
            display: "flex",
            height: "100%",
            flexDirection: "column",
          }}
          autoComplete="off"
          name="add-installed-computer-form"
          form={form}
          initialValues={defaultValues}
        >
          <Space direction="vertical" size={18}>
            <Form.Item
              name="computerName"
              rules={[
                { required: true, message: "Insira o nome do computador!" },
              ]}
            >
              <Input
                size="large"
                placeholder="Nome do computador"
                style={{ width: "" }}
                onChange={(e) =>
                  form.setFieldsValue({ computerName: e.target.value })
                }
              />
            </Form.Item>
            <Form.Item
              name="responsible"
              rules={[{ required: true, message: "Insira o responsável!" }]}
            >
              <Input
                size="large"
                placeholder="Responsável"
                style={{ width: "100%" }}
                onChange={(e) =>
                  form.setFieldsValue({ responsible: e.target.value })
                }
              />
            </Form.Item>
            <Form.Item
              name="macAddress"
              rules={[{ required: true, message: "Insira o MAC" }]}
            >
              <Input
                size="large"
                placeholder="Endereço MAC"
                style={{ width: "100%" }}
                onChange={(e) =>
                  form.setFieldsValue({ macAddress: e.target.value })
                }
              />
            </Form.Item>
            <Form.Item
              name="local"
              rules={[{ required: true, message: "Insira o local!" }]}
            >
              <Input
                size="large"
                placeholder="Local"
                style={{ width: "100%" }}
                onChange={(e) => form.setFieldsValue({ local: e.target.value })}
              />
            </Form.Item>
            <Form.Item name="replace">
              <Input
                size="large"
                placeholder="Substituição"
                style={{ width: "100%" }}
                onChange={(e) =>
                  form.setFieldsValue({ replace: e.target.value })
                }
              />
            </Form.Item>
          </Space>
        </Form>
      </Drawer>
    </>
  );
};

export default AddInstalledComputer;
