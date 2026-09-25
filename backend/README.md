# Backend - BuySellCycle

Este backend está desarrollado con NestJS + TypeScript + Prisma + MySQL.

## Requisitos

- Node.js 18 o superior
- npm
- MySQL corriendo localmente
- Prisma CLI disponible por dependencias del proyecto

## 1) Instalar dependencias

```bash
npm install
```

## 2) Configurar la base de datos

Asegurate de tener la base de datos creada en MySQL y que el archivo `.env` tenga la variable `DATABASE_URL` correcta.

Configuración usada en este proyecto:

```env
DATABASE_URL="mysql://root:sql1234@localhost:3306/progiv_db"
```

## 3) Generar y aplicar el esquema

```bash
npx prisma generate
npx prisma migrate deploy
```

Si la base todavía no tiene las tablas creadas:

```bash
npx prisma migrate dev
```

## 4) Ejecutar el proyecto

Modo desarrollo:

```bash
npm run start:dev
```

Modo produccion:

```bash
npm run build
npm run start:prod
```

## 5) Verificar que funciona

La API normalmente queda disponible en:

```text
http://localhost:3000
```

## 6) Pruebas

```bash
npm run test
```

## Observación importante

La app usa Prisma con MySQL. Si no existe la base que indica `DATABASE_URL`, el backend no va a arrancar correctamente.

---

## Ruta de trabajo recomendada

La forma correcta de probarlo es desde la carpeta `backend` y luego, en otra terminal, ejecutar el frontend.
