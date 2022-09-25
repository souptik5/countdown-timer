import { useState, useEffect } from "react";
import CountdownTimer from "./CountdownTimer";
import "./App.css";

const App = () => {
  const THREE_DAYS_IN_MS = 3 * 24 * 60 * 60 * 1000;
  const NOW_IN_MS = new Date().getTime();

  const dateTimeAfterThreeDays = NOW_IN_MS + THREE_DAYS_IN_MS;

  const targetDateFromLocalStorage = JSON.parse(localStorage.getItem("targetDate")) || dateTimeAfterThreeDays;

  const [targetDate, setTargetDate] = useState(
    new Date(targetDateFromLocalStorage)
  );

  useEffect(() => {
    localStorage.setItem("targetDate", JSON.stringify(targetDate));
  }, [targetDate]);

  const handleChange = (event) => {
    event.preventDefault();
    if (event.target.value) {
      setTargetDate(new Date(event.target.value));
    } else {
      setTargetDate(new Date(dateTimeAfterThreeDays));
    }
  };

  return (
    <div>
      <h1>Countdown Timer</h1>
      <form className="form">
        <label htmlFor="countdown-date-time">Select a date and time: </label>
        <input
          type="datetime-local"
          id="countdown-date-time"
          name="countdown-date-time"
          onChange={handleChange}
        />
      </form>
      <CountdownTimer targetDate={targetDate} />
    </div>
  );
};

export default App;
