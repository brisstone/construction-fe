import { WorkStageType } from "@/hooks/api/queries/projects/budget/workStage/getWorkStage";
import BillTable from "./BillTable";

const BillComp = ({
  workStageDataAll,
}: {
  workStageDataAll: WorkStageType[];
}) => {
  return (
    <div className="my-5">
      <div className="flex items-center justify-between">
        <p className="font-medium text-lg text-textShade my-5">Summary</p>
      </div>
      <section>
        <BillTable workStageDataAll={workStageDataAll} />
      </section>
    </div>
  );
};

export default BillComp;
