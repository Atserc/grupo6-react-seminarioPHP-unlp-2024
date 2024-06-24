import { BASE_URL } from '../../../constants'

async function deleteData({link, setLoading, method = 'DELETE'}) {
  try { 
    const response = await fetch(`${BASE_URL}${link}`, {
     method: method
   })
   if (!response.ok) {
    let res = await response.json();
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