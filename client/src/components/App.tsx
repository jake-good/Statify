import { Route, Routes } from "react-router-dom";
import Login from "../routes/Login";
import Redirect from "../routes/redirect";
import Stats from "../routes/stats";
import RequireAuth from "./RequireAuth";

function App() {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="*" element={<Login />} />
      <Route path="redirect" element={<Redirect />} />
      <Route element={<RequireAuth />}>
        <Route path="stats" element={<Stats />} />
      </Route>
    </Routes>
  );
}

export default App;
