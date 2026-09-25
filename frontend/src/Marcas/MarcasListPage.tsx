import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Button, Typography, message, Popconfirm, Space } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { PlusOutlined, EditOutlined, DeleteOutlined, UndoOutlined } from '@ant-design/icons';
import { useMarcaStore } from './marca.store';
import type { Marca } from './marca.types';

const { Title } = Typography;

export default function MarcasListPage() {
    const navigate = useNavigate();
    const [verArchivadas, setVerArchivadas] = useState(false);
    const {
        marcas,
        marcasArchivadas,
        loading,
        fetchMarcas,
        fetchMarcasArchivadas,
        eliminarMarca,
        restaurarMarca,
    } = useMarcaStore();

    useEffect(() => {
        if (verArchivadas) {
            fetchMarcasArchivadas();
            return;
        }
        fetchMarcas();
    }, [verArchivadas, fetchMarcas, fetchMarcasArchivadas]);

    const handleEliminar = async (id: number) => {
        try {
            await eliminarMarca(id);
            message.success('Marca archivada correctamente.');
        } catch (error) {
            message.error('No se pudo archivar la marca.');
        }
    };

    const handleRestaurar = async (id: number) => {
        try {
            await restaurarMarca(id);
            message.success('Marca desarchivada correctamente.');
        } catch (error) {
            message.error('No se pudo desarchivar la marca.');
        }
    };

    const dataSource = verArchivadas ? marcasArchivadas : marcas;

    const columnas: ColumnsType<Marca> = [
        {
            title: 'Nombre',
            dataIndex: 'nombre',
            key: 'nombre',
            sorter: (a, b) => a.nombre.localeCompare(b.nombre),
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
                                onClick={() => navigate(`/marcas/${record.id}/editar`)}
                            />
                            <Popconfirm
                                title="¿Archivar esta Marca?"
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
                    Marcas
                </Title>

                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <Button
                        type={verArchivadas ? 'default' : 'primary'}
                        onClick={() => setVerArchivadas(false)}
                    >
                        Activas
                    </Button>
                    <Button
                        type={verArchivadas ? 'primary' : 'default'}
                        onClick={() => setVerArchivadas(true)}
                    >
                        Archivadas
                    </Button>
                    {!verArchivadas && (
                        <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            onClick={() => navigate('/marcas/nueva')}
                        >
                            Nueva marca
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
                locale={{ emptyText: verArchivadas ? 'No hay marcas archivadas.' : 'No hay marcas activas.' }}
            />
        </div>
    );
}


