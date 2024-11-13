import { useState, useCallback } from "react";
import { Input, Button, message } from "antd";
import { useDropzone } from "react-dropzone";
import { useUserContext } from "../../context/AuthContext";
import { useUpdateProfile, useUpdateProfileImage } from "../../lib/react-query/queriesAndMutations";
import { UserDataUpdate } from "../../types/DataType";

const beforeUpload = (file: File) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("Você só pode enviar arquivos JPG/PNG!");
    return false;
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("A imagem deve ser menor que 2MB!");
    return false;
  }
  return true;
};

const ProfilePage = () => {
  const [dataUpdate, setDataUpdate] = useState<UserDataUpdate>({
    name: "",
    password: "",
    avatar: null,
  });
  const [loading, setLoading] = useState(false);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const { user } = useUserContext();
  const { mutate: updateCurrentProfile } = useUpdateProfile();
  const { mutate: updateCurrentProfileImage } = useUpdateProfileImage();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file && beforeUpload(file)) {
      setAvatarFile(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/jpeg": [".jpeg", ".jpg"], "image/png": [".png"] },
    maxFiles: 1,
    maxSize: 2097152,
  });

  const handleSave = () => {
    setLoading(true);
    try {
      // Atualiza a imagem do perfil se um arquivo for selecionado
      if (avatarFile) {
        updateCurrentProfileImage({ id: user.id, avatar: avatarFile });
      }

      // Atualiza os dados do perfil se nome ou senha forem fornecidos
      if (dataUpdate.name || dataUpdate.password) {
        updateCurrentProfile({ id: user.id, name: dataUpdate.name, password: dataUpdate.password });
      }

      message.success("Perfil atualizado com sucesso!");
    } catch (error) {
      message.error("Erro ao atualizar perfil");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", padding: "20px" }}>
      <h2>Personalização de Usuário</h2>

      <div
        {...getRootProps()}
        style={{
          border: "2px dashed #d9d9d9",
          borderRadius: "8px",
          padding: "20px",
          textAlign: "center",
          cursor: "pointer",
          marginBottom: "20px",
        }}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Solte a imagem aqui...</p>
        ) : (
          <p>Arraste e solte uma imagem aqui, ou clique para selecionar</p>
        )}
        {avatarFile && <p>{avatarFile.name}</p>}
      </div>

      <Input
        placeholder="Nome"
        size="large"
        style={{ marginBottom: "20px" }}
        onChange={(e) =>
          setDataUpdate({
            ...dataUpdate,
            name: e.target.value,
          })
        }
      />

      <Input.Password
        placeholder="Nova Senha"
        size="large"
        style={{ marginBottom: "10px" }}
        onChange={(e) =>
          setDataUpdate({ ...dataUpdate, password: e.target.value })
        }
      />

      <Button type="primary" onClick={handleSave} block loading={loading}>
        Salvar Alterações
      </Button>
    </div>
  );
};

export default ProfilePage;
