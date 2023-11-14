const useHandleSubmit = (
  daptaSdk,
  programas,
  setProgramas,
  setProgramasOrdenados,
  editIndex,
  setEditIndex,
  nuevoPrograma,
  setNuevoPrograma
) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editIndex !== null) {
        const response = await daptaSdk.executeDaptaCall(
          `futura-edtech-169-352-7/update_programas_sombrilla`,
          "PUT",
          undefined,
          nuevoPrograma,
          undefined,
          { id: programas[editIndex].id }
        );
        const nuevosProgramas = [...programas];
        nuevosProgramas[editIndex] = nuevoPrograma;
        setProgramas(nuevosProgramas);
        setProgramasOrdenados(nuevosProgramas);
        setEditIndex(null);
        setNuevoPrograma({
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
        console.log(response.response.first_action);
      } else {
        const response = await daptaSdk.executeDaptaCall(
          "futura-edtech-169-352-7/create_programas_sombrilla",
          "POST",
          undefined,
          nuevoPrograma,
          undefined,
          undefined
        );
        const nuevosProgramas = [...programas, nuevoPrograma];
        setProgramas(nuevosProgramas);
        setProgramasOrdenados(nuevosProgramas);
        setNuevoPrograma({
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
        console.log(response.response.first_action);
      }
    } catch (error) {
      console.error("Error al agregar/actualizar programa:", error);
    }
  };

  return handleSubmit;
};

export default useHandleSubmit;
