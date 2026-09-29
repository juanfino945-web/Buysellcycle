import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import ProductosListPage from '../Producto/ProductosListPage';
import ProductoFormPage from '../Producto/ProductoFormPage';
import ProductoDetallePage from '../Producto/ProductoDetallePage';
import MarcasListPage from '../Marcas/MarcasListPage';
import MarcaFormPage from '../Marcas/MarcaFormPage';
import CategoriasNivel1ListPage from '../Categorias-Nivel1/CategoriasNivel1ListPage';
import CategoriaNivel1FormPage from '../Categorias-Nivel1/CategoriaNivel1FormPage';
import CategoriaNivel2ListPage from '../Categorias-Nivel2/CategoriasNivel2ListPage';
import CategoriaNivel2FormPage from '../Categorias-Nivel2/CategoriaNivel2FormPage';
import ClientesListPage from '../Clientes/ClientesListPage';
import ClienteFormPage from '../Clientes/ClienteFormPage';
import PresupuestosListPage from '../Presupuesto/PresupuestosListPage';
import PresupuestoDetallePage from '../Presupuesto/PresupuestoDetallePage';
import PresupuestoFormPage from '../Presupuesto/PresupuestoFormPage';
import SucursalesListPage from '../Sucursal/SucursalesListPage';
import SucursalFormPage from '../Sucursal/SucursalFormPage';
import DepositosListPage from '../Depositos/DepositosListPage';
import DepositoFormPage from '../Depositos/DepositoFormPage';
import StockMovimientoPage from '../Stock/StockMovimientoPage';
import UsuariosListPage from '../Usuarios/UsuariosListPage';
import UsuarioFormPage from '../Usuarios/UsuarioFormPage';
import ProveedoresListPage from '../Proveedor/ProveedoresListPage';
import ProveedorFormPage from '../Proveedor/ProveedorFormPage';
import TarjetaListPage  from '../Tarjeta/TarjetasListPage';
import TarjetaFormPage  from '../Tarjeta/TarjetaFormPage';
import BancosListPage from '../Banco/BancosListPage';
import BancoFormPage from '../Banco/BancoFormPage';
import PlanesListPage from '../Plan/PlanesListPage';
import PlanFormPage from '../Plan/PlanFormPage';
import SimularFinanciacionPage from '../Financiacion/SimularFinanciacionPage';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Navigate to="/productos" replace />} />

          <Route path="/productos" element={<ProductosListPage />} />
          <Route path="/productos/nuevo" element={<ProductoFormPage />} />
          <Route path="/productos/:id" element={<ProductoDetallePage />} />
          <Route path="/productos/:id/editar" element={<ProductoFormPage />} />

          <Route path="/marcas" element={<MarcasListPage />} />
          <Route path="/marcas/nueva" element={<MarcaFormPage />} />
          <Route path="/marcas/:id/editar" element={<MarcaFormPage />} />

          <Route path="/categorias-nivel1" element={<CategoriasNivel1ListPage />} />
          <Route path="/categorias-nivel1/nueva" element={<CategoriaNivel1FormPage />} />
          <Route path="/categorias-nivel1/:id/editar" element={<CategoriaNivel1FormPage />} />

          <Route path="/categorias-nivel2" element={<CategoriaNivel2ListPage />} />
          <Route path="/categorias-nivel2/nueva" element={<CategoriaNivel2FormPage />} />
          <Route path="/categorias-nivel2/:id/editar" element={<CategoriaNivel2FormPage />} />

          <Route path="/clientes" element={<ClientesListPage />} />
          <Route path="/clientes/nuevo" element={<ClienteFormPage />} />
          <Route path="/clientes/:id/editar" element={<ClienteFormPage />} />

          <Route path="/presupuestos" element={<PresupuestosListPage />} />
          <Route path="/presupuestos/nuevo" element={<PresupuestoFormPage />} />
          <Route path="/presupuestos/:id" element={<PresupuestoDetallePage />} />

          <Route path="/sucursales" element={<SucursalesListPage />} />
          <Route path="/sucursales/nueva" element={<SucursalFormPage />} />
          <Route path="/sucursales/:id/editar" element={<SucursalFormPage />} />

          <Route path="/depositos" element={<DepositosListPage />} />
          <Route path="/depositos/nuevo" element={<DepositoFormPage />} />
          <Route path="/depositos/:id/editar" element={<DepositoFormPage />} />

          <Route path="/stock" element={<StockMovimientoPage />} />

          <Route path="/usuarios" element={<UsuariosListPage />} />
          <Route path="/usuarios/nuevo" element={<UsuarioFormPage />} />
          <Route path="/usuarios/:id/editar" element={<UsuarioFormPage />} />

          <Route path="/proveedores" element={<ProveedoresListPage />} />
          <Route path="/proveedores/nuevo" element={<ProveedorFormPage />} />
          <Route path="/proveedores/:id/editar" element={<ProveedorFormPage />} />

          <Route path="tarjetas" element={<TarjetaListPage />} />
          <Route path="tarjetas/nueva" element={<TarjetaFormPage />} />
          <Route path="tarjetas/:id/editar" element={<TarjetaFormPage />} />

          <Route path="bancos" element={<BancosListPage />} />
          <Route path="bancos/nuevo" element={<BancoFormPage />} />
          <Route path="bancos/:id/editar" element={<BancoFormPage />} />

          <Route path="planes" element={<PlanesListPage />} />
          <Route path="planes/nuevo" element={<PlanFormPage />} />
          <Route path="planes/:id/editar" element={<PlanFormPage />} />

          <Route path="simular-financiacion" element={<SimularFinanciacionPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}