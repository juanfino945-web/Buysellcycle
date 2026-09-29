import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, InputNumber, Select, Input, Button, Typography, Card, message, Spin } from 'antd';
import { usePlanStore } from './plan.store';
import { useTarjetaStore } from '../Tarjeta/tarjeta.store';
import { useBancoStore } from '../Banco/banco.store';
import type { createPlanDto } from './plan.types';

const { Title } = Typography;
const { TextArea } = Input;

export default function PlanFormPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const esEdicion = Boolean(id);

  const [form] = Form.useForm<createPlanDto>();
  const [guardando, setGuardando] = useState(false);

  const {
    planActual,
    loading,
    fetchPlanPorId,
    crearPlan,
    actualizarPlan,
    limpiarPlanActual,
  } = usePlanStore();

  const { tarjetas, fetchTarjetas } = useTarjetaStore();
  const { bancos, fetchBancos } = useBancoStore();

  useEffect(() => {
    fetchTarjetas();
    fetchBancos();
  }, [fetchTarjetas, fetchBancos]);

  useEffect(() => {
    if (esEdicion && id) {
      fetchPlanPorId(Number(id));
    }
    return () => {
      limpiarPlanActual();
    };
  }, [id, esEdicion, fetchPlanPorId, limpiarPlanActual]);

  useEffect(() => {
    if (esEdicion && planActual) {
      form.setFieldsValue({
        tarjetaId: planActual.tarjetaId,
        bancoId: planActual.bancoId,
        cantidadCuotas: planActual.cantidadCuotas,
        tasaFinanciacion: Number(planActual.tasaFinanciacion),
        observaciones: planActual.observaciones ?? undefined,
      });
    }
  }, [planActual, esEdicion, form]);

  const handleSubmit = async (values: createPlanDto) => {
    setGuardando(true);
    try {
      if (esEdicion && id) {
        await actualizarPlan(Number(id), values);
        message.success('Plan actualizado correctamente.');
      } else {
        await crearPlan(values);
        message.success('Plan creado correctamente.');
      }
      navigate('/planes');
    } catch (error: any) {
      const backendMessage = error?.response?.data?.message;
      message.error(
        Array.isArray(backendMessage)
          ? backendMessage[0]
          : backendMessage ?? 'Ocurrio un error al guardar el plan.',
      );
    } finally {
      setGuardando(false);
    }
  };

  if (esEdicion && loading && !planActual) {
    return (
      <div style={{ padding: 24, textAlign: 'center' }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div style={{ padding: 24, maxWidth: 500, margin: '0 auto' }}>
      <Title level={2}>{esEdicion ? 'Editar plan' : 'Nuevo plan'}</Title>

      <Card>
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            label="Tarjeta"
            name="tarjetaId"
            rules={[{ required: true, message: 'Selecciona la tarjeta.' }]}
          >
            <Select
              placeholder="Selecciona una tarjeta"
              options={tarjetas.map((t) => ({ value: t.id, label: t.nombre }))}
            />
          </Form.Item>

          <Form.Item
            label="Banco"
            name="bancoId"
            rules={[{ required: true, message: 'Selecciona el banco.' }]}
          >
            <Select
              placeholder="Seleccioná un banco"
              options={bancos.map((b) => ({ value: b.id, label: b.nombre }))}
            />
          </Form.Item>

          <Form.Item
            label="Cantidad de cuotas"
            name="cantidadCuotas"
            rules={[{ required: true, message: 'Ingresa la cantidad de cuotas.' }]}
          >
            <InputNumber min={1} style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            label="Tasa de financiación (%)"
            name="tasaFinanciacion"
            rules={[{ required: true, message: 'Ingresa la tasa de financiacion.' }]}
          >
            <InputNumber min={0} step={0.01} style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item label="Observaciones" name="observaciones">
            <TextArea rows={3} placeholder="Opcional" />
          </Form.Item>

          <Form.Item style={{ marginTop: 24 }}>
            <Button type="primary" htmlType="submit" loading={guardando} block>
              {esEdicion ? 'Guardar cambios' : 'Crear plan'}
            </Button>
            <Button style={{ marginTop: 8 }} onClick={() => navigate('/planes')} block>
              Cancelar
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}