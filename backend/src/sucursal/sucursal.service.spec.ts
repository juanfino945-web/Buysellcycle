import { Test, TestingModule } from '@nestjs/testing';
import { ConflictException } from '@nestjs/common';
import { SucursalService } from './sucursal.service';
import { PrismaService } from '../prisma/prisma.service';

describe('SucursalService', () => {
  let service: SucursalService;
  const prismaMock = {
    sucursal: {
      findFirst: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      findUnique: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SucursalService,
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
      ],
    }).compile();

    service = module.get<SucursalService>(SucursalService);
    jest.clearAllMocks();
  });

  it('should reject a duplicate sucursal by name, provincia and localidad', async () => {
    prismaMock.sucursal.findFirst.mockResolvedValue({ id: 99 });

    await expect(
      service.create({
        nombre: 'Sucursal Central',
        provinciaId: 1,
        localidadId: 2,
      }),
    ).rejects.toThrow(new ConflictException('ya existe esta sucursal'));
  });
});
