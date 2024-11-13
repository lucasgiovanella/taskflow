import "./index.css"; // Importa o arquivo CSS principal da aplicação
import "antd/dist/reset.css"; // Importa o arquivo CSS de reset para o Ant Design
import App from "./App.tsx"; // Importa o componente principal da aplicação
import ptBr from "antd/lib/locale/pt_BR";
import ReactDOM from "react-dom/client";

import { ConfigProvider } from "antd";
import { BrowserRouter } from "react-router-dom";
import { SocketProvider } from "./context/SocketContext.tsx"; // Adicionar import
import { QueryProvider } from "./lib/react-query/QueryProvider.tsx"; // Importa o provedor de consulta para a biblioteca React Query
import AuthProvider from "./context/AuthContext.tsx"; // Importa o provedor de autenticação

// Renderiza o aplicativo na raiz do DOM
ReactDOM.createRoot(document.getElementById("root")!).render(
  // Provedor de roteamento do React
  <BrowserRouter>
    {/* Provedor de autenticação */}
    <AuthProvider>
      <SocketProvider> {/* Adicionar SocketProvider aqui */}
        {/* Provedor de consulta */}
        <QueryProvider>
          {/* Provedor de configuração global do Ant Design */}
          <ConfigProvider
            locale={ptBr} // Define o local para Português do Brasil
            theme={{
              token: {
                colorPrimary: "#37996b", 
                colorBgLayout: "#1c1c1c", 
                colorText: "#fff", 
                colorBgContainer: "#232323", 
              },
              components:{
                Input:{
                  colorTextPlaceholder: "#black",
                }, 
                Select:{
                  colorTextPlaceholder: "#black",
                },
              }
            }}
          >
            {/* Componente principal da aplicação */}
            <App />
          </ConfigProvider>
        </QueryProvider>
      </SocketProvider>
    </AuthProvider>
  </BrowserRouter>
);
