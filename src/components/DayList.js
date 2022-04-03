import React from "react";

import DayListItem from "./DayListItem";

export default function DayList(props) {

  return (
    <ul>
      {props.days.map((data) => {
        return (
          <DayListItem
            key={data.id}
            name={data.name}
            spots={data.spots}
            selected={data.name === props.value}
            setDay={() => props.onChange(data.name)}
          />
        );
      })}
    </ul>
  );
}