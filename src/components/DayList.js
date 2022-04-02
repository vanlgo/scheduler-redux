import React from "react";

import DayListItem from "./DayListItem";
import classNames from "classnames";

export default function DayList(props) {

  return (
    <ul>
      {props.days.map((data) => {
        return (
          <DayListItem
            key={data.id}
            name={data.name}
            spots={data.spots}
            selected={data.name === props.day}
            setDay={props.setDay}
          />
        );
      })}
    </ul>
  );
}