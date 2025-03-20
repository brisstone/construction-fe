import ButtonComp from "@/components/general/ButtonComp";
import FileUpload from "@/components/general/FileDrags";
import GooglePlacesInput from "@/components/general/GooglePlacesInput";
import ReusableSelect from "@/components/general/ReuseableSelect";
import UploadImg from "@/components/general/UploadImage";
import InputField from "@/components/input/InputField";
import useCreateClients from "@/hooks/api/mutation/clients/useCreateClients";
import {
  ClientType,
  QUERY_KEY_CLIENTS,
} from "@/hooks/api/queries/clients/getClients";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

type clientTypeProps = {
  handleModalClose: () => void;
  defaultValues?: ClientType;
};

const AddClient = ({ handleModalClose, defaultValues }: clientTypeProps) => {
  const [clientName, setClientName] = useState("");
  const [clientAddress, setClientAddress] = useState("");
  const [occupation, setOccupation] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dob, setDob] = useState("");
  const [clientType, setClientType] = useState<string>("");
  const [clientEmail, setClientEmail] = useState(defaultValues?.email || "");
  const [coordinates, setCoordinates] = useState<{
    lat: number;
    lng: number;
  } | null>(
    defaultValues?.address
      ? {
          lat: Number(defaultValues?.address?.geometry?.lat),
          lng: Number(defaultValues?.address?.geometry?.long),
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

  const queryClient = useQueryClient();

  const onSubmit = () => {
    const data = {
      firstName: clientName,
      lastName: clientName,
      phoneNumber,
      email: clientEmail,
      type: clientType,
      occupation,
      dob,
      geometry: {
        address: clientAddress,
        lat: coordinates?.lat,
        long: coordinates?.lng,
      },
    };

    createClient(data, {
      onSuccess: (response: any) => {
        toast.success(response?.data?.message || "client added successfully");
        queryClient.invalidateQueries({ queryKey: [QUERY_KEY_CLIENTS] });
        handleModalClose();
      },
      onError: (error: any) => {
        toast.error(error?.response?.data?.message || "Error creating client");
      },
    });
  };

  return (
    <div>
      <UploadImg name="clientIcon" onFileChange={handleFileChange} />
      <InputField
        type="text"
        label="Client Name"
        name="ClientName"
        value={clientName}
        onChange={(e) => setClientName(e.target.value)}
        placeholder="Add Client Name"
      />
      <div className="mb-4">
        <p className="text-sm font-semibold text-grey mb-2">Client Address</p>
        <div>
          <GooglePlacesInput
            defaultValue={""}
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
          value={dob}
          onChange={(e) => setDob(e.target.value)}
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
          text={isCreating ? "creating" : "Create"}
        />
      </div>
    </div>
  );
};

export default AddClient;
