import React from "react";

const ShowTime = ({ time }) => {
  return (
    <div className="days-card">
      <div className="days-card-content">
        <p className="days-card-content-body">
          <b>{`${time}`}</b>
        </p>
        <p className="days-card-content-body">hours studied in total.</p>
      </div>
    </div>
  );
};

const TotalTimeWidget = ({ totalTime }) => {
  const timeInHrs = Math.floor(totalTime / 3600);
//   const timeInHrs = totalTime / 60;
  return <ShowTime time={timeInHrs} />;
};

export default TotalTimeWidget;
