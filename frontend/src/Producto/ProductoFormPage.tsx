import {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {
  Form,
  Input,
  InputNumber,
  Select,
  Button,
  Typography,
  Card,
  message,
  Spin,
} from 'antd';
import {useProductoStore} from './producto.store';
import { marcaApi } from '../Marcas/marca.Api';
import {categoriaNivel2Api} from '../Categorias-Nivel2/categoria-nivel2.api';
import type {Marca} from '../Marcas/marca.types';
import type { CategoriaNivel2 } from '../Categorias-Nivel2/categoria-nivel2.types';
import type {CreateProductoDto} from './producto.types';


const {Title} = Typography;

export default function ProductoFormPage() {
  const {id} = useParams<{id: string}>();
  const navigate = useNavigate();
  const esEdicion = Boolean(id);

  const [form] = Form.useForm<CreateProductoDto>();
  const [marcas, setMarcas] = useState<Marca[]>([]);
  const [categorias, setCategorias] = useState<CategoriaNivel2[]>([]);
  const [cargandoDatos, setCargandoDatos] = useState(true);
  const [guardando, setGuardando] = useState(false);

  const {
    productoActual,
    fetchProductoPorId,
    crearProducto,
    actualizarProducto,
    limpiarProductoActual,
  } = useProductoStore();


  useEffect(() => {
    Promise.all([marcaApi.getAll(), categoriaNivel2Api.getAll()])
    .then(([marcosData, categoriasData]) => {
      setMarcas(marcosData);
      setCategorias(categoriasData);
    })
    .catch(() => message.error('Error al cargar marcas o categorias'))
    .finally(() => setCargandoDatos(false));
  }, []);

  useEffect(() => {
    if (esEdicion && id) {
      fetchProductoPorId(Number(id));
    }
    return () => {
      limpiarProductoActual();
    };
  }, [id, esEdicion, fetchProductoPorId, limpiarProductoActual]);

  useEffect(() => {
    if(esEdicion && productoActual) {
      form.setFieldsValue({
        nombre: productoActual.nombre,
        costoNeto: Number(productoActual.costoNeto),
        utilidadPorcentaje: Number(productoActual.utilidadPorcentaje),
        descuentoContadoPorcentaje: Number(productoActual.descuentoContadoPorcentaje),
        marcaId: productoActual.marcaId,
        categoriaNivel2Id: productoActual.categoriaNivel2Id,
      });
    }
  }, [esEdicion, productoActual, form]);

  const handleSubmit = async (values: CreateProductoDto) => {
    setGuardando(true);
    try {
      if(esEdicion && id) {
        await actualizarProducto(Number(id), values);
        message.success('Producto actualizado correctamente');
      } else {
        await crearProducto(values);
        message.success('producto creado correctamente');
      }
      navigate('/productos');
    } catch {
      message.error('error al guardar el producto');
    } finally {
      setGuardando(false);
    }
  };

  if (cargandoDatos || (esEdicion && !productoActual)) {
    return (
      <div style={{ padding:24, textAlign: 'center'}}>
      <Spin size="large" />
      </div>
    );
  }

  return (
    <div style={{padding: 24, maxWidth: 600, margin: '0 auto'}}>
    <Title level={2}>{esEdicion ? 'Editar Producto' : 'Crear Producto'}</Title>
     <Card>
      <Form form={form} layout= "vertical" onFinish={handleSubmit}>
        <Form.Item
        label="nombre"
        name="nombre"
        rules={[{required: true, message: 'Por favor ingrese el nombre del producto'}]}
        >
          <Input placeholder="ej: Camiseta" />
        </Form.Item>

        <Form.Item
        label="Marca"
        name="marcaId"
        rules={[{required: true, message: 'seleccione una marca'}]}  
        >
          <Select
            placeholder="Seleccione una marca"
            options={marcas.map((marca) => ({value: marca.id, label: marca.nombre}))}
          />
        </Form.Item>

        <Form.Item
            label="Categoría"
            name="categoriaNivel2Id"
            rules={[{ required: true, message: 'Seleccioná una categoría.' }]}
          >
            <Select
              placeholder="Seleccione una categoría"
              options={categorias.map((c) => ({ value: c.id, label: c.nombre }))}
            />
          </Form.Item>

          <Form.Item
            label="Costo neto"
            name="costoNeto"
            rules={[{ required: true, message: 'El costo neto es obligatorio.' }]}
          >
            <InputNumber
              style={{ width: '100%' }}
              min={0}
              precision={2}
              prefix="$"
              placeholder="0.00"
            />
          </Form.Item>

          <Form.Item
            label="Utilidad (%)"
            name="utilidadPorcentaje"
            rules={[{ required: true, message: 'La utilidad es obligatoria.' }]}
          >
            <InputNumber
              style={{ width: '100%' }}
              min={0}
              max={100}
              precision={2}
              suffix="%"
              placeholder="0.00"
            />
          </Form.Item>

           <Form.Item
            label="Descuento contado (%)"
            name="descuentoContadoPorcentaje"
            rules={[{ required: true, message: 'El descuento es obligatorio.' }]}
          >
            <InputNumber
              style={{ width: '100%' }}
              min={0}
              max={100}
              precision={2}
              suffix="%"
              placeholder="0.00"
            />
          </Form.Item>

          <Form.Item style={{ marginTop: 24 }}>
            <Button type="primary" htmlType="submit" loading={guardando} block>
              {esEdicion ? 'Guardar cambios' : 'Crear producto'}
            </Button>
            <Button
              style={{ marginTop: 8 }}
              onClick={() => navigate('/productos')}
              block
            >
              Cancelar
            </Button>
          </Form.Item>
        </Form>
       </Card>
     </div>
    );
  }
