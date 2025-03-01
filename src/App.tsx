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

function App() {
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
            <Route path="project/:id/budget/workStage" element={<WorkStage />} />
            <Route path="project/:id/payment-schedule" element={<PaymentSchedule />} />
            <Route path="project/:id/tasks" element={<Task />} />
            <Route path="settings" element={<Setting />} />
            <Route path="settings/materials" element={<MaterialComp />} />
            <Route path="settings/amenities" element={<Amenities />} />
            <Route path="settings/units" element={<Units />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
