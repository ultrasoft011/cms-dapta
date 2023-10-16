// Import DaptaSdk class
import { DaptaSdk } from 'dapta-sdk';

// Initialize a DaptaSdk object instance with your Dapta API base url and your api key
const baseUrl= 'https://api.dapta.ai/api/';
const apiKey= 'MPAo9-3cfb900f-ed55-4edc-8771-2e6cc9b16a50-f';
const daptaSdk = new DaptaSdk(baseUrl, apiKey);

const CreateProgramaSombrilla = () => {

daptaSdk.executeDaptaCall(
  'futura-edtech-169-352-7/create_programas_sombrilla',
  'POST',
  undefined,
  {
    id_universidad: "847563",
    nombre_programa: "Administración",
    snies: "586869",
    salario_promedio: "4563333",
    video_programa: "",
    descripcion_video: "",
    afinidad_programa: "",
    precio: "39805958",
    nivel: "Universitario",
    presencial: "",
    numero_semestres: "9",
    creditos: "140",
    jornada: "diurna",
    boton_beca_futura: "",
    imagen_egresado: "",
    perfil_egresado: "",
    cargos_a_ocupar: "",
    diferenciales: "",
    convenios: "",
    becas_o_auxilios: "",
    titulo_que_otorga: "",
    fecha_inscripciones: "",
    inicio_de_clases: "",
    requisitos_inscripcion: "",
    plan_de_estudios: ""
  },
  {'testParamURL': 'valueParamURL'},
  [
    ['testQuery', 'valueQuery'],
  ]// Only for query params you can also use {'testQuery': 'valueQuery'} or "testQuery=valueQuery"
  ).then((response) => {
      // Returns fetch response
      console.log("RESPONSE POST: ", response)
  }).catch((error) => {
      console.error(error);
  });

  return (
    <div>
      <h1>Ejemplo create</h1>
      {/* {loading ? (
        <p>Cargando...</p>
      ) : (
        <ul>
          {posts.map((post) => (
            <li key={post.id}>{post.title}</li>
          ))}
        </ul>
      )} */}
    </div>
  );
};

export default CreateProgramaSombrilla;
