import React, { Fragment, useEffect } from 'react';
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import useVisualMode from "../../src/hooks/useVisualMode";
import axios from 'axios';
import Confirm from "./Confirm";
import Error from "./Error";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {

  
  
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
    );
    
    useEffect(() => {
      if(mode === EMPTY && props.interview) {
        transition(SHOW);
      }
      if(mode === SHOW && !props.interview) {
        transition(EMPTY);
      }
  
    },[props.interview, mode, transition]);
    
    function save(name, interviewer, day) {
      
      const interview = {
        student: name,
        interviewer
      };
      
      transition(SAVING, true);
      
      axios.put('http://localhost:8001/api/appointments/' + props.id, {
        interview, day
      }).then((result) => {
        transition(SHOW);
      }).catch((error) => {
        transition(ERROR_SAVE, true);
      })
    }
    
    function onDelete(id) {
      transition(CONFIRM);
    }
    
    function onCancel() {
      back();
    }
    
    function onConfirm(day) {
      transition(SAVING, true);
      axios.delete('http://localhost:8001/api/appointments/' + props.id +'/' + day 
      ).then((result) => {
        transition(EMPTY);
      }).catch((error) => {
        transition(ERROR_DELETE, true);
      })
    }
    
    function onEdit() {
      transition(EDIT);  
    }
    if (!props.interviewers)
     console.log(props.interviewers);

    
    
    return (
      <article className='appointment' data-testid="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => {transition(CREATE)}} />}
      {mode === SAVING && <Status />}
      {mode === CONFIRM && <Confirm message='Are you sure you want to delete this appointment?'
      onCancel={onCancel}
      onConfirm={() => onConfirm(props.day)}
      day={props.day}
      />}
      {mode === SHOW && props.interviewer && (
        <Show
          student={props.interview.student}
          interviewer={props.interviewer}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      )}
      {mode === EDIT && <Form 
      name={props.interview.student}
      day={props.day}
      interviewer={props.interview.interviewer} interviewers={props.interviewers}
      onSave={save}
      onCancel={() => back()}/>}
      {mode === CREATE && <Form 
      onCancel={() => back()} 
      interviewers={props.interviewers} 
      onSave={save}
      day={props.day}
      />}
      {mode === ERROR_SAVE && <Error 
      message={"There was an error saving appointment."}
      onClose={onCancel}/>}
      {mode === ERROR_DELETE && <Error message={"There was an error deleting appointment."}
      onClose={onCancel} />}
    </article>
  )
}
