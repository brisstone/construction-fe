import FilterLayout from "@/components/general/FilterLayout";
import Pagination from "@/components/general/Pagination";
import { PageTypes } from "@/utils";
import SubSructureTable from "./SubSructureTable";

const SubComp = () => {
  const pageKey = PageTypes.PROJECTS;

  return (
    <div>
      <FilterLayout pageKey={pageKey} />
      <SubSructureTable />
      <Pagination />
    </div>
  );
};

export default SubComp;
