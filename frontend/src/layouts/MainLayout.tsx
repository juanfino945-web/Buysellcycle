import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Layout, Menu, Button } from 'antd';
import {
  ShoppingOutlined,
  TagsOutlined,
  AppstoreOutlined,
  UserOutlined,
  FileTextOutlined,
  ShopOutlined,
  InboxOutlined,
  SwapOutlined,
  TeamOutlined,
  ContactsOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  CreditCardOutlined,
  BankOutlined,
  PercentageOutlined,
  CalculatorOutlined,
} from '@ant-design/icons';

const { Sider, Content, Header } = Layout;

const nombresPorRuta: Record<string, string> = {
  '/productos': 'Productos',
  '/marcas': 'Marcas',
  '/categorias-nivel1': 'Categorías Nivel 1',
  '/categorias-nivel2': 'Categorías Nivel 2',
  '/clientes': 'Clientes',
  '/presupuestos': 'Presupuestos',
  '/sucursales': 'Sucursales',
  '/depositos': 'Depósitos',
  '/stock': 'Stock',
  '/usuarios': 'Usuarios',
  '/proveedores': 'Proveedores',
  '/tarjetas': 'Tarjetas',
  '/bancos': 'Bancos',
  '/planes': 'Planes',
};

const itemsMenu = [
  { key: '/productos', icon: <ShoppingOutlined />, label: <Link to="/productos">Productos</Link> },
  { key: '/marcas', icon: <TagsOutlined />, label: <Link to="/marcas">Marcas</Link> },
  {
    key: '/categorias-nivel1',
    icon: <AppstoreOutlined />,
    label: <Link to="/categorias-nivel1">Categorias Nivel 1</Link>,
  },
  {
    key: '/categorias-nivel2',
    icon: <AppstoreOutlined />,
    label: <Link to="/categorias-nivel2">Categorias Nivel 2</Link>,
  },
  { key: '/clientes', icon: <ContactsOutlined />, label: <Link to="/clientes">Clientes</Link> },
  {
    key: '/presupuestos',
    icon: <FileTextOutlined />,
    label: <Link to="/presupuestos">Presupuestos</Link>,
  },
  { key: '/sucursales', icon: <ShopOutlined />, label: <Link to="/sucursales">Sucursales</Link> },
  { key: '/depositos', icon: <InboxOutlined />, label: <Link to="/depositos">Depositos</Link> },
  { key: '/stock', icon: <SwapOutlined />, label: <Link to="/stock">Stock</Link> },
  { key: '/usuarios', icon: <TeamOutlined />, label: <Link to="/usuarios">Usuarios</Link> },
  {
    key: '/proveedores',
    icon: <UserOutlined />,
    label: <Link to="/proveedores">Proveedores</Link>,
  },

  {
    key: '/proveedores',
    icon: <UserOutlined />,
    label: <Link to="/proveedores">Proveedores</Link>,
  },

  { key: '/tarjetas', icon: <CreditCardOutlined />, label: <Link to="/tarjetas">Tarjetas</Link> },
  { key: '/bancos', icon: <BankOutlined />, label: <Link to="/bancos">Bancos</Link> },
  { key: '/planes', icon: <PercentageOutlined />, label: <Link to="/planes">Planes</Link> },

  {
  key: '/simular-financiacion',
  icon: <CalculatorOutlined />,
  label: <Link to="/simular-financiacion">Simular Financiación</Link>,
  },
];

export default function MainLayout() {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout style={{ minHeight: '100vh' }}>
    <Sider
     width={220}
    theme="dark"
    collapsible
    collapsed={collapsed}
    onCollapse={setCollapsed}
    breakpoint="lg"
    collapsedWidth={0}
    trigger={null}
    style={{ background: '#2b2b2b' }}
    >
        <div
          style={{
            color: 'white',
            fontSize: 18,
            fontWeight: 600,
            padding: '16px',
            textAlign: 'center',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
          }}
        >
          BuySellCycle
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={itemsMenu}
          style={{ background: '#2b2b2b' }}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            background: '#fff',
            padding: '0 24px',
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            fontSize: 16,
            fontWeight: 500,
            borderBottom: '1px solid #f0f0f0',
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
          />
          {nombresPorRuta[location.pathname] ?? 'BuySellCycle'}
        </Header>
        <Content style={{ margin: 0, background: '#f5f5f5', overflowX: 'auto' }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}