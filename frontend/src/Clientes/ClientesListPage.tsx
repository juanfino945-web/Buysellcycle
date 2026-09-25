import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Button, Space, Popconfirm, Typography, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { PlusOutlined, EditOutlined, DeleteOutlined, UndoOutlined } from '@ant-design/icons';
import { useClienteStore } from './cliente.store';
import type { Cliente } from './clientes.types';

const { Title } = Typography;

export default function ClientesListPage() {
  const navigate = useNavigate();
  const [verArchivados, setVerArchivados] = useState(false);
  const { clientes, clientesArchivados, loading, fetchClientes, fetchClientesArchivados, eliminarCliente, restaurarCliente } = useClienteStore();

  useEffect(() => {
    if (verArchivados) {
      fetchClientesArchivados();
      return;
    }
    fetchClientes();
  }, [verArchivados, fetchClientes, fetchClientesArchivados]);

  const handleEliminar = async (id: number) => {
    try {
      await eliminarCliente(id);
      message.success('Cliente archivado correctamente.');
    } catch {
      message.error('No se pudo archivar el cliente.');
    }
  };

  const handleRestaurar = async (id: number) => {
    try {
      await restaurarCliente(id);
      message.success('Cliente restaurado correctamente.');
    } catch {
      message.error('No se pudo restaurar el cliente.');
    }
  };

  const dataSource = verArchivados ? clientesArchivados : clientes;

  const columnas: ColumnsType<Cliente> = [
    {
      title: 'Nombre',
      key: 'nombreCompleto',
      render: (_, record) => `${record.nombre} ${record.apellido}`,
      sorter: (a, b) => a.apellido.localeCompare(b.apellido),
    },
    {
      title: 'DNI',
      dataIndex: 'dni',
      key: 'dni',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
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
                onClick={() => navigate(`/clientes/${record.id}/editar`)}
              />
              <Popconfirm
                title="¿Archivar este cliente?"
                onConfirm={() => handleEliminar(record.id)}
                okText="Si, archivar"
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
          Clientes
        </Title>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <Button type={verArchivados ? 'default' : 'primary'} onClick={() => setVerArchivados(false)}>Activos</Button>
          <Button type={verArchivados ? 'primary' : 'default'} onClick={() => setVerArchivados(true)}>Archivados</Button>
          {!verArchivados && (
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => navigate('/clientes/nuevo')}
            >
              Nuevo cliente
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
        locale={{ emptyText: verArchivados ? 'No hay clientes archivados.' : 'No hay clientes activos.' }}
      />
    </div>
  );
}