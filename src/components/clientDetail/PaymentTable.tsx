// import { DownloadProof } from "@/assets/svgComp/PropertyIcon";
import GenericTable from "@/components/general/GenericTable";
import { PaymentPropertyData } from "@/hooks/api/queries/projects/property/getPaymentProperty";
import { format } from "date-fns";

// export type payItem = {
//   id: number;
//   amountPaid: string;
//   dateOfPay: string;
//   typeOfPay: string;
//   proof: string;
// };

// const sampleData: payItem[] = [
//   {
//     id: 1,
//     amountPaid: "₦ 5,000,000.00",
//     dateOfPay: "12/12/2025",
//     typeOfPay: "Bank Transfer",
//     proof: "https://www.google.com/",
//   },
//   {
//     id: 1,
//     amountPaid: "₦ 5,000,000.00",
//     dateOfPay: "12/12/2025",
//     typeOfPay: "Cash",
//     proof: "https://www.google.com/",
//   },
// ];

type TableProp = {
  paymentDataLoad: PaymentPropertyData[];
};

const PaymentTable = ({ paymentDataLoad }: TableProp) => {
  const headers = [
    { content: <>Amount Paid</> },
    { content: <>Date of Payment</> },
    { content: <>Type of Payment</> },
    { content: <>Proof</> },
  ];

  if (paymentDataLoad?.length === 0) {
    return <div>No Data available</div>;
  }
  const renderRow = (item: PaymentPropertyData, index: number) => {
    return (
      <tr key={index} className="text-gray-700 text-sm h-[50px] border-b">
        <td className="py-2 px-4">{item.amount}</td>
        <td className="py-2 px-4">
          {format(new Date(item.datePaid), "MMM d, yyyy")}
        </td>
        <td className="py-2 px-4">{item.paymentType}</td>
        <td className="py-2 px-4 flex items-center gap-2 cursor-pointer">
          <img src={item.paymentProof} alt="proof" className="w-14 h-14" />
          {/* <a href={item.paymentProof} download></a>
          <DownloadProof /> */}
        </td>
      </tr>
    );
  };

  return (
    <div>
      <GenericTable
        headers={headers}
        data={paymentDataLoad}
        renderRow={renderRow}
        className=""
      />
    </div>
  );
};

export default PaymentTable;
