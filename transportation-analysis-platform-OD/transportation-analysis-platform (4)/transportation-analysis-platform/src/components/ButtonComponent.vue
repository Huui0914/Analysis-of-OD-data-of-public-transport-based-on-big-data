<script setup>
import { RouterLink } from 'vue-router'
const props = defineProps({
  position: String,
  text: String,
  link: String
})

</script>
<template>
  <button :class="props.position">
    <RouterLink :to="props.link">
      <span :class="props.position + '-text'">
        {{ props.text }}
      </span>
    </RouterLink>
  </button>
</template>
<style scoped>
button {
  border: none;
  padding: 10px 20px;
  display: inline-block;
  font-size: 15px;
  width: 120px;
  text-transform: uppercase;
  cursor: pointer;
}

span {
  white-space: nowrap;
  color: #fff;
  display: inline-block;
  font-weight: 800;
}

.left-button {
  background: linear-gradient(-45deg, #0f2a3f, #14e0e3);
  transform: skewX(45deg);
  border-bottom-left-radius: 20px;
}

.right-button {
  background: linear-gradient(45deg, #0f2a3f, #14e0e3);
  transform: skewX(-45deg);
  border-bottom-right-radius: 20px;
}

.leftleft-button {
  background: linear-gradient(-45deg, #0f2a3f, #14e0e3);
  transform: skewX(45deg);
  border-bottom-left-radius: 20px;
}

.rightright-button {
  background: linear-gradient(45deg, #0f2a3f, #14e0e3);
  transform: skewX(-45deg);
  border-bottom-right-radius: 20px;
}

.left-button-text {
  transform: skewX(-45deg);
}

.right-button-text {
  transform: skewX(45deg);
}

.leftleft-button-text {
  transform: skewX(-45deg);
}

.rightright-button-text {
  transform: skewX(45deg);
}
</style>