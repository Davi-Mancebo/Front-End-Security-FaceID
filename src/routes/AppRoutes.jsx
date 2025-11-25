import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Analysis from "../pages/Analysis";
import PinCode from "../pages/PinCode";


export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      {/*Inicio das rotas ADM*/}
      <Route path="/admin/password" element={<PinCode />} />
      <Route path="/admin/analysis" element={<Analysis />} />
    </Routes>
  );
}
