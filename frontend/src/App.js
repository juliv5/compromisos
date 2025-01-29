import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ListaCompromisos from "./pages/ListaCompromisos";
import NuevoCompromiso from "./pages/NuevoCompromiso";
import AdminView from "./pages/AdminView";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ListaCompromisos />} />
        <Route path="/nuevo" element={<NuevoCompromiso />} />
        <Route path="/admin" element={<AdminView />} />
      </Routes>
    </Router>
  );
}

export default App;
