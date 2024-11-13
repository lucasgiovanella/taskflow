import { Button, Modal, Space, Tooltip } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useState } from "react";
import { CgNotes } from "react-icons/cg";
import { useUpdateDepositComputer } from "../../lib/react-query/queriesAndMutations";
import { useNotify } from "../../hooks/useNotify";
// import useSocket from "../../hooks/useSocket";
import { useSocket } from "../../context/SocketContext";

interface ModalNotesDepositProps {
  data: {
    id: string;
    notes: string;
  };
}

const ModalNotesDeposit = ({ data }: ModalNotesDepositProps) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [content, setContent] = useState(data.notes);
  const { mutate: updateDepositComputer } = useUpdateDepositComputer();
  const { notify, contextHolder } = useNotify();
  const { emitComputerUpdate } = useSocket();
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSave = () => {
    updateDepositComputer({
      id: data.id,
      notes: content,
    });
    emitComputerUpdate();
    notify({
      type: "success",
      message: "Observações salvas com sucesso!",
    });
    setIsModalVisible(false);
  };

  useEffect(() => {
    setContent(data.notes);
  }, [data.notes]);

  return (
    <>
      {contextHolder}
      <Tooltip title={content} placement="topLeft">
        <Button
          type="text"
          onClick={showModal}
          style={{ position: "relative" }}
        >
          <CgNotes size={20} />
        </Button>
      </Tooltip>
      <Modal
        key={1}
        title="Observações"
        open={isModalVisible}
        closeIcon={false}
        footer={[
          <Space key="footer-space">
            <Button key="back" onClick={handleCancel}>
              Cancelar
            </Button>
            <Button key="submit" type="primary" onClick={handleSave}>
              Salvar
            </Button>
          </Space>,
        ]}
      >
        <TextArea
          value={content}
          autoSize={{ minRows: 2, maxRows: 6 }}
          onChange={(e) => setContent(e.target.value)}
        />
      </Modal>
    </>
  );
};

export default ModalNotesDeposit;
