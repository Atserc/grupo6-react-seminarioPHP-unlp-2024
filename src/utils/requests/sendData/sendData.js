import { BASE_URL } from '../../../constants';

export default async function sendData({ link, data = null, setLoading, method = 'POST', setData = null }) {
  console.log(`${BASE_URL}${link}`, ' URL');
  if (setLoading) {
    setLoading(true);
  }
  try {
    const response = await fetch(`${BASE_URL}${link}`, {
      method: method,
      headers: {
        'Content-Type': 'application/json'
      },
      // body: data ? JSON.stringify(data) : null
      body: JSON.stringify(data)
    });

    const responseData = await response.json();
    //console.log(responseData);
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


/* import { BASE_URL } from '../../../constants'

export default async function sendData({link, data = null, setLoading, method = 'POST', setData = null}) {
  console.log(`${BASE_URL}${link}`,' URL')
  try {
    const response = await fetch(`${BASE_URL}${link}`, {
      method: method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    if (!response.ok) {
      let res = await response.json();
      console.log(res, 'HOLA')
      if (setData){
        setData(res);
      }
      
      return res;
    }

    // Intentar convertir la respuesta a JSON
    const responseData = await response.json();
    console.log(responseData, 'HOLA')
    //setData(responseData);
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
    // return { error: error.message };
  }finally {
    setLoading(false);
  }
}
*/