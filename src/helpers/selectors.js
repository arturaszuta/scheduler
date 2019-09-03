export function getAppointmentsForDay(state, day) {
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

