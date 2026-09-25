import {useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {
  Card,
  Descriptions,
  Tag,
  Button,
  Typography,
  Spin,
  Space,
} from 'antd'
import {EditOutlined, ArrowLeftOutlined} from '@ant-design/icons';
import {useProductoStore} from './producto.store';
import type { EstadoProducto } from './producto.types';

const {Title} = Typography;

const coloresDeEstado: Record<EstadoProducto, string> = {
  'DISPONIBLE': 'green',
  'ACTIVO': 'blue',
  'INACTIVO': 'red'
}

const formatearMoneda = (valor: string) => {
  const numero = Number(valor);
  return numero.toLocaleString('es-AR', {
    style: 'currency',
    currency: 'ARS',
  });
}

const formatearFecha = (fecha: string) => {
  return new Date(fecha).toLocaleDateString('es-AR')
}

export default function productoDetallePage() {
  const {id} = useParams<{id: string}>();
  const navigate = useNavigate();

  const {productoActual, loading, fetchProductoPorId, limpiarProductoActual} =
  useProductoStore();

  useEffect(() => {
    if (id) {
        fetchProductoPorId(Number(id));
    }
    return () => {
      limpiarProductoActual();
    };
  }, [id, fetchProductoPorId, limpiarProductoActual]);

   if (loading || !productoActual) {
    return (
      <div style={{ padding: 24, textAlign: 'center' }}>
        <Spin size="large" />
      </div>
    );
  }

const producto = productoActual;

return (
  <div style={{padding: '20px', maxWidth: '800px', margin: '0 auto'}}>
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
      }}
      >
        <Title level={2}style={{margin: 0}}>
          producto.nombre
        </Title>
        <Space>
          <Button
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate('/productos')}
          >
            Volver
          </Button>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => navigate(`/productos/${producto.id}/editar`)}
          >
            Editar
          </Button>
        </Space>
      </div>

      <Card>
        <Descriptions bordered column={1} size="middle">
          <Descriptions.Item label='Nombre'>{producto.nombre}</Descriptions.Item>
          <Descriptions.Item label='Marca'>{producto.marca?.nombre ?? '-'}</Descriptions.Item>
          <Descriptions.Item label='Categoria'>{producto.categoriaNivel2?.nombre ?? '-'}</Descriptions.Item>
          <Descriptions.Item label='Estado'>
            <Tag color={coloresDeEstado[producto.estado]}>{producto.estado}</Tag>
          </Descriptions.Item>
          <Descriptions.Item label='Costo Neto'>{formatearMoneda(producto.costoNeto)}</Descriptions.Item>
          <Descriptions.Item label='Utilidad (%)'>{Number(producto.utilidadPorcentaje).toFixed(2)}%</Descriptions.Item>
          <Descriptions.Item label='Precio Lista'>{formatearMoneda(producto.precioLista)}</Descriptions.Item>
          <Descriptions.Item label='Descuento Contado (%)'>{Number(producto.descuentoContadoPorcentaje).toFixed(2)}%</Descriptions.Item>
          <Descriptions.Item label='Precio Contado'>{formatearMoneda(producto.precioContado)}</Descriptions.Item>
          <Descriptions.Item label='Stock Total'>{producto.stockTotal}</Descriptions.Item>
          <Descriptions.Item label='Fecha de Creacion'>{formatearFecha(producto.fechaCreacion)}</Descriptions.Item>
          <Descriptions.Item label='Ultima Actualizacion'>{formatearFecha(producto.fechaActualizacion)}</Descriptions.Item>
        </Descriptions>
      </Card>
    </div>
  );
}
