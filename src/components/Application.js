import React from "react";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment/index"
import { getAppointmentsForDay, getInterviewer, getInterviewersForDay } from "../helpers/selectors";
import useApplicationData from "../src/hooks/useApplicationData";




//Main application component

export default function Application(props) {

  const {
    state,
    setDay,
  } = useApplicationData();


  //Function which builds all apointments for a specific day
  let allAppointments = getAppointmentsForDay(state, state.day).map((item) => {
    let interview = null;
    if ( item.interview) {
      interview = getInterviewer(state, item.interview.interviewer);
    }
  const allInterviewers = getInterviewersForDay(state, state.day);
    
  return <Appointment 
    key={item.id} 
    {...item} 
    interviewer={interview} 
    day={state.day}
    interviewers={allInterviewers}
  />
  })

  allAppointments.push(<Appointment key="last" time="5pm"/>);


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
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        { allAppointments }
      </section>
    </main>
  );
}


