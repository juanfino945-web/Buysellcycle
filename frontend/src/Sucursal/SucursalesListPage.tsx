import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Button, Space, Popconfirm, Typography, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { PlusOutlined, EditOutlined, DeleteOutlined, UndoOutlined } from '@ant-design/icons';
import { useSucursalStore } from './sucursal.store';
import type { Sucursal } from './sucursal.types';

const { Title } = Typography;

export default function SucursalesListPage() {
  const navigate = useNavigate();
  const [verArchivadas, setVerArchivadas] = useState(false);
  const { sucursales, sucursalesArchivadas, loading, fetchSucursal, fetchSucursalesArchivadas, eliminarSucursal, restaurarSucursal } = useSucursalStore();

  useEffect(() => {
    if (verArchivadas) {
      fetchSucursalesArchivadas();
      return;
    }
    fetchSucursal();
  }, [verArchivadas, fetchSucursal, fetchSucursalesArchivadas]);

  const handleEliminar = async (id: number) => {
    try {
      await eliminarSucursal(id);
      message.success('Sucursal archivada correctamente.');
    } catch {
      message.error('No se pudo archivar la sucursal.');
    }
  };

  const handleRestaurar = async (id: number) => {
    try {
      await restaurarSucursal(id);
      message.success('Sucursal restaurada correctamente.');
    } catch {
      message.error('No se pudo restaurar la sucursal.');
    }
  };

  const dataSource = verArchivadas ? sucursalesArchivadas : sucursales;

  const columnas: ColumnsType<Sucursal> = [
    {
      title: 'Nombre',
      dataIndex: 'nombre',
      key: 'nombre',
      sorter: (a, b) => a.nombre.localeCompare(b.nombre),
    },
    {
      title: 'Provincia',
      key: 'provincia',
      render: (_, record) => record.provincia?.nombre ?? '—',
    },
    {
      title: 'Localidad',
      key: 'localidad',
      render: (_, record) => record.localidad?.nombre ?? '—',
    },
    {
      title: 'Acciones',
      key: 'acciones',
      width: 180,
      render: (_, record) => (
        <Space size="small">
          {!verArchivadas ? (
            <>
              <Button
                icon={<EditOutlined />}
                size="small"
                onClick={() => navigate(`/sucursales/${record.id}/editar`)}
              />
              <Popconfirm
                title="¿Archivar esta sucursal?"
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
          Sucursales
        </Title>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <Button type={verArchivadas ? 'default' : 'primary'} onClick={() => setVerArchivadas(false)}>Activas</Button>
          <Button type={verArchivadas ? 'primary' : 'default'} onClick={() => setVerArchivadas(true)}>Archivadas</Button>
          {!verArchivadas && (
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => navigate('/sucursales/nueva')}
            >
              Nueva sucursal
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
        locale={{ emptyText: verArchivadas ? 'No hay sucursales archivadas.' : 'No hay sucursales activas.' }}
      />
    </div>
  );
}