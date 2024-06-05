import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "regenerator-runtime/runtime";
import Root from "./routes/root";
import CssBaseline from "@mui/material/CssBaseline";
import Home from "./components/home/home";
import "./fonts.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/maps",
        element: <h1>Maps</h1>,
      },
      {
        path: "/nearby",
        element: <h1>Nearby</h1>,
      },
      {
        path: "/history",
        element: <h1>History</h1>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CssBaseline />
    <RouterProvider router={router} />
  </React.StrictMode>
);
