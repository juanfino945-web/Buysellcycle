import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Input, Button, Typography, Card, message, Spin } from 'antd';
import { useCategoriaNivel1Store } from './categoria-nivel1.store';
import type { createCategoriaNivel1Dto } from './categoria-nivel1.types';

const { Title } = Typography;

export default function CategoriaNivel1FormPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const esEdicion = Boolean(id);

  const [form] = Form.useForm<createCategoriaNivel1Dto>();
  const [guardando, setGuardando] = useState(false);

  const {
    categoriaActual,
    loading,
    fetchCategoriaPorId,
    crearCategoria,
    actualizarCategoria,
    limpiarCategoriaActual,
  } = useCategoriaNivel1Store();

  useEffect(() => {
    if (esEdicion && id) {
      fetchCategoriaPorId(Number(id));
    }
    return () => {
      limpiarCategoriaActual();
    };
  }, [id, esEdicion, fetchCategoriaPorId, limpiarCategoriaActual]);

  useEffect(() => {
    if (esEdicion && categoriaActual) {
      form.setFieldsValue({ nombre: categoriaActual.nombre });
    }
  }, [categoriaActual, esEdicion, form]);

  const handleSubmit = async (values: createCategoriaNivel1Dto) => {
    setGuardando(true);
    try {
      if (esEdicion && id) {
        await actualizarCategoria(Number(id), values);
        message.success('Categoría actualizada correctamente.');
      } else {
        await crearCategoria(values);
        message.success('Categoría creada correctamente.');
      }
      navigate('/categorias-nivel1');
    } catch {
      message.error('Ocurrió un error al guardar la categoría.');
    } finally {
      setGuardando(false);
    }
  };

  if (esEdicion && loading && !categoriaActual) {
    return (
      <div style={{ padding: 24, textAlign: 'center' }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div style={{ padding: 24, maxWidth: 500, margin: '0 auto' }}>
      <Title level={2}>{esEdicion ? 'Editar categoría' : 'Nueva categoría'}</Title>

      <Card>
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            label="Nombre"
            name="nombre"
            rules={[{ required: true, message: 'El nombre es obligatorio.' }]}
          >
            <Input placeholder="Ej: Electrodomésticos" />
          </Form.Item>

          <Form.Item style={{ marginTop: 24 }}>
            <Button type="primary" htmlType="submit" loading={guardando} block>
              {esEdicion ? 'Guardar cambios' : 'Crear categoría'}
            </Button>
            <Button
              style={{ marginTop: 8 }}
              onClick={() => navigate('/categorias-nivel1')}
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