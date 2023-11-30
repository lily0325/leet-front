// 自定义指令lazy的配置
export const config = {
    mounted(el: Element, binding: any) {
        // el是img标签
        // binding是输入的值，也就是图片地址
        // console.log(binding)
        const callback = (entries: any) => {
            entries.forEach((e: any) => {
                if (e.isIntersecting) {
                    // 将传入的图片链接转换成图片当前的src
                    el.setAttribute('src', binding.value)
                    // 观察器解除
                    observer.unobserve(el);
                }
            });
        }
        // 创建观察器并绑定
        const observer = new IntersectionObserver(callback, { threshold: 0.9 })
        observer.observe(el);
    },

}