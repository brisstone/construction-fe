import { DateIcon } from "@/assets/svgComp/General";
import DataLineChart from "./charts/DataLineChart";

import { format } from "date-fns";
import { useState } from "react";
import DatePicker from "react-datepicker";
const ActivityChart = () => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());

  const datePicked = startDate ? format(new Date(startDate), "yyyy-MM-dd") : "";

  console.log(datePicked, "datePicked");

  return (
    <div className="border border-borderColor bg-white  p-3 rounded-xl h-full">
      <div className="flex justify-between items-center w-full">
        <div className="w-1/2">
          <h3 className="text-grey text-sm font-bold">Activity Overview</h3>
        </div>
        <div className="">
          <DatePicker
            showIcon
            isClearable
            placeholderText="Select a date"
            icon={<DateIcon />}
            className="border w-full bg-transparent focus:outline-none rounded-[4px] text-sm text-center font-medium "
            selected={startDate}
            onChange={(date) => {
              setStartDate(date);
            }}
          />
        </div>
      </div>
      <aside className="flex gap-3 items-center justify-self-end mt-4 mb-1">
        <div className="text-sm text-textGrey flex gap-1 items-center">
          <div className="bg-green h-2 w-2 rounded-full" /> Buildcraft Sales
          Team
        </div>
        <div className="text-sm text-textGrey flex gap-1 items-center">
          <div className="bg-deepRed h-2 w-2 rounded-full" /> Sales Affiliates
        </div>
      </aside>
      <div>
        <DataLineChart />
      </div>
    </div>
  );
};

export default ActivityChart;
