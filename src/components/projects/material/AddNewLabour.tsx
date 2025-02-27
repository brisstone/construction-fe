import ButtonComp from "@/components/general/ButtonComp";
import ReusableSelect from "@/components/general/ReuseableSelect";
import InputField from "@/components/input/InputField";
import { useState, useEffect } from "react";

const AddNewLabour = () => {
  const [, setSelectLabour] = useState("");
  const [qty, setQty] = useState(1);
  const [price, setPrice] = useState(1);
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    setTotalCost(qty * price);
  }, [qty, price]);

  return (
    <section>
      <div>
        <p className="text-sm font-semibold text-grey">Labour Activity</p>
        <ReusableSelect
          className="my-4"
          placeholder="Labour Activity"
          onValueChange={setSelectLabour}
          options={[
            { label: "irons in columns", value: "irons" },
            { label: "spring in bars", value: "spring" },
          ]}
        />
      </div>
      <InputField
        type="number"
        label="Quantity"
        name="qty"
        placeholder="qty"
        value={qty}
        onChange={(e) => setQty(Number(e.target.value))}
      />

      <div>
        <p className="text-sm font-semibold text-grey"> Unit</p>
        <ReusableSelect
          className="my-4"
          placeholder="Unit"
          onValueChange={setSelectLabour}
          options={[
            { label: "Kg", value: "Kg" },
            { label: "Length", value: "Length" },
            { label: "metre", value: "metre" },
            { label: "centi", value: "centi" },
          ]}
        />
      </div>
      <InputField
        type="number"
        label="Rate (₦)"
        name="price"
        placeholder="rate"
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

export default AddNewLabour;
