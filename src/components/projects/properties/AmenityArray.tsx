import { RemoveIcon } from "@/assets/svgComp/PropertyIcon";
import ButtonComp from "@/components/general/ButtonComp";
import ReusableSelect from "@/components/general/ReuseableSelect";
import InputField from "@/components/input/InputField";

interface amenitiesProps {
  index: number;
  amenities: {
    amenities: string;
    quantity: number;
  };
  onUpdate: (index: number, updatedMaterial: any) => void;
  onRemove: (index: number) => void;
}

const AmenityArray = ({
  index,
  amenities,
  onUpdate,
  onRemove,
}: amenitiesProps) => {
  const handleChange = (field: string, value: string | number) => {
    onUpdate(index, { ...amenities, [field]: value });
  };
  return (
    <div>
      <section className="flex items-center gap-4 ">
        <section  className="flex gap-4 my-5">
          <div>
            <p className="text-sm font-semibold text-grey">Amenity</p>
            <ReusableSelect
              className="mt-3"
              placeholder="Amenity"
              options={[
                { label: "bathroom", value: "bathroom" },
                { label: "coal", value: "coal" },
              ]}
              defaultValue={amenities.amenities}
              onValueChange={(value) =>
                onUpdate(index, { ...amenities, amenities: value })
              }
            />
          </div>
          <InputField
            type="number"
            label="Total Quantity"
            name="qty"
            placeholder="qty"
            value={amenities.quantity}
            onChange={(e) => handleChange("quantity", Number(e.target.value))}
          />
        </section>
        <RemoveIcon
          onClick={() => onRemove(index)}
          className="cursor-pointer"
        />
      </section>
    </div>
  );
};

export default AmenityArray;
