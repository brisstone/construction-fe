import ButtonComp from "@/components/general/ButtonComp";
import RouteChain from "@/components/general/RouteChain";
import Container from "@/components/layout/Container";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MaterialTable from "../../material/MaterialTable";
import LabourTable from "../../material/LabourTable";
import ReusableDialog from "@/components/general/ReuseableDialog";
import { useState } from "react";
import AddNewMaterial from "../../material/AddNewMaterial";
import AddNewLabour from "../../material/AddNewLabour";
import useGetWorkStageById from "@/hooks/api/queries/projects/budget/workStage/useGetWorkStageById";
import { useParams } from "react-router-dom";
import { ProjectLaborType } from "@/hooks/api/queries/projects/budget/workStage/getWorkStage";
const WorkStage = () => {
  const { id } = useParams<{ id: string }>();
  const [newMaterial, setNewMaterial] = useState(false);
  const [newLabour, setNewLabour] = useState(false);
  const [editLabour, setEditLabour] = useState<ProjectLaborType | null>(null);

  const handleLaborEdit = (item: ProjectLaborType) => {
    setEditLabour(item);
    setNewLabour(true);
  };

  const { data: workStageSingle } = useGetWorkStageById(id ?? "");

  console.log(workStageSingle, "workStageSingle");

  return (
    <div>
      <RouteChain
        routeOne="Projects"
        routeTwo="Mabushi Project"
        routeThree="Budget and Planning"
      />
      <Container className=" my-5">
        <aside className="sm:flex items-center justify-between">
          <p className="font-medium sm:text-lg text-sm text-textShade">
            Work Stage: {workStageSingle?.name}
          </p>
          {/* <ButtonComp text="" className="w-fit mt-1 sm:mt-0" /> */}
        </aside>
        <section className="my-4 py-3 border-y">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <h3 className="font-medium">Work Stage Title</h3>
              <p className="text-textShade text-sm">{workStageSingle?.name}</p>
            </div>
            <div>
              <h3 className="font-medium">Activities</h3>
              <p className="text-textShade text-sm">Material & Labour</p>
            </div>
            <div>
              <h3 className="font-medium">Total Cost (#)</h3>
              <p className="text-textShade text-sm">2,656,000.00 </p>
            </div>
          </div>
        </section>
        <main>
          <Tabs defaultValue="material">
            <aside className="md:flex items-center justify-between">
              <div className="w-full overflow-x-auto scrollbar-hidden">
                <TabsList className="rounded-[8px] bg-fadedGrey">
                  <TabsTrigger value="material">Material</TabsTrigger>
                  <TabsTrigger value="labour">Labour</TabsTrigger>
                  <TabsTrigger value="activities">Activities</TabsTrigger>
                </TabsList>
              </div>
            </aside>

            <TabsContent value="material">
              <div className="my-5">
                <div className="sm:flex items-center justify-between my-3">
                  <p className="font-medium text-lg text-textShade">Material</p>
                  <ButtonComp
                    onClick={() => setNewMaterial(true)}
                    text="Add Material"
                    className="w-fit mt-1 sm:mt-0"
                  />
                </div>
              </div>
              <div>
                <MaterialTable
                  workStageMaterial={workStageSingle?.projectMaterials ?? []}
                />
              </div>
            </TabsContent>
            <TabsContent value="labour">
              <div className="my-5">
                <div className="sm:flex items-center justify-between my-3">
                  <p className="font-medium text-lg text-textShade">Labour</p>
                  <ButtonComp
                    onClick={() => {
                      setEditLabour(null);
                      setNewLabour(true);
                    }}
                    text="Add Labour"
                    className="w-fit mt-1 sm:mt-0"
                  />
                </div>
              </div>
              <div>
                <LabourTable
                  onEdit={handleLaborEdit}
                  workStageLabor={workStageSingle?.projectLabors ?? []}
                />
              </div>
            </TabsContent>
            <TabsContent value="activities">
              <div className="my-5">
                <div className="sm:flex items-center justify-between my-3">
                  <p className="font-medium text-lg text-textShade">
                    Activities
                  </p>
                  <ButtonComp
                    text="Add Activities"
                    className="w-fit mt-1 sm:mt-0"
                  />
                </div>
              </div>
              <div>Activities</div>
            </TabsContent>
          </Tabs>
        </main>
        {
          <ReusableDialog
            title="Add New Material"
            open={newMaterial}
            onOpenChange={setNewMaterial}
            className="sm:max-w-[40vw]"
          >
            <div>
              <AddNewMaterial />
            </div>
          </ReusableDialog>
        }
        {
          <ReusableDialog
            title={editLabour ? "Edit Labor" : "Add New Labour"}
            open={newLabour}
            onOpenChange={setNewLabour}
            className="sm:max-w-[40vw]"
          >
            <div>
              <AddNewLabour
                defaultValues={editLabour || undefined}
                isEditMode={!!editLabour}
                projectId={workStageSingle?.projectLabors[0]?.projectId ?? ""}
                budgetId={workStageSingle?.projectLabors[0]?.budgetId ?? ""}
                handleModalClose={() => {
                  setEditLabour(null);
                  setNewLabour(false);
                }}
              />
            </div>
          </ReusableDialog>
        }
      </Container>
    </div>
  );
};

export default WorkStage;
