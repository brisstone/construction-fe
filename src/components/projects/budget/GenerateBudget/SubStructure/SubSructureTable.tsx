import { ThreeDotsVertical } from "@/assets/svgComp/General";
import GenericTable from "@/components/general/GenericTable";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { WorkStageType } from "@/hooks/api/queries/projects/budget/workStage/getWorkStage";
import { useNavigate } from "react-router-dom";
// export type TaskItem = {
//   id: number;
//   workStage: string;
//   amount: number;
// };

// const sampleData: TaskItem[] = [
//   {
//     id: 1,
//     workStage: "DPC",
//     amount: 350000,
//   },
// ];

const SubSructureTable = ({
  workStageDataLoad,
}: {
  workStageDataLoad: WorkStageType[];
}) => {
  const headers = [
    { content: <>S/N</> },
    { content: <>Work Stage</> },
    { content: <>Amount(₦)</> },
    { content: <>Action</> },
  ];

  const navigate = useNavigate();
  const renderRow = (workItem: WorkStageType, index: number) => {
    const handleRowClick = () => {
      navigate(`/admin/project/${workItem?._id}/budget/workStage`);
    };

    if (workStageDataLoad?.length === 0) {
      return <div>No data</div>;
    }

    return (
      <tr
        onClick={handleRowClick}
        key={index}
        className="text-gray-700 text-sm h-[50px] border-b cursor-pointer"
      >
        <td className="py-2 px-4">{workItem._id}</td>
        <td className="py-2 px-4">{workItem.name}</td>
        <td className="py-2 px-4">{"undecided"}</td>

        <td className="py-1 px-4">
          <Popover>
            <PopoverTrigger>
              <ThreeDotsVertical />
            </PopoverTrigger>
            <PopoverContent className="w-[100px] rounded-[4px]">
              <div>
                <p className="cursor-pointer">Edit</p>
                <p className="cursor-pointer">Delete</p>
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
        data={workStageDataLoad}
        renderRow={renderRow}
        className=""
      />
    </div>
  );
};

export default SubSructureTable;
