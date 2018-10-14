import { ClosedModule } from './closed.module';

describe('ClosedModule', () => {
  let closedModule: ClosedModule;

  beforeEach(() => {
    closedModule = new ClosedModule();
  });

  it('should create an instance', () => {
    expect(closedModule).toBeTruthy();
  });
});
