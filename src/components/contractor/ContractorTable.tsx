import { ThreeDotsVertical } from "@/assets/svgComp/General";
import GenericTable from "@/components/general/GenericTable";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import ReusableDialog from "../general/ReuseableDialog";
import { useState } from "react";
import DeleteContractorModal from "./DeleteContractorModal";
import { ContractorType } from "@/hooks/api/queries/contractor/getContractor";

type ContractorTableProps = {
  contractorData: ContractorType[];
  onEdit: (contractor: ContractorType) => void;
};

const ContractorTable = ({ contractorData, onEdit }: ContractorTableProps) => {
  const headers = [
    { content: <>Contractor Name</> },
    { content: <>Address</> },
    { content: <>Phone No.</> },
    { content: <>Email</> },
    { content: <>Contractor Type </> },
    { content: <>Occupation</> },
    { content: <></> },
  ];

  const [deleteContractor, setDeleteContractor] = useState(false);
  const [selectedContractor, setSelectedContractor] = useState<string | null>(null);

  const handleDelete = (id: string) => {
    setSelectedContractor(id);
    setDeleteContractor(true);
  };

  if (!contractorData || contractorData?.length === 0) {
    return <div className="text-center">Data not available</div>;
  }

  const renderRow = (contractor: ContractorType, index: number) => {
    return (
      <tr key={index} className="text-gray-700 text-sm h-[50px] border-b">
        <td className="py-2 px-4">{`${contractor?.firstName ?? ""} ${
          contractor?.lastName ?? ""
        }`}</td>
        <td className="py-2 px-4">{contractor?.address}</td>
        <td className="py-2 px-4">{contractor?.phoneNumber}</td>
        <td className="py-2 px-4">{contractor?.email}</td>
        <td className="py-2 px-4">{contractor?.type}</td>
        <td className="py-2 px-4">{contractor?.occupation}</td>

        <td className="py-1 px-4">
          <Popover>
            <PopoverTrigger>
              <ThreeDotsVertical />
            </PopoverTrigger>
            <PopoverContent className="w-[100px] rounded-[4px]">
              <div>
                <p onClick={() => onEdit(contractor)} className="cursor-pointer">
                  Edit
                </p>
                <p
                  onClick={() => handleDelete(contractor?._id)}
                  className="cursor-pointer"
                >
                  Delete
                </p>
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
        data={contractorData}
        renderRow={renderRow}
        className=""
      />
      {
        <ReusableDialog
          title={"Delete Contractor"}
          open={deleteContractor}
          onOpenChange={setDeleteContractor}
          className="max-w-xl"
        >
          <DeleteContractorModal
            setDeleteContractor={setDeleteContractor}
            selectedContractor={selectedContractor || ""}
          />
        </ReusableDialog>
      }
    </div>
  );
};

export default ContractorTable;
