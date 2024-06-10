import { BASE_URL } from '../../../constants'

function editData({link, id, setLoading, method = 'PUT'}) {
    return fetch(`${BASE_URL}${link}/${id}`, {
         method: method
     })
     .then(response => response.json())
     .then((payload) => {
         return payload;
     })
     .catch(error => console.log(error['error']))
     .finally(() => setLoading(false));
}

export default editData;