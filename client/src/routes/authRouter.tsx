import { Routes, Route } from "react-router-dom";
import { Login } from "../pages/Login";
import { SignUp } from "../pages/SignUp";
import { PacientList } from "../pages/PacientList";
import { Pacient } from "../pages/Pacient";
import { PacientCreation } from "../pages/PacientCreation";

export function AuthRouter() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/pacients" element={<PacientList />} />
      <Route path="/pacients/:id" element={<Pacient />} />
      <Route path="/pacients/create" element={<PacientCreation />} />
    </Routes>
  );
}
