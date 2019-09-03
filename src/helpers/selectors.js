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
  state.interviewers.forEach((i) => {
    if (i.id === interviewerID) {
      return i.name;
    }
  })    
}

export default {
  getAppointmentsForDay,
  getInterviewer
}



