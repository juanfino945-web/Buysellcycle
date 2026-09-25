import { Test, TestingModule } from '@nestjs/testing';
import { PresupuestoController } from './presupuesto.controller';

describe('PresupuestoController', () => {
  let controller: PresupuestoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PresupuestoController],
    }).compile();

    controller = module.get<PresupuestoController>(PresupuestoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
