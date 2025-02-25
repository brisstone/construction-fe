import { Route, Routes } from "react-router-dom";
import AdminLayout from "./components/layout/AdminLayout";
import Login from "./pages/authentication/Login";
import "react-datepicker/dist/react-datepicker.css";
import Dashboard from "./pages/admin/dashboard/Dashboard";
import Project from "./pages/admin/project/Project";
import ProjectDetails from "./pages/admin/project/ProjectDetails";
import Budget from "./pages/admin/project/Budget";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />}></Route>

        <Route path="/admin">
          <Route path="" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="projects" element={<Project />} />
            <Route path="project-detail" element={<ProjectDetails />} />
            <Route path="project-detail/budget" element={<Budget />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
