import { useEffect, useState, useReducer } from 'react';
import axios from 'axios';

export default function useApplicationData() {

  const SET_DAY = "SET_DAY";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_INTERVIEW = "SET_INTERVIEW";

  function reducer(state, action) {
    switch (action.type) {
      case SET_DAY:
        return {...state, day: action.value}
      case SET_APPLICATION_DATA:
        return {...state, days: action.daysValue, appointments: action.appointmentsValue, interviewers: action.interviewersValue}
      case SET_INTERVIEW:
        return {...state, appointments: action.value}
      default:
        throw new Error(`Tried to reduce with unsuported action type: ${action.type}`)
    }
  }


  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = (day) => {
    dispatch({ type: SET_DAY, value: day})
  }
  
  useEffect(() => {

    Promise.all([
        axios.get('http://localhost:8001/api/days'),
        axios.get('http://localhost:8001/api/appointments'),
        axios.get('http://localhost:8001/api/interviewers'),
      ]).then((all) => {
        dispatch(({type: SET_APPLICATION_DATA, daysValue: all[0].data, appointmentsValue: all[1].data, interviewersValue: all[2].data }))
      })

    }, [])

    function bookInterview(id, interview) {
      const appointment = {
        ...state.appointments[id],
        interview: { ...interview }
      };
      const appointments = {
        ...state.appointments,
        [id]: appointment
      };
      dispatch({type: SET_INTERVIEW, value :appointments});
    }

    function deleteInterview(id, interview) {
      const appointment = {
        ...state.appointments[id],
        interview: { interview }
      };
      const appointments = {
        ...state.appointments,
        [id]: appointment
      };
      dispatch({type: SET_INTERVIEW, value: appointments});
    }

    return {
      state,
      setDay,
      bookInterview,
      deleteInterview
    }

}