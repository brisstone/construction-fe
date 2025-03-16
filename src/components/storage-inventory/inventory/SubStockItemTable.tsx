import GenericTable from "@/components/general/GenericTable";
import { LucideDelete } from "lucide-react";
import { useNavigate } from "react-router-dom";

export type SubStockItem = {
  id: number;
  item: string;
  category: string;
  quantity: number;
  date: string;
};

const SubStockItemTable = ({
  data,
  addingItem,
  handleDeleteItem,
}: {
  data: SubStockItem[];
  addingItem?: boolean;
  handleDeleteItem?: (value: number) => void;
}) => {
  const headers = [
    { content: <>ID</> },
    { content: <>Item</> },
    { content: <>Category</> },
    { content: <>Qty </> },
    { content: <>Date </> },
    { content: <></> },
  ];

  if (data && data.length <= 0) {
    return <div className="text-center my-5">No data added/ available</div>;
  }

  const navigate = useNavigate();
  const renderRow = (item: SubStockItem, index: number) => {
    return (
      <tr
        onClick={() => navigate("/admin/requistion-detail")}
        key={index}
        className="text-gray-700 text-sm h-[50px] border-b cursor-pointer"
      >
        <td className="py-2 px-4">{item.id}</td>
        <td className="py-2 px-4">{item.item}</td>
        <td className="py-2 px-4">{item.category}</td>
        <td className="py-2 px-4">{item.quantity}</td>
        <td className="py-2 px-4">{item.date}</td>
        {addingItem && (
          <td
            onClick={(e) => {
              e.stopPropagation(); // Prevent navigation when clicking delete
              handleDeleteItem && handleDeleteItem(item.id);
            }}
            className="py-2 px-4 cursor-pointer"
          >
            <LucideDelete />
          </td>
        )}
      </tr>
    );
  };

  return (
    <div>
      <GenericTable
        headers={headers}
        data={data}
        renderRow={renderRow}
        className=""
      />
    </div>
  );
};

export default SubStockItemTable;
