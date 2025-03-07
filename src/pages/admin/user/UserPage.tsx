import Container from "@/components/layout/Container";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Affiliate from "@/components/Users/Affiliate/Affiliate";
import Employee from "@/components/Users/Employee/Employee";

const UserPage = () => {
  return (
    <div>
      <section className="flex justify-between items-center mb-5">
        <h3 className="text-grey font-extrabold sm:text-2xl text-lg">Users</h3>
        {""}
      </section>
      <Container className="my-5">
        <Tabs defaultValue="employee">
          <aside className="md:flex items-center justify-between">
            <div className="w-full overflow-x-auto scrollbar-hidden">
              <TabsList className="rounded-[8px] bg-fadedGrey">
                <TabsTrigger value="employee">Employee</TabsTrigger>
                <TabsTrigger value="affiliate">Affiliate</TabsTrigger>
              </TabsList>
            </div>
          </aside>
          <div className="my-5">
            <TabsContent value="employee">
              <Employee />
            </TabsContent>
            <TabsContent value="affiliate">
              <Affiliate />
            </TabsContent>
          </div>
        </Tabs>
      </Container>
    </div>
  );
};

export default UserPage;
