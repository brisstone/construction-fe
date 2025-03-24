import ButtonComp from "@/components/general/ButtonComp";
import ReusableSelect from "@/components/general/ReuseableSelect";
import SearchableSelect from "@/components/general/SearchableSelect";
import InputField from "@/components/input/InputField";
import useGetMaterial from "@/hooks/api/queries/settings/material/getMaterial";
import { useAuthStore } from "@/store/authStore";

interface MaterialProps {
  index: number;
  material: {
    materialId: string;
    materialType: string;
    quantity: number;
    unitId: string;
    rate: number;
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

  const materialTypes = [
    "Cement",
    "Sand",
    "Gravel",
    "Blocks",
    "Bricks",
    "Steel Rods",
    "Structural Steel",
    "Aluminum",
    "Timber",
    "Plywood",
    "MDF Boards",
    "Tiles",
    "Paint",
    "Plaster",
    "Corrugated Sheets",
    "Roof Tiles",
    "Waterproof Membrane",
    "Wires",
    "Conduits",
    "Switches & Sockets",
    "PVC Pipes",
    "Fittings",
    "Water Tanks",
    "Glass",
    "Adhesives",
    "Insulation",
  ];

  // const materialTypeOptions =
  //   locationData?.data.map((item) => ({
  //     value: item?._id,
  //     label: item?.name,
  //   })) || [];

  const materialTypeOptions = materialTypes.map((material) => ({
    value: material.toLowerCase().replace(/\s+/g, "-"),
    label: material,
  }));

  const { currentUser } = useAuthStore();

  const { data: materialData, isPending } = useGetMaterial(
    currentUser?.companyId || ""
  );

  if (isPending) {
    return <p className="text-center my-3">Loading...</p>;
  }

  return (
    <div>
      <section className="flex gap-4 my-5">
        <div>
          <p className="text-sm font-semibold text-grey">Material</p>
          <ReusableSelect
            className="mt-3"
            placeholder="Material"
            options={materialData?.data?.map((item) => ({
              label: item.name,
              value: item._id,
            }))}
            // options={[
            //   { label: "irons", value: "irons" },
            //   { label: "spring", value: "spring" },
            // ]}
            defaultValue={material.materialId}
            onValueChange={(value) =>
              onUpdate(index, { ...material, materialId: value })
            }
          />
        </div>
        <div>
          <p className="text-sm font-semibold text-grey">Material Type</p>
          <SearchableSelect
            className="my-3 "
            placeholder="Material Type"
            options={materialTypeOptions}
            defaultValue={material.materialType}
            onValueChange={(value) =>
              onUpdate(index, { ...material, materialType: value })
            }
          />
          {/* <ReusableSelect
            className="mt-3"
            placeholder="Material Type"
            // options={[
            //   { label: "Y20MM", value: "Y20MM" },
            //   { label: "111mm", value: "111mm" },
            // ]}
            options={materialTypeOptions}
            defaultValue={material.materialType}
            onValueChange={(value) =>
              onUpdate(index, { ...material, materialType: value })
            }
          /> */}
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
            defaultValue={material.unitId}
            onValueChange={(value) =>
              onUpdate(index, { ...material, unitId: value })
            }
          />
        </div>
        <InputField
          type="number"
          label="Market Price"
          name="price"
          placeholder="price"
          value={material.rate}
          onChange={(e) => handleChange("rate", Number(e.target.value))}
        />
      </section>
      <aside className="flex border justify-between p-4 rounded-[4px]">
        <h3 className="font-bold">Amount (₦):</h3>
        <p className="ml-3">
          {(material.quantity * material.rate).toLocaleString()}
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
