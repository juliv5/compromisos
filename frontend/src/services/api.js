import axios from "axios";

const API_URL = "http://localhost:5000/api/compromisos"; // Cambiar al dominio de producción luego

export const obtenerCompromisos = async () => {
  return await axios.get(`${API_URL}`);
};

export const registrarCompromiso = async (compromiso) => {
  return await axios.post(`${API_URL}/nuevo`, compromiso);
};

export const marcarCumplido = async (id, observaciones) => {
  return await axios.put(`${API_URL}/cumplido/${id}`, { observaciones });
};

export const eliminarCompromiso = async (id, contraseña) => {
  return await axios.delete(`${API_URL}/eliminar/${id}`, { data: { contraseña } });
};
