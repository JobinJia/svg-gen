export function svg2base64(svg: SVGElement) {
  const svgString = new XMLSerializer().serializeToString(svg)
  return `data:image/svg+xml;base64,${btoa(svgString)}`
}

export function createRoundedRectPath(
  width: number,
  height: number,
  radius: number,
  start: [number, number],
  borderWidth: number,
): string {
  const [x, y] = start

  const r = Math.min(radius, (width - borderWidth) / 2, (height - borderWidth) / 2)
  const adjustedWidth = width - borderWidth
  const adjustedHeight = height - borderWidth

  const path = [
    `M${x + r + borderWidth / 2},${y + borderWidth / 2}`,
    `h${adjustedWidth - 2 * r}`,
    `a${r},${r} 0 0 1 ${r},${r}`,
    `v${adjustedHeight - 2 * r}`,
    `a${r},${r} 0 0 1 -${r},${r}`,
    `h-${adjustedWidth - 2 * r}`,
    `a${r},${r} 0 0 1 -${r},-${r}`,
    `v-${adjustedHeight - 2 * r}`,
    `a${r},${r} 0 0 1 ${r},-${r}`,
    `z`,
  ].join(' ')

  console.log(path)
  return path
}
