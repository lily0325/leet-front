<template>
  <h1 style="text-align: center; font-size: 30px">QRcode生成</h1>
  <h1 style="text-align: center">
    <a-space direction="vertical" align="center">
      <a-qrcode :value="text" type="svg" />
      <a-input v-model:value="text" placeholder="-" :maxlength="60" />
    </a-space>
  </h1>
  <h1 style="text-align: center; font-size: 30px">QRcode解析</h1>
  <h1 style="text-align: center"></h1>
</template>

<script setup>
import { ref } from "vue";

const text = ref("https://www.antdv.com/");
</script>

<style>
</style>