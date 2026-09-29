import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Button, Typography, message, Popconfirm, Space, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { PlusOutlined, EditOutlined, DeleteOutlined, UndoOutlined } from '@ant-design/icons';
import { useTarjetaStore } from './tarjeta.store';
import type { Tarjeta } from './tarjeta.types';

const { Title } = Typography;

export default function TarjetasListPage() {
    const navigate = useNavigate();
    const [verArchivadas, setVerArchivadas] = useState(false);
    const {
        tarjetas,
        tarjetasArchivadas,
        loading,
        fetchTarjetas,
        fetchTarjetasArchivadas,
        eliminarTarjeta,
        restaurarTarjeta,
    } = useTarjetaStore();

    useEffect(() => {
        if (verArchivadas) {
            fetchTarjetasArchivadas();
            return;
        }
        fetchTarjetas();
    }, [verArchivadas, fetchTarjetas, fetchTarjetasArchivadas]);

    const handleEliminar = async (id: number) => {
        try {
            await eliminarTarjeta(id);
            message.success('Tarjeta archivada correctamente.');
        } catch (error) {
            message.error('No se pudo archivar la tarjeta.');
        }
    };

    const handleRestaurar = async (id: number) => {
        try {
            await restaurarTarjeta(id);
            message.success('Tarjeta desarchivada correctamente.');
        } catch (error) {
            message.error('No se pudo desarchivar la tarjeta.');
        }
    };

    const dataSource = verArchivadas ? tarjetasArchivadas : tarjetas;

    const columnas: ColumnsType<Tarjeta> = [
        {
            title: 'Nombre',
            dataIndex: 'nombre',
            key: 'nombre',
            sorter: (a, b) => a.nombre.localeCompare(b.nombre),
        },
        {
            title: 'Tipo',
            dataIndex: 'tipo',
            key: 'tipo',
            filters: [
                { text: 'Crédito', value: 'CREDITO' },
                { text: 'Débito', value: 'DEBITO' },
            ],
            onFilter: (value, record) => record.tipo === value,
            render: (tipo: Tarjeta['tipo']) => (
                <Tag color={tipo === 'CREDITO' ? 'blue' : 'green'}>
                    {tipo === 'CREDITO' ? 'Crédito' : 'Débito'}
                </Tag>
            ),
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
                                onClick={() => navigate(`/tarjetas/${record.id}/editar`)}
                            />
                            <Popconfirm
                                title="¿Archivar esta tarjeta?"
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
                    Tarjetas
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
                            onClick={() => navigate('/tarjetas/nueva')}
                        >
                            Nueva tarjeta
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
                locale={{ emptyText: verArchivadas ? 'No hay tarjetas archivadas.' : 'No hay tarjetas activas.' }}
            />
        </div>
    );
}