import React from "react";
import { Card } from "antd";
import TableDeletedComputer from "../../components/computadores/remocao/table-removed-computer";

const Deleted: React.FC = () => {
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
      <TableDeletedComputer />
    </Card>
  );
};

export default Deleted;
