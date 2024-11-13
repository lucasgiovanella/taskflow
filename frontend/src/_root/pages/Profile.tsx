import { Card } from "antd";
import ProfilePage from "../../components/profile/profile-page";

const Profile = () => {
  return (
    <Card
      style={{
        width: "100%",
        height: "100%",
        borderRadius: "10px",
        border: "1px solid #333",
        margin: "10px",
      }}
    >
      <ProfilePage />
    </Card>
  );
};

export default Profile;
