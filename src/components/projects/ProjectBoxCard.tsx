// import bugetIcon from "@/assets/images/bugetIcon.svg";
import { DetailItemType } from "@/pages/admin/project/ProjectDetails";
import { Link } from "react-router-dom";
const ProjectBoxCard = ({ items }: { items: DetailItemType }) => {
  return (
    <Link to={items?.link} className="h-[120px] cursor-pointer shadow-projectShadow w-[150px] flex flex-col justify-center items-center">
      <img src={items?.image} alt="icon" className=""/>
      <p className="text-[#2D2C2CBD] text-xs font-bold text-center mt-4">
        {items?.title}
      </p>
    </Link>
  );
};

export default ProjectBoxCard;
