<template>
  <div class="fix">
    <a-tooltip color="rgb(0, 21, 41)" @openChange="openChange">
      <template #title>
        <a-qrcode :value="text" type="svg" />
      </template>
      <a-button type="primary" shape="circle"><QrcodeOutlined /></a-button>
    </a-tooltip>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { QrcodeOutlined } from "@ant-design/icons-vue";
import { useRoute } from "vue-router";
const text = ref("");
const route = useRoute();

const openChange = () => {
  text.value = "localhost:8888" + route.path;
};
</script>

<style>
.fix {
  position: fixed;
  top: 15px;
}
</style>