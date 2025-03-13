import { EditPlusIcon } from "@/assets/svgComp/General";
import RouteChain from "@/components/general/RouteChain";
import Container from "@/components/layout/Container";
import SubReqItemTable, {
  SubReqItem,
} from "@/components/procurement/requisition/SubReqItemTable";
import { Button } from "@/components/ui/button";

const RequisitionDetail = () => {
  const RequisitionDetails = [
    { title: "Requisition Number", content: "TRN2345" },
    { title: "Requested By ", content: "Philip John" },
    { title: "Company Name", content: "Ti’bilon Construction Ltd." },
    { title: "Requisition Type", content: "Purchase" },
    { title: "Location", content: "Katampe Main Phase 1" },
    { title: "Department", content: "Procurement" },
    { title: "Requisition Total", content: "N317,125" },
    { title: "Priority", content: "High" },
    { title: "Date", content: "22/01/2022" },
    { title: "Extra Budget", content: "No" },
    {
      title: "Comments",
      content:
        "Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or atypeface without relying on meaningful content.",
    },
  ];
  const sampleData: SubReqItem[] = [
    {
      id: 12345,
      item: "3x Super bag",
      category: "Cement",
      quantity: 50,
      rate: 3500,
      amount: 175000,
    },
  ];

  return (
    <div>
      <RouteChain
        routeOne="Procurement"
        routeTwo="Manage Requisition"
        routeThree="Requisition Details"
      />
      <Container className="my-5">
        <aside className="flex justify-between items-center my-4">
          <h1 className="text-xl font-bold">Requisition Details</h1>
          <Button className="bg-white border rounded-[8px] text-black">
            <EditPlusIcon /> Edit
          </Button>
        </aside>
        <section>
          <div className="grid grid-cols-3 border p-4 gap-3 my-5 rounded-[12px]">
            {RequisitionDetails.map((item, index) => (
              <div key={index} className="text-sm">
                <span className="font-semibold mr-3">{item.title} </span>
                <p className="text-xs text-darkGrey">{item.content}</p>
              </div>
            ))}
          </div>
          <div>
            <SubReqItemTable data={sampleData ?? []} />
          </div>
        </section>
      </Container>
    </div>
  );
};

export default RequisitionDetail;
