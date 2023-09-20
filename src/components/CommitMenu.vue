<template>
  <el-menu class="el-menu-demo" mode="horizontal">
    <el-menu-item style="cursor: pointer;width: 5vw;font-size: 2rem;padding: 0;text-align: center" @click="startEdit_">
      Quit
    </el-menu-item>
    <el-menu-item style="cursor: pointer;width:45vw;padding-left: 5rem;font-size: 4.6rem" @click="share">Share Edit
    </el-menu-item>
    <el-menu-item style="cursor: pointer;width: 50vw;font-size: 4.6rem;text-align: center" @click="publish_">Update
    </el-menu-item>

  </el-menu>
</template>

<script>
export default {
  name: "commitMenu",
  data() {
    return {};
  },
  methods: {
    publish_() {
      this.publish()
    },
    startEdit_() {
      this.$router.back()
    },
  },
  props: [
    'publish',
    'startEdit',
    'welcomeFade',
    'share'
  ]
}
</script>

<style scoped>

</style>