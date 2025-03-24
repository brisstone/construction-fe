import { ThreeDotsVertical } from "@/assets/svgComp/General";
import GenericTable from "@/components/general/GenericTable";
import ReusableDialog from "@/components/general/ReuseableDialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import DeleteLaborModal from "./DeleteLaborModal";
import { LaborType } from "@/hooks/api/queries/settings/labor/getLabor";
export type TaskItem = {
  id: number;
  materialName: string;
};

type LaborTableProps = {
  LaborData: LaborType[];
  onEdit: (labor: LaborType) => void;
};

const SettingsLaborTable = ({ LaborData, onEdit }: LaborTableProps) => {
  const headers = [
    { content: <>S/N</> },
    { content: <>Material Name</> },
    { content: <>Action</> },
  ];

  const [deleteLabor, setDeleteLabor] = useState(false);
  const [selectedLabor, setSelectedLabor] = useState<string | null>(null);

  const handleDelete = (id: string) => {
    setSelectedLabor(id);
    setDeleteLabor(true);
  };

  if (LaborData?.length === 0)
    return (
      <div>
        <h1 className="text-center">No Data</h1>
      </div>
    );

  const renderRow = (laborItem: LaborType, index: number) => {
    return (
      <tr key={index} className="text-gray-700 text-sm h-[50px] border-b">
        <td className="py-2 px-4">{laborItem._id}</td>
        <td className="py-2 px-4">{laborItem.name}</td>
        <td className="py-1 px-4">
          <Popover>
            <PopoverTrigger>
              <ThreeDotsVertical />
            </PopoverTrigger>
            <PopoverContent className="w-[100px] rounded-[4px]">
              <div>
                <p onClick={() => onEdit(laborItem)} className="cursor-pointer">
                  Edit
                </p>
                <p
                  onClick={() => handleDelete(laborItem?._id)}
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
        data={LaborData}
        renderRow={renderRow}
        className=""
      />
      {
        <ReusableDialog
          title={"Delete Labor"}
          open={deleteLabor}
          onOpenChange={setDeleteLabor}
          className="max-w-xl"
        >
          <DeleteLaborModal
            setDeleteLabor={setDeleteLabor}
            selectedLabor={selectedLabor || ""}
          />
        </ReusableDialog>
      }
    </div>
  );
};

export default SettingsLaborTable;
