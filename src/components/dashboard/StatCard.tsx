export interface StatCardProps {
  label: string;
  value: string;
}

const StatCard = ({ StatData }: { StatData: StatCardProps }) => {
  return (
    <div className=" p-3 rounded-xl bg-white">
      <p className="text-xs font-medium text-darkGrey">{StatData.label}</p>
      <h3 className="text-2xl font-bold my-2">{StatData.value}</h3>
      
    </div>
  );
};

export default StatCard;
