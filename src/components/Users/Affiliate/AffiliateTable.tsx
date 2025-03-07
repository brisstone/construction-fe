import GenericTable from "@/components/general/GenericTable";

export type ClientItem = {
  id: number;
  name: string;
  email: string;
  Phone: string;
  PropertySold: number;
  TotalAmount: number;
  AmountReceived: number;
  AmountPending: number;
};

const sampleData: ClientItem[] = [
  {
    id: 1,
    name: "MONDAY MUSA	",
    email: "mondaymusa@tibilon.com	",
    Phone: "0816455533",
    PropertySold: 0,
    TotalAmount: 0,
    AmountReceived: 0,
    AmountPending: 0,
  },
  {
    id: 2,
    name: "OBIAGELI STELLA AMEH		",
    email: "amehobiageli@tibilon.com		",
    Phone: "0816455533",
    PropertySold: 0,
    TotalAmount: 0,
    AmountReceived: 0,
    AmountPending: 0,
  },
  {
    id: 1,
    name: "BASHIR ALIYU	",
    email: "bashiraliyu@tibilon.com",
    Phone: "0816455533",
    PropertySold: 0,
    TotalAmount: 0,
    AmountReceived: 0,
    AmountPending: 0,
  },
  {
    id: 1,
    name: "AYUBA JONAH		",
    email: "ayubajonah@tibilon.com	",
    Phone: "0816455533",
    PropertySold: 0,
    TotalAmount: 0,
    AmountReceived: 0,
    AmountPending: 0,
  },
];

const AffiliateTable = () => {
  const headers = [
    { content: <>Name</> },
    { content: <>Email</> },
    { content: <>Phone Number </> },
    { content: <>Property Sold</> },
    { content: <>Total Amount.</> },
    { content: <>Amount Recieved </> },
    { content: <>Amount Pending</> },
  ];

  const renderRow = (task: ClientItem, index: number) => {
    return (
      <tr key={index} className="text-gray-700 text-sm h-[50px] border-b">
        <td className="py-2 px-4">{task.name}</td>
        <td className="py-2 px-4">{task.email}</td>
        <td className="py-2 px-4">{task.Phone}</td>
        <td className="py-2 px-4">{task.PropertySold}</td>
        <td className="py-2 px-4">{task.TotalAmount}</td>
        <td className="py-2 px-4">{task.AmountReceived}</td>
        <td className="py-2 px-4">{task.AmountPending}</td>
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

export default AffiliateTable;
