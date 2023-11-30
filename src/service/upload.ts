import axios from 'axios'
export const upload = (formData: any) => {
    return axios.post('/api/bigfile/upload',
        formData
        , {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
    )
}
export const check = (formData: any) => {
    return axios.post('/api/bigfile/check',
        formData
        , {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
    )
}