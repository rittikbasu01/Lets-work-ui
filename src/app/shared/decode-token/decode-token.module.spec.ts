import { DecodeTokenModule } from './decode-token.module';

describe('DecodeTokenModule', () => {
  let decodeTokenModule: DecodeTokenModule;

  beforeEach(() => {
    decodeTokenModule = new DecodeTokenModule();
  });

  it('should create an instance', () => {
    expect(decodeTokenModule).toBeTruthy();
  });
});
