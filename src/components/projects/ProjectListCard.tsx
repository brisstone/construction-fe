import ProjectHouse1 from "@/assets/images/ProjectHouse1.png";
import { Link } from "react-router-dom";

const ProjectListCard = () => {
  const projectDetails = [
    { title: "Project Name", content: "Mabushi Project" },
    { title: "Project Manager", content: "Johnson Okoli" },
    { title: "Site Location", content: "Mabushi Abuja" },
    { title: "Project Desc", content: "8 Units of 5 Bedroom duplex" },
    { title: "Project Owner", content: "Buildcraft Limited" },
  ];

  const projectMeta = [
    { title: "Actual Start Date", content: "21/01/2021" },
    { title: "Project Finish", content: "23/12/2022" },
    { title: "Duration", content: "366 Days" },
    { title: "Stage", content: "Course of Construction" },
    { title: "Status", content: "Ongoing" },
  ];

  return (
    <Link to={"/admin/project-detail"} className="bg-white md:flex border rounded-[4px] justify-between items-center gap-6 h-fit p-2 hover:shadow-projectShadow mb-4">
      <div className="md:w-1/3">
        <img src={ProjectHouse1} alt="Project" className="w-full h-auto" />
      </div>
      <div className="md:w-2/3 grid grid-cols-2 gap-x-6 mt-3 md:mt-0">
        <div className="flex flex-col gap-2">
          {projectDetails.map((item, index) => (
            <div key={index} className="text-sm">
              <span className="font-bold">{item.title}: </span>
              <span className="text-xs">{item.content}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-2">
          {projectMeta.map((item, index) => (
            <div key={index} className="text-sm">
              <span className="font-bold">{item.title}: </span>
              <span className="text-xs">{item.content}</span>
            </div>
          ))}
        </div>
      </div>
    </Link>
  );
};

export default ProjectListCard;
