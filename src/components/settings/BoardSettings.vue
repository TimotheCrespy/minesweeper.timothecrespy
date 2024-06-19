<script setup lang="ts">
import { useSettingsStore } from "@/stores/settings"
import { storeToRefs } from "pinia"

const { rowCount, colCount, bombCount } = storeToRefs(useSettingsStore())
</script>

<template>
  <div>
    <div class="flex items-center justify-between text-gray-300">
      <label class="w-16">Rows</label>
      <label class="w-16">Cols</label>
      <label class="w-16">Bombs</label>
    </div>
    <div class="flex items-center justify-between">
      <input
        type="number"
        min="5"
        v-model="rowCount"
        class="w-16 px-1 border"
      />
      <input
        type="number"
        min="5"
        v-model="colCount"
        class="w-16 px-1 border"
      />
      <input
        type="number"
        min="1"
        v-model="bombCount"
        class="w-16 px-1 border"
      />
    </div>
  </div>
</template>
