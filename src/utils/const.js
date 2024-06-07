const BASE_URL = "http://localhost:80/";

// base function to get data from any endpoint.
export function getData(link,setData,setLoading) {
  fetch(`${BASE_URL}${link}`)
    .then(response => response.json())
    .then((payload) => {
      setData(payload["data"])
    })
    .catch(error => console.log(error))
    .finally(() => setLoading(false));
}