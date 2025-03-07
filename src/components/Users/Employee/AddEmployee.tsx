import ButtonComp from "@/components/general/ButtonComp";
import InputField from "@/components/input/InputField";

const AddEmployee = () => {
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
          type="text"
          label="Last Name"
          name="lastName"
          placeholder="Add Last Name"
        />
      </div>

      <InputField
        type="email"
        label="Email Address"
        name="Email"
        placeholder="Add Email Address"
      />

      <div className="flex gap-3 items-center justify-self-end mt-4">
        <ButtonComp text="Save" />
      </div>
    </div>
  );
};

export default AddEmployee;
