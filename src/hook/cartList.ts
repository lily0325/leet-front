import { ref, watch } from 'vue'
// 购物车数据hook 能够返回购物车数据与购物车更新方法
export const useCartList = (data: any) => {
    // 购买商品个数
    const count = ref(0)
    // 购物车列表
    const cartList = ref([])
    // 合计价钱
    const total = ref(0);
    // 添加商品个数
    const shoppingAdd = (record: any) => {
        count.value += 1;
        // 获取到添加的对应商品信息
        const addCart = data.value.find((e: any) => e.product_id === record.product_id);
        // 如果购物车里面已经有该商品，就
        if (cartList.value.find((e: any) => e.product_id === addCart.product_id)) {
            // 浅拷贝了
            addCart["num"] += 1;
            // cartList.value[cartList.value.findIndex((e: any) => e.product_id === addCart.product_id)].num += 1;
        } else {
            addCart["num"] = 1;
            addCart["key"] = cartList.value.length;
            cartList.value.push(addCart);
        }
    };
    // 减少商品个数
    const shoppingReduce = async (record: any) => {
        cartList.value[record.key].num -= 1;
        if (cartList.value[record.key].num <= 0) {
            // cartList删除数量为0的数据，并更改数组删除数据后面的数据的key值
            cartList.value = cartList.value.filter((e: any) => e.num > 0)
                .map((item: any) => { if (item.key > record.key) item.key -= 1; return item });
        }
        count.value === 1 ?
            clearAll() : count.value -= 1
    };
    // 监听购物车cartList变化total合计价钱
    watch(
        cartList,
        (newValue: any[]) => {
            total.value = 0;
            newValue.forEach((item) => {
                total.value += item.product_price * item.num;
            });
        },
        { deep: true }
    );
    // computed对数组的监控不太行
    // const total = computed(() => cartList ? cartList.value.forEach((item: any) => {
    //     total.value += item.product_price * item.num;
    // }) : cartList.length)
    // 清空购物车
    const clearAll = () => {
        cartList.value = [];
        count.value = 0;
    };

    return { cartList, clearAll, count, total, shoppingReduce, shoppingAdd } as const
}

