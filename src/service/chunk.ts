import { upload, check } from './upload'
import { MD5 } from '../utils/MD5'
import { message } from 'ant-design-vue';
const chunkSize = 10 * 1024 * 1024;//10Mb
export const chunk = async (file: File, percent: any) => {
    // 创建hash
    const hash = await MD5(file)
    console.log(hash)

    // 文件分片
    let result = [];
    for (let i = 0; i < file.size; i += chunkSize) {
        result.push(file.slice(i, i + chunkSize))
    }
    // 后端是否已存在该文件
    let isExist = false;
    // 是否已经check过
    let isCheck = false;

    // 根据分片数量构建formdata用于上传文件
    for (let i = 0; i < result.length;) {
        if (!isExist) {
            // 检查是否后端已经有该文件
            const formData = new FormData() as any;
            formData.append('chunk', result[i])
            formData.append('hash', hash)
            formData.append('name', file.name)
            formData.append('num', i)
            formData.append('total', result.length)
            if (!isCheck) {
                const res = await check(formData)
                console.log(res.data)
                if (res.data > -1) {
                    i = res.data + 1;
                } else {
                    isCheck = true;
                }
            }
            // 进行分片上传并更新进度条
            await upload(formData).then((res: any) => {
                isExist = res.data;
                percent.value = i * 100 / (result.length - 1);
            });
            if (isExist) {
                percent.value = 100;
                break;
            }
            i++;
        }
    }
    message.success("上传成功");
};