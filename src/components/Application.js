import React, { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";

import { getAppointmentsForDay } from "helpers/selectors";

import DayList from "./DayList";
import Appointment from "./Appointment";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

  const dailyAppointments = getAppointmentsForDay(state, state.day);

  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    // data sets being requested from api
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then((all) => {
      setState({
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data
      });
    });
  }, [])

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
            onChange={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {dailyAppointments.map((appointment) => {
          return (<Appointment
            key={appointment.id}
            {...appointment}
          />)
        })}
        {<Appointment key="last" time="5pm" />}
      </section>
    </main>
  );
}
