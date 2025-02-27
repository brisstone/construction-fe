import { ThreeDotsVertical } from "@/assets/svgComp/General";
import GenericTable from "@/components/general/GenericTable";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
export type TaskItem = {
  id: number;
  materialName: string;
  materialType: string;
  materialUnit: string;
  totalQty: number;
  materialPrice: number;
  totalCost: number;
};

const sampleData: TaskItem[] = [
  {
    id: 1,
    materialName: "Iron",
    materialType: "Y20MM",
    materialUnit: "Length",
    totalQty: 240,
    materialPrice: 7620,
    totalCost: 1836000,
  },
  {
    id: 2,
    materialName: "Cement",
    materialType: "Cement",
    materialUnit: "Bags",
    totalQty: 260,
    materialPrice: 3020,
    totalCost: 780000,
  },
];

const MaterialTable = () => {
  const headers = [
    { content: <>Material Name</> },
    { content: <>Material Type</> },
    { content: <>Material Unit</> },
    { content: <>Total Quantity</> },
    { content: <>Material Price </> },
    { content: <>Total Cost (₦)</> },
    { content: <></> },
  ];

  const renderRow = (task: TaskItem, index: number) => {
    return (
      <tr key={index} className="text-gray-700 text-sm h-[50px] border-b">
        <td className="py-2 px-4">{task.materialName}</td>
        <td className="py-2 px-4">{task.materialType}</td>
        <td className="py-2 px-4">{task.materialUnit}</td>
        <td className="py-2 px-4">{task.totalQty}</td>
        <td className="py-2 px-4">{task.materialPrice}</td>
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

export default MaterialTable;
