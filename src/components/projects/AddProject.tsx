import ButtonComp from "@/components/general/ButtonComp";
import GooglePlacesInput from "@/components/general/GooglePlacesInput";
import ReusableSelect from "@/components/general/ReuseableSelect";
import InputField from "@/components/input/InputField";
import useGetClients, {
  ClientType,
} from "@/hooks/api/queries/clients/getClients";
import { useAuthStore } from "@/store/authStore";

// import { format } from "date-fns";
import { useState } from "react";
import { toast } from "sonner";
import TextAreaField from "../input/TextAreaField";
import useCreateProject from "@/hooks/api/mutation/project/useCreateProject";
import useMultipleFileUpload from "@/hooks/api/mutation/imageUploads/useMultipleFileUpload";
import MultipleFileUpload from "../general/MultipleFileUpload";
import { ProjectType, QUERY_KEY_PROJECT } from "@/hooks/api/queries/projects/getProject";
import useUpdateProject from "@/hooks/api/mutation/project/useUpdateProject";
import { useQueryClient } from "@tanstack/react-query";

type projectTypeProps = {
  handleModalClose: () => void;
  defaultValues?: ProjectType;
  isEditMode?: boolean;
};

const AddProject = ({
  handleModalClose,
  defaultValues,
  isEditMode,
}: projectTypeProps) => {
  const [projectName, setProjectName] = useState(defaultValues?.name || "");
  const [projectDescription, setProjectDescription] = useState(
    defaultValues?.description || ""
  );

  const { currentUser } = useAuthStore();
  const [clientAddress, setClientAddress] = useState(
    defaultValues?.location || ""
  );
  const [projectManager, setProjectManager] = useState(
    defaultValues?.managerId || ""
  );
  const [numOfProperty, setNumOfProperty] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(
    defaultValues?.startDate ? new Date(defaultValues.startDate) : null
  );
  const [endDate, setEndDate] = useState<Date | null>(
    defaultValues?.startDate ? new Date(defaultValues.startDate) : null
  );

  // const localDate = new Date();
  // const utcDateString = dob ? format(dob, "yyyy-MM-dd'T'HH:mm:ss'Z'") : "";

  // console.log(utcDateString, dob?.toISOString());

  const [coordinates, setCoordinates] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  console.log(coordinates, "coordinates");

  const { mutate: createProject, isPending: isCreating } = useCreateProject();

  const { mutate: updateProject, isPending: isUpdating } = useUpdateProject();
  
  const queryClient = useQueryClient();

  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  console.log(uploadedFiles, "uploadedFiles");

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

  const handleAddressSelect = (address: string, lat: number, lng: number) => {
    setClientAddress(address);
    setCoordinates({ lat, lng });
  };

  const { data: client, isPending } = useGetClients(
    currentUser?.companyId || ""
  );

  const clientOptions =
    client?.data?.map((client: ClientType) => ({
      label: client.firstName,
      value: client._id,
    })) || [];

  if (isPending) {
    return (
      <div className="inset-0 bg-black bg-opacity-10 text-center flex justify-center">
        Loading...
      </div>
    );
  }

  // const { mutate: uploadImage, isPending: imageUploading } =
  //   useMultipleFileUpload();

  const onSubmit = () => {
    const data = {
      photos: uploadedFiles,
      name: projectName,
      description: projectDescription,
      managerId: projectManager,
      location: clientAddress,
      ownerId: projectManager,
      startDate: startDate?.toISOString(),
      endDate: endDate?.toISOString(),
      // geometry: {
      //   address: clientAddress,
      //   lat: coordinates?.lat,
      //   long: coordinates?.lng,
      // },
    };

    if (isEditMode && defaultValues?._id) {
      updateProject(
        { ...data, id: defaultValues._id },
        {
          onSuccess: (response: any) => {
            toast.success(response?.data?.message || "edited successfully");
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY_PROJECT] });
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
      createProject(data, {
        onSuccess: (response: any) => {
          toast.success(
            response?.data?.message || "project added successfully"
          );
          queryClient.invalidateQueries({ queryKey: [QUERY_KEY_PROJECT] });
          handleModalClose();
        },
        onError: (error: any) => {
          toast.error(
            error?.response?.data?.message || "Error creating project"
          );
        },
      });
    }
  };

  return (
    <div>
      {/* {imageUploading ? (
        <div>uploading...</div>
      ) : ( */}
      <div className=" my-5">
        <p className="text-sm font-semibold text-grey mb-4">
          Upload a project Image
        </p>
        <MultipleFileUpload name="clientIcon" onFileChange={handleFileChange} />
      </div>
      {/* )} */}
      <div className="grid sm:grid-cols-2 grid-cols-1 gap-5 ">
        <InputField
          type="text"
          label="Project Name"
          name="projectName"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          placeholder="Add project Name"
        />
        <div>
          <p className="text-sm font-semibold text-grey">Project Manager</p>
          <ReusableSelect
            defaultValue={projectManager}
            onValueChange={setProjectManager}
            className="my-4"
            placeholder="Project Manager"
            options={clientOptions}
          />
        </div>
      </div>
      <div className="mb-4">
        <p className="text-sm font-semibold text-grey mb-2">Project Location</p>
        <div>
          <GooglePlacesInput
            defaultValue={defaultValues?.location}
            apiKey={import.meta.env.VITE_GOOGLE_APIKEY}
            onSelect={handleAddressSelect}
          />
        </div>
      </div>
      <TextAreaField
        label="Project Description"
        name="description"
        rows={2}
        value={projectDescription}
        onChange={(e) => setProjectDescription(e.target.value)}
        placeholder="Type in description"
      />
      <div className="grid sm:grid-cols-2 grid-cols-1 gap-5 ">
        <div>
          <p className="text-sm font-semibold text-grey">Project Owner</p>
          <ReusableSelect
            defaultValue={projectManager}
            onValueChange={setProjectManager}
            className="mt-3"
            placeholder="Project Owner"
            options={clientOptions}
          />
        </div>
        <InputField
          type="number"
          label="Number of Property"
          name="numOfProperty"
          value={numOfProperty}
          onChange={(e) => setNumOfProperty(e.target.value)}
        />
      </div>

      <div className="grid sm:grid-cols-2 grid-cols-1 gap-5 ">
        <InputField
          onChange={(e) => setStartDate(new Date(e.target.value))}
          type="date"
          label="Start Date"
          name="start"
        />
        <InputField
          onChange={(e) => setEndDate(new Date(e.target.value))}
          type="date"
          label="End date"
          name="end"
        />
      </div>
      <div className="flex gap-3 items-center justify-self-end mt-4">
        <ButtonComp
          onClick={onSubmit}
          text={
            isEditMode
              ? isUpdating
                ? "Updating..."
                : "Update"
              : isCreating
              ? "Creating..."
              : "Create"
          }
          // text={isCreating ? "creating" : "Create"}
        />
      </div>
    </div>
  );
};

export default AddProject;
