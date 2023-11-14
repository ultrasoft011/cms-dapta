import { useEffect } from "react";

const useFetchProgramas = (daptaSdk, setProgramas, setProgramasOrdenados) => {
  useEffect(() => {
    const fetchProgramas = async () => {
      try {
        const response = await daptaSdk.executeDaptaCall(
          "futura-edtech-169-352-7/get_programas_sombrilla",
          "GET"
        );
        console.log(response.response.first_action);
        const programasData =
          response.response.first_action.data.response.items || [];
        setProgramas(programasData);
        // Actualiza también la copia de programas ordenados
        setProgramasOrdenados(programasData);
      } catch (error) {
        console.error("Error al obtener programas:", error);
      }
    };

    fetchProgramas();
  }, [daptaSdk, setProgramas, setProgramasOrdenados]);
};

export default useFetchProgramas;
