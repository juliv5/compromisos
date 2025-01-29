import React, { useEffect, useState } from "react";
import { obtenerCompromisos, marcarCumplido, eliminarCompromiso } from "../services/api";

const ListaCompromisos = () => {
  const [compromisos, setCompromisos] = useState([]);
  const [contraseña, setContraseña] = useState("");

  useEffect(() => {
    cargarCompromisos();
  }, []);

  const cargarCompromisos = async () => {
    const { data } = await obtenerCompromisos();
    setCompromisos(data);
  };

  const handleMarcarCumplido = async (id) => {
    const observaciones = prompt("Ingrese cómo se cumplió el compromiso:");
    if (observaciones) {
      await marcarCumplido(id, observaciones);
      cargarCompromisos();
    }
  };

  const handleEliminar = async (id) => {
    const pass = prompt("Ingrese la contraseña de administrador:");
    if (pass === "admin123") {
      await eliminarCompromiso(id, pass);
      cargarCompromisos();
    } else {
      alert("Contraseña incorrecta.");
    }
  };

  return (
    <div>
      <h2>Lista de Compromisos</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Nombre del Líder</th>
            <th>Descripción</th>
            <th>Responsable</th>
            <th>Correo</th>
            <th>Municipio</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {compromisos.map((compromiso) => (
            <tr key={compromiso._id}>
              <td>{compromiso.nombreLider}</td>
              <td>{compromiso.descripcion}</td>
              <td>{compromiso.responsable}</td>
              <td>{compromiso.correoResponsable}</td>
              <td>{compromiso.municipio}</td>
              <td style={{ color: getColor(compromiso.estado) }}>{compromiso.estado}</td>
              <td>
                {compromiso.estado !== "Cumplido" && (
                  <button onClick={() => handleMarcarCumplido(compromiso._id)}>✔ Cumplido</button>
                )}
                <button onClick={() => handleEliminar(compromiso._id)}>🗑 Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Función auxiliar para asignar colores al estado
const getColor = (estado) => {
  switch (estado) {
    case "Activo":
      return "green";
    case "Pendiente":
      return "yellow";
    case "Vencido":
      return "red";
    case "Cumplido":
      return "blue";
    default:
      return "black";
  }
};

export default ListaCompromisos;
