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

function getInterviewer(state, interviewerID) {
  
  const interviewer = Object.values(state.interviewers).find((interviewer) =>
    interviewer.id === interviewerID
  )
  return interviewer;
}

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

function getSpotsForTheDay(state, day) {
  return state.days[day].spots
}

function getDayFromAppointment (state, appID) {
  console.log("THIS IS THE APP ID", appID);

  let answer = '';

  state.days.forEach((day) =>  {

    day.appointments.forEach((appointment) => {
      if ( appID === appointment ) {
        console.log('DAY FOUND', day);
        answer = day.id;
      }
        
    })
  })
  return answer;
}

export { getAppointmentsForDay, getInterviewer, getInterviewersForDay, getSpotsForTheDay, getDayFromAppointment }

