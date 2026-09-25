import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Input, Select, Button, Typography, Card, message, Spin } from 'antd';
import { useClienteStore } from './cliente.store';
import { provinciasApi } from '../Provincias/provincias.Api';
import { localidadesApi } from '../Localidades/localidades.Api';
import type { Provincias } from '../Provincias/provincias.types';
import type { Localidades } from '../Localidades/localidades.types';
import type { createClienteDto } from './clientes.types';

const { Title } = Typography;

export default function ClienteFormPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const esEdicion = Boolean(id);

  const [form] = Form.useForm<createClienteDto>();
  const [provincias, setProvincias] = useState<Provincias[]>([]);
  const [localidades, setLocalidades] = useState<Localidades[]>([]);
  const [cargandoProvincias, setCargandoProvincias] = useState(true);
  const [cargandoLocalidades, setCargandoLocalidades] = useState(false);
  const [guardando, setGuardando] = useState(false);

  const {
    clienteActual,
    loading,
    fetchClientesPorId,
    crearCliente,
    actualizarCliente,
    limpiarClienteActual,
  } = useClienteStore();

  // Cargar todas las provincias al montar
  useEffect(() => {
    provinciasApi
      .getAll()
      .then(setProvincias)
      .catch(() => message.error('Error al cargar las provincias.'))
      .finally(() => setCargandoProvincias(false));
  }, []);

  // Si es edicion, traer los datos del cliente
  useEffect(() => {
    if (esEdicion && id) {
      fetchClientesPorId(Number(id));
    }
    return () => {
      limpiarClienteActual();
    };
  }, [id, esEdicion, fetchClientesPorId, limpiarClienteActual]);

  // Precargar el formulario en modo edición (y cargar las localidades de su provincia)
  useEffect(() => {
    if (esEdicion && clienteActual) {
      form.setFieldsValue({
        nombre: clienteActual.nombre,
        apellido: clienteActual.apellido,
        dni: clienteActual.dni,
        email: clienteActual.email,
        provinciaId: clienteActual.provinciaId,
        localidadId: clienteActual.localidadId,
      });

      // Cargar las localidades de la provincia del cliente para que el select tenga opciones
      setCargandoLocalidades(true);
      localidadesApi
        .getByProvincia(clienteActual.provinciaId)
        .then(setLocalidades)
        .finally(() => setCargandoLocalidades(false));
    }
  }, [clienteActual, esEdicion, form]);

  // Cuando el usuario cambia la provincia manualmente
  const handleProvinciaChange = async (provinciaId: number) => {
    form.setFieldValue('localidadId', undefined); // resetea la localidad elegida
    setLocalidades([]);
    setCargandoLocalidades(true);
    try {
      const data = await localidadesApi.getByProvincia(provinciaId);
      setLocalidades(data);
    } catch {
      message.error('Error al cargar las localidades.');
    } finally {
      setCargandoLocalidades(false);
    }
  };

  const handleSubmit = async (values: createClienteDto) => {
    setGuardando(true);
    try {
      if (esEdicion && id) {
        await actualizarCliente(Number(id), values);
        message.success('Cliente actualizado correctamente.');
      } else {
        await crearCliente(values);
        message.success('Cliente creado correctamente.');
      }
      navigate('/clientes');
    } catch (error: any) {
      const mensaje =
        error?.response?.data?.message && Array.isArray(error.response.data.message)
          ? error.response.data.message[0]
          : error?.response?.data?.message ?? 'Ocurrió un error al guardar el cliente.';
      message.error(mensaje);
    } finally {
      setGuardando(false);
    }
  };

  if (cargandoProvincias || (esEdicion && loading && !clienteActual)) {
    return (
      <div style={{ padding: 24, textAlign: 'center' }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div style={{ padding: 24, maxWidth: 500, margin: '0 auto' }}>
      <Title level={2}>{esEdicion ? 'Editar cliente' : 'Nuevo cliente'}</Title>

      <Card>
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            label="Nombre"
            name="nombre"
            rules={[{ required: true, message: 'El nombre es obligatorio.' }]}
          >
            <Input placeholder="Ej: Pablo" />
          </Form.Item>

          <Form.Item
            label="Apellido"
            name="apellido"
            rules={[{ required: true, message: 'El apellido es obligatorio.' }]}
          >
            <Input placeholder="Ej: Rios" />
          </Form.Item>

          <Form.Item
            label="DNI"
            name="dni"
            rules={[{ required: true, message: 'El DNI es obligatorio.' }]}
          >
            <Input placeholder="Ej: 26319432" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'El email es obligatorio.' },
              { type: 'email', message: 'Ingresa un email valido.' },
            ]}
          >
            <Input placeholder="Ej: Mariogomes432@gmail.com" />
          </Form.Item>

          <Form.Item
            label="Provincia"
            name="provinciaId"
            rules={[{ required: true, message: 'Seleccioná una provincia.' }]}
          >
            <Select
              placeholder="Seleccionar provincia"
              options={provincias.map((p) => ({ value: p.id, label: p.nombre }))}
              onChange={handleProvinciaChange}
            />
          </Form.Item>

          <Form.Item
            label="Localidad"
            name="localidadId"
            rules={[{ required: true, message: 'Selecciona una localidad.' }]}
          >
            <Select
              placeholder="Seleccionar localidad"
              options={localidades.map((l) => ({ value: l.id, label: l.nombre }))}
              loading={cargandoLocalidades}
              disabled={localidades.length === 0 && !cargandoLocalidades}
              notFoundContent={cargandoLocalidades ? 'Cargando...' : 'Elegi una provincia primero'}
            />
          </Form.Item>

          <Form.Item style={{ marginTop: 24 }}>
            <Button type="primary" htmlType="submit" loading={guardando} block>
              {esEdicion ? 'Guardar cambios' : 'Crear cliente'}
            </Button>
            <Button
              style={{ marginTop: 8 }}
              onClick={() => navigate('/clientes')}
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