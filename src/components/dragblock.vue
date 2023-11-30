<template>
  <div ref="el" :style="style" class="drag">
    <div class="network">
      <div>网络状态:{{ network }}</div>
      <div>带宽:{{ speed }}Mb/s</div>
      <div>延迟:{{ speed }}ms</div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useDraggable } from "@vueuse/core";
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

const el = ref(null);
const { x, y, style } = useDraggable(el, {
  initialValue: { x: 1700, y: 700 },
});
// 贴住右侧
// x.value = "100px";
</script>

<style scoped lang="less">
.drag {
  position: fixed;
}
.tran {
  transition: x 0.5s linear;
}
.network {
  opacity: 0.7;
  position: relative;
  margin: 0 auto;
  width: 200px;
  height: 200px;
  background-color: rgb(175, 175, 175);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  line-height: 50px;
  font-size: 25px;
  color: #fff;
  overflow: hidden;
  box-shadow: inset 10px 20px 30px rgba(255, 255, 2255, 0.5),
    10px 10px 20px rgba(0, 0, 0, 0.3), 15px 15px 30px rgba(0, 0, 0, 0.05),
    inset -10px -20px 30px rgba(255, 255, 255, 0.3);
  div {
    pointer-events: none;
    z-index: 1;
    user-select: none;
  }
  &::after {
    // pointer-events: none;
    display: block;
    width: 40vh;
    height: 40vh;
    content: "";
    background-color: rgb(54, 156, 240);
    border-radius: 40% 40% 50% 60%;
    position: absolute;
    left: 50%;
    top: 50%;
    translate: -50% 0;
    animation: spin 5s linear infinite;
    z-index: 0;
    box-shadow: inset 10px 20px 30px rgba(255, 255, 2255, 0.5),
      10px 10px 20px rgba(0, 0, 0, 0.3), 15px 15px 30px rgba(0, 0, 0, 0.05),
      inset -10px -20px 30px rgba(255, 255, 255, 0.3);
    transition: 1s;
  }
  &:hover {
    &::after {
      top: 20%;
    }
  }
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    50% {
      transform: rotate(180deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
}
</style>