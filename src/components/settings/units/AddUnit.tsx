import ButtonComp from "@/components/general/ButtonComp";
import InputField from "@/components/input/InputField";

const AddUnit = () => {
 
  return (
    <div>
      <InputField
        type="text"
        label="New Units"
        name="Units"
        placeholder="add Units"
      />
    
      <div className="flex gap-3 items-center justify-center mt-4">
        <ButtonComp text="Save" className=""/>
      </div>
    </div>
  );
};

export default AddUnit;
