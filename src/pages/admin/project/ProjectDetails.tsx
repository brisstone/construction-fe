import RouteChain from "@/components/general/RouteChain";
import ProjectBoxCard from "@/components/projects/ProjectBoxCard";
// import bugetIcon from "@/assets/images/bugetIcon.svg";
// import paymentSchedule from "@/assets/images/paymentSchedule.svg";
// import houseicon from "@/assets/images/houseicon.svg";
// import tasksIcon from "@/assets/images/tasksIcon.svg";
// import materialIcon from "@/assets/images/materialIcon.svg";
// import teamIcon from "@/assets/images/teamIcon.svg";
// import docIcon from "@/assets/images/docIcon.svg";
// import dailyLogsIcon from "@/assets/images/dailyLogsIcon.svg";
// import equipmentIcon from "@/assets/images/equipmentIcon.svg";
// import observeIcon from "@/assets/images/observeIcon.svg";
// import dailyReportIcon from "@/assets/images/dailyReportIcon.svg";
// import safetyIcon from "@/assets/images/safetyIcon.svg";
import { useParams } from "react-router-dom";
import usegetProjectById from "@/hooks/api/queries/projects/getProjectById";
import {
  BudgetIcon,
  documentIcon,
  logsIcon,
  materialIcon,
  paymentIcon,
  propertyIcon,
  reportIcon,
  safetyIcon,
  searchIcon,
  settingsIcon,
  taskIcon,
  teamsIcon,
} from "@/components/ui/ColoredIcon";

// import budgetReportIcon from "@/assets/images/actions/billing_icon.svg";
// import BudgetIcon from "@/assets/images/actions/billing_icon.svg";
// import paymentIcon from "@/assets/images/actions/payments_icon.svg";
// import propertyIcon from "@/assets/images/actions/property_icon.svg";
// import taskIcon from "@/assets/images/actions/task_icon.svg";
// import materialIcon from "@/assets/images/actions/material_icon.svg";
// import projectIcon from "@/assets/images/actions/project_icon.svg";
// import documentIcon from "@/assets/images/actions/document_icon.svg";
// import settingsIcon from "@/assets/images/actions/settings_icon.svg";
// import searchIcon from "@/assets/images/actions/search_icon.svg";
// import reportIcon from "@/assets/images/actions/report_icon.svg";
// import safetyIcon from "@/assets/images/actions/safety_icon.svg";
// import logsIcon from "@/assets/images/actions/log_icons.svg";
// import teamsIcon from "@/assets/images/actions/team_2.svg";
// import { CameraIcon } from "lucide-react";

export type DetailItemType = {
  title: string;
  image: any;
  link: string;
};
const ProjectDetails = () => {
  const { id } = useParams<{ id: string }>();

  const { data: project } = usegetProjectById(id ?? "");

  const DetailItems: DetailItemType[] = [
    {
      title: "Budget & Planning",
      image: BudgetIcon,
      link: `/admin/project/${id}/budget`,
    },
    {
      title: "Payment Schedule",
      image: paymentIcon,
      link: `/admin/project/${id}/payment-schedule`,
    },

    {
      title: "Properties",
      image: propertyIcon,
      link: `/admin/project/${id}/properties`,
    },
    { title: "Tasks", image: taskIcon, link: `/admin/project/${id}/tasks` },

    {
      title: "Materials",
      image: materialIcon,
      link: `/admin/project/${id}/materials`,
    },
    {
      title: "Project Team",
      image: teamsIcon,
      link: `/admin/project/${id}/project-team`,
    },
    {
      title: "Documents",
      image: documentIcon,
      link: `/admin/project/${id}/documents`,
    },
    {
      title: "Daily Logs",
      image: logsIcon,
      link: `/admin/project/${id}/daily-logs`,
    },
    {
      title: "Equipments",
      image: settingsIcon,
      link: `/admin/project/${id}/equipments`,
    },
    {
      title: "Observations",
      image: searchIcon,
      link: `/admin/project/${id}/observations`,
    },
    {
      title: "Daily Report",
      image: reportIcon,
      link: `/admin/project/${id}/daily-report`,
    },
    { title: "Safety", image: safetyIcon, link: `/admin/project/${id}/safety` },
  ];

  return (
    <div>
      <RouteChain routeOne="Projects" routeTwo={`${project?.name}`} />
      <section
        // style={{border: '1px solid red'}}
        // className="w-10/12 mx-auto my-10 grid grid-cols-2 gap-y-12 md:grid-cols-4"
        className="w-10/12 mx-auto my-10 flex flex flex-wrap gap-2 justify-between gap-4"
      >
        {DetailItems?.map((item, index) => (
          <ProjectBoxCard key={index} items={item} />
        ))}
      </section>
    </div>
  );
};

export default ProjectDetails;
