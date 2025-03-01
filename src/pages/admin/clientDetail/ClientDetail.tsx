import ClientTable from "@/components/clientDetail/ClientTable"
import FilterLayout from "@/components/general/FilterLayout"
import Pagination from "@/components/general/Pagination"
import ReusableDialog from "@/components/general/ReuseableDialog"
import Container from "@/components/layout/Container"
import TopHeader from "@/components/ui/TopHeader"
import { PageTypes } from "@/utils"
import { useState } from "react"
import AddClient from "./AddClient"

const ClientDetail = () => {

  
    const [openClient, setOpenClient] = useState(false);


  return (
    <Container>
       <TopHeader
        className="my-5"
        title="Client Details"
        text="Add New Clients"
        onClick={() => setOpenClient(true)}
      />
      <FilterLayout pageKey={PageTypes?.CLIENTS}/>
      <ClientTable/>
      <Pagination />
      {
          <ReusableDialog
            title="Enter New Client Information"
            open={openClient}
            onOpenChange={setOpenClient}
            className="sm:max-w-[60vw]"
          >
            <div>
              <AddClient />
            </div>
          </ReusableDialog>
        }
    </Container>
  )
}

export default ClientDetail