import { Route, Routes } from "react-router-dom";
import AdminLayout from "./components/layout/AdminLayout";
import Login from "./pages/authentication/Login";
import "react-datepicker/dist/react-datepicker.css";
import Dashboard from "./pages/admin/dashboard/Dashboard";
import Project from "./pages/admin/project/Project";
import ProjectDetails from "./pages/admin/project/ProjectDetails";
import Budget from "./pages/admin/project/Budget";
import PaymentSchedule from "./pages/admin/project/PaymentSchedule";
import Task from "./pages/admin/project/Task";
import WorkStage from "./components/projects/budget/GenerateBudget/WorkStage";
import Setting from "./pages/admin/settings/Setting";
import MaterialComp from "./pages/admin/settings/MaterialComp";
import Amenities from "./pages/admin/settings/Amenities";
import Units from "./pages/admin/settings/Units";
import ClientDetail from "./pages/admin/clientDetail/ClientDetail";
import Properties from "./pages/admin/project/Properties";
import DocumentPage from "./pages/admin/project/Document";
import PropertyDetail from "./pages/admin/project/PropertyDetail";
import UserPage from "./pages/admin/user/UserPage";
import SuperAdminLayout from "./components/layout/SuperAdminLayout";
import Company from "./pages/superAdmin/company/Company";
import Procurement from "./pages/admin/procurement/Procurement";
import RequisitionDetail from "./pages/admin/procurement/requisition/RequisitionDetail";
import AddRequisition from "./pages/admin/procurement/requisition/AddRequisition";
import Storage from "./pages/admin/storage/Storage";
import InventoryDetail from "./pages/admin/storage/inventory/InventoryDetail";
import AddStock from "./pages/admin/storage/inventory/AddStock";
import { useAuthStore } from "./store/authStore";
import { useEffect } from "react";

function App() {

  const { applyUserTheme } = useAuthStore();

    useEffect(() => {
      applyUserTheme();
    }, []);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />}></Route>

        <Route path="/admin">
          <Route path="" element={<AdminLayout />}>
            <Route index path="dashboard" element={<Dashboard />} />
            <Route path="project" element={<Project />} />
            <Route path="project/:id" element={<ProjectDetails />} />
            <Route path="project/:id/budget" element={<Budget />} />
            <Route path="project/:id/properties" element={<Properties />} />
            <Route
              path="project/:id/properties/:id"
              element={<PropertyDetail />}
            />
            <Route path="project/:id/documents" element={<DocumentPage />} />
            <Route
              path="project/:id/budget/workStage"
              element={<WorkStage />}
            />
            <Route
              path="project/:id/payment-schedule"
              element={<PaymentSchedule />}
            />
            <Route path="project/:id/tasks" element={<Task />} />
            <Route path="clients" element={<ClientDetail />} />
            <Route path="users" element={<UserPage />} />
            <Route path="procurement" element={<Procurement />} />
            <Route path="requistion-detail" element={<RequisitionDetail />} />
            <Route path="add-requistion" element={<AddRequisition />} />
            <Route path="storage" element={<Storage />} />
            <Route path="inventory-detail" element={<InventoryDetail />} />
            <Route path="add-stock" element={<AddStock />} />
            <Route path="settings" element={<Setting />} />
            <Route path="settings/materials" element={<MaterialComp />} />
            <Route path="settings/amenities" element={<Amenities />} />
            <Route path="settings/units" element={<Units />} />
          </Route>
        </Route>

        <Route path="/super-admin">
          <Route path="" element={<SuperAdminLayout />}>
            <Route index element={<Company />} />
          </Route> 
        </Route>
      </Routes>
    </div>
  );
}

export default App;
