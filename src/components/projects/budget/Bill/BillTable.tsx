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
    description: "Substructure",
    amount: 1000000,
  },
  {
    _id: "3",
    item: "C",
    description: "Substructure",
    amount: 1000000,
  },
];

const BillTable = () => {
  const headers = [
    { content: <>Item</> },
    { content: <>Description</> },
    { content: <>Amount(#)</> },
  ];

  const renderRow = (item: DataItem, index: number) => {
    return (
      <tr
        key={index}
        className=" w-full text-grey text-[13px] text-sm h-[60px] text-left font-medium cursor-pointer"
      >
        <td className="py-1 px-4">{item?.item}</td>

        <td className="py-1 px-4"> {item?.description}</td>

        <td className="py-1 px-4">{item?.amount?.toLocaleString()}</td>
      </tr>
    );
  };

  return (
    <div>
      <GenericTable
        headers={headers}
        data={sampleData}
        renderRow={renderRow}
        className="h-[50vh]"
      />
    </div>
  );
};

export default BillTable;
