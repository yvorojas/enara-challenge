const getDuration = timelapse =>
  timelapse > 60e3
    ? `${Math.floor(timelapse / 60e3)} minutes`
    : `${timelapse / 1e3} seconds`;

const calculateTimelapse = (start, end) => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  return +endDate - +startDate;
};

export { getDuration, calculateTimelapse };
