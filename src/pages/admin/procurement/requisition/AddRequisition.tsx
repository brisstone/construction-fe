import { EditPlusIcon } from "@/assets/svgComp/General";
import ButtonComp from "@/components/general/ButtonComp";
import ReusableDialog from "@/components/general/ReuseableDialog";
import ReusableSelect from "@/components/general/ReuseableSelect";
import RouteChain from "@/components/general/RouteChain";
import InputField from "@/components/input/InputField";
import TextAreaField from "@/components/input/TextAreaField";
import Container from "@/components/layout/Container";
import AddReqItem from "@/components/procurement/requisition/AddReqItem";
import SubReqItemTable, {
  SubReqItem,
} from "@/components/procurement/requisition/SubReqItemTable";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

const AddRequisition = () => {
  const [searchParams] = useSearchParams();

  const isEditing = searchParams.get("isEdit");
  const [addItem, setAddItem] = useState(false);

  const [items, setItems] = useState<SubReqItem[]>([]);

  const handleAddItem = (newItem: SubReqItem): void => {
    setItems([...items, newItem]);
    setAddItem(false);
  };

  const handleDeleteItem = (itemId: number): void => {
    setItems(items.filter((item) => item.id !== itemId));
  };

  return (
    <div>
      <RouteChain
        routeOne="Procurement"
        routeTwo="Manage Requisition"
        routeThree="New Requisition"
      />
      <Container className="my-5">
        <aside className="flex justify-between items-center my-4">
          <h1 className="text-xl font-bold">
            {isEditing ? "Edit  Requisition Form" : " New Requisition Form"}
          </h1>
        </aside>
        <main>
          <div className="grid sm:grid-cols-2 grid-cols-1 gap-5 ">
            <InputField
              type="text"
              label="Requisition Number"
              name="RequisitionNum"
              placeholder="Add Requisition Number "
            />
            <InputField
              type="text"
              label="Requested By"
              name="RequestedBy"
              placeholder="Requested By"
            />
          </div>
          <div className="grid sm:grid-cols-2 grid-cols-1 gap-5 ">
            <div>
              <p className="text-sm font-semibold text-grey">
                Requisition Type
              </p>
              <ReusableSelect
                className="my-4"
                placeholder="Requisition Type"
                options={[
                  { label: "individual", value: "individual" },
                  { label: "company", value: "company" },
                ]}
              />
            </div>
            <InputField type="date" label="Date" name="date" />
          </div>
          <div className="grid sm:grid-cols-2 grid-cols-1 gap-5 ">
            <InputField
              type="text"
              label="Company Name"
              name="Company"
              placeholder="Add Company Name "
            />
            <div>
              <p className="text-sm font-semibold text-grey">Department</p>
              <ReusableSelect
                className="my-4"
                placeholder="Department"
                options={[
                  { label: "individual", value: "individual" },
                  { label: "company", value: "company" },
                ]}
              />
            </div>
          </div>
          <div className="grid sm:grid-cols-2 grid-cols-1 gap-5 ">
            <InputField
              type="text"
              label="Location"
              name="Location"
              placeholder="Location"
            />
            <div>
              <p className="text-sm font-semibold text-grey">Priority</p>
              <ReusableSelect
                className="my-4"
                placeholder="Priority"
                options={[
                  { label: "individual", value: "individual" },
                  { label: "company", value: "company" },
                ]}
              />
            </div>
          </div>
          <InputField
            type="text"
            label="Requisition Total"
            name="RequisitionTtal"
            placeholder="N"
          />
          <TextAreaField
            label="Comments"
            name="Comments"
            rows={2}
            placeholder="Comments"
          />
          <section className="flex justify-between">
            <div>
              <p className="text-sm font-semibold text-grey mb-2">
                Extra Budget:
              </p>
              <aside className="flex gap-3 items-center">
                <div className="flex gap-3 items-center">
                  <input className="h-4 w-4" type="radio" name="yes" id="yes" />
                  <label htmlFor="yes">Yes</label>
                </div>
                <div className="flex gap-3 items-center">
                  <input className="h-4 w-4" type="radio" name="no" id="no" />
                  <label htmlFor="no">No</label>
                </div>
              </aside>
            </div>
            <div>
              <p className="text-sm font-semibold text-grey mb-2">Action</p>
              <aside className="flex gap-3 items-center">
                <div className="flex gap-3 items-center">
                  <input
                    className="h-4 w-4"
                    type="radio"
                    name="saveReq"
                    id="saveReq"
                  />
                  <label htmlFor="saveReq">Save Requisition</label>
                </div>
                <div className="flex gap-3 items-center">
                  <input
                    className="h-4 w-4"
                    type="radio"
                    name="approval"
                    id="approval"
                  />
                  <label htmlFor="approval">Send For Approval</label>
                </div>
              </aside>
            </div>
          </section>
        </main>
        <hr className="border my-5" />
        <aside className="flex justify-between items-center my-4">
          <h1 className="text-xl font-bold">Requisition Item</h1>
          <Button
            onClick={() => setAddItem(true)}
            className="bg-white border rounded-[8px] text-black hover:text-white"
          >
            <EditPlusIcon /> Add Item
          </Button>
        </aside>
        <SubReqItemTable
          data={items ?? []}
          addingItem
          handleDeleteItem={handleDeleteItem}
        />
        <ButtonComp className="flex justify-self-end w-fit" text="Save" />
      </Container>
      {
        <ReusableDialog
          title="Add New Requisition Items"
          open={addItem}
          onOpenChange={setAddItem}
          className="sm:max-w-[60vw]"
        >
          <div>
            <AddReqItem
              onAddItem={handleAddItem}
              onCancel={() => setAddItem(false)}
            />
          </div>
        </ReusableDialog>
      }
    </div>
  );
};

export default AddRequisition;
