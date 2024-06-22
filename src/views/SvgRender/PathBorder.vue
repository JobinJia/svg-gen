<script setup lang="ts">
import { nextTick, onMounted, ref, watch } from 'vue'
import '@svgdotjs/svg.filter.js'
import { SVG } from '@svgdotjs/svg.js'
import { createRoundedRectPath, svg2base64 } from '@/views/SvgRender/util'

const props = withDefaults(defineProps<{
  width: number
  height: number
  radius: number
  borderWidth: number
  dash: boolean
  id: string // 测试属性方便取值
}>(), {
  width: 0,
  height: 0,
  radius: 0,
  borderWidth: 0,
  dash: false,
  id: 'svgId',
})

const model = defineModel()

const svgWrapperRefEl = ref<HTMLDivElement>()

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
  if (svgWrapperRefEl.value) {
    svgWrapperRefEl.value.replaceChildren()
  }
}

function drawCanvas() {
  const canvas = SVG()
  canvas.addTo(svgWrapperRefEl.value!).size(props.width, props.height).id(props.id)
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
  const pathD = createRoundedRectPath(props.width, props.height, props.radius, [0, 0], props.borderWidth)
  const path = SVG().path(pathD).addTo(g)

  path.attr('fill', 'none')
  path.attr('stroke', 'url(#gradient)')
  path.attr('stroke-width', props.borderWidth)
  path.attr('filter', 'url(#inner-shadow)')
  if (props.dash) {
    path.attr('stroke-dasharray', `${props.borderWidth * 2}, ${props.borderWidth / 2}`)
  }

  // filter
  path.filterWith((add) => {
    add.componentTransfer({
      type: 'table',
      tableValues: [1, 0],
    } as any)
    add.id('inner-shadow')
    add.gaussianBlur(5, 5)
    add.offset(-5, -5)
    // add.flood('red', 1)
    add.composite('in2', 'offsetblur', 'in')
    add.composite('in2', 'SourceAlpha', 'in')
    add.merge((merge) => {
      merge.mergeNode()
      merge.mergeNode('SourceGraphic')
    })
    add.attr('x', '-50%')
      .attr('y', '-50%')
      .attr('width', '200%')
      .attr('height', '200%')
  }) // x="-50%" y="-50%" width="200%" height="200%"

  svgInstance.value = canvas

  nextTick(() => {
    model.value = svg2base64(document.querySelector(`#${props.id}`)!)
  })
}

onMounted(drawCanvas)
</script>

<template>
  <div ref="svgWrapperRefEl" style="width: 100%;height: 100%" />
</template>

<style scoped lang="less">
</style>
