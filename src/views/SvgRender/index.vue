<script setup lang="ts">
import { type CSSProperties, computed, ref } from 'vue'
import '@svgdotjs/svg.filter.js'
import SolidBorder from '@/views/SvgRender/SolidBorder.vue'

const solidRefEl = ref<InstanceType<typeof SolidBorder>>()
const dashRefEl = ref<InstanceType<typeof SolidBorder>>()

// const img = 'https://cdn.pixabay.com/photo/2016/03/17/06/49/renovation-1262389_1280.png'

const ds = ref<CSSProperties>()

function setBg(type: 'dash' | 'solid') {
  const ref = type === 'dash' ? dashRefEl.value : solidRefEl.value
  const b1 = ref?.getBase64Url()
  if (b1) {
    ds.value = {
      backgroundImage: `url(${b1})`,
      backgroundSize: '100% 100%',
    }
  }
}

const formValue = ref({
  backgroundColor: '#fff',
  // color: '#811818',
  width: 180,
  height: 80,
  borderWidth: 20,
  radius: 40,
  dash: false,
})

const backgroundColor = computed(() => formValue.value.backgroundColor)
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
        <!--        <n-form-item-gi :span="4" label="颜色" path="color"> -->
        <!--          <n-color-picker v-model:value="formValue.color" /> -->
        <!--        </n-form-item-gi> -->
      </n-grid>
    </n-form>
    <h3>实线path</h3>
    <div style="margin-top: 40px">
      <SolidBorder id="solidBorder" ref="solidRefEl" :dash="false" :border-width="formValue.borderWidth" :width="formValue.width" :height="formValue.height" :radius="formValue.radius" />
    </div>
    <h3>虚线path</h3>
    <div style="margin-top: 40px">
      <SolidBorder id="dashBorder" ref="dashRefEl" dash :border-width="formValue.borderWidth" :width="formValue.width" :height="formValue.height" :radius="formValue.radius" />
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
      }"
    />
    <n-space style="margin-top: 20px">
      <n-button @click="setBg('solid')">
        设置实线背景
      </n-button>
      <n-button @click="setBg('dash')">
        设置虚线背景
      </n-button>
    </n-space>
    <div
      :style="{
        marginTop: '40px',
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
