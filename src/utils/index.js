const BASE_URL = "http://localhost:80/";

// base function to get data from all endpoints.
export function getData({link, setData, setLoading = null, method = 'GET'}) {
  fetch(`${BASE_URL}${link}`, {
      method: method
    })
    .then(response => response.json())
    .then((payload) => {
      setData(payload["data"])
    })
    .catch(error => console.log(error))
    .finally(() => setLoading(false));
}

// basic function to post/put/patch data on endpoints.
export function sendData({link, data, setLoading = null, method = 'POST', setData}) {
  console.log(data, 'DATA ENVIADA')
  fetch(`${BASE_URL}${link}`, {
      method: method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then((payload) => {
      if (payload['error']) {
        console.log(payload['error'])
        setData(payload['error'])
      } else {
        setData(payload['data'])
      }
    })
    .catch(error => console.log('error'))
    .finally(() => setLoading(false));
}

// get active nav-link-class
export const getNavLinkClass = (isActive) => {
  return isActive ? 'text-lg hover:text-xl font-bold transition-all' : 'text-lg hover:text-xl hover:font-bold transition-all duration-200';
};