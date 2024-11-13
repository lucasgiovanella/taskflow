import React, { useRef, useState } from "react";
import {
  Checkbox,
  GetRef,
  Input,
  Popconfirm,
  Switch,
  Table,
  TableColumnType,
} from "antd";
import { FaTrashAlt } from "react-icons/fa";
import { useUserContext } from "../../../context/AuthContext";
import {
  useUpdateComputer,
  useDeleteComputer,
  useGetComputer,
} from "../../../lib/react-query/queriesAndMutations";
import { DataTypeTableComputer } from "../../../types/DataType";
import type { ColumnType, FilterDropdownProps } from "antd/es/table/interface";
import EditableRow from "../../editable-row";
import EditableCell from "../../editable-cell";
import ModalPendences from "../../modals/modal-pendences";
import AddReplaceComputer from "../instalacao/add-replace-computer";
import { parseDate } from "../../../utils/parseDate";
import { useNotify } from "../../../hooks/useNotify";
import { Space, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
// import useSocket from "../../../hooks/useSocket";
import { useSocket } from "../../../context/SocketContext";

type InputRef = GetRef<typeof Input>;

type DataIndex = keyof DataTypeTableComputer;

interface EditableColumnType extends ColumnType<DataTypeTableComputer> {
  editable?: boolean;
}

const EditableTable: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);

  const { data, isPending } = useGetComputer({ checked: false, type: "ADD" });
  const { user } = useUserContext();
  const { mutate: updateComputer } = useUpdateComputer();
  const { mutate: deleteComputer } = useDeleteComputer();
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedComputer, setSelectedComputer] = useState<{
    computerName: string;
    requestor: string;
    replace: string;
  }>({ computerName: "", requestor: "", replace: "" });
  const { notify, contextHolder } = useNotify();
  const { emitComputerUpdate, emitComputerDelete } =
    useSocket();

  const handleSearch = (
    selectedKeys: string[],
    confirm: FilterDropdownProps["confirm"],
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  const handleSave = (row: DataTypeTableComputer) => {
    emitComputerUpdate();
    updateComputer({ ...row, updatedBy: user.email });
  };

  const handleCheckbox = (checked: boolean, record: DataTypeTableComputer) => {
    setSelectedComputer({
      computerName: record.computerName,
      requestor: user.email,
      replace: record.replace,
    });
    updateComputer({
      id: record.id,
      checked: checked,
      updatedBy: user.email,
    });
    emitComputerUpdate();
    if (record.replace !== null && record.replace !== "")
      setDrawerVisible(true);
    notify({
      type: "success",
      message: "Computador atualizado!",
    });
  };

  const handleDelete = (record: DataTypeTableComputer) => {
    emitComputerDelete();
    deleteComputer({
      id: record.id,
    });
    notify({
      type: "success",
      message: "Computador deletado com sucesso!",
    });
  };

  const handleStatus = (checked: boolean, record: DataTypeTableComputer) => {
    emitComputerUpdate();
    updateComputer({ id: record.id, status: checked, updatedBy: user.email });
  };

  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): TableColumnType<DataTypeTableComputer> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{ padding: 8, backgroundColor: "black" }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={"Pesquisar"}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block", color: "black" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 100 }}
          >
            Pesquisar
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filtrar
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            Fechar
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#37996b" : "white" }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(
          () => (searchInput.current as HTMLInputElement | null)?.select(),
          100
        );
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const defaultColumns: EditableColumnType[] = [
    {
      title: "Nome",
      dataIndex: "computerName",
      render: (computerName: string) => computerName.toUpperCase(),
      editable: true,
      ...getColumnSearchProps("computerName"),
    },
    {
      title: "MAC",
      dataIndex: "macAddress",
      render: (macAddress: string) =>
        macAddress.replace(/-/g, ":").toUpperCase(),
    },
    {
      title: "Criação",
      dataIndex: "createdAt",
      render: (date: string) => parseDate(date),
    },
    {
      title: "Responsável",
      dataIndex: "responsible",
      ...getColumnSearchProps("responsible"),
      render: (responsible: string) => responsible.split("@")[0],
      editable: true,
    },
    {
      title: "Local",
      dataIndex: "local",
      editable: true,
      ...getColumnSearchProps("local"),
    },
    {
      title: "Substituição",
      dataIndex: "replace",
      editable: true,
      ...getColumnSearchProps("replace"),
    },
    {
      title: "Pendências",
      dataIndex: "pendences",
      render: (pendences: string, record: DataTypeTableComputer) => (
        <ModalPendences data={{ ...record, pendences }} />
      ),
      width: "120px",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status: boolean, record: DataTypeTableComputer) => (
        <Switch
          checked={status}
          disabled={record.responsible !== user.email && user.role !== "ADMIN"}
          onChange={(checked) => handleStatus(checked, record)}
          size="small"
        />
      ),
      width: "80px",
    },
    {
      title: "Ações",
      dataIndex: "actions",
      render: (checked: boolean, record: DataTypeTableComputer) => (
        <div style={{ gap: 10, display: "flex", alignItems: "center" }}>
          <Checkbox
            disabled={
              record.pendences !== "" || user.role !== "ADMIN" || !record.status
            }
            defaultChecked={checked}
            onChange={(e) => handleCheckbox(e.target.checked, record)}
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

  const columns = defaultColumns.map((col) => {
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
    <div>
      {contextHolder}
      <Table
        components={{ body: { row: EditableRow, cell: EditableCell } }}
        columns={columns as EditableColumnType[]}
        dataSource={data}
        rowKey={(record) => record.id}
        loading={isPending}
        scroll={{ y: 500 }}
        style={{ width: "100%", height: "100%" }}
        pagination={{
          position: ["topRight"],
          showSizeChanger: true,
        }}
      />
      <AddReplaceComputer
        nameComputer={selectedComputer.replace}
        requestorComputer={selectedComputer.requestor}
        open={drawerVisible}
        onClose={() => setDrawerVisible(false)}
      />
    </div>
  );
};

export default EditableTable;
