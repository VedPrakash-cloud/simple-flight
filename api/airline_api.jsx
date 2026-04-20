import axios from "axios";

const AIRLINE_KEY = import.meta.env.VITE_AIRLINE_AUTH_KEY;

export default async function FetchLogo(query) {
  if(!query) return;

  console.log(query);
  try{
    const fetchData = await axios.get('https://api.airhex.com/v1/logos',{
      params:{codes:query},
      headers:{Authorization:`Bearer ${AIRLINE_KEY}`}
    })
    return fetchData.data;
  }catch(err){
    console.error('error in getting the airline detail', err.response?.data || err.message);
    return null;
  }  
}
