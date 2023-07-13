import { createBrowserRouter } from "react-router-dom";
import App from "./pages/App";
import ProjectDisplay from "./pages/ProjectDisplay";
import Login from "./pages/Login";
import CreateProject from "./pages/AddProyect";

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
]);
