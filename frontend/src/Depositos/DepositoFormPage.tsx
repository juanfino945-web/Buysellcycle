import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Input, Select, Button, Typography, Card, message, Spin } from 'antd';
import { useDepositoStore } from './deposito.store';
import { provinciasApi } from '../Provincias/provincias.Api';
import { localidadesApi } from '../Localidades/localidades.Api';
import type { Provincias } from '../Provincias/provincias.types';
import type { Localidades } from '../Localidades/localidades.types';
import type { createDepositoDto } from './deposito.types';

const { Title } = Typography;

export default function DepositoFormPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const esEdicion = Boolean(id);

  const [form] = Form.useForm<createDepositoDto>();
  const [provincias, setProvincias] = useState<Provincias[]>([]);
  const [localidades, setLocalidades] = useState<Localidades[]>([]);
  const [cargandoProvincias, setCargandoProvincias] = useState(true);
  const [cargandoLocalidades, setCargandoLocalidades] = useState(false);
  const [guardando, setGuardando] = useState(false);

  const {
    depositoActual,
    loading,
    fetchDepositoPorId,
    crearDeposito,
    actualizarDeposito,
    limpiarDepositoActual,
  } = useDepositoStore();

  useEffect(() => {
    provinciasApi
      .getAll()
      .then(setProvincias)
      .catch(() => message.error('Error al cargar las provincias.'))
      .finally(() => setCargandoProvincias(false));
  }, []);

  useEffect(() => {
    if (esEdicion && id) {
      fetchDepositoPorId(Number(id));
    }
    return () => {
      limpiarDepositoActual();
    };
  }, [id, esEdicion, fetchDepositoPorId, limpiarDepositoActual]);

  useEffect(() => {
    if (esEdicion && depositoActual) {
      form.setFieldsValue({
        nombre: depositoActual.nombre,
        provinciaId: depositoActual.provinciaId,
        localidadId: depositoActual.localidadId,
      });
      setCargandoLocalidades(true);
      localidadesApi
        .getByProvincia(depositoActual.provinciaId)
        .then(setLocalidades)
        .finally(() => setCargandoLocalidades(false));
    }
  }, [depositoActual, esEdicion, form]);

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

  const handleSubmit = async (values:createDepositoDto) => {
    setGuardando(true);
    try {
      if (esEdicion && id) {
        await actualizarDeposito(Number(id), values);
        message.success('Deposito actualizado correctamente.');
      } else {
        await crearDeposito(values);
        message.success('Deposito creado correctamente.');
      }
      navigate('/depositos');
    } catch {
      message.error('Ocurrió un error al guardar el deposito.');
    } finally {
      setGuardando(false);
    }
  };

  if (cargandoProvincias || (esEdicion && loading && !depositoActual)) {
    return (
      <div style={{ padding: 24, textAlign: 'center' }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div style={{ padding: 24, maxWidth: 500, margin: '0 auto' }}>
      <Title level={2}>{esEdicion ? 'Editar deposito' : 'Nuevo deposito'}</Title>

      <Card>
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            label="Nombre"
            name="nombre"
            rules={[{ required: true, message: 'El nombre es obligatorio.' }]}
          >
            <Input placeholder="Ej: Deposito Central" />
          </Form.Item>

          <Form.Item
            label="Provincia"
            name="provinciaId"
            rules={[{ required: true, message: 'Selecciona una provincia.' }]}
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
              {esEdicion ? 'Guardar cambios' : 'Crear deposito'}
            </Button>
            <Button
              style={{ marginTop: 8 }}
              onClick={() => navigate('/depositos')}
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