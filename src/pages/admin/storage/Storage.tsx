import Container from "@/components/layout/Container";
import Inventory from "@/components/storage-inventory/inventory/Inventory";
import MatRequest from "@/components/storage-inventory/materialRequest/MatRequest";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Storage = () => {
  return (
    <div>
      <section className="flex justify-between items-center mb-5">
        <h3 className="text-grey font-extrabold sm:text-2xl text-lg">
          Storage
        </h3>
      </section>
      <Container className="my-5">
        <Tabs defaultValue="inventory">
          <aside className="md:flex items-center justify-between">
            <div className="w-full overflow-x-auto scrollbar-hidden">
              <TabsList className="rounded-[8px] bg-fadedGrey">
                <TabsTrigger value="inventory">Inventory</TabsTrigger>
                <TabsTrigger value="request">Material Request</TabsTrigger>
              </TabsList>
            </div>
          </aside>
          <div className="">
            <TabsContent value="inventory">
              <Inventory />
            </TabsContent>
            <TabsContent value="request">
              <MatRequest />
            </TabsContent>
          </div>
        </Tabs>
      </Container>
    </div>
  );
};

export default Storage;
