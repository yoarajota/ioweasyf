import axios from "axios";
import { Params } from "../pages";

export type Response = {
  status?: string;
  data?: any;
  message?: any;
};

type transformed = {
  [key: string]: Array<any> | undefined | number;
};

export default async function sendToApi(
  params?: Params | transformed
): Promise<Response> {
  return await axios
    .post("http://localhost:8000/followers", params)
    .then((res) => res.data);
}
