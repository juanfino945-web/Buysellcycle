import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Button, Typography, Space, Popconfirm, message} from "antd";
import type { ColumnsType } from "antd/es/table";
import {PlusOutlined,EditOutlined,DeleteOutlined,UndoOutlined} from '@ant-design/icons';
import { useCategoriaNivel1Store } from "./categoria-nivel1.store";
import type { CategoriaNivel1 } from "./categoria-nivel1.types";

const {Title} = Typography;

export default function CategoriasNivel1ListPage() {
    const navigate = useNavigate();
    const [verArchivadas, setVerArchivadas] = useState(false);
    const {categorias, categoriasArchivadas, loading, fetchCategorias, fetchCategoriasArchivadas, eliminarCategoria, restaurarCategoria} = useCategoriaNivel1Store();

    useEffect(() => {
        if(verArchivadas) {
            fetchCategoriasArchivadas();
            return;
        }
        fetchCategorias();
    }, [verArchivadas, fetchCategorias, fetchCategoriasArchivadas]);

    const handleEliminar = async(id:number) => {
        try {
            await eliminarCategoria(id);
            message.success('categoria archivada correctamente');
        } catch (error) {
            message.error('no se pudo archivar la categoria');
        }
    };

    const handleRestaurar = async(id:number) => {
        try {
            await restaurarCategoria(id);
            message.success('categoria restaurada correctamente');
        } catch (error) {
            message.error('no se pudo restaurar la categoria');
        }
    };

    const dataSource = verArchivadas ? categoriasArchivadas : categorias;

    const columnas: ColumnsType<CategoriaNivel1> = [
        {
            title:'Nombre',
            dataIndex:'nombre',
            key:'nombre',
            sorter:(a,b) => a.nombre.localeCompare(b.nombre),
        },

        {
            title:'Acciones',
            key:'acciones',
            width:180,
            render:(_,record) => (
                <Space size='small'>
                    {!verArchivadas ? (
                      <>
                        <Button
                        icon={<EditOutlined/>}
                        size='small'
                        onClick={() => navigate(`/categorias-nivel1/${record.id}/editar`)}
                        />
                        <Popconfirm
                            title="¿archivar esta categoria?"
                            onConfirm={() => handleEliminar(record.id)}
                            okText="Si,archivar"
                            cancelText="Cancelar"
                            >
                            <Button icon={<DeleteOutlined/>} size='small' danger />
                        </Popconfirm>
                      </>
                    ) : (
                        <Button
                            icon={<UndoOutlined />}
                            size='small'
                            type='primary'
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
        <div style={{padding:24}}>
            <div
                style={{
                    display:'flex',
                    justifyContent:'space-between',
                    alignItems:'center',
                    gap:16,
                    flexWrap: 'wrap',
                }}
            >
                <Title level={2}style={{margin:0}}>
                    Categorias Nivel 1
                </Title>

                <div style={{display:'flex', gap:8, alignItems:'center'}}>
                    <Button type={verArchivadas ? 'default' : 'primary'} onClick={() => setVerArchivadas(false)}>Activas</Button>
                    <Button type={verArchivadas ? 'primary' : 'default'} onClick={() => setVerArchivadas(true)}>Archivadas</Button>
                    {!verArchivadas && (
                      <Button
                          type="primary"
                          icon={<PlusOutlined/>}
                          onClick={() => navigate('/categorias-nivel1/nueva')}
                      >
                          Nueva Categoria
                      </Button>
                    )}
                </div>
            </div>

            <Table
                rowKey="id"
                columns={columnas}
                dataSource={dataSource}
                loading={loading}
                pagination={{pageSize: 10, showSizeChanger:true}}
                locale={{ emptyText: verArchivadas ? 'No hay categorías archivadas.' : 'No hay categorías activas.' }}
            />
           </div> 
    );
}