import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "regenerator-runtime/runtime";
import Root from "./routes/root";
import CssBaseline from "@mui/material/CssBaseline";
import Home from "./components/home/home";
import Maps from "./components/maps/maps";
import Bookmarks from "./components/bookmarks/bookmarks";
import DetailCard from "./components/card/detailCard";
import PlaceDetail from "./components/place/placeDetail"; // Importez correctement placeDetail
import "./fonts.css";
import "./index.css";
import "./transitions.css";

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
        element: <Maps />,
      },
      {
        path: "/bookmarks",
        element: <Bookmarks />,
      },
    ],
  },
  {
    path: "/page/:id",
    element: <DetailCard />,
  },
  {
    path: "/place/:id",
    element: <PlaceDetail />,
  },
  {
    path: "*",
    element: <h1>Not Found</h1>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CssBaseline />
    <RouterProvider router={router} />
  </React.StrictMode>
);
