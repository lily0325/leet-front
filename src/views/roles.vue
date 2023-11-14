<template>
  <h1><span>文件上传</span></h1>
  <!-- <a-upload-dragger
    v-model:fileList="fileList"
    name="file"
    :multiple="true"
    action="/api/files/upload"
    @change="handleChange"
    @drop="handleDrop"
  >
    <p class="ant-upload-drag-icon">
      <inbox-outlined></inbox-outlined>
    </p>
    <p class="ant-upload-text">点击或者拖拽到此区域来上传文件</p>
    <p class="ant-upload-hint">
      Support for a single or bulk upload. Strictly prohibit from uploading
      company data or other band files
    </p>
  </a-upload-dragger> -->
  <h1>
    <a-upload
      class="upload"
      v-model:file-list="fileList"
      action="/api/files/upload"
      :show-upload-list="{ showDownloadIcon: true }"
      @change="handleChange"
      @download="download"
    >
      <a-button>
        <upload-outlined></upload-outlined>
        点击文件上传
      </a-button>
    </a-upload>
  </h1>
</template>

<script setup>
import { ref } from "vue";
import { InboxOutlined } from "@ant-design/icons-vue";
import { message } from "ant-design-vue";
import { IDownload } from "../service/download";
const fileList = ref([]);
const handleChange = (info) => {
  const status = info.file.status;
  if (status !== "uploading") {
    // console.log(fileList.value);
  }
  if (status === "done") {
    message.success(`${info.file.name} file uploaded successfully.`);
    console.log(info.fileList[0]);
    // fileList.value = info.fileList;
  } else if (status === "error") {
    message.error(`${info.file.name} file upload failed.`);
  }
};
const download = async (value) => {
  console.log("download!!");
  console.log(value.response);
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
</script>

<style lang="less" scoped>
h1 {
  display: flex;
  span {
    font-size: 30px;
    margin: 0 auto;
  }
}
</style>