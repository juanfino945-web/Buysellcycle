import { useEffect, useState } from 'react';
import { Card, Form, InputNumber, Select, Button, Typography, Alert, Statistic, Row, Col } from 'antd';
import { useTarjetaStore } from '../Tarjeta/tarjeta.store';
import { planApi } from '../Plan/plan.Api';
import type { Plan } from '../Plan/plan.types';
import type { Banco } from '../Banco/banco.types';
import { Table } from 'antd';
import { financiacionApi, type simularFinanciacionResultado, type historialFinanciacion } from './financiacion.Api';


const { Title } = Typography;

export default function SimularFinanciacionPage() {
  const { tarjetas, fetchTarjetas } = useTarjetaStore();

  const [tarjetaId, setTarjetaId] = useState<number>();
  const [bancoId, setBancoId] = useState<number>();
  const [planId, setPlanId] = useState<number>();
  const [monto, setMonto] = useState<number>();

  const [planesDeTarjeta, setPlanesDeTarjeta] = useState<Plan[]>([]);
  const [cargandoPlanes, setCargandoPlanes] = useState(false);
  const [simulando, setSimulando] = useState(false);
  const [resultado, setResultado] = useState<simularFinanciacionResultado | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTarjetas();
  }, [fetchTarjetas]);

  const [historial, setHistorial] = useState<historialFinanciacion[]>([]);

  const cargarHistorial = async () => {
  const data = await financiacionApi.getHistorial();
  setHistorial(data);
};

useEffect(() => {
  cargarHistorial();
}, []);

  const handleTarjetaChange = async (nuevaTarjetaId: number) => {
    setTarjetaId(nuevaTarjetaId);
    setBancoId(undefined);
    setPlanId(undefined);
    setResultado(null);
    setCargandoPlanes(true);
    try {
      const planes = await planApi.getFiltrados({ tarjetaId: nuevaTarjetaId });
      setPlanesDeTarjeta(planes);
    } finally {
      setCargandoPlanes(false);
    }
  };

  const handleBancoChange = (nuevoBancoId: number) => {
    setBancoId(nuevoBancoId);
    setPlanId(undefined);
    setResultado(null);
  };

  const handleSimular = async () => {
    if (!tarjetaId || !bancoId || !planId || !monto) return;
    setSimulando(true);
    setError(null);
    try {
      const data = await financiacionApi.simular({ monto, tarjetaId, bancoId, planId });
      setResultado(data);
      cargarHistorial();
    } catch (err: any) {
      setError(err?.response?.data?.message ?? 'No se pudo simular la financiación.');
      setResultado(null);
    } finally {
      setSimulando(false);
    }
  };

  const bancosDisponibles: Banco[] = Array.from(
    new Map(
      planesDeTarjeta
        .filter((p) => p.banco)
        .map((p) => [p.banco!.id, p.banco!]),
    ).values(),
  );

const planesDisponibles = planesDeTarjeta.filter((p) => p.bancoId === bancoId);

  return (
    <div style={{ padding: 24, maxWidth: 500, margin: '0 auto' }}>
      <Title level={2}>Simular Financiación</Title>

      <Card>
        <Form layout="vertical">
          <Form.Item label="Monto">
            <InputNumber
              min={0}
              style={{ width: '100%' }}
              value={monto}
              onChange={(value) => {
                setMonto(value ?? undefined);
                setResultado(null);
              }}
            />
          </Form.Item>

          <Form.Item label="Tarjeta">
            <Select
              placeholder="Seleccioná una tarjeta"
              value={tarjetaId}
              onChange={handleTarjetaChange}
              options={tarjetas.map((t) => ({ value: t.id, label: t.nombre }))}
            />
          </Form.Item>

          <Form.Item label="Banco">
            <Select
              placeholder="Seleccioná un banco"
              value={bancoId}
              onChange={handleBancoChange}
              disabled={!tarjetaId}
              loading={cargandoPlanes}
              options={bancosDisponibles.map((b) => ({ value: b.id, label: b.nombre }))}
              notFoundContent={tarjetaId ? 'No hay planes para esta tarjeta' : undefined}
            />
          </Form.Item>

          <Form.Item label="Plan">
            <Select
              placeholder="Seleccioná un plan"
              value={planId}
              onChange={(value) => {
                setPlanId(value);
                setResultado(null);
              }}
              disabled={!bancoId}
              options={planesDisponibles.map((p) => ({
                value: p.id,
                label: `${p.cantidadCuotas} cuotas - ${Number(p.tasaFinanciacion)}%`,
              }))}
            />
          </Form.Item>

          <Button
            type="primary"
            block
            loading={simulando}
            disabled={!monto || !tarjetaId || !bancoId || !planId}
            onClick={handleSimular}
          >
            Simular
          </Button>
        </Form>

        {error && <Alert type="error" message={error} showIcon style={{ marginTop: 16 }} />}

        {resultado && (
          <Row gutter={16} style={{ marginTop: 24 }}>
            <Col span={12}>
              <Statistic title="Monto total financiado" value={resultado.montoTotal} prefix="$" />
            </Col>
            <Col span={12}>
              <Statistic
                title={`Monto por cuota (${resultado.cantidadCuotas})`}
                value={resultado.montoCuota}
                prefix="$"
              />
            </Col>
          </Row>
        )}
      </Card>

      <Card title="Historial de simulaciones" style={{ marginTop: 24 }}>
  <Table
    rowKey="id"
    size="small"
    dataSource={historial}
    pagination={{ pageSize: 10 }}
    columns={[
      { title: 'Fecha', dataIndex: 'fechaCreacion', key: 'fechaCreacion', render: (f: string) => new Date(f).toLocaleString() },
      { title: 'Tarjeta', key: 'tarjeta', render: (_, r) => r.tarjeta.nombre },
      { title: 'Banco', key: 'banco', render: (_, r) => r.banco.nombre },
      { title: 'Cuotas', dataIndex: 'cantidadCuotas', key: 'cantidadCuotas' },
      { title: 'Monto', dataIndex: 'monto', key: 'monto', render: (m: string) => `$ ${Number(m).toLocaleString()}` },
      { title: 'Total', dataIndex: 'montoTotal', key: 'montoTotal', render: (m: string) => `$ ${Number(m).toLocaleString()}` },
      { title: 'Cuota', dataIndex: 'montoCuota', key: 'montoCuota', render: (m: string) => `$ ${Number(m).toLocaleString()}` },
    ]}
  />
    </Card>
    </div>
  );
}