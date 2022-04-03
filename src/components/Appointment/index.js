import React from "react";
import { useVisualMode } from "hooks/useVisualMode";

import "./styles.scss";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";

export default function Appointment(props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

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

    // getting rid of the interview at id
    cancelInterview(id)
      .then(() => transition(EMPTY));
  }

  function confirm() {
    // display a request for confirmation
    transition(CONFIRM);
  }

  function edit() {
    // display form with edit
    transition(EDIT);
  }



  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={confirm}
          onEdit={edit}
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
      {mode === CONFIRM && (
        <Confirm
          message={"Are you sure you would like to delete?"}
          onConfirm={cancel}
          onCancel={back}
        />
      )}
      {mode === EDIT && (
        <Form
          student={props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
        />
      )}
    </article>
  );
}