import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

  const setDay = day => setState({ ...state, day });

  // function calculating current remaining spots
  function updateSpots(appointments) {
    // looking for the day object that matches current day
    const spotObj = state.days.find(day => day.name === state.day);

    let spots = 0; // creating spot counter

    // cycling through all the appointment slots to see if there is any vacancies
    for (const id of spotObj.appointments) {
      const appointment = appointments[id];
      if (appointment.interview === null) { // checking if there is no appointment is spot
        spots++;                            // add to counter if there is a vacancy available
      }
    }

    const day = { ...spotObj, spots }                           // creating new day object updated with new spots
    const newDays = state.days
      .map(newDay => newDay.name === state.day ? day : newDay); // looking through state to replace current day with new day object

    return newDays;
  };

  function bookInterview(id, interview) {

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const newday = updateSpots(appointments);

    return axios.put(`/api/appointments/${id}`, { interview: interview })
      .then(() => {
        setState({
          ...state,
          appointments,
          days: newday
        });
      })
  };

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const newday = updateSpots(appointments);

    return axios.delete(`/api/appointments/${id}`)
      .then(() => {
        setState({
          ...state,
          appointments,
          days: newday
        });
      })
  };

  useEffect(() => {
    // data sets being requested from api
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, [])

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }
}
