import React from "react";
import { Card } from "antd";
import { TableInstalledComputer } from "../../components";
import AddInstalledComputer from "../../components/computadores/instalacao/add-installed-computer";

// Componente de página de computadores instalados
const InstalledComputers: React.FC = () => {
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
      <AddInstalledComputer />
      <TableInstalledComputer />
    </Card>
  );
};

export default InstalledComputers;
