import { ThreeDotsVertical } from "@/assets/svgComp/General";
import GenericTable from "@/components/general/GenericTable";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
export type TaskItem = {
  id: number;
  unitName: string;
};

const sampleData: TaskItem[] = [
  {
    id: 1,
    unitName: "Prime ",
  },
];

const UnitTable = () => {
  const headers = [
    { content: <>S/N</> },
    { content: <> Name</> },
    { content: <>Action</> },
  ];

  const renderRow = (task: TaskItem, index: number) => {
    return (
      <tr key={index} className="text-gray-700 text-sm h-[50px] border-b">
        <td className="py-2 px-4">{task.id}</td>
        <td className="py-2 px-4">{task.unitName}</td>
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
        data={sampleData}
        renderRow={renderRow}
        className=""
      />
    </div>
  );
};

export default UnitTable;
