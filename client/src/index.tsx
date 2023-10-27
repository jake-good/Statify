import React from "react";
import ReactDOM from "react-dom";
import {
    createBrowserRouter,
    RouterProvider,
    Navigate
  } from "react-router-dom";
import "font-awesome/css/font-awesome.min.css";
import Root from './routes/root'
import ErrorPage from './routes/error-page';
import Stats from './routes/stats';
import Redirect from "./routes/redirect";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <ErrorPage />
    },
    {
        path: "stats",
        element: <Stats />,
    },
    {
      path: "*",
      element: <Navigate to='/' />
    },{
      path: 'redirect',
      element: <Redirect />
    }

  ]);

ReactDOM.render(<RouterProvider router={router} />, document.getElementById("root"));


