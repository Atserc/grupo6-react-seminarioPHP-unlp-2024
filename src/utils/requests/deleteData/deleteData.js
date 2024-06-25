import { BASE_URL } from '../../../constants'

async function deleteData({link, setLoading, method = 'DELETE'}) {
  try { 
    const response = await fetch(`${BASE_URL}${link}`, {
     method: method
   })
   if (!response.ok) {
    let res = await response.json();
    // console.log(response.status, 'ESTADO:')
    if(response.status === 500) {
      res.error = "No se pudo eliminar, puede ser por falla de servidor o eliminacion de una entidad que está siendo usada por otra."
    }
    return res;
   } else {
    const responseData = await response.json();
    return responseData;
   }
  } catch(error) {
   
    return error
  } finally {
    setLoading(false);
  }
}

export default deleteData;