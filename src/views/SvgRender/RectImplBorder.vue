<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import '@svgdotjs/svg.filter.js'
import { SVG } from '@svgdotjs/svg.js'
import { svg2base64 } from '@/views/SvgRender/util'

const props = withDefaults(defineProps<{
  width: number
  height: number
  radius: number
  borderWidth: number
  dash: boolean
}>(), {
  width: 0,
  height: 0,
  radius: 0,
  borderWidth: 0,
  dash: false,
})

const canvasRef = ref()
const svgInstance = ref<any>(null)

watch(() => [props.width, props.height, props.radius, props.borderWidth, props.dash], () => {
  clearSvgIns()
  drawCanvas()
}, { deep: true })

function clearSvgIns() {
  if (svgInstance.value) {
    svgInstance.value.clear()
    svgInstance.value = null
  }
  if (canvasRef.value) {
    canvasRef.value.replaceChildren()
  }
}

function drawCanvas() {
  const canvas = SVG().addTo(canvasRef.value).size(`${props.width}`, `${props.height}`).id('dashBorder')
  // canvas.text('Hello World')
  // canvas.rect(100, 100).fill({ color: 'green' })
  // create defs
  const defs = SVG().defs().addTo(canvas)
  // create gradient
  defs
    .gradient('linear', (add) => {
      add.stop({ offset: '0%', color: 'red', opacity: 1 })
      add.stop({ offset: '50%', color: 'yellow', opacity: 1 })
      add.stop({ offset: '100%', color: 'blue', opacity: 1 })
    })
    .attr('id', 'gradient')
    .attr('x1', '0%')
    .attr('y1', '0%')
    .attr('x2', '100%')
    .attr('y2', '0%')

  // create g
  const g = canvas.group()
  const rect = SVG().rect(props.width, props.height)
    .attr('x', 0)
    .attr('y', 0)
    .attr('rx', props.radius)
    .attr('ry', props.radius)
    .attr('fill', 'url(#gradient)')
    .attr('stroke', 'url(#gradient)')
    .attr('stroke-width', props.borderWidth)
    .attr('mask', 'url(#hole)')
    .attr('gradient', 'url(#gradient)')
    .addTo(g)
  if (props.dash) {
    rect.attr('stroke-dasharray', `${props.borderWidth}, ${props.borderWidth}`)
  }

  rect.filterWith((add) => {
    add.componentTransfer({
      type: 'table',
      tableValues: [1, 0],
    } as any)
    add.gaussianBlur(5, 5)
    add.offset(-5, -5)
    add.flood('red', 1)
    add.composite('in2', 'offsetblur', 'in')
    add.composite('in2', 'SourceAlpha', 'in')
    add.merge((merge) => {
      merge.mergeNode()
      merge.mergeNode('SourceGraphic')
    })
  })

  const mask = canvas.mask().id('hole')
  mask.rect('100%', '100%').fill('white')
    .attr('x', 0)
    .attr('y', 0)
    .attr('rx', props.radius)
    .attr('ry', props.radius)
  mask.rect(props.width, props.height)
    .attr('x', 0)
    .attr('y', 0)
    .attr('rx', props.radius)
    .attr('ry', props.radius)

  svgInstance.value = canvas
}

onMounted(drawCanvas)

defineExpose({
  getBase64Url: () => {
    return svg2base64(document.querySelector('#dashBorder')!)
  },
})
</script>

<template>
  <div ref="canvasRef" style="width: 100%;height: 100%" />
</template>

<style scoped lang="less">
</style>
