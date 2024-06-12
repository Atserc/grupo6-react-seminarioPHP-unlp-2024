// import { BASE_URL } from '../../../constants'

// function deleteData({link, id, setLoading, method = 'DELETE'}) {
//   return fetch(`${BASE_URL}${link}/${id}`, {
//      method: method
//    })
//    .then(response => response.json())
//    .then((payload) => {
//      return payload;
//    })
//    .catch(error => console.log(error['error']))
//    .finally(() => setLoading(false));
// }

// export default deleteData;

import { BASE_URL } from '../../../constants'

async function deleteData({link, id, setLoading, method = 'DELETE'}) {
  try { 
    const response = await fetch(`${BASE_URL}${link}/${id}`, {
     method: method
   })
   if (!response.ok) {
    console.log(response)
    let res = await response.json();
    
    return res;
   }
   const responseData = await response.json();
    return responseData;
  } catch(error) {
    console.log(error)
    return error
  } finally {
    setLoading(false);
  }
}

export default deleteData;