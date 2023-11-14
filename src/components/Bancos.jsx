// Bancos.jsx

import React, { useState, useMemo } from "react";
// import { Modal, Button } from "react-bootstrap";
import useFetchBancos from "../hooks/useFetchBancos";
// import useHandleSubmitBancos from "../hooks/useHandleSubmitBancos";
import { DaptaSdk } from "dapta-sdk";

export default function Bancos() {
  const [bancos, setBancos] = useState([]);
  const [nuevoBanco, setNuevoBanco] = useState({
    imagen_fondo: "",
    logo_cliente: "",
    urls_redes: "",
    nombre_banco: "",
    sobre_el_credito: "",
    financiacion: "",
    plazo: "",
    tasa_nmv: "",
    tasa_ea: "",
    monto_minimo: "",
    credito_brochure: "",
    credito_caracteristicas: "",
    credito_requisitos: "",
  });
  const [ordenAscendente, setOrdenAscendente] = useState(null); // Estado para ordenar los programas
  const [bancosOrdenados, setBancosOrdenados] = useState([]); // Estado para ordenar los programas
  const [editIndex, setEditIndex] = useState(null); // Indice para editar el programa

  const baseUrl = "https://api.dapta.ai/api/";
  const apiKey = "jhl2b-3cfb900f-ed55-4edc-8771-2e6cc9b16a50-f";

  const daptaSdk = useMemo(
    () => new DaptaSdk(baseUrl, apiKey),
    [baseUrl, apiKey]
  );

  // Custom hooks
  useFetchBancos(daptaSdk, setBancos, setBancosOrdenados);

  //   const handleSubmit = useHandleSubmitBancos(
  //     daptaSdk,
  //     bancos,
  //     setBancos,
  //     nuevoBanco,
  //     setNuevoBanco
  //   );

  // Manejo del cambio de los labels para setiear el nuevo programa
  const formatNumber = (number) => {
    const numericValue = number.replace(/\D/g, ""); // Elimina caracteres no numéricos
    const formattedValue = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, "."); // Agrega separador de miles
    return `$${formattedValue}`;
  };

  // handleChange
  const handleChange = (e) => {
    const { name, value } = e.target;

    const isNumericField = e.target.getAttribute("inputMode") === "numeric";

    const formattedValue = isNumericField ? formatNumber(value) : value;

    setNuevoBanco({
      ...nuevoBanco,
      [name]: formattedValue,
    });
  };

  // handleEditClick
  const handleEditClick = (index) => {
    setEditIndex(index);

    const bancoAEditar = bancosOrdenados[index];

    setNuevoBanco({
      ...bancoAEditar,
    });
  };

  const eliminarBanco = async (index) => {
    // llamado API para eliminar
  };

  // Funciones ordenamiento

  const ordenarBancos = () => {
    const bancosOrdenados = [...bancos];
    bancosOrdenados.sort((a, b) => {
      const nombreA = a.nombre_banco.toLowerCase();
      const nombreB = b.nombre_banco.toLowerCase();
      return nombreA.localeCompare(nombreB);
    });

    return bancosOrdenados;
  };
  const toggleOrden = () => {
    // misma lógica que antes
    if (ordenAscendente === null) {
      setBancosOrdenados(ordenarBancos(bancosOrdenados));
      setOrdenAscendente(true);
    } else if (ordenAscendente) {
      setBancosOrdenados(ordenarBancos(bancosOrdenados).reverse());
      setOrdenAscendente(false);
    } else {
      setBancosOrdenados([...bancos]);
      setOrdenAscendente(null);
    }
  };

  return (
    <div className="container mt-4">
      <div
        style={{
          boxShadow: "7px 7px 8px 1px rgba(0.3, 0.2, 0.2, 0.1)",
          border: "1px solid #ccc",
          borderRadius: 6,
          padding: 12,
          backgroundColor: "#fff",
        }}
      >
        <h5 className="mb-4">Bancos Convenio</h5>
        <form>
          <div className="row" style={{ fontSize: "0.8rem" }}>
            <div className="col-md-3">
              <div className="mb-3">
                <label htmlFor="nombre_programa" className="form-label">
                  Imagen fondo
                </label>
                <input
                  type="text"
                  name="imagen_fondo"
                  className="form-control"
                  value={nuevoBanco.imagen_fondo}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-md-3">
              <div className="mb-3">
                <label htmlFor="nombre_programa" className="form-label">
                  Logo Cliente
                </label>
                <input
                  type="text"
                  name="logo_cliente"
                  className="form-control"
                  value={nuevoBanco.logo_cliente}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-md-3">
              <div className="mb-3">
                <label htmlFor="nombre_programa" className="form-label">
                  Url Redes
                </label>
                <input
                  type="text"
                  name="urls_redes"
                  className="form-control"
                  value={nuevoBanco.urls_redes}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-md-3">
              <div className="mb-3">
                <label htmlFor="nombre_programa" className="form-label">
                  Nombre Banco
                </label>
                <input
                  type="text"
                  name="nombre_banco"
                  className="form-control"
                  value={nuevoBanco.nombre_banco}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-md-3">
              <div className="mb-3">
                <label htmlFor="nombre_programa" className="form-label">
                  Sobre el crédito
                </label>
                <input
                  type="text"
                  name="sobre_el_credito"
                  className="form-control"
                  value={nuevoBanco.sobre_el_credito}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-md-3">
              <div className="mb-3">
                <label htmlFor="nombre_programa" className="form-label">
                  Financiación
                </label>
                <input
                  type="text"
                  name="financiacion"
                  className="form-control"
                  value={nuevoBanco.financiacion}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-md-3">
              <div className="mb-3">
                <label htmlFor="nombre_programa" className="form-label">
                  Plazo
                </label>
                <input
                  type="text"
                  name="plazo"
                  className="form-control"
                  value={nuevoBanco.plazo}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-md-3">
              <div className="mb-3">
                <label htmlFor="nombre_programa" className="form-label">
                  Taza nvm
                </label>
                <input
                  type="text"
                  name="tasa_nmv"
                  className="form-control"
                  value={nuevoBanco.tasa_nmv}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-md-3">
              <div className="mb-3">
                <label htmlFor="nombre_programa" className="form-label">
                  Monto mínimo
                </label>
                <input
                  type="text"
                  name="monto_minimo"
                  className="form-control"
                  value={nuevoBanco.monto_minimo}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-md-3">
              <div className="mb-3">
                <label htmlFor="nombre_programa" className="form-label">
                  Crédito brochure
                </label>
                <input
                  type="text"
                  name="credito_brochure"
                  className="form-control"
                  value={nuevoBanco.credito_brochure}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-md-3">
              <div className="mb-3">
                <label htmlFor="nombre_programa" className="form-label">
                  Crédito caracteristicas
                </label>
                <input
                  type="text"
                  name="credito_caracteristicas"
                  className="form-control"
                  value={nuevoBanco.credito_caracteristicas}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-md-3">
              <div className="mb-3">
                <label htmlFor="nombre_programa" className="form-label">
                  Crédito requisitos
                </label>
                <input
                  type="text"
                  name="credito_requisitos"
                  className="form-control"
                  value={nuevoBanco.credito_requisitos}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            style={{ marginTop: "2em" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-plus"
              viewBox="0 0 16 16"
            >
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
            </svg>
            {editIndex !== null ? "Confirmar Banco" : "Agregar Banco"}
          </button>
        </form>
      </div>

      {/* Listado bancos */}
      <div
        style={{
          boxShadow: "7px 7px 8px 1px rgba(0.3, 0.2, 0.2, 0.1)",
          border: "1px solid #ccc",
          borderRadius: 6,
          padding: 12,
          backgroundColor: "#fff",
          marginTop: 14,
          marginBottom: 14,
        }}
      >
        <div
          className="row mt-1"
          style={{
            fontSize: "0.9rem",
            fontWeight: 600,
            backgroundColor: "#edf2f9",
            paddingLeft: 0,
            paddingBottom: 6,
          }}
        >
          <div
            className="col-md-3 mt-2 d-flex"
            style={{ cursor: "pointer", paddingLeft: 20 }}
            onClick={toggleOrden}
          >
            <p style={{ marginBottom: 0 }}>Banco</p>
            <svg
              style={{ marginTop: "6", marginLeft: "5" }}
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              fill="currentColor"
              class="bi bi-arrow-down-up"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M11.5 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L11 2.707V14.5a.5.5 0 0 0 .5.5zm-7-14a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V1.5a.5.5 0 0 1 .5-.5z"
              />
            </svg>
          </div>
          <div className="col-md-3 mt-2">
            <p className="text-center" style={{ marginBottom: 0 }}>
              Tasa
            </p>
          </div>
          <div className="col-md-3 mt-2">
            <p className="text-center" style={{ marginBottom: 0 }}>
              Monto mínimo
            </p>
          </div>
          <div className="col-md-3 mt-2">
            <p className="text-center" style={{ marginBottom: 0 }}>
              Acciones
            </p>
          </div>
        </div>
        {bancos.map((banco, index) => (
          <div
            key={index}
            className="row mt-3"
            style={{ fontSize: "0.8rem", borderBottom: "1px solid #edf2f9" }}
          >
            <div
              className="col-md-3 mt-1"
              style={{
                color: "#4a8ee9",
                fontWeight: 600,
              }}
            >
              <p style={{ margin: "0", paddingLeft: 10 }}>
                {banco.nombre_banco}
              </p>
            </div>
            <div className="col-md-3 mt-1">
              <p className="text-center">{banco.tasa_ea}</p>
            </div>
            <div className="col-md-3 mt-1">
              <p className="text-center">{banco.monto_minimo}</p>
            </div>
            <div
              className="col-md-3 text-center"
              style={{ display: "d-flex", justifyContent: "space-around" }}
            >
              <button
                onClick={() => handleEditClick(index)}
                class="btn btn-warning"
                style={{ padding: "0px 8px", margin: "2px" }}
              >
                Editar
              </button>
              <button
                onClick={() => eliminarBanco(index)}
                className="btn btn-danger"
                style={{ padding: "0px 6px", margin: "2px" }}
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
