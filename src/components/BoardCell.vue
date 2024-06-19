<script setup lang="ts">
import { useTimerStore } from "@/stores/timer"
import { CellStatus } from "@/types/CellStatus.enum"
import { computed, ref } from "vue"

const { startTimer } = useTimerStore()

interface Props {
  index: number
  isBomb: boolean
  nearbyBombs: number
  isRevealed: boolean
  isDisabled: boolean
  status: CellStatus
}

const props = defineProps<Props>()

type Emit = {
  reveal: [index: number, isManuallyRevealed: true]
  "toggle-status": [index: number]
}

const emit = defineEmits<Emit>()

let clickCount: number = 0
let timerId: NodeJS.Timeout | undefined = undefined

const manageClickEvent = (_event: Event, index: number) => {
  clickCount += 1
  if (clickCount === 1) {
    timerId = setTimeout(() => {
      reveal(index)
      clickCount = 0
    }, 160)
  } else {
    clearTimeout(timerId)
    timerId = undefined
    toggleStatus(index)
    clickCount = 0
  }
}

const isManuallyRevealed = ref(false)

const reveal = (index: number) => {
  startTimer()
  isManuallyRevealed.value = true
  emit("reveal", index, true)
}

const toggleStatus = (index: number) => {
  startTimer()
  emit("toggle-status", index)
}

const cssClass = computed(() => ({
  "mode-space:bg-gray-400":
    !props.isRevealed || (props.isDisabled && props.isBomb),
  "mode-space:bg-red-100":
    props.isRevealed && !props.isDisabled && props.isBomb,
  "mode-space:bg-gray-200":
    props.isRevealed && !props.isBomb && props.nearbyBombs > 0,
  "mode-space:bg-gray-100":
    props.isRevealed && !props.isBomb && props.nearbyBombs === 0,
  "mode-space:text-green-500":
    props.isRevealed && !props.isBomb && props.nearbyBombs === 1,
  "mode-space:text-green-600":
    props.isRevealed && !props.isBomb && props.nearbyBombs === 2,
  "mode-space:text-green-700":
    props.isRevealed && !props.isBomb && props.nearbyBombs === 3,
  "mode-space:text-green-800":
    props.isRevealed && !props.isBomb && props.nearbyBombs === 4,
  "mode-space:text-green-900":
    props.isRevealed && !props.isBomb && props.nearbyBombs === 5,
}))
</script>

<template>
  <button
    type="button"
    :disabled="isDisabled"
    class="relative flex items-center justify-center w-12 h-12 border-b border-r"
    :class="cssClass"
    @click.prevent="manageClickEvent($event, index)"
    @click.right.prevent="toggleStatus(index)"
  >
    <div>
      <span v-if="!isRevealed">
        {{ status }}
      </span>
      <span v-else-if="isManuallyRevealed && isBomb">
        {{ CellStatus.EXPLOSION }}
      </span>
      <span v-else-if="isDisabled && isBomb">
        {{ CellStatus.FLAG }}
      </span>
      <strong v-else>
        {{ nearbyBombs > 0 ? nearbyBombs : "" }}
      </strong>
    </div>
  </button>
</template>
