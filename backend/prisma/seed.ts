import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

interface ProvinciaApi {
  id: string;
  nombre: string;
}

interface LocalidadApi {
  id: string;
  nombre: string;
  provincia: {
    id: string;
    nombre: string;
  };
}

interface DatasetGeoref {
  provincias: ProvinciaApi[];
  localidades: LocalidadApi[];
}

async function main() {
  console.log('Iniciando seed de Provincias y Localidades...');

  const datasetPath = path.join(__dirname, 'data', 'localidades-arg.json');

  if (!fs.existsSync(datasetPath)) {
    throw new Error(
      `No se encontró el dataset en ${datasetPath}. Corré antes: npx ts-node scripts/descargar-localidades.ts`,
    );
  }

  const dataset: DatasetGeoref = JSON.parse(
    fs.readFileSync(datasetPath, 'utf-8'),
  );

  // 1. Cargar provincias
  console.log(`Cargando ${dataset.provincias.length} provincias...`);
  const mapaProvincias = new Map<string, number>(); // codigoIndec -> id local

  for (const p of dataset.provincias) {
    const provincia = await prisma.provincia.upsert({
      where: { codigoIndec: p.id },
      update: { nombre: p.nombre },
      create: { nombre: p.nombre, codigoIndec: p.id },
    });
    mapaProvincias.set(p.id, provincia.id);
  }
  console.log(`✔ Provincias cargadas: ${mapaProvincias.size}`);

  // 2. Cargar localidades
  console.log(`Cargando ${dataset.localidades.length} localidades (esto puede tardar unos minutos)...`);
  let cargadas = 0;

  for (const l of dataset.localidades) {
    const provinciaId = mapaProvincias.get(l.provincia.id);

    if (!provinciaId) {
      console.warn(`  ⚠ Localidad "${l.nombre}" ignorada: provincia ${l.provincia.id} no encontrada.`);
      continue;
    }

    await prisma.localidad.upsert({
      where: { codigoIndec: l.id },
      update: { nombre: l.nombre, provinciaId },
      create: { nombre: l.nombre, codigoIndec: l.id, provinciaId },
    });

    cargadas++;
    if (cargadas % 500 === 0) {
      console.log(`  ${cargadas} / ${dataset.localidades.length} localidades procesadas...`);
    }
  }

  console.log(`✔ Localidades cargadas: ${cargadas}`);
  console.log('Seed completado con éxito ');
}

main()
  .catch((e) => {
    console.error('Error en el seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });