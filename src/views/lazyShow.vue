<template>
  <div
    id="cont"
    style="text-align: center; padding: 10px"
    v-for="(img, index) in imgs"
    :key="index"
  >
    <img width="800" :src="loading_gif" v-lazy="img" />
  </div>
  <div class="card" id="card"></div>
</template>

<script setup>
import { ref, onUnmounted } from "vue";
const loading_gif =
  "https://pica.zhimg.com/v2-773087a330ead06c37ddc627ee0786b6_720w.webp?source=d16d100b";
const url =
  "https://plus.unsplash.com/premium_photo-1700165913144-9abd24ec3006?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=600&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTcwMDc5Mjg4OA&ixlib=rb-4.0.3&q=80&w=800";
const array = new Array(10).fill(url);
const imgs = ref(array);

// 右键自定义菜单
// const handler = (e) => {
//   e.preventDefault();
//   const card = document.getElementById("card");
//   const position = `left:${e.clientX}px;top:${e.clientY}px`;
//   card.setAttribute("style", "display:block;" + position);
// };
// document.addEventListener("contextmenu", handler);
// document.addEventListener("mouseup", () => {
//   const card = document.getElementById("card");
//   card.setAttribute("style", "display:none;");
// });
// onUnmounted(() => {
//   document.removeEventListener("contextmenu", handler, false);
// });
</script>


<style>
.card {
  width: 200px;
  height: 250px;
  position: absolute;
  background-color: gray;
  display: none;
}
</style>