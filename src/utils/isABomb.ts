export function isABomb(array: { isBomb: boolean }[], index: number): boolean {
  return array[index] && array[index].isBomb
}
