<template>
  <a-table :columns="drawer_columns" :data-source="cartList">
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
  </a-table>
  <div class="submit">
    <div>合计:￥{{ total }}</div>
    <a-button type="primary" danger @click="clearAll">清空</a-button>
    <a-button type="primary" @click="submit" disabled>结算</a-button>
  </div>
</template>

<script setup>
import { defineProps, ref } from "vue";
import { useCartList } from "../hook/cartList";
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
  },

  {
    title: "数量",
    dataIndex: "num",
    key: "num",
    width: "150px",
    align: "center",
  },
];
const prop = defineProps(["data"]);

const { count, total, clearAll, cartList, shoppingReduce, shoppingAdd } =
  useCartList(prop.data);
const submit = () => {
  const submit_data = JSON.parse(JSON.stringify(cartList));
  console.log(submit_data);
};
</script>

<style scoped lang="less">
.submit {
  position: absolute;
  width: 350px;
  top: 10px;
  right: 30px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  div {
    height: 30px;
    line-height: 30px;
    font-size: 16px;
    font-weight: 800;
    margin-left: 100px;
  }
}
</style>