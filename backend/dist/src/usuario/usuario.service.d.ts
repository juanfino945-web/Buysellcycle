import { PrismaService } from '../prisma/prisma.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
export declare class UsuarioService {
    private prisma;
    constructor(prisma: PrismaService);
    private validarSucursal;
    private validarUnicidad;
    create(createUsuarioDto: CreateUsuarioDto): Promise<{
        id: number;
        nombre: string;
        archivado: boolean;
        fechaCreacion: Date;
        fechaActualizacion: Date;
        apellido: string;
        dni: string;
        nombreUsuario: string;
        rol: import("@prisma/client").$Enums.RolUsuario;
        sucursalId: number;
    }>;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<({
        sucursal: {
            id: number;
            nombre: string;
            archivado: boolean;
            fechaCreacion: Date;
            fechaActualizacion: Date;
            provinciaId: number;
            localidadId: number;
        };
    } & {
        id: number;
        nombre: string;
        archivado: boolean;
        fechaCreacion: Date;
        fechaActualizacion: Date;
        apellido: string;
        dni: string;
        nombreUsuario: string;
        rol: import("@prisma/client").$Enums.RolUsuario;
        sucursalId: number;
    })[]>;
    findAllArchivados(): import("@prisma/client").Prisma.PrismaPromise<({
        sucursal: {
            id: number;
            nombre: string;
            archivado: boolean;
            fechaCreacion: Date;
            fechaActualizacion: Date;
            provinciaId: number;
            localidadId: number;
        };
    } & {
        id: number;
        nombre: string;
        archivado: boolean;
        fechaCreacion: Date;
        fechaActualizacion: Date;
        apellido: string;
        dni: string;
        nombreUsuario: string;
        rol: import("@prisma/client").$Enums.RolUsuario;
        sucursalId: number;
    })[]>;
    findOne(id: number): Promise<{
        sucursal: {
            id: number;
            nombre: string;
            archivado: boolean;
            fechaCreacion: Date;
            fechaActualizacion: Date;
            provinciaId: number;
            localidadId: number;
        };
    } & {
        id: number;
        nombre: string;
        archivado: boolean;
        fechaCreacion: Date;
        fechaActualizacion: Date;
        apellido: string;
        dni: string;
        nombreUsuario: string;
        rol: import("@prisma/client").$Enums.RolUsuario;
        sucursalId: number;
    }>;
    update(id: number, updateUsuarioDto: UpdateUsuarioDto): Promise<{
        id: number;
        nombre: string;
        archivado: boolean;
        fechaCreacion: Date;
        fechaActualizacion: Date;
        apellido: string;
        dni: string;
        nombreUsuario: string;
        rol: import("@prisma/client").$Enums.RolUsuario;
        sucursalId: number;
    }>;
    remove(id: number): Promise<{
        id: number;
        nombre: string;
        archivado: boolean;
        fechaCreacion: Date;
        fechaActualizacion: Date;
        apellido: string;
        dni: string;
        nombreUsuario: string;
        rol: import("@prisma/client").$Enums.RolUsuario;
        sucursalId: number;
    }>;
    restore(id: number): Promise<{
        id: number;
        nombre: string;
        archivado: boolean;
        fechaCreacion: Date;
        fechaActualizacion: Date;
        apellido: string;
        dni: string;
        nombreUsuario: string;
        rol: import("@prisma/client").$Enums.RolUsuario;
        sucursalId: number;
    }>;
}
