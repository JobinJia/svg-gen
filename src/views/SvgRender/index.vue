<script setup lang="ts">
import { computed, ref } from 'vue'
import '@svgdotjs/svg.filter.js'
import SolidBorder from '@/views/SvgRender/PathBorder.vue'

const img = 'https://cdn.pixabay.com/photo/2016/03/17/06/49/renovation-1262389_1280.png'

const formValue = ref({
  backgroundColor: '#fff',
  color: '#811818',
  width: 180,
  height: 80,
  borderWidth: 10,
  radius: 40,
  dash: false,
})

const solidSvgBase64 = ref('')
const dashSvgBase64 = ref('')

const backgroundColor = computed(() => formValue.value.backgroundColor)

const radioGroup = [
  {
    value: 'solid',
    label: '实线边框',
  },
  {
    value: 'dash',
    label: '虚线边框',
  },
]

const radio = ref('solid')

const ds = computed(() => {
  const base64 = radio.value === 'dash' ? dashSvgBase64.value : solidSvgBase64.value
  return {
    backgroundImage: `url(${base64}), url(${img})`,
    backgroundColor: formValue.value.color,
    backgroundSize: 'contain, contain',
    backgroundPosition: `calc(100% - ${formValue.value.borderWidth}px}) calc(100% - ${formValue.value.borderWidth}px}, left top`,
  }
})
</script>

<template>
  <div class="svg-wrapper">
    <n-form
      inline
      :label-width="80"
      :model="formValue"
    >
      <n-grid :cols="24" :x-gap="24">
        <n-form-item-gi :span="4" label="背景色" path="backgroundColor">
          <n-color-picker v-model:value="formValue.backgroundColor" />
        </n-form-item-gi>
        <n-form-item-gi :span="4" label="宽度" path="width">
          <n-input-number v-model:value="formValue.width" :min="0" />
        </n-form-item-gi>
        <n-form-item-gi :span="4" label="高度" path="height">
          <n-input-number v-model:value="formValue.height" :min="0" />
        </n-form-item-gi>
        <n-form-item-gi :span="4" label="圆角" path="radius">
          <n-input-number v-model:value="formValue.radius" :min="0" />
        </n-form-item-gi>
        <n-form-item-gi :span="4" label="边框宽度" path="borderWidth">
          <n-input-number v-model:value="formValue.borderWidth" :min="0" />
        </n-form-item-gi>
        <n-form-item-gi :span="4" label="虚线" path="dash">
          <n-switch v-model:value="formValue.dash" :min="0" />
        </n-form-item-gi>
        <n-form-item-gi :span="4" label="演示背景颜色" path="color">
          <n-color-picker v-model:value="formValue.color" />
        </n-form-item-gi>
      </n-grid>
    </n-form>
    <h3>实线path</h3>
    <div style="margin-top: 40px">
      <SolidBorder id="solidBorder" v-model="solidSvgBase64" :dash="false" :border-width="formValue.borderWidth" :width="formValue.width" :height="formValue.height" :radius="formValue.radius" />
    </div>
    <h3>虚线path</h3>
    <div style="margin-top: 40px">
      <SolidBorder id="dashBorder" v-model="dashSvgBase64" dash :border-width="formValue.borderWidth" :width="formValue.width" :height="formValue.height" :radius="formValue.radius" />
    </div>
    <h3>对比border</h3>
    <div
      :style="{
        marginTop: '40px',
        width: `${formValue.width}px`,
        height: `${formValue.height}px`,
        borderWidth: `${formValue.borderWidth}px`,
        borderStyle: formValue.dash ? 'dashed' : 'solid',
        borderRadius: `${formValue.radius}px`,
        backgroundImage: `url(${img})`,
        backgroundSize: 'contain',
        backgroundColor: `${formValue.color}`,
      }"
    />
    <n-space style="margin-top: 20px">
      <n-radio-group v-model:value="radio" name="radiogroup">
        <n-space>
          <n-radio v-for="song in radioGroup" :key="song.value" :value="song.value">
            {{ song.label }}
          </n-radio>
        </n-space>
      </n-radio-group>
    </n-space>
    <div
      :style="{
        marginTop: '40px',
        borderRadius: `${formValue.radius}px`,
        width: `${formValue.width}px`,
        height: `${formValue.height}px`,
        ...ds,
      }"
    />
  </div>
</template>

<style scoped lang="less">
#bgColor {
  width: 50px;
  height: 50px;
}
.svg-wrapper {
  width: 100%;
  height: 100%;
  background: v-bind(backgroundColor);
  padding: 0 10px;
}
</style>
