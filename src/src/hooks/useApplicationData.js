import { useEffect, useReducer } from 'react';
import axios from 'axios';

import reducer, {
  SET_DAY,
  SET_APPLICATION_DATA
} from "reducers/application";

//Function which controls the application data
export default function useApplicationData() {


  //Initial state
  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });


  //Setday state - for when we are switching between days
  const setDay = (day) => {
    dispatch({ type: SET_DAY, value: day})
  }
  
  //Initial data load when the app loads
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

    //Websocket communication with server - which updates all currently connected clients
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