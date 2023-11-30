<template>
  <h1><span class="title">文件上传</span></h1>
  <!-- 文件上传组件 -->
  <h1>
    <a-upload
      class="upload"
      v-model:file-list="fileList"
      list-type="picture"
      action="/api/files/upload"
      :show-upload-list="{ showDownloadIcon: true }"
      @change="handleChange"
      @download="download"
      @preview="preview"
    >
      <a-button>
        <upload-outlined></upload-outlined>
        点击文件上传
      </a-button>
    </a-upload>
  </h1>
  <!-- 右侧弹出框 -->
  <a-drawer
    v-model:open="open"
    class="custom-class"
    root-class-name="root-class-name"
    :root-style="{ color: 'black' }"
    style=""
    title="文件预览"
    placement="right"
    @after-open-change="afterOpenChange"
    width="80vw"
  >
    <div class="name">{{ execl_name }}</div>
    <div id="preview_box"></div>
    <vue-office-excel v-model:src="excel_src" v-if="excel_src" />
    <vue-office-pdf v-model:src="pdf_src" v-if="pdf_src" />
  </a-drawer>
</template>

<script setup>
import { ref } from "vue";
import VueOfficePdf from "@vue-office/pdf";
import VueOfficeExcel from "@vue-office/excel";
import { InboxOutlined } from "@ant-design/icons-vue";
import { message } from "ant-design-vue";
import { IDownload, IPreview } from "../service/download";
import { file2Preview } from "../utils/execl";
import { pdf2Preview } from "../utils/pdf";
// 上传文件
const fileList = ref([]);
const handleChange = (info) => {
  const status = info.file.status;
  if (status === "done") {
    message.success(`${info.file.name} file uploaded successfully.`);
  } else if (status === "error") {
    message.error(`${info.file.name} file upload failed.`);
  }
};
const download = async (value) => {
  await IDownload(value.response).then((res) => {
    const link = document.createElement("a");
    let blob = new Blob([res.data], { type: "application/octet-stream" });
    link.style.display = "none";
    // 兼容不同浏览器的URL对象
    const url = window.URL || window.webkitURL || window.moxURL;
    link.href = url.createObjectURL(blob);
    const download_filename = res.config.params.filename
      .toString()
      .split("-")[1];
    link.download = download_filename; //下载的文件名称
    link.click();
    window.URL.revokeObjectURL(url);
  });
};

const open = ref(false);
const execl_name = ref("");
const pdf_src = ref("");
const excel_src = ref("");
// 右侧弹出框 预览文件内容(Execl+Pdf)
const preview = async (file) => {
  execl_name.value = file.name.split(".").shift(); //取出第一项
  const ext = file.name.split(".").pop(); //取出最后一项
  // Execl
  if (ext === "xlsx") {
    open.value = true;
    pdf_src.value = "";
    // const html = await file2Preview(file.originFileObj);
    // document.getElementById("preview_box").innerHTML = html;
    excel_src.value = await file2Preview(file.originFileObj, "other");
  }
  // pdf预览
  if (ext === "pdf") {
    open.value = true;
    excel_src.value = "";
    // src.value = await pdf2Preview(file.originFileObj);
    await IPreview(file.response).then((res) => {
      //拿到之后去读取
      let blob = new Blob([res.data], {
        type: "application/pdf",
      });
      // 兼容不同浏览器的URL对象
      const url = window.URL || window.webkitURL || window.moxURL;
      pdf_src.value = url.createObjectURL(blob);
    });
  }
};
</script>

<style lang="less">
h1 {
  // display: flex;
  text-align: center;
  .title {
    font-size: 30px;
  }
  .upload {
    margin: 0 auto;
  }
}
.name {
  text-align: center;
  font-size: 20px;
  color: blue;
}
.upload {
  text-align: center;
}
#preview_box {
  // background-color: blue;
  display: flex;
  table-layout: fixed;
  text-align: center;
  align-items: center;
  table {
    margin-left: auto;
    margin-right: auto;
    border: 1px solid rgb(145, 145, 145);
    margin-top: 10px;
  }
  th {
    border: 1px solid #000;
  }
  td {
    word-wrap: break-word;
    word-break: break-all;
    border: 1px solid #000;
    text-align: center;
    min-width: 20px;
    height: 20px;
    line-height: 20px;
    padding: 4px;
    color: rgb(65, 65, 65);
  }
}
</style>