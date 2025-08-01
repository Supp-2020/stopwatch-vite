import { useState, useEffect, useRef } from "react";
import "./App.css";

export default function App() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef(null);

  const toggleTimer = () => {
    if (isRunning) {
      clearInterval(timerRef.current);
    } else {
      timerRef.current = setInterval(() => {
        setTime((prev) => prev + 10);
      }, 10);
    }
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    clearInterval(timerRef.current);
    setTime(0);
    setIsRunning(false);
  };

const formatTime = () => {
  const milliseconds = Math.floor((time % 1000) / 10);
  const seconds = Math.floor((time / 1000) % 60);
  const minutes = Math.floor(time / 60000);

  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}.${milliseconds.toString().padStart(2, "0")}`;
};

useEffect(() => {
  return () => {
    clearInterval(timerRef.current);
  };
}, []);

  return (
    <div className="container">
      <div className="stopwatch-card">
        <h1>Stopwatch/Timer</h1>
        <div className="time-display">{formatTime()}</div>
        <div className="buttons">
          <button
            onClick={toggleTimer}
            className={isRunning ? "btn stop" : "btn start"}
          >
            {isRunning ? "Stop" : "Begin"}
          </button>
          <button onClick={resetTimer} className="btn reset">Reset</button>
        </div>
      </div>
    </div>
  );
}
