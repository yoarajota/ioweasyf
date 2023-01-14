import axios, { AxiosResponse } from "axios";

type Response = {
    status?: string,
    data?: any
    message?: any,
}

export default async function sendUser(user?: string): Promise<Response> {
    return await axios.post('http://localhost:8000/followers', { user: user }
    ).then(res => res.data)
}