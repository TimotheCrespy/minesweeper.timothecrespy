import { defineStore } from "pinia"
import { ref } from "vue"

export const useBombsStore = defineStore("bombs", () => {
  const bombCount = ref<number>(0)
  const remainingBombCounter = ref<number>(0)

  function setCounter(value: number): void {
    bombCount.value = value
    remainingBombCounter.value = value
  }

  function incrementRemainingBombsCounter(): void {
    remainingBombCounter.value += 1
  }

  function decrementRemainingBombsCounter(): void {
    remainingBombCounter.value -= 1
  }

  return {
    bombCount,
    remainingBombCounter,
    setCounter,
    incrementRemainingBombsCounter,
    decrementRemainingBombsCounter,
  }
})
