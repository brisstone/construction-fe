import { DownloadProof } from "@/assets/svgComp/PropertyIcon";
import GenericTable from "@/components/general/GenericTable";

export type payItem = {
  id: number;
  amountPaid: string;
  dateOfPay: string;
  typeOfPay: string;
  proof: string;
};

const sampleData: payItem[] = [
  {
    id: 1,
    amountPaid: "₦ 5,000,000.00",
    dateOfPay: "12/12/2025",
    typeOfPay: "Bank Transfer",
    proof: "https://www.google.com/",
  },
  {
    id: 1,
    amountPaid: "₦ 5,000,000.00",
    dateOfPay: "12/12/2025",
    typeOfPay: "Cash",
    proof: "https://www.google.com/",
  },
];

const PaymentTable = () => {
  const headers = [
    { content: <>Amount Paid</> },
    { content: <>Date of Payment</> },
    { content: <>Type of Payment</> },
    { content: <>Proof</> },
  ];

  const renderRow = (task: payItem, index: number) => {
    return (
      <tr key={index} className="text-gray-700 text-sm h-[50px] border-b">
        <td className="py-2 px-4">{task.amountPaid}</td>
        <td className="py-2 px-4">{task.dateOfPay}</td>
        <td className="py-2 px-4">{task.typeOfPay}</td>
        <td className="py-2 px-4 flex items-center gap-2">
          <a href={task.proof} download></a>
          <DownloadProof />
        </td>
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

export default PaymentTable;
