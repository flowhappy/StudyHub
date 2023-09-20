<template>
  <el-menu class="el-menu-demo" mode="horizontal">
    <el-menu-item style="cursor: pointer;width: 50vw;font-size: 4.6rem;text-align: center" @click="stopShare_">Stop Share
    </el-menu-item>

  </el-menu>
</template>

<script>
export default {
  name: "stopShareMenu",
  data() {
    return {};
  },
  methods: {
    stopShare_() {
      this.stopShare()
    }
  },
  props: [
    'stopShare'
  ]
}
</script>

<style scoped>

</style>