<script setup lang="ts">
import BoardCell from "@/components/BoardCell.vue"
import { useBombsStore } from "@/stores/bombs"
import { useSettingsStore } from "@/stores/settings"
import { useStatusStore } from "@/stores/status"
import { useTimerStore } from "@/stores/timer"
import type { Cell } from "@/types/Cell"
import { CellStatus } from "@/types/CellStatus.enum"
import { createBoard } from "@/utils/createBoard"
import { isABomb } from "@/utils/isABomb"
import { isInCol } from "@/utils/isInCol"
import { storeToRefs } from "pinia"
import { ref, watch } from "vue"

const { rowCount, colCount, bombCount } = storeToRefs(useSettingsStore())
const {
  setCounter,
  incrementRemainingBombsCounter,
  decrementRemainingBombsCounter,
} = useBombsStore()
const { stopTimer } = useTimerStore()
const { victoryCellCount, revealedVictoryCellCount } =
  storeToRefs(useStatusStore())
const {
  setVictoryCellCount,
  incrementRevealedVictoryCellCount,
  setWinningStatus,
  setLoosingStatus,
} = useStatusStore()

const boardCells = ref(
  createBoard(rowCount.value, colCount.value, bombCount.value),
)

const initGame = () => {
  boardCells.value = createBoard(
    rowCount.value,
    colCount.value,
    bombCount.value,
  )

  setCounter(bombCount.value)

  setVictoryCellCount(rowCount.value * colCount.value - bombCount.value)
}

watch(
  [rowCount, colCount, bombCount],
  () => {
    initGame()
  },
  { immediate: true },
)

const revealCell = async (index: number): Promise<void> => {
  if (!boardCells.value[index]) {
    return
  }

  if (boardCells.value[index].isRevealed) {
    return
  }

  if (boardCells.value[index].isBomb) {
    setLoosingStatus()
    stopTimer()
    disableGameBoard()
    revealBombs()
    return
  }

  boardCells.value[index].isRevealed = true

  incrementRevealedVictoryCellCount()

  if (revealedVictoryCellCount.value === victoryCellCount.value) {
    setWinningStatus()
    stopTimer()
    disableGameBoard()
    flagBombs()
    return
  }

  if (boardCells.value[index].nearbyBombs === 0) {
    setTimeout(() => {
      revealCellNeighbours(index)
    }, 40)
  }
}

const revealCellNeighbours = (index: number): void => {
  // Top left
  if (
    !isInCol("first", colCount.value, index) &&
    !isABomb(boardCells.value, index - colCount.value - 1)
  ) {
    revealCell(index - colCount.value - 1)
  }
  // Top
  if (!isABomb(boardCells.value, index - colCount.value)) {
    revealCell(index - colCount.value)
  }
  // Top right
  if (
    !isInCol("last", colCount.value, index) &&
    !isABomb(boardCells.value, index - colCount.value + 1)
  ) {
    revealCell(index - colCount.value + 1)
  }
  // Left
  if (
    !isInCol("first", colCount.value, index) &&
    !isABomb(boardCells.value, index - 1)
  ) {
    revealCell(index - 1)
  }
  // Right
  if (
    !isInCol("last", colCount.value, index) &&
    !isABomb(boardCells.value, index + 1)
  ) {
    revealCell(index + 1)
  }
  // Bottom left
  if (
    !isInCol("first", colCount.value, index) &&
    !isABomb(boardCells.value, index + colCount.value - 1)
  ) {
    revealCell(index + colCount.value - 1)
  }
  // Bottom
  if (!isABomb(boardCells.value, index + colCount.value)) {
    revealCell(index + colCount.value)
  }
  // Bottom right
  if (
    !isInCol("last", colCount.value, index) &&
    !isABomb(boardCells.value, index + colCount.value + 1)
  ) {
    revealCell(index + colCount.value + 1)
  }
}

const toggleCellStatus = (index: number): void => {
  if (boardCells.value[index].isDisabled) {
    return
  }

  if (boardCells.value[index].status === CellStatus.DEFAULT) {
    boardCells.value[index].status = CellStatus.FLAG
    decrementRemainingBombsCounter()
    return
  }

  if (boardCells.value[index].status === CellStatus.FLAG) {
    boardCells.value[index].status = CellStatus.DOUBT
    incrementRemainingBombsCounter()
    return
  }

  boardCells.value[index].status = CellStatus.DEFAULT
}

const disableGameBoard = (): void => {
  boardCells.value.forEach((boardCell: Cell) => {
    boardCell.isDisabled = true
  })
}

const revealBombs = (): void => {
  boardCells.value.forEach((boardCell: Cell) => {
    if (boardCell.isBomb) {
      boardCell.isRevealed = true
    }
  })
}

const flagBombs = (): void => {
  boardCells.value.forEach((boardCell: Cell) => {
    if (boardCell.isBomb) {
      boardCell.isRevealed = true
    }
  })
}
</script>

<template>
  <div>
    <div
      class="grid border-t border-l"
      :style="`grid-template-columns: repeat(${colCount}, minmax(0, 1fr));`"
    >
      <div v-for="cell in boardCells">
        <BoardCell
          :index="cell.index"
          :is-bomb="cell.isBomb"
          :nearby-bombs="cell.nearbyBombs"
          :is-revealed="cell.isRevealed"
          :is-disabled="cell.isDisabled"
          :status="cell.status"
          @reveal="revealCell"
          @toggle-status="toggleCellStatus"
        />
      </div>
    </div>
  </div>
</template>
