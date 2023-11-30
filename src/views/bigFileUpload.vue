<template>
  <h1><span class="title">上传大文件</span></h1>
  <h1>
    <a-upload
      class="upload flex-center"
      action="/api/files/upload"
      name="file"
      :showUploadList="showList"
      :beforeUpload="handleChange"
    >
      <a-button> 点击上传 </a-button>
    </a-upload>
  </h1>
  <h1>{{ filename }}</h1>
  <a-progress :percent="percent" :show-info="false" v-if="filename" />
</template>

<script setup>
import { ref } from "vue";
import { chunk } from "../service/chunk";
const filename = ref("");
const percent = ref(0);
const showList = ref(true);
// 阻止原生上传 实行手动上传
const handleChange = async (file) => {
  console.log(file);
  // 小于10Mb的文件用回普通上传方式，其他的用大文件上传方式
  if (file.size < 10485760) {
    showList.value = true;
    return true;
  } else {
    filename.value = file.name;
    chunk(file, percent);
    showList.value = false;
    return false;
  }
};
</script>

<style lang="less">
h1 {
  text-align: center;
  .title {
    font-size: 30px;
  }
  .upload {
    margin: 0 auto;
  }
}
.execl_name {
  text-align: center;
  font-size: 20px;
}
</style>