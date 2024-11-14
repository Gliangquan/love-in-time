<template>
  <div class="uni-number-box">
    <div
      @mousedown.prevent="handleMouseDown('minus')"
      @mouseup.prevent="handleMouseUp('minus')"
      @click="decrease"
      class="minus-btn num-btn"
    >
      <img :src="isMinusPressed? numIcon[0].icon_on : numIcon[0].icon" class="backicon" alt="icon" />
    </div>
    <div class="num-value">
      <span>{{ currentValue }}</span>
    </div>
    <div
      @mousedown.prevent="handleMouseDown('plus')"
      @mouseup.prevent="handleMouseUp('plus')"
      @click="increase"
      class="plus-btn num-btn"
    >
      <img :src="isPlusPressed? numIcon[1].icon_on : numIcon[1].icon" class="backicon" alt="icon" />
    </div>
  </div>
</template>

<script>
import { Logger } from 'sass';
import { ref, defineComponent, watch } from 'vue';

export default defineComponent({
  name: 'numberBox',
  props: {
    // 传入的初始数字，默认为0
    initialValue: {
      type: Number,
      default: 0
    }
  },
  setup(props, context) {
    const numIcon = [
      { icon: "../../static/numBoxIcon/minus.png", icon_on: "../../static/numBoxIcon/minus-on.png" },
      { icon: "../../static/numBoxIcon/plus.png", icon_on: "../../static/numBoxIcon/plus-on.png" },
    ];

    // 定义当前数字的响应式数据，初始值为传入的初始值
    const currentValue = ref(props.initialValue);

    // 增加数字的方法
    const increase = () => {
      currentValue.value++;
    };

    // 增加数字的方法
    const decrease = () => {
      if (currentValue.value > 0) {
        currentValue.value--;
      }
    };

    // 监听当前数字的变化，当变化时向外发出事件
    watch(currentValue, (newValue) => {
      context.emit('update:value', newValue);
    });

    // 用于记录减号按钮是否按下的状态
    const isMinusPressed = ref(false);
    // 用于记录加号按钮是否按下的状态
    const isPlusPressed = ref(false);

    const handleMouseDown = (type) => {
			console.log("down");
      if (type === 'minus') {
        isMinusPressed.value = true;
      } else if (type === 'plus') {
        isPlusPressed.value = true;
      }
    };

    const handleMouseUp = (type) => {
			console.log("up");
      if (type === 'minus') {
        isMinusPressed.value = false;
      } else if (type === 'plus') {
        isPlusPressed.value = false;
      }
    };

    return {
      currentValue,
      increase,
      decrease,
      numIcon,
      isMinusPressed,
      isPlusPressed,
      handleMouseDown,
      handleMouseUp
    };
  }
});
</script>

<style lang="scss">
.uni-number-box {
  display: flex;
  align-items: center;
	}

 .num-value {
    width: 10%;
    background-color: #ffd9eb;
  }

 .minus-btn {
  }

 .plus-btn {
  }

 .num-btn {
    border-radius: 50%;
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }

 .backicon {
    width: 15px;
    height: 15px;
}
</style>