import { TSKVlogger } from './tskv.logger';

describe('TSKVLogger', () => {
  let logger: TSKVlogger;

  beforeEach(() => {
    logger = new TSKVlogger();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should be level log tskv', () => {
    const addMock = jest.spyOn(console, 'log').mockImplementation(() => {});
    const message = 'some log test text';
    const optionalParams = 'some params';
    logger.log(message, optionalParams);
    const expected = `level=log\tmessage=${message}\toptionalParams=${optionalParams}\n`;
    expect(addMock).toHaveBeenCalledWith(expected);
  });

  it('should be level error tskv', () => {
    const addMock = jest.spyOn(console, 'error').mockImplementation(() => {});
    const message = 'some error test text';
    const optionalParams = 'some params';
    logger.error(message, optionalParams);
    const expected = `level=error\tmessage=${message}\toptionalParams=${optionalParams}\n`;
    expect(addMock).toHaveBeenCalledWith(expected);
  });

  it('should be level warn tskv', () => {
    const addMock = jest.spyOn(console, 'warn').mockImplementation(() => {});
    const message = 'some warning test text';
    const optionalParams = 'some params';
    logger.warn(message, optionalParams);
    const expected = `level=warn\tmessage=${message}\toptionalParams=${optionalParams}\n`;
    expect(addMock).toHaveBeenCalledWith(expected);
  });
});
