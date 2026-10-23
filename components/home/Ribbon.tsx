// Decorative silk ribbon: navy, to blue, to gold. Generated instead of 100+ hand-written paths.
const STOPS: [number, string][] = [
  [0, '#0A2540'],
  [0.27, '#2F5BEA'],
  [0.3, '#B7821E'],
  [1, '#FFD25A'],
]

function hex(c: string) {
  return [1, 3, 5].map((i) => parseInt(c.slice(i, i + 2), 16))
}
function colorAt(t: number) {
  for (let k = 0; k < STOPS.length - 1; k++) {
    const [t0, c0] = STOPS[k]
    const [t1, c1] = STOPS[k + 1]
    if (t <= t1) {
      const f = (t - t0) / (t1 - t0)
      const a = hex(c0)
      const b = hex(c1)
      return '#' + a.map((v, j) => Math.round(v + (b[j] - v) * f).toString(16).padStart(2, '0')).join('')
    }
  }
  return '#FFD25A'
}

export default function Ribbon({ fade = '#FFFFFF', className = '' }: { fade?: string; className?: string }) {
  const thin = Array.from({ length: 42 }, (_, i) => i)
  const thick = Array.from({ length: 9 }, (_, k) => k * 5)
  const d = (i: number) => {
    const y1 = 82 + 8 * i
    const c1 = 804 - 6 * i
    const c2 = 16 + 10 * i
    const e = Math.round(410 + 8.39 * i)
    return `M-60 ${y1} C330 ${c1} 682 ${c2} 1160 ${e}`
  }
  return (
    <div className={`hm-ribbon ${className}`} aria-hidden="true">
      <svg width="1100" height="820" viewBox="0 0 1100 820" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin slice">
        {thick.map((i) => (
          <path key={'k' + i} d={d(i)} fill="none" stroke={colorAt(i / 41)} strokeWidth="64" opacity="0.13" />
        ))}
        {thin.map((i) => (
          <path key={'n' + i} d={d(i)} fill="none" stroke={colorAt(i / 41)} strokeWidth="6" opacity="0.9" />
        ))}
      </svg>
      <span className="hm-ribbon-fade" style={{ ['--fade' as string]: fade }} />
    </div>
  )
}
