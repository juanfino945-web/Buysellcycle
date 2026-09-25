import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Button, Space, Popconfirm, Typography, message, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { PlusOutlined, EditOutlined, DeleteOutlined, UndoOutlined } from '@ant-design/icons';
import { useUsuarioStore } from './usuario.store';
import type { Usuario } from './usuario.types';

const { Title } = Typography;

export default function UsuariosListPage() {
  const navigate = useNavigate();
  const [verArchivados, setVerArchivados] = useState(false);
  const { usuarios, usuariosArchivados, loading, fetchUsuarios, fetchUsuariosArchivados, eliminarUsuario, restaurarUsuario } = useUsuarioStore();

  useEffect(() => {
    if (verArchivados) {
      fetchUsuariosArchivados();
      return;
    }
    fetchUsuarios();
  }, [verArchivados, fetchUsuarios, fetchUsuariosArchivados]);

  const handleEliminar = async (id: number) => {
    try {
      await eliminarUsuario(id);
      message.success('Usuario archivado correctamente.');
    } catch {
      message.error('No se pudo archivar el usuario.');
    }
  };

  const handleRestaurar = async (id: number) => {
    try {
      await restaurarUsuario(id);
      message.success('Usuario restaurado correctamente.');
    } catch {
      message.error('No se pudo restaurar el usuario.');
    }
  };

  const dataSource = verArchivados ? usuariosArchivados : usuarios;

  const columnas: ColumnsType<Usuario> = [
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
      title: 'Usuario',
      dataIndex: 'nombreUsuario',
      key: 'nombreUsuario',
    },
    {
      title: 'Rol',
      dataIndex: 'rol',
      key: 'rol',
      render: (rol: string) => (
        <Tag color={rol === 'ADMINISTRACION' ? 'purple' : 'blue'}>{rol}</Tag>
      ),
      filters: [
        { text: 'Administración', value: 'ADMINISTRACION' },
        { text: 'Vendedor', value: 'VENDEDOR' },
      ],
      onFilter: (value, record) => record.rol === value,
    },
    {
      title: 'Sucursal',
      key: 'sucursal',
      render: (_, record) => record.sucursal?.nombre ?? '—',
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
                onClick={() => navigate(`/usuarios/${record.id}/editar`)}
              />
              <Popconfirm
                title="¿Archivar este usuario?"
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
          Usuarios
        </Title>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <Button type={verArchivados ? 'default' : 'primary'} onClick={() => setVerArchivados(false)}>Activos</Button>
          <Button type={verArchivados ? 'primary' : 'default'} onClick={() => setVerArchivados(true)}>Archivados</Button>
          {!verArchivados && (
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => navigate('/usuarios/nuevo')}
            >
              Nuevo usuario
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
        locale={{ emptyText: verArchivados ? 'No hay usuarios archivados.' : 'No hay usuarios activos.' }}
      />
    </div>
  );
}