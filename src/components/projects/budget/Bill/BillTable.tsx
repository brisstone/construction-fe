import GenericTable from "@/components/general/GenericTable";
import ReusableDialog from "@/components/general/ReuseableDialog";
import { useMemo, useState } from "react";
import SubBillTable from "./SubBillTable";
import { WorkStageType } from "@/hooks/api/queries/projects/budget/workStage/getWorkStage";
import { formatNumberWithCommaDecimal } from "@/utils";

type GroupedStage = {
  stageType: string;
  displayItem: string;
  displayAmount: number;
  labors: any[];
  materials: any[];
  activities: any[];
};

const BillTable = ({
  workStageDataAll,
}: {
  workStageDataAll: WorkStageType[];
}) => {
  const headers = [
    { content: <>Item</> },
    { content: <>Stage Type</> },
    { content: <>Amount (₦)</> },
  ];

  const [selectedRow, setSelectedRow] = useState<GroupedStage | null>(null);

  const groupedData = useMemo(() => {
    const groupedMap = new Map<string, GroupedStage>();

    workStageDataAll.forEach((stage) => {
      const key = stage.stageType || "unknown";

      const laborTotal = stage.projectLabors?.reduce(
        (sum, l) => sum + (l.quantity ?? 0) * (l.rate ?? 0),
        0
      );

      const materialTotal = stage.projectMaterials?.reduce(
        (sum, m) => sum + (m.quantity ?? 0) * (m.rate ?? 0),
        0
      );

      const activityTotal = stage.projectActivities?.reduce(
        (sum, a) => sum + (a.quantity ?? 0) * (a.rate ?? 0),
        0
      );

      if (!groupedMap.has(key)) {
        groupedMap.set(key, {
          stageType: key,
          displayItem: "",
          displayAmount: 0,
          labors: [],
          materials: [],
          activities: [],
        });
      }

      const existing = groupedMap.get(key)!;
      existing.displayAmount += laborTotal + materialTotal + activityTotal;
      existing.labors.push(...stage.projectLabors);
      existing.materials.push(...stage.projectMaterials);
      existing.activities.push(...stage.projectActivities);
    });

    return Array.from(groupedMap.values()).map((item, index) => ({
      ...item,
      displayItem: String.fromCharCode(65 + index),
    }));
  }, [workStageDataAll]);

  const renderRow = (item: GroupedStage, index: number) => (
    <tr
      onClick={() => setSelectedRow(item)}
      key={index}
      className="w-full text-grey text-[13px] text-left text-sm h-[60px] font-medium cursor-pointer"
    >
      <td className="py-1 px-4">{item.displayItem}</td>
      <td className="py-1 px-4 capitalize">
        {item.stageType?.replace("_", " ")}
      </td>
      <td className="py-1 px-4">
        {formatNumberWithCommaDecimal(item.displayAmount)}
      </td>
    </tr>
  );

  const totalValue = groupedData.reduce(
    (acc, item) => acc + item.displayAmount,
    0
  );

  console.log(groupedData, "groupedData___groupedData");

  return (
    <div>
      <GenericTable
        headers={headers}
        data={groupedData}
        renderRow={renderRow}
      />
      <div className="p-4 grid grid-cols-3 border-borderColor border">
        <p className="font-semibold">Summary Total</p>
        <p></p>
        <p className="font-semibold -ml-4">
          {formatNumberWithCommaDecimal(totalValue)}
        </p>
      </div>

      <ReusableDialog
        title={selectedRow?.stageType ?? "Details"}
        open={selectedRow !== null}
        onOpenChange={(open) => {
          if (!open) setSelectedRow(null);
        }}
        className="sm:max-w-[70vw] !px-0"
      >
        {selectedRow && (
          <SubBillTable
            selectedRow={{
              ...selectedRow,
              projectLabors: selectedRow.labors,
              projectMaterials: selectedRow.materials,
              projectActivities: selectedRow.activities,
            }}
          />
        )}
      </ReusableDialog>
    </div>
  );
};

export default BillTable;
