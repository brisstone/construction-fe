import SearchInputComp from "@/components/input/SearchInputComp";
// import { useState } from "react";
import DatePicker from "react-datepicker";
import { DateIcon } from "@/assets/svgComp/General";
import { useFilterState } from "@/store/FilterStore";
import { PageTypes } from "@/utils";
import { Button } from "../ui/button";

const FilterLayout = ({ pageKey }: { pageKey: PageTypes }) => {

  const {
    search,
    startDate,
    endDate,
    setEndDate,
    reset,
    setStartDate,
  } = useFilterState((state) => state[pageKey] || {});


  return (
    <section className="sm:flex justify-between items-center my-5 space-y-4 sm:space-y-0">
      <div className="sm:w-[25%]">
        <SearchInputComp
          value={search}
          pageKey={pageKey}
          className="bg-transparent border border-borderColor h-[30px] w-full "
        />
      </div>
      <div className="sm:flex gap-3 sm:justify-between items-center space-y-4 sm:space-y-0">
        <div>
          <DatePicker
            showIcon
            dateFormat="MMMM d, yyyy"
            placeholderText="select a date"
            icon={<DateIcon />}
            selectsRange
            startDate={startDate}
            endDate={endDate}
            className="border bg-transparent focus:outline-none rounded-[8px] h-[36px] text-sm text-center font-medium !z-[100] "
            selected={startDate}
            onChange={(dates) => {
              const [start, end] = dates;
              setStartDate(start);
              setEndDate(end);
            }}
            isClearable
          />
        </div>
        <div className="flex gap-4 items-center">
          <Button
            onClick={() => reset()}
            className="rounded-[8px] w-full h-[36px] bg-transparent border text-grey border-borderColor text-sm font-medium hover:text-white"
          >
            Clear Filter
          </Button>
        
        </div>
      </div>
    </section>
  );
};

export default FilterLayout;
