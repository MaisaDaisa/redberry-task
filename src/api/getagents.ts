import axios from "axios";

const token = import.meta.env.VITE_TOKEN;


const getAgents = async () => {
    axios.get('https://api.real-estate-manager.redberryinternship.ge/api/agents', {
        headers: {
          'accept': 'application/json',
          'Authorization': 'Bearer ' + token 
        }
      }).then((response) => {
        console.log(response.data);
      }).catch((error) => {
        console.log(error)
        });
    }