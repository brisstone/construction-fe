import React, { useState } from "react";
import ButtonComp from "@/components/general/ButtonComp";
import InputField from "@/components/input/InputField";
import useRegister from "@/hooks/api/mutation/auth/useRegister";
import { toast } from "sonner";
// import { useAuthStore } from "@/store/authStore";
import GooglePlacesInput from "@/components/general/GooglePlacesInput";
import { QUERY_KEY_COMPUSER } from "@/hooks/api/queries/user/getCompanyUser";
import { useQueryClient } from "@tanstack/react-query";

type props = {
  handleModalClose: () => void;
};
const AddEmployee = ({ handleModalClose }: props) => {
  // const { currentUser } = useAuthStore();
  const [regData, setRegData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  });

  const [clientAddress, setClientAddress] = useState("");

  const [coordinates, setCoordinates] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  console.log(coordinates);

  const handleAddressSelect = (address: string, lat: number, lng: number) => {
    setClientAddress(address);
    setCoordinates({ lat, lng });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const queryClient = useQueryClient();

  const { mutate, isPending } = useRegister();

  const handleSubmit = () => {
    mutate(
      { ...regData, address: clientAddress },
      {
        onSuccess: (response: any) => {
          toast.success(response?.data?.message || "userr added successfully");
          queryClient.invalidateQueries({ queryKey: [QUERY_KEY_COMPUSER] });
          handleModalClose();
        },
        onError: (error: any) => {
          toast.error(error?.response?.data?.message || "Error creating userr");
        },
      }
    );
  };

  return (
    <div>
      <div className="grid sm:grid-cols-2 grid-cols-1 gap-5 ">
        <InputField
          type="text"
          label="First Name"
          name="firstName"
          placeholder="Add First Name"
          value={regData?.firstName}
          onChange={handleChange}
        />
        <InputField
          type="text"
          label="Last Name"
          name="lastName"
          placeholder="Add Last Name"
          value={regData.lastName}
          onChange={handleChange}
        />
      </div>

      <InputField
        type="email"
        label="Email Address"
        name="email"
        placeholder="Add Email Address"
        value={regData.email}
        onChange={handleChange}
      />
      <InputField
        type="tel"
        label="Phone Number"
        name="phoneNumber"
        placeholder="Add Phone Number"
        value={regData.phoneNumber}
        onChange={handleChange}
      />

      <div className="mb-4">
        <p className="text-sm font-semibold text-grey mb-2">Address</p>
        <div>
          <GooglePlacesInput
            apiKey={import.meta.env.VITE_GOOGLE_APIKEY}
            onSelect={handleAddressSelect}
          />
        </div>
      </div>

      <div className="flex gap-3 items-center justify-self-end mt-4">
        <ButtonComp
          text={isPending ? "saving..." : "Save"}
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
};

export default AddEmployee;
