import { ThreeDotsVertical } from "@/assets/svgComp/General";
import GenericTable from "@/components/general/GenericTable";
import ReusableDialog from "@/components/general/ReuseableDialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { UnitType } from "@/hooks/api/queries/settings/unit/getUnit";
import { useState } from "react";
import DeleteUnitModal from "./DeleteUnitModal";

type unitTableProps = {
  unitData: UnitType[];
  onEdit: (unit: UnitType) => void;
};

const UnitTable = ({ unitData, onEdit }: unitTableProps) => {
  const headers = [
    { content: <>S/N</> },
    { content: <> Name</> },
    { content: <>Action</> },
  ];

  const [deleteUnit, setDeleteUnit] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState<string | null>(null);

  const handleDelete = (id: string) => {
    setSelectedUnit(id);
    setDeleteUnit(true);
  };

  if (unitData?.length === 0)
    return (
      <div>
        <h1 className="text-center">No Data</h1>
      </div>
    );

  const renderRow = (item: UnitType, index: number) => {
    return (
      <tr key={index} className="text-gray-700 text-sm h-[50px] border-b">
        <td className="py-2 px-4">{item._id}</td>
        <td className="py-2 px-4">{item.name}</td>
        <td className="py-1 px-4">
          <Popover>
            <PopoverTrigger>
              <ThreeDotsVertical />
            </PopoverTrigger>
            <PopoverContent className="w-[100px] rounded-[4px]">
              <div>
                <p onClick={() => onEdit(item)} className="cursor-pointer">
                  Edit
                </p>
                <p
                  onClick={() => handleDelete(item?._id)}
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
        data={unitData}
        renderRow={renderRow}
        className=""
      />
      {
        <ReusableDialog
          title={"Delete Unit"}
          open={deleteUnit}
          onOpenChange={setDeleteUnit}
          className="max-w-xl"
        >
          <DeleteUnitModal
            setDeleteUnit={setDeleteUnit}
            selectedUnit={selectedUnit || ""}
          />
        </ReusableDialog>
      }
    </div>
  );
};

export default UnitTable;
