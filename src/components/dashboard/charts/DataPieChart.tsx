import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Katampe Main Phase 1&2", value: 10, color: "green" },
  { name: "Guzape Phase 2", value: 8, color: "gray" },
  { name: "Mabushi", value: 1, color: "skyblue" },
  { name: "Garki", value: 6, color: "red" },
];

const totalProperties = data.reduce((sum, item) => sum + item.value, 0);

const PropertyPieChart = () => {
  return (
    <div className="md:flex items-center md:space-x-6">
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            dataKey="value"
            paddingAngle={2}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>

          <Tooltip />

          {/* Centered Text */}
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="12"
            fontWeight="semibold"
          >
            Total Properties
          </text>

          <text
            x="50%"
            y="58%"
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="16"
            fontWeight="bold"
          >
            {totalProperties}
          </text>
        </PieChart>
      </ResponsiveContainer>
      {/* Legend Table */}
      <div className="border border-gray-300 rounded-md p-3">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2">Property/Location</th>
              <th className="text-right p-2">Available</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index} className="border-b">
                <td className="flex text-[10px] items-center space-x-2 p-2">
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  ></span>
                  <span>{item.name}</span>
                </td>
                <td className="text-right text-[10px] p-2">{item.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PropertyPieChart;
