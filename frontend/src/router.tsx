import { createBrowserRouter } from "react-router-dom";
import App from "./pages/App";
import ProjectDisplay from "./pages/ProjectDisplay";
import Login from "./pages/Login";

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
]);
