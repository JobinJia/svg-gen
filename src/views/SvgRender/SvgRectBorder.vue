<script setup lang="ts">
import { onMounted, ref } from 'vue'

const svgRefEl = ref<SVGElement>()
onMounted(drawSvg)

function drawSvg() {
}
</script>

<template>
  <div ref="svgRefEl" />
</template>

<style scoped lang="less">

</style>
