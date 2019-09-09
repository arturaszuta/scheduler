import { useEffect, useState, useReducer } from 'react';
import axios from 'axios';
import { statements } from '@babel/template';
import { getDayFromAppointment } from "../../helpers/selectors";

import reducer, {
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW
} from "reducers/application";



// const SET_DAY = "SET_DAY";
// const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
// const SET_INTERVIEW = "SET_INTERVIEW";
// const SET_SPOTS = "SET_SPOTS";

// function reducer(state, action) {
//   switch (action.type) {
//     case SET_DAY:
//       return {...state, day: action.value }
//     case SET_APPLICATION_DATA:
//       return {...state, days: action.daysValue, appointments: action.appointmentsValue, interviewers: action.interviewersValue,
//       spots: action.spotsValue}

//     case SET_INTERVIEW:

//       const interview = action.interview;

//       const appointment = {
//         ...state.appointments[action.id],
//         interview
//       };

//       const appointments = {
//         ...state.appointments,
//         [action.id]: appointment
//       };

//       const days =  [...state.days ]
      
//       if(action.day) {
//         const pos = days.map((e) => 
//           e.name
//          ).indexOf(action.day);
        

//         if(interview) {
//           days[pos].spots --; 
//         } else if (!interview) {
//           days[pos].spots ++; 
//         }

//       }  
//       return {...state, appointments, days }
//     case SET_SPOTS:
//       return {...state, days: action.value}
//     default:
//       throw new Error(`Tried to reduce with unsuported action type: ${action.type}`)
//   }
// }

export default function useApplicationData() {

  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
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
        dispatch(({type: SET_APPLICATION_DATA, daysValue: all[0].data, appointmentsValue: all[1].data, interviewersValue: all[2].data,
        }))
      })

    }, [])

    useEffect(() => {
      const newSocket = new WebSocket("ws://localhost:8001");

      newSocket.onopen = () => {
        newSocket.send("ping");
      }

      newSocket.onmessage = (e) => {
        const msg = JSON.parse(e.data);
        if (msg.type === "SET_INTERVIEW") {
          dispatch({type: "SET_INTERVIEW", id : msg.id, interview: msg.interview, day: msg.day})
        } 
      }
      return () => newSocket.close; 

    }, [])

    return {
      state,
      setDay,
    }

}