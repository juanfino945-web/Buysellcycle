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
const client_1 = require("@prisma/client");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const prisma = new client_1.PrismaClient();
async function main() {
    console.log('Iniciando seed de Provincias y Localidades...');
    const datasetPath = path.join(__dirname, 'data', 'localidades-arg.json');
    if (!fs.existsSync(datasetPath)) {
        throw new Error(`No se encontró el dataset en ${datasetPath}. Corré antes: npx ts-node scripts/descargar-localidades.ts`);
    }
    const dataset = JSON.parse(fs.readFileSync(datasetPath, 'utf-8'));
    console.log(`Cargando ${dataset.provincias.length} provincias...`);
    const mapaProvincias = new Map();
    for (const p of dataset.provincias) {
        const provincia = await prisma.provincia.upsert({
            where: { codigoIndec: p.id },
            update: { nombre: p.nombre },
            create: { nombre: p.nombre, codigoIndec: p.id },
        });
        mapaProvincias.set(p.id, provincia.id);
    }
    console.log(`✔ Provincias cargadas: ${mapaProvincias.size}`);
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
//# sourceMappingURL=seed.js.map