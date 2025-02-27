import { Link, useLocation } from "react-router-dom";
import Logo from "@/assets/Logo.svg";
import { ReactNode } from "react";
import {
  DashboardIcon,
  ProjectIcon,
  SettingsIcon,
  StaffIcon,
} from "@/assets/svgComp/SidebarIcon";
import { useSidebarStore } from "@/store/SidebarStore";

type SidebarItem = {
  name: string;
  link: string;
  icon?: ReactNode;
};

const sidebarItems: SidebarItem[] = [
  {
    name: "Dashboard",
    link: "/admin/dashboard",
    icon: <DashboardIcon />,
  },
  {
    name: "Projects",
    link: "/admin/project",
    icon: <ProjectIcon />,
  },
  {
    name: "Users",
    link: "/admin/users",
    icon: <StaffIcon />,
  },
  {
    name: "Clients",
    link: "/admin/clients",
    icon: <StaffIcon />,
  },
  {
    name: "Settings",
    link: "/admin/settings",
    icon: <SettingsIcon />,
  },
];

const Sidebar = () => {
  const { closeSidebar } = useSidebarStore();
  const location = useLocation();

  // console.log(location.pathname);
  return (
    <div className="relative h-[95vh] px-2">
      <Link to={"/"}>
        <div className="py-10">
          <img src={Logo} alt="logo" />
        </div>
      </Link>

      <main className="">
        {sidebarItems.map((item, index) => {
          const isActive = location.pathname?.includes(
            item.link?.split("/")[2]
          );
          // const isDashbaordActive = location.pathname === "/admin/dashboard";
          // console.log(item.link?.split("/")[2])
          return (
            <div key={index}>
              <Link
                to={item.link}
                onClick={closeSidebar}
                className={`flex items-center justify-between h-[45px] rounded-[4px] ${
                  isActive
                    ? " text-deepBlue bg-fadedBlue"
                    : "hover:text-deepBlue text-grey "
                }`}
              >
                <div className="flex gap-3 ml-5 items-center">
                  {item.icon}
                  <p
                    className={`text-xs font-medium ${
                      isActive
                        ? "text-deepBlue font-semibold"
                        : "text-lightBlueGrey hover:text-deepBlue"
                    } `}
                  >
                    {item.name}
                  </p>
                </div>
              </Link>
            </div>
          );
        })}
      </main>
    </div>
  );
};

export default Sidebar;
