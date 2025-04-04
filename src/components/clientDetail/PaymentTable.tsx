// import { DownloadProof } from "@/assets/svgComp/PropertyIcon";
import GenericTable from "@/components/general/GenericTable";
import { PaymentPropertyData } from "@/hooks/api/queries/projects/property/getPaymentProperty";
import { formatNumberWithCommaDecimal } from "@/utils";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ThreeDotsVertical } from "@/assets/svgComp/General";
import { useState } from "react";
import ReusableDialog from "../general/ReuseableDialog";
import DeletePayPropsModal from "./DeletePayPropsModal";

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

  onEdit: (pay: PaymentPropertyData) => void;
};

const PaymentTable = ({ paymentDataLoad, onEdit }: TableProp) => {
  const headers = [
    { content: <>Amount Paid</> },
    { content: <>Date of Payment</> },
    { content: <>Type of Method</> },
    { content: <>Proof</> },
    { content: <>Action</> },
  ];

   const [deletePayProps, setDeletePayProps] = useState(false);
    const [selectedPayProps, setSelectedPayProps] = useState<string | null>(null);
  
    const handleDelete = (id: string) => {
      setSelectedPayProps(id);
      setDeletePayProps(true);
    };
  

  if (paymentDataLoad?.length === 0) {
    return <div>No Data available</div>;
  }
  const renderRow = (item: PaymentPropertyData, index: number) => {
    return (
      <tr key={index} className="text-gray-700 text-sm h-[50px] border-b">
        <td className="py-2 px-4">
          {formatNumberWithCommaDecimal(item.amount)}
        </td>
        <td className="py-2 px-4">
          {format(new Date(item.datePaid), "MMM d, yyyy")}
        </td>
        <td className="py-2 px-4">{item.paymentMethod}</td>
        <td className="py-2 px-4 flex items-center gap-2 cursor-pointer">
          <img src={item.paymentProof} alt="proof" className="w-14 h-14" />
          {/* <a href={item.paymentProof} download></a>
          <DownloadProof /> */}
        </td>
        <td className="py-1 px-4">
          <Popover>
            <PopoverTrigger>
              <ThreeDotsVertical />
            </PopoverTrigger>
            <PopoverContent className="w-[100px] rounded-[4px]">
              <div>
                <p onClick={() => onEdit(item)} className="cursor-pointer">
                  Edit
                </p>
                {/* <p
                  onClick={() => handleDelete(item?._id)}
                  className="cursor-pointer"
                >
                  Delete
                </p> */}
              </div>
            </PopoverContent>
          </Popover>
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
      {
        <ReusableDialog
          title={"Delete Payment"}
          open={deletePayProps}
          onOpenChange={setDeletePayProps}
          className="max-w-xl"
        >
          <DeletePayPropsModal
            setDeletePayProps={setDeletePayProps}
            selectedPayProps={selectedPayProps || ""}
          />
        </ReusableDialog>
      }
    </div>
  );
};

export default PaymentTable;
