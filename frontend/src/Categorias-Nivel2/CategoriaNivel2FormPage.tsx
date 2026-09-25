import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Input, Select, Button, Typography, Card, message, Spin } from 'antd';
import { useCategeoriaNivel2Store} from './categoria-nivel2.store';
import { categoriaNivel1Api } from '../Categorias-Nivel1/categoria-nivel1.api';
import type { CategoriaNivel1 } from '../Categorias-Nivel1/categoria-nivel1.types';
import type { createCategoriaNivel2Dto } from './categoria-nivel2.types';

const { Title } = Typography;

export default function CategoriaNivel2FormPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const esEdicion = Boolean(id);

  const [form] = Form.useForm<createCategoriaNivel2Dto>();
  const [categoriasNivel1, setCategoriasNivel1] = useState<CategoriaNivel1[]>([]);
  const [cargandoOpciones, setCargandoOpciones] = useState(true);
  const [guardando, setGuardando] = useState(false);

  const {
    categoriaActual,
    loading,
    fetchCategoriasPorId,
    crearCategoria,
    actualizarCategoria,
    limpiarCategoria,
  } = useCategeoriaNivel2Store();

  // Cargar opciones de Categoria Nivel1 para el select
  useEffect(() => {
    categoriaNivel1Api
      .getAll()
      .then(setCategoriasNivel1)
      .catch(() => message.error('Error al cargar las categorías de nivel 1.'))
      .finally(() => setCargandoOpciones(false));
  }, []);

  // Si es edicion, traer los datos de la categoria
  useEffect(() => {
    if (esEdicion && id) {
      fetchCategoriasPorId(Number(id));
    }
    return () => {
      limpiarCategoria();
    };
  }, [id, esEdicion, fetchCategoriasPorId, limpiarCategoria]);

  // Precargar el formulario en modo edicion
  useEffect(() => {
    if (esEdicion && categoriaActual) {
      form.setFieldsValue({
        nombre: categoriaActual.nombre,
        categoriaNivel1Id: categoriaActual.categoriaNivel1Id,
      });
    }
  }, [categoriaActual, esEdicion, form]);

  const handleSubmit = async (values: createCategoriaNivel2Dto) => {
    setGuardando(true);
    try {
      if (esEdicion && id) {
        await actualizarCategoria(Number(id), values);
        message.success('Categoría actualizada correctamente.');
      } else {
        await crearCategoria(values);
        message.success('Categoría creada correctamente.');
      }
      navigate('/categorias-nivel2');
    } catch {
      message.error('Ocurrió un error al guardar la categoría.');
    } finally {
      setGuardando(false);
    }
  };

  if (cargandoOpciones || (esEdicion && loading && !categoriaActual)) {
    return (
      <div style={{ padding: 24, textAlign: 'center' }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div style={{ padding: 24, maxWidth: 500, margin: '0 auto' }}>
      <Title level={2}>{esEdicion ? 'Editar categoria' : 'Nueva categoria'}</Title>

      <Card>
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            label="Nombre"
            name="nombre"
            rules={[{ required: true, message: 'El nombre es obligatorio.' }]}
          >
            <Input placeholder="Ej: Microondas" />
          </Form.Item>

          <Form.Item
            label="Categoría Nivel 1"
            name="categoriaNivel1Id"
            rules={[{ required: true, message: 'Selecciona una categoria nivel 1.' }]}
          >
            <Select
              placeholder="Seleccionar categoria nivel 1"
              options={categoriasNivel1.map((c) => ({ value: c.id, label: c.nombre }))}
            />
          </Form.Item>

          <Form.Item style={{ marginTop: 24 }}>
            <Button type="primary" htmlType="submit" loading={guardando} block>
              {esEdicion ? 'Guardar cambios' : 'Crear categoria'}
            </Button>
            <Button
              style={{ marginTop: 8 }}
              onClick={() => navigate('/categorias-nivel2')}
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