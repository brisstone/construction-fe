import { ThreeDotsVertical } from "@/assets/svgComp/General";
import GenericTable from "@/components/general/GenericTable";
import ReusableDialog from "@/components/general/ReuseableDialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ProjectLaborType } from "@/hooks/api/queries/projects/budget/workStage/getWorkStage";
import { useState } from "react";
import DeleteProjectLaborModal from "./DeleteProjectLaborModal";
// export type TaskItem = {
//   id: number;
//   LabourActivity: string;
//   Unit: string;
//   totalQty: number;
//   rate: number;
//   totalCost: number;
// };

// const sampleData: TaskItem[] = [
//   {
//     id: 1,
//     LabourActivity: "Kiker from work",
//     Unit: "Sum",
//     totalQty: 1,
//     rate: 15000,
//     totalCost: 15000,
//   },
// ];

const LabourTable = ({
  workStageLabor,
  onEdit,
}: {
  workStageLabor: ProjectLaborType[];
  onEdit: (item: ProjectLaborType) => void;
}) => {
  const headers = [
    { content: <>Labour Activity</> },
    { content: <>Unit</> },
    { content: <>Quantity</> },
    { content: <>Rate (₦)</> },
    { content: <>Total Cost (₦)</> },
    { content: <></> },
  ];

  const [deleteProjectLabor, setDeleteProjectLabor] = useState(false);
  const [selectedProjectLabor, setSelectedProjectLabor] = useState<
    string | null
  >(null);

  const handleDelete = (id: string) => {
    setSelectedProjectLabor(id);
    setDeleteProjectLabor(true);
  };

  const renderRow = (labItem: ProjectLaborType, index: number) => {
    return (
      <tr key={index} className="text-gray-700 text-sm h-[50px] border-b">
        <td className="py-2 px-4">{labItem?.laborId?.name}</td>
        <td className="py-2 px-4">{labItem?.unitId?.name}</td>
        <td className="py-2 px-4">{labItem?.quantity}</td>
        <td className="py-2 px-4">{labItem?.rate}</td>
        <td className="py-2 px-4">{labItem.quantity * labItem?.rate}</td>
        <td className="py-1 px-4">
          <Popover>
            <PopoverTrigger>
              <ThreeDotsVertical />
            </PopoverTrigger>
            <PopoverContent className="w-[100px] rounded-[4px]">
              <div>
                <p onClick={() => onEdit(labItem)} className="cursor-pointer">
                  Edit
                </p>
                <p
                  onClick={() => handleDelete(labItem?._id)}
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
        data={workStageLabor}
        renderRow={renderRow}
        className=""
      />
      {
        <ReusableDialog
          title={"Delete ProjectLabor"}
          open={deleteProjectLabor}
          onOpenChange={setDeleteProjectLabor}
          className="max-w-xl"
        >
          <DeleteProjectLaborModal
            setDeleteProjectLabor={setDeleteProjectLabor}
            selectedProjectLabor={selectedProjectLabor || ""}
          />
        </ReusableDialog>
      }
    </div>
  );
};

export default LabourTable;
