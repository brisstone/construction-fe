import ButtonComp from "@/components/general/ButtonComp";
import ReusableSelect from "@/components/general/ReuseableSelect";
import InputField from "@/components/input/InputField";
import { SubReqItem } from "./SubReqItemTable";
import React, { ChangeEvent, useState } from "react";

interface AddReqItemProps {
  onAddItem: (item: SubReqItem) => void;
  onCancel: () => void;
}

const AddReqItem: React.FC<AddReqItemProps> = ({ onAddItem, onCancel }) => {
  const [formData, setFormData] = useState<Omit<SubReqItem, "id">>({
    item: "",
    category: "",
    quantity: 0,
    rate: 0,
    amount: 0,
  });

  const handleChange = (
    name: keyof Omit<SubReqItem, "id">,
    value: string | number
  ) => {
    let newFormData = { ...formData, [name]: value };

    // Auto-calculate amount when quantity or rate changes
    if (name === "quantity" || name === "rate") {
      const quantity = name === "quantity" ? Number(value) : formData.quantity;
      const rate = name === "rate" ? Number(value) : formData.rate;
      newFormData.amount = quantity * rate;
    }

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
      rate: 0,
      amount: 0,
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
          type="number"
          label="Rate(₦)"
          name="Rate"
          value={formData.rate.toString()}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleChange("rate", Number(e.target.value))
          }
          placeholder="Rate"
        />
      </div>
      <InputField
        type="number"
        label="Amount(₦)"
        name="Amount"
        placeholder="Amount"
        value={formData.amount.toString()}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          handleChange("amount", Number(e.target.value))
        }
      />
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

export default AddReqItem;
