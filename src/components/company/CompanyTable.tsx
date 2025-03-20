import { ThreeDotsVertical } from "@/assets/svgComp/General";
import GenericTable from "../general/GenericTable";
import { Avatar, AvatarFallback } from "../ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import avatar2 from "@/assets/images/WebAvatar.png";
import { CompanyType } from "@/hooks/api/queries/company/getCompany";
import { truncateText } from "@/lib/fns"; 
import { format } from "date-fns";
import { useState } from "react";
import ReusableDialog from "../general/ReuseableDialog";
import DeleteCompanyModal from "./DeleteCompanyModal";

const CompanyTable = ({
  companyData,
  onEdit,
}: {
  companyData: CompanyType[];
  onEdit: (company: CompanyType) => void;
}) => {
  console.log("Company Data:", companyData);
  const headers = [
    {
      content: <input type="checkbox" />,
    },
    { content: <>Company Id</> },
    { content: <>Company Name</> },
    { content: <>Company Email</> },
    { content: <>Company Role</> },
    { content: <>Date</> },
    { content: <>Action </> },
  ];

  const [deleteCompany, setDeleteCompany] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);

  const handleDelete = (id: string) => {
    setSelectedCompany(id);
    setDeleteCompany(true);
  };

  const renderRow = (item: CompanyType, index: number) => {
    return (
      <tr
        key={index}
        className=" w-full text-grey text-[13px] text-sm h-[60px] text-left font-medium cursor-pointer"
      >
        <td className="py-1 px-4">
          <span>
            <input type="checkbox" />
          </span>
        </td>
        <td className="py-1 px-4">{truncateText(item?._id, 10)}</td>
        <td className="py-1 px-4">
          <div className="flex gap-2 items-center">
            <Avatar className="cursor-pointer">
              <AvatarFallback>
                <img src={item?.logo ?? avatar2} alt="avatar" />
              </AvatarFallback>
            </Avatar>
            <p className="text-sm text-grey">{item?.name}</p>
          </div>
        </td>
        <td className="py-1 px-4">{item?.email}</td>
        <td className="py-1 px-4">{item?.ownerId?.role}</td>
        <td className="py-1 px-4">{format(item?.createdAt, "yyyy-MM-dd")}</td>
        <td className="py-1 px-4">
          <Popover>
            <PopoverTrigger>
              <ThreeDotsVertical />
            </PopoverTrigger>
            <PopoverContent className="w-[100px] rounded-[4px]">
              <div>
                <p className="cursor-pointer" onClick={() => onEdit(item)}>
                  Edit
                </p>
                <p
                  className="cursor-pointer"
                  onClick={() => handleDelete(item?._id)}
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
        data={companyData}
        renderRow={renderRow}
        className="!h-full"
      />
      {
        <ReusableDialog
          title={"Delete Company"}
          open={deleteCompany}
          onOpenChange={setDeleteCompany}
          className="max-w-xl"
        >
          <DeleteCompanyModal
            setDeleteCompany={setDeleteCompany}
            selectedCompany={selectedCompany || ""}
          />
        </ReusableDialog>
      }
    </div>
  );
};

export default CompanyTable;
