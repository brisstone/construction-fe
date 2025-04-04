import { useState } from "react";
import GenericTable from "@/components/general/GenericTable";
import ReusableDialog from "@/components/general/ReuseableDialog";
import { Button } from "@/components/ui/button";
import { TasksActType } from "@/hooks/api/queries/tasks/getTasksActivity";
import AssignTaskModal from "./AssignTaskModal";
import { format } from "date-fns";

const TaskTable = ({ taskActivity }: { taskActivity: TasksActType[] }) => {
  const headers = [
    { content: <>Task Title</> },
    { content: <>Assigned To</> },
    { content: <>Start Time</> },
    { content: <>End Time</> },
    { content: <>Status </> },
    { content: <>Action</> },
  ];

  const [openTask, setOpenTask] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState("");

  if (taskActivity?.length === 0) {
    return <div>No data available</div>;
  }

  const renderRow = (task: TasksActType, index: number) => {
    console.log(task, 'task__task')
    return (
      <tr key={index} className="text-gray-700 text-sm h-[50px] border-b">
        <td className="py-2 px-4">{task?.name}</td>
        <td className="py-2 px-4">{task?.assigneeId?.firstName ?? "Nil"} {task?.assigneeId?.lastName}</td>
        <td className="py-2 px-4">{format(new Date(task?.startDate), "MMM dd, yyyy")}</td>
        <td className="py-2 px-4">{format(new Date(task?.endDate), "MMM dd, yyyy")}</td>
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
          <Button
            onClick={() => {
              setSelectedTaskId(task._id);
              setOpenTask(true);
            }}
            className="bg-deepBlue rounded-[4px]"
          >
            Assign
          </Button>
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
      {
        <ReusableDialog
          title="Task Assignment"
          open={openTask}
          onOpenChange={setOpenTask}
          className="sm:max-w-[60vw]"
        >
          <div>
            <AssignTaskModal
              defaultId={selectedTaskId}
              handleModalClose={() => setOpenTask(false)}
            />
          </div>
        </ReusableDialog>
      }
    </div>
  );
};

export default TaskTable;
