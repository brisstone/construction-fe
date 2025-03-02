import ButtonComp from "@/components/general/ButtonComp";
import UploadImg from "@/components/general/UploadImage";
import InputField from "@/components/input/InputField";
import TextAreaField from "@/components/input/TextAreaField";
import { useState } from "react";
import AmenityArray from "./AmenityArray";

interface Amenity {
  amenities: string;
  quantity: number;
}

const CreateProperty = () => {
  const [Amenities, setAmenities] = useState<Amenity[]>([]);

  const addAmenity = () => {
    setAmenities([
      ...Amenities,
      {
        amenities: "",
        quantity: 0,
      },
    ]);
  };

  const updateAmenity = (index: number, updatedAmenity: Amenity) => {
    const newAmenities = [...Amenities];
    newAmenities[index] = updatedAmenity;
    setAmenities(newAmenities);
  };

  const removeAmenity = (index: number) => {
    setAmenities(Amenities.filter((_, i) => i !== index));
  };

  const [files, setFiles] = useState<any>({
    amenityIcon: null,
  });

  console.log(files, "files");

  const handleFileChange = (file: File | null, name: string) => {
    console.log("File received:", file, "for", name);

    setFiles((prevFiles: any) => ({ ...prevFiles, [name]: file }));
  };

  return (
    <div>
      <div>
        <p className="text-sm font-semibold text-grey">Upload Property Photo</p>
        <UploadImg name="clientIcon" onFileChange={handleFileChange} />
      </div>
      <InputField
        type="text"
        label="Property Name/Number"
        name="propertyName"
        placeholder="Mabushi Project Phase 1/A05"
      />
      <TextAreaField
        label="Property Description"
        name="description"
        rows={2}
        placeholder="5 Bedroom Stand-alone Duplex with BQ (House A05)"
      />
      <div>
        <p className="text-sm font-semibold text-grey mb-2">Dwelling Type:</p>
        <aside className="flex gap-3 items-center">
          <div className="flex gap-3 items-center">
            <input className="h-4 w-4" type="radio" name="single" id="single" />
            <label htmlFor="single">Single</label>
          </div>
          <div className="flex gap-3 items-center">
            <input className="h-4 w-4" type="radio" name="multi" id="multi" />
            <label htmlFor="multi">Multi-Storey</label>
          </div>
        </aside>
      </div>
      <section className="py-4 border-y my-4">
        <p className="text-xl font-semibold text-grey mb-2">Amenities</p>
        {Amenities.map((amenities, index) => (
          <AmenityArray
            key={index}
            index={index}
            amenities={amenities}
            onUpdate={updateAmenity}
            onRemove={removeAmenity}
          />
        ))}
        <ButtonComp
          text="Add Amenities"
          className="w-fit mt-1 sm:mt-0"
          showIcon
          onClick={addAmenity}
        />
      </section>

      <ButtonComp className="flex justify-self-end w-fit" text="Create Property" />
    </div>
  );
};

export default CreateProperty;
