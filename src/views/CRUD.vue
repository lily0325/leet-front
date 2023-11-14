<template>
  <a-button type="primary" @click="showAdd()"
    ><PlusOutlined />添加数据</a-button
  >
  <!--表格 -->
  <a-table :columns="columns" :data-source="loading.value ? null : data">
    <template #headerCell="{ column }">
      <template v-if="column.key === 'username'">
        <span>
          <SmileOutlined />
          用户名
        </span>
      </template>
      <template v-if="column.key === 'password'">
        <span>
          <BankOutlined />
          用户密码
        </span>
      </template>
      <template v-if="column.key === 'action'">
        <span> 操作 </span>
      </template>
    </template>

    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'username'">
        <a-tooltip>
          <template #title>用户名</template>
          <a>
            {{ record.username }}
          </a>
        </a-tooltip>
      </template>
      <template v-if="column.key === 'password'">
        <a-tooltip>
          <template #title>用户密码</template>
          <a>
            {{ record.password }}
          </a>
        </a-tooltip>
      </template>
      <template v-else-if="column.key === 'action'">
        <span>
          <a-popconfirm
            title="确定要删除吗?"
            ok-text="Yes"
            cancel-text="No"
            @confirm="confirm(record.id)"
          >
            <a>删除</a>
          </a-popconfirm>
          <a-divider type="vertical" />
          <a @click="showChange(record)">编辑</a>
        </span>
      </template>
    </template>
  </a-table>
  <!-- 添加数据 -->
  <a-modal
    v-model:open="addopen"
    title="添加用户数据"
    @ok="addOK"
    style="text-align: center"
  >
    <a-space direction="vertical" style="padding-top: 20px">
      <a-input
        v-model:value="username_add"
        placeholder="用户名"
        size="large"
        style="width: 400px"
      />
      <a-input
        v-model:value="password_add"
        placeholder="用户密码"
        size="large"
      />
    </a-space>
  </a-modal>
  <!-- 编辑数据 -->
  <a-modal
    v-model:open="changeopen"
    title="编辑用户数据"
    @ok="chgOK"
    style="text-align: center"
  >
    <a-space direction="vertical" style="padding-top: 20px">
      <a-input
        v-model:value="username_chg"
        placeholder="用户名"
        size="large"
        style="width: 400px"
      />
      <a-input
        v-model:value="password_chg"
        placeholder="用户密码"
        size="large"
      />
    </a-space>
  </a-modal>
</template>
<script lang="ts" setup>
import {
  SmileOutlined,
  BankOutlined,
  PlusOutlined,
} from "@ant-design/icons-vue";
import { reactive, ref } from "vue";
const columns = [
  {
    username: "username",
    dataIndex: "username",
    key: "username",
  },
  {
    title: "password",
    dataIndex: "password",
    key: "password",
  },
  {
    title: "Action",
    key: "action",
  },
];
let loading = ref(true);
let data = reactive([]);
const addopen = ref<boolean>(false);
const changeopen = ref<boolean>(false);
const username_add = ref("");
const password_add = ref("");
const username_chg = ref("");
const password_chg = ref("");
const id_chg = ref(0);
const showAdd = () => (addopen.value = true);
const showChange = (data) => {
  changeopen.value = true;
  id_chg.value = data.id;
  username_chg.value = data.username;
  password_chg.value = data.password;
};
import { IDel, IFind, IAdd, IChg } from "../service/CRUD";
const updateData = async () => {
  const res = await IFind().then((res) => res);
  data = res;
  loading.value = !loading.value;
};
updateData();

const confirm = async (key) => {
  await IDel(key);
  // console.log(key);
  updateData();
};
const addOK = async () => {
  // console.log(username_add.value, password_add.value);
  await IAdd(username_add.value, password_add.value);
  addopen.value = !addopen.value;
  updateData();
};
const chgOK = async () => {
  await IChg(id_chg.value, password_chg.value);
  changeopen.value = !changeopen.value;
  updateData();
};
</script>

