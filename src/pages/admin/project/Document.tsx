import ButtonComp from "@/components/general/ButtonComp";
import RouteChain from "@/components/general/RouteChain";
import Container from "@/components/layout/Container";
import DocTab from "@/components/projects/document/DocTab";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
const DocumentPage = () => {
  return (
    <div>
      <RouteChain
        routeOne="Projects"
        routeTwo="Mabushi Project"
        routeThree="Documents"
      />
      <Container className="my-5">
        <Tabs defaultValue="Documents">
          <aside className="md:flex items-center justify-between">
            <div className="w-full overflow-x-auto scrollbar-hidden">
              <TabsList className="rounded-[8px] bg-fadedGrey">
                <TabsTrigger value="Documents">All Documents</TabsTrigger>
                <TabsTrigger value="Photos">Photos/Videos</TabsTrigger>
                <TabsTrigger value="Drawing">Drawing</TabsTrigger>
              </TabsList>
            </div>
          </aside>
          <div className="my-5">
            <TabsContent value="Documents">
              <div className="sm:flex items-center justify-between my-3">
                <p> </p>
                <ButtonComp
                  text="Add Document"
                  className="w-fit mt-1 sm:mt-0"
                />
              </div>
              <div>
                <DocTab />
              </div>
            </TabsContent>
            <TabsContent value="Photos">
              <p>photo</p>
            </TabsContent>
          </div>
        </Tabs>
      </Container>
    </div>
  );
};

export default DocumentPage;
