import React, { useState, useEffect } from "react";

import axios from 'axios';

import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment/index"
import { promised } from "q";
import { getAppointmentsForDay, getInterviewer, getInterviewersForDay } from "../helpers/selectors";






export default function Application(props) {
  
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = (day) => {
    setState({...state, day: day})
  }
  
  useEffect(() => {

    Promise.all([
        axios.get('http://localhost:8001/api/days'),
        axios.get('http://localhost:8001/api/appointments'),
        axios.get('http://localhost:8001/api/interviewers'),
      ]).then((all) => {
        console.log('THI IS BEING CALLED');
        setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }))
      })

    }, [])

    let allAppointments = getAppointmentsForDay(state, state.day).map((item) => {
      let interview = null;
      if ( item.interview) {
        interview = getInterviewer(state, item.interview.interviewer);
      }
    const allInterviewers = getInterviewersForDay(state, state.day);

 
  return <Appointment key={item.id === getAppointmentsForDay(state, state.day).length + 1 ? "last" : item.id } {...item} interviewer={interview} interviewers={allInterviewers}/>
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


