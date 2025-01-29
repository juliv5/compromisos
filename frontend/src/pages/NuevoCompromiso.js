import React, { useState } from "react";
import { registrarCompromiso } from "../services/api";

const NuevoCompromiso = () => {
  const [compromiso, setCompromiso] = useState({
    nombreLider: "",
    descripcion: "",
    responsable: "",
    correoResponsable: "",
    municipio: "",
  });

  const handleChange = (e) => {
    setCompromiso({ ...compromiso, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await registrarCompromiso(compromiso);
    alert("Compromiso registrado");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="nombreLider" placeholder="Nombre del líder" onChange={handleChange} required />
      <input type="text" name="descripcion" placeholder="Descripción" onChange={handleChange} required />
      <input type="text" name="responsable" placeholder="Responsable" onChange={handleChange} required />
      <input type="email" name="correoResponsable" placeholder="Correo" onChange={handleChange} required />
      <input type="text" name="municipio" placeholder="Municipio" onChange={handleChange} required />
      <button type="submit">Guardar Compromiso</button>
    </form>
  );
};

export default NuevoCompromiso;
