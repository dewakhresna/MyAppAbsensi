import { useState } from "react";
import { AreaTable, AreaTop } from "../../components";

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState(""); 
  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });

  const handleDateRangeChange = (startDate, endDate) => {
    setDateRange({ startDate, endDate });
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query); 
  };

  return (
    <div className="content-area">
      <AreaTop
        onDateRangeChange={handleDateRangeChange}
        onSearchChange={handleSearchChange}
      />
      <AreaTable
        startDate={dateRange.startDate}
        endDate={dateRange.endDate}
        searchQuery={searchQuery} 
      />
    </div>
  );
};

export default Dashboard;