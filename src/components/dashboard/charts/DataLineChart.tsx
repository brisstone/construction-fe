import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { day: "Jan", Present: 400, Absent: 800 },
  { day: "Feb", Present: 200, Absent: 300 },
  { day: "Mar", Present: 600, Absent: 400 },
  { day: "Apr", Present: 300, Absent: 500 },
  { day: "May", Present: 500, Absent: 400 },
  { day: "Jun", Present: 400, Absent: 600 },
  { day: "July", Present: 400, Absent: 600 },
  { day: "Aug", Present: 200, Absent: 200 },
  { day: "Sept", Present: 130, Absent: 100 },
  { day: "Oct", Present: 720, Absent: 900 },
  { day: "Nov", Present: 70, Absent: 400 },
  { day: "Dec", Present: 330, Absent: 300 },
];

const DataLineChart = () => {
  return (
    <ResponsiveContainer height={200} width="100%">
      <LineChart
        data={data}
        margin={{ top: 20, right: 20, left: 0, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="day"
          tick={{ fill: "#A0A0A0", fontSize: "12" }}
          stroke="none"
        />
        <YAxis stroke="none" tick={{ fill: "#A0A0A0", fontSize: "12" }} />
        <Tooltip />

        {/* Green Line for Present */}
        <Line
          type="monotone"
          dataKey="Present"
          stroke="green"
          strokeWidth={3}
          dot={{ fill: "white", stroke: "#8CDEF6", strokeWidth: 2, r: 5 }}
        />

        {/* Red Line for Absent */}
        <Line
          type="monotone"
          dataKey="Absent"
          stroke="red"
          strokeWidth={3}
          dot={{ fill: "white", stroke: "red", strokeWidth: 2, r: 5 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default DataLineChart;
