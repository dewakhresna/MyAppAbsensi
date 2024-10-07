import { useState } from "react";
import { AreaTop, AreaIzin} from "../../components";

const Izin = () => {
  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });

  const handleDateRangeChange = (startDate, endDate) => {
    setDateRange({ startDate, endDate });
  };

  return (
    <div className="content-area">
      <AreaTop onDateRangeChange={handleDateRangeChange} />
      <AreaIzin startDate={dateRange.startDate} endDate={dateRange.endDate} />
    </div>
  );
};

export default Izin;
