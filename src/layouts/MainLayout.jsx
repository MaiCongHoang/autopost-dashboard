import { Layout, Menu } from "antd";
import { Link, useLocation } from "react-router-dom";

const { Sider, Content, Header } = Layout;

export default function MainLayout({ children }) {
  const location = useLocation();
  const selectedKey =
    location.pathname.startsWith("/logs") ? "logs" : "pending";

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible>
        <div style={{ color: "white", padding: 16, fontWeight: 600 }}>
          AutoPost Dashboard
        </div>
        <Menu theme="dark" mode="inline" selectedKeys={[selectedKey]}>
          <Menu.Item key="pending">
            <Link to="/">Pending Posts</Link>
          </Menu.Item>
          <Menu.Item key="logs">
            <Link to="/logs">Finished Logs</Link>
          </Menu.Item>
        </Menu>
      </Sider>

      <Layout>
        <Content style={{ margin: 16 }}>{children}</Content>
      </Layout>
    </Layout>
  );
}
