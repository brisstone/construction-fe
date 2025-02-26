import { ThreeDotsVertical } from "@/assets/svgComp/General";
import GenericTable from "@/components/general/GenericTable";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
export type TaskItem = {
  id: number;
  taskTitle: string;
  assignedTo: string;
  startTime: string;
  endTime: string;
  status: "In Progress" | "Completed" | "Incomplete";
};

const sampleData: TaskItem[] = [
  {
    id: 1,
    taskTitle: "Complete Block 3 Roofing",
    assignedTo: "Abubakar Isah",
    startTime: "12/01/2023",
    endTime: "17/01/2022",
    status: "In Progress",
  },
  {
    id: 2,
    taskTitle: "Complete Tiling of phase 2",
    assignedTo: "Ochuko Joseph",
    startTime: "11/01/2023",
    endTime: "25/01/2022",
    status: "In Progress",
  },
  {
    id: 3,
    taskTitle: "Move all cements to Mabushi",
    assignedTo: "Emeka Chibuzor",
    startTime: "11/01/2023",
    endTime: "12/01/2022",
    status: "Completed",
  },
  {
    id: 4,
    taskTitle: "Start Clearing for gate house",
    assignedTo: "Ifeanyi Onyimwalu",
    startTime: "09/01/2023",
    endTime: "12/01/2022",
    status: "Incomplete",
  },
  {
    id: 5,
    taskTitle: "Clear Area for borehole",
    assignedTo: "Ifeanyi Onyimwalu",
    startTime: "07/01/2023",
    endTime: "08/01/2022",
    status: "Completed",
  },
];

const TaskTable = () => {
  const headers = [
    { content: <>Task Title</> },
    { content: <>Assigned To</> },
    { content: <>Start Time</> },
    { content: <>End Time</> },
    { content: <>Status </> },
    { content: <>Action</> },
  ];

  const renderRow = (task: TaskItem, index: number) => {
    return (
      <tr key={index} className="text-gray-700 text-sm h-[50px] border-b">
        <td className="py-2 px-4">{task.taskTitle}</td>
        <td className="py-2 px-4">{task.assignedTo}</td>
        <td className="py-2 px-4">{task.startTime}</td>
        <td className="py-2 px-4">{task.endTime}</td>
        <td className="py-2 px-4 font-medium">
          <span
            className={`${
              task.status === "Completed"
                ? "text-green"
                : task.status === "Incomplete"
                ? "text-red-500"
                : "text-orange-500"
            }`}
          >
            {task.status}
          </span>
        </td>
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

export default TaskTable;
