import { useEffect, useState, useReducer } from 'react';
import axios from 'axios';
import { statements } from '@babel/template';
import { getDayFromAppointment } from "../../helpers/selectors";


export default function useApplicationData() {

  const SET_DAY = "SET_DAY";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_INTERVIEW = "SET_INTERVIEW";
  const SET_SPOTS = "SET_SPOTS";

  function reducer(state, action) {
    switch (action.type) {
      case SET_DAY:
        return {...state, day: action.value }
      case SET_APPLICATION_DATA:
        return {...state, days: action.daysValue, appointments: action.appointmentsValue, interviewers: action.interviewersValue,
        spots: action.spotsValue}

      case SET_INTERVIEW:

        const interview = action.interview;

        const appointment = {
          ...state.appointments[action.id],
          interview
        };

        const appointments = {
          ...state.appointments,
          [action.id]: appointment
        };

        
        return {...state, appointments }
      case SET_SPOTS:
        return {...state, days: action.value}
      default:
        throw new Error(`Tried to reduce with unsuported action type: ${action.type}`)
    }
  }


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
      const newSocket = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);

      newSocket.onopen = () => {
        newSocket.send("ping");
      }

      newSocket.onmessage = (e) => {
        const msg = JSON.parse(e.data);
        
        if (msg.type === "SET_INTERVIEW") {
          dispatch({type: "SET_INTERVIEW", id : msg.id, interview: msg.interview})
        } 
        
        //   if (msg.interview) {
        //     setSpots(state, "inc")
        //   } else {
        //     setSpots(state, "dec")
        // }}
      }
      return () => newSocket.close; 


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
      
      dispatch({ type: SET_INTERVIEW, value :appointments});
      // setSpots(state, "inc");
    }

    function deleteInterview(id) {
      const interview = null;
      const appointment = {
        ...state.appointments[id],
        interview
      };
      const appointments = {
        ...state.appointments,
        [id]: appointment
      };
      dispatch({type: SET_INTERVIEW, value: appointments});
      // setSpots(state, "dec");

    }

    function setSpots(state, action) {

      return dispatch({type: SET_SPOTS, value: state.days.map((item) => {
        if(state.day === item.name) {
          if(action === 'dec') {
            return {
              ...item,
              spots: item.spots +1
            }
          } 
          if(action === "inc") {
            return {
              ...item,
              spots: item.spots -1
            }
          }
        } else {
          return {...item}
        }
      })})

    }

    return {
      state,
      setDay,
      bookInterview,
      deleteInterview
    }

}