<template>
  <div class="container">
    <!-- <numberBox :initialValue="5" @update:value="handleValueUpdate" /> -->
  </div>
</template>

<script>
// import numberBox from '@/components/NumberBox/NumberBox.vue';

export default {
  components: {
    // numberBox
  },
  methods: {
    handleValueUpdate(newValue) {
      console.log('更新后的数字为:', newValue);
    }
  }
};
</script>

<style>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: -webkit-linear-gradient(135deg, rgb(252, 207, 232), rgb(204, 254, 255));
}
</style>