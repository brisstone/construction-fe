import RouteChain from "@/components/general/RouteChain";
import ProjectBoxCard from "@/components/projects/ProjectBoxCard";
import bugetIcon from "@/assets/images/bugetIcon.svg";
import paymentSchedule from "@/assets/images/paymentSchedule.svg";
import houseicon from "@/assets/images/houseicon.svg";
import tasksIcon from "@/assets/images/tasksIcon.svg";
import materialIcon from "@/assets/images/materialIcon.svg";
import teamIcon from "@/assets/images/teamIcon.svg";
import docIcon from "@/assets/images/docIcon.svg";
import dailyLogsIcon from "@/assets/images/dailyLogsIcon.svg";
import equipmentIcon from "@/assets/images/equipmentIcon.svg";
import observeIcon from "@/assets/images/observeIcon.svg";
import dailyReportIcon from "@/assets/images/dailyReportIcon.svg";
import safetyIcon from "@/assets/images/safetyIcon.svg";

export type DetailItemType = {
  title: string;
  image: string;
  link: string;
};
const ProjectDetails = () => {
  const DetailItems: DetailItemType[] = [
    { title: "Budget & Planning", image: bugetIcon, link: "/admin/project-detail/budget" },
    { title: "Payment Schedule", image: paymentSchedule, link: "/admin/project-detail/payment-schedule" },
    { title: "Properties", image: houseicon, link: "/admin/project-detail/properties" },
    { title: "Tasks", image: tasksIcon, link: "/admin/project-detail/tasks" },
    { title: "Materials", image: materialIcon, link: "/admin/project-detail/materials" },
    { title: "Project Team", image: teamIcon, link: "/admin/project-detail/project-team" },
    { title: "Documents", image: docIcon, link: "/admin/project-detail/documents" },
    { title: "Daily Logs", image: dailyLogsIcon, link: "/admin/project-detail/daily-logs" },
    { title: "Equipments", image: equipmentIcon, link: "/admin/project-detail/equipments" },
    { title: "Observations", image: observeIcon, link: "/admin/project-detail/observations" },
    { title: "Daily Report", image: dailyReportIcon, link: "/admin/project-detail/daily-report" },
    { title: "Safety", image: safetyIcon, link: "/admin/project-detail/safety" },
  ];

  return (
    <div>
      <RouteChain routeOne="Projects" routeTwo="Mabushi Project" />
      <section className="w-10/12 mx-auto my-10 grid grid-cols-2 gap-y-12 md:grid-cols-4">
        {DetailItems?.map((item, index) => (
          <ProjectBoxCard key={index} items={item} />
        ))}
      </section>
    </div>
  );
};

export default ProjectDetails;
