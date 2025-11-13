export const str2binary = (str: string) => {
  const max = function (a: number, b: number): number {
    return Math.max(a, b)
  }
  const len = str
    .split(/\n/)
    .map((s) => s.length)
    .reduce(max)

  const converted = str
    .split(/\n/)
    .filter((v) => v)
    .map((row) => {
      // Pad strings to equal length
      const paddedStr = row.padEnd(len, '0').replaceAll(' ', '0')
      // Split into chunks of 32 characters
      return (paddedStr.match(/.{1,32}/g) || [paddedStr]).map((divided, i) => {
        if (i === 0) {
          return parseInt(divided, 2)
        }
        return parseInt(divided.padEnd(32, '0'), 2)
      })
    })

  return converted
}

export const unsigned = (num: number) => {
  // JavaScript's bitwise operations are signed,
  // so an unsigned right shift is performed to convert to an unsigned integer.
  return num >>> 0
}
