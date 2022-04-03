import React from "react";
import { useVisualMode } from "hooks/useVisualMode";

import "./styles.scss";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";

export default function Appointment(props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";

  const { id, bookInterview, cancelInterview } = props;

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    // creating new interview object with student input and chosen interviewer
    const interview = {
      student: name,
      interviewer
    };

    // display that the application is attempting to save to api
    transition(SAVING);

    // setting state with new appointment id and new interview object
    bookInterview(id, interview)
      .then(() => transition(SHOW));
  }

  function cancel() {
    // display that the application is attempting to delete
    transition(DELETING, true);

    // getting rid of the id
    cancelInterview(id)
      .then(() => transition(EMPTY));
  }



  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={cancel}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
        />
      )}
      {mode === SAVING && (
        <Status
          message={"SAVING"}
        />
      )}
      {mode === DELETING && (
        <Status
          message={"DELETING"}
        />
      )}
    </article>
  );
}