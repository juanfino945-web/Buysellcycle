import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Input, Select, Button, Typography, Card, message, Spin } from 'antd';
import { useUsuarioStore } from './usuario.store';
import { sucursalApi } from '../Sucursal/sucursal.Api';
import type { Sucursal } from '../Sucursal/sucursal.types';
import type { createUsuarioDto } from './usuario.types';

const { Title } = Typography;

const opcionesRol = [
  { value: 'ADMINISTRACION', label: 'Administración' },
  { value: 'VENDEDOR', label: 'Vendedor' },
];

export default function UsuarioFormPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const esEdicion = Boolean(id);

  const [form] = Form.useForm<createUsuarioDto>();
  const [sucursales, setSucursales] = useState<Sucursal[]>([]);
  const [cargandoSucursales, setCargandoSucursales] = useState(true);
  const [guardando, setGuardando] = useState(false);

  const {
    usuarioActual,
    loading,
    fetchUsuarioPorId,
    crearUsuario,
    actualizarUsuario,
    limpiarUsuarioActual,
  } = useUsuarioStore();

  useEffect(() => {
    sucursalApi
      .getAll()
      .then(setSucursales)
      .catch(() => message.error('Error al cargar las sucursales.'))
      .finally(() => setCargandoSucursales(false));
  }, []);

  useEffect(() => {
    if (esEdicion && id) {
      fetchUsuarioPorId(Number(id));
    }
    return () => {
      limpiarUsuarioActual();
    };
  }, [id, esEdicion, fetchUsuarioPorId, limpiarUsuarioActual]);

  useEffect(() => {
    if (esEdicion && usuarioActual) {
      form.setFieldsValue({
        nombre: usuarioActual.nombre,
        apellido: usuarioActual.apellido,
        dni: usuarioActual.dni,
        nombreUsuario: usuarioActual.nombreUsuario,
        rol: usuarioActual.rol,
        sucursalId: usuarioActual.sucursalId,
      });
    }
  }, [usuarioActual, esEdicion, form]);

  const handleSubmit = async (values: createUsuarioDto) => {
    setGuardando(true);
    try {
      if (esEdicion && id) {
        await actualizarUsuario(Number(id), values);
        message.success('Usuario actualizado correctamente.');
      } else {
        await crearUsuario(values);
        message.success('Usuario creado correctamente.');
      }
      navigate('/usuarios');
    } catch (error: any) {
      const mensaje =
        error?.response?.data?.message && Array.isArray(error.response.data.message)
          ? error.response.data.message[0]
          : error?.response?.data?.message ?? 'Ocurrió un error al guardar el usuario.';
      message.error(mensaje);
    } finally {
      setGuardando(false);
    }
  };

  if (cargandoSucursales || (esEdicion && loading && !usuarioActual)) {
    return (
      <div style={{ padding: 24, textAlign: 'center' }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div style={{ padding: 24, maxWidth: 500, margin: '0 auto' }}>
      <Title level={2}>{esEdicion ? 'Editar usuario' : 'Nuevo usuario'}</Title>

      <Card>
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            label="Nombre"
            name="nombre"
            rules={[{ required: true, message: 'El nombre es obligatorio.' }]}
          >
            <Input placeholder="Ej: María" />
          </Form.Item>

          <Form.Item
            label="Apellido"
            name="apellido"
            rules={[{ required: true, message: 'El apellido es obligatorio.' }]}
          >
            <Input placeholder="Ej: González" />
          </Form.Item>

          <Form.Item
            label="DNI"
            name="dni"
            rules={[{ required: true, message: 'El DNI es obligatorio.' }]}
          >
            <Input placeholder="Ej: 30123456" />
          </Form.Item>

          <Form.Item
            label="Nombre de usuario"
            name="nombreUsuario"
            rules={[{ required: true, message: 'El nombre de usuario es obligatorio.' }]}
          >
            <Input placeholder="Ej: mgonzalez" />
          </Form.Item>

          <Form.Item
            label="Rol"
            name="rol"
            rules={[{ required: true, message: 'Seleccioná un rol.' }]}
          >
            <Select placeholder="Seleccionar rol" options={opcionesRol} />
          </Form.Item>

          <Form.Item
            label="Sucursal"
            name="sucursalId"
            rules={[{ required: true, message: 'Seleccioná una sucursal.' }]}
          >
            <Select
              placeholder="Seleccionar sucursal"
              options={sucursales.map((s) => ({ value: s.id, label: s.nombre }))}
            />
          </Form.Item>

          <Form.Item style={{ marginTop: 24 }}>
            <Button type="primary" htmlType="submit" loading={guardando} block>
              {esEdicion ? 'Guardar cambios' : 'Crear usuario'}
            </Button>
            <Button
              style={{ marginTop: 8 }}
              onClick={() => navigate('/usuarios')}
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