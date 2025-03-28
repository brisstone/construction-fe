import ClientTable from "@/components/clientDetail/ClientTable";
import FilterLayout from "@/components/general/FilterLayout";
import Pagination from "@/components/general/Pagination";
import ReusableDialog from "@/components/general/ReuseableDialog";
import Container from "@/components/layout/Container";
import TopHeader from "@/components/ui/TopHeader";
import { PageTypes } from "@/utils";
import { useState } from "react";
import AddClient from "./AddClient";
import useGetClients, {
  ClientType,
} from "@/hooks/api/queries/clients/getClients";
import { useAuthStore } from "@/store/authStore";

const ClientDetail = () => {
  const [openClient, setOpenClient] = useState(false);

  const [editClient, setEditClient] = useState<ClientType | null>(null);

  const { currentUser } = useAuthStore();

  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 7;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const params: Record<string, string | number> = {
    limit: entriesPerPage,
    page: currentPage,
  };
  const { data: client, isPending } = useGetClients(
    currentUser?.companyId || "",
    params
  );

  const clientData = client?.data;

  const totalEntries = clientData?.length || 0;
  const paginatedData = clientData?.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  const handleEdit = (client: ClientType) => {
    setEditClient(client);
    setOpenClient(true);
  };

  const handleModalClose = () => {
    setOpenClient(false);
    setEditClient(null);
  };

  return (
    <Container>
      <TopHeader
        className="my-5"
        title="Client Details"
        text="Add New Clients"
        onClick={() => {
          setEditClient(null);
          setOpenClient(true);
        }}
      />
      {isPending ? (
        <div className="text-center">Loading...</div>
      ) : (
        <>
          <FilterLayout pageKey={PageTypes?.CLIENTS} />
          <ClientTable onEdit={handleEdit} clientData={paginatedData ?? []} />
          <Pagination
            currentPage={currentPage}
            totalEntries={totalEntries}
            entriesPerPage={entriesPerPage}
            onPageChange={handlePageChange}
          />
        </>
      )}
      {
        <ReusableDialog
          title={
            editClient
              ? "Edit Client Information"
              : "Enter New Client Information"
          }
          open={openClient}
          onOpenChange={setOpenClient}
          className="sm:max-w-[60vw]"
        >
          <div>
            <AddClient
              handleModalClose={handleModalClose}
              defaultValues={editClient || undefined}
              isEditMode={!!editClient}
            />
          </div>
        </ReusableDialog>
      }
    </Container>
  );
};

export default ClientDetail;
