import { useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { GetRef, TableColumnsType, TableColumnType, Tag } from "antd";
import { Button, Input, Popconfirm, Space, Table } from "antd";
import type { FilterDropdownProps } from "antd/es/table/interface";
import Highlighter from "react-highlight-words";
import { DataTypeTableComputer } from "../../../types/DataType";
import { FaTrashAlt } from "react-icons/fa";
import { MdOutlineSettingsBackupRestore } from "react-icons/md";
import {
  useDeleteComputer,
  useGetComputer,
  useUpdateComputer,
} from "../../../lib/react-query/queriesAndMutations";
import { useUserContext } from "../../../context/AuthContext";
import { parseDate } from "../../../utils/parseDate";
import { useNotify } from "../../../hooks/useNotify";
// import useSocket from "../../../hooks/useSocket";
import { useSocket } from "../../../context/SocketContext";

type InputRef = GetRef<typeof Input>;

type DataIndex = keyof DataTypeTableComputer;

const TableHistoricComputer = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);

  const { data, isPending } = useGetComputer({ checked: true });
  const { mutate: updateComputer } = useUpdateComputer();
  const { mutate: deleteComputer } = useDeleteComputer();
  const { user } = useUserContext();
  const { notify, contextHolder } = useNotify();
  const { emitComputerDelete, emitComputerUpdate } = useSocket();

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

  const handleRestore = (record: DataTypeTableComputer) => {
    updateComputer({
      id: record.id,
      checked: false,
      updatedBy: user.email,
    });
    emitComputerUpdate();
    notify({
      type: "success",
      message: "Computador restaurado!",
    });
  };

  const onConfirm = (record: DataTypeTableComputer) => {
    deleteComputer({
      id: record.id,
    });
    emitComputerDelete();
    notify({
      type: "success",
      message: "Computador deletado!",
    });
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

  const columnsInstalledComputers: TableColumnsType<DataTypeTableComputer> = [
    {
      title: "Nome",
      dataIndex: "computerName",
      ...getColumnSearchProps("computerName"),
      render: (computerName: string) => computerName.toUpperCase(),
    },
    {
      title: "MAC",
      dataIndex: "macAddress",
      ...getColumnSearchProps("macAddress"),
      render: (macAddress: string) => (
        <span style={{ color: "white" }}>
          {macAddress.replace(/-/g, ":").toUpperCase()}
        </span>
      ),
    },
    {
      title: "Criação",
      dataIndex: "createdAt",
      ...getColumnSearchProps("createdAt"),
      render: (date: string) => parseDate(date),
    },
    {
      title: "Responsável",
      dataIndex: "responsible",
      ...getColumnSearchProps("responsible"),
      render: (responsible: string) => responsible.split("@")[0],
    },
    {
      title: "Substituição",
      dataIndex: "replace",
      ...getColumnSearchProps("replace"),
    },
    {
      title: "TAG",
      dataIndex: "type",
      render: (type: string) => (
        <Tag>{type === "ADD" ? "Instalada" : "Removida"}</Tag>
      ),
      filters: [
        {
          text: "Instalada",
          value: "ADD",
        },
        {
          text: "Removida",
          value: "REMO",
        },
      ],
      onFilter: (value, record) => record.type.indexOf(value.toString()) === 0,
      width: "120px",
    },
    {
      title: "Local",
      dataIndex: "local",
      ...getColumnSearchProps("local"),
      width: "120px",
    },
    {
      title: "Descarte",
      dataIndex: "isDroped",
      render: (isDroped: boolean, record: DataTypeTableComputer) =>
        record.type === "REMO" ? (isDroped ? "Sim" : "Não") : "-----",
      width: "120px",
    },
    {
      title: "Ações",
      dataIndex: "actions",
      render: (_, record: DataTypeTableComputer) =>
        user.role === "ADMIN" &&
        data.length >= 1 && (
          <div
            style={{
              gap: 10,
              display: "flex",
              alignItems: "center",
            }}
          >
            <Popconfirm
              title="Restaurar?"
              onConfirm={() => handleRestore(record)}
            >
              <MdOutlineSettingsBackupRestore
                size={20}
                style={{
                  cursor: "pointer",
                }}
              />
            </Popconfirm>
            <Popconfirm
              title="Confirmar delete?"
              onConfirm={() => {
                onConfirm(record);
              }}
            >
              <FaTrashAlt
                size={15}
                style={{
                  cursor: "pointer",
                }}
              />
            </Popconfirm>
          </div>
        ),
      width: "80px",
    },
  ];

  return (
    <>
      {contextHolder}
      <Table
        columns={columnsInstalledComputers}
        loading={isPending}
        dataSource={data}
        rowKey={(data) => data.id}
        showSorterTooltip={false}
        style={{ width: "100%", height: "100%" }}
        scroll={{ y: 500 }}
        pagination={{
          position: ["topRight"],
          showSizeChanger: true,
        }}
      />
    </>
  );
};

export default TableHistoricComputer;
