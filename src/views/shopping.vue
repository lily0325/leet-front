<template>
  <h1 style="text-align: center; font-size: 30px">商品列表</h1>
  <a-table
    :columns="columns"
    :data-source="data ? data : null"
    :loading="isloading"
  >
    <template #headerCell="{ column }">
      <template v-if="column.key === 'product_name'">
        <span>
          <ShoppingOutlined style="font-size: 20px" />
          商品名
        </span>
      </template>
      <template v-if="column.key === 'product_price'">
        <span>
          <MoneyCollectOutlined style="font-size: 20px" />
          价格
        </span>
      </template>
      <template v-if="column.key === 'action'">
        <span> 操作 </span>
      </template>
    </template>
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'action'">
        <span @click="shoppingAdd(record)">
          <PlusCircleOutlined style="color: blue" />
        </span>
      </template>
    </template>
  </a-table>
  <a-badge :count="count" class="cart"
    ><a-button type="primary" shape="square" @click="open = !open" size="large"
      ><ShoppingCartOutlined /></a-button
  ></a-badge>

  <a-drawer
    v-model:open="open"
    class="custom-class"
    root-class-name="root-class-name"
    :root-style="{ color: 'black' }"
    style=""
    title="购物车"
    placement="right"
    @after-open-change="afterOpenChange"
    width="50vw"
  >
    <a-table
      :columns="drawer_columns"
      :data-source="cartList"
      :pagination="false"
      bordered
      :scroll="{ y: 650 }"
      sticky
      emptyText
    >
      <!-- <template #emptyText>购物车是空的</template> -->
      <template #headerCell="{ column }">
        <template v-if="column.key === 'product_name'">
          <span>
            <ShoppingOutlined style="font-size: 20px" />
            商品名
          </span>
        </template>
        <template v-if="column.key === 'product_price'">
          <span>
            <MoneyCollectOutlined style="font-size: 20px" />
            价格
          </span>
        </template>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'num'">
          <span>
            <MinusCircleOutlined @click="shoppingReduce(record)" />
            {{ record.num }}
            <PlusCircleOutlined @click="shoppingAdd(record)" />
          </span>
        </template>
      </template>
      <template #summary>
        <a-table-summary fixed align="center">
          <a-table-summary-row>
            <a-table-summary-cell
              :index="0"
              style="font-size: 20px; text-align: center"
              >合计:￥</a-table-summary-cell
            >
            <a-table-summary-cell :index="1" style="text-align: center"
              ><a-statistic :value="total"
            /></a-table-summary-cell>
            <a-table-summary-cell :index="2">
              <div class="submit">
                <a-button type="primary" danger @click="clearAll" class="btn"
                  >清空</a-button
                >
                <a-button
                  type="primary"
                  :disabled="!cartList.length"
                  @click="submit"
                  class="btn"
                  >结算</a-button
                >
              </div></a-table-summary-cell
            >
          </a-table-summary-row>
        </a-table-summary>
      </template>
    </a-table>
  </a-drawer>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { IFind, ISubmit } from "../service/shopping";
import {
  PlusCircleOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
  MoneyCollectOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons-vue";
import { useCartList } from "../hook/cartList";
import { message } from "ant-design-vue";
const data = ref([]);
const { count, total, clearAll, cartList, shoppingReduce, shoppingAdd } =
  useCartList(data);
const open = ref(false);
const isloading = ref(true);
// const changeOpen = () => (open.value = true);
const columns = [
  {
    title: "商品名",
    dataIndex: "product_name",
    key: "product_name",
    width: "300px",
    align: "center",
  },
  {
    title: "价格",
    dataIndex: "product_price",
    key: "product_price",
    width: "150px",
    align: "center",
    sorter: (a, b) => a.product_price - b.product_price,
  },
  {
    title: "分类",
    dataIndex: "product_category",
    key: "product_category",
    width: "200px",
    align: "center",
    filters: [
      {
        text: "手机数码",
        value: "手机数码",
      },
      {
        text: "户外运动",
        value: "户外运动",
      },
      {
        text: "床上用品",
        value: "床上用品",
      },
      {
        text: "日用百货",
        value: "日用百货",
      },
      {
        text: "图书杂志",
        value: "图书杂志",
      },
      {
        text: "服装服饰",
        value: "服装服饰",
      },
      {
        text: "家用电器",
        value: "家用电器",
      },
      {
        text: "汽车用品",
        value: "汽车用品",
      },
    ],
    filterMultiple: true,
    onFilter: (value, record) => record.product_category.indexOf(value) === 0,
  },
  {
    title: "数量",
    dataIndex: "product_num",
    key: "product_num",
    width: "150px",
    align: "center",
    sorter: (a, b) => a.product_num - b.product_num,
  },
  {
    title: "描述",
    dataIndex: "product_description",
    key: "product_description",
    align: "center",
    ellipsis: true,
  },
  {
    title: "",
    dataIndex: "action",
    key: "action",
    align: "center",
    width: "100px",
  },
];
const drawer_columns = [
  {
    title: "商品名",
    dataIndex: "product_name",
    key: "product_name",
    width: "200px",
    align: "center",
  },
  {
    title: "价格",
    dataIndex: "product_price",
    key: "product_price",
    width: "150px",
    align: "center",
    sorter: (a, b) => a.product_price - b.product_price,
  },

  {
    title: "数量",
    dataIndex: "num",
    key: "num",
    width: "150px",
    align: "center",
  },
];

const init = async () => {
  data.value = await IFind();
  isloading.value = false;
  open.value = false;
  clearAll();
};
onMounted(init);
const submit = async () => {
  // 深拷贝
  const submit_data = JSON.parse(JSON.stringify(cartList.value));
  submit_data.forEach((item) => {
    delete item.key;
  });
  await ISubmit(submit_data);
  init();
  message.success("购物车结算成功");
};
</script>

<style scoped lang="less">
.cart {
  position: fixed;
  top: 12vh;
}
.submit {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
</style>