export function getAppointmentsForDay(state, day) {
  // searching for the current day selected
  const currentDay = state.days.filter(daily => daily.name === day);

  console.log(currentDay)


  // if there is no day found, return an empty array
  if (currentDay.length < 1) {
    return [];
  }

  // finding appointment array in current day
  const currentApps = [...currentDay[0].appointments];

  // searching the appointments data that match appointment ids from current day
  return currentApps.map(data => state.appointments[data]);
};