import { BASE_URL } from '../../../constants'
export default function getData({link, setData, setLoading = null, method = 'GET'}) {
  fetch(`${BASE_URL}${link}`, {
      method: method
    })
    .then(response => response.json())
    .then((payload) => {
      console.log(payload)
      setData(payload["data"])
    })
    .catch(error => console.log(error))
    .finally(() => setLoading !== null ? setLoading(false) : null);
}