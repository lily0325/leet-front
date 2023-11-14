import axios from 'axios'
export const ILogin = async (username: string, password: string) => {
    return await axios({
        method: 'post',
        url: '/api/hello/login',
        data: {
            username,
            password
        },
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(({ data }) => data)

}
