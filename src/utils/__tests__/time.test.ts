import { convertSecondsToTime, convertSecondsToFullTime } from '../time'

describe('convertSecondsToTime', () => {
  test('converts 3600 seconds to 1 hour, 0 minutes, and 0 seconds', () => {
    const input = 3600;
    const expectedOutput = {
      hours: '01',
      minutes: '00',
      seconds: '00'
    };
    expect(convertSecondsToTime(input)).toEqual(expectedOutput);
  });

  test('converts 3661 seconds to 1 hour, 1 minute, and 1 second', () => {
    const input = 3661;
    const expectedOutput = {
      hours: '01',
      minutes: '01',
      seconds: '01'
    };
    expect(convertSecondsToTime(input)).toEqual(expectedOutput);
  });

  test('converts 59 seconds to 0 hours, 0 minutes, and 59 seconds', () => {
    const input = 59;
    const expectedOutput = {
      hours: '00',
      minutes: '00',
      seconds: '59'
    };
    expect(convertSecondsToTime(input)).toEqual(expectedOutput);
  });
});


describe('convertSecondsToFullTime', () => {
  test('converts 3600 seconds into 01:00:00 ', () => {
    const input = 3600;
    const expectedOutput = '01:00:00'
    expect(convertSecondsToFullTime(input)).toEqual(expectedOutput);
  });

  test('converts 3601 seconds into 01:00:01 ', () => {
    const input = 3601;
    const expectedOutput = '01:00:01'
    expect(convertSecondsToFullTime(input)).toEqual(expectedOutput);
  })

})
