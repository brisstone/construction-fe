import ButtonComp from "@/components/general/ButtonComp";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SubComp from "./SubStructure/SubComp";
const ViewBudget = () => {
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
            <p className="text-textShade text-sm">Budget 2 (Substructure)</p>
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
          <p className="w-1/2 text-xs text-textShade">
            Lorem ipsum is a placeholder text commonly used to demonstrate the
            visual form of a document or a typeface without relying on
            meaningful content.
          </p>
        </div>
      </section>
      <main>
        <Tabs defaultValue="sub">
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
                text="Add Work Stage"
                className="w-fit mt-1 sm:mt-0"
              />
            </div>
            <TabsContent value="sub">
              <SubComp />
            </TabsContent>
            <TabsContent value="super">
              <SubComp />
            </TabsContent>
          </div>
        </Tabs>
      </main>
    </div>
  );
};

export default ViewBudget;
