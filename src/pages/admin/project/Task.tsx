// import ButtonComp from "@/components/general/ButtonComp";
import FilterLayout from "@/components/general/FilterLayout";
import Pagination from "@/components/general/Pagination";
import RouteChain from "@/components/general/RouteChain";
import Container from "@/components/layout/Container";
import TaskTable from "@/components/projects/Tasks/TaskTable";
import useGetTasksActivity from "@/hooks/api/queries/tasks/getTasksActivity";
import { PageTypes } from "@/utils";
import { useParams } from "react-router-dom";

const Task = () => {
  const pageKey = PageTypes.PROJECTS;

  const { id } = useParams();

  const { data: taskActivity, isPending } = useGetTasksActivity(id ?? "");

  const taskActivityData = taskActivity?.data;

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
            Project Task Management
          </p>
          {/* <ButtonComp
            onClick={() => setOpenTask(true)}
            text="Assign New Task"
            className="w-fit mt-1 sm:mt-0"
          /> */}
        </aside>
        <FilterLayout pageKey={pageKey} />
        {isPending ? (
          <div className="text-center">Loading...</div>
        ) : (
          <TaskTable taskActivity={taskActivityData ?? []} />
        )}
        <Pagination />
      </Container>
    </div>
  );
};

export default Task;
