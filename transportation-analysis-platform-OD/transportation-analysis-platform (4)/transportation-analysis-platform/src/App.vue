<script setup>
import {ref,onMounted} from 'vue'
import { RouterView } from 'vue-router'
import digitalBg from '@/assets/video/digital-bg.mp4'
const videoRef = ref(null)
onMounted(()=>{
  videoRef.value.playbackRate=0.45
})
</script>

<template>
  <div class="digital-video-box">
    <video ref="videoRef" class="digital-video" autoplay muted loop crossorigin="anonymous" preload="auto" :src="digitalBg"></video>
  </div>
  <div class="container">
  <RouterView />
  </div>
</template>

<style scoped>
.container{
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  box-sizing: border-box;
  overflow: auto;
  z-index: 19;
}
header {
  line-height: 1.5;
  max-height: 100vh;
}

.digital-video-box {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  opacity: .2;
  overflow: hidden;
}

.digital-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}


</style>
