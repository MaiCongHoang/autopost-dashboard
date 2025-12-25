import { Layout, Menu } from "antd";
import { Link, useLocation } from "react-router-dom";

const { Sider, Content, Header } = Layout;

export default function MainLayout({ children }) {
  const location = useLocation();
  const selectedKey =
    location.pathname.startsWith("/logs") ? "logs" : "pending";

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* SIDEBAR */}
      <Sider
        collapsible
        width={220}
        breakpoint="lg"
        style={{ background: "#001529" }}
      >
        <div
          style={{
            color: "white",
            padding: "16px 20px",
            fontWeight: 600,
            fontSize: 16,
          }}
        >
          AutoPost Dashboard
        </div>

        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedKey]}
        >
          <Menu.Item key="pending">
            <Link to="/">Pending Posts</Link>
          </Menu.Item>
          <Menu.Item key="logs">
            <Link to="/logs">Finished Logs</Link>
          </Menu.Item>
        </Menu>
      </Sider>

      {/* MAIN */}
      <Layout>
        {/* HEADER */}
        <Header
          style={{
            background: "#fff",
            padding: "0 24px",
            fontSize: 18,
            fontWeight: 600,
            borderBottom: "1px solid #f0f0f0",
          }}
        >
          {selectedKey === "pending"
            ? "Pending Posts"
            : "Finished Logs"}
        </Header>

        {/* CONTENT */}
        <Content
          style={{
            padding: 24,
            display: "flex",
            justifyContent: "center",
          }}
        >
          {/* GIỚI HẠN WIDTH CHUẨN LAPTOP */}
          <div
            style={{
              width: "100%",
              maxWidth: 1500,
            }}
          >
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
