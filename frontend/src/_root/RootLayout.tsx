import React, { useState } from "react";
import { Layout, Menu } from "antd";
import { itemsSidebar } from "../lib/menu/items";
import { Outlet } from "react-router-dom";
import { CustomHeader } from "../components";

const { Content, Footer, Sider } = Layout;

// Componente de layout principal da aplicação
const RootLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = window.location.pathname.split("/")[1];

  return (
    <Layout style={{ height: "100vh", width: "100vw", overflow: "hidden" }}>
      <Sider
        width={250}
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        style={{
          backgroundColor: "#232323",
          border: "1px solid #333",
          borderRadius: "10px",
          margin: "10px 0 10px 10px",
        }}
      >
        <p
          style={{
            textAlign: "center",
            alignItems: "center",
            fontSize: "2rem",
            fontFamily: "Bebas Neue",
            wordWrap: "break-word",
            margin: "20px 0",
          }}
        >
          <span
            style={{
              transition: "500ms",
            }}
          >
            {collapsed ? "TF" : "TaskFlow"}
          </span>
        </p>
        <Menu
          defaultSelectedKeys={[pathname]}
          theme="dark"
          mode="inline"
          items={itemsSidebar}
          style={{
            padding: "8px",
            background: "none",
            fontSize: "1rem",
            gap: "5px",
          }}
        />
      </Sider>
      <Layout style={{ height: "100vh", display: "flex" }}>
        <CustomHeader />
        <Content style={{
          marginRight: "20px",
        }}>
          <Outlet/>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          <span>
            TaskFlow v2.0 ©{new Date().getFullYear()} Criado pelo Suporte NTI.
          </span>
        </Footer>
      </Layout>
    </Layout>
  );
};

export default RootLayout; // Exporta o componente de layout principal da aplicação
