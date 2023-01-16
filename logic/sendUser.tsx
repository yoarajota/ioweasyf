import axios, { AxiosResponse } from "axios";
import { Params } from "../pages";

type Response = {
    status?: string,
    data?: any
    message?: any,
}

export default async function sendUser(params?: Params): Promise<Response> {
    return await axios.post('http://localhost:8000/followers', { params: params }
    ).then(res => res.data)
}