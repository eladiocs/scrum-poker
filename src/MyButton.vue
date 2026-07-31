<script setup lang="ts">
const props = defineProps<{
  value: string
}>()

// const emit = defineEmits<{
//   onSelect: [value: string]
// }>()

const emit = defineEmits(['onSelect'])

function selectButton() {
  emit('onSelect', props.value)
}
</script>

<template>
  <button type="button" class="selection-button" @click="selectButton">
    {{ value }}
  </button>
</template>

<style scoped>
.selection-button {
  color: #4338ca;
  background: #ffffff;
  cursor: pointer;

  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 76px;
  font-size: 20px;
  font-weight: 700;
  border: 2px solid #c7d2fe;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(67, 56, 202, 0.08);
  transition:
    transform 0.15s ease,
    box-shadow 0.15s ease,
    border-color 0.15s ease,
    background 0.15s ease,
    color 0.15s ease;
}

.selection-button:hover {
  border-color: #818cf8;
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(67, 56, 202, 0.2);
}

.selection-button.selected {
  color: #ffffff;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  border-color: #6366f1;
  transform: translateY(-4px);
  box-shadow: 0 10px 18px rgba(99, 102, 241, 0.35);
}
</style>
