export function getFormattedDate(date) {
  return date.toISOString().slice(0, 10);
}

export function getdateMinusDays(date, days) {
  return new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate() - days
  );
}

/**
 * Round number up to given decimal places.
 * @param num number to round up
 * @param places decimal places
 * @returns rounded up number
 */
export function roundToDecimals(num, places) {
  const factor = 10 ** places;
  const result = (Math.round(num * factor) / factor).toFixed(places);

  return result;
}

/**
 * Converts seconds to hours and round up to decimals.
 * @param counter seconds
 * @param roundToDecimals number of decimals to rund up
 * @returns result in hours as string
 */
export function roundToHour(counter, roundToDecimals = 2) {
  const num = counter / 60 / 60;
  const string = TimeHelpers.roundToDecimals(num, roundToDecimals);

  return string;
}

export function getTime(task) {
  return new Date(task.counter * 1000).toISOString().substring(11, 19);
}

export function getHours(task) {
  let num = task.counter / 60 / 60;
  const result = roundToDecimals(num, 2);
  return result;
}

export function getHourAndTime(task) {
  return `${getTime(task)} (${getHours(task)})`;
}
