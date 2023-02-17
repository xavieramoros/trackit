import { convertSecondsToTime } from '../time'

describe('convertSecondsToTime', () => {
  test('converts 3600 seconds to 1 hour, 0 minutes, and 0 seconds', () => {
    const input = 3600;
    const expectedOutput = {
      hours: 1,
      minutes: 0,
      seconds: 0
    };
    expect(convertSecondsToTime(input)).toEqual(expectedOutput);
  });

  test('converts 3661 seconds to 1 hour, 1 minute, and 1 second', () => {
    const input = 3661;
    const expectedOutput = {
      hours: 1,
      minutes: 1,
      seconds: 1
    };
    expect(convertSecondsToTime(input)).toEqual(expectedOutput);
  });

  test('converts 59 seconds to 0 hours, 0 minutes, and 59 seconds', () => {
    const input = 59;
    const expectedOutput = {
      hours: 0,
      minutes: 0,
      seconds: 59
    };
    expect(convertSecondsToTime(input)).toEqual(expectedOutput);
  });
});
