export const SET_DAY = "SET_DAY";
export const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
export const SET_INTERVIEW = "SET_INTERVIEW";
const SET_SPOTS = "SET_SPOTS";

export default function reducer(state, action) {
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

      const days =  [...state.days ]
      
      if(action.day) {
        const pos = days.map((e) => 
          e.name
         ).indexOf(action.day);
        

        if(interview) {
          days[pos].spots --; 
        } else if (!interview) {
          days[pos].spots ++; 
        }

      }  
      return {...state, appointments, days }
    case SET_SPOTS:
      return {...state, days: action.value}
    default:
      throw new Error(`Tried to reduce with unsuported action type: ${action.type}`)
  }
}