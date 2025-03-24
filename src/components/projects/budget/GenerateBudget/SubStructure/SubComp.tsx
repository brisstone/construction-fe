import FilterLayout from "@/components/general/FilterLayout";
import Pagination from "@/components/general/Pagination";
import { PageTypes } from "@/utils";
import SubSructureTable from "./SubSructureTable";
import { WorkStageType } from "@/hooks/api/queries/projects/budget/workStage/getWorkStage";

const SubComp = ({ workStageDataLoad }: { workStageDataLoad : WorkStageType[]}) => {
  const pageKey = PageTypes.PROJECTS;

  return (
    <div>
      <FilterLayout pageKey={pageKey} />
      <SubSructureTable workStageDataLoad={workStageDataLoad} />
      <Pagination />
    </div>
  );
};

export default SubComp;
