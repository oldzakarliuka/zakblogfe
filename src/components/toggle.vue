<template>
  <input
    type="checkbox"
    id="switch"
    :checked="selected"
    @change="inputChanged"
  />
  <label for="switch" />
</template>
<script>
export default {
  name: "toggle",
  props: ["selected"],
  emits: ["change"],
  methods: {
    inputChanged($event) {
      this.$emit("change", $event.target.checked);
    },
  },
};
</script>
<style lang="scss">
input[type="checkbox"] {
  height: 0;
  width: 0;
  visibility: hidden;
}

label {
  cursor: pointer;
  text-indent: -9999px;
  width: 64px;
  height: 32px;
  background: #fbfbfb;
  border: 2px solid #e8eae9;
  display: block;
  border-radius: 100px;
  position: relative;
}

label:after {
  content: "";
  position: absolute;
  top: 5px;
  left: 5px;
  width: 22px;
  height: 22px;
  background: #fbfbfb;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1), 0 4px 0 rgba(0, 0, 0, 0.08);
  border-radius: 30px;
  transition: 0.3s;
}

input:checked + label {
  background: #1877f2;
}

input:checked + label:after {
  left: calc(100% - 5px);
  transform: translateX(-100%);
}

label:active:after {
  width: 80px;
}
</style>
