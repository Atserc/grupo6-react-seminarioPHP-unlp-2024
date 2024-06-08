import { BASE_URL } from '../../../constants'
export default function deleteData({link, id, setLoading, method = 'DELETE'}) {
  return fetch(`${BASE_URL}${link}`, {
     method: method
   })
   .then(response => response.json())
   .then((payload) => {
     return payload;
   })
   .catch(error => console.log(error['error']))
   .finally(() => console.log('termine'));
}