// import React, { useState, useEffect } from 'react';
// import { DaptaSdk } from 'dapta-sdk';


// // Initialize a DaptaSdk object instance with your Dapta API base url and your api key
// const baseUrl = 'https://api.dapta.ai/api/';
// const apiKey = 'MPAo9-3cfb900f-ed55-4edc-8771-2e6cc9b16a50-f';
// const daptaSdk = new DaptaSdk(baseUrl, apiKey);

// const ApiExample = () => {
//   // const [posts, setPosts] = useState([]);
//   // const [loading, setLoading] = useState(true);

//   // Execute a fetch
//   daptaSdk.executeDaptaCall(
//     'futura-edtech-169-352-7/get_programas_sombrilla', // Url endpoint (Required).
//     'GET', // Fetch Method: GET, POST, PUT, or DELETE (Required).
//     undefined,
//     undefined,
//     undefined,
//     undefined
//   ).then((response) => {
//   // Returns fetch response
//   console.log("RESPONSE: ", response)
// }).catch((error) => {
//   console.error(error);
// });

//   // useEffect(() => {
//   //   // Realizar la llamada a la API cuando el componente se monte
//   //   axios.get('https://api.dapta.ai/api/futura-edtech-169-352-7/get_universidades_sombrilla')
//   //     .then((response) => {
//   //       // Actualizar el estado con los datos de la API
//   //       console.log(response);
//   //       setPosts(response.data);
//   //       setLoading(false);
//   //     })
//   //     .catch((error) => {
//   //       console.error('Error al obtener datos de la API:', error);
//   //       setLoading(false);
//   //     });
//   // }, []);

//   return (
//     <div>
//       <h1>Ejemplo Data</h1>
//       {/* {loading ? (
//         <p>Cargando...</p>
//       ) : (
//         <ul>
//           {posts.map((post) => (
//             <li key={post.id}>{post.title}</li>
//           ))}
//         </ul>
//       )} */}
//     </div>
//   );
// };

// export default ApiExample;
