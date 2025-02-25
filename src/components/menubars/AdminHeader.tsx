import { NotificationIcon } from "@/assets/svgComp/SidebarIcon";
import { MenuIcon } from "lucide-react";
import SearchInputComp from "../input/SearchInputComp";

interface AdminHeaderProps {
  toggleSidebar: () => void;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ toggleSidebar }) => {
  return (
    <div className="bg-white py-2 px-5 flex items-center justify-between border-b">
      <button onClick={toggleSidebar} className="lg:hidden">
        <MenuIcon />
      </button>
      <div className="w-1/2">
        <SearchInputComp
          pageKey=""
          placeholder="Search here..."
          className="bg-[#F9FAFB] w-full"
        />
      </div>

      <div className="flex gap-2 items-center">
        <NotificationIcon className="cursor-pointer" />
      </div>
    </div>
  );
};

export default AdminHeader;
