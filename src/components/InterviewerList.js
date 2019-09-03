import React from 'react';
import InterviewerListItem from "components/InterviewerListItem";
import "components/InterviewerList.scss";

export default function InterviewerList(props) {
  const interviewers = props.interviewers.map((item) => 
    <InterviewerListItem
      key={item.id}
      name={item.name}
      avatar={item.avatar}
      selected={item.id === props.interviewer}
      setInterviewer={event => props.setInterviewer(item.id)} 
    />
  )
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewers}</ul>
    </section>
  )
}