import axios from "axios";


export default async function sendUser(user?: string) {
    let r;
    await axios.post('http://localhost:8000/followers', { user: user }
    ).then((response) => {
        r = response.data
    }).catch((err) => {

    })
    return r
}