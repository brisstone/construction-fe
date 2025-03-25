import ButtonComp from "@/components/general/ButtonComp";
import FileUpload from "@/components/general/FileDrags";
import GooglePlacesInput from "@/components/general/GooglePlacesInput";
import ReusableSelect from "@/components/general/ReuseableSelect";
import UploadImg from "@/components/general/UploadImage";
import InputField from "@/components/input/InputField";
import useCreateClients from "@/hooks/api/mutation/clients/useCreateClients";
import useUpdateClient from "@/hooks/api/mutation/clients/useUpdateClient";
import {
  ClientType,
  QUERY_KEY_CLIENTS,
} from "@/hooks/api/queries/clients/getClients";
import { useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { useState } from "react";
import { toast } from "sonner";

type clientTypeProps = {
  handleModalClose: () => void;
  defaultValues?: ClientType;
  isEditMode?: boolean;
};

const AddClient = ({
  handleModalClose,
  defaultValues,
  isEditMode,
}: clientTypeProps) => {
  const [firstName, setFirstName] = useState(defaultValues?.firstName || "");
  const [lastName, setLastName] = useState(defaultValues?.lastName || "");
  const [clientAddress, setClientAddress] = useState(
    defaultValues?.geometry.address || ""
  );
  const [occupation, setOccupation] = useState(defaultValues?.occupation || "");
  const [phoneNumber, setPhoneNumber] = useState(
    defaultValues?.phoneNumber || ""
  );
  const [dob, setDob] = useState<Date | null>(
    defaultValues?.dob ? new Date(defaultValues.dob) : null
  );

  // const localDate = new Date();
  const utcDateString = dob ? format(dob, "yyyy-MM-dd'T'HH:mm:ss'Z'") : "";

  console.log(utcDateString);

  const [clientType, setClientType] = useState<string>(
    defaultValues?.type || ""
  );
  const [clientEmail, setClientEmail] = useState(defaultValues?.email || "");
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
  const [files, setFiles] = useState<any>({
    amenityIcon: null,
  });

  console.log(files, "files");

  const handleFileChange = (file: File | null, name: string) => {
    console.log("File received:", file, "for", name);

    setFiles((prevFiles: any) => ({ ...prevFiles, [name]: file }));
  };

  const handleAddressSelect = (address: string, lat: number, lng: number) => {
    setClientAddress(address);
    setCoordinates({ lat, lng });
  };

  const { mutate: createClient, isPending: isCreating } = useCreateClients();

  const { mutate: updateClient, isPending: isUpdating } = useUpdateClient();

  const queryClient = useQueryClient();

  const onSubmit = () => {
    const data = {
      firstName,
      lastName,
      phoneNumber,
      email: clientEmail,
      type: clientType,
      occupation,
      dob: dob?.toISOString(),
      geometry: {
        address: clientAddress,
        lat: coordinates?.lat,
        long: coordinates?.lng,
      },
    };

    if (isEditMode && defaultValues?._id) {
      updateClient(
        { ...data, id: defaultValues._id },
        {
          onSuccess: (response: any) => {
            toast.success(response?.data?.message || "edited successfully");
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY_CLIENTS] });
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
      createClient(data, {
        onSuccess: (response: any) => {
          toast.success(response?.data?.message || "client added successfully");
          queryClient.invalidateQueries({ queryKey: [QUERY_KEY_CLIENTS] });
          handleModalClose();
        },
        onError: (error: any) => {
          toast.error(
            error?.response?.data?.message || "Error creating client"
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
        <p className="text-sm font-semibold text-grey mb-2">Client Address</p>
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
          value={clientEmail}
          onChange={(e) => setClientEmail(e.target.value)}
          placeholder="Add Email Address"
        />
      </div>
      <div>
        <p className="text-sm font-semibold text-grey">Client Type</p>
        <ReusableSelect
          defaultValue={clientType}
          onValueChange={setClientType}
          className="my-4"
          placeholder="Client Type"
          options={[
            { label: "premium", value: "premium" },
            { label: "classic", value: "classic" },
          ]}
        />
      </div>
      <div className="grid sm:grid-cols-2 grid-cols-1 gap-5 ">
        <InputField
          value={dob ? dob.toISOString().split("T")[0] : ""}
          onChange={(e) => setDob(new Date(e.target.value))}
          type="date"
          label="Birth date"
          name="Birth"
        />
        <InputField
          type="text"
          label="Occupation"
          name="Occupation"
          value={occupation}
          onChange={(e) => setOccupation(e.target.value)}
          placeholder="Add Occupation"
        />
      </div>
      <InputField type="date" label="Date of Entry" name="dateOfEntry" />
      <div>
        <p className="text-sm font-semibold text-grey mb-2">Proof of Payment</p>
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

export default AddClient;
