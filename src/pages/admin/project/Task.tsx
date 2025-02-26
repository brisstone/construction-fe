import ButtonComp from "@/components/general/ButtonComp";
import FilterLayout from "@/components/general/FilterLayout";
import Pagination from "@/components/general/Pagination";
import RouteChain from "@/components/general/RouteChain";
import Container from "@/components/layout/Container";
import TaskTable from "@/components/projects/Tasks/TaskTable";
import { PageTypes } from "@/utils";

const Task = () => {
  const pageKey = PageTypes.PROJECTS;
  return (
    <div>
      <RouteChain
        routeOne="Projects"
        routeTwo="Mabushi Project"
        routeThree="Task Management"
      />
      <Container className="my-5">
        <aside className="sm:flex items-center justify-between">
          <p className="font-medium sm:text-lg text-sm text-textShade">
            Mabushi Project Task Management
          </p>
          <ButtonComp text="Assign New Task" className="w-fit mt-1 sm:mt-0" />
        </aside>
        <FilterLayout pageKey={pageKey} />
        <TaskTable />
        <Pagination/>
      </Container>
    </div>
  );
};

export default Task;
