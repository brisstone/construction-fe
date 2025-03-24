import { ThreeDotsVertical } from "@/assets/svgComp/General";
import GenericTable from "@/components/general/GenericTable";
import ReusableDialog from "@/components/general/ReuseableDialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { AmenityType } from "@/hooks/api/queries/settings/amenity/getAmenity";
import DeleteAmenityModal from "./DeleteAmenityModal";
import { useState } from "react";


type AmenityTableProps = {
  amenityData: AmenityType[];
  onEdit: (amenity: AmenityType) => void;
};

const AmenityTable = ({ onEdit, amenityData }: AmenityTableProps) => {
  const headers = [
    { content: <>S/N</> },
    { content: <> Name</> },
    { content: <> Image</> },
    { content: <>Action</> },
  ];

  const [deleteAmenity, setDeleteAmenity] = useState(false);
  const [selectedAmenity, setSelectedAmenity] = useState<string | null>(null);

  const handleDelete = (id: string) => {
    setSelectedAmenity(id);
    setDeleteAmenity(true);
  };

  if (amenityData?.length === 0)
    return (
      <div>
        <h1 className="text-center">No Data</h1>
      </div>
    );

  const renderRow = (task: AmenityType, index: number) => {
    return (
      <tr key={index} className="text-gray-700 text-sm h-[50px] border-b">
        <td className="py-2 px-4">{task._id}</td>
        <td className="py-2 px-4">{task.name}</td>
        <td className="py-2 px-4 w-[100px] h-[100px]">
          <img src={task.image} alt="s" />
        </td>
        <td className="py-1 px-4">
          <Popover>
            <PopoverTrigger>
              <ThreeDotsVertical />
            </PopoverTrigger>
            <PopoverContent className="w-[100px] rounded-[4px]">
              <div>
                <p onClick={() => onEdit(task)} className="cursor-pointer">
                  Edit
                </p>
                <p
                  onClick={() => handleDelete(task?._id)}
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
        data={amenityData}
        renderRow={renderRow}
        className=""
      />
      {
        <ReusableDialog
          title={"Delete Amenity"}
          open={deleteAmenity}
          onOpenChange={setDeleteAmenity}
          className="max-w-xl"
        >
          <DeleteAmenityModal
            setDeleteAmenity={setDeleteAmenity}
            selectedAmenity={selectedAmenity || ""}
          />
        </ReusableDialog>
      }
    </div>
  );
};

export default AmenityTable;
