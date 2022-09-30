import React from "react";
import { useCountdown } from "../hooks/useCountdown";

const ExpiredNotice = () => {
  return (
    <div className="expired-notice">
      <span>Expired!!!</span>
      <p>Please select a future date and time.</p>
    </div>
  );
};

const ShowCounter = ({ days }) => {
  return (
    <div className="days-card">
      <div className="days-card-content">
        <p className="days-card-content-body"><b>{days}</b></p>
        <p className="days-card-content-body">days remaining for your UPSC Prelims</p>
      </div>
    </div>
  );
};

const DayCount = ({ targetDate }) => {
  const [days, hours, minutes, seconds] = useCountdown(targetDate);

  if (days + hours + minutes + seconds <= 0) {
    return <ExpiredNotice />;
  } else {
    return (
      <ShowCounter
        days={days}
      />
    );
  }
};

export default DayCount;
