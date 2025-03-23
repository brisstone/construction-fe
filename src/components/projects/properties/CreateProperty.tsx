import ButtonComp from "@/components/general/ButtonComp";
import InputField from "@/components/input/InputField";
import TextAreaField from "@/components/input/TextAreaField";
import { useState } from "react";
import AmenityArray from "./AmenityArray";
import MultipleFileUpload from "@/components/general/MultipleFileUpload";
import useMultipleFileUpload from "@/hooks/api/mutation/imageUploads/useMultipleFileUpload";
import { toast } from "sonner";
import useCreateProperty from "@/hooks/api/mutation/project/property/useCreateProperty";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY_PROPERTY } from "@/hooks/api/queries/projects/property/getProperty";
import { useParams } from "react-router-dom";

interface Amenity {
  amenityId: string;
  quantity: number;
}

type PropertyTypeProps = {
  handleModalClose: () => void;
  // defaultValues?: UnitType;
  // isEditMode?: boolean;
};
interface PropertyFormData {
  name: string;
  amount: string;
  description: string;
  dwellingType: "Single" | "Multi_Story";
}

const CreateProperty = ({ handleModalClose }: PropertyTypeProps) => {

  const {id} = useParams<{id: string}>();
  const [formData, setFormData] = useState<PropertyFormData>({
    name: "",
    description: "",
    amount: "",
    dwellingType: "Single",
  });

  const [Amenities, setAmenities] = useState<Amenity[]>([]);

  const addAmenity = () => {
    setAmenities([
      ...Amenities,
      {
        amenityId: "",
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

  const { mutate: uploadImage } = useMultipleFileUpload();

  const handleFileChange = (files: File[], name: string) => {
    console.log("Uploaded files for", name, ":", files);
    setUploadedFiles(files);

    // Upload new files
    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));
    uploadImage(
      { formData },
      {
        onSuccess: (response: any) => {
          setUploadedFiles(response?.data?.urls);
          toast.success("Images uploaded successfully");
          // Handle the response, e.g., save the URLs to state
        },
        onError: (error: any) => {
          toast.error(error?.data?.message || "No Uploaded file");
        },
      }
    );
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDwellingTypeChange = (type: "Single" | "Multi_Story") => {
    setFormData({
      ...formData,
      dwellingType: type,
    });
  };

  const queryClient = useQueryClient();
  const { mutate: createProperty, isPending: isCreating } = useCreateProperty();

  const handleSubmit = () => {
    const payload = {
      ...formData,
      projectId: id,
      photos: uploadedFiles,
      amenities: Amenities,
    };

    createProperty(payload, {
      onSuccess: (response: any) => {
        toast.success(response?.data?.message || "property added successfully");
        queryClient.invalidateQueries({ queryKey: [QUERY_KEY_PROPERTY] });
        handleModalClose();
      },
      onError: (error: any) => {
        toast.error(
          error?.response?.data?.message || "Error creating property"
        );
      },
    });

  };

  return (
    <div>
      <aside>
        <div>
          <p className="text-sm font-semibold text-grey">
            Upload Property Photo
          </p>
          <MultipleFileUpload
            name="propertyPhotos"
            onFileChange={handleFileChange}
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
        value={formData.name}
        name="name"
        placeholder="Mabushi Project Phase 1/A05"
        onChange={handleInputChange}
      />
      <TextAreaField
        label="Property Description"
        name="description"
        rows={2}
        placeholder="5 Bedroom Stand-alone Duplex with BQ (House A05)"
        onChange={handleInputChange}
        value={formData.description}
      />
      <InputField
        type="number"
        label="Property Amount"
        value={formData.amount}
        name="amount"
        placeholder="2000"
        onChange={handleInputChange}
      />
      <div>
        <p className="text-sm font-semibold text-grey mb-2">Dwelling Type:</p>
        <aside className="flex gap-3 items-center">
          <div className="flex gap-3 items-center">
            <input
              className="h-4 w-4"
              type="radio"
              name="single"
              id="single"
              checked={formData.dwellingType === "Single"}
              onChange={() => handleDwellingTypeChange("Single")}
            />
            <label htmlFor="single">Single</label>
          </div>
          <div className="flex gap-3 items-center">
            <input
              className="h-4 w-4"
              type="radio"
              name="multi"
              id="multi"
              checked={formData.dwellingType === "Multi_Story"}
              onChange={() => handleDwellingTypeChange("Multi_Story")}
            />
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
        text={isCreating ? "creating..." : "Create Property"}
        onClick={handleSubmit}
      />
    </div>
  );
};

export default CreateProperty;
