import {
  Card,
  Input,
  Typography,
  Button,
  Space,
  Form,
} from "antd";
import "../../index.css";
import { useSignInAccount } from "../../lib/react-query/queriesAndMutations";
import { useUserContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useNotify } from "../../hooks/useNotify";

const { Title } = Typography;

const delay = () => new Promise((res) => setTimeout(res, 1000));

const Login = () => {
  const { mutateAsync: signInAccount } = useSignInAccount();
  const [isLoading, setIsLoading] = useState(false);
  const { checkAuthUser } = useUserContext();
  const navigate = useNavigate();
  const { notify, contextHolder } = useNotify();

  async function handleLogin(values: { email: string; password: string }) {
    setIsLoading(true);

    try {
      // Faz a requisição de login
      const session = await signInAccount(values);

      if (!session) {
        notify({
          type: "error",
          message: "Erro ao entrar no sistema!",
        });
        setIsLoading(false);
        return;
      }

      // Verifica se o login foi bem-sucedido
      const isLoggedIn = await checkAuthUser();

      if (isLoggedIn) {
        notify({
          type: "success",
          message: "Login efetuado com sucesso!",
        });
        await delay();
        setIsLoading(false);
        return navigate("/computers-installation");
      } else {
        notify({
          type: "error",
          message: "Erro ao entrar no sistema!",
        });
        setIsLoading(false);
      }
    } catch (error) {
      notify({
        type: "error",
        message: "Erro ao entrar no sistema!",
      });
      console.error("Erro no processo de login", error);
    }

    setIsLoading(false);
  }

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        backgroundImage: "url('/images/login.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      {contextHolder}
      {/* Overlay mais escuro */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.7)", // Mais escuro
          zIndex: 1,
        }}
      ></div>
      {/* Cartão de login com efeito vidro escuro */}
      <Card
        style={{
          // width: "70vw",
          maxWidth: "400px",
          maxHeight: "500px",
          padding: "24px",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "15px", // Borda arredondada
          border: "1px solid rgba(255, 255, 255, 0.3)", // Borda leve
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          zIndex: 2,
        }}
      >
        <Title
          level={1}
          style={{ fontFamily: "Bebas Neue", zIndex: 2, color: "white" }}
        >
          TaskFlow
        </Title>
        <Title level={2} style={{ fontFamily: "Bebas Neue", color: "white" }}>
          Login
        </Title>
        {/* Formulário de login */}
        <Form name="login-form" onFinish={handleLogin}>
          <Space direction="vertical" size={15}>
            <Form.Item
              name="email"
              rules={[{ required: true, message: "Insira seu email!" }]}
            >
              <Input
                style={{
                  color: "#fff",
                  backgroundColor: "#c1c1c1",
                  border: "1px solid #444",
                  borderRadius: "2px",
                }}
                size="large"
                placeholder="Email"
                // placeholderStyle={{ color: "#888" }}
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: "Insira sua senha!" }]}
            >
              <Input.Password
                style={{
                  color: "#fff",
                  backgroundColor: "#333",
                  border: "1px solid #444",
                  borderRadius: "2px",
                }}
                size="large"
                placeholder="Senha"
              />
            </Form.Item>
            <Form.Item>
              <Button
                size="large"
                style={{
                  width: "100%",
                  backgroundColor: "#37996b",
                  color: "#fff",
                  border: "1px solid #37996b",
                  borderRadius: "4px",
                }}
                htmlType="submit"
              >
                {isLoading ? (
                  "Entrando..."
                ) : (
                  "Entrar"
                )}
              </Button>
            </Form.Item>
          </Space>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
