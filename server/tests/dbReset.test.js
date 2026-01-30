const { getSyncOptions } = require('../index');

describe('DB reset opt-in', () => {
  const original = process.env.DB_RESET;

  afterEach(() => {
    if (original === undefined) {
      delete process.env.DB_RESET;
    } else {
      process.env.DB_RESET = original;
    }
  });

  test('default is not force', () => {
    delete process.env.DB_RESET;
    expect(getSyncOptions().force).toBe(false);
  });

  test('DB_RESET=true sets force true', () => {
    process.env.DB_RESET = 'true';
    expect(getSyncOptions().force).toBe(true);
  });

  test('DB_RESET=false sets force false', () => {
    process.env.DB_RESET = 'false';
    expect(getSyncOptions().force).toBe(false);
  });
});