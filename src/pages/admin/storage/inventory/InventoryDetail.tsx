import { EditPlusIcon } from "@/assets/svgComp/General";
import RouteChain from "@/components/general/RouteChain";
import Container from "@/components/layout/Container";
import SubReqItemTable, {
  SubReqItem,
} from "@/components/procurement/requisition/SubReqItemTable";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const InventoryDetail = () => {
  const InventoryDetails = [
    { title: "Inventory Number", content: "TRN2345" },
    { title: "Description", content: "3x Super bag" },
    { title: "Category", content: "Cement" },
    { title: "Qty Request", content: "50" },
    { title: "Reason for request", content: "Construction" },
    { title: "Approved by", content: "Philip John" },
    { title: "Date of request", content: "22/01/2022" },
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

  
  const navigate = useNavigate();

  return (
    <div>
      <RouteChain
        routeOne="Procurement"
        routeTwo="Inventory"
        routeThree="Stock Request Detail"
      />
      <Container className="my-5">
        <aside className="flex justify-between items-center my-4">
          <h1 className="text-xl font-bold">Stock Request Details</h1>
          <Button
            onClick={() => navigate("/admin/add-stock?isEdit=true")}
            className="bg-white border rounded-[8px] text-black"
          >
            <EditPlusIcon /> Edit
          </Button>
        </aside>
        <section>
          <div className="grid grid-cols-3 border p-4 gap-3 my-5 rounded-[12px]">
            {InventoryDetails.map((item, index) => (
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

export default InventoryDetail;
