import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Button, Space, Popconfirm, Typography, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { PlusOutlined, EditOutlined, DeleteOutlined, UndoOutlined } from '@ant-design/icons';
import { useDepositoStore } from './deposito.store';
import type { Deposito } from './deposito.types';

const { Title } = Typography;

export default function DepositosListPage() {
  const navigate = useNavigate();
  const [verArchivados, setVerArchivados] = useState(false);
  const { depositos, depositosArchivados, loading, fetchDeposito, fetchDepositosArchivados, eliminarDeposito, restaurarDeposito } = useDepositoStore();

  useEffect(() => {
    if (verArchivados) {
      fetchDepositosArchivados();
      return;
    }
    fetchDeposito();
  }, [verArchivados, fetchDeposito, fetchDepositosArchivados]);

  const handleEliminar = async (id: number) => {
    try {
      await eliminarDeposito(id);
      message.success('Depósito archivado correctamente.');
    } catch {
      message.error('No se pudo archivar el depósito.');
    }
  };

  const handleRestaurar = async (id: number) => {
    try {
      await restaurarDeposito(id);
      message.success('Depósito restaurado correctamente.');
    } catch {
      message.error('No se pudo restaurar el depósito.');
    }
  };

  const dataSource = verArchivados ? depositosArchivados : depositos;

  const columnas: ColumnsType<Deposito> = [
    {
      title: 'Código',
      dataIndex: 'codigo',
      key: 'codigo',
    },
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
          {!verArchivados ? (
            <>
              <Button
                icon={<EditOutlined />}
                size="small"
                onClick={() => navigate(`/depositos/${record.id}/editar`)}
              />
              <Popconfirm
                title="¿Archivar este depósito?"
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
          Depósitos
        </Title>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <Button type={verArchivados ? 'default' : 'primary'} onClick={() => setVerArchivados(false)}>Activos</Button>
          <Button type={verArchivados ? 'primary' : 'default'} onClick={() => setVerArchivados(true)}>Archivados</Button>
          {!verArchivados && (
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => navigate('/depositos/nuevo')}
            >
              Nuevo depósito
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
        locale={{ emptyText: verArchivados ? 'No hay depósitos archivados.' : 'No hay depósitos activos.' }}
      />
    </div>
  );
}