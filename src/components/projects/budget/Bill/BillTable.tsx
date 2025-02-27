import GenericTable from "@/components/general/GenericTable";
import ReusableDialog from "@/components/general/ReuseableDialog";
import { useState } from "react";
import SubBillTable from "./SubBillTable";
export type DataItem = {
  _id: string;
  item?: string;
  description?: string;
  amount?: number;
};

const sampleData: DataItem[] = [
  {
    _id: "1",
    item: "A",
    description: "Substructure",
    amount: 1000000,
  },
  {
    _id: "2",
    item: "B",
    description: "Upper Floor",
    amount: 1000000,
  },
  {
    _id: "3",
    item: "C",
    description: "Frame",
    amount: 1000000,
  },
];

const BillTable = () => {
  const headers = [
    { content: <>Item</> },
    { content: <>Description</> },
    { content: <>Amount(#)</> },
  ];

  const [selectedRow, setSelectedRow] = useState<DataItem | null>(null);

  const renderRow = (item: DataItem, index: number) => {

    const handleRowClick = (row: DataItem) => {
      setSelectedRow(row);
    };
    return (
      <tr
      onClick={() => handleRowClick(item)}
        key={index}
        className=" w-full text-grey text-[13px] text-left text-sm h-[60px]  font-medium cursor-pointer"
      >
        <td className="py-1 px-4">{item?.item}</td> 

        <td  className="py-1 px-4 "> {item?.description}</td>

        <td className="py-1 px-4">{item?.amount?.toLocaleString()}</td>
      </tr>
      
    );
  };

  // (undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}

  const TotalValue = sampleData.reduce(
    (acc, item) => acc + (item.amount || 0),
    0
  );

  return (
    <div>
      <GenericTable
        headers={headers}
        data={sampleData}
        renderRow={renderRow}
        className=""
      />
      <div className="p-4  grid grid-cols-3 border-borderColor border ">
        <p className="font-semibold">Summary Total</p>
        <p></p>
        <p className="font-semibold -ml-4">{TotalValue?.toLocaleString()}</p>
      </div>
      {
        <ReusableDialog
          title={selectedRow?.description ?? "Header"}
          open={selectedRow !== null}
          onOpenChange={(open) => {
            if (!open) setSelectedRow(null);
          }}
          className="sm:max-w-[70vw] !px-0"
        >
          {selectedRow && (
            <SubBillTable selectedRow={selectedRow}/>
          )}
        </ReusableDialog>
      }
    </div>
  );
};

export default BillTable;
