import ProjectHouse1 from "@/assets/images/ProjectHouse1.png";
import { ThreeDotsVertical } from "@/assets/svgComp/General";
import { ProjectType } from "@/hooks/api/queries/projects/getProject";
import { format } from "date-fns";
import { Link, useNavigate } from "react-router-dom";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import ReusableDialog from "../general/ReuseableDialog";
import { useState } from "react";
import DeleteProjectModal from "./DeleteProjectModal";

const ProjectListCard = ({
  project,
  onEdit,
}: {
  project: ProjectType;
  onEdit: (proj: ProjectType) => void;
}) => {
  const navigate = useNavigate();
  const projectDetails = [
    { title: "Project Name", content: project?.name },
    { title: "Project Manager", content: project?.managerId },
    { title: "Site Location", content: project?.location },
    { title: "Project Desc", content: project?.description },
    { title: "Project Owner", content: project?.ownerId },
  ];

  const projectMeta = [
    {
      title: "Actual Start Date",
      content: format(new Date(project?.startDate), "MMM dd, yyyy"),
    },
    {
      title: "Project Finish",
      content: format(new Date(project?.endDate), "MMM dd, yyyy"),
    },
    { title: "Duration", content: "366 Days" },
    { title: "Stage", content: "Course of Construction" },
    { title: "Status", content: "Ongoing" },
  ];

  const [deleteProject, setDeleteProject] = useState(false);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  const handleDelete = (id: string) => {
    setSelectedProject(id);
    setDeleteProject(true);
  };

  return (
    <>
      <section
        onClick={() => {
          navigate(`/admin/project/${project._id}`);
        }}
        className="bg-white md:flex border relative group rounded-[4px] justify-between items-center gap-6 h-fit p-2 hover:shadow-projectShadow mb-4"
      >
        <div className="absolute top-2 right-2 group-hover:block gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                }}
                className=" bg-white rounded-full shadow-md"
              >
                <ThreeDotsVertical />
              </button>
            </PopoverTrigger>
            <PopoverContent
              onClick={(e) => e.stopPropagation()}
              className="w-[100px] rounded-[4px]"
            >
              <div onClick={(e) => e.stopPropagation()}>
                <p onClick={() => onEdit(project)} className="cursor-pointer">
                  Edit
                </p>
                <p
                  onClick={() => handleDelete(project?._id)}
                  className="cursor-pointer"
                >
                  Delete
                </p>
              </div>
            </PopoverContent>
          </Popover>
        </div>
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
      </section>
      {
        <ReusableDialog
          title={"Delete Project"}
          open={deleteProject}
          onOpenChange={setDeleteProject}
          className="max-w-xl"
        >
          <DeleteProjectModal
            setDeleteProject={setDeleteProject}
            selectedProject={selectedProject || ""}
          />
        </ReusableDialog>
      }
    </>
  );
};

export default ProjectListCard;
