import React from "react";
import { Checkbox, Popconfirm, Table } from "antd";
import { FaTrashAlt } from "react-icons/fa";
import {
  useDeleteComputer,
  useGetComputer,
  useSendMail,
  useUpdateComputer,
} from "../../../lib/react-query/queriesAndMutations";
import ModalPendences from "../../modals/modal-pendences";
import { useUserContext } from "../../../context/AuthContext";
import { DataTypeTableComputer } from "../../../types/DataType";
import EditableRow from "../../editable-row";
import EditableCell from "../../editable-cell";
import { parseDate } from "../../../utils/parseDate";
import { useNotify } from "../../../hooks/useNotify";
// import useSocket from "../../../hooks/useSocket";
import { useSocket } from "../../../context/SocketContext";

const TableRemovedComputer: React.FC = () => {
  const { data, isPending } = useGetComputer({ checked: false, type: "REMO" });
  const { user } = useUserContext();
  const { mutate: updateComputer } = useUpdateComputer();
  const { mutate: sendMail } = useSendMail();
  const { mutate: deleteComputer } = useDeleteComputer();
  const { notify, contextHolder } = useNotify();
  const { emitComputerDelete, emitComputerUpdate } =
    useSocket();

  const handleSave = (row: DataTypeTableComputer) => {
    updateComputer({ ...row, updatedBy: user.email });
  };

  const handleCheckboxChange = (
    checked: boolean,
    record: DataTypeTableComputer
  ) => {
    updateComputer({
      id: record.id,
      checked: checked,
      updatedBy: user.email,
    });
    sendMail({
      title: "Pendências de Remoção",
      computerName: record.computerName,
      body: "Pendências resolvidas",
      to: record.responsible,
    });
    emitComputerUpdate();
    notify({
      type: "success",
      message: "Pendências resolvidas com sucesso!",
    });
  };

  const handleDelete = (record: DataTypeTableComputer) => {
    deleteComputer({
      id: record.id,
    });
    emitComputerDelete();
    notify({
      type: "success",
      message: "Computador deletado com sucesso!",
    });
  };

  const columns = [
    {
      title: "Nome",
      dataIndex: "computerName",
      render: (computerName: string) => computerName.toUpperCase(),
      editable: true,
    },
    {
      title: "Criação",
      dataIndex: "createdAt",
      render: (date: string) => parseDate(date),
    },
    {
      title: "Solicitante",
      dataIndex: "responsible",
      render: (responsible: string) => responsible.split("@")[0],
      editable: true,
    },
    {
      title: "Descarte",
      dataIndex: "isDroped",
      render: (isDroped: boolean) => (isDroped ? "Sim" : "Não"),
    },
    {
      title: "Pendências",
      dataIndex: "pendences",
      render: (pendences: string, record: DataTypeTableComputer) => (
        <ModalPendences
          data={{
            id: record.id,
            computerName: record.computerName,
            responsible: record.responsible,
            pendences,
            type: record.type,
            updatedBy: record.updatedBy,
            updatedAt: record.updatedAt,
          }}
        />
      ),
      width: "120px",
    },
    {
      title: "Ações",
      dataIndex: "actions",
      render: (checked: boolean, record: DataTypeTableComputer) => (
        <div style={{ gap: 10, display: "flex", alignItems: "center" }}>
          <Checkbox
            disabled={record.pendences !== "" || user.role !== "ADMIN"}
            defaultChecked={checked}
            onChange={(e) => handleCheckboxChange(e.target.checked, record)}
          />
          {user.role === "ADMIN" && (
            <Popconfirm
              title="Confirmar delete?"
              onConfirm={() => handleDelete(record)}
            >
              <FaTrashAlt size={15} style={{ cursor: "pointer" }} />
            </Popconfirm>
          )}
        </div>
      ),
      width: "80px",
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: DataTypeTableComputer) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });

  return (
    <>
      {contextHolder}
      <Table
        components={{ body: { row: EditableRow, cell: EditableCell } }}
        columns={mergedColumns}
        loading={isPending}
        dataSource={data}
        rowKey={(record) => record.id}
        showSorterTooltip={false}
        scroll={{ y: 500 }}
        style={{ width: "100%", height: "100%" }}
        pagination={{
          position: ["topRight"],
          showSizeChanger: true,
        }}
      />
    </>
  );
};

export default TableRemovedComputer;
