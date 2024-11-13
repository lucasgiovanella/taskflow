import { Badge, Layout, theme } from "antd";
import { useUserContext } from "../context/AuthContext";
import AvatarProfile from "./profile/avatar-profile";
import { useSocket } from "../context/SocketContext";

const { Header } = Layout;

const CustomHeader = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const { user } = useUserContext();
  const { isConnected } = useSocket();

  return (
    <Header
      style={{
        background: colorBgContainer,
        borderRadius: borderRadiusLG,
        margin: "10px",
        padding: "0 20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        border: "1px solid #333",
      }}
    >
      <div
        style={{
          display: "flex",
        }}
      >
        <span
          style={{
            fontSize: "1.5rem",
            fontFamily: "Bebas Neue",
          }}
        >
          Bem - vindo, {user.name}
        </span>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <Badge status={isConnected ? "success" : "warning"} />
        <AvatarProfile />
      </div>
    </Header>
  );
};

export default CustomHeader;
