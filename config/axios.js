import axios from "axios";

const clienteAxios = axios.create({
    baseURL : 'http://localhost:5173'
});

export default clienteAxios;