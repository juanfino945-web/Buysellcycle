import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Input, Button, Typography, Card, message, Spin } from 'antd';
import { useProveedorStore } from './proveedor.store';
import type { createProveedorDto } from './proveedor.types';

const { Title } = Typography;

export default function ProveedorFormPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const esEdicion = Boolean(id);

  const [form] = Form.useForm<createProveedorDto>();
  const [guardando, setGuardando] = useState(false);

  const {
    proveedorActual,
    loading,
    fetchProveedorPorId,
    crearProveedor,
    actualizarProveedor,
    limpiarProveedorActual,
  } = useProveedorStore();

  useEffect(() => {
    if (esEdicion && id) {
      fetchProveedorPorId(Number(id));
    }
    return () => {
      limpiarProveedorActual();
    };
  }, [id, esEdicion, fetchProveedorPorId, limpiarProveedorActual]);

  useEffect(() => {
    if (esEdicion && proveedorActual) {
      form.setFieldsValue({
        razonSocial: proveedorActual.razonSocial,
        cuit: proveedorActual.cuit,
      });
    }
  }, [proveedorActual, esEdicion, form]);

  const handleSubmit = async (values: createProveedorDto) => {
    setGuardando(true);
    try {
      if (esEdicion && id) {
        await actualizarProveedor(Number(id), values);
        message.success('Proveedor actualizado correctamente.');
      } else {
        await crearProveedor(values);
        message.success('Proveedor creado correctamente.');
      }
      navigate('/proveedores');
    } catch {
      message.error('Ocurrió un error al guardar el proveedor.');
    } finally {
      setGuardando(false);
    }
  };

  if (esEdicion && loading && !proveedorActual) {
    return (
      <div style={{ padding: 24, textAlign: 'center' }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div style={{ padding: 24, maxWidth: 500, margin: '0 auto' }}>
      <Title level={2}>{esEdicion ? 'Editar proveedor' : 'Nuevo proveedor'}</Title>

      <Card>
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            label="Razón Social"
            name="razonSocial"
            rules={[{ required: true, message: 'La razón social es obligatoria.' }]}
          >
            <Input placeholder="Ej: Distribuidora del Sur S.A." />
          </Form.Item>

          <Form.Item
            label="CUIT"
            name="cuit"
            rules={[
              { required: true, message: 'El CUIT es obligatorio.' },
              {
                pattern: /^\d{2}-\d{8}-\d{1}$/,
                message: 'El CUIT debe tener el formato XX-XXXXXXXX-X.',
              },
            ]}
          >
            <Input placeholder="Ej: 30-12345678-9" />
          </Form.Item>

          <Form.Item style={{ marginTop: 24 }}>
            <Button type="primary" htmlType="submit" loading={guardando} block>
              {esEdicion ? 'Guardar cambios' : 'Crear proveedor'}
            </Button>
            <Button
              style={{ marginTop: 8 }}
              onClick={() => navigate('/proveedores')}
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