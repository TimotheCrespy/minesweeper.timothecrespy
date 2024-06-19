enum ColumnName {
  FIRST = "first",
  LAST = "last",
}

export function isInCol(
  columnName: `${ColumnName}`,
  rowCount: number,
  cellIndex: number,
): boolean {
  if (columnName === ColumnName.FIRST) {
    return cellIndex % rowCount === 0
  } else if (columnName === ColumnName.LAST) {
    return cellIndex % rowCount === rowCount - 1
  }

  return false
}
