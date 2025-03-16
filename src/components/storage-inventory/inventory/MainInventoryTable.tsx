import GenericTable from "@/components/general/GenericTable";
import { useNavigate } from "react-router-dom";

export type ReqItem = {
  id: number;
  desc: string;
  category: string;
  qty: string;
  reason: string;
  date: string;
  approvedBy: string;
};

const sampleData: ReqItem[] = [
  {
    id: 1,
    desc: "3x Super bag",
    category: "Cement ",
    qty: "100",
    reason: "Request from Site 2",
    date: "20/01/2022",
    approvedBy: "Moses Abu",
  },
  {
    id: 1,
    desc: "1’ Aggregates",
    category: "Stones ",
    qty: "20",
    reason: "Request from Site 3",
    date: "20/01/2022",
    approvedBy: "Moses Abu",
  },
  {
    id: 1,
    desc: "POP",
    category: "Cement ",
    qty: "80",
    reason: "Out of stock",
    date: "20/01/2022",
    approvedBy: "Moses Abu",
  },
];

const MainInventoryTable = () => {
  const headers = [
    { content: <>Description</> },
    { content: <>Category</> },
    { content: <>Qty Request </> },
    { content: <>Reason for request</> },
    { content: <>Approved by</> },
    { content: <>Date of request </> },
  ];

  const renderRow = (data: ReqItem, index: number) => {
    const navigate = useNavigate();

    return (
      <tr
        onClick={() => navigate("/admin/inventory-detail")}
        key={index}
        className="text-gray-700 text-sm h-[50px] border-b cursor-pointer"
      >
        <td className="py-2 px-4">{data.desc}</td>
        <td className="py-2 px-4">{data.category}</td>
        <td className="py-2 px-4">{data.qty}</td>
        <td className="py-2 px-4">{data.reason}</td>
        <td className="py-2 px-4">{data.date}</td>
        <td className="py-2 px-4">{data.approvedBy}</td>
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

export default MainInventoryTable;
