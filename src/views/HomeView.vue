<template>
  <div>
    <div class="cont">
      <!-- 弄成可以拖拽放置的 -->
      <dragblock></dragblock>
    </div>
  </div>
</template>
<script setup lang="ts">
import dragblock from "../components/dragblock.vue";
</script>
<style lang="less">
.cont {
  display: flex;
  width: 100%;
  height: 80vh;
}
</style>