import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Form,
  Select,
  InputNumber,
  Button,
  Typography,
  Card,
  message,
  Spin,
  Space,
} from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { usePresupuestoStore } from './presupuesto.store';
import { clienteApi } from '../Clientes/clientes.Api';
import { productoApi } from '../Producto/producto.api';
import type { Cliente } from '../Clientes/clientes.types';
import type { Producto } from '../Producto/producto.types';
import type { createPresupuestoDto } from './presupuesto.types';

const { Title } = Typography;

const formatearMoneda = (valor: number) => {
  return valor.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' });
};

export default function PresupuestoFormPage() {
  const navigate = useNavigate();
  const [form] = Form.useForm<createPresupuestoDto>();

  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [productos, setProductos] = useState<Producto[]>([]);
  const [cargandoOpciones, setCargandoOpciones] = useState(true);
  const [guardando, setGuardando] = useState(false);

  // Para recalcular el total en vivo, necesitamos "escuchar" los valores del form
  const items = Form.useWatch('items', form) ?? [];

  const { crearPresupuesto } = usePresupuestoStore();

  useEffect(() => {
    Promise.all([clienteApi.getAll(), productoApi.getAll()])
      .then(([clientesData, productosData]) => {
        setClientes(clientesData);
        setProductos(productosData);
      })
      .catch(() => message.error('Error al cargar clientes y productos.'))
      .finally(() => setCargandoOpciones(false));
  }, []);

  const getPrecioProducto = (productoId?: number): number => {
    if (!productoId) return 0;
    const producto = productos.find((p) => p.id === productoId);
    return producto ? Number(producto.precioLista) : 0;
  };

  const calcularSubtotal = (productoId?: number, cantidad?: number): number => {
    if (!productoId || !cantidad) return 0;
    return getPrecioProducto(productoId) * cantidad;
  };

  const totalGeneral = (items as { productoId?: number; cantidad?: number }[]).reduce(
    (acc, item) => acc + calcularSubtotal(item?.productoId, item?.cantidad),
    0,
  );

  const handleSubmit = async (values: createPresupuestoDto) => {
    setGuardando(true);
    try {
      await crearPresupuesto(values);
      message.success('Presupuesto creado correctamente.');
      navigate('/presupuestos');
    } catch {
      message.error('Ocurrió un error al crear el presupuesto.');
    } finally {
      setGuardando(false);
    }
  };

  if (cargandoOpciones) {
    return (
      <div style={{ padding: 24, textAlign: 'center' }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div style={{ padding: 24, maxWidth: 800, margin: '0 auto' }}>
      <Title level={2}>Nuevo presupuesto</Title>

      <Card>
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            label="Cliente"
            name="clienteId"
            rules={[{ required: true, message: 'Seleccioná un cliente.' }]}
          >
            <Select
              placeholder="Seleccionar cliente"
              options={clientes.map((c) => ({
                value: c.id,
                label: `${c.nombre} ${c.apellido}`,
              }))}
              showSearch
              optionFilterProp="label"
            />
          </Form.Item>

          <Form.List name="items">
            {(fields, { add, remove }) => (
              <>
                <div style={{ marginBottom: 12, fontWeight: 500 }}>Ítems</div>

                {fields.map((field) => (
                  <Space
                    key={field.key}
                    align="baseline"
                    style={{ display: 'flex', marginBottom: 8, width: '100%' }}
                  >
                    <Form.Item
                      {...field}
                      name={[field.name, 'productoId']}
                      rules={[{ required: true, message: 'Elegí un producto.' }]}
                      style={{ marginBottom: 0, width: 300 }}
                    >
                      <Select
                        placeholder="Producto"
                        options={productos.map((p) => ({
                          value: p.id,
                          label: p.nombre,
                        }))}
                        showSearch
                        optionFilterProp="label"
                      />
                    </Form.Item>

                    <Form.Item
                      {...field}
                      name={[field.name, 'cantidad']}
                      rules={[{ required: true, message: 'Ingresá la cantidad.' }]}
                      style={{ marginBottom: 0, width: 120 }}
                    >
                      <InputNumber min={1} placeholder="Cantidad" style={{ width: '100%' }} />
                    </Form.Item>

                    <span style={{ minWidth: 120 }}>
                      {formatearMoneda(
                        calcularSubtotal(
                          items[field.name]?.productoId,
                          items[field.name]?.cantidad,
                        ),
                      )}
                    </span>

                    <Button
                      icon={<DeleteOutlined />}
                      danger
                      onClick={() => remove(field.name)}
                    />
                  </Space>
                ))}

                <Button
                  type="dashed"
                  onClick={() => add()}
                  icon={<PlusOutlined />}
                  style={{ marginBottom: 16 }}
                >
                  Agregar ítem
                </Button>
              </>
            )}
          </Form.List>

          <div style={{ textAlign: 'right', fontSize: 18, marginBottom: 24 }}>
            <strong>Total: {formatearMoneda(totalGeneral)}</strong>
          </div>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={guardando} block>
              Crear presupuesto
            </Button>
            <Button
              style={{ marginTop: 8 }}
              onClick={() => navigate('/presupuestos')}
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