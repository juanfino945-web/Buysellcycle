import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, Descriptions, Table, Button, Typography, Spin, Space } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { usePresupuestoStore } from './presupuesto.store';
import type { presupuestoItem } from './presupuesto.types';

const { Title } = Typography;

const formatearMoneda = (valor: string) => {
  return Number(valor).toLocaleString('es-AR', { style: 'currency', currency: 'ARS' });
};

const formatearFecha = (valor: string) => {
  return new Date(valor).toLocaleString('es-AR');
};

export default function PresupuestoDetallePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { presupuestoActual, loading, fetchPresupuestoPorId, limpiarPresupuestoActual } =
    usePresupuestoStore();

  useEffect(() => {
    if (id) {
      fetchPresupuestoPorId(Number(id));
    }
    return () => {
      limpiarPresupuestoActual();
    };
  }, [id, fetchPresupuestoPorId, limpiarPresupuestoActual]);

  if (loading || !presupuestoActual) {
    return (
      <div style={{ padding: 24, textAlign: 'center' }}>
        <Spin size="large" />
      </div>
    );
  }

  const presupuesto = presupuestoActual;

  const columnasItems: ColumnsType<presupuestoItem> = [
    {
      title: 'Producto',
      key: 'producto',
      render: (_, item) => item.producto?.nombre ?? '—',
    },
    {
      title: 'Cantidad',
      dataIndex: 'cantidad',
      key: 'cantidad',
      align: 'center',
    },
    {
      title: 'Precio unitario',
      dataIndex: 'precioUnitario',
      key: 'precioUnitario',
      align: 'right',
      render: (valor: string) => formatearMoneda(valor),
    },
    {
      title: 'Subtotal',
      dataIndex: 'subtotal',
      key: 'subtotal',
      align: 'right',
      render: (valor: string) => formatearMoneda(valor),
    },
  ];

  return (
    <div style={{ padding: 24, maxWidth: 800, margin: '0 auto' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 16,
        }}
      >
        <Title level={2} style={{ margin: 0 }}>
          Presupuesto #{presupuesto.id}
        </Title>
        <Space>
          <Button icon={<ArrowLeftOutlined />} onClick={() => navigate('/presupuestos')}>
            Volver
          </Button>
        </Space>
      </div>

      <Card style={{ marginBottom: 16 }}>
        <Descriptions bordered column={1} size="middle">
          <Descriptions.Item label="Cliente">
            {presupuesto.cliente
              ? `${presupuesto.cliente.nombre} ${presupuesto.cliente.apellido}`
              : '—'}
          </Descriptions.Item>
          <Descriptions.Item label="Fecha de emisión">
            {formatearFecha(presupuesto.fechaEmision)}
          </Descriptions.Item>
          <Descriptions.Item label="Total">
            <strong>{formatearMoneda(presupuesto.total)}</strong>
          </Descriptions.Item>
        </Descriptions>
      </Card>

      <Card title="Ítems del presupuesto">
        <Table
          rowKey="id"
          columns={columnasItems}
          dataSource={presupuesto.items}
          pagination={false}
        />
      </Card>
    </div>
  );
}