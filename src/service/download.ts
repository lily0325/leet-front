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