import { useEffect, useState } from 'react';
import { Form, Select, InputNumber, Button, Typography, Card, message, Tabs, Spin, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { stockApi } from './stock.Api';
import { productoApi } from '../Producto/producto.api';
import { depositoApi } from '../Depositos/deposito.Api';
import type { Producto } from '../Producto/producto.types';
import type { Deposito } from '../Depositos/deposito.types';
import type { movimientoStockDto, transferenciaStockDto, StockActual } from './stock.types';
import { Tag } from 'antd';

const { Title } = Typography;

type TipoMovimiento = 'ingreso' | 'egreso' | 'transferencia';

export default function StockMovimientoPage() {
  const [tipo, setTipo] = useState<TipoMovimiento>('ingreso');
  const [productos, setProductos] = useState<Producto[]>([]);
  const [depositos, setDepositos] = useState<Deposito[]>([]);
  const [cargandoOpciones, setCargandoOpciones] = useState(true);
  const [guardando, setGuardando] = useState(false);

  const [formIngreso] = Form.useForm<movimientoStockDto>();
  const [formEgreso] = Form.useForm<movimientoStockDto>();
  const [formTransferencia] = Form.useForm<transferenciaStockDto>();

  const [historial, setHistorial] = useState<StockActual[]>([]);
  const [cargandoHistorial, setCargandoHistorial] = useState(true);

  const cargarHistorial = () => {
    setCargandoHistorial(true);
    stockApi
      .getAll()
      .then(setHistorial)
      .catch(() => message.error('Error al cargar el historial de stock.'))
      .finally(() => setCargandoHistorial(false));
  };

  useEffect(() => {
    Promise.all([productoApi.getAll(), depositoApi.getAll()])
      .then(([productosData, depositosData]) => {
        setProductos(productosData);
        setDepositos(depositosData);
      })
      .catch(() => message.error('Error al cargar productos y depósitos.'))
      .finally(() => setCargandoOpciones(false));
  }, []);

  useEffect(() => {
    cargarHistorial();
  }, []);

  const opcionesProducto = productos.map((p) => ({ value: p.id, label: p.nombre }));
  const opcionesDeposito = depositos.map((d) => ({ value: d.id, label: `${d.codigo} - ${d.nombre}` }));

  const handleIngreso = async (values: movimientoStockDto) => {
    setGuardando(true);
    try {
      const resultado = await stockApi.ingreso(values);
      message.success(`${resultado.mensaje}. Stock en depósito: ${resultado.stockDeposito}`);
      formIngreso.resetFields();
      cargarHistorial();
    } catch (err: any) {
      message.error(err?.response?.data?.message ?? 'Error al registrar el ingreso.');
    } finally {
      setGuardando(false);
    }
  };

  const handleEgreso = async (values: movimientoStockDto) => {
    setGuardando(true);
    try {
      const resultado = await stockApi.egreso(values);
      message.success(`${resultado.mensaje}. Stock en depósito: ${resultado.stockDeposito}`);
      formEgreso.resetFields();
      cargarHistorial();
    } catch (err: any) {
      message.error(err?.response?.data?.message ?? 'Error al registrar el egreso.');
    } finally {
      setGuardando(false);
    }
  };

  const handleTransferencia = async (values: transferenciaStockDto) => {
    setGuardando(true);
    try {
      const resultado = await stockApi.transferencia(values);
      message.success(
        `${resultado.mensaje}. Origen: ${resultado.stockOrigenRestante}, Destino: ${resultado.stockDestinoActual}`,
      );
      formTransferencia.resetFields();
      cargarHistorial();
    } catch (err: any) {
      message.error(err?.response?.data?.message ?? 'Error al registrar la transferencia.');
    } finally {
      setGuardando(false);
    }
  };

  if (cargandoOpciones) {
    return (
      <div style={{ padding: 24, textAlign: 'center' }}>
        <Spin size="large" />
      </div>
    );
  }

  const items = [
    {
      key: 'ingreso',
      label: 'Ingreso',
      children: (
        <Form form={formIngreso} layout="vertical" onFinish={handleIngreso}>
          <Form.Item
            label="Producto"
            name="productoId"
            rules={[{ required: true, message: 'Selecciona un producto.' }]}
          >
            <Select placeholder="Seleccionar producto" options={opcionesProducto} showSearch optionFilterProp="label" />
          </Form.Item>
          <Form.Item
            label="Depósito"
            name="depositoId"
            rules={[{ required: true, message: 'Selecciona un deposito.' }]}
          >
            <Select placeholder="Seleccionar deposito" options={opcionesDeposito} />
          </Form.Item>
          <Form.Item
            label="Cantidad"
            name="cantidad"
            rules={[{ required: true, message: 'Ingresa la cantidad.' }]}
          >
            <InputNumber min={1} style={{ width: '100%' }} />
          </Form.Item>
          <Button type="primary" htmlType="submit" loading={guardando} block>
            Registrar ingreso
          </Button>
        </Form>
      ),
    },
    {
      key: 'egreso',
      label: 'Egreso',
      children: (
        <Form form={formEgreso} layout="vertical" onFinish={handleEgreso}>
          <Form.Item
            label="Producto"
            name="productoId"
            rules={[{ required: true, message: 'Selecciona un producto.' }]}
          >
            <Select placeholder="Seleccionar producto" options={opcionesProducto} showSearch optionFilterProp="label" />
          </Form.Item>
          <Form.Item
            label="Depósito"
            name="depositoId"
            rules={[{ required: true, message: 'Selecciona un deposito.' }]}
          >
            <Select placeholder="Seleccionar depósito" options={opcionesDeposito} />
          </Form.Item>
          <Form.Item
            label="Cantidad"
            name="cantidad"
            rules={[{ required: true, message: 'Ingresa la cantidad.' }]}
          >
            <InputNumber min={1} style={{ width: '100%' }} />
          </Form.Item>
          <Button type="primary" danger htmlType="submit" loading={guardando} block>
            Registrar egreso
          </Button>
        </Form>
      ),
    },
    {
      key: 'transferencia',
      label: 'Transferencia',
      children: (
        <Form form={formTransferencia} layout="vertical" onFinish={handleTransferencia}>
          <Form.Item
            label="Producto"
            name="productoId"
            rules={[{ required: true, message: 'Selecciona un producto.' }]}
          >
            <Select placeholder="Seleccionar producto" options={opcionesProducto} showSearch optionFilterProp="label" />
          </Form.Item>
          <Form.Item
            label="Depósito origen"
            name="depositoOrigenId"
            rules={[{ required: true, message: 'Seleccioná el depósito origen.' }]}
          >
            <Select placeholder="Seleccionar depósito origen" options={opcionesDeposito} />
          </Form.Item>
          <Form.Item
            label="Depósito destino"
            name="depositoDestinoId"
            rules={[{ required: true, message: 'Selecciona el depósito destino.' }]}
          >
            <Select placeholder="Seleccionar depósito destino" options={opcionesDeposito} />
          </Form.Item>
          <Form.Item
            label="Cantidad"
            name="cantidad"
            rules={[{ required: true, message: 'Ingresa la cantidad.' }]}
          >
            <InputNumber min={1} style={{ width: '100%' }} />
          </Form.Item>
          <Button type="primary" htmlType="submit" loading={guardando} block>
            Registrar transferencia
          </Button>
        </Form>
      ),
    },
  ];

const coloresMovimiento: Record<string, string> = {
  INGRESO: 'green',
  EGRESO: 'red',
  TRANSFERENCIA_ORIGEN: 'orange',
  TRANSFERENCIA_DESTINO: 'blue',
};

const etiquetasMovimiento: Record<string, string> = {
  INGRESO: 'Ingreso',
  EGRESO: 'Egreso',
  TRANSFERENCIA_ORIGEN: 'Transferencia (salida)',
  TRANSFERENCIA_DESTINO: 'Transferencia (entrada)',
};

const columnasHistorial: ColumnsType<StockActual> = [
  {
    title: 'Producto',
    key: 'producto',
    render: (_, record) => record.producto.nombre,
  },
  {
    title: 'Depósito',
    key: 'deposito',
    render: (_, record) => `${record.deposito.codigo} - ${record.deposito.nombre}`,
  },
  {
    title: 'Stock',
    dataIndex: 'stock',
    key: 'stock',
    align: 'right',
  },
  {
    title: 'Último movimiento',
    dataIndex: 'ultimoMovimiento',
    key: 'ultimoMovimiento',
    render: (valor: string | null) =>
      valor ? (
        <Tag color={coloresMovimiento[valor]}>{etiquetasMovimiento[valor]}</Tag>
      ) : (
        '—'
      ),
  },
];

  return (
    <div style={{ padding: 24, maxWidth: 700, margin: '0 auto' }}>
      <Title level={2}>Movimientos de stock</Title>
      <Card>
        <Tabs activeKey={tipo} onChange={(key) => setTipo(key as TipoMovimiento)} items={items} />
      </Card>

      <Title level={3} style={{ marginTop: 32 }}>
        Stock actual por deposito
      </Title>
      <Table
        rowKey="id"
        columns={columnasHistorial}
        dataSource={historial}
        loading={cargandoHistorial}
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
}