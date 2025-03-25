import ButtonComp from "@/components/general/ButtonComp";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SubComp from "./SubStructure/SubComp";
import ReusableDialog from "@/components/general/ReuseableDialog";
import AddNewWorkModal from "./AddNewWorkModal";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import usegetBudget from "@/hooks/api/queries/projects/budget/getBudget";
import useGetWorkStage from "@/hooks/api/queries/projects/budget/workStage/getWorkStage";
import { useIdStore } from "@/store/IdStore";
const ViewBudget = () => {
  const [newWork, setNewWork] = useState(false);

  const [activeTab, setActiveTab] = useState("sub");
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };
  const { id } = useParams<{ id: string }>();

  const { setBudgetId, setProjectId } = useIdStore();
  const { data: budget, isPending } = usegetBudget(id ?? "");
  const { data: workStageData } = useGetWorkStage(
    id ?? "",
    activeTab === "sub" ? "sub_structure" : "super_structure"
  );
  console.log(budget, "budget");
  console.log(workStageData, "workStageData");

  const workStageDataLoad = workStageData?.data;

  const handleModalClose = () => {
    setNewWork(false);
  };

  useEffect(() => {
    setProjectId(id ?? "");
    setBudgetId(budget?._id ?? "");
  }, [id, budget]);

  if (isPending) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div>
      <aside className="sm:flex items-center justify-between">
        <p className="font-medium sm:text-lg text-sm text-textShade">
          View Budget
        </p>
        {/* <ButtonComp text="" className="w-fit mt-1 sm:mt-0" /> */}
      </aside>
      <section className="my-4 py-3 border-y">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <h3 className="font-medium">Budget Title</h3>
            <p className="text-textShade text-sm">{budget?.name}</p>
          </div>
          <div>
            <h3 className="font-medium">No of Units</h3>
            <p className="text-textShade text-sm">20</p>
          </div>
          <div>
            <h3 className="font-medium">Budget Cost (#)</h3>
            <p className="text-textShade text-sm">40,317,000.00</p>
          </div>
        </div>
        <div className="my-3">
          <h3 className="font-medium">Budget Description</h3>
          <p className="w-1/2 text-xs text-textShade">{budget?.description}</p>
        </div>
      </section>
      <main>
        <Tabs defaultValue="sub" onValueChange={handleTabChange}>
          <aside className="md:flex items-center justify-between">
            <div className="w-full overflow-x-auto scrollbar-hidden">
              <TabsList className="rounded-[8px] bg-fadedGrey">
                <TabsTrigger value="sub">Substructure</TabsTrigger>
                <TabsTrigger value="super">Superstructure</TabsTrigger>
              </TabsList>
            </div>
          </aside>
          <div className="my-5">
            <div className="sm:flex items-center justify-between my-3">
              <p className="font-medium text-lg text-textShade">
                Work Stage List
              </p>
              <ButtonComp
                onClick={() => setNewWork(true)}
                text="Add Work Stage"
                className="w-fit mt-1 sm:mt-0"
              />
            </div>
            <TabsContent value="sub">
              <SubComp workStageDataLoad={workStageDataLoad ?? []} />
            </TabsContent>
            <TabsContent value="super">
              <SubComp workStageDataLoad={workStageDataLoad ?? []} />
            </TabsContent>
          </div>
        </Tabs>
        {
          <ReusableDialog
            title={`Add New Work Stage - ${
              activeTab === "sub" ? "Substructure" : "Superstructure"
            }`}
            // title="Add New Work Stage"
            open={newWork}
            onOpenChange={setNewWork}
            className="sm:max-w-[80vw]"
          >
            <div>
              <AddNewWorkModal
                handleModalClose={handleModalClose}
                budgetId={budget?._id ?? ""}
                workStageType={activeTab}
              />
            </div>
          </ReusableDialog>
        }
      </main>
    </div>
  );
};

export default ViewBudget;
