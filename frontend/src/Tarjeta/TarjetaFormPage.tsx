import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Input, Select, Button, Typography, Card, message, Spin } from 'antd';
import { useTarjetaStore } from './tarjeta.store';
import type { createTarjetaDto } from './tarjeta.types';

const { Title } = Typography;

export default function TarjetaFormPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const esEdicion = Boolean(id);

  const [form] = Form.useForm<createTarjetaDto>();
  const [guardando, setGuardando] = useState(false);

  const {
    tarjetaActual,
    loading,
    fetchTarjetaPorId,
    crearTarjeta,
    actualizarTarjeta,
    limpiarTarjetaActual,
  } = useTarjetaStore();

  useEffect(() => {
    if (esEdicion && id) {
      fetchTarjetaPorId(Number(id));
    }
    return () => {
      limpiarTarjetaActual();
    };
  }, [id, esEdicion, fetchTarjetaPorId, limpiarTarjetaActual]);

  useEffect(() => {
    if (esEdicion && tarjetaActual) {
      form.setFieldsValue({ nombre: tarjetaActual.nombre, tipo: tarjetaActual.tipo });
    }
  }, [tarjetaActual, esEdicion, form]);

  const handleSubmit = async (values: createTarjetaDto) => {
    setGuardando(true);
    try {
      if (esEdicion && id) {
        await actualizarTarjeta(Number(id), values);
        message.success('Tarjeta actualizada correctamente.');
      } else {
        await crearTarjeta(values);
        message.success('Tarjeta creada correctamente.');
      }
      navigate('/tarjetas');
    } catch {
      message.error('Ocurrio un error al guardar la tarjeta.');
    } finally {
      setGuardando(false);
    }
  };

  if (esEdicion && loading && !tarjetaActual) {
    return (
      <div style={{ padding: 24, textAlign: 'center' }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div style={{ padding: 24, maxWidth: 500, margin: '0 auto' }}>
      <Title level={2}>{esEdicion ? 'Editar tarjeta' : 'Nueva tarjeta'}</Title>

      <Card>
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            label="Nombre"
            name="nombre"
            rules={[{ required: true, message: 'El nombre es obligatorio.' }]}
          >
            <Input placeholder="Ej: Visa" />
          </Form.Item>

          <Form.Item
            label="Tipo"
            name="tipo"
            rules={[{ required: true, message: 'El tipo es obligatorio.' }]}
          >
            <Select
              placeholder="Seleccioná el tipo"
              options={[
                { value: 'CREDITO', label: 'Crédito' },
                { value: 'DEBITO', label: 'Débito' },
              ]}
            />
          </Form.Item>

          <Form.Item style={{ marginTop: 24 }}>
            <Button type="primary" htmlType="submit" loading={guardando} block>
              {esEdicion ? 'Guardar cambios' : 'Crear tarjeta'}
            </Button>
            <Button
              style={{ marginTop: 8 }}
              onClick={() => navigate('/tarjetas')}
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