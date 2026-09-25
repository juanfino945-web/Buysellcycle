"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const BASE_URL = 'https://apis.datos.gob.ar/georef/api';
const MAX_POR_PAGINA = 5000;
async function fetchProvincias() {
    const url = `${BASE_URL}/provincias?campos=id,nombre&max=24&orden=nombre`;
    const res = await fetch(url);
    if (!res.ok)
        throw new Error(`Error al traer provincias: ${res.status}`);
    const data = await res.json();
    return data.provincias;
}
async function fetchLocalidades() {
    const localidades = [];
    let inicio = 0;
    let total = Infinity;
    while (inicio < total) {
        const url = `${BASE_URL}/localidades-censales?campos=id,nombre,provincia.id,provincia.nombre&max=${MAX_POR_PAGINA}&inicio=${inicio}`;
        const res = await fetch(url);
        if (!res.ok)
            throw new Error(`Error al traer localidades: ${res.status}`);
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
    fs.writeFileSync(outputPath, JSON.stringify({ provincias, localidades }, null, 2), 'utf-8');
    console.log(`✔ Dataset guardado en: ${outputPath}`);
}
main().catch((e) => {
    console.error('Error al descargar el dataset:', e);
    process.exit(1);
});
//# sourceMappingURL=descargar-localidades.js.map