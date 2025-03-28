import GenericTable from "@/components/general/GenericTable";
import { CompanyUserType } from "@/hooks/api/queries/user/getCompanyUser";

// export type ClientItem = {
//   id: number;
//   name: string;
//   email: string;
//   PropertySold: number;
//   TotalAmount: number;
//   AmountReceived: number;
//   AmountPending: number;
// };

// const sampleData: ClientItem[] = [
//   {
//     id: 1,
//     name: "MONDAY MUSA	",
//     email: "mondaymusa@tibilon.com	",
//     PropertySold: 0,
//     TotalAmount: 0,
//     AmountReceived: 0,
//     AmountPending: 0,
//   },
//   {
//     id: 2,
//     name: "OBIAGELI STELLA AMEH		",
//     email: "amehobiageli@tibilon.com		",
//     PropertySold: 0,
//     TotalAmount: 0,
//     AmountReceived: 0,
//     AmountPending: 0,
//   },
//   {
//     id: 1,
//     name: "BASHIR ALIYU	",
//     email: "bashiraliyu@tibilon.com",
//     PropertySold: 0,
//     TotalAmount: 0,
//     AmountReceived: 0,
//     AmountPending: 0,
//   },
//   {
//     id: 1,
//     name: "AYUBA JONAH		",
//     email: "ayubajonah@tibilon.com	",
//     PropertySold: 0,
//     TotalAmount: 0,
//     AmountReceived: 0,
//     AmountPending: 0,
//   },
// ];

type props = {
  CompanyUserData: CompanyUserType[];
};

const EmployeeTable = ({ CompanyUserData }: props) => {
  const headers = [
    { content: <>Name</> },
    { content: <>Email</> },
    { content: <>Phone Number</> },
    { content: <>Address</> },
    // { content: <>Property Sold</> },
    // { content: <>Total Amount.</> },
    // { content: <>Amount Recieved </> },
    // { content: <>Amount Pending</> },
  ];

  if (CompanyUserData?.length === 0) {
    return <div>No data available</div>;
  }
  const renderRow = (user: CompanyUserType, index: number) => {
    return (
      <tr key={index} className="text-gray-700 text-sm h-[50px] border-b">
        <td className="py-2 px-4">
          {user.firstName} {user?.lastName}
        </td>
        <td className="py-2 px-4">{user?.email}</td>
        <td className="py-2 px-4">{user?.phoneNumber}</td>
        <td className="py-2 px-4">{user?.address}</td>
        {/* <td className="py-2 px-4">{task.PropertySold}</td>
        <td className="py-2 px-4">{task.TotalAmount}</td>
        <td className="py-2 px-4">{task.AmountReceived}</td>
        <td className="py-2 px-4">{task.AmountPending}</td> */}
      </tr>
    );
  };

  return (
    <div>
      <GenericTable
        headers={headers}
        data={CompanyUserData}
        renderRow={renderRow}
        className=""
      />
    </div>
  );
};

export default EmployeeTable;
