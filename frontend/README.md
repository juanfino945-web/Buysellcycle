# Frontend - BuySellCycle

Este frontend está desarrollado con React + TypeScript + Vite + Ant Design.

## Requisitos

- Node.js 18 o superior
- npm
- Backend corriendo en `http://localhost:3000`

## 1) Instalar dependencias

```bash
npm install
```

## 2) Ejecutar la aplicacion

Modo desarrollo:

```bash
npm run dev
```

La app queda disponible normalmente en:

```text
http://localhost:5173
```

## 3) Compilar para producción

```bash
npm run build
```

## 4) Preview de producción

```bash
npm run preview
```

## Importante

Este frontend consume la API del backend. Si el backend no está levantado o no responde, la interfaz no podra cargar los datos.

## Orden recomendado para probar la app

1. Levantar MySQL
2. Levantar backend
3. Ejecutar frontend
4. Entrar a `http://localhost:5173`

---

Si querés correr todo junto, tenés que dejar levantado:

- backend: `http://localhost:3000`
- frontend: `http://localhost:5173`

Eso es lo necesario para que la aplicación funcione correctamente.
