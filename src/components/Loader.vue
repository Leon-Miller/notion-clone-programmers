<template>
  <div
    v-show="loading"
    v-cloak
    :style="{
      width: `${size}px`,
      height: `${size}px`,
      borderWidth: `${width}px`,
      borderColor: color
    }"
    class="loader"></div>
</template>

<script>
export default {
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    size: {
      type: Number,
      default: 12
    },
    width: {
      type: Number,
      default: 2
    },
    color: {
      type: String,
      default: '#333'
    }
  }
}
</script>

<style lang="scss" scoped>
.loader {
  flex-shrink: 0;
  border-style: solid;
  border-color: rgba(0,0,0,.05);
  border-radius: 50%;
  border-top-color: transparent !important;
  animation: spin .8s linear infinite;
}
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
[v-cloak] {
  display: none;
}
</style>