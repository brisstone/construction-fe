export interface StatCardProps {
  label: string;
  value: number;
  change?: number;
}

const StatCard = ({ StatData }: { StatData: StatCardProps }) => {
  return (
    <div className="border border-borderColor p-3 rounded-xl">
      <p className="text-xs font-medium">{StatData.label}</p>
      <h3 className="text-3xl font-extrabold my-4">{StatData.value}</h3>
      {StatData.change !== undefined && (
        <p className="font-medium text-xs">
          <span
            className={`font-semibold ${
              StatData.change >= 0 ? "text-green" : "text-red-500"
            }`}
          >
            {StatData.change > 0 ? `+${StatData.change}` : StatData.change}
          </span>{" "}
          vs yesterday
        </p>
      )}
    </div>
  );
};

export default StatCard;
