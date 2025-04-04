import GenericTable from "@/components/general/GenericTable";

export type DataItem = {
  _id: string;
  type: "main" | "material" | "labor";
  item?: string;
  description?: string;
  quantity?: number;
  rate?: number;
  amount?: number;
};

const SubBillTable = ({ selectedRow }: { selectedRow: any }) => {
  const headers = [
    { content: <>Item</> },
    { content: <>Description</> },
    { content: <>Quantity</> },
    { content: <>Rate</> },
    { content: <>Amount(#)</> },
  ];

  // Format the data for our table based on selectedRow
  const formatTableData = () => {
    if (!selectedRow) return [];

    const tableData: DataItem[] = [];

    // Add main row
    tableData.push({
      _id: selectedRow._id || "main-row",
      type: "main",
      item: selectedRow.displayItem || "",
      description: selectedRow.stageType?.replace("_", " ") || "",
      amount: selectedRow.displayAmount || 0,
    });

    // Add material rows
    if (selectedRow.materials && selectedRow.materials.length > 0) {
      selectedRow.materials.forEach((material: any, index: number) => {
        tableData.push({
          _id: material._id || `material-${index}`,
          type: "material",
          item: "Material",
          description: `${material.materialId?.name || "N/A"} - ${
            material.materialType || "N/A"
          }`,
          quantity: material.quantity || 0,
          rate: material.rate || 0,
          amount: (material.quantity || 0) * (material.rate || 0),
        });
      });
    }

    // Add labor rows
    if (selectedRow.labors && selectedRow.labors.length > 0) {
      selectedRow.labors.forEach((labor: any, index: number) => {
        tableData.push({
          _id: labor._id || `labor-${index}`,
          type: "labor",
          item: "Labor",
          description: labor.laborId?.name || "N/A",
          quantity: labor.quantity || 0,
          rate: labor.rate || 0,
          amount: (labor.quantity || 0) * (labor.rate || 0),
        });
      });
    }

    return tableData;
  };

  const tableData = formatTableData();

  const renderRow = (item: DataItem, index: number) => {
    // Style based on row type
    const rowClass =
      item.type === "main" ? "bg-gray-50 font-semibold" : "pl-4 text-gray-700";

    return (
      <tr
        key={index}
        className={`w-full text-[13px] text-left text-sm h-[50px] font-medium cursor-pointer ${rowClass}`}
      >
        <td className="py-1 px-4">
          {item.type === "main" ? item.item : `- ${item.item}`}
        </td>
        <td className="py-1 px-4">{item.description}</td>
        <td className="py-1 px-4">
          {item.type !== "main" ? item.quantity : ""}
        </td>
        <td className="py-1 px-4">
          {item.type !== "main" ? item.rate?.toLocaleString() : ""}
        </td>
        <td className="py-1 px-4">{item.amount?.toLocaleString()}</td>
      </tr>
    );
  };

  // Just use the main item's displayAmount as the total - don't add everything together
  const totalValue = selectedRow?.displayAmount || 0;

  return (
    <div>
      <GenericTable
        headers={headers}
        data={tableData}
        renderRow={renderRow}
        className=""
      />
      <div className="p-4 grid grid-cols-5 border-borderColor border">
        <p className="font-semibold">Total</p>
        <p></p>
        <p></p>
        <p></p>
        <p className="font-semibold">{totalValue.toLocaleString()}</p>
      </div>
      <div className="my-4">
        <h3 className="font-bold text-xs text-center">
          Note:{" "}
          <span className="font-normal">
            Kindly check "Documents" for complete breakdown of items
          </span>
        </h3>
      </div>
    </div>
  );
};

export default SubBillTable;
