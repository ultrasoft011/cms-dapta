import React, { useState, useEffect, useMemo } from "react";
import { DaptaSdk } from "dapta-sdk";
import "bootstrap/dist/css/bootstrap.min.css";

export const ProgramasUniversitarios = () => {
  const [programas, setProgramas] = useState([]);
  // const [editIndex, setEditIndex] = useState(null);
  // const [editNombre, setEditNombre] = useState("");
  const baseUrl = "https://api.dapta.ai/api/";
  const apiKey = "MPAo9-3cfb900f-ed55-4edc-8771-2e6cc9b16a50-f";
  const daptaSdk = useMemo(
    () => new DaptaSdk(baseUrl, apiKey),
    [baseUrl, apiKey]
  );
  const [nuevoPrograma, setNuevoPrograma] = useState({
    id_universidad: "",
    nombre_programa: "",
    snies: "",
    salario_promedio: "",
    video_programa: "",
    descripcion_video: "",
    afinidad_programa: "",
    precio: "",
    nivel: "",
    presencial: "",
    numero_semestres: "",
    creditos: "",
    jornada: "",
    boton_beca_futura: "",
    imagen_egresado: "",
    perfil_egresado: "",
    cargos_a_ocupar: [],
    diferenciales: [],
    convenios: "",
    becas_o_auxilios: "",
    titulo_que_otorga: "",
    fecha_inscripciones: "",
    inicio_de_clases: "",
    requisitos_inscripcion: [],
    plan_de_estudios: "",
  });

  useEffect(() => {
    const fetchProgramas = async () => {
      try {
        const response = await daptaSdk.executeDaptaCall(
          "futura-edtech-169-352-7/get_programas_sombrilla",
          "GET"
        );
        const programasData =
          response.response.first_action.data.response.items || [];
        setProgramas(programasData);
      } catch (error) {
        console.error("Error al obtener programas:", error);
      }
    };
    fetchProgramas();
  }, [daptaSdk]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await daptaSdk.executeDaptaCall(
        "futura-edtech-169-352-7/create_programas_sombrilla",
        "POST",
        undefined,
        nuevoPrograma,
        undefined,
        undefined
      );
      setProgramas([...programas, nuevoPrograma]);
      setNuevoPrograma({
        // ... (reinicia los datos del nuevo programa)
      });
      console.log(response)
    } catch (error) {
      console.error("Error al agregar programa:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setNuevoPrograma({ ...nuevoPrograma, [name]: newValue });
  };

  // const editarPrograma = async () => {
  //   if (editIndex !== null && editNombre.trim() !== "") {
  //     try {
  //       const response = await daptaSdk.executeDaptaCall(
  //         "futura-edtech-169-352-7/update_programas_sombrilla",
  //         "PUT",
  //         {},
  //         { nombre: editNombre }
  //       );
  //       if (response.status === 200) {
  //         const nuevosProgramas = [...programas];
  //         nuevosProgramas[editIndex].nombre_programa = editNombre;
  //         setProgramas(nuevosProgramas);
  //         setEditIndex(null);
  //         setEditNombre("");
  //       } else {
  //         console.error("Error al editar programa.");
  //       }
  //     } catch (error) {
  //       console.error("Error al editar programa:", error);
  //     }
  //   }
  // };

  const eliminarPrograma = async (index) => {
    try {
      const response = await daptaSdk.executeDaptaCall(
        `futura-edtech-169-352-7/delete_programas_sombrilla`,
        "DELETE",
        undefined,
        undefined,
        undefined,
        { id: programas[index].id }
      );
      const nuevosProgramas = [...programas];
      nuevosProgramas.splice(index, 1);
      setProgramas(nuevosProgramas);
      console.log(response.response.first_action);
      return response;
    } catch (error) {
      console.error("Error al eliminar programa:", error);
    }
  };

  // const handleEditClick = (index, programa) => {
  //   setEditIndex(index);
  //   setEditNombre(programa.nombre_programa);
  // };

  const handleEliminarClick = (index) => {
    eliminarPrograma(index);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-5">Programas Universitarios</h2>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="nombre_programa" className="form-label">
                Nombre del programa
              </label>
              <input
                type="text"
                name="nombre_programa"
                className="form-control"
                value={nuevoPrograma.nombre_programa}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="snies" className="form-label">
                Snies
              </label>
              <input
                type="text"
                name="snies"
                className="form-control"
                value={nuevoPrograma.snies}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="Semestres" className="form-label">
                Semestres
              </label>
              <input
                type="text"
                inputMode="numeric"
                name="Semestres"
                className="form-control"
                value={nuevoPrograma.numero_semestres}
                onChange={(e) => {
                  const newValue = e.target.value.replace(/\D/g, ""); // Elimina caracteres que no sean números
                  setNuevoPrograma({
                    ...nuevoPrograma,
                    numero_semestres: newValue,
                  });
                }}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="precio" className="form-label">
                Precio
              </label>
              <input
                type="text"
                name="precio"
                className="form-control"
                value={nuevoPrograma.precio}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="creditos" className="form-label">
                Créditos
              </label>
              <input
                type="text"
                name="creditos"
                className="form-control"
                value={nuevoPrograma.creditos}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="nivel" className="form-label">
                Nivel
              </label>
              <input
                type="text"
                name="nivel"
                className="form-control"
                value={nuevoPrograma.nivel}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* ... (otros campos del nuevo programa) */}
        <button type="submit" className="btn btn-primary">
          Agregar Programa
        </button>
      </form>
      <div className="row mt-5">
        <div className="col-md-4">
          <h4>Programa</h4>
        </div>
        <div className="col-md-1">
          <h4>Snies</h4>
        </div>
        <div className="col-md-2">
          <h4>Semestres</h4>
        </div>
        <div className="col-md-2">
          <h4>Créditos</h4>
        </div>
        <div className="col-md-1">
          <h4>Acciones</h4>
        </div>
      </div>

      {programas.map((programa, index) => (
        <div key={index} className="row mt-2">
          <div className="col-md-4">
            <p>{programa.nombre_programa}</p>
          </div>
          <div className="col-md-1">
            <p>{programa.snies}</p>
          </div>
          <div className="col-md-2">
            <p>{programa.numero_semestres}</p>
          </div>
          <div className="col-md-2">
            <p>{programa.creditos} créditos</p>
          </div>
          <div
            className="col-md-1"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <button
              // onClick={() => editarPrograma(index)}
              class="btn btn-warning"
              style={{ padding: "0px 6px", margin: "2px" }}
            >
              Editar
            </button>
            <button
              onClick={() => handleEliminarClick(index)}
              className="btn btn-danger"
              style={{ padding: "0px 6px", margin: "2px" }}
            >
              Eliminar
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
