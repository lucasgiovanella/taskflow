import React from "react";
import { Card } from "antd";
import { TableHistoricComputer } from "../../components";

// Componente de página de histórico de computadores
const Historic: React.FC = () => {
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
      {/* Componente de tabela de histórico de computadores */}
      <TableHistoricComputer />
    </Card>
  );
};

export default Historic; // Exporta o componente de histórico de computadores
