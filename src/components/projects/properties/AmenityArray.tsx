import { RemoveIcon } from "@/assets/svgComp/PropertyIcon";
import ReusableSelect from "@/components/general/ReuseableSelect";
import InputField from "@/components/input/InputField";
import { amenityData } from "@/hooks/api/queries/projects/property/getProperty";
import useGetAmenity from "@/hooks/api/queries/settings/amenity/getAmenity";
import { useAuthStore } from "@/store/authStore";

interface amenitiesProps {
  index: number;
  amenities: {
    amenityId: string | amenityData;
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
  const { currentUser } = useAuthStore();

  const { data: amenity, isPending } = useGetAmenity(
    currentUser?.companyId || ""
  );

  const amenityData = amenity?.data;

  const handleChange = (field: string, value: string | number) => {
    onUpdate(index, { ...amenities, [field]: value });
  };

  if (isPending) {
    return <p className="text-center my-3">Loading...</p>;
  }

  return (
    <div>
      <section className="flex items-center gap-4 ">
        <section className="flex gap-4 my-1">
          <div>
            <p className="text-sm font-semibold text-grey">Amenity</p>
            <ReusableSelect
              className="mt-3"
              placeholder="Amenity"
              options={amenityData?.map((item) => ({
                label: item.name,
                value: item._id,
              }))}
              // options={[
              //   { label: "bathroom", value: "bathroom" },
              //   { label: "coal", value: "coal" },
              // ]}
              defaultValue={(amenities.amenityId as amenityData)._id}
              // defaultValue={
              //   typeof amenities.amenityId === "object" &&
              //   amenities.amenityId !== null
              //     ? amenities.amenityId.name
              //     : amenities.amenityId
              // }
              // defaultValue={amenities.amenityId.name}
              onValueChange={(value) =>
                onUpdate(index, { ...amenities, amenityId: value })
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
