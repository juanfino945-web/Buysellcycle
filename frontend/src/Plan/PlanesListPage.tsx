import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Button, Typography, message, Popconfirm, Space, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { PlusOutlined, EditOutlined, DeleteOutlined, UndoOutlined } from '@ant-design/icons';
import { usePlanStore } from './plan.store';
import type { Plan } from './plan.types';

const { Title } = Typography;

export default function PlanesListPage() {
    const navigate = useNavigate();
    const [verArchivados, setVerArchivados] = useState(false);
    const {
        planes,
        planesArchivados,
        loading,
        fetchPlanes,
        fetchPlanesArchivados,
        eliminarPlan,
        restaurarPlan,
    } = usePlanStore();

    useEffect(() => {
        if (verArchivados) {
            fetchPlanesArchivados();
            return;
        }
        fetchPlanes();
    }, [verArchivados, fetchPlanes, fetchPlanesArchivados]);

    const handleEliminar = async (id: number) => {
        try {
            await eliminarPlan(id);
            message.success('Plan archivado correctamente.');
        } catch (error) {
            message.error('No se pudo archivar el plan.');
        }
    };

    const handleRestaurar = async (id: number) => {
        try {
            await restaurarPlan(id);
            message.success('Plan desarchivado correctamente.');
        } catch (error) {
            message.error('No se pudo desarchivar el plan.');
        }
    };

    const dataSource = verArchivados ? planesArchivados : planes;

    const columnas: ColumnsType<Plan> = [
        {
            title: 'Tarjeta',
            key: 'tarjeta',
            render: (_, record) => record.tarjeta?.nombre ?? '-',
        },
        {
            title: 'Banco',
            key: 'banco',
            render: (_, record) => record.banco?.nombre ?? '-',
        },
        {
            title: 'Cuotas',
            dataIndex: 'cantidadCuotas',
            key: 'cantidadCuotas',
            sorter: (a, b) => a.cantidadCuotas - b.cantidadCuotas,
        },
        {
            title: 'Tasa',
            dataIndex: 'tasaFinanciacion',
            key: 'tasaFinanciacion',
            render: (tasa: string) => <Tag color="gold">{Number(tasa)}%</Tag>,
        },
        {
            title: 'Observaciones',
            dataIndex: 'observaciones',
            key: 'observaciones',
            render: (obs: string | null) => obs ?? '-',
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
                                onClick={() => navigate(`/planes/${record.id}/editar`)}
                            />
                            <Popconfirm
                                title="¿Archivar este plan?"
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
                    Planes
                </Title>

                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <Button
                        type={verArchivados ? 'default' : 'primary'}
                        onClick={() => setVerArchivados(false)}
                    >
                        Activos
                    </Button>
                    <Button
                        type={verArchivados ? 'primary' : 'default'}
                        onClick={() => setVerArchivados(true)}
                    >
                        Archivados
                    </Button>
                    {!verArchivados && (
                        <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            onClick={() => navigate('/planes/nuevo')}
                        >
                            Nuevo plan
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
                locale={{ emptyText: verArchivados ? 'No hay planes archivados.' : 'No hay planes activos.' }}
            />
        </div>
    );
}