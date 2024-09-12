import axios from "axios";

const token = import.meta.env.VITE_TOKEN;

const BaseUrl = 'https://api.real-estate-manager.redberryinternship.ge/api';


const getAgents = async () => {
    axios.get(BaseUrl+'/agents', {
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