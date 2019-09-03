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

export { getAppointmentsForDay, getInterviewer }

