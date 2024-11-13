import React, { useState } from "react";
import { Button, Drawer, Space, Table, Upload, UploadProps, Spin } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { BiSolidFileTxt } from "react-icons/bi";
import SelectModelo from "./select-modelo";
import { usePostDepositComputer } from "../../../lib/react-query/queriesAndMutations";
import { useUserContext } from "../../../context/AuthContext";
import { useNotify } from "../../../hooks/useNotify";
// import useSocket from "../../../hooks/useSocket";
import { useSocket } from "../../../context/SocketContext";

interface CodeData {
  uid: number;
  name: string;
  model: string;
  addedBy: string;
}

const AddDepositFile: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [dataSource, setDataSource] = useState<CodeData[]>([]);
  const { mutate: postDepositComputer, isPending } = usePostDepositComputer();
  const { user } = useUserContext();
  const { notify, contextHolder } = useNotify();
  const { emitDepositCreate } = useSocket();

  const handleModelChange = (model: string, index: number) => {
    setDataSource((prevData) => {
      const newData = [...prevData];
      newData[index] = { ...newData[index], model };
      return newData;
    });
  };

  const columns = [
    {
      title: "Patrimônio",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Modelo",
      dataIndex: "model",
      key: "model",
      render: (_: any, record: CodeData, index: number) => (
        <SelectModelo
          index={index}
          handleModelChange={handleModelChange}
          initialValue={record.model}
        />
      ),
    },
  ];

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
    setDataSource([]);
  };

  const beforeUpload: UploadProps["beforeUpload"] = (file: File) => {
    if (file.type !== "text/plain") {
      notify({
        type: "error",
        message: "O arquivo deve ser um arquivo de texto (.txt)",
      });
      return Upload.LIST_IGNORE;
    }
    handleFileRead(file);
    return false;
  };

  const handleFileRead = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const lines = text
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line.length > 0);

      const formattedData = lines.map((line, index) => ({
        uid: index,
        name: line,
        model: "",
        addedBy: user.email,
      }));

      setDataSource(formattedData);
    };
    reader.onerror = () => {
      notify({
        type: "error",
        message: "Erro ao ler o arquivo",
      });
    };
    reader.readAsText(file);
  };

  const handleSave = async () => {
    if (dataSource.length === 0) {
      notify({
        type: "error",
        message: "Nenhum item para salvar",
      });
      return;
    }

    const itemsWithoutModel = dataSource.filter(
      (item) => !item.model || item.model.trim() === ""
    );

    if (itemsWithoutModel.length > 0) {
      const patrimônios = itemsWithoutModel.map((item) => item.name).join(", ");
      notify({
        type: "error",
        message: `Selecione um modelo para os patrimônios: ${patrimônios}`,
      });
      return;
    }

    try {
      const promises = dataSource.map((item) =>
        postDepositComputer({
          name: item.name,
          model: item.model,
          addedBy: user.email,
        })
      );

      await Promise.all(promises);

      emitDepositCreate();
      notify({
        type: "success",
        message: "Items adicionados com sucesso",
      });
      onClose();
    } catch (error) {
      notify({
        type: "error",
        message: "Erro ao salvar os items",
      });
    }
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
          margin: "5px",
        }}
        onClick={showDrawer}
      >
        <BiSolidFileTxt size={20} />
      </Button>
      <Drawer
        title="Adicionar Códigos"
        placement="right"
        open={open}
        closable={false}
        onClose={onClose}
        style={{
          zIndex: 1000,
          height: "100%",
          overflow: "auto",
          backgroundColor: "#1c1c1c",
        }}
        extra={
          <Space>
            <Button onClick={onClose}>X</Button>
            <Button type="primary" onClick={handleSave} disabled={isPending}>
              {isPending ? <Spin /> : "Salvar"}
            </Button>
          </Space>
        }
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Upload
            style={{ width: "100%" }}
            beforeUpload={beforeUpload}
            accept=".txt"
            showUploadList={false}
          >
            <Button icon={<UploadOutlined />}>Selecionar Arquivo (.txt)</Button>
          </Upload>

          {dataSource.length > 0 && (
            <Table
              bordered
              dataSource={dataSource}
              columns={columns}
              pagination={false}
              style={{ marginTop: "20px", width: "100%" }}
              rowClassName={() => "editable-row"}
            />
          )}
        </div>
      </Drawer>
    </>
  );
};

export default AddDepositFile;
