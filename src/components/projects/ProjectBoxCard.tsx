import { DetailItemType } from "@/pages/admin/project/ProjectDetails";
import { Link } from "react-router-dom";

const ProjectBoxCard = ({ items }: { items: DetailItemType }) => {
  const Icon = items?.image;

  return (
    <Link
      to={items.link}
      style={{ borderRadius: "8px" }}
      className="h-[180px] w-[207px] rounded-lg bg-[#ffffff] flex flex-col justify-center items-center"
    >
      <Icon color={"text-deepBlue"} />
      <p className="text-[#2D2C2CBD] text-xs font-bold text-center mt-4">
        {items.title}
      </p>
    </Link>
  );
};

export default ProjectBoxCard;
