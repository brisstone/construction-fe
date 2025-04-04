import ButtonComp from "@/components/general/ButtonComp";
import FileUpload from "@/components/general/FileDrags";
import GooglePlacesInput from "@/components/general/GooglePlacesInput";
import ReusableSelect from "@/components/general/ReuseableSelect";
import UploadImg from "@/components/general/UploadImage";
import InputField from "@/components/input/InputField";
import useCreateContractor from "@/hooks/api/mutation/contractor/useCreateContractor";
import useUpdateContractor from "@/hooks/api/mutation/contractor/useUpdateContractor";

import {
  ContractorType,
  QUERY_KEY_CONTRACTOR,
} from "@/hooks/api/queries/contractor/getContractor";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

type ContractorTypeProps = {
  handleModalClose: () => void;
  defaultValues?: ContractorType;
  isEditMode?: boolean;
};

const AddContractor = ({
  handleModalClose,
  defaultValues,
  isEditMode,
}: ContractorTypeProps) => {
  const [firstName, setFirstName] = useState(defaultValues?.firstName || "");
  const [lastName, setLastName] = useState(defaultValues?.lastName || "");
  const [contractorAddress, setContractorAddress] = useState(
    defaultValues?.address || ""
  );
  const [occupation, setOccupation] = useState(defaultValues?.occupation || "");
  const [phoneNumber, setPhoneNumber] = useState(
    defaultValues?.phoneNumber || ""
  );

  const [contractorType, setContractorType] = useState<string>(
    defaultValues?.type || ""
  );
  const [contractorEmail, setContractorEmail] = useState(
    defaultValues?.email || ""
  );
  const [coordinates, setCoordinates] = useState<{
    lat: number;
    lng: number;
  } | null>(
    defaultValues?.geometry
      ? {
          lat: Number(defaultValues?.geometry?.lat),
          lng: Number(defaultValues?.geometry?.long),
        }
      : null
  ); 

  console.log(coordinates, "coordinates");
  const [files, setFiles] = useState<any>({
    amenityIcon: null,
  });

  console.log(files, "files");

  const handleFileChange = (file: File | null, name: string) => {
    console.log("File received:", file, "for", name);

    setFiles((prevFiles: any) => ({ ...prevFiles, [name]: file }));
  };

  const handleAddressSelect = (address: string, lat: number, lng: number) => {
    setContractorAddress(address);
    setCoordinates({ lat, lng });
  };

  const { mutate: createContractor, isPending: isCreating } =
    useCreateContractor();

  const { mutate: updateContractor, isPending: isUpdating } =
    useUpdateContractor();

  const queryClient = useQueryClient();

  const onSubmit = () => {
    const data = {
      firstName,
      lastName,
      phoneNumber,
      email: contractorEmail,
      type: contractorType,
      occupation,
      address: contractorAddress,
    };

    if (isEditMode && defaultValues?._id) {
      updateContractor(
        { ...data, id: defaultValues._id },
        {
          onSuccess: (response: any) => {
            toast.success(response?.data?.message || "edited successfully");
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY_CONTRACTOR] });
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
      createContractor(data, {
        onSuccess: (response: any) => {
          toast.success(
            response?.data?.message || "contractor added successfully"
          );
          queryClient.invalidateQueries({ queryKey: [QUERY_KEY_CONTRACTOR] });
          handleModalClose();
        },
        onError: (error: any) => {
          toast.error(
            error?.response?.data?.message || "Error creating contractor"
          );
        },
      });
    }
  };

  return (
    <div>
      <UploadImg name="clientIcon" onFileChange={handleFileChange} />
      <div className="grid sm:grid-cols-2 grid-cols-1 gap-5 ">
        <InputField
          type="text"
          label="first Name"
          name="FirstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="Add First Name"
        />
        <InputField
          type="text"
          label="last Name"
          name="LastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Add Last Name"
        />
      </div>

      <div className="mb-4">
        <p className="text-sm font-semibold text-grey mb-2">
          Contractor Address
        </p>
        <div>
          <GooglePlacesInput
            defaultValue={defaultValues?.geometry?.address}
            apiKey={import.meta.env.VITE_GOOGLE_APIKEY}
            onSelect={handleAddressSelect}
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 grid-cols-1 gap-5 ">
        <InputField
          type="text"
          label="Phone Number"
          name="phone"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Add Phone Number "
        />
        <InputField
          type="email"
          label="Email Address"
          name="Email"
          value={contractorEmail}
          onChange={(e) => setContractorEmail(e.target.value)}
          placeholder="Add Email Address"
        />
      </div>
      <div>
        <p className="text-sm font-semibold text-grey">Contractor Type</p>
        <ReusableSelect
          defaultValue={contractorType}
          onValueChange={setContractorType}
          className="my-4"
          placeholder="Contractor Type"
          options={[
            { label: "full-time", value: "full-time" },
            { label: "part-time", value: "part-time" },
          ]}
        />
      </div>
      <div className="grid sm:grid-cols-2 grid-cols-1 gap-5 ">
        <InputField
          type="text"
          label="Occupation"
          name="Occupation"
          value={occupation}
          onChange={(e) => setOccupation(e.target.value)}
          placeholder="Add Occupation"
        />
      </div>

      <div>
        <p className="text-sm font-semibold text-grey mb-2">Proof of Identification</p>
        <FileUpload onFileUpload={(file) => console.log(file)} />
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

export default AddContractor;
