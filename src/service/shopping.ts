import axios from 'axios'
export const IFind = async () => {
    return await axios.get('/api/cart/findAll').then(({ data }: any) => {
        return data
    })
}
export const ISubmit = async (cartdata: any) => {
    return await axios({
        method: 'post',
        url: '/api/cart/submit',
        data: JSON.stringify(cartdata),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((res: any) => res)

}