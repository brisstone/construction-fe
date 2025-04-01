import GenericTable from "@/components/general/GenericTable";
import { CompanyUserType } from "@/hooks/api/queries/user/getCompanyUser";

type props = {
  CompanyUserData: CompanyUserType[];
};

const AffiliateTable = ({ CompanyUserData }: props) => {
  const headers = [
    { content: <>Name</> },
    { content: <>Email</> },
    { content: <>Phone Number </> },
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

export default AffiliateTable;
