import * as fs from 'fs';
import * as path from 'path';

const BASE_URL = 'https://apis.datos.gob.ar/georef/api';
const MAX_POR_PAGINA = 5000; // límite permitido por la API de Georef

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

async function fetchProvincias(): Promise<ProvinciaApi[]> {
  const url = `${BASE_URL}/provincias?campos=id,nombre&max=24&orden=nombre`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Error al traer provincias: ${res.status}`);
  const data = await res.json();
  return data.provincias;
}

async function fetchLocalidades(): Promise<LocalidadApi[]> {
  const localidades: LocalidadApi[] = [];
  let inicio = 0;
  let total = Infinity;

  while (inicio < total) {
    const url = `${BASE_URL}/localidades-censales?campos=id,nombre,provincia.id,provincia.nombre&max=${MAX_POR_PAGINA}&inicio=${inicio}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Error al traer localidades: ${res.status}`);
    const data = await res.json();

    localidades.push(...data.localidades_censales);
    total = data.total;
    inicio += MAX_POR_PAGINA;

    console.log(`  Descargadas ${Math.min(inicio, total)} / ${total} localidades...`);
  }

  return localidades;
}

async function main() {
  console.log('Descargando provincias desde Georef...');
  const provincias = await fetchProvincias();
  console.log(`✔ ${provincias.length} provincias descargadas.`);

  console.log('Descargando localidades censales desde Georef (puede tardar un minuto)...');
  const localidades = await fetchLocalidades();
  console.log(`✔ ${localidades.length} localidades descargadas.`);

  const dataDir = path.join(__dirname, '..', 'prisma', 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  const outputPath = path.join(dataDir, 'localidades-arg.json');
  fs.writeFileSync(
    outputPath,
    JSON.stringify({ provincias, localidades }, null, 2),
    'utf-8',
  );

  console.log(`✔ Dataset guardado en: ${outputPath}`);
}

main().catch((e) => {
  console.error('Error al descargar el dataset:', e);
  process.exit(1);
});