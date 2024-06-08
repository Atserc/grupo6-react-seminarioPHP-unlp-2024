import { BASE_URL } from '../../../constants'

export default function sendData({link, data, setLoading, method = 'POST', setData}) {
  fetch(`${BASE_URL}${link}`, {
      method: method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then((payload) => {
      setData(payload)
      console.log(payload);
    })
    .catch(error => console.log(error))
    .finally(() => setLoading(false));
}
