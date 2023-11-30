import SparkMD5 from 'spark-md5'
// 返回一个异步，并且返回文件的MD5
export const MD5 = (file: File) => {
    return new Promise((resolve) => {
        // 读取文件流
        const reader = new FileReader()
        const spark = new SparkMD5.ArrayBuffer() // 构建hash值对象
        // 文件加载
        reader.onload = (e) => {
            const data = e.target?.result;
            spark.append(data)
            resolve(spark.end()) // 计算hash值
        }
        reader.readAsBinaryString(file)
    })
}