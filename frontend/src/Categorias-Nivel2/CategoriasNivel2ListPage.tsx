import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {Table,Button,Space,Popconfirm,Typography,message} from 'antd';
import type { ColumnsType } from "antd/es/table";
import {PlusOutlined, EditOutlined, DeleteOutlined, UndoOutlined} from '@ant-design/icons';
import { useCategeoriaNivel2Store } from "./categoria-nivel2.store";
import type { CategoriaNivel2 } from "./categoria-nivel2.types";

const {Title} = Typography;

export default function categoriaNivel2ListPage() {
    const navigate = useNavigate();
    const [verArchivadas, setVerArchivadas] = useState(false);
    const {categorias, categoriasArchivadas, loading, fetchCategorias, fetchCategoriasArchivadas, eliminarCategoria, restaurarCategoria} = useCategeoriaNivel2Store();

    useEffect(() => {
      if(verArchivadas) {
        fetchCategoriasArchivadas();
        return;
      }
      fetchCategorias();
  }, [verArchivadas, fetchCategorias, fetchCategoriasArchivadas]);

  const handleEliminar = async (id: number) => {
    try {
      await eliminarCategoria(id);
      message.success('Categoria archivada correctamente.');
    } catch {
      message.error('No se pudo archivar la categoria.');
    }
  };

  const handleRestaurar = async (id: number) => {
    try {
      await restaurarCategoria(id);
      message.success('Categoria restaurada correctamente.');
    } catch {
      message.error('No se pudo restaurar la categoria.');
    }
  };

  const dataSource = verArchivadas ? categoriasArchivadas : categorias;

  const columnas: ColumnsType<CategoriaNivel2> = [
    {
      title: 'Nombre',
      dataIndex: 'nombre',
      key: 'nombre',
      sorter: (a, b) => a.nombre.localeCompare(b.nombre),
    },
    {
      title: 'Categoría Nivel 1',
      dataIndex: ['categoriaNivel1', 'nombre'],
      key: 'categoriaNivel1',
      render: (_, record) => record.categoriaNivel1?.nombre ?? '—',
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
                onClick={() => navigate(`/categorias-nivel2/${record.id}/editar`)}
              />
              <Popconfirm
                title="¿Archivar esta categoria?"
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
          Categorías Nivel 2
        </Title>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <Button type={verArchivadas ? 'default' : 'primary'} onClick={() => setVerArchivadas(false)}>Activas</Button>
          <Button type={verArchivadas ? 'primary' : 'default'} onClick={() => setVerArchivadas(true)}>Archivadas</Button>
          {!verArchivadas && (
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => navigate('/categorias-nivel2/nueva')}
            >
              Nueva categoría
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
        locale={{ emptyText: verArchivadas ? 'No hay categorías archivadas.' : 'No hay categorías activas.' }}
      />
    </div>
  );
}
