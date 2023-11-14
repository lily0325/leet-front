<template>
  <a-breadcrumb style="margin: 16px 0">
    <a-breadcrumb-item>User</a-breadcrumb-item>
    <a-breadcrumb-item>Bill</a-breadcrumb-item>
  </a-breadcrumb>
</template>
<script setup>
import { onMounted } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();
//用router before路由守卫
onMounted(() => {});
</script>

