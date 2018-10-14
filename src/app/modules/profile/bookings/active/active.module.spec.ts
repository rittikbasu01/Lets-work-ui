import { ActiveModule } from './active.module';

describe('ActiveModule', () => {
  let activeModule: ActiveModule;

  beforeEach(() => {
    activeModule = new ActiveModule();
  });

  it('should create an instance', () => {
    expect(activeModule).toBeTruthy();
  });
});
