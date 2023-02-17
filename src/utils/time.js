
export const convertSecondsToTime = (inputSeconds) => {
  const hours = Math.floor(inputSeconds / 3600);
  const minutes = Math.floor((inputSeconds % 3600) / 60);
  const seconds = Math.floor(inputSeconds % 60);
  return {
    hours: hours,
    minutes: minutes,
    seconds: seconds
  };
}
