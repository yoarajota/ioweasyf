import axios from "axios";


export default function sendUser(user?: string) {
    try {
        axios.post('http://localhost:8000/followers', { user: user }
        ).then((response) => {
            return response
        })
    } catch (err) {

    }
}