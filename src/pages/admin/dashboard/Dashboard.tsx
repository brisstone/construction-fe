import ActivityChart from "@/components/dashboard/ActivityChart";
import CategoryPieChart from "@/components/dashboard/CategoryPieChart";
import DetailCard from "@/components/dashboard/DetailCard";
import PdfDownload from "@/components/dashboard/PdfDownload";
import ProjectStatCard, {
  ProjectStatCardProps,
} from "@/components/dashboard/ProjectStatCard";

const StatData: ProjectStatCardProps[] = [
  {
    label: "Projects",
    value: 15,
    change: 3,
  },
  {
    label: "New Payments",
    value: 5,
    change: 3,
  },
  {
    label: "Properties",
    value: 35,
    change: 3,
  },
  {
    label: "Constructions",
    value: 8,
    change: 3,
  },
];

const timelineData = [
  {
    date: "20 Oct",
    events: [
      { time: "17:05", detail: "New request has been created" },
      { time: "15:45", detail: "A new payment has been made" },
      { time: "13:22", detail: "A new request has been created" },
      { time: "12:13", detail: "A new work order has been generated" },
    ],
  },
  {
    date: "19 Oct",
    events: [
      { time: "16:22", detail: "New report has been sent" },
      { time: "13:45", detail: "A new payment has been made" },
      { time: "13:45", detail: "New work order has been sent" },
      { time: "13:45", detail: "A new request has been created" },
    ],
  },
];

const Dashboard = () => {
  return (
    <div className="">
      <h3 className="text-grey font-extrabold sm:text-2xl text-lg">
        Dashboard
      </h3>
      <main className=" my-4">
        <div className="grid lg:grid-cols-4 grid-cols-2 gap-4 mb-4">
          {StatData?.map((item: ProjectStatCardProps) => {
            return <ProjectStatCard StatData={item} />;
          })}
        </div>
        <section className="">
          <aside className="grid sm:grid-cols-2 gap-4 mb-4">
            <div>
              <ActivityChart />
            </div>
            <div>
              <CategoryPieChart />
            </div>
          </aside>
          <div className="grid sm:grid-cols-3 gap-4">
            <DetailCard title="Management Reports Generated">
              <PdfDownload download />
            </DetailCard>
            <DetailCard title="Last Work Orders Sent">
              <PdfDownload />
            </DetailCard>
            <DetailCard title="Management Reports Generated">
              <div className="">
                {timelineData.map((day, index) => (
                  <div
                    key={index}
                    className="mt-2 first:mt-0 border-b last:border-none flex justify-between"
                  >
                    <h2 className="font-bold text-xs pb-1">{day.date}</h2>
                    <ul className="w-[80%]">
                      {day.events.map((event, eventIndex) => (
                        <li
                          key={eventIndex}
                          className="flex justify-between py-1 text-xs mb-1 "
                        >
                          <span className="text-wrap w-10/12">{event.detail}</span>
                          <span className="">{event.time}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </DetailCard>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
