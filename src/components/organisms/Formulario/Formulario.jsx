// import React, { useState, useEffect } from 'react';
// import { StyledInput, SubmitButton } from '../'
// import { sendData } from '../../../utils/requests';

// function handleSubmit(event){
//     event.preventDefault();
//     sendData({link: 'tipos_propiedad', method:'POST', data: formData, setLoading: setLoading, setData})
// };
    
// function handleInputChange(event) {
//     setInputValue(event.target.value);
//     console.log(event.target.value);
//     console.log(inputValue, 'VALOR DEI NPUT')
// };

// function renderTipoPropiedad() {
//     return (
//         <div className="flex items-center justify-center h-full">
//             <form 
//                 onSubmit={handleSubmit} 
//                 className="bg-white p-6 rounded shadow-md w-full max-w-sm"
//             >
//                 <h2 className="text-2xl mb-4 text-center">Crear tipo de propiedad</h2>
//                 {/* {data && <p className={data ? 'text-red-500':'text-green-500'}>{data ? data : data}</p>} */}
//                 <div className="mb-4">
//                 <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="textInput">
//                     Nombre
//                 </label>
//                 <StyledInput name="nombre" value={inputValue} onChange={handleInputChange}/>
//                 </div>
//                 <div className="flex justify-center">
//                 <SubmitButton text="Agregar Tipo"/>
//                 </div>
//             </form>
//         </div>
//     )
// }

// function renderPropiedad() {
//     return (
//         <div></div>
//     )
// }

// function renderReserva() {
//     return (
//         <div></div>
//     )
// }

// export default function Formulario(type) {
//     const [render, setRender] = useState(<></>);
//     const [inputValue, setInputValue] = useState('');
//     const [loading, setLoading] = useState(true);
//     const [data, setData] = useState();
//     const [formData, setFormData] = useState({ nombre: '' });

//     useEffect(() => {
//         setFormData({ nombre: inputValue })
//     }, [inputValue])
    
//     switch(type){
//         case 'propiedad': setRender(renderPropiedad()); break;
//         case 'reserva':  setRender(renderReserva()); break;
//         case 'tipoPropiedad': setRender(renderTipoPropiedad()) ; break;
//       }
  
//     return (
//         render
//   )
// }