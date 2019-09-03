import React, { useState, useEffect } from "react";

import axios from 'axios';

import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment/index"

const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "2pm",
    interview: {
      student: "Thomas Birchmount",
      interviewer: {
        id: 2,
        name: "Richard Garson",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 4,
    time: "3pm",
    interview: {
      student: "Rambo Sylvester",
      interviewer: {
        id: 3,
        name: "Tabouli Couscus",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 5,
    time: "4pm",
    interview: {
      student: "Joker Mcallister",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 'last',
    time: "5pm",
  },
];








export default function Application(props) {
  
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

  const setDay = (day) => {
    setState({...state, day: day})
  }

  const setDays = (days) => {
    // setState({...state, days: days})
    setState(prev => ({ ...prev, days }));
  }

  // const [days, setDays] = useState([]);
  // const [day, setDay] = useState('Monday');
  // const [interviewer, setInterviewer] = useState(1);
  
  useEffect(() => {
    axios.get('http://localhost:8001/api/days').then((response) => {
      setDays(response.data);
    })
  }, [])
  
  
  const allAppointments = appointments.map((item, index) => 
  <Appointment key={item.id === appointments.length + 1 ? "last" : item.id } {...item} />
  )

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


