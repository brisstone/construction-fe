import InputField from "@/components/input/InputField";
import TextAreaField from "@/components/input/TextAreaField";
import { useState } from "react";

import { Checkbox } from "@/components/ui/checkbox";
import MaterialArray from "./workStage/MaterialArray";
import ButtonComp from "@/components/general/ButtonComp";
import LabourArray from "./workStage/LabourArray";

interface Material {
  material: string;
  materialType: string;
  quantity: number;
  materialUnit: string;
  marketPrice: number;
} 

interface Labour {
  activity: string;
  quantity: number;
  unit: string;
  rate: number;
}

const AddNewWorkModal = () => {
  const [isMaterialChecked, setIsMaterialChecked] = useState(false);
  const [isLabourChecked, setIsLabourChecked] = useState(false);
  const [materials, setMaterials] = useState<Material[]>([]);
  const [labours, setLabours] = useState<Labour[]>([]);

  console.log(materials, "materials");

  const totalAmount = materials.reduce(
    (sum, material) => sum + material.quantity * material.marketPrice,
    0
  );

  const addMaterial = () => {
    setMaterials([
      ...materials,
      {
        material: "",
        materialType: "",
        quantity: 0,
        materialUnit: "",
        marketPrice: 0,
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
    setLabours([...labours, { activity: "", quantity: 0, unit: "", rate: 0 }]);
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

  return (
    <div>
      <InputField
        type="text"
        label="Work Stage Title"
        name="workTitle"
        placeholder="Type the work title"
      />
      <TextAreaField
        label="Work Stage Description"
        name="description"
        rows={2}
        placeholder="Type in description"
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
      {labours.length > 0 && materials.length > 0 && (
        <section className="flex justify-between items-center border-2 my-14 p-3 rounded-[4px]">
          <div className="flex border justify-between p-4 rounded-[4px] mt-4">
            <h3 className="font-bold">Material & Labour Total Cost (₦):</h3>
            <p className="ml-3">
              {(totalLabourCost + totalAmount).toLocaleString()}
            </p>
          </div>
          <ButtonComp text="Create" />
        </section>
      )}
    </div>
  );
};

export default AddNewWorkModal;
