// 返回一个异步，并且PDF文件返回读取后的结果
export const pdf2Preview = (file: File) => {
    return new Promise((resolve) => {
        // 读取文件流
        const reader = new FileReader()
        // 文件加载
        reader.onload = (e) => {
            const data = e.target?.result
            resolve(data);
        }
        reader.readAsArrayBuffer(file)
    })

}