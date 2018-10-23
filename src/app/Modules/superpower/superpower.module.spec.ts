import { SuperpowerModule } from './superpower.module';

describe('SuperpowerModule', () => {
  let superpowerModule: SuperpowerModule;

  beforeEach(() => {
    superpowerModule = new SuperpowerModule();
  });

  it('should create an instance', () => {
    expect(superpowerModule).toBeTruthy();
  });
});
