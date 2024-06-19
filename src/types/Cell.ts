import type { CellStatus } from "@/types/CellStatus.enum"

export interface Cell {
  index: number
  isBomb: boolean
  nearbyBombs: number
  isRevealed: boolean
  isDisabled: boolean
  status: CellStatus
}
