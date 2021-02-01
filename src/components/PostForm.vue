<template>
  <div>
    PostForm
    <h2>PostForm {{ $route.params.id }}</h2>
  </div>
</template>
<script>
export default {
  name: "PostForm",
  mounted() {
    console.log(this.$route.params.id);
  },
};
</script>
<style lang="scss"></style>
