import {
  Button,
  GetRef,
  Input,
  Popconfirm,
  Space,
  Switch,
  Table,
  TableColumnType,
} from "antd";
import {
  useDeleteDepositComputer,
  useGetDepositComputer,
  useUpdateDepositComputer,
} from "../../lib/react-query/queriesAndMutations";
import ModalNotesDeposit from "../modals/model-notes-deposit";
import { DataTypeTableStock } from "../../types/DataType";
import EditDepositComputer from "./edit/edit-deposit-computer";
import { FaTrashAlt } from "react-icons/fa";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import React, { useRef, useState } from "react";
import { FilterDropdownProps } from "antd/es/table/interface";
import { useNotify } from "../../hooks/useNotify";
// import useSocket from "../../hooks/useSocket";
import { useSocket } from "../../context/SocketContext";

type InputRef = GetRef<typeof Input>;

type DataIndex = keyof DataTypeTableStock;

const TableInUseComputer: React.FC = () => {
  const { data, isPending } = useGetDepositComputer({ inUse: true });
  const { mutate: updateDepositComputer } = useUpdateDepositComputer();
  const { mutate: deleteDepositComputer } = useDeleteDepositComputer();
  const { notify, contextHolder } = useNotify();
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);
  const { emitDepositDelete, emitDepositUpdate } = useSocket();

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

  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): TableColumnType<DataTypeTableStock> => ({
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
        ?.toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()) ?? false,
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

  const handleDelete = (record: DataTypeTableStock) => {
    emitDepositDelete();
    deleteDepositComputer(record);
    notify({
      type: "success",
      message: "Item deletado com sucesso",
    });
  };

  const handleUpdate = (id: string, inUse: boolean) => {
    updateDepositComputer({
      id,
      inUse,
    });
    emitDepositUpdate();
    notify({
      type: "success",
      message: "Item atualizado com sucesso",
    });
  };

  const columns = [
    {
      title: "Nome",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Ano",
      dataIndex: "year",
      key: "year",
      ...getColumnSearchProps("year"),
    },
    {
      title: "Modelo",
      dataIndex: "model",
      key: "model",
      ...getColumnSearchProps("model"),
    },
    {
      title: "Observações",
      dataIndex: "notes",
      key: "notes",
      render: (_: string, record: DataTypeTableStock) => (
        <ModalNotesDeposit
          data={{
            id: record.id,
            notes: record.notes || "",
          }}
        />
      ),
    },
    {
      title: "Em Uso",
      dataIndex: "inUse",
      key: "inUse",
      render: (_: string, record: DataTypeTableStock) => (
        <Switch
          checkedChildren="Sim"
          unCheckedChildren="Não"
          checked={record.inUse}
          onChange={(checked) => handleUpdate(record.id, checked)}
        />
      ),
    },
    {
      title: "Ações",
      dataIndex: "actions",
      key: "actions",
      render: (_: string, record: DataTypeTableStock) => (
        <>
          <EditDepositComputer
            initialValue={{
              id: record.id,
              name: record.name,
              year: Number(record.year),
              model: record.model,
            }}
          />
          <Popconfirm
            title="Confirmar delete?"
            onConfirm={() => handleDelete(record)}
          >
            <FaTrashAlt
              size={15}
              style={{
                cursor: "pointer",
              }}
            />
          </Popconfirm>
        </>
      ),
      width: "100px",
    },
  ];

  return (
    <>
      {contextHolder}
      <Table
        columns={columns}
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

export default TableInUseComputer;
