import { ThreeDotsVertical } from "@/assets/svgComp/General";
import GenericTable from "@/components/general/GenericTable";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ClientType } from "@/hooks/api/queries/clients/getClients";
import ReusableDialog from "../general/ReuseableDialog";
import { useState } from "react";
import DeleteClientModal from "./DeleteClientModal";
export type ClientItem = {
  id: number;
  clientName: string;
  address: string;
  phone: string;
  email: string;
  clientType: string;
  occupation: string;
};

// const sampleData: ClientItem[] = [
//   {
//     id: 1,
//     clientName: "Alh. Musa Bawa",
//     address: "1 Masarki Close Wuse 2",
//     phone: "080312345678",
//     email: "aamusabawa@gmail.com",
//     clientType: "Individual",
//     occupation: "Business",
//   },
//   {
//     id: 2,
//     clientName: "Mr Joseph Aboderin",
//     address: "12 Dalaba Street, Lugbe",
//     phone: "080312345678",
//     email: "jaboderim@yahoo.com",
//     clientType: "Individual",
//     occupation: "Lawyer",
//   },
//   {
//     id: 3,
//     clientName: "Dr. Stanley Ojugo",
//     address: "1 Ontario Crecs Maitama ",
//     phone: "080312345678",
//     email: "askdrstan@limihl.com",
//     clientType: "Individual",
//     occupation: "Doctor",
//   },
// ];

type ClientTableProps = {
  clientData: ClientType[];
  onEdit: (client: ClientType) => void;
};

const ClientTable = ({ clientData, onEdit }: ClientTableProps) => {
  const headers = [
    { content: <>Client Name</> },
    { content: <>Address</> },
    { content: <>Phone No.</> },
    { content: <>Email</> },
    { content: <>Client Type </> },
    { content: <>Occupation</> },
    { content: <></> },
  ];

  const [deleteClient, setDeleteClient] = useState(false);
  const [selectedClient, setSelectedClient] = useState<string | null>(null);

  const handleDelete = (id: string) => {
    setSelectedClient(id);
    setDeleteClient(true);
  };

  if (!clientData || clientData?.length === 0) {
    return <div className="text-center">Data not available</div>;
  }

  const renderRow = (client: ClientType, index: number) => {
    return (
      <tr key={index} className="text-gray-700 text-sm h-[50px] border-b">
        <td className="py-2 px-4">{`${client?.firstName ?? ''} ${client?.lastName ?? ''}`}</td>
        <td className="py-2 px-4">{client?.geometry?.address}</td>
        <td className="py-2 px-4">{client?.phoneNumber}</td>
        <td className="py-2 px-4">{client?.email}</td>
        <td className="py-2 px-4">{client?.clientId}</td>
        <td className="py-2 px-4">{client?.occupation}</td>

        <td className="py-1 px-4">
          <Popover>
            <PopoverTrigger>
              <ThreeDotsVertical />
            </PopoverTrigger>
            <PopoverContent className="w-[100px] rounded-[4px]">
              <div>
                <p onClick={() => onEdit(client)} className="cursor-pointer">
                  Edit
                </p>
                <p
                  onClick={() => handleDelete(client?._id)}
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
        data={clientData}
        renderRow={renderRow}
        className=""
      />
      {
        <ReusableDialog
          title={"Delete Client"}
          open={deleteClient}
          onOpenChange={setDeleteClient}
          className="max-w-xl"
        >
          <DeleteClientModal
            setDeleteClient={setDeleteClient}
            selectedClient={selectedClient || ""}
          />
        </ReusableDialog>
      }
    </div>
  );
};

export default ClientTable;
