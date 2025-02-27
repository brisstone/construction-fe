import ButtonComp from "@/components/general/ButtonComp";
import ReusableSelect from "@/components/general/ReuseableSelect";
import InputField from "@/components/input/InputField";

interface MaterialProps {
  index: number;
  material: {
    material: string;
    materialType: string;
    quantity: number;
    materialUnit: string;
    marketPrice: number;
  };
  onUpdate: (index: number, updatedMaterial: any) => void;
  onRemove: (index: number) => void;
}

const MaterialArray = ({
  index,
  material,
  onUpdate,
  onRemove,
}: MaterialProps) => {
  const handleChange = (field: string, value: string | number) => {
    onUpdate(index, { ...material, [field]: value });
  };
  return (
    <div>
      <section className="flex gap-4 my-5">
        <div>
          <p className="text-sm font-semibold text-grey">Material</p>
          <ReusableSelect
            className="mt-3"
            placeholder="Material"
            options={[
              { label: "irons", value: "irons" },
              { label: "spring", value: "spring" },
            ]}
            defaultValue={material.material}
            onValueChange={(value) =>
              onUpdate(index, { ...material, material: value })
            }
          />
        </div>
        <div>
          <p className="text-sm font-semibold text-grey">Material Type</p>
          <ReusableSelect
            className="mt-3"
            placeholder="Material Type"
            options={[
              { label: "Y20MM", value: "Y20MM" },
              { label: "111mm", value: "111mm" },
            ]}
            defaultValue={material.materialType}
            onValueChange={(value) =>
              onUpdate(index, { ...material, materialType: value })
            }
          />
        </div>
        <InputField
          type="number"
          label="Total Quantity"
          name="qty"
          placeholder="qty"
          value={material.quantity}
          onChange={(e) => handleChange("quantity", Number(e.target.value))}
        />
        <div>
          <p className="text-sm font-semibold text-grey">Material Unit</p>
          <ReusableSelect
            className="mt-3"
            placeholder="Material Unit"
            options={[
              { label: "Length", value: "Length" },
              { label: "metre", value: "metre" },
              { label: "centi", value: "centi" },
            ]}
            defaultValue={material.materialUnit}
            onValueChange={(value) =>
              onUpdate(index, { ...material, materialUnit: value })
            }
          />
        </div>
        <InputField
          type="number"
          label="Market Price"
          name="price"
          placeholder="price"
          value={material.marketPrice}
          onChange={(e) => handleChange("marketPrice", Number(e.target.value))}
        />
      </section>
      <aside className="flex border justify-between p-4 rounded-[4px]">
        <h3 className="font-bold">Amount (₦):</h3>
        <p className="ml-3">
          {(material.quantity * material.marketPrice).toLocaleString()}
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

export default MaterialArray;
