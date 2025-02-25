export interface ProjectStatCardProps {
  label: string;
  value: number;
  change?: number;
}

const ProjectStatCard = ({ StatData }: { StatData: ProjectStatCardProps }) => {
  return (
    <div className="border border-borderColor bg-white p-3 rounded-[4px]">
      <p className="text-xs font-medium">{StatData.label}</p>
      <div className="flex items-center justify-between my-2">
        <h3 className="text-3xl font-extrabold opacity-45">{StatData.value}</h3>
        <hr className="w-2 h-10 bg-lightGrey" />
        <div>
          <p className="font-medium text-xs text-deepBlue">
            03 <span className="text-textGrey ml-2">Completed</span>
          </p>
          <p className="font-medium text-xs text-deepBlue">
            05 <span className="text-textGrey ml-2">Ongoing</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProjectStatCard;
