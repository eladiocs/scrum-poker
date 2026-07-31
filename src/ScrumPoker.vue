<script setup lang="ts">
import MyButton from './MyButton.vue'
import { ref } from 'vue'

const props = withDefaults(defineProps<{ selectedButton: string }>(), {
  selectedButton: '1',
})

const emit = defineEmits<{ 'estimate-selected': [value: string] }>()

const selectedValue = ref(props.selectedButton)

function selectButton(val: string) {
  selectedValue.value = val
  emit('estimate-selected', val)
}

const numberValues = ['1', '2', '3', '5', '8', '13']
</script>

<template>
  <div id="app">
    <div class="card">
      <div class="app-header">
        <span class="app-header-icon">🃏</span>
        Scrum Poker
      </div>
      <div class="app-main">
        <div class="heading">What is your estimate?</div>
        <div class="button-row">
          <MyButton
            v-for="(item, index) in numberValues"
            :key="index"
            :value="item"
            @on-select="selectButton"
            :class="{ selected: selectedValue === item }"
          />
        </div>
        <div class="heading">Selection</div>
        <div class="selection">{{ selectedValue }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
* {
  box-sizing: border-box;
}

#app {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 4rem);
}

.card {
  width: 100%;
  max-width: 480px;
  padding: 40px 32px;
  background: #ffffff;
  border-radius: 20px;
  box-shadow: 0 20px 45px rgba(21, 128, 61, 0.18);
}

.app-header,
.app-main {
  text-align: center;
}

.app-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-size: 30px;
  font-weight: 700;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  color: #166534;
}

.app-header-icon {
  font-size: 32px;
}

.button-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
}

.selection {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 64px;
  height: 64px;
  margin: 4px auto 0;
  padding: 8px;
  font-size: 26px;
  font-weight: 700;
  color: #ffffff;
  background: linear-gradient(135deg, #22c55e, #16a34a);
  border-radius: 14px;
  box-shadow: 0 10px 20px rgba(34, 197, 94, 0.35);
}

.heading {
  font-size: 18px;
  font-weight: 600;
  color: #4b5563;
  margin: 32px 0 14px 0;
}

.heading:first-of-type {
  margin-top: 24px;
}
</style>
