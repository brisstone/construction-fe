import { ThreeDotsVertical } from "@/assets/svgComp/General";
import GenericTable from "@/components/general/GenericTable";
import ReusableDialog from "@/components/general/ReuseableDialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ProjectMaterialType } from "@/hooks/api/queries/projects/budget/workStage/getWorkStage";
import DeleteProjectMatModal from "./DeleteProjectMatModal";
import { useState } from "react";
// export type TaskItem = {
//   id: number;
//   materialName: string;
//   materialType: string;
//   materialUnit: string;
//   totalQty: number;
//   materialPrice: number;
//   totalCost: number;
// };

// const sampleData: TaskItem[] = [
//   {
//     id: 1,
//     materialName: "Iron",
//     materialType: "Y20MM",
//     materialUnit: "Length",
//     totalQty: 240,
//     materialPrice: 7620,
//     totalCost: 1836000,
//   },
//   {
//     id: 2,
//     materialName: "Cement",
//     materialType: "Cement",
//     materialUnit: "Bags",
//     totalQty: 260,
//     materialPrice: 3020,
//     totalCost: 780000,
//   },
// ];

const MaterialTable = ({
  workStageMaterial,
  onEdit,
}: {
  workStageMaterial: ProjectMaterialType[];
  onEdit: (item: ProjectMaterialType) => void;
}) => {
  const headers = [
    { content: <>Material Name</> },
    { content: <>Material Type</> },
    { content: <>Material Unit</> },
    { content: <>Total Quantity</> },
    { content: <>Material Price </> },
    { content: <>Total Cost (₦)</> },
    { content: <></> },
  ];

  if (workStageMaterial?.length === 0) {
    return <p>No Material Added</p>;
  }

  const [deleteProjectMaterial, setDeleteProjectMaterial] = useState(false);
  const [selectedProjectMaterial, setSelectedProjectMaterial] = useState<
    string | null
  >(null);

  const handleDelete = (id: string) => {
    setSelectedProjectMaterial(id);
    setDeleteProjectMaterial(true);
  };
  const renderRow = (workMaterialItem: ProjectMaterialType, index: number) => {
    return (
      <tr key={index} className="text-gray-700 text-sm h-[50px] border-b">
        <td className="py-2 px-4">{workMaterialItem?.materialId?.name}</td>
        <td className="py-2 px-4">{workMaterialItem?.materialType}</td>
        <td className="py-2 px-4">{workMaterialItem?.unitId?.name}</td>
        <td className="py-2 px-4">{workMaterialItem?.quantity}</td>
        <td className="py-2 px-4">{workMaterialItem?.rate}</td>
        <td className="py-2 px-4">
          {workMaterialItem?.quantity * workMaterialItem?.rate}
        </td>
        <td className="py-1 px-4">
          <Popover>
            <PopoverTrigger>
              <ThreeDotsVertical />
            </PopoverTrigger>
            <PopoverContent className="w-[100px] rounded-[4px]">
              <div>
                <p
                  onClick={() => onEdit(workMaterialItem)}
                  className="cursor-pointer"
                >
                  Edit
                </p>
                <p
                  onClick={() => handleDelete(workMaterialItem?._id)}
                  className="cursor-pointer"
                >
                  Delete
                </p>
              </div>
            </PopoverContent>
          </Popover>
        </td>
      </tr>
    );
  };

  return (
    <div>
      <GenericTable
        headers={headers}
        data={workStageMaterial}
        renderRow={renderRow}
        className=""
      />
      {
        <ReusableDialog
          title={"Delete ProjectMaterial"}
          open={deleteProjectMaterial}
          onOpenChange={setDeleteProjectMaterial}
          className="max-w-xl"
        >
          <DeleteProjectMatModal
            setDeleteProjectMaterial={setDeleteProjectMaterial}
            selectedProjectMaterial={selectedProjectMaterial || ""}
          />
        </ReusableDialog>
      }
    </div>
  );
};

export default MaterialTable;
