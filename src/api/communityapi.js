import axios from "axios";

export const communityApi = axios.create({
	baseURL : 'http://localhost:8000/api/community',
})