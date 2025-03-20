import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "@/assets/Logo.svg";

// import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ReactNode } from "react";
import { DashboardIcon, LogoutIcon } from "@/assets/svgComp/SidebarIcon";
import { useSidebarStore } from "@/store/SidebarStore";
import { useAuthStore } from "@/store/authStore";
import { toast } from "sonner";

type SidebarItem = {
  name: string;
  link: string;
  icon?: ReactNode;
};

const sidebarItems: SidebarItem[] = [
  {
    name: "Company",
    link: "/super-admin",
    icon: <DashboardIcon />,
  },
];

const SuperAdminSidebar = () => {
  const { closeSidebar } = useSidebarStore();

  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/");
  };

  return (
    <div className="relative h-[95vh] px-2">
      <Link to={""}>
        <div className="py-10 flex">
          <img src={Logo} alt="logo" width={"60%"} />
        </div>
      </Link>

      <main className="">
        {sidebarItems.map((item, index) => {
          const isActive = location.pathname === item.link;
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

      <div className="absolute bottom-0">
        <div className="cursor-pointer" onClick={handleLogout}>
          <LogoutIcon />
        </div>
      </div>

      {/* <div className="absolute bottom-0">
        <div className="flex items-center gap-10">
          <aside className="flex items-center gap-2">
            <Avatar className="bg-disabledText h-[35px] w-[35px] rounded-[100px] bg-lightPink">
              <AvatarFallback className="font-bold text-base bg-disabledText">
                SA
              </AvatarFallback>
            </Avatar>
            <div className="text-xs">
              <h5 className="font-semibold text-Navyblue">Super</h5>
              <p className="text-lightBlueGrey">"dd@gmail.com"</p>
            </div>
          </aside>
          <div className="">
            <div className="cursor-pointer">
              <LogoutIcon />
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default SuperAdminSidebar;
