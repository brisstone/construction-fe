import GenericTable from "@/components/general/GenericTable";
import ReusableDialog from "@/components/general/ReuseableDialog";
import { useState } from "react";
import SubBillTable from "./SubBillTable";
import { WorkStageType } from "@/hooks/api/queries/projects/budget/workStage/getWorkStage";
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

const BillTable = ({
  workStageDataAll,
}: {
  workStageDataAll: WorkStageType[];
}) => {
  const headers = [
    { content: <>Item</> },
    { content: <>Description</> },
    { content: <>Amount(#)</> },
  ];

  const [selectedRow, setSelectedRow] = useState<WorkStageType | null>(null);

  const tableData = workStageDataAll.map((workStage, index) => {
    // Calculate total amount for this workstage
    const laborTotal = workStage.projectLabors.reduce(
      (sum, labor) => sum + labor.quantity * labor.rate,
      0
    );

    const materialTotal = workStage.projectMaterials.reduce(
      (sum, material) => sum + material.quantity * material.rate,
      0
    );

    const activityTotal = workStage.projectActivities.reduce(
      (sum, activity) => sum + (activity.quantity || 0) * (activity.rate || 0),
      0
    );

    const totalAmount = laborTotal + materialTotal + activityTotal;

    // Generate item identifier based on index (A, B, C, ...)
    const itemIdentifier = String.fromCharCode(65 + index);

    return {
      ...workStage,
      displayItem: itemIdentifier,
      displayAmount: totalAmount,
    };
  });


   const renderRow = (
     item: WorkStageType & { displayItem: string; displayAmount: number },
     index: number
   ) => {
     return (
       <tr
         onClick={() => setSelectedRow(item)}
         key={index}
         className="w-full text-grey text-[13px] text-left text-sm h-[60px] font-medium cursor-pointer"
       >
         <td className="py-1 px-4">{item.displayItem}</td>
         <td className="py-1 px-4">{item.stageType}</td>
         <td className="py-1 px-4">{item.displayAmount.toLocaleString()}</td>
       </tr>
     );
   };

  // (undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}

 const totalValue = tableData.reduce(
   (acc, item) => acc + item.displayAmount,
   0
 );

  return (
    <div>
      <GenericTable
        headers={headers}
        data={tableData}
        renderRow={renderRow}
        className=""
      />
      <div className="p-4  grid grid-cols-3 border-borderColor border ">
        <p className="font-semibold">Summary Total</p>
        <p></p>
        <p className="font-semibold -ml-4">{totalValue?.toLocaleString()}</p>
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
          {selectedRow && <SubBillTable selectedRow={selectedRow} />}
        </ReusableDialog>
      }
    </div>
  );
};

export default BillTable;
