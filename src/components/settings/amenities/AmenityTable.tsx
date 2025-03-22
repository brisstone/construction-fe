import { ThreeDotsVertical } from "@/assets/svgComp/General";
import GenericTable from "@/components/general/GenericTable";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { AmenityType } from "@/hooks/api/queries/settings/amenity/getAmenity";
export type TaskItem = {
  id: number;
  amenitiesName: string;
};

const sampleData: TaskItem[] = [
  {
    id: 1,
    amenitiesName: "Prime Location	",
  },
  {
    id: 2,
    amenitiesName: "Mini-Mart	",
  },
  {
    id: 3,
    amenitiesName: "Lounge",
  },
];

type AmenityTableProps = {
  amenityData: AmenityType[];
  // onEdit: (amenity: AmenityType) => void;
};

const AmenityTable = ({ amenityData }: AmenityTableProps) => {
  const headers = [
    { content: <>S/N</> },
    { content: <> Name</> },
    { content: <> Image</> },
    { content: <>Action</> },
  ];

  if (amenityData?.length === 0)
    return (
      <div>
        <h1 className="text-center">No Data</h1>
      </div>
    );

  const renderRow = (task: TaskItem, index: number) => {
    return (
      <tr key={index} className="text-gray-700 text-sm h-[50px] border-b">
        <td className="py-2 px-4">{task.id}</td>
        <td className="py-2 px-4">{task.amenitiesName}</td>
        <td className="py-2 px-4">
          <img src="SS" alt="s" />
        </td>
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
        data={sampleData}
        renderRow={renderRow}
        className=""
      />
    </div>
  );
};

export default AmenityTable;
