import React from "react";
import { Card } from "antd";
import { TableRemovedComputer } from "../../components"; // Importa o componente de tabela de computadores removidos
import AddRemovedComputer from "../../components/computadores/remocao/add-removed-computer"; // Importa o componente para adicionar computadores removidos

const RemovedComputers: React.FC = () => {
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
      {/* Componente para adicionar computadores removidos */}
      <AddRemovedComputer />
      {/* Componente de tabela de computadores removidos */}
      <TableRemovedComputer />
    </Card>
  );
};

export default RemovedComputers; // Exporta o componente de computadores removidos
