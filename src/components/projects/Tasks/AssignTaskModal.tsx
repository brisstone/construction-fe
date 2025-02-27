import ButtonComp from "@/components/general/ButtonComp";
import ReusableSelect from "@/components/general/ReuseableSelect";
import InputField from "@/components/input/InputField";
import TextAreaField from "@/components/input/TextAreaField";
import { useState } from "react";

const AssignTaskModal = () => {
  const [, setSelectWorkPlan] = useState("");

  return (
    <div>
      <InputField
        type="text"
        label="Task Title"
        name="taskTitle"
        placeholder="Type the task title"
      />
      <TextAreaField
        label="Task Description"
        name="description"
        rows={2}
        placeholder="Type in description"
      />
      <div className="grid sm:grid-cols-2 grid-cols-1 gap-5">
        <InputField type="time" label="Start Time" name="startTime" />
        <InputField type="time" label="End Time" name="endTime" />
      </div>
      <div>
        <p className="text-sm font-semibold text-grey">Select Work Plan Item</p>
        <ReusableSelect
          className="my-4"
          placeholder="Select Work Plan Item"
          onValueChange={setSelectWorkPlan}
          options={[
            { label: "bending", value: "bending" },
            { label: "fixing", value: "fixing" },
          ]}
        />
      </div>
      <div>
        <p className="text-sm font-semibold text-grey">Assign To</p>
        <ReusableSelect
          className="my-4"
          placeholder="Assign To"
          onValueChange={setSelectWorkPlan}
          options={[
            { label: "John", value: "John" },
            { label: "Godwin", value: "Godwin" },
          ]}
        />
      </div>
      <div className="flex gap-3 items-center justify-self-end mt-4">
        <ButtonComp text="Assign Task" />
      </div>
    </div>
  );
};

export default AssignTaskModal;
