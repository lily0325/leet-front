import axios from 'axios'
export const IFind = async () => {
    return await axios.get('/api/hello/find').then(({ data }) => {
        return data
    })
}

export const IAdd = async (username: string, password: string) => {
    return await axios.get('/api/hello/add', {
        params: {
            username,
            password
        }
    })
}

export const IDel = async (id: number) => {
    return await axios.get('/api/hello/del', {
        params: {
            id
        }
    }).then(({ data }) => {
        return data
    })
}

export const IChg = async (id: number, password: string) => {
    return await axios.get('/api/hello/change', {
        params: {
            id, password
        }
    }).then(({ data }) => {
        return data
    })
}