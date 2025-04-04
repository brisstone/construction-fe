import ButtonComp from "@/components/general/ButtonComp";
import ReusableSelect from "@/components/general/ReuseableSelect";
import InputField from "@/components/input/InputField";
import useUpdateProperty from "@/hooks/api/mutation/project/property/useUpdateProperty";
import useGetClients, {
  ClientType,
} from "@/hooks/api/queries/clients/getClients";
import { QUERY_KEY_SINGLEPROPERTY } from "@/hooks/api/queries/projects/property/getSingleProperty";
import useGetCompanyUser, {
  CompanyUserType,
} from "@/hooks/api/queries/user/getCompanyUser";
import { useAuthStore } from "@/store/authStore";
import { AgentTypeEnum, PaymentFrequency } from "@/utils";
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
  const [agentType, setAgentType] = useState("");
  const [agent, setAgent] = useState(AgentTypeEnum.AFFILIATE as string);
  const [frequency, setFrequency] = useState("");
  const [commision, setCommision] = useState<string | number>("");
  const [dueDate, setDueDate] = useState<Date | null>(null);

  const { currentUser } = useAuthStore();
  const { data: clientData, isPending } = useGetClients(
    currentUser?.companyId || ""
  );

  const { data: CompanyUser, isPending: userpend } = useGetCompanyUser(
    currentUser?.companyId ?? ""
  );

  const { data: CompanyAffilitates } = useGetCompanyUser(
    currentUser?.companyId ?? "",
    { accountType: AgentTypeEnum.AFFILIATE }
  );

  const clientOptions =
    clientData?.data?.map((client: ClientType) => ({
      label: client.firstName,
      value: client._id,
    })) || [];

  const agentOptions =
    CompanyUser?.data?.map((user: CompanyUserType) => ({
      label: user.firstName,
      value: user._id,
    })) || [];

  const agentAffiliateOptions =
    CompanyAffilitates?.data?.map((user: CompanyUserType) => ({
      label: user.firstName,
      value: user._id,
    })) || [];

  const queryClient = useQueryClient();
  const { mutate: updateProperty, isPending: isUpdating } = useUpdateProperty();

  const handleSubmit = () => {
    const payload = {
      clientId: client,
      agentType,
      agentId: agent,
      paymentFrequency: frequency,
      agentCommission: commision,
      dueDate,
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

  if (isPending || userpend) {
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
        <div className="grid sm:grid-cols-2 grid-cols-1 gap-5 ">
          <ReusableSelect
            defaultValue={agentType}
            onValueChange={setAgentType}
            className="my-4"
            placeholder="Property Agent Type"
            options={[
              {
                label: AgentTypeEnum.EMPLOYEE,
                value: AgentTypeEnum.EMPLOYEE,
              },
              {
                label: AgentTypeEnum.AFFILIATE,
                value: AgentTypeEnum.AFFILIATE,
              },
            ]}
          />
          <ReusableSelect
            defaultValue={agent}
            onValueChange={setAgent}
            className="my-4"
            placeholder="Property Agent"
            options={
              agentType == AgentTypeEnum.EMPLOYEE
                ? agentOptions
                : agentAffiliateOptions
            }
          />
        </div>
        <div className="grid sm:grid-cols-2 grid-cols-1 gap-5 ">
          <ReusableSelect
            defaultValue={frequency}
            onValueChange={setFrequency}
            className="my-4"
            placeholder="frequency"
            options={[
              {
                label: PaymentFrequency.MONTHLY,
                value: PaymentFrequency.MONTHLY,
              },
              {
                label: PaymentFrequency.ONE_OFF,
                value: PaymentFrequency.ONE_OFF,
              },
              {
                label: PaymentFrequency.QUARTERLY,
                value: PaymentFrequency.QUARTERLY,
              },
            ]}
          />
          <InputField
            type="number"
            name="commission"
            placeholder="Commission (%)"
            className="mt-2"
            value={commision}
            onChange={(e) => setCommision(Number(e.target.value))}
          />

          <InputField
            type="date"
            label="Due Date for Payment"
            name="dateDue"
            placeholder="Due date"
            value={dueDate ? dueDate.toISOString().split("T")[0] : ""}
            onChange={(e) => setDueDate(new Date(e.target.value))}
          />
        </div>
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
