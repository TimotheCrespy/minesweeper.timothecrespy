import { defineStore } from "pinia"
import { ref } from "vue"

export const useSettingsStore = defineStore("settings", () => {
  const rowCount = ref<number>(6)
  const colCount = ref<number>(6)
  const bombCount = ref<number>(6)

  return {
    rowCount,
    colCount,
    bombCount,
  }
})
