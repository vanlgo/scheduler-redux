import React from "react";

import "components/DayListItem.scss";
import classNames from "classnames";

export default function DayListItem(props) {
  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
 });

 function formatSpots() {
  return (
    // checking if there are no spots
    props.spots === 0 ? "no spots remaining"
    // if there are spots remaining, creates string according to amount
    : `${props.spots} spot${props.spots === 1 ? "" : "s"} remaining`
  );
 }

  return (
    <li
    onClick={() => props.setDay(props.name)}
    className={dayClass}
    >
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots()}</h3>
    </li>
  );
}