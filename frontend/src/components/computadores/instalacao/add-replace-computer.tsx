import {
  Button,
  Checkbox,
  Drawer,
  Form,
  Input,
  Space,
  Spin,
  message,
} from "antd";
import { useCallback, useEffect, useState } from "react";
import { usePostComputer } from "../../../lib/react-query/queriesAndMutations";
import { useSocket } from "../../../context/SocketContext";

interface AddReplaceComputerProps {
  nameComputer: string;
  requestorComputer: string;
  open: boolean;
  onClose: () => void;
}

const AddReplaceComputer = ({
  nameComputer,
  requestorComputer,
  open,
  onClose,
}: AddReplaceComputerProps) => {
  const [form] = Form.useForm();
  const [values, setValues] = useState({
    computerName: nameComputer,
    responsible: requestorComputer,
    isDroped: false,
    type: "REMO",
  });
  const { mutate: postComputer, isPending } = usePostComputer();
  const { emitComputerCreate } = useSocket();

  const resetFormValues = useCallback(() => {
    setValues({
      computerName: nameComputer,
      responsible: requestorComputer,
      isDroped: false,
      type: "REMO",
    });
    form.resetFields();
  }, [nameComputer, requestorComputer, form]);

  const handleSubmit = () => {
    try {
      postComputer(values);
      emitComputerCreate();
    } catch (error) {
      message.error("Erro ao adicionar computador!");
    }
    resetFormValues();
    onClose();
  };

  useEffect(() => {
    resetFormValues();
  }, [nameComputer, requestorComputer, resetFormValues]);

  return (
    <>
      <Drawer
        title="Solicitar Remoção"
        placement="right"
        open={open}
        closable={false}
        onClose={() => {
          resetFormValues();
          onClose();
        }}
        style={{
          zIndex: 1000,
          height: "100%",
          overflow: "auto",
          backgroundColor: "#1c1c1c",
        }}
        extra={
          <Space>
            <Button
              onClick={() => {
                resetFormValues();
                onClose();
              }}
            >
              Cancelar
            </Button>
            <Button type="primary" onClick={handleSubmit}>
              {isPending ? <Spin /> : "Salvar"}{" "}
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
          form={form}
          autoComplete="off"
          name="add-replaced-computer-form"
        >
          <Space direction="vertical" size={20}>
            <Form.Item
              name="computerName"
              rules={[
                { required: true, message: "Insira o nome do computador!" },
              ]}
              initialValue={nameComputer}
            >
              <Input
                size="large"
                placeholder="Nome do computador"
                style={{ width: "100%" }}
                onChange={(e) =>
                  setValues({ ...values, computerName: e.target.value })
                }
              />
            </Form.Item>
            <Form.Item
              name="responsible"
              rules={[{ required: true }]}
              initialValue={requestorComputer}
            >
              <Input
                size="large"
                placeholder="Solicitante"
                style={{ width: "100%" }}
                onChange={(e) =>
                  setValues({ ...values, responsible: e.target.value })
                }
              />
            </Form.Item>
            <Form.Item name="isDropped" label="Descarte">
              <Checkbox
                checked={values.isDroped}
                onChange={(e) =>
                  setValues({ ...values, isDroped: e.target.checked })
                }
              />
            </Form.Item>
          </Space>
        </Form>
      </Drawer>
    </>
  );
};

export default AddReplaceComputer;
