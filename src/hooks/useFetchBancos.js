import { useEffect } from "react";

const useFetchBancos = (daptaSdk, setBancos, setBancosOrdenados) => {
  useEffect(() => {
    const fetchBancos = async () => {
      try {
        const response = await daptaSdk.executeDaptaCall(
          "futura-edtech-169-352-7/get_bancos_sombrilla",
          "GET"
        );
        console.log("GETBANCOS");
        console.log(response.data);
        const bancosData = response.data.items || [];
        setBancos(bancosData);
        // Actualiza también la copia de programas ordenados
        setBancosOrdenados(bancosData);
      } catch (error) {
        console.error("Error al obtener bancos:", error);
      }
    };

    fetchBancos();
  }, [daptaSdk, setBancos, setBancosOrdenados]);
};

export default useFetchBancos;
