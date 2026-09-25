import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Button, Tag, Space, Popconfirm, Typography, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { PlusOutlined, EyeOutlined, EditOutlined, DeleteOutlined, UndoOutlined } from '@ant-design/icons';
import { useProductoStore } from './producto.store';
import type { Producto, EstadoProducto } from './producto.types';

const { Title } = Typography;

const coloresEstado: Record<EstadoProducto, string> = {
  DISPONIBLE: 'green',
  ACTIVO: 'blue',
  INACTIVO: 'default',
};

const formatearMoneda = (valor: string) => {
  const numero = Number(valor);
  return numero.toLocaleString('es-AR', {
    style: 'currency',
    currency: 'ARS',
  });
};

export default function ProductosListPage() {
  const navigate = useNavigate();
  const [verArchivados, setVerArchivados] = useState(false);
  const {
    productos,
    productosArchivados,
    loading,
    fetchProductos,
    fetchProductosArchivados,
    eliminarProducto,
    restaurarProducto,
  } = useProductoStore();

  useEffect(() => {
    if (verArchivados) {
      fetchProductosArchivados();
      return;
    }
    fetchProductos();
  }, [verArchivados, fetchProductos, fetchProductosArchivados]);

  const handleEliminar = async (id: number) => {
    try {
      await eliminarProducto(id);
      message.success('Producto archivado correctamente.');
    } catch {
      message.error('No se pudo archivar el producto.');
    }
  };

  const handleRestaurar = async (id: number) => {
    try {
      await restaurarProducto(id);
      message.success('Producto restaurado correctamente.');
    } catch {
      message.error('No se pudo restaurar el producto.');
    }
  };

  const dataSource = verArchivados ? productosArchivados : productos;

  const columnas: ColumnsType<Producto> = [
    {
      title: 'Nombre',
      dataIndex: 'nombre',
      key: 'nombre',
      sorter: (a, b) => a.nombre.localeCompare(b.nombre),
    },
    {
      title: 'Marca',
      dataIndex: ['marca', 'nombre'],
      key: 'marca',
      render: (_, record) => record.marca?.nombre ?? '—',
    },
    {
      title: 'Categoría',
      dataIndex: ['categoriaNivel2', 'nombre'],
      key: 'categoria',
      render: (_, record) => record.categoriaNivel2?.nombre ?? '—',
    },
    {
      title: 'Precio de Lista',
      dataIndex: 'precioLista',
      key: 'precioLista',
      align: 'right',
      render: (valor: string) => formatearMoneda(valor),
      sorter: (a, b) => Number(a.precioLista) - Number(b.precioLista),
    },
    {
      title: 'Precio Contado',
      dataIndex: 'precioContado',
      key: 'precioContado',
      align: 'right',
      render: (valor: string) => formatearMoneda(valor),
    },
    {
      title: 'Stock',
      dataIndex: 'stockTotal',
      key: 'stockTotal',
      align: 'center',
      sorter: (a, b) => a.stockTotal - b.stockTotal,
    },
    {
      title: 'Estado',
      dataIndex: 'estado',
      key: 'estado',
      render: (estado: EstadoProducto) => (
        <Tag color={coloresEstado[estado]}>{estado}</Tag>
      ),
      filters: [
        { text: 'Disponible', value: 'DISPONIBLE' },
        { text: 'Activo', value: 'ACTIVO' },
        { text: 'Inactivo', value: 'INACTIVO' },
      ],
      onFilter: (value, record) => record.estado === value,
    },
    {
      title: 'Acciones',
      key: 'acciones',
      width: 180,
      render: (_, record) => (
        <Space size="small">
          {!verArchivados ? (
            <>
              <Button
                icon={<EyeOutlined />}
                size="small"
                onClick={() => navigate(`/productos/${record.id}`)}
              />
              <Button
                icon={<EditOutlined />}
                size="small"
                onClick={() => navigate(`/productos/${record.id}/editar`)}
              />
              <Popconfirm
                title="¿Archivar este producto?"
                description="El producto dejará de aparecer en los listados."
                onConfirm={() => handleEliminar(record.id)}
                okText="Sí, archivar"
                cancelText="Cancelar"
              >
                <Button icon={<DeleteOutlined />} size="small" danger />
              </Popconfirm>
            </>
          ) : (
            <Button
              icon={<UndoOutlined />}
              size="small"
              type="primary"
              onClick={() => handleRestaurar(record.id)}
            >
              Desarchivar
            </Button>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 16,
          gap: 12,
          flexWrap: 'wrap',
        }}
      >
        <Title level={2} style={{ margin: 0 }}>
          Productos
        </Title>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <Button type={verArchivados ? 'default' : 'primary'} onClick={() => setVerArchivados(false)}>Activos</Button>
          <Button type={verArchivados ? 'primary' : 'default'} onClick={() => setVerArchivados(true)}>Archivados</Button>
          {!verArchivados && (
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => navigate('/productos/nuevo')}
            >
              Nuevo producto
            </Button>
          )}
        </div>
      </div>

      <Table
        rowKey="id"
        columns={columnas}
        dataSource={dataSource}
        loading={loading}
        pagination={{ pageSize: 10, showSizeChanger: true }}
        locale={{ emptyText: verArchivados ? 'No hay productos archivados.' : 'No hay productos activos.' }}
      />
    </div>
  );
}