import ButtonComp from "@/components/general/ButtonComp";
import ReusableSelect from "@/components/general/ReuseableSelect";
import InputField from "@/components/input/InputField";
import { useState, useEffect } from "react";

const AddNewMaterial = () => {
  const [, setSelectMaterial] = useState("");
  const [qty, setQty] = useState(1);
  const [price, setPrice] = useState(1);
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    setTotalCost(qty * price);
  }, [qty, price]);

  return (
    <section>
      <div>
        <p className="text-sm font-semibold text-grey">Material</p>
        <ReusableSelect
          className="my-4"
          placeholder="Material"
          onValueChange={setSelectMaterial}
          options={[
            { label: "irons", value: "irons" },
            { label: "spring", value: "spring" },
          ]}
        />
      </div>
      <div>
        <p className="text-sm font-semibold text-grey">Material Type</p>
        <ReusableSelect
          className="my-4"
          placeholder="Material Type"
          onValueChange={setSelectMaterial}
          options={[
            { label: "Y20MM", value: "Y20MM" },
            { label: "111mm", value: "111mm" },
          ]}
        />
      </div>
      <InputField
        type="number"
        label="Total Quantity"
        name="qty"
        placeholder="qty"
        value={qty}
        onChange={(e) => setQty(Number(e.target.value))}
      />
      <div>
        <p className="text-sm font-semibold text-grey">Material Unit</p>
        <ReusableSelect
          className="my-4"
          placeholder="Material Unit"
          onValueChange={setSelectMaterial}
          options={[
            { label: "Length", value: "Length" },
            { label: "metre", value: "metre" },
            { label: "centi", value: "centi" },
          ]}
        />
      </div>
      <InputField
        type="number"
        label="Market Price"
        name="price"
        placeholder="price"
        value={price}
        onChange={(e) => setPrice(Number(e.target.value))}
      />
      <aside className="flex border justify-between w-1/2 mx-auto p-4 rounded-[4px]">
        <h3 className="font-bold">Total Cost (₦): </h3>
        <p>{totalCost}</p>
      </aside>
      <div className="flex gap-3 items-center justify-center mt-4">
        <ButtonComp text="Save" />
      </div>
    </section>
  );
};

export default AddNewMaterial;
