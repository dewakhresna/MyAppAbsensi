import { useState } from "react";
import { AreaTop, AreaKaryawan } from "../../components";

const Karyawan = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  return (
    <div className="content-area">
      <AreaTop isDateMode={false} onSearchChange={handleSearchChange} />
      <AreaKaryawan searchQuery={searchQuery} isLemburMode={false}  />
    </div>
  );
};

export default Karyawan;
