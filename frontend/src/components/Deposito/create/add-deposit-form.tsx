import { Button, Drawer, Form, Input, Space, Switch } from "antd";
import { useState } from "react";
import { MdOutlineFormatAlignLeft } from "react-icons/md";
import { useUserContext } from "../../../context/AuthContext";
import TextArea from "antd/lib/input/TextArea";
import SelectModelo from "./select-modelo";
import { usePostDepositComputer } from "../../../lib/react-query/queriesAndMutations";
// import useSocket from "../../../hooks/useSocket";
import { useSocket } from "../../../context/SocketContext";

interface CodeData {
  name: string;
  model: string;
  year: number;
  addedBy: string;
  notes: string;
  inUse: boolean;
}

const AddDepositForm = () => {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const { user } = useUserContext();
  const initialData: CodeData = {
    name: "",
    year: 0,
    addedBy: user.email,
    notes: "",
    inUse: false,
    model: "",
  };
  const [dataSource, setDataSource] = useState<CodeData>(initialData);
  const { mutate: postDepositComputer } = usePostDepositComputer();
  const { emitComputerCreate } = useSocket();
  const handleModelChange = (model: string) => {
    const newData = { ...dataSource };

    if (newData) {
      newData.model = model;
      setDataSource(newData);
    } else {
      console.error("Índice fora do alcance ou linha inexistente.");
    }
  };

  const showDrawer = () => {
    setOpen(true);
    form.setFieldsValue(dataSource);
  };

  const onClose = () => {
    form.resetFields();
    setDataSource(initialData);
    setOpen(false);
  };

  const handleSubmit = async () => {
    await form.validateFields();
    postDepositComputer(dataSource);
    form.resetFields();
    emitComputerCreate();
    setDataSource(initialData);
    setOpen(false);
  };

  return (
    <>
      <Button
        type="primary"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "5px",
        }}
        onClick={() => showDrawer()}
      >
        <MdOutlineFormatAlignLeft size={20} />
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
              Salvar
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
          initialValues={dataSource}
        >
          <Space direction="vertical" size={18}>
            <Form.Item
              name="name"
              rules={[
                { required: true, message: "Insira o nome do computador!" },
              ]}
            >
              <Input
                size="large"
                placeholder="Nome do computador"
                onChange={(e) => {
                  const newData = { ...dataSource };
                  newData.name = e.target.value;
                  setDataSource(newData);
                }}
              />
            </Form.Item>
            <Form.Item
              name="year"
              rules={[{ required: true, message: "Insira o ano!" }]}
            >
              <Input
                size="large"
                placeholder="Ano"
                style={{ width: "100%" }}
                inputMode="numeric"
                onChange={(e) => {
                  const newData = { ...dataSource };
                  newData.year = parseInt(e.target.value);
                  setDataSource(newData);
                }}
              />
            </Form.Item>
            <Form.Item
              name="addedBy"
              rules={[{ required: true, message: "Insira o responsável!" }]}
            >
              <Input
                size="large"
                placeholder="Responsável"
                onChange={(e) => {
                  const newData = { ...dataSource };
                  newData.addedBy = e.target.value;
                  setDataSource(newData);
                }}
              />
            </Form.Item>
            <Form.Item name="model">
              <SelectModelo index={0} handleModelChange={handleModelChange} />
            </Form.Item>
            <Form.Item name="notes">
              <TextArea
                placeholder="Observações"
                onChange={(e) => {
                  const newData = { ...dataSource };
                  newData.notes = e.target.value;
                  setDataSource(newData);
                }}
              />
            </Form.Item>
            <Form.Item name="inUse">
              <Switch
                checkedChildren="Em uso"
                unCheckedChildren="Fora de uso"
                onChange={(checked) => {
                  const newData = { ...dataSource };
                  newData.inUse = checked;
                  setDataSource(newData);
                }}
              />
            </Form.Item>
          </Space>
        </Form>
      </Drawer>
    </>
  );
};

export default AddDepositForm;
