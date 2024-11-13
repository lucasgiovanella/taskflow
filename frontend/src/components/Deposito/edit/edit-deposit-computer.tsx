import { Button, Drawer, Form, Input, Space } from "antd";
import { useState } from "react";
import { FiEdit } from "react-icons/fi";
import SelectModelo from "../create/select-modelo";
import { useUpdateDepositComputer } from "../../../lib/react-query/queriesAndMutations";
import { useNotify } from "../../../hooks/useNotify";
// import useSocket from "../../../hooks/useSocket";
import { useSocket } from "../../../context/SocketContext";

interface EditDepositComputerProps {
  initialValue: {
    id: string;
    name: string;
    year: number;
    model: string;
  };
}

const EditDepositComputer = ({ initialValue }: EditDepositComputerProps) => {
  const [visible, setVisible] = useState(false);
  const [formContent, setFormContent] = useState(initialValue);
  const { mutate } = useUpdateDepositComputer();
  const { notify, contextHolder } = useNotify();
  const { emitDepositUpdate } = useSocket();
  const handleModelChange = (model: string) => {
    setFormContent({ ...formContent, model });
  };

  const saveEdit = () => {
    mutate(formContent);
    emitDepositUpdate();
    setVisible(false);
    notify({
      type: "success",
      message: "Computador editado com sucesso!",
    });
  };

  return (
    <>
      {contextHolder}
      <Button onClick={() => setVisible(true)}>
        <FiEdit size={15} />
      </Button>
      <Drawer
        title="Editar Computador"
        placement="right"
        closable={false}
        onClose={() => setVisible(false)}
        open={visible}
        style={{
          zIndex: 1000,
          height: "100%",
          overflow: "auto",
          backgroundColor: "#1c1c1c",
        }}
        extra={
          <Space>
            <Button onClick={() => setVisible(false)}>X</Button>
            <Button type="primary" onClick={saveEdit}>
              Salvar
            </Button>
          </Space>
        }
      >
        <Form
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Space direction="vertical">
            <Form.Item
              name="name"
              rules={[
                {
                  required: true,
                  message: "Campo obrigatório",
                },
              ]}
              initialValue={initialValue.name}
            >
              <Input
                size="large"
                placeholder="Nome do computador"
                onChange={(e) => {
                  setFormContent({ ...formContent, name: e.target.value });
                }}
              />
            </Form.Item>
            <Form.Item
              name="year"
              rules={[{ required: true, message: "Insira o ano!" }]}
              initialValue={initialValue.year}
            >
              <Input
                size="large"
                placeholder="Ano"
                style={{ width: "100%" }}
                inputMode="numeric"
                onChange={(e) => {
                  setFormContent({
                    ...formContent,
                    year: parseInt(e.target.value),
                  });
                }}
              />
            </Form.Item>
            <Form.Item name="model">
              <SelectModelo
                index={0}
                handleModelChange={handleModelChange}
                initialValue={initialValue.model}
              />
            </Form.Item>
          </Space>
        </Form>
      </Drawer>
    </>
  );
};

export default EditDepositComputer;
