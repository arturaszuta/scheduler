import React, { useState } from 'react';
import Button from '../Button';
import InterviewerList from '../InterviewerList';

//Form component which displays a student name field and all interviewers available that day

export default function Form(props) {
  
  //This block manages state of each individual block

  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");

  function reset() {
    setName('');
    setInterviewer(null);
  }

  function cancel() {
    reset();
    props.onCancel();
  }

  const day = props.day;

  return (
    <main className="appointment__card appointment__card--create">
    <section className="appointment__card-left">
      <form autoComplete="off">
        <input
          className="appointment__create-input text--semi-bold"
          name="name"
          type="text"
          placeholder="Enter Student Name"
          onChange={(event) => setName(event.target.value)}
          value={name}
          onSubmit = {event => event.preventDefault()}
          data-testid="student-name-input"
        />
        <section className="appointment__validation">{error}</section>
      </form>
      <InterviewerList interviewers={props.interviewers} interviewer={interviewer} setInterviewer={setInterviewer} />
    </section>
    <section className="appointment__card-right">
      <section className="appointment__actions">
        <Button danger onClick={cancel}>Cancel</Button>
        <Button confirm onClick={()=> {
          if (!name || !interviewer) {
            setError("Must provide a student name and interviewer.")
            return;
          }
          setError("");
          props.onSave(name, interviewer, day)}}>Save</Button>
      </section>
    </section>
  </main>  
  )
}