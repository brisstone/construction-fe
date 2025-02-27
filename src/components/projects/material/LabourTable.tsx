import { ThreeDotsVertical } from "@/assets/svgComp/General";
import GenericTable from "@/components/general/GenericTable";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
export type TaskItem = {
  id: number;
  LabourActivity: string;
  Unit: string;
  totalQty: number;
  rate: number;
  totalCost: number;
};

const sampleData: TaskItem[] = [
  {
    id: 1,
    LabourActivity: "Kiker from work",
    Unit: "Sum",
    totalQty: 1,
    rate: 15000,
    totalCost: 15000,
  },
];

const LabourTable = () => {
  const headers = [
    { content: <>Labour Activity</> },
    { content: <>Unit</> },
    { content: <>Quantity</> },
    { content: <>Rate  (₦)</> },
    { content: <>Total Cost (₦)</> },
    { content: <></> },
  ];

  const renderRow = (task: TaskItem, index: number) => {
    return (
      <tr key={index} className="text-gray-700 text-sm h-[50px] border-b">
        <td className="py-2 px-4">{task.LabourActivity}</td>
        <td className="py-2 px-4">{task.Unit}</td>
        <td className="py-2 px-4">{task.totalQty}</td>
        <td className="py-2 px-4">{task.rate}</td>
        <td className="py-2 px-4">{task.totalCost}</td>
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

export default LabourTable;
