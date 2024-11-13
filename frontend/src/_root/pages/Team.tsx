import { Card } from "antd";
import TeamManagement from "../../components/team-management"; // Importa o componente de gerenciamento de equipe

// Componente de página de configurações
const Team = () => {
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
      {/* Componente de gerenciamento de equipe */}
      <TeamManagement />
    </Card>
  );
};

export default Team; // Exporta o componente de configurações
