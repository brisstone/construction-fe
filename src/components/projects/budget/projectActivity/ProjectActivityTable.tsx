import { ThreeDotsVertical } from "@/assets/svgComp/General";
import GenericTable from "@/components/general/GenericTable";
import ReusableDialog from "@/components/general/ReuseableDialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { ProjectActType } from "@/hooks/api/queries/projects/budget/workStage/projectActivity/getProjectActivity";
import { format } from "date-fns";
import DeleteProjectActivityModal from "./DeleteProjectActivityModal";

const ProjectActivityTable = ({
  projectActivityData,
  onEdit,
}: {
  projectActivityData: ProjectActType[];
  onEdit: (item: ProjectActType) => void;
}) => {
  const headers = [
    { content: <>Name</> },
    { content: <>Start Date</> },
    { content: <>End Date</> },
    { content: <>Description</> },
    { content: <></> },
  ];

  const [deleteProjectActivity, setDeleteProjectActivity] = useState(false);
  const [selectedProjectActivity, setSelectedProjectActivity] = useState<
    string | null
  >(null);

  const handleDelete = (id: string) => {
    setSelectedProjectActivity(id);
    setDeleteProjectActivity(true);
  };

  const renderRow = (actItem: ProjectActType, index: number) => {
    return (
      <tr key={index} className="text-gray-700 text-sm h-[50px] border-b">
        <td className="py-2 px-4">{actItem?.name}</td>
        <td className="py-2 px-4">
          {format(new Date(actItem?.startDate), "MMMM dd, yyyy")}
        </td>
        <td className="py-2 px-4">
          {format(new Date(actItem?.endDate), "MMMM dd, yyyy")}
        </td>
        <td className="py-2 px-4">{actItem?.description}</td>
        <td className="py-1 px-4">
          <Popover>
            <PopoverTrigger>
              <ThreeDotsVertical />
            </PopoverTrigger>
            <PopoverContent className="w-[100px] rounded-[4px]">
              <div>
                <p onClick={() => onEdit(actItem)} className="cursor-pointer">
                  Edit
                </p>
                <p
                  onClick={() => handleDelete(actItem?._id)}
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
        data={projectActivityData}
        renderRow={renderRow}
        className=""
      />
      {
        <ReusableDialog
          title={"Delete ProjectActivity"}
          open={deleteProjectActivity}
          onOpenChange={setDeleteProjectActivity}
          className="max-w-xl"
        >
          <DeleteProjectActivityModal
            setDeleteProjectActivity={setDeleteProjectActivity}
            selectedProjectActivity={selectedProjectActivity || ""}
          />
        </ReusableDialog>
      }
    </div>
  );
};

export default ProjectActivityTable;
