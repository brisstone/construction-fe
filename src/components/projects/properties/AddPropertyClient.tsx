import ButtonComp from "@/components/general/ButtonComp";
import ReusableSelect from "@/components/general/ReuseableSelect";
import useUpdateProperty from "@/hooks/api/mutation/project/property/useUpdateProperty";
import useGetClients, {
  ClientType,
} from "@/hooks/api/queries/clients/getClients";
import { QUERY_KEY_SINGLEPROPERTY } from "@/hooks/api/queries/projects/property/getSingleProperty";
import { useAuthStore } from "@/store/authStore";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

const AddPropertyClient = ({
  handleModalClose,
  propertySingleId,
}: {
  handleModalClose: () => void;
  propertySingleId: string;
}) => {
  const [client, setClient] = useState("");

  const { currentUser } = useAuthStore();
  const { data: clientData, isPending } = useGetClients(
    currentUser?.companyId || ""
  );

  const clientOptions =
    clientData?.data?.map((client: ClientType) => ({
      label: client.firstName,
      value: client._id,
    })) || [];

  const queryClient = useQueryClient();
  const { mutate: updateProperty, isPending: isUpdating } = useUpdateProperty();

  const handleSubmit = () => {
    const payload = {
      clientId: client,
    };

    updateProperty(
      { ...payload, id: propertySingleId },
      {
        onSuccess: (response: any) => {
          toast.success(response?.data?.message || "edited successfully");
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_SINGLEPROPERTY],
          });
          handleModalClose();
        },
        onError: (error: any) => {
          toast.error(
            error?.response?.data?.message || "Error updating client"
          );
        },
      }
    );
  };

  if (isPending) {
    return (
      <div className="inset-0 bg-black bg-opacity-10 text-center flex justify-center">
        Loading...
      </div>
    );
  }

  return (
    <section>
      <div>
        <p className="text-sm font-semibold text-grey">Property Client</p>
        <ReusableSelect
          defaultValue={client}
          onValueChange={setClient}
          className="my-4"
          placeholder="Property Client"
          options={clientOptions}
        />
      </div>
      <ButtonComp
        className="flex justify-self-end w-fit"
        text={isUpdating ? "Updating..." : "Update"}
        onClick={handleSubmit}
      />
    </section>
  );
};

export default AddPropertyClient;
