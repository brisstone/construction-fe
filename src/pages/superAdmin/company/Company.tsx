import AddCompany from "@/components/company/AddCompany";
import CompanyTable from "@/components/company/CompanyTable";
import ButtonComp from "@/components/general/ButtonComp";
import FilterLayout from "@/components/general/FilterLayout";
import Pagination from "@/components/general/Pagination";
import ReusableDialog from "@/components/general/ReuseableDialog";
import SearchInputComp from "@/components/input/SearchInputComp";
import { PageTypes } from "@/utils";
import { useState } from "react";

const Company = () => {
  const [addCompany, setAddCompany] = useState(false);

  return (
    <div>
      <section className="flex justify-between items-center mb-5">
        <h3 className="text-grey font-extrabold sm:text-2xl text-lg">
          Dashboard
        </h3>
        <ButtonComp
          onClick={() => {
            setAddCompany(true);
          }}
          text="Add Company"
          showIcon
          className="w-fit"
        />
      </section>

      <main className="border border-borderColor rounded-xl ">
        <div className=" p-3">
          <FilterLayout pageKey={PageTypes?.CLIENTS} />
        </div>

        <CompanyTable />
        <Pagination />
      </main>

      <ReusableDialog
        title={"Add Company"}
        open={addCompany}
        onOpenChange={setAddCompany}
        className="max-w-xl"
      >
        <AddCompany setAddCompany={setAddCompany} />
      </ReusableDialog>
    </div>
  );
};

export default Company;
