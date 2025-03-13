import GenericTable from "@/components/general/GenericTable";
import { useNavigate } from "react-router-dom";

export type ReqItem = {
  id: number;
  rqn: string;
  requestType: string;
  dept: string;
  priority: string;
  amount: string;
  date: string;
  status: string;
};

const sampleData: ReqItem[] = [
  {
    id: 1,
    rqn: "TRN2345",
    requestType: "Purchase",
    dept: "Procurement",
    priority: "low",
    amount: "317,125",
    date: "20/01/2022",
    status: "Pending",
  },
  {
    id: 1,
    rqn: "TRN2345",
    requestType: "Purchase",
    dept: "Admin",
    priority: "medium",
    amount: "317,125",
    date: "20/01/2022",
    status: "Finalized",
  },
  {
    id: 1,
    rqn: "TRN2345",
    requestType: "Purchase",
    dept: "Admin",
    priority: "high",
    amount: "317,125",
    date: "20/01/2022",
    status: "LPO Generated",
  },
];

const MainReqTable = () => {
  const headers = [
    { content: <>RQN No</> },
    { content: <>Request Type</> },
    { content: <>Dept </> },
    { content: <>Priority</> },
    { content: <>Amount(₦)</> },
    { content: <>Date </> },
    { content: <>Status</> },
  ];

  const renderRow = (data: ReqItem, index: number) => {
    const navigate = useNavigate();

    return (
      <tr
        onClick={() => navigate("/admin/requistion-detail")}
        key={index}
        className="text-gray-700 text-sm h-[50px] border-b cursor-pointer"
      >
        <td className="py-2 px-4">{data.rqn}</td>
        <td className="py-2 px-4">{data.requestType}</td>
        <td className="py-2 px-4">{data.dept}</td>
        <td className="py-2 px-4 ">
          <p className="flex items-center border border-[#D5D7DA] px-[3px] rounded-[4px] w-fit">
            <div
              className={`w-2 h-2 rounded-full mr-2 ${
                data.priority === "low"
                  ? "bg-[#1FC16B]"
                  : data.priority === "medium"
                  ? "bg-[#FF8447]"
                  : "bg-red-500"
              }`}
            />
            {data.priority}
          </p>
        </td>
        <td className="py-2 px-4">{data.amount}</td>
        <td className="py-2 px-4">{data.date}</td>
        <td className="py-2 px-4">{data.status}</td>
      </tr>
    );
  };

  return (
    <div>
      <GenericTable
        headers={headers}
        data={sampleData}
        renderRow={renderRow}
        className=""
      />
    </div>
  );
};

export default MainReqTable;
