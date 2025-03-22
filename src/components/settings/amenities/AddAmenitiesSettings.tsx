import ButtonComp from "@/components/general/ButtonComp";
import UploadImg from "@/components/general/UploadImage";
import InputField from "@/components/input/InputField";
import useMultipleFileUpload from "@/hooks/api/mutation/imageUploads/useMultipleFileUpload";
import useCreateAmenity from "@/hooks/api/mutation/settings/amenity/useCreateAmenity";
import useUpdateAmenity from "@/hooks/api/mutation/settings/amenity/useUpdateAmenity";
import {
  AmenityType,
  QUERY_KEY_AMENITY,
} from "@/hooks/api/queries/settings/amenity/getAmenity";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

type AmenitiesTypeProps = {
  handleModalClose: () => void;
  defaultValues?: AmenityType;
  isEditMode?: boolean;
};

const AddAmenitiesSettings = ({
  handleModalClose,
  defaultValues,
  isEditMode,
}: AmenitiesTypeProps) => {
  const [amenitiesName, setAmenitiesName] = useState(defaultValues?.name || "");

  const { mutate: createAmenity, isPending: isCreating } = useCreateAmenity();
  const { mutate: updateAmenity, isPending: isUpdating } = useUpdateAmenity();

  const queryClient = useQueryClient();

  const [files, setFiles] = useState<any>({
    amenityIcon: defaultValues?.image || null,
  });

  console.log(files.amenityIcon, "files");

  const { mutate: uploadImage } = useMultipleFileUpload();

  const handleFileChange = (file: File | null, name: string) => {
    console.log("Uploaded file for", name, ":", file);
    setFiles((prevFiles: any) => ({ ...prevFiles, [name]: file }));

    // Upload new file
    const formData = new FormData();
    if (file) {
      formData.append("files", file);
    }
    uploadImage(
      { formData },
      {
        onSuccess: (response: any) => {
          setFiles((prevFiles: any) => ({
            ...prevFiles,
            [name]: response?.data?.urls[0],
          }));
          toast.success("Image uploaded successfully");
          // Handle the response, e.g., save the URL to state
        },
        onError: (error: any) => {
          toast.error(error?.data?.message || "No Uploaded file");
        },
      }
    );
  };

  const onSubmit = () => {
    const data = {
      name: amenitiesName,
      image: files.amenityIcon,
    };

    if (isEditMode && defaultValues?._id) {
      updateAmenity(
        { ...data, id: defaultValues._id },
        {
          onSuccess: (response: any) => {
            toast.success(response?.data?.message || "edited successfully");
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY_AMENITY] });
            handleModalClose();
          },
          onError: (error: any) => {
            toast.error(
              error?.response?.data?.message || "Error updating amenity"
            );
          },
        }
      );
    } else {
      createAmenity(data, {
        onSuccess: (response: any) => {
          toast.success(
            response?.data?.message || "amenity added successfully"
          );
          queryClient.invalidateQueries({ queryKey: [QUERY_KEY_AMENITY] });
          handleModalClose();
        },
        onError: (error: any) => {
          toast.error(
            error?.response?.data?.message || "Error creating amenity"
          );
        },
      });
    }
  };

  return (
    <div>
      <InputField
        type="text"
        label="New Amenities"
        onChange={(e) => setAmenitiesName(e.target.value)}
        value={amenitiesName}
        name="amenities"
        placeholder="add amenities"
      />
      <div>
        <p className="mb-2 text-sm">Upload amenity icon below</p>
        {isEditMode && defaultValues?.image && (
          <div className="mb-2">
            <p className="text-xs mb-1">Current image:</p>
            <img
              src={defaultValues.image}
              alt="Current amenity icon"
              className="h-16 w-16 object-contain border rounded"
            />
          </div>
        )}
        <UploadImg name="amenityIcon" onFileChange={handleFileChange} />
      </div>
      <div className="flex gap-3 items-center justify-center mt-4">
        <ButtonComp
          onClick={onSubmit}
          text={
            isEditMode
              ? isUpdating
                ? "Updating..."
                : "Update"
              : isCreating
              ? "saving..."
              : "Save"
          }
          className=""
        />
      </div>
    </div>
  );
};

export default AddAmenitiesSettings;
