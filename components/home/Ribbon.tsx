// Decorative silk ribbon (ported from the Paper artboard, generated instead of 100+ hand-written paths).
const STOPS = ['#2F5BEA', '#555BF4', '#7A5CFE', '#B95DD4', '#F95FA7', '#FF7578', '#FF8D49', '#FFA840', '#FFC33D']

function hex(c: string) {
  return [1, 3, 5].map((i) => parseInt(c.slice(i, i + 2), 16))
}
function colorAt(i: number) {
  const t = Math.min(i / 5, 8 - 1e-6)
  const k = Math.floor(t)
  const f = t - k
  const a = hex(STOPS[k])
  const b = hex(STOPS[k + 1])
  const m = a.map((v, j) => Math.round(v + (b[j] - v) * f))
  return '#' + m.map((v) => v.toString(16).padStart(2, '0')).join('')
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
          <path key={'k' + i} d={d(i)} fill="none" stroke={colorAt(i)} strokeWidth="64" opacity="0.13" />
        ))}
        {thin.map((i) => (
          <path key={'n' + i} d={d(i)} fill="none" stroke={colorAt(i)} strokeWidth="6" opacity="0.85" />
        ))}
      </svg>
      <span className="hm-ribbon-fade" style={{ ['--fade' as string]: fade }} />
    </div>
  )
}
