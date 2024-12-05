<template>
    <view class="container-page3">
        <scroll-view class="scroll-view" scroll-y="true">
            <view class="list">
                <view class="list-column" v-for="(item, index) in list" :key="index" >
										<dishItemVue
											v-for="(dish, dishIndex) in item"
											:key="dishIndex"
											:imgSrc="dish.imgSrc"
											:dishName="dish.dishName"
											:dishHub="dish.dishHub"
											:price="dish.price"
											@tap="todish(dish)"
											@click="todish(dish)"
										/>
                </view>
            </view>
        </scroll-view>
    </view>
</template>

<script>
import dishItemVue from '../../components/dishItem/dishItem.vue';
import store from '../../utils/store.js';

export default {
    name: "page3",
    components: {
        dishItemVue
    },
    data() {
        return {
            column: 2, // 可随意更改列数
            list: [],  // 初始化数据列表
        };
    },
    mounted() {
        this.getColumnList();
        this.getList();
    },
    methods: {
        // 初始化列数组
        getColumnList() {
            this.list = Array.from({ length: this.column }, () => []);
        },
        // 获取数据并均匀分配到每列
        getList() {
            const data = [
                {
                    imgSrc: 'https://img.js.design/assets/img/66b48b6d0cc5e5436588b055.png#793a4402015a47fb074f9293314d333f',
                    dishName: '宫保鸡丁',
                    dishHub: '11',
                    price: '9.99'
                },
                {
                    imgSrc: 'https://img.js.design/assets/img/66b48b6d0cc5e5436588b055.png#793a4402015a47fb074f9293314d333f',
                    dishName: '辣子鸡',
                    dishHub: '22',
                    price: '12.99'
                },
                {
                    imgSrc: 'https://img.js.design/assets/img/66b48b6d0cc5e5436588b055.png#793a4402015a47fb074f9293314d333f',
                    dishName: '干锅虾',
                    dishHub: '33',
                    price: '8.99'
                },
                {
                    imgSrc: 'https://img.js.design/assets/img/66b48b6d0cc5e5436588b055.png#793a4402015a47fb074f9293314d333f',
                    dishName: '鱼',
                    dishHub: '44',
                    price: '8.99'
                },
                {
                    imgSrc: 'https://img.js.design/assets/img/66b48b6d0cc5e5436588b055.png#793a4402015a47fb074f9293314d333f',
                    dishName: '新菜品名新菜品名新菜菜5',
                    dishHub: '55',
                    price: '8.99'
                },
                {
                    imgSrc: 'https://img.js.design/assets/img/66b48b6d0cc5e5436588b055.png#793a4402015a47fb074f9293314d333f',
                    dishName: '新菜品名新菜品名新菜菜5',
                    dishHub: '55',
                    price: '8.99'
                },
                {
                    imgSrc: 'https://img.js.design/assets/img/66b48b6d0cc5e5436588b055.png#793a4402015a47fb074f9293314d333f',
                    dishName: '新菜品名新菜品名新菜菜5',
                    dishHub: '55',
                    price: '8.99'
                }
            ];
            // 将数据按列数分配到 `list` 的每一列
            data.forEach((item, index) => {
                this.list[index % this.column].push(item);
            });
        },
				todish(dish) {
					store.commit('setSelectedDish', dish);
					uni.navigateTo({
							url: '/pages/dish/dishdetails'
					});
				}
		}
};
</script>

<style scoped>
    .container-page3 {
        display: flex;
        justify-content: center;
        align-items: flex-end;
        height: 100vh;
        background-image: linear-gradient(135deg, rgb(252, 207, 232), rgb(204, 254, 255));
    }

    .scroll-view {
        width: 100%;
        height: 500px;
    }

    .list {
        display: flex;
        padding: 32rpx;
    }
    
    .list-column {
        max-width: 100%;
        flex: 1;
        margin-right: 32rpx;
    }
    
    .list-column:last-child {
        margin-right: 0;
    }
</style>