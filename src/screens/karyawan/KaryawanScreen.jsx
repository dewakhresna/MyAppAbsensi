import { isDate } from "date-fns";
import { AreaTop, AreaKaryawan} from "../../components";

const Karyawan = () => {
  return (
    <div className="content-area">
      <AreaTop isDateMode={false}/>
      <AreaKaryawan />
    </div>
  );
};

export default Karyawan;
