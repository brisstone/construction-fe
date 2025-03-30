import GenericTable from "@/components/general/GenericTable";
import { PaymentScheduleType } from "@/hooks/api/queries/projects/paymentSchedule/getPaymentSchedule";
import { formatNumberWithCommaDecimal } from "@/utils";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
// export type DataItem = {
//   _id: string;
//   contractor: string;
//   amountDue: number;
//   dueDate: string;
//   amountPaid: number;
//   actualPayDate: string;
//   balance: number;
// };

// const sampleData: DataItem[] = [
//   {
//     _id: "1",
//     contractor: "Bruche Engineering",
//     amountDue: 2500000,
//     dueDate: "2025-02-20",
//     amountPaid: 1200000,
//     actualPayDate: "2025-02-18",
//     balance: 1300000,
//   },
//   {
//     _id: "2",
//     contractor: "Alege Ventures Ltd",
//     amountDue: 4600000,
//     dueDate: "2025-02-21",
//     amountPaid: 1520000,
//     actualPayDate: "2025-02-19",
//     balance: 3080000,
//   },
//   {
//     _id: "3",
//     contractor: "Metrodec Nig Ltd.",
//     amountDue: 7500000,
//     dueDate: "2025-02-22",
//     amountPaid: 3200000,
//     actualPayDate: "2025-02-20",
//     balance: 4300000,
//   },
//   {
//     _id: "4",
//     contractor: "Infinity Construction",
//     amountDue: 2000000,
//     dueDate: "2025-02-23",
//     amountPaid: 1800000,
//     actualPayDate: "2025-02-21",
//     balance: 200000,
//   },
//   {
//     _id: "5",
//     contractor: "News Engineering",
//     amountDue: 7800000,
//     dueDate: "2025-02-24",
//     amountPaid: 7800000,
//     actualPayDate: "2025-02-22",
//     balance: 0,
//   },
//   {
//     _id: "6",
//     contractor: "I.C.J Electricals Ltd",
//     amountDue: 560000,
//     dueDate: "2025-02-25",
//     amountPaid: 560000,
//     actualPayDate: "2025-02-23",
//     balance: 0,
//   },
//   {
//     _id: "7",
//     contractor: "Verofort Logistics",
//     amountDue: 200000,
//     dueDate: "2025-02-26",
//     amountPaid: 200000,
//     actualPayDate: "2025-02-24",
//     balance: 0,
//   },
//   {
//     _id: "8",
//     contractor: "Finze Blocks Ltd",
//     amountDue: 2500000,
//     dueDate: "2025-02-27",
//     amountPaid: 1300000,
//     actualPayDate: "2025-02-25",
//     balance: 1200000,
//   },
// ];

const PaymentTable = ({
  paymentSchedule,
}: {
  paymentSchedule: PaymentScheduleType[];
}) => {
  const headers = [
    { content: <>Contractor/Vendor</> },
    // { content: <>Amount Due(₦)</> },
    // { content: <>Due Date</> },
    { content: <>Amount Paid(₦)</> },
    { content: <>Actual Pay date</> },
    { content: <>Status</> },
  ];

  const navigate = useNavigate();

  if (!paymentSchedule || paymentSchedule?.length === 0) {
    return <div className="text-center">Data not available</div>;
  }

  const renderRow = (item: PaymentScheduleType, index: number) => {
    const handleRowClick = () => {
      navigate(`/admin/project/${item?._id}/payment-schedule-detail`);
    };

    console.log(item, 'item__item')

    return (
      <tr
        onClick={handleRowClick}
        key={index}
        className=" w-full text-grey text-[13px] text-left text-sm h-[60px]  font-medium cursor-pointer"
      >
        <td className="py-1 px-4">{item?.contractorId?.firstName}</td>
        {/* <td className="py-1 px-4">{item?.amount.toLocaleString()}</td> */}
        {/* <td className="py-1 px-4">{item.dueDate}</td> */}
        <td className="py-1 px-4 text-green">
          {formatNumberWithCommaDecimal(item?.amount)}
        </td>
        <td className="py-1 px-4">
          {item.datePaid
            ? format(new Date(item.datePaid), "MMM dd, yyyy")
            : "N/A"}
        </td>
        <td className="py-1 px-4 ">
          {item.paymentCompleted? <span className="text-[green]">Paid</span> : <span className="text-red-600">Pending</span>}
        </td>
      </tr>
    );
  };

  return (
    <div>
      <GenericTable
        headers={headers}
        data={paymentSchedule}
        renderRow={renderRow}
        className=""
      />
    </div>
  );
};

export default PaymentTable;
