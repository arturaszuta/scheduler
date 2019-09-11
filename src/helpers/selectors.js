
//Helper function which gets appointments for a specific day
function getAppointmentsForDay(state, day) {
  let result = [];
  state.days.forEach(element => {
    if(element.name === day) {
      element.appointments.forEach((e) => {
        result.push(state.appointments[e]);
      })
    }
  });

  return result;
}

//Helper function which gets a whole interviewer object given just an ID of one
function getInterviewer(state, interviewerID) {
  
  const interviewer = Object.values(state.interviewers).find((interviewer) =>
    interviewer.id === interviewerID
  )
  return interviewer;
}

//Get all itnerviewers available on a specific day
function getInterviewersForDay(state, day) {

  let arrOfInterviewers = [];
  let answerArray = [];

  state.days.map((element) => {
    if (element.name === day) {
      arrOfInterviewers = element.interviewers;
    }
  })

  if (arrOfInterviewers.length === 0) {
    return arrOfInterviewers;
  } else {
    arrOfInterviewers.forEach((element) => {
      answerArray.push(getInterviewer(state, element));
    })
    return answerArray;
  }

}

//Helper function which gets all spots for a specific day
function getSpotsForTheDay(state, day) {
  return state.days[day].spots
}


//Gets a specific day from an appointment ID
function getDayFromAppointment (state, appID) {

  let answer = '';

  state.days.forEach((day) =>  {

    day.appointments.forEach((appointment) => {
      if ( appID === appointment ) {
        answer = day.id;
      }
        
    })
  })
  return answer;
}

export { getAppointmentsForDay, getInterviewer, getInterviewersForDay, getSpotsForTheDay, getDayFromAppointment }

