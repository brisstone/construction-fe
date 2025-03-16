import ButtonComp from "@/components/general/ButtonComp";
import ReusableSelect from "@/components/general/ReuseableSelect";
import InputField from "@/components/input/InputField";
import { SubStockItem } from "./SubStockItemTable";
import React, { ChangeEvent, useState } from "react";

interface AddReqItemProps {
  onAddItem: (item: SubStockItem) => void;
  onCancel: () => void;
}

const AddStocktem: React.FC<AddReqItemProps> = ({ onAddItem, onCancel }) => {
  const [formData, setFormData] = useState<Omit<SubStockItem, "id">>({
    item: "",
    category: "",
    quantity: 0,
    date: "",
  });

  const handleChange = (
    name: keyof Omit<SubStockItem, "id">,
    value: string | number
  ) => {
    let newFormData = { ...formData, [name]: value };

    setFormData(newFormData);
  };

  const handleSubmit = () => {
    onAddItem({
      ...formData,
      id: Date.now(),
    });

    // Reset form
    setFormData({
      item: "",
      category: "",
      quantity: 0,
      date: "",
    });
  };

  return (
    <div>
      <div className="grid sm:grid-cols-2 grid-cols-1 gap-5 ">
        <InputField
          type="text"
          label="Select Item"
          name="item"
          placeholder="Add item"
          value={formData.item}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleChange("item", e.target.value)
          }
        />
        <div>
          <p className="text-sm font-semibold text-grey">Category</p>
          <ReusableSelect
            className="my-4"
            placeholder="Category"
            defaultValue={formData.category}
            onValueChange={(value: string) => handleChange("category", value)}
            options={[
              { label: "individual", value: "individual" },
              { label: "company", value: "company" },
            ]}
          />
        </div>
      </div>
      <div className="grid sm:grid-cols-2 grid-cols-1 gap-5 ">
        <InputField
          type="number"
          label="Quantity"
          name="Quantity"
          placeholder="Quantity"
          value={formData.quantity.toString()}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleChange("quantity", Number(e.target.value))
          }
        />
        <InputField
          type="date"
          label="Date"
          name="Date"
          value={formData.date.toString()}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleChange("date", (e.target.value))
          }
          placeholder="Date"
        />
      </div>

      <div className="flex gap-4 justify-self-end">
        <ButtonComp
          onClick={onCancel}
          className="bg-transparent border text-black  w-fit"
          text="Cancel"
        />
        <ButtonComp onClick={handleSubmit} className="w-fit" text="Add Item" />
      </div>
    </div>
  );
};

export default AddStocktem;
