import { ThreeDotsVertical } from "@/assets/svgComp/General";
import GenericTable from "@/components/general/GenericTable";
import ReusableDialog from "@/components/general/ReuseableDialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { MaterialType } from "@/hooks/api/queries/settings/material/getMaterial";
import { useState } from "react";
import DeleteMaterialModal from "./DeleteMaterialModal";
export type TaskItem = {
  id: number;
  materialName: string;
};

type MatTableProps = {
  MaterialData: MaterialType[];
  onEdit: (material: MaterialType) => void;
};

const SettingsMaterialTable = ({ MaterialData, onEdit }: MatTableProps) => {
  const headers = [
    { content: <>S/N</> },
    { content: <>Material Name</> },
    { content: <>Action</> },
  ];

  const [deleteMaterial, setDeleteMaterial] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState<string | null>(null);

  const handleDelete = (id: string) => {
    setSelectedMaterial(id);
    setDeleteMaterial(true);
  };

  if (MaterialData?.length === 0)
    return (
      <div>
        <h1 className="text-center">No Data</h1>
      </div>
    );

  const renderRow = (mat: MaterialType, index: number) => {
    return (
      <tr key={index} className="text-gray-700 text-sm h-[50px] border-b">
        <td className="py-2 px-4">{mat._id}</td>
        <td className="py-2 px-4">{mat.name}</td>
        <td className="py-1 px-4">
          <Popover>
            <PopoverTrigger>
              <ThreeDotsVertical />
            </PopoverTrigger>
            <PopoverContent className="w-[100px] rounded-[4px]">
              <div>
                <p onClick={() => onEdit(mat)} className="cursor-pointer">
                  Edit
                </p>
                <p
                  onClick={() => handleDelete(mat?._id)}
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
        data={MaterialData}
        renderRow={renderRow}
        className=""
      />
      {
        <ReusableDialog
          title={"Delete Material"}
          open={deleteMaterial}
          onOpenChange={setDeleteMaterial}
          className="max-w-xl"
        >
          <DeleteMaterialModal
            setDeleteMaterial={setDeleteMaterial}
            selectedMaterial={selectedMaterial || ""}
          />
        </ReusableDialog>
      }
    </div>
  );
};

export default SettingsMaterialTable;
