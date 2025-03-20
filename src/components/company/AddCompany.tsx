import { useState } from "react";
import ButtonComp from "../general/ButtonComp";
import InputField from "../input/InputField";
import { Button } from "../ui/button";
import useCreateCompany from "@/hooks/api/mutation/company/useCreateCompany";
import { toast } from "sonner";
import GooglePlacesInput from "../general/GooglePlacesInput";
import useUpdateCompany from "@/hooks/api/mutation/company/useUpdateCompany";
import { CompanyType } from "@/hooks/api/queries/company/getCompany";

const AddCompany = ({
  setAddCompany,
  defaultValues,
  isEditMode,
  handleModalClose,
}: {
  setAddCompany: (value: boolean) => void;
  defaultValues?: CompanyType;
  isEditMode?: boolean;
  handleModalClose: () => void;
}) => {
  const [companyName, setCompanyName] = useState(defaultValues?.name || "");
  const [companyEmail, setCompanyEmail] = useState(defaultValues?.email || "");
  const [companyAddress, setCompanyAddress] = useState(
    defaultValues?.locationId?.geometry?.address || ""
  );
  const [coordinates, setCoordinates] = useState<{
    lat: number;
    lng: number;
  } | null>(
    defaultValues?.locationId
      ? {
          lat: Number(defaultValues?.locationId?.geometry?.lat),
          lng: Number(defaultValues?.locationId?.geometry?.long),
        }
      : null
  );

  const handleAddressSelect = (address: string, lat: number, lng: number) => {
    setCompanyAddress(address);
    setCoordinates({ lat, lng });
  };

  const { mutate: createCompany, isPending: isCreating } = useCreateCompany();
  const { mutate: updateCompany, isPending: isUpdating } = useUpdateCompany();

  // console.log(defaultValues?._id, "id");

  const onSubmit = () => {
    const data: {
      name: string;
      geometry: {
        address: string;
        lat: number | undefined;
        long: number | undefined;
      };
      email?: string;
    } = {
      name: companyName,
      geometry: {
        address: companyAddress,
        lat: coordinates?.lat,
        long: coordinates?.lng,
      },
    };

    if (!isEditMode) {
      data.email = companyEmail;
    }
    if (isEditMode && defaultValues?._id) {
      const formData = new FormData();
      formData.append("name", data.name);
      // formData.append("geometry[address]", data.geometry.address);
      // formData.append("geometry[lat]", data.geometry.lat?.toString() || "");
      // formData.append("geometry[long]", data.geometry.long?.toString() || "");

      updateCompany(
        { id: defaultValues._id, formData },
        {
          onSuccess: (response: any) => {
            toast.success(response?.data?.message || "edited successfully");
            handleModalClose();
          },
          onError: (error: any) => {
            toast.error(
              error?.response?.data?.message || "Error updating company"
            );
          },
        }
      );
    } else {
      //
      createCompany(data, {
        onSuccess: (response: any) => {
          toast.success(response?.data?.message);
          handleModalClose();
        },
        onError: (error: any) => {
          toast.error(
            error?.response?.data?.message ??
              error?.message ??
              "Error creating company"
          );
        },
      });
    }
  };

  return (
    <div>
      <section className="my-3">
        <InputField
          onChange={(e) => setCompanyName(e.target.value)}
          label="Company Name"
          name="name"
          placeholder="Enter Company Name"
          value={companyName}
        />
        <InputField
          onChange={(e) => setCompanyEmail(e.target.value)}
          label="Email Address"
          type="email"
          name="email"
          placeholder="Enter email address"
          value={companyEmail}
        />

        <div className="mb-4">
          <p className="text-sm font-semibold text-grey mb-2">
            Company Address
          </p>
          <div>
            <GooglePlacesInput
              defaultValue={defaultValues?.locationId?.geometry?.address}
              apiKey={import.meta.env.VITE_GOOGLE_APIKEY}
              onSelect={handleAddressSelect}
            />
          </div>
        </div>

        <div className="flex gap-3 items-center justify-self-end mt-4">
          <Button
            onClick={() => {
              setAddCompany(false);
            }}
            className="bg-fadedWhite border border-borderColor rounded-[8px] hover:text-white text-black"
          >
            Cancel
          </Button>
          <ButtonComp
            onClick={onSubmit}
            // text={isPending ? "adding.." : "Add Company"}
            text={
              isEditMode
                ? isUpdating
                  ? "Updating..."
                  : "Update Company"
                : isCreating
                ? "Adding..."
                : "Add Company"
            }
            className="w-fit"
          />
        </div>
      </section>
    </div>
  );
};

export default AddCompany;
