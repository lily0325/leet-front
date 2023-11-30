<template>
  <a-layout style="height: 100vh">
    <a-layout-sider v-model:collapsed="collapsed" collapsible>
      <div class="logo">
        <router-link to="/"><img src="@/assets/logo.svg" /></router-link>
      </div>
      <a-menu
        v-model:selectedKeys="selectedKeys"
        theme="dark"
        mode="inline"
        :openKeys="openKeys"
        @select="select"
      >
        <a-menu-item key="1">
          <pie-chart-outlined />
          <span><router-link to="/dashboard/home">首页</router-link></span>
        </a-menu-item>
        <a-menu-item key="2">
          <desktop-outlined />
          <span><router-link to="/dashboard/crud">表单crud</router-link></span>
        </a-menu-item>
        <a-sub-menu v-if="Us.isAdmin" :inline-collapsed="true" key="sub">
          <template #title><GithubOutlined /> <span>权限页面</span></template>
          <a-menu-item key="3">
            <CloudUploadOutlined />
            <span
              ><router-link to="/dashboard/roles">文件上传</router-link></span
            >
          </a-menu-item>
          <a-menu-item key="4">
            <FireOutlined />
            <span
              ><router-link to="/dashboard/execl">Execl预览</router-link></span
            >
          </a-menu-item>
          <a-menu-item key="5">
            <RadarChartOutlined />
            <span
              ><router-link to="/dashboard/bigfile"
                >大文件上传</router-link
              ></span
            >
          </a-menu-item>
          <a-menu-item key="6">
            <FieldTimeOutlined />
            <span
              ><router-link to="/dashboard/lazy">图片懒加载</router-link></span
            >
          </a-menu-item> </a-sub-menu
        ><a-menu-item key="7">
          <FieldTimeOutlined />
          <span
            ><router-link to="/dashboard/shopping">购物车</router-link></span
          >
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0; text-align: right">
        <!-- <div v-if="user.value == 'admin'">欢迎admin！</div> -->
        <div v-if="!hasUser">
          <a-button
            type="primary"
            style="margin-right: 10px"
            @click="clickLogin"
            >登陆</a-button
          >
          <a-button style="margin-right: 20px" @click="clickRegister"
            >注册</a-button
          >
        </div>
        <h2 v-else style="margin-right: 50px; float: right">
          <GithubOutlined />欢迎<span style="color: blue">{{ user }}</span
          >用户!
          <a-button @click="logout" size="small">登出</a-button>
        </h2>
      </a-layout-header>
      <!-- 超出部分不显示 -->
      <a-layout-content style="margin: 0 16px; overflow: auto">
        <!-- <BreadCrumb></BreadCrumb> -->
        <a-watermark content="Leet Project">
          <div
            :style="{
              marginTop: '30px',
              padding: '24px',
              background: '#fff',
              minHeight: '95%',
            }"
          >
            <router-view></router-view>
          </div>
        </a-watermark>
        <fixed-box></fixed-box>
      </a-layout-content>
      <a-layout-footer style="text-align: center; font-size: 15px">
        Created by Leet
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<script lang="ts" setup>
import fixedBox from "../components/fixedBox.vue";
import {
  PieChartOutlined,
  DesktopOutlined,
  GithubOutlined,
  InstagramOutlined,
  RadarChartOutlined,
  CloudUploadOutlined,
  FireOutlined,
  FieldTimeOutlined,
} from "@ant-design/icons-vue";
import { message } from "ant-design-vue";
import { reactive, ref, watch, onBeforeMount } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useUserStore } from "../stores/User";
// import BreadCrumb from "../components/breadcrumb.vue";
const collapsed = ref<boolean>(false);
const selectedKeys = ref<string[]>(["1"]);
const router = useRouter();
const route = useRoute();
const user = ref("admin");
const Us = useUserStore();
const hasUser = ref(false);
const admin = ref(true);
const openKeys = ref(["sub"]);

const clickLogin = () => {
  router.push("/login");
};
const clickRegister = () => {
  router.push("/reg");
};
const logout = () => {
  message.success("登出成功");
  window.sessionStorage.removeItem("username");
  router.push("/login");
};

onBeforeMount(() => {
  if (Us.username) {
    user.value = Us.username;
    hasUser.value = !hasUser.value;
    // console.log(user.value);
  } else if (window.sessionStorage.getItem("username")) {
    user.value = window.sessionStorage.getItem("username");
    hasUser.value = !hasUser.value;
  }
});
onBeforeMount(() => {
  if (window.sessionStorage.getItem("select")) {
    selectedKeys.value = [window.sessionStorage.getItem("select")];
  }
  Us.changeAdmin(user.value == "admin");
});
const select = ({ item, key, selectedKeys }) => {
  window.sessionStorage.setItem("select", key);
};
</script>
<style scoped>
.logo {
  margin: 10px;
  padding-left: 10px;
  width: 50px;
  text-align: center;
}
#components-layout-demo-side .logo {
  height: 32px;
  margin: 16px;
  background: rgba(255, 255, 255, 0.3);
}

.site-layout .site-layout-background {
  background: #fff;
}
[data-theme="dark"] .site-layout .site-layout-background {
  background: #141414;
}
</style>
