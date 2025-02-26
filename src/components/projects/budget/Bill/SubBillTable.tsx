import GenericTable from "@/components/general/GenericTable";
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

const SubBillTable = ({ selectedRow }: { selectedRow: any }) => {
  const headers = [
    { content: <>Item</> },
    { content: <>Description</> },
    { content: <>Amount(#)</> },
  ];

  console.log(selectedRow, "selectedRow");

  const renderRow = (item: DataItem, index: number) => {
    return (
      <tr
        key={index}
        className=" w-full text-grey text-[13px] text-left text-sm h-[60px]  font-medium cursor-pointer"
      >
        <td className="py-1 px-4">{item?.item}</td>

        <td className="py-1 px-4 "> {item?.description}</td>

        <td className="py-1 px-4">{item?.amount?.toLocaleString()}</td>
      </tr>
    );
  };

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
        <p className="font-semibold">Total</p>
        <p></p>
        <p className="font-semibold -ml-4">{TotalValue?.toLocaleString()}</p>
      </div>
      <div className="my-4">
        <h3 className="font-bold text-xs text-center">
          Note:{" "}
          <span className="font-normal">Kindly check “Documents” for complete breakdown of items</span>
        </h3>
      </div>
    </div>
  );
};

export default SubBillTable;
