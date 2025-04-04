import FilterLayout from "@/components/general/FilterLayout";
import Pagination from "@/components/general/Pagination";
import { PageTypes } from "@/utils";
import SubSructureTable from "./SubSructureTable";
import { WorkStageType } from "@/hooks/api/queries/projects/budget/workStage/getWorkStage";

const SubComp = ({
  workStageDataLoad,
  isFeching,
}: {
  workStageDataLoad: WorkStageType[];
  isFeching: boolean;
}) => {
  const pageKey = PageTypes.PROJECTS;

  return (
    <div>
      <FilterLayout pageKey={pageKey} />
      {isFeching && <div className="font-bold flex w-full justify-center items-center mb-2">Loading...</div>}

      <SubSructureTable workStageDataLoad={workStageDataLoad} />
      <Pagination />
    </div>
  );
};

export default SubComp;
