import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Input, Button, Typography, Card, message, Spin } from 'antd';
import { useBancoStore } from './banco.store';
import type { createBancoDto } from './banco.types';

const { Title } = Typography;

export default function BancoFormPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const esEdicion = Boolean(id);

  const [form] = Form.useForm<createBancoDto>();
  const [guardando, setGuardando] = useState(false);

  const {
    bancoActual,
    loading,
    fetchBancoPorId,
    crearBanco,
    actualizarBanco,
    limpiarBancoActual,
  } = useBancoStore();

  useEffect(() => {
    if (esEdicion && id) {
      fetchBancoPorId(Number(id));
    }
    return () => {
      limpiarBancoActual();
    };
  }, [id, esEdicion, fetchBancoPorId, limpiarBancoActual]);

  useEffect(() => {
    if (esEdicion && bancoActual) {
      form.setFieldsValue({ nombre: bancoActual.nombre });
    }
  }, [bancoActual, esEdicion, form]);

  const handleSubmit = async (values: createBancoDto) => {
    setGuardando(true);
    try {
      if (esEdicion && id) {
        await actualizarBanco(Number(id), values);
        message.success('Banco actualizado correctamente.');
      } else {
        await crearBanco(values);
        message.success('Banco creado correctamente.');
      }
      navigate('/bancos');
    } catch {
      message.error('Ocurrio un error al guardar el banco.');
    } finally {
      setGuardando(false);
    }
  };

  if (esEdicion && loading && !bancoActual) {
    return (
      <div style={{ padding: 24, textAlign: 'center' }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div style={{ padding: 24, maxWidth: 500, margin: '0 auto' }}>
      <Title level={2}>{esEdicion ? 'Editar banco' : 'Nuevo banco'}</Title>

      <Card>
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            label="Nombre"
            name="nombre"
            rules={[{ required: true, message: 'El nombre es obligatorio.' }]}
          >
            <Input placeholder="Ej: Santander" />
          </Form.Item>

          <Form.Item style={{ marginTop: 24 }}>
            <Button type="primary" htmlType="submit" loading={guardando} block>
              {esEdicion ? 'Guardar cambios' : 'Crear banco'}
            </Button>
            <Button
              style={{ marginTop: 8 }}
              onClick={() => navigate('/bancos')}
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