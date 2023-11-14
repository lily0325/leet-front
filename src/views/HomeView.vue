<template>
  <div>
    <div class="cont">
      <!-- 弄成可以拖拽放置的 -->
      <div class="network">
        <div>网络状态:{{ network }}</div>
        <div>带宽:{{ speed }}Mb/s</div>
        <div>延迟:{{ speed }}ms</div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";

const network = ref("");
const speed = ref(0);
const rtt = ref(0);
onMounted(() => {
  if (navigator.connection) {
    network.value = navigator.connection.effectiveType;
    speed.value = navigator.connection.downlink;
    rtt.value = navigator.connection.rtt;
  }
});
</script>
<style lang="less" scoped>
.cont {
  display: flex;
  width: 100%;
  .network {
    margin: 0 auto;
    width: 200px;
    height: 200px;
    background-color: rgb(111, 111, 235);
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    line-height: 50px;
    font-size: 25px;
    color: #fff;
    // 阴影
  }
}
</style>