import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Button, Space, Popconfirm, Typography, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { PlusOutlined, EyeOutlined, DeleteOutlined, UndoOutlined } from '@ant-design/icons';
import { usePresupuestoStore } from './presupuesto.store';
import type { Presupuesto } from './presupuesto.types';

const { Title } = Typography;

const formatearMoneda = (valor: string) => {
  return Number(valor).toLocaleString('es-AR', { style: 'currency', currency: 'ARS' });
};

const formatearFecha = (valor: string) => {
  return new Date(valor).toLocaleDateString('es-AR');
};

export default function PresupuestosListPage() {
  const navigate = useNavigate();
  const [verArchivados, setVerArchivados] = useState(false);
  const { presupuestos, presupuestosArchivados, loading, fetchPresupuesto, fetchPresupuestosArchivados, eliminarPresupuesto, restaurarPresupuesto } =
    usePresupuestoStore();

  useEffect(() => {
    if (verArchivados) {
      fetchPresupuestosArchivados();
      return;
    }
    fetchPresupuesto();
  }, [verArchivados, fetchPresupuesto, fetchPresupuestosArchivados]);

  const handleEliminar = async (id: number) => {
    try {
      await eliminarPresupuesto(id);
      message.success('Presupuesto archivado correctamente.');
    } catch {
      message.error('No se pudo archivar el presupuesto.');
    }
  };

  const handleRestaurar = async (id: number) => {
    try {
      await restaurarPresupuesto(id);
      message.success('Presupuesto restaurado correctamente.');
    } catch {
      message.error('No se pudo restaurar el presupuesto.');
    }
  };

  const dataSource = verArchivados ? presupuestosArchivados : presupuestos;

  const columnas: ColumnsType<Presupuesto> = [
    {
      title: 'Cliente',
      key: 'cliente',
      render: (_, record) =>
        record.cliente ? `${record.cliente.nombre} ${record.cliente.apellido}` : '—',
    },
    {
      title: 'Fecha de emisión',
      dataIndex: 'fechaEmision',
      key: 'fechaEmision',
      render: (valor: string) => formatearFecha(valor),
      sorter: (a, b) => new Date(a.fechaEmision).getTime() - new Date(b.fechaEmision).getTime(),
    },
    {
      title: 'Cantidad de ítems',
      key: 'cantidadItems',
      render: (_, record) => record.items.length,
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
      align: 'right',
      render: (valor: string) => formatearMoneda(valor),
      sorter: (a, b) => Number(a.total) - Number(b.total),
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
                onClick={() => navigate(`/presupuestos/${record.id}`)}
              />
              <Popconfirm
                title="¿Archivar este presupuesto?"
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
          Presupuestos
        </Title>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <Button type={verArchivados ? 'default' : 'primary'} onClick={() => setVerArchivados(false)}>Activos</Button>
          <Button type={verArchivados ? 'primary' : 'default'} onClick={() => setVerArchivados(true)}>Archivados</Button>
          {!verArchivados && (
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => navigate('/presupuestos/nuevo')}
            >
              Nuevo presupuesto
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
        locale={{ emptyText: verArchivados ? 'No hay presupuestos archivados.' : 'No hay presupuestos activos.' }}
      />
    </div>
  );
}