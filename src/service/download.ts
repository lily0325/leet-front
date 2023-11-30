import axios from 'axios'
export const IDownload = async (filename: string) => {
    return await axios.get("/api/files/download", {
        params: {
            filename
        }
    }).then((data: any) => {
        return data
    })
}
export const IPreview = async (filename: string) => {
    // 需要把响应类型设定为blob 不然默认的是json 格式就会报错
    return await axios({
        methods: 'get',
        url: `/api/files/preview?filename=${filename}`, responseType: 'blob'
    }).then((data: any) => {
        return data
    })
}