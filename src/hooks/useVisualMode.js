import { useState } from "react";

function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {
    // if replace is true, replace current mode with a new one
    if (replace) {
      const temp = [...history];       // make a new array holding history
      temp[temp.length - 1] = newMode; // replace last entry of held history with new mode

      setMode(newMode);  // replace mode
      setHistory(temp);  // replace history with new last entry in array
    } else {
      // otherwise, transition appends new mode to history
      setMode(newMode);
      setHistory([...history, newMode]);
    }
  };

  function back() {
    // checking if there is history to go back on
    if (history.length > 1) {
      const temp = [...history]; // make a new array holding history

      temp.pop();                         // taking away last entry in held history
      const back = temp[temp.length - 1]; // getting the previous mode

      setMode(back);    // setting mode to previous mode
      setHistory(temp); // deleting the last mode
    }
  };

  return {
    mode,
    transition,
    back
  };
}

export {
  useVisualMode
}