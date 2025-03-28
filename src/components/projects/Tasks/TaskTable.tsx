import GenericTable from "@/components/general/GenericTable";
import { Button } from "@/components/ui/button";

import { TasksActType } from "@/hooks/api/queries/tasks/getTasksActivity";
// export type TaskItem = {
//   id: number;
//   taskTitle: string;
//   assignedTo: string;
//   startTime: string;
//   endTime: string;
//   status: "In Progress" | "Completed" | "Incomplete";
// };

// const sampleData: TaskItem[] = [
//   {
//     id: 1,
//     taskTitle: "Complete Block 3 Roofing",
//     assignedTo: "Abubakar Isah",
//     startTime: "12/01/2023",
//     endTime: "17/01/2022",
//     status: "In Progress",
//   },
//   {
//     id: 2,
//     taskTitle: "Complete Tiling of phase 2",
//     assignedTo: "Ochuko Joseph",
//     startTime: "11/01/2023",
//     endTime: "25/01/2022",
//     status: "In Progress",
//   },
//   {
//     id: 3,
//     taskTitle: "Move all cements to Mabushi",
//     assignedTo: "Emeka Chibuzor",
//     startTime: "11/01/2023",
//     endTime: "12/01/2022",
//     status: "Completed",
//   },
//   {
//     id: 4,
//     taskTitle: "Start Clearing for gate house",
//     assignedTo: "Ifeanyi Onyimwalu",
//     startTime: "09/01/2023",
//     endTime: "12/01/2022",
//     status: "Incomplete",
//   },
//   {
//     id: 5,
//     taskTitle: "Clear Area for borehole",
//     assignedTo: "Ifeanyi Onyimwalu",
//     startTime: "07/01/2023",
//     endTime: "08/01/2022",
//     status: "Completed",
//   },
// ];

const TaskTable = ({ taskActivity }: { taskActivity: TasksActType[] }) => {
  const headers = [
    { content: <>Task Title</> },
    { content: <>Assigned To</> },
    { content: <>Start Time</> },
    { content: <>End Time</> },
    { content: <>Status </> },
    { content: <>Action</> },
  ];

  if (taskActivity?.length === 0) {
    return <div>No data available</div>;
  }

  const renderRow = (task: TasksActType, index: number) => {
    return (
      <tr key={index} className="text-gray-700 text-sm h-[50px] border-b">
        <td className="py-2 px-4">{task?.name}</td>
        <td className="py-2 px-4">{task?.assignedTo ?? "Nil"}</td>
        <td className="py-2 px-4">{task?.startDate}</td>
        <td className="py-2 px-4">{task?.endDate}</td>
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
            {task?.status ?? "Nil"}
          </span>
        </td>
        <td className="py-1 px-4">
          <Button className="bg-deepBlue rounded-[4px]">Assign</Button>
        </td>
      </tr>
    );
  };

  return (
    <div>
      <GenericTable
        headers={headers}
        data={taskActivity}
        renderRow={renderRow}
        className=""
      />
    </div>
  );
};

export default TaskTable;
