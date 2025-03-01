import ButtonComp from "@/components/general/ButtonComp";
import InputField from "@/components/input/InputField";

const AddMaterialSettings = () => {
  return (
    <div>
      <InputField
        type="text"
        label="Add material"
        name="material"
        placeholder="add material"
      />
      <div className="flex gap-3 items-center justify-center mt-4">
        <ButtonComp text="Save" className=""/>
      </div>
    </div>
  );
};

export default AddMaterialSettings;
