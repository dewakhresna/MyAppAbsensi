import { useState } from "react";
import { AreaTop, AreaIzin } from "../../components";

const Izin = () => {
  const [searchQuery, setSearchQuery] = useState(""); // Query pencarian
  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });

  const handleDateRangeChange = (startDate, endDate) => {
    setDateRange({ startDate, endDate });
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query); // Update query pencarian
  };

  return (
    <div className="content-area">
      <AreaIzin
        startDate={dateRange.startDate}
        endDate={dateRange.endDate}
        searchQuery={searchQuery} // Teruskan searchQuery
        isPengajuanMode={true}
      />
    </div>
  );
};

export default Izin;
