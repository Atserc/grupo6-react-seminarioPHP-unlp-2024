import { BASE_URL } from '../../../constants'

export default async function sendData({link, data, setLoading, method = 'POST', setData}) {
  try {
    const response = await fetch(`${BASE_URL}${link}`, {
      method: method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    if (!response.ok) {
      throw new Error(`Network response was not ok, status: ${response.status}`);
    }

    // Intentar convertir la respuesta a JSON
    const responseData = await response.json();
    setData(responseData);
    return responseData;
    // .then(response => response.json())
    // .then((payload) => {
      
    //   setData(payload)
    //  return payload
    // })
    // .catch(error => console.log(error))
    // .finally(() => setLoading(false));
  } catch (error) {
    console.error('Error en la solicitud:', error);
    return { error: error.message };
  }finally {
    setLoading(false);
  }
}
