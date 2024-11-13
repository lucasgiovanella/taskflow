import {
  Button,
  Checkbox,
  Drawer,
  Form,
  Input,
  Space,
  Spin,
} from "antd";
import { useState } from "react";
import { useUserContext } from "../../../context/AuthContext";
import { usePostComputer } from "../../../lib/react-query/queriesAndMutations";
import { useNotify } from "../../../hooks/useNotify";
// import useSocket from "../../../hooks/useSocket";
import { useSocket } from "../../../context/SocketContext";

const AddRemovedComputer = () => {
  const [open, setOpen] = useState(false);
  const { user } = useUserContext();
  const [form] = Form.useForm();
  const { mutate: postComputer, isPending } = usePostComputer();
  const { notify, contextHolder } = useNotify();
  const { emitComputerCreate } = useSocket();

  const defaultValues = {
    computerName: "",
    responsible: user.email,
    isDroped: false,
    type: "REMO",
  };

  const showDrawer = () => {
    setOpen(true);
    form.setFieldsValue(defaultValues);
  };

  const onClose = () => {
    form.resetFields();
    setOpen(false);
  };

  const handleSubmit = async () => {
    await form.validateFields();
    const values = form.getFieldsValue();
    const valuesWithType = { ...values, type: "REMO" };
    postComputer(valuesWithType);
    emitComputerCreate();
    notify({
      type: "success",
      message: "Computador adicionado com sucesso!",
    });
    onClose();
  };

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
        Solicitar Remoção
      </Button>
      <Drawer
        title="Solicitar Remoção"
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
        <>
          <Form
            style={{
              width: "100%",
              display: "flex",
              height: "100%",
              flexDirection: "column",
            }}
            autoComplete="off"
            name="add-removed-computer-form"
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
                  placeholder="Nome do computador"
                  style={{ width: "100%" }}
                  size="large"
                />
              </Form.Item>
              <Form.Item
                name="responsible"
                rules={[{ required: true, message: "Insira o solicitante!" }]}
              >
                <Input
                  placeholder="Solicitante"
                  style={{ width: "100%" }}
                  size="large"
                />
              </Form.Item>
              <Form.Item
                name="isDroped"
                valuePropName="checked"
                label="Descarte"
              >
                <Checkbox />
              </Form.Item>
            </Space>
          </Form>
        </>
      </Drawer>
    </>
  );
};

export default AddRemovedComputer;
