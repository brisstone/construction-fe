import GenericTable from "@/components/general/GenericTable";
import React from "react";
const sampleData = [
  {
    section: "",
    tasks: [
      {
        id: 1,
        activity: "Site Clearing",
        duration: "2 days",
        start: "21/01/2021",
        finish: "22/01/2021",
        status: "Completed",
      },
      {
        id: 2,
        activity: "Mobilisation to Site",
        duration: "2 days",
        start: "23/01/2021",
        finish: "24/01/2021",
        status: "Completed",
      },
      {
        id: 3,
        activity: "Rebar Bending and Fixing",
        duration: "2 days",
        start: "25/01/2021",
        finish: "26/01/2021",
        status: "In Progress",
      },
      {
        id: 4,
        activity: "Concrete Cover Production",
        duration: "1 day",
        start: "27/01/2021",
        finish: "27/01/2021",
        status: "Overdue",
      },
      {
        id: 5,
        activity: "Precast Lintel Production",
        duration: "1 day",
        start: "28/01/2021",
        finish: "28/01/2021",
        status: "Not Started",
      },
    ],
  },
  {
    section: "SUBSTRUCTURE",
    tasks: [
      {
        id: 7,
        activity: "Survey point for building",
        duration: "1 day",
        start: "29/01/2021",
        finish: "29/01/2021",
        status: "Not Started",
      },
      {
        id: 8,
        activity: "Carpenter profile and marking",
        duration: "1 day",
        start: "30/01/2021",
        finish: "30/01/2021",
        status: "Not Started",
      },
      {
        id: 9,
        activity: "Excavation for strip footing (trench)",
        duration: "2 days",
        start: "31/01/2021",
        finish: "1/02/2021",
        status: "Not Started",
      },
      {
        id: 10,
        activity: "Excavation for pad footing",
        duration: "1 day",
        start: "2/02/2021",
        finish: "2/02/2021",
        status: "Not Started",
      },
      {
        id: 11,
        activity: "Setting of gauge for footings",
        duration: "1 day",
        start: "2/02/2021",
        finish: "2/02/2021",
        status: "Not Started",
      },
      {
        id: 12,
        activity: "Casting of blinding layer",
        duration: "1 day",
        start: "3/02/2021",
        finish: "3/02/2021",
        status: "Not Started",
      },
    ],
  },
  {
    section: "FRAME STRUCTURE",
    tasks: [
      {
        id: 14,
        activity: "Ground floor kicker set out",
        duration: "1 day",
        start: "4/02/2021",
        finish: "4/02/2021",
        status: "Not Started",
      },
      {
        id: 15,
        activity: "Placement and fixing of Ground floor column rebar",
        duration: "1 day",
        start: "5/02/2021",
        finish: "5/02/2021",
        status: "Not Started",
      },
      {
        id: 16,
        activity: "Shuttering of ground floor column formwork",
        duration: "2 days",
        start: "6/02/2021",
        finish: "7/02/2021",
        status: "Not Started",
      },
    ],
  },
];

const WorkTable = () => {
  const headers = [
    { content: <>S/N</> },
    { content: <>Task/Activities</> },
    { content: <>Duration</> },
    { content: <>Start Date</> },
    { content: <>End Date</> },
    { content: <>Status</> },
  ];

  const renderRow = (section: any, index: number) => {
    return (
      <React.Fragment key={index}>
        {section.section && (
          <tr>
            <td
              colSpan={6}
              className="pl-16 text-gray-800 font-bold px-4 py-2 uppercase"
            >
              {section.section}
            </td>
          </tr>
        )}
        {section.tasks.map((task: any) => (
          <tr key={task.id} className="">
            <td className=" px-4 py-2">{task.id}</td>
            <td className=" px-4 py-2">{task.activity}</td>
            <td className=" px-4 py-2">{task.duration}</td>
            <td className=" px-4 py-2">{task.start}</td>
            <td className=" px-4 py-2">{task.finish}</td>
            <td
              className={` px-4 py-2 font-medium ${
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

export default WorkTable;
