import { EditPlusIcon } from "@/assets/svgComp/General";
import ButtonComp from "@/components/general/ButtonComp";
import ReusableDialog from "@/components/general/ReuseableDialog";
import ReusableSelect from "@/components/general/ReuseableSelect";
import RouteChain from "@/components/general/RouteChain";
import InputField from "@/components/input/InputField";
import Container from "@/components/layout/Container";
import AddStocktem from "@/components/storage-inventory/inventory/AddStocktem";
import SubStockItemTable, {
  SubStockItem,
} from "@/components/storage-inventory/inventory/SubStockItemTable";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

const AddStock = () => {
  const [searchParams] = useSearchParams();

  const isEditing = searchParams.get("isEdit");
  const [addItem, setAddItem] = useState(false);

  const [items, setItems] = useState<SubStockItem[]>([]);

  const handleAddItem = (newItem: SubStockItem): void => {
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
        routeTwo="Manage Inventory"
        routeThree="New stock"
      />
      <Container className="my-5">
        <aside className="flex justify-between items-center my-4">
          <h1 className="text-xl font-bold">
            {isEditing ? "Edit  Stock Form" : " New Stock Form"}
          </h1>
        </aside>
        <main>
          <div className="grid sm:grid-cols-2 grid-cols-1 gap-5 ">
            <div>
              <p className="text-sm font-semibold text-grey">Requester</p>
              <ReusableSelect
                className="my-4"
                placeholder="Requester"
                options={[
                  { label: "individual", value: "individual" },
                  { label: "company", value: "company" },
                ]}
              />
            </div>
            <InputField
              type="text"
              label="Request No"
              name="date"
              placeholder="Request No"
            />
          </div>

          <div className="grid sm:grid-cols-2 grid-cols-1 gap-5 ">
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
            <div>
              <p className="text-sm font-semibold text-grey">
                Department Sent To
              </p>
              <ReusableSelect
                className="my-4"
                placeholder="Department Sent To"
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
              label="Designation"
              name="Designation"
              placeholder="Add Designation"
            />
            <InputField
              type="text"
              label="Reason For Request"
              name="ReasonRequest"
              placeholder="Reason For Request"
            />
          </div>
        </main>
        <hr className="border my-5" />
        <aside className="flex justify-between items-center my-4">
          <h1 className="text-xl font-bold">Stock Item</h1>
          <Button
            onClick={() => setAddItem(true)}
            className="bg-white border rounded-[8px] text-black hover:text-white"
          >
            <EditPlusIcon /> Add Item
          </Button>
        </aside>
        <SubStockItemTable
          data={items ?? []}
          addingItem
          handleDeleteItem={handleDeleteItem}
        />
        <ButtonComp className="flex justify-self-end w-fit" text="Save" />
      </Container>
      {
        <ReusableDialog
          title="Add New Stock Items"
          open={addItem}
          onOpenChange={setAddItem}
          className="sm:max-w-[60vw]"
        >
          <div>
            <AddStocktem
              onAddItem={handleAddItem}
              onCancel={() => setAddItem(false)}
            />
          </div>
        </ReusableDialog>
      }
    </div>
  );
};

export default AddStock;
