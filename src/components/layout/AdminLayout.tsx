import { Outlet } from "react-router-dom";
import Sidebar from "../menubars/Sidebar";
import AdminHeader from "../menubars/AdminHeader";
import { useSidebarStore } from "@/store/SidebarStore";

const AdminLayout = () => {
  const { isSidebarOpen, toggleSidebar, closeSidebar } = useSidebarStore();

  return (
    <div className="flex relative justify-between">
      {/* Sidebar */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="bg-white w-[70%] max-w-sm h-full border-r border-borderColor transition-all duration-300"
            onClick={(e) => e.stopPropagation()} 
          >
            <Sidebar />
          </div>

          {/* Backdrop */}
          <div
            className="flex-1 bg-black bg-opacity-50"
            onClick={closeSidebar} 
          />
        </div>
      )}

      {/* Sidebar for Large Screens */}
      <div className="hidden lg:block lg:w-[18%] bg-white border border-l border-borderColor">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div
        className={` transition-all duration-300 ${
          isSidebarOpen ? "lg:w-[82%] w-full" : "lg:w-[82%] w-full"
        }`}
      >
        <AdminHeader toggleSidebar={toggleSidebar} />
        <div className="h-[calc(100vh-58px)] overflow-y-auto scrollbar-hidden p-6 bg-white">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
