import * as XLSX from 'xlsx';
// 返回一个异步，并且返回Excel文件读取后的结果
export const file2Preview = (file: File, model = "binary") => {
    return new Promise((resolve) => {
        // 读取文件流
        const reader = new FileReader()
        // 文件加载
        reader.onload = (e) => {
            const data = e.target?.result
            if (model === "binary") {
                const workbook = XLSX.read(data, {
                    type: "binary",
                    cellDates: true,
                })
                // execl表格中的第一页
                const worksheet = workbook.Sheets[workbook.SheetNames[0]];
                // 处理成html格式
                const html = XLSX.utils.sheet_to_html(worksheet)
                resolve(html)
            } else {
                resolve(data);
            }
        }
        if (model === "binary") {
            reader.readAsBinaryString(file)//读取二进制字符串
        } else
            reader.readAsArrayBuffer(file)//读取二进制数据流
    })

}