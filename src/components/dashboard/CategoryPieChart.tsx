import { DateIcon } from "@/assets/svgComp/General";

import { format } from "date-fns";
import { useState } from "react";
import DatePicker from "react-datepicker";
import PropertyPieChart from "./charts/DataPieChart";
const CategoryPieChart = () => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());

  const datePicked = startDate ? format(new Date(startDate), "yyyy-MM-dd") : "";

  console.log(datePicked, "datePicked");

  return (
    <div className="border border-borderColor bg-white  p-3 rounded-xl h-full">
      <div className="flex justify-between items-center w-full">
        <div className="w-1/2">
          <h3 className="text-grey md:text-sm text-xs font-bold">
            Property Availability Category
          </h3>
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

      <div>
        <PropertyPieChart />
      </div>
    </div>
  );
};

export default CategoryPieChart;
