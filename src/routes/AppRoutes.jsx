import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Analysis from "../pages/Analysis/index";
import PinCode from "../pages/PinCode/index";


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
