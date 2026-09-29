import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Button, Typography, message, Popconfirm, Space } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { PlusOutlined, EditOutlined, DeleteOutlined, UndoOutlined } from '@ant-design/icons';
import { useBancoStore } from './banco.store';
import type { Banco } from './banco.types';

const { Title } = Typography;

export default function BancosListPage() {
    const navigate = useNavigate();
    const [verArchivados, setVerArchivados] = useState(false);
    const {
        bancos,
        bancosArchivados,
        loading,
        fetchBancos,
        fetchBancosArchivados,
        eliminarBanco,
        restaurarBanco,
    } = useBancoStore();

    useEffect(() => {
        if (verArchivados) {
            fetchBancosArchivados();
            return;
        }
        fetchBancos();
    }, [verArchivados, fetchBancos, fetchBancosArchivados]);

    const handleEliminar = async (id: number) => {
        try {
            await eliminarBanco(id);
            message.success('Banco archivado correctamente.');
        } catch (error) {
            message.error('No se pudo archivar el banco.');
        }
    };

    const handleRestaurar = async (id: number) => {
        try {
            await restaurarBanco(id);
            message.success('Banco desarchivado correctamente.');
        } catch (error) {
            message.error('No se pudo desarchivar el banco.');
        }
    };

    const dataSource = verArchivados ? bancosArchivados : bancos;

    const columnas: ColumnsType<Banco> = [
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
                    {!verArchivados ? (
                        <>
                            <Button
                                icon={<EditOutlined />}
                                size="small"
                                onClick={() => navigate(`/bancos/${record.id}/editar`)}
                            />
                            <Popconfirm
                                title="¿Archivar este banco?"
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
                    Bancos
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
                            onClick={() => navigate('/bancos/nuevo')}
                        >
                            Nuevo banco
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
                locale={{ emptyText: verArchivados ? 'No hay bancos archivados.' : 'No hay bancos activos.' }}
            />
        </div>
    );
}