<template>
  <h1><span class="title">上传Execl文件</span></h1>
  <h1>
    <a-upload
      class="upload flex-center"
      name="file"
      :showUploadList="false"
      @change="handleChange"
      @customRequest="customRequest"
    >
      <a-button> 点击上传Execl文件 </a-button>
    </a-upload>
  </h1>

  <div class="execl_name" v-if="showExecl">
    {{ name }}
  </div>
  <div class="flex-center preview_table" id="preview-table" v-html="html"></div>
</template>

<script setup>
// import { UploadOutlined } from "@ant-design/icons-vue";
import { ref } from "vue";
import { file2Preview } from "../utils/execl";
const name = ref("");
const showExecl = ref(false);
const customRequest = () => {};
const html = ref("");
const handleChange = async (info) => {
  name.value = info.file.originFileObj.name;
  html.value = await file2Preview(info.file.originFileObj);
  showExecl.value = true;
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
.execl_name {
  text-align: center;
  font-size: 20px;
}

.preview_table {
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