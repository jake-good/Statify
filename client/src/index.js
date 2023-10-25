import React from "react";
import ReactDOM from "react-dom";
import {
    createBrowserRouter,
    RouterProvider,
    Navigate
  } from "react-router-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import "font-awesome/css/font-awesome.min.css";
import Root from './routes/root'
import ErrorPage from './error-page'
import Stats from './routes/stats'

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
    }
  ]);

ReactDOM.render(<RouterProvider router={router} />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
