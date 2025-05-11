// // App.tsx
// import React from 'react';
// import { useForm } from 'react-hook-form';

// type FormData = {
//   name: string;
//   email: string;
//   age: number;
//   occupation: string;
// };

// function App() {
//   const { register, handleSubmit, reset } = useForm<FormData>();

//   const onSubmit = async (data: FormData) => {
//     const { name, food, calories, date } = data;
  
//     // Asegurate de encodear los parámetros por si tienen caracteres especiales
//     const url = `http://localhost:8000/api/user_food/${encodeURIComponent(name)}${encodeURIComponent(food)}${encodeURIComponent(calories)}${encodeURIComponent(date)}`;
  
//     try {
//       const response = await fetch(url, {
//         method: 'POST',
//       });
  
//       if (!response.ok) throw new Error('Error al enviar los datos');
  
//       const result = await response.json();
//       console.log('Respuesta del servidor:', result);
  
//       reset(); // Limpia el formulario
//     } catch (error) {
//       console.error('Error en el POST:', error);
//     }
//   };
  

//   return (
//     <div>
//       <h2>Crear usuario</h2>
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <input placeholder="ID" type="number" {...register('ID')} />
//         <input placeholder="Comida" {...register('Comida')} />
//         <input placeholder="Calorias" type="number" {...register('Calorias')} />
//         <input type="Date" {...register('Date')} />
//         <button type="submit">Enviar</button>
//       </form>
//     </div>
//   );
// }

// export default App;
