import ButtonComp from "@/components/general/ButtonComp";
import FilterLayout from "@/components/general/FilterLayout";
import ReusableDialog from "@/components/general/ReuseableDialog";
import Container from "@/components/layout/Container";
import AddProject from "@/components/projects/AddProject";
import ProjectListCard from "@/components/projects/ProjectListCard";
import usegetProject, {
  ProjectType,
} from "@/hooks/api/queries/projects/getProject";
import { useAuthStore } from "@/store/authStore";
import { PageTypes } from "@/utils";
import { useState } from "react";

const Project = () => {
  const pageKey = PageTypes.PROJECTS;
  const { currentUser } = useAuthStore();
  const [addProject, setAddProject] = useState(false);
  const [editProject, setEditProject] = useState<ProjectType | null>(null);

  const handleModalClose = () => {
    setAddProject(false);
    setEditProject(null);
  };

  const params: Record<string, string | number> = {};
  const { data: project, isPending } = usegetProject(
    currentUser?.companyId || "",
    params
  );

  const projectData = project?.data;

  const handleEdit = (proj: ProjectType) => {
    setEditProject(proj);
    setAddProject(true);
  };

  console.log(projectData, "project");

  return (
    <div>
      <section className="flex justify-between items-center mb-5">
        <h3 className="text-grey font-extrabold sm:text-2xl text-lg">
          Projects List
        </h3>
        <ButtonComp
          onClick={() => {
            setEditProject(null);
            setAddProject(true);
          }}
          text="Add New Project"
          className="w-fit"
        />
      </section>
      <Container>
        <FilterLayout pageKey={pageKey} />
        {isPending ? (
          <div>Loading...</div>
        ) : projectData?.length !== 0 ? (
          projectData?.map((project) => (
            <ProjectListCard onEdit={handleEdit} project={project} />
          ))
        ) : (
          <div>No projects found</div>
        )}
        {/* <div>
          <ProjectListCard />
          <ProjectListCard />
          <ProjectListCard />
        </div> */}
      </Container>
      {
        <ReusableDialog
          title={editProject ? "Edit PROJECT" : "ADD NEW PROJECT"}
          open={addProject}
          onOpenChange={setAddProject}
          className="sm:max-w-[60vw]"
        >
          <div>
            <AddProject
              handleModalClose={handleModalClose}
              defaultValues={editProject || undefined}
              isEditMode={!!editProject}
            />
          </div>
        </ReusableDialog>
      }
    </div>
  );
};

export default Project;
