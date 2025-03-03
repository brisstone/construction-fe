import ButtonComp from "@/components/general/ButtonComp";
import InputField from "@/components/input/InputField";
import TextAreaField from "@/components/input/TextAreaField";
import { useState } from "react";
import AmenityArray from "./AmenityArray";
import MultipleFileUpload from "@/components/general/MultipleFileUpload";

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

  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const handleFileUpload = (files: File[], name: string) => {
    console.log("Uploaded files for", name, ":", files);
    setUploadedFiles(files);
  };

  console.log(uploadedFiles, "uploadedFiles");

  return (
    <div>
      <aside>
        <div>
          <p className="text-sm font-semibold text-grey">
            Upload Property Photo
          </p>
          <MultipleFileUpload
            name="clientIcon"
            onFileChange={handleFileUpload}
          />
        </div>
        {/* {uploadedFiles.length > 0 && (
          <div className="mt-4">
            <h3 className="text-md font-medium">Uploaded Files:</h3>
            <ul className="list-disc pl-4">
              {uploadedFiles.map((file, index) => (
                <li key={index} className="text-sm">
                  {file.name}
                </li>
              ))}
            </ul>
          </div>
        )} */}
      </aside>
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

      <ButtonComp
        className="flex justify-self-end w-fit"
        text="Create Property"
      />
    </div>
  );
};

export default CreateProperty;
