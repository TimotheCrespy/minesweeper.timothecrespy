import { useTimerStore } from "@/stores/timer"
import { GameStatus } from "@/types/GameStatus.enum"
import { defineStore, storeToRefs } from "pinia"
import { ref } from "vue"

export const useStatusStore = defineStore("status", () => {
  const { formattedElapsedTime } = storeToRefs(useTimerStore())

  const status = ref<string>(GameStatus.DEFAULT)

  const victoryCellCount = ref<number>(0)
  const revealedVictoryCellCount = ref<number>(0)

  function setVictoryCellCount(value: number) {
    victoryCellCount.value = value

    resetRevealedVictoryCellCount()
  }

  function resetRevealedVictoryCellCount() {
    revealedVictoryCellCount.value = 0
  }

  function incrementRevealedVictoryCellCount() {
    revealedVictoryCellCount.value += 1
  }

  function resetStatus() {
    status.value = GameStatus.DEFAULT
  }

  function setWinningStatus() {
    status.value = `${GameStatus.WIN} in ${formattedElapsedTime.value}s`
  }

  function setLoosingStatus() {
    status.value = GameStatus.LOOSE
  }

  return {
    status,
    victoryCellCount,
    revealedVictoryCellCount,
    setVictoryCellCount,
    incrementRevealedVictoryCellCount,
    resetStatus,
    setWinningStatus,
    setLoosingStatus,
  }
})
