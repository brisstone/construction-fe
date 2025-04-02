import InputField from "@/components/input/InputField";
import TextAreaField from "@/components/input/TextAreaField";
import { useState } from "react";

import { Checkbox } from "@/components/ui/checkbox";
import MaterialArray from "./workStage/MaterialArray";
import ButtonComp from "@/components/general/ButtonComp";
import LabourArray from "./workStage/LabourArray";
import useCreateWorkStage from "@/hooks/api/mutation/project/budget/workStage/useCreateWorkStage";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY_WORKSTAGE } from "@/hooks/api/queries/projects/budget/workStage/getWorkStage";

interface Material {
  materialId: string;
  materialType: string;
  quantity: number;
  unitId: string;
  rate: number;
}

interface Labour {
  laborId: string;
  quantity: number;
  unitId: string;
  rate: number;
}

interface AddNewWorkModalProps {
  handleModalClose: () => void;
  budgetId: string;
  workStageType: string;
}

const AddNewWorkModal = ({
  handleModalClose,
  budgetId,
  workStageType,
}: AddNewWorkModalProps) => {
  const [isMaterialChecked, setIsMaterialChecked] = useState(false);
  const [isLabourChecked, setIsLabourChecked] = useState(false);
  const [materials, setMaterials] = useState<Material[]>([]);
  const [labours, setLabours] = useState<Labour[]>([]);
  const [workTitle, setWorkTitle] = useState("");
  const [description, setDescription] = useState("");

  const { id } = useParams<{ id: string }>();

  console.log(materials, "materials");
  console.log(labours, "labours");

  const totalAmount = materials.reduce(
    (sum, material) => sum + material.quantity * material.rate,
    0
  );

  const addMaterial = () => {
    setMaterials([
      ...materials,
      {
        materialId: "",
        materialType: "",
        quantity: 0,
        unitId: "",
        rate: 0,
      },
    ]);
  };

  const updateMaterial = (index: number, updatedMaterial: Material) => {
    const newMaterials = [...materials];
    newMaterials[index] = updatedMaterial;
    setMaterials(newMaterials);
  };

  const removeMaterial = (index: number) => {
    setMaterials(materials.filter((_, i) => i !== index));
  };

  //   lavour calc below

  const addLabour = () => {
    setLabours([...labours, { laborId: "", quantity: 0, unitId: "", rate: 0 }]);
  };

  const updateLabour = (index: number, updatedLabour: Labour) => {
    const newLabours = [...labours];
    newLabours[index] = updatedLabour;
    setLabours(newLabours);
  };

  // Remove a specific labour item
  const removeLabour = (index: number) => {
    const filteredLabours = labours.filter((_, i) => i !== index);
    setLabours(filteredLabours);
  };

  const totalLabourCost = labours.reduce(
    (sum, labour) => sum + labour.quantity * labour.rate,
    0
  );

  const queryClient = useQueryClient();
  const { mutate: addWorkStage, isPending } = useCreateWorkStage();

  const handleSubmit = () => {
    const payload = {
      name: workTitle,
      description,
      projectId: id,
      budgetId,
      stageType: workStageType === "sub" ? "sub_structure" : "super_structure",
      materials,
      labors: labours,
    };

    addWorkStage(payload, {
      onSuccess: (response: any) => {
        toast.success(
          response?.data?.message || "workStage added successfully"
        );
        queryClient.invalidateQueries({ queryKey: [QUERY_KEY_WORKSTAGE] });
        handleModalClose();
      },
      onError: (error: any) => {
        toast.error(
          error?.response?.data?.message || "Error creating workStage"
        );
      },
    });
  };

  return (
    <div>
      <InputField
        type="text"
        label="Work Stage Title"
        name="workTitle"
        placeholder="Type the work title"
        value={workTitle}
        onChange={(e) => setWorkTitle(e.target.value)}
      />
      <TextAreaField
        label="Work Stage Description"
        name="description"
        rows={2}
        placeholder="Type in description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <div className="flex justify-between w-[25%] mx-auto gap-7">
        <div className="flex items-center gap-2 font-medium">
          <label>Material</label>
          <Checkbox
            checked={isMaterialChecked}
            onCheckedChange={(checked) =>
              setIsMaterialChecked(checked === true)
            }
          />
        </div>
        <div className="flex items-center gap-2 font-medium">
          <label>Labour</label>
          <Checkbox
            checked={isLabourChecked}
            onCheckedChange={(checked) => setIsLabourChecked(checked === true)}
          />
        </div>
      </div>
      <section className="my-5">
        {isMaterialChecked && (
          <div className="border-y py-4">
            <div className="sm:flex items-center justify-between my-3">
              <p className="font-medium text-lg text-textShade">Materials</p>
              <ButtonComp
                text="Add Material"
                className="w-fit mt-1 sm:mt-0"
                onClick={addMaterial}
              />
            </div>
            {materials.map((material, index) => (
              <MaterialArray
                key={index}
                index={index}
                material={material}
                onUpdate={updateMaterial}
                onRemove={removeMaterial}
              />
            ))}

            {materials.length > 0 && (
              <div className="flex border justify-between p-4 rounded-[4px] mt-4">
                <h3 className="font-bold">Final Material Total (₦):</h3>
                <p className="ml-3">{totalAmount.toLocaleString()}</p>
              </div>
            )}
          </div>
        )}
        {isLabourChecked && (
          <div className="border-y py-4">
            <div className="sm:flex items-center justify-between my-3">
              <p className="font-medium text-lg text-textShade">Labour</p>
              <ButtonComp
                text="Add Labour"
                className="w-fit mt-1 sm:mt-0"
                onClick={addLabour}
              />
            </div>
            {labours.map((labour, index) => (
              <LabourArray
                key={index}
                index={index}
                labour={labour}
                onUpdate={updateLabour}
                onRemove={removeLabour}
              />
            ))}
            {labours.length > 0 && (
              <div className="flex border justify-between p-4 rounded-[4px] mt-4">
                <h3 className="font-bold">Total Labour Cost (₦):</h3>
                <p className="ml-3">{totalLabourCost.toLocaleString()}</p>
              </div>
            )}
          </div>
        )}
      </section>
      {/* {labours.length > 0 && materials.length > 0 && ( */}
      <section className="flex justify-between items-center border-2 my-14 p-3 rounded-[4px]">
        <div className="flex border justify-between p-4 rounded-[4px] mt-4">
          <h3 className="font-bold">Material & Labour Total Cost (₦):</h3>
          <p className="ml-3">
            {(totalLabourCost + totalAmount).toLocaleString()}
          </p>
        </div>
        <ButtonComp
          onClick={handleSubmit}
          text={isPending ? "creating.." : "Create"}
        />
      </section>
      {/* )} */}
    </div>
  );
};

export default AddNewWorkModal;
