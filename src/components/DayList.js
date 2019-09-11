import React from 'react';
import DayListItem from "components/DayListItem";


//Daylist component which shows all the weekdays
export default function DayList(props) {
  const days = props.days.map((item, index) => 
    <DayListItem
      key={index}
      name={item.name}
      spots={item.spots}
      selected={item.name === props.day}
      setDay={props.setDay} 
    />
  )

  return (
    <ul>
      {days}
    </ul>
  )
}