import React, { Fragment } from 'react';
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import useVisualMode from "../../src/hooks/useVisualMode";
import axios from 'axios';
import Confirm from "./Confirm";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const CONFIRM = "CONFIRM";

export default function Appointment(props) {


  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    axios.put('http://localhost:8001/api/appointments/' + props.id, {
      interview
    }).then((result) => {
      props.bookInterview(props.id, interview);
      transition(SHOW);
    })
  }

  function onDelete(id) {
    transition(CONFIRM);
  }

  function onCancel() {
    back();
  }

  function onConfirm() {
    const interview = null;
    transition(SAVING);
    axios.delete('http://localhost:8001/api/appointments/' + props.id
    ).then((result) => {
      props.deleteInterview(props.id, interview);
      transition(EMPTY);
    })
  }

  return (
    <article className='appointment'>
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => {transition(CREATE)}} />}
      {mode === SAVING && <Status />}
      {mode === CONFIRM && <Confirm message='Are you sure you want to delete this appointment?'
      onCancel={onCancel}
      onConfirm={onConfirm}/>}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interviewer}
          onDelete={onDelete}
        />
      )}
      {mode === CREATE && <Form 
      onCancel={() => back()} 
      interviewers={props.interviewers} 
      onSave={save}
      />}
    </article>
  )
}
