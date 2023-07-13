import { createBrowserRouter } from "react-router-dom";
import App from "./pages/App";
import ProjectDisplay from "./pages/ProjectDisplay";
import Login from "./pages/Login";
import CreateProject from "./pages/AddProject";
import UpdateProject from "./pages/UpdateProject";
import DeleteProject from "./pages/DeleteProject";
import Panel from "./pages/Panel";

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/project/:project_id",
    element: <ProjectDisplay />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/project/add",
    element: <CreateProject />,
  },
  {
    path: "/project/update",
    element: <UpdateProject />,
  },
  {
    path: "/project/delete",
    element: <DeleteProject />,
  },
  {
    path: "/panel",
    element: <Panel />,
  },
]);
