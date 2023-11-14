import React, { useState, useMemo } from "react";
import { Modal, Button } from "react-bootstrap";
import { DaptaSdk } from "dapta-sdk";
import useFetchProgramas from "../hooks/useFetchProgramas";
import useHandleSubmit from "../hooks/useHandleSubmit ";
import "bootstrap/dist/css/bootstrap.min.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Estilo predeterminado de Quill

export const ProgramasUniversitarios = () => {
  const [showModal, setShowModal] = useState(false);
  const [showCargosModal, setShowCargosModal] = useState(false);
  const [showDescripcionModal, setShowDescripcionModal] = useState(false);
  const handleShowCargos = () => setShowCargosModal(true);
  const handleCloseCargos = () => setShowCargosModal(false);
  const handleShowDescripcion = () => setShowDescripcionModal(true);
  const handleCloseDescripcion = () => setShowDescripcionModal(false); // Función para manejar la apertura del modal
  const handleShow = () => setShowModal(true);

  // Función para manejar el cierre del modal
  const handleClose = () => setShowModal(false);

  // Variables de estados iniciales
  const [programas, setProgramas] = useState([]); // Setiar los programas
  const [ordenAscendente, setOrdenAscendente] = useState(null); // Estado para ordenar los programas
  const [programasOrdenados, setProgramasOrdenados] = useState([]); // Estado para ordenar los programas
  const [editIndex, setEditIndex] = useState(null); // Indice para editar el programa
  const [searchTerm, setSearchTerm] = useState("");
  // Constantes de dapta para endpoints / apikey
  const baseUrl = "https://api.dapta.ai/api/";
  const apiKey = "MPAo9-3cfb900f-ed55-4edc-8771-2e6cc9b16a50-f";
  const daptaSdk = useMemo(
    () => new DaptaSdk(baseUrl, apiKey),
    [baseUrl, apiKey]
  ); // useMemo para memorizar el resultado de la función de daptaSdk
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

  // Custom Hook para traer programas sombrilla (GET-endpoint)
  useFetchProgramas(daptaSdk, setProgramas, setProgramasOrdenados);

  // Nueva función para llamar updateOrdered
  const handleSearch = () => {
    updateOrderedProgramas(programas, searchTerm); // Llama a la nueva función de búsqueda
  };

  // Usa el hook
  const handleSubmit = useHandleSubmit(
    daptaSdk,
    programas,
    setProgramas,
    setProgramasOrdenados,
    editIndex,
    setEditIndex,
    nuevoPrograma,
    setNuevoPrograma
  );

  // Manejo del submit del form para crear o editar un programa
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     if (editIndex !== null) {
  //       // En el modo de edición, utiliza una solicitud PUT para actualizar el programa existente.
  //       const response = await daptaSdk.executeDaptaCall(
  //         `futura-edtech-169-352-7/update_programas_sombrilla`,
  //         "PUT",
  //         undefined,
  //         nuevoPrograma,
  //         undefined,
  //         { id: programas[editIndex].id }
  //       );
  //       const nuevosProgramas = [...programas];
  //       nuevosProgramas[editIndex] = nuevoPrograma;
  //       setProgramas(nuevosProgramas);
  //       setProgramasOrdenados(nuevosProgramas);
  //       setEditIndex(null);
  //       setNuevoPrograma({
  //         id_universidad: "",
  //         nombre_programa: "",
  //         snies: "",
  //         salario_promedio: "",
  //         video_programa: "",
  //         descripcion_video: "",
  //         afinidad_programa: "",
  //         precio: "",
  //         nivel: "",
  //         presencial: "",
  //         numero_semestres: "",
  //         creditos: "",
  //         jornada: "",
  //         boton_beca_futura: "",
  //         imagen_egresado: "",
  //         perfil_egresado: "",
  //         cargos_a_ocupar: [],
  //         diferenciales: [],
  //         convenios: "",
  //         becas_o_auxilios: "",
  //         titulo_que_otorga: "",
  //         fecha_inscripciones: "",
  //         inicio_de_clases: "",
  //         requisitos_inscripcion: [],
  //         plan_de_estudios: "",
  //       });
  //       console.log(response.response.first_action);
  //     } else {
  //       // En el modo de creación, utiliza una solicitud POST para crear un nuevo programa.
  //       const response = await daptaSdk.executeDaptaCall(
  //         "futura-edtech-169-352-7/create_programas_sombrilla",
  //         "POST",
  //         undefined,
  //         nuevoPrograma,
  //         undefined,
  //         undefined
  //       );
  //       const nuevosProgramas = [...programas, nuevoPrograma];
  //       setProgramas(nuevosProgramas);
  //       setProgramasOrdenados(nuevosProgramas); // Actualiza programasOrdenados
  //       setNuevoPrograma({
  //         id_universidad: "",
  //         nombre_programa: "",
  //         snies: "",
  //         salario_promedio: "",
  //         video_programa: "",
  //         descripcion_video: "",
  //         afinidad_programa: "",
  //         precio: "",
  //         nivel: "",
  //         presencial: "",
  //         numero_semestres: "",
  //         creditos: "",
  //         jornada: "",
  //         boton_beca_futura: "",
  //         imagen_egresado: "",
  //         perfil_egresado: "",
  //         cargos_a_ocupar: [],
  //         diferenciales: [],
  //         convenios: "",
  //         becas_o_auxilios: "",
  //         titulo_que_otorga: "",
  //         fecha_inscripciones: "",
  //         inicio_de_clases: "",
  //         requisitos_inscripcion: [],
  //         plan_de_estudios: "",
  //       });
  //       console.log(response.response.first_action);
  //     }
  //   } catch (error) {
  //     console.error("Error al agregar/actualizar programa:", error);
  //   }
  // };

  // Modo eliminar, utiliza una solicitud DELETE para eliminar un programa existente.
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
      // Elimina el programa del array programasOrdenados
      const nuevosProgramasOrdenados = [...programasOrdenados];
      nuevosProgramasOrdenados.splice(index, 1);
      setProgramasOrdenados(nuevosProgramasOrdenados);
      console.log(response.response.first_action);
    } catch (error) {
      console.error("Error al eliminar programa:", error);
    }
  };

  // Manejo del cambio de los labels para setiear el nuevo programa
  const formatNumber = (number) => {
    const numericValue = number.replace(/\D/g, ""); // Elimina caracteres no numéricos
    const formattedValue = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, "."); // Agrega separador de miles
    return `$${formattedValue}`;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Verifica si el campo es numérico (utilizando el atributo "inputMode")
    const isNumericField = e.target.getAttribute("inputMode") === "numeric";

    // Aplica el formato solo a los campos numéricos
    const formattedValue = isNumericField ? formatNumber(value) : value;

    setNuevoPrograma({ ...nuevoPrograma, [name]: formattedValue });
  };
  // Maneja el boton editar para arreglar un programa
  const handleEditClick = (index) => {
    setEditIndex(index); // Establece el índice del programa que se va a editar
    const programaAEditar = programasOrdenados[index];
    setNuevoPrograma({ ...programaAEditar }); // Carga los datos del programa en el formulario de edición
  };
  const ordenarProgramas = (programas, ascendente) => {
    const programasOrdenados = [...programas];
    programasOrdenados.sort((a, b) => {
      const nombreA = a.nombre_programa.toLowerCase();
      const nombreB = b.nombre_programa.toLowerCase();
      return ascendente
        ? nombreA.localeCompare(nombreB)
        : nombreB.localeCompare(nombreA);
    });
    return programasOrdenados;
  };

  // // Función para ordenar programas
  // const ordenarProgramas = () => {
  //   const programasOrdenados = [...programas];
  //   programasOrdenados.sort((a, b) => {
  //     const nombreA = a.nombre_programa.toLowerCase();
  //     const nombreB = b.nombre_programa.toLowerCase();
  //     return nombreA.localeCompare(nombreB);
  //   });
  //   return programasOrdenados;
  // };

  // Función para ordenar programas de A-Z o viceversa
  const toggleOrden = () => {
    let newAscendente = null;

    if (ordenAscendente === null) {
      newAscendente = true;
    } else if (ordenAscendente) {
      newAscendente = false;
    }

    setOrdenAscendente(newAscendente);
    updateOrderedProgramas(programas, searchTerm); // Llama a la nueva función de ordenar
  };

  // Función para ordenar programas de A-Z o viceversa
  // const toggleOrden = () => {
  //   if (ordenAscendente === null) {
  //     setProgramasOrdenados(ordenarProgramas(programasOrdenados)); // Ordenar de A a Z
  //     setOrdenAscendente(true);
  //   } else if (ordenAscendente) {
  //     setProgramasOrdenados(ordenarProgramas(programasOrdenados).reverse()); // Ordenar de Z a A
  //     setOrdenAscendente(false);
  //   } else {
  //     // Dejar los programas en el estado original
  //     setProgramasOrdenados([...programas]);
  //     setOrdenAscendente(null);
  //   }
  // };

  // Filtra los programas basado en el término de búsqueda
  const filterProgramas = (programas, searchTerm) => {
    return programas.filter((p) =>
      p.nombre_programa.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  // Nueva función para actualizar programasOrdenados
  const updateOrderedProgramas = (programas, searchTerm) => {
    const filtered = filterProgramas(programas, searchTerm);

    let ordered = filtered;

    if (ordenAscendente !== null) {
      ordered = ordenarProgramas(filtered, ordenAscendente);
    }
    setProgramasOrdenados(ordered);
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
        <h5 className="mb-4">Programas Universitarios</h5>

        <form onSubmit={handleSubmit}>
          <div className="row" style={{ fontSize: "0.8rem" }}>
            <div className="col-md-3">
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
            <div className="col-md-3">
              <div className="mb-3">
                <label htmlFor="snies" className="form-label">
                  Snies
                </label>
                <input
                  type="number"
                  name="snies"
                  pattern="[0-9]*"
                  className="form-control"
                  value={nuevoPrograma.snies}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-md-3">
              <div className="mb-3">
                <label htmlFor="precio" className="form-label">
                  Precio
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  name="precio"
                  className="form-control"
                  value={nuevoPrograma.precio}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-md-3">
              <div className="mb-3">
                <label htmlFor="salario_promedio" className="form-label">
                  Salario promedio
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  name="salario_promedio"
                  className="form-control"
                  value={nuevoPrograma.salario_promedio}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className="row" style={{ fontSize: "0.8rem" }}>
            <div className="col-md-3">
              <div className="mb-3">
                <label htmlFor="semestres" className="form-label">
                  Semestres
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  name="semestres"
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
            <div className="col-md-3">
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
            <div className="col-md-3">
              <div className="mb-3">
                <label htmlFor="presencial" className="form-label">
                  Presencial
                </label>
                <input
                  type="text"
                  name="presencial"
                  className="form-control"
                  value={nuevoPrograma.presencial}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-md-3">
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
            <div className="col-md-3">
              <div className="mb-3">
                <label htmlFor="jornada" className="form-label">
                  Jornada
                </label>
                <input
                  type="text"
                  name="jornada"
                  className="form-control"
                  value={nuevoPrograma.jornada}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-md-3">
              <div className="mb-3">
                <label htmlFor="titulo_que_otorga" className="form-label">
                  Titulo que otorga
                </label>
                <input
                  type="text"
                  name="titulo_que_otorga"
                  className="form-control"
                  value={nuevoPrograma.titulo_que_otorga}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-md-3">
              <div className="mb-3">
                <label htmlFor="fecha_inscripciones" className="form-label">
                  Fecha Inscripciones
                </label>
                <input
                  type="text"
                  name="fecha_inscripciones"
                  className="form-control"
                  value={nuevoPrograma.fecha_inscripciones}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-md-3">
              <div className="mb-3">
                <label htmlFor="inicio_de_clases" className="form-label">
                  Fecha inicio de clases
                </label>
                <input
                  type="text"
                  name="inicio_de_clases"
                  className="form-control"
                  value={nuevoPrograma.inicio_de_clases}
                  onChange={handleChange}
                />
              </div>
            </div>
            {/* <div className="col-md-2">
              <div className="mb-3">
                <label htmlFor="afinidad_programa" className="form-label">
                  Afinidad
                </label>
                <input
                  type="text"
                  name="afinidad_programa"
                  className="form-control"
                  value={nuevoPrograma.afinidad_programa}
                  onChange={handleChange}
                />
              </div>
            </div> */}
          </div>
          <div className="row" style={{ fontSize: "0.8rem" }}>
            <div className="col-md-3">
              <div className="mb-3">
                <label htmlFor="boton_beca_futura" className="form-label">
                  Beca Futura
                </label>
                <input
                  type="text"
                  name="boton_beca_futura"
                  className="form-control"
                  value={nuevoPrograma.boton_beca_futura}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-md-3">
              <div className="mb-3">
                <label htmlFor="video_programa" className="form-label">
                  Video programa
                </label>
                <input
                  type="text"
                  name="video_programa"
                  className="form-control"
                  value={nuevoPrograma.video_programa}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="col-md-3">
              <div className="mb-3">
                <label htmlFor="diferenciales" className="form-label">
                  Diferenciales
                </label>
                <input
                  type="text"
                  name="diferenciales"
                  className="form-control"
                  value={nuevoPrograma.diferenciales}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-md-3">
              <div className="mb-3">
                <label htmlFor="plan_de_estudios" className="form-label">
                  Plan de estudios
                </label>
                <input
                  type="text"
                  name="plan_de_estudios"
                  className="form-control"
                  value={nuevoPrograma.plan_de_estudios}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className="row" style={{ fontSize: "0.8rem" }}>
            <div className="col-md-4">
              <div className="mb-3">
                <label htmlFor="convenios" className="form-label">
                  Convenios
                </label>
                <input
                  type="text"
                  name="convenios"
                  className="form-control"
                  value={nuevoPrograma.convenios}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="mb-3">
                <label htmlFor="becas_o_auxilios" className="form-label">
                  Becas/Auxilios
                </label>
                <input
                  type="text"
                  name="becas_o_auxilios"
                  className="form-control"
                  value={nuevoPrograma.becas_o_auxilios}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="col-md-4">
              <div className="mb-3">
                <label htmlFor="requisitos_inscripcion" className="form-label">
                  Requisitos de inscripción
                </label>
                <input
                  type="text"
                  name="requisitos_inscripcion"
                  className="form-control"
                  value={nuevoPrograma.requisitos_inscripcion}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div
              className="row  justify-content-center text-center mt-2"
              style={{ fontSize: "0.8rem" }}
            >
              <div className="col-md-4">
                <div className="mb-3">
                  <Button
                    onClick={handleShow}
                    style={{
                      background: "rgb(241, 160, 55)",
                      border: "1px solid rgb(241, 160, 55)",
                    }}
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
                    Perfil Egresado
                  </Button>
                  <Modal show={showModal} onHide={handleClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>Editar Texto</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <ReactQuill
                        value={nuevoPrograma.perfil_egresado}
                        onChange={(valueEgresado) =>
                          setNuevoPrograma({
                            ...nuevoPrograma,
                            perfil_egresado: valueEgresado,
                          })
                        }
                      />
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleClose}>
                        Cerrar
                      </Button>
                      <Button variant="primary" onClick={handleClose}>
                        Guardar Cambios
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </div>
              </div>
              <div className="col-md-4">
                <div className="mb-3">
                  <Button
                    onClick={handleShowCargos}
                    style={{
                      background: "rgb(241, 160, 55)",
                      border: "1px solid rgb(241, 160, 55)",
                    }}
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
                    Cargos a Ocupar
                  </Button>
                  <Modal show={showCargosModal} onHide={handleCloseCargos}>
                    <Modal.Header closeButton>
                      <Modal.Title>Editar Texto</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <ReactQuill
                        value={nuevoPrograma.cargos_a_ocupar}
                        onChange={(valueCargos) =>
                          setNuevoPrograma({
                            ...nuevoPrograma,
                            cargos_a_ocupar: valueCargos,
                          })
                        }
                      />
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleCloseCargos}>
                        Cerrar
                      </Button>
                      <Button variant="primary" onClick={handleCloseCargos}>
                        Guardar Cambios
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </div>
              </div>
              <div className="col-md-4">
                <div className="mb-3">
                  <Button
                    onClick={handleShowDescripcion}
                    style={{
                      background: "rgb(241, 160, 55)",
                      border: "1px solid rgb(241, 160, 55)",
                    }}
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
                    Descripción Programa
                  </Button>
                  <Modal
                    show={showDescripcionModal}
                    onHide={handleCloseDescripcion}
                  >
                    <Modal.Header closeButton>
                      <Modal.Title>Editar Texto</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <ReactQuill
                        value={nuevoPrograma.descripcion_video}
                        onChange={(valueDescripcion) =>
                          setNuevoPrograma({
                            ...nuevoPrograma,
                            descripcion_video: valueDescripcion,
                          })
                        }
                      />
                    </Modal.Body>
                    <Modal.Footer>
                      <Button
                        variant="secondary"
                        onClick={handleCloseDescripcion}
                      >
                        Cerrar
                      </Button>
                      <Button
                        variant="primary"
                        onClick={handleCloseDescripcion}
                      >
                        Guardar Cambios
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </div>
              </div>
            </div>
          </div>

          {/* ... (otros campos del nuevo programa) */}
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
            {editIndex !== null ? "Confirmar Programa" : "Agregar Programa"}
          </button>
        </form>
      </div>
      <div style={{ display: "flex", alignItems: "center", marginTop: "10px" }}>
        <input
          style={{
            flex: 5,
            padding: "10px",
            border: "1.5px solid #ccc",
            borderRadius: "4px 0 0 4px",
          }}
          type="text"
          placeholder="Buscar programa..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />
        <button
          style={{
            flex: 1,
            padding: "10px",
            border: "1.5px solid #ccc",
            borderRadius: "0 4px 4px 0",
            marginLeft: "-1px",
            cursor: "pointer",
            fontWeight: 'bold'
          }}
          onClick={handleSearch}
        >
          Buscar
        </button>
      </div>

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
            <p style={{ marginBottom: 0 }}> Programa</p>
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
          <div className="col-md-2 mt-2">
            <p className="text-center" style={{ marginBottom: 0 }}>
              Snies
            </p>
          </div>
          <div className="col-md-2 mt-2">
            <p className="text-center" style={{ marginBottom: 0 }}>
              Nivel
            </p>
          </div>
          <div className="col-md-1 mt-2">
            <p className="text-center" style={{ marginBottom: 0 }}>
              Semestres
            </p>
          </div>
          <div className="col-md-2 mt-2">
            <p className="text-center" style={{ marginBottom: 0 }}>
              Créditos
            </p>
          </div>
          <div className="col-md-2 mt-2 d-flex justify-content-center">
            <p style={{ marginBottom: 0, paddingRight: "2.5rem" }}>Acciones</p>
          </div>
        </div>

        {programasOrdenados.map((programa, index) => (
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
                {programa.nombre_programa}
              </p>
            </div>
            <div className="col-md-2 mt-1">
              <p className="text-center">{programa.snies}</p>
            </div>
            <div className="col-md-2 mt-1">
              <p className="text-center">{programa.nivel}</p>
            </div>
            <div className="col-md-1 mt-1">
              <p className="text-center">{programa.numero_semestres}</p>
            </div>

            <div className="col-md-2 mt-1">
              <p className="text-center">{programa.creditos}</p>
            </div>
            <div
              className="col-md-2"
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
                onClick={() => eliminarPrograma(index)}
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
};
