import ButtonComp from "@/components/general/ButtonComp";
import ReusableSelect from "@/components/general/ReuseableSelect";
import InputField from "@/components/input/InputField";

interface LabourProps {
  index: number;
  labour: {
    activity: string;
    quantity: number;
    unit: string;
    rate: number;
  };
  onUpdate: (index: number, updatedLabour: any) => void;
  onRemove: (index: number) => void;
}

const LabourArray = ({ index, labour, onUpdate, onRemove }: LabourProps) => {
  const handleChange = (field: string, value: string | number) => {
    onUpdate(index, { ...labour, [field]: value });
  };
  return (
    <div>
      <section className="flex gap-4 my-5">
        <div>
          <p className="text-sm font-semibold text-grey">Labour Activity</p>
          <ReusableSelect
            className="my-4"
            placeholder="Labour Activity"
            options={[
              { label: "irons in columns", value: "irons" },
              { label: "spring in bars", value: "spring" },
            ]}
            defaultValue={labour.activity}
            onValueChange={(value) => handleChange("activity", value)}
          />
        </div>
        <InputField
          type="number"
          label="Quantity"
          name="qty"
          placeholder="qty"
          value={labour.quantity}
          onChange={(e) => handleChange("quantity", Number(e.target.value))}
        />

        <div>
          <p className="text-sm font-semibold text-grey"> Unit</p>
          <ReusableSelect
            className="my-4"
            placeholder="Unit"
            defaultValue={labour.unit}
            onValueChange={(value) => handleChange("unit", value)}
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
          value={labour.rate}
          onChange={(e) => handleChange("rate", Number(e.target.value))}
        />
      </section>
      <aside className="flex border justify-between p-4 rounded-[4px]">
        <h3 className="font-bold">Amount (₦):</h3>
        <p className="ml-3">
          {(labour.quantity * labour.rate).toLocaleString()}
        </p>
      </aside>
      <ButtonComp
        text="Remove"
        className="mt-2 bg-red-500 text-white"
        onClick={() => onRemove(index)}
      />
    </div>
  );
};

export default LabourArray;
