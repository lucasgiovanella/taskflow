import React from "react";
import { Card } from "antd";
import TableInUseComputer from "../../components/Deposito/table-inUse-computer";

const InUse: React.FC = () => {
  return (
    // Cartão para estilização
    <Card
      style={{
        width: "100%",
        height: "100%",
        borderRadius: "10px",
        border: "1px solid #333",
        margin: "10px",
      }}
    >
      <TableInUseComputer />
    </Card>
  );
};

export default InUse;
