import { PrismaService } from '../prisma/prisma.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
export declare class ClienteService {
    private prisma;
    constructor(prisma: PrismaService);
    private validarUnicidad;
    create(createClienteDto: CreateClienteDto): Promise<{
        id: number;
        nombre: string;
        archivado: boolean;
        fechaCreacion: Date;
        fechaActualizacion: Date;
        provinciaId: number;
        localidadId: number;
        apellido: string;
        dni: string;
        email: string;
    }>;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<({
        provincia: {
            id: number;
            nombre: string;
            codigoIndec: string;
            archivado: boolean;
            fechaCreacion: Date;
            fechaActualizacion: Date;
        };
        localidad: {
            id: number;
            nombre: string;
            codigoIndec: string;
            archivado: boolean;
            fechaCreacion: Date;
            fechaActualizacion: Date;
            provinciaId: number;
        };
    } & {
        id: number;
        nombre: string;
        archivado: boolean;
        fechaCreacion: Date;
        fechaActualizacion: Date;
        provinciaId: number;
        localidadId: number;
        apellido: string;
        dni: string;
        email: string;
    })[]>;
    findAllArchivados(): import("@prisma/client").Prisma.PrismaPromise<({
        provincia: {
            id: number;
            nombre: string;
            codigoIndec: string;
            archivado: boolean;
            fechaCreacion: Date;
            fechaActualizacion: Date;
        };
        localidad: {
            id: number;
            nombre: string;
            codigoIndec: string;
            archivado: boolean;
            fechaCreacion: Date;
            fechaActualizacion: Date;
            provinciaId: number;
        };
    } & {
        id: number;
        nombre: string;
        archivado: boolean;
        fechaCreacion: Date;
        fechaActualizacion: Date;
        provinciaId: number;
        localidadId: number;
        apellido: string;
        dni: string;
        email: string;
    })[]>;
    findOne(id: number): Promise<{
        provincia: {
            id: number;
            nombre: string;
            codigoIndec: string;
            archivado: boolean;
            fechaCreacion: Date;
            fechaActualizacion: Date;
        };
        localidad: {
            id: number;
            nombre: string;
            codigoIndec: string;
            archivado: boolean;
            fechaCreacion: Date;
            fechaActualizacion: Date;
            provinciaId: number;
        };
    } & {
        id: number;
        nombre: string;
        archivado: boolean;
        fechaCreacion: Date;
        fechaActualizacion: Date;
        provinciaId: number;
        localidadId: number;
        apellido: string;
        dni: string;
        email: string;
    }>;
    update(id: number, updateClienteDto: UpdateClienteDto): Promise<{
        id: number;
        nombre: string;
        archivado: boolean;
        fechaCreacion: Date;
        fechaActualizacion: Date;
        provinciaId: number;
        localidadId: number;
        apellido: string;
        dni: string;
        email: string;
    }>;
    remove(id: number): Promise<{
        id: number;
        nombre: string;
        archivado: boolean;
        fechaCreacion: Date;
        fechaActualizacion: Date;
        provinciaId: number;
        localidadId: number;
        apellido: string;
        dni: string;
        email: string;
    }>;
    restore(id: number): Promise<{
        id: number;
        nombre: string;
        archivado: boolean;
        fechaCreacion: Date;
        fechaActualizacion: Date;
        provinciaId: number;
        localidadId: number;
        apellido: string;
        dni: string;
        email: string;
    }>;
}
