import GenericTable from "@/components/general/GenericTable";
import { WorkStageType } from "@/hooks/api/queries/projects/budget/workStage/getWorkStage";
import React from "react";

const GroupedWorkTable = ({
  workStageDataAll,
}: {
  workStageDataAll: WorkStageType[];
}) => {
  const headers = [
    { content: <>S/N</> },
    { content: <>Task/Activities</> },
    { content: <>Duration</> },
    { content: <>Start Date</> },
    { content: <>End Date</> },
    { content: <>Status</> },
  ];

  const groupedData = Object.values(
    workStageDataAll.reduce((acc, stage) => {
      const stageType = stage.stageType || "undefined";
      const key = stageType.toUpperCase().replace("_", " ");

      const activities = (stage.projectActivities || []).map((activity, i) => {
        const start = activity.startDate
          ? new Date(activity.startDate).toLocaleDateString()
          : "N/A";
        const end = activity.endDate
          ? new Date(activity.endDate).toLocaleDateString()
          : "N/A";

        return {
          id: `${stage._id}-activity-${i}`,
          activity: activity.name,
          duration: "N/A",
          start,
          finish: end,
          status: "Not Started",
        };
      });

      if (!acc[key]) {
        acc[key] = {
          section: key,
          tasks: [],
        };
      }

      acc[key].tasks.push(...activities);
      return acc;
    }, {} as Record<string, { section: string; tasks: any[] }>)
  );

  const renderRow = (
    section: { section: string; tasks: any[] },
    index: number
  ) => (
    <React.Fragment key={index}>
      <tr>
        <td
          colSpan={6}
          className="pl-16 text-grey font-bold h-[60px] px-4 py-2 uppercase"
        >
          {section.section}
        </td>
      </tr>
      {section.tasks.map((task, taskIdx) => (
        <tr
          key={task.id}
          className="text-grey text-[13px] text-left text-sm h-[60px] font-medium cursor-pointer"
        >
          <td className="px-4 py-2">{taskIdx + 1}</td>
          <td className="px-4 py-2">{task.activity}</td>
          <td className="px-4 py-2">{task.duration}</td>
          <td className="px-4 py-2">{task.start}</td>
          <td className="px-4 py-2">{task.finish}</td>
          <td
            className={`px-4 py-2 font-medium ${
              task.status === "Completed"
                ? "text-green"
                : task.status === "In Progress"
                ? "text-yellow"
                : task.status === "Overdue"
                ? "text-red-600"
                : "text-gray-600"
            }`}
          >
            {task.status}
          </td>
        </tr>
      ))}
    </React.Fragment>
  );

  return (
    <div>
      <GenericTable
        headers={headers}
        data={groupedData}
        renderRow={renderRow}
      />
    </div>
  );
};

export default GroupedWorkTable;
