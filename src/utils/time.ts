type ConvertedTimeType = {
  hours: string,
  minutes: string,
  seconds: string
}

export const convertSecondsToTime = (inputSeconds: number): ConvertedTimeType  => {
  const hours = Math.floor(inputSeconds / 3600);
  const minutes = Math.floor((inputSeconds % 3600) / 60);
  const seconds = Math.floor(inputSeconds % 60);

  return {
    hours: hours.toLocaleString(undefined, {minimumIntegerDigits: 2}),
    minutes: minutes.toLocaleString(undefined, {minimumIntegerDigits: 2}),
    seconds: seconds.toLocaleString(undefined, {minimumIntegerDigits: 2})
  };
}

export const convertSecondsToFullTime = (inputSeconds: number): string  => {
  const { hours, minutes, seconds } = convertSecondsToTime(inputSeconds);
  return `${hours}:${minutes}:${seconds}`
}