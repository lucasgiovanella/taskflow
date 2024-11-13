import { useAllUsers } from "../lib/react-query/queriesAndMutations";
import { Avatar, Space, Spin, Typography } from "antd";
import { urlBasePublic } from "../lib/server/config";
import { useUserContext } from "../context/AuthContext";
import TeamActions from "./team-actions";
import AddNewUser from "./add-new-user";
import { IUser } from "../types";

const { Title } = Typography;

const TeamManagement = () => {
  const { data: users, isLoading } = useAllUsers();
  const { user: currentUser } = useUserContext();

  return (
    <>
      <Space
        direction="horizontal"
        style={{
          display: "flex",
          justifyContent: "start",
          gap: "20px",
        }}
      >
        <Title level={2}>Equipe:</Title>
        {currentUser.role === "ADMIN" && <AddNewUser />}
      </Space>
      {isLoading ? (
        <Spin />
      ) : (
        <div
          style={{
            maxHeight: "600px",
            overflowY: "auto",
            borderRadius: "5px",
            padding: "10px",
            marginTop: "20px",
          }}
        >
          <ul
            style={{
              listStyleType: "none",
              padding: 0,
              margin: 0,
            }}
          >
            {users.map((user: IUser) => (
              <li
                key={user.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  margin: "10px 0",
                  border: "1px solid #37996b",
                  borderRadius: "5px",
                  padding: "10px",
                }}
              >
                <Avatar
                  size={40}
                  src={
                    user.imageId !== null && user.imageId !== ""
                      ? `${urlBasePublic}${user.imageId}`
                      : `${urlBasePublic}/public/images/placeholder_default.png`
                  }
                  alt="avatar"
                />
                <div style={{ marginLeft: "20px", flex: 1 }}>
                  <div style={{ fontWeight: "bold" }}>{String(user.name)}</div>
                  <div>{String(user.email)}</div>
                </div>
                {currentUser.role === "ADMIN" && <TeamActions user={user} />}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default TeamManagement;
