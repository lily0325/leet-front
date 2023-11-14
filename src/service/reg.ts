import axios from 'axios'
export const IReg = async (username: string, password: string) => {
    return await axios.get('/api/hello/add', {
        params: {
            username,
            password
        }
    })


}
