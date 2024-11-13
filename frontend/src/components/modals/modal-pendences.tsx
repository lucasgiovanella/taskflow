import { useEffect, useState } from "react";
import { Button, Modal, Space, Spin, Tooltip } from "antd";
import TextArea from "antd/es/input/TextArea";
import { FaEraser, FaTasks } from "react-icons/fa";
import {
  useSendMail,
  useUpdateComputer,
} from "../../lib/react-query/queriesAndMutations";
import { useUserContext } from "../../context/AuthContext";
import { MdOutlineMarkEmailUnread } from "react-icons/md";
import { useNotify } from "../../hooks/useNotify";
// import useSocket from "../../hooks/useSocket";
import { useSocket } from "../../context/SocketContext";

interface ModalPendencesProps {
  data: {
    id: string;
    computerName: string;
    responsible: string;
    pendences: string;
    type: string;
    updatedBy: string;
    updatedAt: string;
  };
}

const ModalPendences = ({ data }: ModalPendencesProps) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [content, setContent] = useState(data.pendences);
  const { mutate: updateComputer } = useUpdateComputer();
  const { mutate: sendMail, isPending } = useSendMail();
  const { user } = useUserContext();
  const { notify, contextHolder } = useNotify();
  const { emitComputerUpdate } = useSocket();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setTimeout(() => {
      updateComputer({
        id: data.id,
        pendences: content,
        updatedBy: user.email,
      });
      notify({
        type: "success",
        message: "Pendências salvas com sucesso!",
      });
      emitComputerUpdate();
      setIsModalVisible(false);
    }, 0);
  };

  const handleCancel = () => {
    setContent(data.pendences);
    setIsModalVisible(false);
  };

  const handleSendMail = () => {
    try {
      sendMail({
        title: "Pendências de instalação",
        computerName: data.computerName,
        body: content,
        to: data.responsible || "",
      });
      notify({
        type: "success",
        message: "E-mail enviado com sucesso",
      });
    } catch (error) {
      notify({
        type: "error",
        message: "Erro ao enviar e-mail",
      });
    }
  };

  useEffect(() => {
    setContent(data.pendences);
  }, [data.pendences]);

  return (
    <>
      {contextHolder}
      <Tooltip
        title={
          content !== ""
            ? content
                .split("\n")
                .map((line, index) => <p key={index}>{line}</p>)
            : null
        }
        placement="topLeft"
      >
        <Button
          type="text"
          onClick={showModal}
          style={{ position: "relative" }}
        >
          <FaTasks />
        </Button>
      </Tooltip>
      <Modal
        key={data.id}
        title="Pendências"
        open={isModalVisible}
        closeIcon={false}
        footer={[
          <Space key="footer-space">
            {data.type === "ADD" && user.role === "ADMIN" && (
              <Tooltip title="Notificar responsável">
                <Button onClick={handleSendMail}>
                  {isPending ? <Spin /> : <MdOutlineMarkEmailUnread />}
                </Button>
              </Tooltip>
            )}
            <Button key="clean" onClick={() => setContent("")}>
              <FaEraser />
            </Button>

            <Button key="back" onClick={handleCancel}>
              Cancelar
            </Button>
            <Button key="submit" type="primary" onClick={handleOk}>
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
        {data.updatedBy && (
          <p
            style={{
              marginTop: "10px",
              fontSize: "12px",
              color: "grey",
            }}
          >
            *Atualizado por: <strong>{data.updatedBy}</strong> em{" "}
            {data.updatedAt}
          </p>
        )}
      </Modal>
    </>
  );
};

export default ModalPendences;
