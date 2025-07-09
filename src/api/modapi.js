import axios from "axios";

export const modApi = axios.create({
	baseURL : 'http://localhost:8000/api/mod',
}) 