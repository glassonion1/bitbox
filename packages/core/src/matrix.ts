export const str2matrix = (str: string): number[][] => {
  const max = function (a: number, b: number) {
    return Math.max(a, b)
  }
  const colSize = str
    .split(/\n/)
    .map((str) => str.length)
    .reduce(max)

  const converted = str
    .split(/\n/)
    .filter((str) => str.length > 0)
    .map((row) => {
      return row
        .padEnd(colSize, ' ')
        .replaceAll(' ', '0')
        .split('')
        .map((s) => Number(s))
    })
  return converted
}

export const rotateL = <T>(matrix: T[][]) => {
  const rotated = matrix.map((row, i) => {
    return row.map((_, j) => {
      return matrix[j][matrix.length - i - 1]
    })
  })
  return rotated
}

export const rotateR = <T>(matrix: T[][]) => {
  const rotated = matrix.map((row, i) => {
    return row.map((_, j) => {
      return matrix[matrix.length - j - 1][i]
    })
  })
  return rotated
}

export const refrectX = <T>(matrix: T[][]) => {
  const refrected = matrix.map((row) => {
    return row.toReversed()
  })
  return refrected
}

export const refrectY = <T>(matrix: T[][]) => {
  const refrected = matrix.map((row) => {
    return row.toReversed()
  })
  return refrected
}
