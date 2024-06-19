import { defineStore } from "pinia"
import { computed, ref } from "vue"

export const useTimerStore = defineStore("timer", () => {
  const elapsedTime = ref(0)

  const formattedElapsedTime = computed(() => {
    const preformattedElapsedTime = elapsedTime.value
      .toString()
      .padStart(5, "0")

    return `${preformattedElapsedTime.substring(0, 2)}.${preformattedElapsedTime.substring(2, 5)}`
  })

  let timerId: NodeJS.Timeout | undefined = undefined

  function resetTimer(): void {
    stopTimer()
    elapsedTime.value = 0
  }

  function startTimer(): void {
    if (!timerId) {
      timerId = setInterval(() => (elapsedTime.value += 10), 10)
    }
  }

  function stopTimer(): void {
    clearInterval(timerId)
    timerId = undefined
  }

  return { formattedElapsedTime, resetTimer, startTimer, stopTimer }
})
