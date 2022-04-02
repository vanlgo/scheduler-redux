import React from "react";

import "./styles.scss";

export default function Appointment(props) {

  function formatTime() {
    return (
      // checking if there are no appointments
      !props.time ? "No Appointments"
        // if there is an appointment, provide appointment time
        : `Appointment at ${props.time}`
    );
  }
  return (
    <article className="appointment">{formatTime()}</article>
  );
}