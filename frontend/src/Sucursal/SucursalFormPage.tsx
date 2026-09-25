import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Input, Select, Button, Typography, Card, message, Spin } from 'antd';
import { useSucursalStore } from './sucursal.store';
import { provinciasApi } from '../Provincias/provincias.Api';
import { localidadesApi } from '../Localidades/localidades.Api';
import type { Provincias } from '../Provincias/provincias.types';
import type { Localidades } from '../Localidades/localidades.types';
import type { createSucursalDto } from './sucursal.types';

const { Title } = Typography;

export default function SucursalFormPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const esEdicion = Boolean(id);

  const [form] = Form.useForm<createSucursalDto>();
  const [provincias, setProvincias] = useState<Provincias[]>([]);
  const [localidades, setLocalidades] = useState<Localidades[]>([]);
  const [cargandoProvincias, setCargandoProvincias] = useState(true);
  const [cargandoLocalidades, setCargandoLocalidades] = useState(false);
  const [guardando, setGuardando] = useState(false);

  const {
    sucursalActual,
    loading,
    fetchSucursalPorId,
    crearSucursal,
    actualizarSucursal,
    limpiarSucursalActual,
  } = useSucursalStore();

  useEffect(() => {
    provinciasApi
      .getAll()
      .then(setProvincias)
      .catch(() => message.error('Error al cargar las provincias.'))
      .finally(() => setCargandoProvincias(false));
  }, []);

  useEffect(() => {
    if (esEdicion && id) {
      fetchSucursalPorId(Number(id));
    }
    return () => {
      limpiarSucursalActual();
    };
  }, [id, esEdicion, fetchSucursalPorId, limpiarSucursalActual]);

  useEffect(() => {
    if (esEdicion && sucursalActual) {
      form.setFieldsValue({
        nombre: sucursalActual.nombre,
        provinciaId: sucursalActual.provinciaId,
        localidadId: sucursalActual.localidadId,
      });
      setCargandoLocalidades(true);
      localidadesApi
        .getByProvincia(sucursalActual.provinciaId)
        .then(setLocalidades)
        .finally(() => setCargandoLocalidades(false));
    }
  }, [sucursalActual, esEdicion, form]);

  const handleProvinciaChange = async (provinciaId: number) => {
    form.setFieldValue('localidadId', undefined);
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

  const handleSubmit = async (values: createSucursalDto) => {
    setGuardando(true);
    try {
      if (esEdicion && id) {
        await actualizarSucursal(Number(id), values);
        message.success('Sucursal actualizada correctamente.');
      } else {
        await crearSucursal(values);
        message.success('Sucursal creada correctamente.');
      }
      navigate('/sucursales');
    } catch {
      message.error('Ocurrió un error al guardar la sucursal.');
    } finally {
      setGuardando(false);
    }
  };

  if (cargandoProvincias || (esEdicion && loading && !sucursalActual)) {
    return (
      <div style={{ padding: 24, textAlign: 'center' }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div style={{ padding: 24, maxWidth: 500, margin: '0 auto' }}>
      <Title level={2}>{esEdicion ? 'Editar sucursal' : 'Nueva sucursal'}</Title>

      <Card>
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            label="Nombre"
            name="nombre"
            rules={[{ required: true, message: 'El nombre es obligatorio.' }]}
          >
            <Input placeholder="Ej: Sucursal Centro" />
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
            rules={[{ required: true, message: 'Seleccioná una localidad.' }]}
          >
            <Select
              placeholder="Seleccionar localidad"
              options={localidades.map((l) => ({ value: l.id, label: l.nombre }))}
              loading={cargandoLocalidades}
              disabled={localidades.length === 0 && !cargandoLocalidades}
              notFoundContent={cargandoLocalidades ? 'Cargando...' : 'Elegí una provincia primero'}
            />
          </Form.Item>

          <Form.Item style={{ marginTop: 24 }}>
            <Button type="primary" htmlType="submit" loading={guardando} block>
              {esEdicion ? 'Guardar cambios' : 'Crear sucursal'}
            </Button>
            <Button
              style={{ marginTop: 8 }}
              onClick={() => navigate('/sucursales')}
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