import React from "react";

export const AddProgramaConvenio = () => {
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
          setProgramasOrdenados([...programas, nuevoPrograma]);
          setNuevoPrograma({
            // ... (reinicia los datos del nuevo programa)
          });
          console.log(response);
        } catch (error) {
          console.error("Error al agregar programa:", error);
        }
      };
    
  return (
    <div>
      <h2 className="mb-5">Programas Universitarios</h2>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6">
            <div className="mb-3">
              <label
                htmlFor="nombre_programa"
                className="form-label"
                style={{ fontSize: "0.8rem" }}
              >
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
    </div>
  );
};
