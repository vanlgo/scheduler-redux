function getAppointmentsForDay(state, day) {
  // searching for the current day selected
  const currentDay = state.days.filter(daily => daily.name === day);

  // if there is no day found, return an empty array
  if (currentDay.length < 1) {
    return [];
  }

  // finding appointment array in current day
  const currentApps = [...currentDay[0].appointments];

  // searching the appointments data that match appointment ids from current day
  return currentApps.map(data => state.appointments[data]);
};

function getInterviewersForDay(state, day) {
  // searching for the current day selected
  const currentDay = state.days.filter(daily => daily.name === day);

  // if there is no day found, return an empty array
  if (currentDay.length < 1) {
    return [];
  }

  // finding interviewer array in current day
  const currentApps = [...currentDay[0].interviewers];

  // searching the interviewer data that match interviewer ids from current day
  return currentApps.map(data => state.interviewers[data]);
};

function getInterview(state, interview) {
  // first filter out null interviews
  if (!interview) {
    return null;
  }

  // get interviewer using id from interview object and searching through state interviewer data
  const interviewer = state.interviewers[interview.interviewer]

  return {
    student: interview.student, // get student name from interviewer
    interviewer: interviewer
  }
};

export {
  getAppointmentsForDay,
  getInterviewersForDay,
  getInterview
}