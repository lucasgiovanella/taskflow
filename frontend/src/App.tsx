import { Route, Routes, Navigate } from "react-router-dom";
import RootLayout from "./_root/RootLayout"; // Importa o layout principal da aplicação
import {
  Historic,
  InstalledComputers,
  RemovedComputers,
  Team,
  Stock,
  InUse,
  Profile,
} from "./_root/pages"; // Importa os componentes das páginas principais da aplicação
import { NotFound, Login } from "./_auth/pages"; // Importa os componentes das páginas de autenticação
import Exceptions from "./_root/pages/Exceptions";


function App() {
  return (
    <body>
      {/* Define as rotas da aplicação */}
      <Routes>
        {/* Rotas públicas */}
        <Route path="/login" element={<Login />} /> {/* Rota de login */}
        <Route path="*" element={<NotFound />} />{" "}
        {/* Rota de página não encontrada */}
        {/* Rotas privadas */}
        <Route element={<RootLayout />}>
          {" "}
          {/* Define o layout raiz para rotas privadas */}
          <Route
            path="/"
            element={<Navigate to="/computers-installation" />}
          />{" "}
          {/* Redireciona para a rota de computadores instalados por padrão */}
          {/* Grupo de rotas de Computadores */}
          <Route
            path="/computers-installation"
            element={<InstalledComputers />}
          />{" "}
          {/* Rota para a página de computadores instalados */}
          <Route
            path="/computers-remotion"
            element={<RemovedComputers />}
          />{" "}
          {/* Rota para a página de computadores removidos */}
          <Route path="/computers-historic" element={<Historic />} />{" "}
          {/* Rota para a página de histórico de computadores */}
          {/* Grupo de rotas de Depósito */}
          <Route path="/deposit-stock" element={<Stock />} />{" "}
          {/* Rota para a página de estoque no depósito */}
          <Route path="/deposit-inUse" element={<InUse />} />{" "}
          {/* Rota para a página de itens em uso no depósito */}
          {/* Rotas individuais */}
          <Route path="/exceptions" element={<Exceptions />} />{" "}
          {/* Rota para a página de exceções */}
          <Route path="/team" element={<Team />} />{" "}
          {/* Rota para a página da equipe */}
          <Route path="/profile" element={<Profile />} />{" "}
        </Route>
      </Routes>
    </body>
  );
}

export default App;
