import type { Board } from "@/types/Board"
import type { Cell } from "@/types/Cell"
import { CellStatus } from "@/types/CellStatus.enum"
import { isABomb } from "@/utils/isABomb"
import { isInCol } from "@/utils/isInCol"
import { shuffle } from "@/utils/shuffle"

export function createBoard(
  rowCount: number,
  colCount: number,
  bombCount: number,
): Board {
  const cellCount = rowCount * colCount

  if (bombCount >= cellCount) {
    throw new Error("bombCount must be strictly lower than cellCount")
  }

  const board = Array.from({ length: cellCount }, (_v, index) => ({
    index: index,
    isBomb: index < bombCount,
    nearbyBombs: 0,
    isRevealed: false,
    isDisabled: false,
    status: CellStatus.DEFAULT,
  }))

  shuffle(board)

  countNearbyBombs(board, colCount)

  return board
}

function countNearbyBombs(board: Board, colCount: number): void {
  board.forEach((boardCell: Cell, index: number) => {
    boardCell.index = index

    if (boardCell.isBomb) {
      return
    }

    // Top left
    if (
      !isInCol("first", colCount, index) &&
      isABomb(board, index - colCount - 1)
    ) {
      boardCell.nearbyBombs += 1
    }
    // Top
    if (isABomb(board, index - colCount)) {
      boardCell.nearbyBombs += 1
    }
    // Top right
    if (
      !isInCol("last", colCount, index) &&
      isABomb(board, index - colCount + 1)
    ) {
      boardCell.nearbyBombs += 1
    }
    // Left
    if (!isInCol("first", colCount, index) && isABomb(board, index - 1)) {
      boardCell.nearbyBombs += 1
    }
    // Right
    if (!isInCol("last", colCount, index) && isABomb(board, index + 1)) {
      boardCell.nearbyBombs += 1
    }
    // Bottom left
    if (
      !isInCol("first", colCount, index) &&
      isABomb(board, index + colCount - 1)
    ) {
      boardCell.nearbyBombs += 1
    }
    // Bottom
    if (isABomb(board, index + colCount)) {
      boardCell.nearbyBombs += 1
    }
    // Bottom right
    if (
      !isInCol("last", colCount, index) &&
      isABomb(board, index + colCount + 1)
    ) {
      boardCell.nearbyBombs += 1
    }
  })
}
