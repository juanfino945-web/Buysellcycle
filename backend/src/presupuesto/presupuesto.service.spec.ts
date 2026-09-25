import { Test, TestingModule } from '@nestjs/testing';
import { PresupuestoService } from './presupuesto.service';
import { PrismaService } from '../prisma/prisma.service';

describe('PresupuestoService', () => {
  let service: PresupuestoService;

  const prismaMock = {
    presupuesto: {
      findUnique: jest.fn(),
      update: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PresupuestoService,
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
      ],
    }).compile();

    service = module.get<PresupuestoService>(PresupuestoService);
    jest.clearAllMocks();
  });

  it('should return a restored budget with client and items included', async () => {
    const presupuestoRestaurado = {
      id: 7,
      archivado: false,
      cliente: { id: 1, nombre: 'Ana' },
      items: [{ id: 10, producto: { id: 3, nombre: 'Producto X' } }],
    };

    prismaMock.presupuesto.findUnique.mockResolvedValue({ id: 7 });
    prismaMock.presupuesto.update.mockResolvedValue(presupuestoRestaurado);

    await expect(service.restore(7)).resolves.toEqual(presupuestoRestaurado);

    expect(prismaMock.presupuesto.update).toHaveBeenCalledWith({
      where: { id: 7 },
      data: { archivado: false },
      include: {
        cliente: true,
        items: { include: { producto: true } },
      },
    });
  });
});
