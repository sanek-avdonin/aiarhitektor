import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { Layout, Menu } from 'antd';
import {
  DashboardOutlined,
  ProjectOutlined,
  BarChartOutlined,
  SettingOutlined,
  BgColorsOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import queryClient from './services/queryClient';
import DashboardPage from './pages/DashboardPage';
import ProjectsPage from './pages/ProjectsPage';
import ProjectDetailsPage from './pages/ProjectDetailsPage';
import AnalyticsPage from './pages/AnalyticsPage';
import SettingsPage from './pages/SettingsPage';
import LoginPage from './pages/LoginPage';
import TelegramBotPage from './pages/TelegramBotPage';
import ProtectedRoute from './components/ProtectedRoute';

const { Header, Sider, Content } = Layout;

const App: React.FC = () => {
  const [collapsed, setCollapsed] = React.useState(false);
  const isLoggedIn = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  if (!isLoggedIn) {
    return <LoginPage />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Layout style={{ minHeight: '100vh' }}>
          <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed} theme="dark">
            <div style={{ padding: '16px', color: 'white', textAlign: 'center', fontWeight: 'bold', fontSize: '16px' }}>
              {!collapsed && 'AI Architect'}
            </div>
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
              <Menu.Item key="1" icon={<DashboardOutlined />}>
                <a href="/">Dashboard</a>
              </Menu.Item>
              <Menu.Item key="2" icon={<ProjectOutlined />}>
                <a href="/projects">Projects</a>
              </Menu.Item>
              <Menu.Item key="3" icon={<BarChartOutlined />}>
                <a href="/analytics">Analytics</a>
              </Menu.Item>
              <Menu.Item key="4" icon={<BgColorsOutlined />}>
                <a href="/telegram">Telegram Bot</a>
              </Menu.Item>
              <Menu.Item key="5" icon={<SettingOutlined />}>
                <a href="/settings">Settings</a>
              </Menu.Item>
              <Menu.Divider />
              <Menu.Item key="6" icon={<LogoutOutlined />} onClick={handleLogout}>
                Logout
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Header style={{ background: '#fff', padding: '0 16px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }} />
            <Content style={{ margin: '16px' }}>
              <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route element={<ProtectedRoute />}>
                  <Route path="/" element={<DashboardPage />} />
                  <Route path="/projects" element={<ProjectsPage />} />
                  <Route path="/projects/:id" element={<ProjectDetailsPage />} />
                  <Route path="/analytics" element={<AnalyticsPage />} />
                  <Route path="/settings" element={<SettingsPage />} />
                  <Route path="/telegram" element={<TelegramBotPage />} />
                </Route>
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Content>
          </Layout>
        </Layout>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
