import { ThreeDotsVertical } from "@/assets/svgComp/General";
import GenericTable from "@/components/general/GenericTable";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export type TaskItem = {
  id: number;
  project: string;
  item: string;
  reqQty: number;
  unit: string;
  balance: number;
  dispatched: number;
  date: string;
};

const sampleData: TaskItem[] = [
  {
    id: 1,
    project: "Katampe Main",
    item: "3x Super bag",
    reqQty: 100,
    unit: "Per bag",
    balance: 0,
    dispatched: 0,
    date: "11/12/2021",
  },
  {
    id: 2,
    project: "Guzape Phase 1",
    item: "1' Aggregates",
    reqQty: 20,
    unit: "Truck load",
    balance: 2000,
    dispatched: 100,
    date: "11/12/2021",
  },
  {
    id: 3,
    project: "Guzape Phase 2",
    item: "POP Cement",
    reqQty: 80,
    unit: "Truck load",
    balance: 3000,
    dispatched: 30,
    date: "11/12/2021",
  },
  {
    id: 4,
    project: "Mabushi",
    item: "2 by 4 Tiles",
    reqQty: 45,
    unit: "Kg",
    balance: 300,
    dispatched: 40,
    date: "11/12/2021",
  },
  {
    id: 5,
    project: "Jahi",
    item: "3mm Cables",
    reqQty: 10,
    unit: "mm",
    balance: 4000,
    dispatched: 2,
    date: "11/12/2021",
  },
];

const MatReqTable = () => {
  const headers = [
    { content: <>Project</> },
    { content: <>Item</> },
    { content: <>Req Qty</> },
    { content: <>Unit</> },
    { content: <>Balance</> },
    { content: <>Dispatched</> },
    { content: <>Date</> },
    { content: <></> },
  ];

  const renderRow = (task: TaskItem, index: number) => {
    return (
      <tr key={index} className="text-gray-700 text-sm h-[50px] border-b">
        <td className="py-2 px-4">{task.project}</td>
        <td className="py-2 px-4">{task.item}</td>
        <td className="py-2 px-4">{task.reqQty}</td>
        <td className="py-2 px-4">{task.unit}</td>
        <td className="py-2 px-4">{task.balance}</td>
        <td className="py-2 px-4">{task.dispatched}</td>
        <td className="py-2 px-4">{task.date}</td>
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

export default MatReqTable;
