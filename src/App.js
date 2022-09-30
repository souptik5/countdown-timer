import { useState, useEffect } from "react";
import CountdownTimer from "./components/CountdownTimer";
import DayCounter from "./components/DayCounterWidget";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab from "@mui/joy/Tab";
import { TabPanel } from "@mui/joy";
import "./App.css";
import Avatar from "./assets/avatar.png";
import Timer from "./components/Timer";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import TotalTimeWidget from "./components/TotalTimeWidget";

const App = () => {
  const THREE_DAYS_IN_MS = 3 * 24 * 60 * 60 * 1000;
  const NOW_IN_MS = new Date().getTime();

  const dateTimeAfterThreeDays = NOW_IN_MS + THREE_DAYS_IN_MS;

  const targetDateFromLocalStorage =
    JSON.parse(localStorage.getItem("targetDate")) || dateTimeAfterThreeDays;

  const totalTimeFromLocalStorage =
    JSON.parse(localStorage.getItem("timer")) || 0;
  const [totalTime] = useState(totalTimeFromLocalStorage);
  const [targetDate, setTargetDate] = useState(
    new Date(targetDateFromLocalStorage)
  );

  useEffect(() => {
    localStorage.setItem("targetDate", JSON.stringify(targetDate));
    localStorage.setItem("timer", JSON.stringify(totalTime));
  }, [targetDate, totalTime]);

  const handleChange = (event) => {
    event.preventDefault();
    if (event.target.value) {
      setTargetDate(new Date(event.target.value));
    } else {
      setTargetDate(new Date(dateTimeAfterThreeDays));
    }
  };

  const current = new Date();
  let longMonth = current.toLocaleString("en-us", { month: "short" });
  const currentDate = `${current.getDate()} ${longMonth}, ${current.getFullYear()}`;
  const currentPhase =
    current.getHours() < 12
      ? "Morning"
      : current.getHours() < 18
      ? "Afternoon"
      : "Evening";
  const greeting = `Good ${currentPhase}`;

  const tabStyle = {
    color: "#ebebeb",
    ":hover": {
      backgroundColor: "#9292e4",
    },
  };

  return (
    <div className="app">
      <div className="nav">
        <img src={Avatar} alt="Avatar" className="avatar" />
        <p className="currdate">{currentDate}</p>
        <InfoRoundedIcon className="info" />
      </div>
      <p className="heading">
        Hi, <b>Shreyasi</b>.<br />
        {greeting}.
      </p>
      <div className="utility">
        <DayCounter targetDate={targetDate} />
        <TotalTimeWidget totalTime={totalTime} />
        
      </div>

      <Tabs size="sm" defaultValue={0}>
        <div className="menu">
          <TabList
            variant="plain"
            color="neutral"
            sx={{ backgroundColor: "#36363b" }}
          >
            <Tab sx={tabStyle}>Countdown</Tab>
            <Tab sx={tabStyle}>Stopwatch</Tab>
            <Tab sx={tabStyle}>Study Planner</Tab>
          </TabList>
        </div>
        <TabPanel value={0}>
          <div className="tab-card">
            <form className="form">
              <label htmlFor="countdown-date-time">
                Select a date and time:{" "}
              </label>
              <input
                type="datetime-local"
                id="countdown-date-time"
                name="countdown-date-time"
                onChange={handleChange}
              />
            </form>
            <CountdownTimer targetDate={targetDate} />
          </div>
        </TabPanel>
        <TabPanel value={1}>
          <div className="tab-card">
            <Timer />
          </div>
        </TabPanel>
        <TabPanel value={2}>
          <div className="tab-card">
            <b>Third</b> tab panel
          </div>
        </TabPanel>
      </Tabs>

      <div className="footer">
        <p>
          Created by Souptik for Shreyasi 2022 |{" "}
          <a
            href="https://github.com/souptik5/countdown-timer"
            target="_blank"
            rel="noopener noreferrer"
          >
            Github
          </a>
        </p>
      </div>
    </div>
  );
};

export default App;
