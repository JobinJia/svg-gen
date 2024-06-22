export function svg2base64(svg: SVGElement) {
  const svgString = new XMLSerializer().serializeToString(svg)
  return `data:image/svg+xml;base64,${btoa(svgString)}`
}

export function createSvgRadiusPath(width: number, height: number, radius: number, start: [number, number]) {
  const [x, y] = start
  // Ensure radius doesn't exceed half of width or height
  const r = Math.min(radius, width / 2, height / 2)

  // Construct the path
  const path = [
    `M${x + r},${y}`, // Move to the starting point with offset for the top-left corner arc
    `h${width - 2 * r}`, // Draw the top horizontal line
    `a${r},${r} 0 0 1 ${r},${r}`, // Draw the top-right corner arc
    `v${height - 2 * r}`, // Draw the right vertical line
    `a${r},${r} 0 0 1 -${r},${r}`, // Draw the bottom-right corner arc
    `h-${width - 2 * r}`, // Draw the bottom horizontal line
    `a${r},${r} 0 0 1 -${r},-${r}`, // Draw the bottom-left corner arc
    `v-${height - 2 * r}`, // Draw the left vertical line
    `a${r},${r} 0 0 1 ${r},-${r}`, // Draw the top-left corner arc
    `z`, // Close the path
  ].join(' ')

  return path
}
export function createRoundedRectPath(
  width: number,
  height: number,
  radius: number,
  start: [number, number],
  borderWidth: number,
): string {
  const [x, y] = start

  // Ensure radius doesn't exceed half of width or height
  const r = Math.min(radius, (width - borderWidth) / 2, (height - borderWidth) / 2)
  // Adjust width and height to account for border width
  const adjustedWidth = width - borderWidth
  const adjustedHeight = height - borderWidth

  // Construct the path
  const path = [
    `M${x + r + borderWidth / 2},${y + borderWidth / 2}`, // Move to the starting point with offset for the top-left corner arc
    `h${adjustedWidth - 2 * r}`, // Draw the top horizontal line
    `a${r},${r} 0 0 1 ${r},${r}`, // Draw the top-right corner arc
    `v${adjustedHeight - 2 * r}`, // Draw the right vertical line
    `a${r},${r} 0 0 1 -${r},${r}`, // Draw the bottom-right corner arc
    `h-${adjustedWidth - 2 * r}`, // Draw the bottom horizontal line
    `a${r},${r} 0 0 1 -${r},-${r}`, // Draw the bottom-left corner arc
    `v-${adjustedHeight - 2 * r}`, // Draw the left vertical line
    `a${r},${r} 0 0 1 ${r},-${r}`, // Draw the top-left corner arc
    `z`, // Close the path
  ].join(' ')

  console.log(path)
  return path
}
