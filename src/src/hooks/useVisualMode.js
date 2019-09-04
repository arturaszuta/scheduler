import { useState } from 'react';

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);


  function transition(mode, replace = false) {
    if (!replace) {
      setHistory(prev => [...prev, mode]);
      setMode(mode);
    } else {
      setMode(mode);  
    }
  }
  
  function back() {
    if (history.length > 1) {
      const previousHistory = history.slice(0,-1);
      setHistory(previousHistory);
      setMode(previousHistory[previousHistory.length - 1]);
    } else {
      setMode(history[0]);
    }
  }
  

  return {
    mode,
    transition,
    back 
  }
}

// useVisualMode("FIRST");
// useVisualMode.transition("SECOND");
// useVisualMode.transition("THIRD");