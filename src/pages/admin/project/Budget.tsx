import ButtonComp from "@/components/general/ButtonComp";
import RouteChain from "@/components/general/RouteChain";
import BillComp from "@/components/projects/budget/Bill/BillComp";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Budget = () => {
  return (
    <div>
      <RouteChain
        routeOne="Projects"
        routeTwo="Mabushi Project"
        routeThree="Budget and Planning"
      />
      <section className="my-10">
        <Tabs defaultValue="bill">
          <aside className="md:flex items-center justify-between">
            <div className="w-full overflow-x-auto scrollbar-hidden">
              <TabsList className="rounded-[8px] bg-fadedGrey">
                <TabsTrigger value="bill">Bill of Quantity</TabsTrigger>
                <TabsTrigger value="work">Work Plan/Schedule</TabsTrigger>
              </TabsList>
            </div>
            <ButtonComp text="Generate Budget" className="w-fit mt-3 md:mt-0" />
          </aside>
          <TabsContent value="bill">
            <BillComp />
          </TabsContent>
          <TabsContent value="work">
            <div>work</div>
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
};

export default Budget;
