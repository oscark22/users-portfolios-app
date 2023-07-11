import { createBrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
]);
