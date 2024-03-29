import React from "react";
import ReactDOM from "react-dom";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import "font-awesome/css/font-awesome.min.css";
import ErrorPage from "./routes/error-page";
import Stats from "./routes/stats";
import Redirect from "./routes/redirect";
import Login from "./routes/Login";
import "./App.less";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";

const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: "stats",
    element: <Stats />,
  },
  {
    path: "*",
    element: <Navigate to="/" />,
  },
  {
    path: "redirect",
    element: <Redirect />,
  },
]);

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
  </QueryClientProvider>,
  document.getElementById("root")
);
