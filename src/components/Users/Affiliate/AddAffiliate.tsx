import ButtonComp from "@/components/general/ButtonComp";
import ReusableSelect from "@/components/general/ReuseableSelect";
import InputField from "@/components/input/InputField";
import useRegister from "@/hooks/api/mutation/auth/useRegister";
import { QUERY_KEY_COMPUSER } from "@/hooks/api/queries/user/getCompanyUser";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

type props = {
  handleModalClose: () => void;
};

const AddAffiliate = ({ handleModalClose }: props) => {
  const [regData, setRegData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  });

  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");

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
      { ...regData, address, gender, accountType: "affiliate" },
      {
        onSuccess: (response: any) => {
          toast.success(
            response?.data?.message || "affiliate added successfully"
          );
          queryClient.invalidateQueries({ queryKey: [QUERY_KEY_COMPUSER] });
          handleModalClose();
        },
        onError: (error: any) => {
          toast.error(
            error?.response?.data?.message || "Error creating affiliate"
          );
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
      <div>
        <p className="text-sm font-semibold text-grey">Gender</p>
        <ReusableSelect
          defaultValue={gender}
          onValueChange={setGender}
          className="my-4"
          placeholder="Gender"
          options={[
            { label: "Male", value: "Male" },
            { label: "Female", value: "Female" },
          ]}
        />
      </div>
      <div className="grid sm:grid-cols-2 grid-cols-1 gap-5 ">
        <InputField
          type="text"
          label="Phone Number"
          name="phoneNumber"
          placeholder="Add Phone Number "
          value={regData.phoneNumber}
          onChange={handleChange}
        />
        <InputField
          type="text"
          label="Address"
          name="address"
          placeholder="Add Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
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

export default AddAffiliate;
