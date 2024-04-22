import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  BarChartOutlined,
  PieChartOutlined
} from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
import useAuth from '../../../Hooks/useAuth';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import EmployeeInfo from '../../Ui/EmployeeInfo'
import { Footer } from 'antd/es/layout/layout';

const { Header, Sider, Content } = Layout;
const menuItems = [
  {
    key: '',
    icon: <UserOutlined />,
    label: 'Dashboard',
    style: { padding: '30px 15px 30px 15px' }
  }, 
  {
    key: 'categories',
    icon: <VideoCameraOutlined />,
    label: 'Categories Management',
    style: { padding: '30px 15px 30px 15px' }
  },
  {
    key: 'brands',
    icon: <PieChartOutlined />,
    label: 'Brands Management',
    style: { padding: '30px 15px 30px 15px' }
  },
  {
    key: 'products',
    icon: <UploadOutlined />,
    label: 'Products Management',
    style: { padding: '30px 15px 30px 15px' }
  },
  {
    key: 'customers',
    icon: <UploadOutlined />,
    label: 'Customers Management',
    style: { padding: '30px 15px 30px 15px' }
  },
  {
    key: 'employees',
    icon: <UploadOutlined />,
    label: 'Employees Management',
    style: { padding: '30px 15px 30px 15px' }
  },
  {
    key: 'orders',
    icon: <BarChartOutlined />,
    label: 'Orders Management',
    style: { padding: '30px 15px 30px 15px' }
  },
];
// Create a client
const queryClient = new QueryClient()

const DefaultLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const {isAuthenticated } = useAuth();
  /* Check xem trang thai dang nhap */
  React.useEffect(()=>{
    if(!isAuthenticated){
      navigate('/login');
    }
  },[isAuthenticated,navigate])


  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <QueryClientProvider client={queryClient}>
    <Layout hasSider style={{ minHeight: "100vh" }}>
      {/* <Sider trigger={null} collapsible collapsed={collapsed} */}
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div className="sidebar_logo">{collapsed ? "A" : "Admin"}</div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={menuItems}
          style={{
            padding: '15px 0px',
          }} 
          onClick={({ key }) => {
            navigate('/' + key.split('-').join('/'));
            console.log(key);
          }}
        />
      </Sider>
      <Layout  style={{ marginLeft: collapsed ? "80px" : "200px" }}>
        <Header style={{
              padding: 0,
              background: colorBgContainer,
              position: "sticky",
              top: 0,
              zIndex: 1,
            }}
            className="drop-shadow-sm">
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
          <EmployeeInfo />
          {/* <Space>
          <Avatar src={<img src={employee?.avatar} alt="avatar" />} />
            <strong>{employee?.fullName}</strong>
          <Button type='primary' onClick={()=>{
            logout();
          }}>
            Logout
          </Button>

          </Space> */}
        </Header>
        <Content
          style={{
            margin: "16px",
            padding: 16,
            minHeight: 280,
            background: colorBgContainer,
            overflow: "initial",
          }}
        >
          <Outlet />
        </Content>
        <Footer style={{ textAlign: "center" }}>
            Ant Design ©2023 Created by Ant UED
          </Footer>
      </Layout>
    </Layout>
    </QueryClientProvider>
  );
};

export default DefaultLayout;