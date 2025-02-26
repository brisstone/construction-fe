import { useState } from "react";
import ButtonComp from "@/components/general/ButtonComp";
import RouteChain from "@/components/general/RouteChain";
import Container from "@/components/layout/Container";
import BillComp from "@/components/projects/budget/Bill/BillComp";
import WorkTable from "@/components/projects/budget/workPlan/WorkTable";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ViewBudget from "@/components/projects/budget/GenerateBudget/ViewBudget";

const Budget = () => {
  const [showGenerated, setShowGenerated] = useState(false);

  const handleGenerateClick = () => {
    setShowGenerated(true);
  };

  return (
    <div>
      <RouteChain
        routeOne="Projects"
        routeTwo="Mabushi Project"
        routeThree="Budget and Planning"
      />

      <Container className="my-5">
        {showGenerated ? (
          <ViewBudget />
        ) : (
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
        )}
      </Container>
    </div>
  );
};

export default Budget;
