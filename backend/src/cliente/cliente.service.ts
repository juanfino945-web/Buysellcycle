import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';

@Injectable()
export class ClienteService {
  constructor(private prisma: PrismaService) {}

  private async validarUnicidad(dni: string, email: string, idExcluir?: number) {
    const porDni = await this.prisma.cliente.findUnique({ where: { dni } });
    if (porDni && porDni.id !== idExcluir) {
      throw new ConflictException(`Ya existe un cliente con el DNI ${dni}`);
    }

    const porEmail = await this.prisma.cliente.findUnique({ where: { email } });
    if (porEmail && porEmail.id !== idExcluir) {
      throw new ConflictException(`Ya existe un cliente con el email ${email}`);
    }
  }

  async create(createClienteDto: CreateClienteDto) {
    await this.validarUnicidad(createClienteDto.dni, createClienteDto.email);
    return this.prisma.cliente.create({ data: createClienteDto });
  }

  findAll() {
    return this.prisma.cliente.findMany({
      where: { archivado: false },
      include: { provincia: true, localidad: true },
      orderBy: { apellido: 'asc' },
    });
  }

  findAllArchivados() {
    return this.prisma.cliente.findMany({
      where: { archivado: true },
      include: { provincia: true, localidad: true },
      orderBy: { apellido: 'asc' },
    });
  }

  async findOne(id: number) {
    const cliente = await this.prisma.cliente.findUnique({
      where: { id },
      include: { provincia: true, localidad: true },
    });

    if (!cliente) {
      throw new NotFoundException(`Cliente con id ${id} no encontrado`);
    }

    return cliente;
  }

  async update(id: number, updateClienteDto: UpdateClienteDto) {
    const clienteActual = await this.findOne(id);

    if (updateClienteDto.dni || updateClienteDto.email) {
      await this.validarUnicidad(
        updateClienteDto.dni ?? clienteActual.dni,
        updateClienteDto.email ?? clienteActual.email,
        id,
      );
    }

    return this.prisma.cliente.update({
      where: { id },
      data: updateClienteDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.cliente.update({
      where: { id },
      data: { archivado: true },
    });
  }

  async restore(id: number) {
    await this.findOne(id);
    return this.prisma.cliente.update({
      where: { id },
      data: { archivado: false },
    });
  }
}