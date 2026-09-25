import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Input, Button, Typography, Card, message, Spin } from 'antd';
import { useMarcaStore } from './marca.store';
import type { createMarcaDto } from './marca.types';

const { Title } = Typography;

export default function MarcaFormPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const esEdicion = Boolean(id);

  const [form] = Form.useForm<createMarcaDto>();
  const [guardando, setGuardando] = useState(false);

  const {
    marcaActual,
    loading,
    fetchMarcasPorId,
    crearMarca,
    actualizarMarca,
    limpiarMarcaActual,
  } = useMarcaStore();

  useEffect(() => {
    if (esEdicion && id) {
      fetchMarcasPorId(Number(id));
    }
    return () => {
      limpiarMarcaActual();
    };
  }, [id, esEdicion, fetchMarcasPorId, limpiarMarcaActual]);

  useEffect(() => {
    if (esEdicion && marcaActual) {
      form.setFieldsValue({ nombre: marcaActual.nombre });
    }
  }, [marcaActual, esEdicion, form]);

  const handleSubmit = async (values: createMarcaDto) => {
    setGuardando(true);
    try {
      if (esEdicion && id) {
        await actualizarMarca(Number(id), values);
        message.success('Marca actualizada correctamente.');
      } else {
        await crearMarca(values);
        message.success('Marca creada correctamente.');
      }
      navigate('/marcas');
    } catch {
      message.error('Ocurrio un error al guardar la marca.');
    } finally {
      setGuardando(false);
    }
  };

  if (esEdicion && loading && !marcaActual) {
    return (
      <div style={{ padding: 24, textAlign: 'center' }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div style={{ padding: 24, maxWidth: 500, margin: '0 auto' }}>
      <Title level={2}>{esEdicion ? 'Editar marca' : 'Nueva marca'}</Title>

      <Card>
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            label="Nombre"
            name="nombre"
            rules={[{ required: true, message: 'El nombre es obligatorio.' }]}
          >
            <Input placeholder="Ej: Samsung" />
          </Form.Item>

          <Form.Item style={{ marginTop: 24 }}>
            <Button type="primary" htmlType="submit" loading={guardando} block>
              {esEdicion ? 'Guardar cambios' : 'Crear marca'}
            </Button>
            <Button
              style={{ marginTop: 8 }}
              onClick={() => navigate('/marcas')}
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