import { JsonLogger } from './json.logger';

describe('JsonLogger', () => {
  let logger: JsonLogger;

  beforeEach(() => {
    logger = new JsonLogger();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should be level log json', () => {
    const addMock = jest.spyOn(console, 'log').mockImplementation(() => {});
    const message = 'some log test text';
    logger.log(message);
    const expected = JSON.stringify({
      level: 'log',
      message: message,
      optionalParams: [],
    });
    expect(addMock).toHaveBeenCalledWith(expected);
  });

  it('should be level error json', () => {
    const addMock = jest.spyOn(console, 'error').mockImplementation(() => {});
    const message = 'some error test text';
    logger.error(message);
    const expected = JSON.stringify({
      level: 'error',
      message: message,
      optionalParams: [],
    });
    expect(addMock).toHaveBeenCalledWith(expected);
  });

  it('should be level warn json', () => {
    const addMock = jest.spyOn(console, 'warn').mockImplementation(() => {});
    const message = 'some warning test text';
    logger.warn(message);
    const expected = JSON.stringify({
      level: 'warn',
      message: message,
      optionalParams: [],
    });
    expect(addMock).toHaveBeenCalledWith(expected);
  });
});
