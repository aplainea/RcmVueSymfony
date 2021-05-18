import axios from 'axios'

export default() => {
    return axios.create({
        baseURL: 'https://127.0.0.1:8000/api/'
    })
}
