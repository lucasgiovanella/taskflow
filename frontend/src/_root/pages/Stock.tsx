import React from "react";
import { Card } from "antd";
import AddDepositComputer from "../../components/Deposito/create/add-deposit-computer";
import TableStockComputer from "../../components/Deposito/table-deposit-computer";

// Componente de página de histórico de computadores
const Stock: React.FC = () => {
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
      {/* Componente de tabela de estoque de computadores */}
      <AddDepositComputer />
      <TableStockComputer />
    </Card>
  );
};

export default Stock; // Exporta o componente de histórico de computadores