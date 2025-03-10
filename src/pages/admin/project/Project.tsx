import ButtonComp from "@/components/general/ButtonComp";
import FilterLayout from "@/components/general/FilterLayout";
import Container from "@/components/layout/Container";
import ProjectListCard from "@/components/projects/ProjectListCard";
import { PageTypes } from "@/utils";

const Project = () => {
  const pageKey = PageTypes.PROJECTS;
  return (
    <div>
      <section className="flex justify-between items-center mb-5">
        <h3 className="text-grey font-extrabold sm:text-2xl text-lg">
          Projects List
        </h3>
        <ButtonComp text="Add New Project" className="w-fit" />
      </section>
      <Container>
        <FilterLayout pageKey={pageKey} />
        <div>
          <ProjectListCard />
          <ProjectListCard />
          <ProjectListCard />
        </div>
      </Container>
    </div>
  );
};

export default Project;
