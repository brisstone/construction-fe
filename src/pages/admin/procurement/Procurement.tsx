import Container from "@/components/layout/Container";
import Requisition from "@/components/procurement/requisition/Requisition";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Procurement = () => {
  return (
    <div>
      <section className="flex justify-between items-center mb-5">
        <h3 className="text-grey font-extrabold sm:text-2xl text-lg">
          Procurement
        </h3>
        {""}
      </section>
      <Container className="my-5">
        <Tabs defaultValue="requisition">
          <aside className="md:flex items-center justify-between">
            <div className="w-full overflow-x-auto scrollbar-hidden">
              <TabsList className="rounded-[8px] bg-fadedGrey">
                <TabsTrigger value="requisition">
                  Manage Requisition
                </TabsTrigger>
                <TabsTrigger value="lpo">Create LPO</TabsTrigger>
              </TabsList>
            </div>
          </aside>
          <div className="">
            <TabsContent value="requisition">
              <Requisition/>
            </TabsContent>
            <TabsContent value="lpo">
              <div>lpo</div>
            </TabsContent>
          </div>
        </Tabs>
      </Container>
    </div>
  );
};

export default Procurement;
