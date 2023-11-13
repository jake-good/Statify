import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "font-awesome/css/font-awesome.min.css";
import "./App.less";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./context/AuthProvider";
import App from "./components/App";

const queryClient = new QueryClient();

ReactDOM.render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Routes>
          <Route path="/*" element={<App></App>}></Route>
        </Routes>
      </AuthProvider>
    </QueryClientProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
