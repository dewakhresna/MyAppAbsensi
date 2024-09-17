import { useState } from "react";
import { AreaTable, AreaTop } from "../../components";

const Dashboard = () => {
  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });

  console.log(dateRange);
  const handleDateRangeChange = (startDate, endDate) => {
    setDateRange({ startDate, endDate });
  };

  return (
    <div className="content-area">
      <AreaTop onDateRangeChange={handleDateRangeChange} />
      <AreaTable startDate={dateRange.startDate} endDate={dateRange.endDate} />
    </div>
  );
};

export default Dashboard;