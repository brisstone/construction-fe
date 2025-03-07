import ButtonComp from "@/components/general/ButtonComp";
import ReusableSelect from "@/components/general/ReuseableSelect";
import InputField from "@/components/input/InputField";

const AddAffiliate = () => {
  return (
    <div>
      <div className="grid sm:grid-cols-2 grid-cols-1 gap-5 ">
        <InputField
          type="text"
          label="First Name"
          name="firstName"
          placeholder="Add First Name"
        />
        <InputField
          type="email"
          label="Email Address"
          name="Email"
          placeholder="Add Email Address"
        />
      </div>
      <div>
        <p className="text-sm font-semibold text-grey">Gender</p>
        <ReusableSelect
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
          name="phone"
          placeholder="Add Phone Number "
        />
        <InputField
          type="text"
          label="Address"
          name="address"
          placeholder="Add Address"
        />
      </div>

      <div className="flex gap-3 items-center justify-self-end mt-4">
        <ButtonComp text="Save" />
      </div>
    </div>
  );
};

export default AddAffiliate;
