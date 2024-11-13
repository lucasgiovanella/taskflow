import { Avatar, Button, Divider, Popover } from "antd";
import { urlBasePublic } from "../../lib/server/config";
import { useUserContext } from "../../context/AuthContext";
import { signOut } from "../../lib/server/api";
import { useNavigate } from "react-router-dom";

const AvatarProfile = () => {
  const { user } = useUserContext();
  const navigate = useNavigate();

  return (
    <Popover
      content={
        <div>
          <p>{user.name}</p>
          <p>{user.email}</p>
          <p>{user.role}</p>
          <Divider
            style={{
              margin: "10px 0",
            }}
          />
          <Button
            type="primary"
            onClick={() => navigate("/profile")}
            style={{ width: "100%" }}
          >
            Perfil
          </Button>
          <Button
            type="dashed"
            onClick={() => signOut()}
            style={{ width: "100%", marginTop: "10px" }}
          >
            Logout
          </Button>
        </div>
      }
    >
      <Avatar
        size={40}
        style={{
          right: "1px",
          cursor: "pointer",
        }}
        src={
          user.imageId !== null && user.imageId !== ""
            ? `${urlBasePublic}${user.imageId}`
            : `${urlBasePublic}/public/images/placeholder_default.png`
        }
        alt="avatar"
      />
    </Popover>
  );
};

export default AvatarProfile;
