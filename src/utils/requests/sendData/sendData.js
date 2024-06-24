import { BASE_URL } from '../../../constants';

export default async function sendData({ link, data = null, setLoading, method = 'POST', setData = null }) {
  if (setLoading) {
    setLoading(true);
  }
  try {
    const response = await fetch(`${BASE_URL}${link}`, {
      method: method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    const responseData = await response.json();
    if (!response.ok) {
      setData(responseData);
      throw new Error(responseData.error);
    }

    if (setData) {
      setData(responseData);
    }
    
    return responseData;
    
  } catch (error) {
    console.log('Error en la solicitud:', error);
    return error;
  } finally {
    if (setLoading) {
      setLoading(false);
    }
  }
}