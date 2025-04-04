import ButtonComp from "@/components/general/ButtonComp";
import ReusableDialog from "@/components/general/ReuseableDialog";
import RouteChain from "@/components/general/RouteChain";
import Container from "@/components/layout/Container";
import AddDocument from "@/components/projects/document/AddDocument";
import DocTab from "@/components/projects/document/DocTab";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useGetProjectDocument from "@/hooks/api/queries/document/getProjectDocument";
import { useState } from "react";
import { useParams } from "react-router-dom";
const DocumentPage = () => {
  const { id } = useParams();

  const [addDoc, setAddDoc] = useState(false);

  const { data: projDoc, isPending } = useGetProjectDocument(id ?? "");

  const projDocData = projDoc?.data;

  if (isPending) {
    return (
      <div className="text-center">Loading...</div>
    );
  }

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
                {/* <TabsTrigger value="Drawing">Drawing</TabsTrigger> */}
              </TabsList>
            </div>
          </aside>
          <div className="my-5">
            <TabsContent value="Documents">
              <div className="sm:flex items-center justify-between my-3">
                <p> </p>
                <ButtonComp
                  onClick={() => setAddDoc(true)}
                  text="Add Document"
                  className="w-fit mt-1 sm:mt-0"
                />
              </div>
              <div>
                <DocTab
                  projDocData={
                    projDocData?.filter((item) =>
                      item?.type?.startsWith("application")
                    ) ?? []
                  }
                />
              </div>
            </TabsContent>
            <TabsContent value="Photos">
              <div>
                <DocTab
                  projDocData={
                    projDocData?.filter((item) =>
                      item?.type?.startsWith("image")
                    ) ?? []
                  }
                />
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </Container>
      {
        <ReusableDialog
          title={"Add new Document"}
          open={addDoc}
          onOpenChange={setAddDoc}
          className="sm:max-w-[60vw]"
        >
          <div>
            <AddDocument handleModalClose={() => setAddDoc(false)} />
          </div>
        </ReusableDialog>
      }
    </div>
  );
};

export default DocumentPage;
