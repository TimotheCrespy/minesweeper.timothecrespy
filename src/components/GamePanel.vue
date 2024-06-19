<script setup lang="ts">
import GameBoard from "@/components/GameBoard.vue"
import GameInstructions from "@/components/GameInstructions.vue"
import GameStatus from "@/components/GameStatus.vue"
import GameSettings from "@/components/settings/GameSettings.vue"
import { useKeyupEvent } from "@/composables/useKeyupEvent"
import { useStatusStore } from "@/stores/status"
import { useTimerStore } from "@/stores/timer"
import { ref } from "vue"

const { resetTimer } = useTimerStore()
const { resetStatus } = useStatusStore()

useKeyupEvent((event: KeyboardEvent) => {
  if (event.key === " ") {
    restartGame()
  }
})

const gameId = ref(0)

const restartGame = () => {
  resetTimer()
  resetStatus()

  gameId.value += 1
}
</script>

<template>
  <div>
    <GameSettings />
    <GameBoard :key="gameId" />
    <GameStatus />
    <GameInstructions />
  </div>
</template>
