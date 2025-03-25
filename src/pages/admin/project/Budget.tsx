import { useState } from "react";
import ButtonComp from "@/components/general/ButtonComp";
import RouteChain from "@/components/general/RouteChain";
import Container from "@/components/layout/Container";
import BillComp from "@/components/projects/budget/Bill/BillComp";
import WorkTable from "@/components/projects/budget/workPlan/WorkTable";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ReusableDialog from "@/components/general/ReuseableDialog";
import InputField from "@/components/input/InputField";
import useCreateBudget from "@/hooks/api/mutation/project/budget/useCreateBudget";
import { toast } from "sonner";
import { useParams } from "react-router-dom";
import useGetSingleProject from "@/hooks/api/queries/projects/getSingleProject";
import { useNavigate } from "react-router-dom";

const Budget = () => {
  const { id } = useParams<{ id: string }>();

  // const [showGenerated, setShowGenerated] = useState(false);
  const [addBudget, setAddBudget] = useState(false);
  const [budgetData, setBudgetData] = useState({
    name: "",
    description: "",
  });

  const { data: project } = useGetSingleProject(id ?? "");

  const navigate = useNavigate();

  const handleGenerateClick = () => {
    if (project?.budgetId) {
      navigate(`/admin/project/${id}/budget-view`);
    } else {
      setAddBudget(true);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBudgetData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const { mutate, isPending } = useCreateBudget();

  const handleAddBudget = () => {
    if (id) {
      mutate(
        { ...budgetData, projectId: id },
        {
          onSuccess: (response: any) => {
            toast.success(
              response?.data?.message || "Budget added successfully"
            );
            setAddBudget(false);
          },
          onError: (error: any) => {
            toast.error(
              error?.response?.data?.message || "Error creating Budget"
            );
          },
        }
      );
    } else {
      toast.error("Project ID is missing");
    }
  };

  return (
    <div>
      <RouteChain
        routeOne="Projects"
        routeTwo="Mabushi Project"
        routeThree="Budget and Planning"
      />

      <Container className="my-5">
        {/* {showGenerated ? (
          <ViewBudget />
        ) : ( */}
          <Tabs defaultValue="bill">
            <aside className="md:flex items-center justify-between">
              <div className="w-full overflow-x-auto scrollbar-hidden">
                <TabsList className="rounded-[8px] bg-fadedGrey">
                  <TabsTrigger value="bill">Bill of Quantity</TabsTrigger>
                  <TabsTrigger value="work">Work Plan/Schedule</TabsTrigger>
                </TabsList>
              </div>
              <ButtonComp
                text="Generate Budget"
                className="w-fit mt-3 md:mt-0"
                onClick={handleGenerateClick}
              />
            </aside>
            <TabsContent value="bill">
              <BillComp />
            </TabsContent>
            <TabsContent value="work">
              <div className="my-5">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-lg text-textShade my-5">
                    Work Plan Summary
                  </p>
                </div>
                <section>
                  <WorkTable />
                </section>
              </div>
            </TabsContent>
          </Tabs>
        {/* )} */}
      </Container>
      {
        <ReusableDialog
          title={"Add Budget"}
          open={addBudget}
          onOpenChange={setAddBudget}
          className="sm:max-w-[60vw]"
        >
          <div>
            <InputField
              type="text"
              label="Budget Name"
              value={budgetData.name}
              name="name"
              placeholder="Budget Name"
              onChange={handleInputChange}
            />

            <InputField
              type="text"
              label="Budget Description"
              value={budgetData.description}
              name="description"
              placeholder="Budget Description"
              onChange={handleInputChange}
            />
            <ButtonComp
              text={isPending ? "adding" : "Add Budget"}
              className="w-fit mt-5"
              onClick={handleAddBudget}
            />
          </div>
        </ReusableDialog>
      }
    </div>
  );
};

export default Budget;
