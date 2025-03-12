import { ThreeDotsVertical } from "@/assets/svgComp/General";
import GenericTable from "../general/GenericTable";
import { Avatar, AvatarFallback } from "../ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import avatar2 from "@/assets/images/WebAvatar.png";
import { format } from "date-fns";

type CompanyType = {
  _id: string;
  name: string;
  email: string;
  logo?: string;
  ownerId: {
    role: string;
  };
  createdAt: Date; 
};

const companyData: CompanyType[] = [
  {
    _id: "1",
    name: "Company One",
    email: "companyone@example.com",
    logo: avatar2,
    ownerId: {
      role: "Admin",
    },
    createdAt: new Date("2023-01-01"),
  },
  {
    _id: "2",
    name: "Company Two",
    email: "companytwo@example.com",
    ownerId: {
      role: "User",
    },
    createdAt: new Date("2023-02-01"),
  },
  {
    _id: "3",
    name: "Company Three",
    email: "companythree@example.com",
    logo: avatar2,
    ownerId: {
      role: "Manager",
    },
    createdAt: new Date("2023-03-01"),
  },
];

const CompanyTable = () => {
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
        <td className="py-1 px-4">{item?._id}</td>
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
                <p className="cursor-pointer">Edit</p>
                <p className="cursor-pointer">Delete</p>
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
    </div>
  );
};

export default CompanyTable;
