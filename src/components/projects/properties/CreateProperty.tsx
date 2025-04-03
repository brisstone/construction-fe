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
import {
  amenityData,
  PropertyType,
  QUERY_KEY_PROPERTY,
} from "@/hooks/api/queries/projects/property/getProperty";
import { useParams } from "react-router-dom";
import useUpdateProperty from "@/hooks/api/mutation/project/property/useUpdateProperty";
import { QUERY_KEY_SINGLEPROPERTY } from "@/hooks/api/queries/projects/property/getSingleProperty";

interface Amenity {
  amenityId: string | amenityData;
  quantity: number;
}

type PropertyTypeProps = {
  handleModalClose: () => void;
  defaultValues?: PropertyType;
  isEditMode?: boolean;
};
interface PropertyFormData {
  name: string;
  amount: number | string;
  description: string;
  dwellingType: "Single" | "Multi_Story";
}

const CreateProperty = ({
  handleModalClose,
  defaultValues,
  isEditMode,
}: PropertyTypeProps) => {
  const { id } = useParams<{ id: string }>();
  const [formData, setFormData] = useState<PropertyFormData>({
    name: defaultValues?.name || "",
    description: defaultValues?.description || "",
    amount: defaultValues?.amount || "",
    dwellingType: defaultValues?.dwellingType || "Single",
  });

  const [Amenities, setAmenities] = useState<Amenity[]>(
    defaultValues?.amenities || []
  );

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
    setAmenities(Amenities?.filter((_, i) => i !== index));
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
  const { mutate: updateProperty, isPending: isUpdating } = useUpdateProperty();

  const handleSubmit = () => {
    const payload = {
      ...formData,
      projectId: id,
      photos: [...(defaultValues?.photos || []), ...uploadedFiles],
      amenities: Amenities,
    };

    if (isEditMode && defaultValues?._id) {
      updateProperty(
        { ...payload, id: defaultValues._id },
        {
          onSuccess: (response: any) => {
            toast.success(response?.data?.message || "edited successfully");
            queryClient.invalidateQueries({
              queryKey: [QUERY_KEY_SINGLEPROPERTY],
            });
            handleModalClose();
          },
          onError: (error: any) => {
            toast.error(
              error?.response?.data?.message || "Error updating client"
            );
          },
        }
      );
    } else {
      createProperty(payload, {
        onSuccess: (response: any) => {
          toast.success(
            response?.data?.message || "property added successfully"
          );
          queryClient.invalidateQueries({ queryKey: [QUERY_KEY_PROPERTY] });
          handleModalClose();
        },
        onError: (error: any) => {
          toast.error(
            error?.response?.data?.message || "Error creating property"
          );
        },
      });
    }
  };

  return (
    <div>
      <aside>
        <div>
          <p className="text-sm font-semibold text-grey">
            Upload Property Photo
          </p>
          {isEditMode &&
            defaultValues?.photos &&
            Array.isArray(defaultValues.photos) && (
              <div className="mb-2">
                <p className="text-xs mb-1">Current images:</p>
                <div className="flex gap-2">
                  {defaultValues.photos.map((photo, index) => (
                    <img
                      key={index}
                      src={photo}
                      alt={`Current property icon ${index + 1}`}
                      className="h-16 w-16 object-contain border rounded"
                    />
                  ))}
                </div>
              </div>
            )}
          <MultipleFileUpload
            defaultFiles={defaultValues?.photos || []}
            name="propertyPhotos"
            onFileChange={handleFileChange}
          />
        </div>
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
        {Amenities?.map((amenities, index) => (
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
        text={
          isEditMode
            ? isUpdating
              ? "Updating..."
              : "Update"
            : isCreating
            ? "Creating..."
            : "Create Property"
        }
        // text={isCreating ? "creating..." : "Create Property"}
        onClick={handleSubmit}
      />
    </div>
  );
};

export default CreateProperty;
