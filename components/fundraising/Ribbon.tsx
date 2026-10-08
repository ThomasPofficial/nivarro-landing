const KEYS = ['#2F5BEA', '#555BF4', '#7A5CFE', '#B95DD4', '#F95FA7', '#FF7578', '#FF8D49', '#FFA840', '#FFC33D']

function hex(c: string) {
  return [1, 3, 5].map((i) => parseInt(c.slice(i, i + 2), 16))
}
function colorAt(i: number) {
  const t = Math.min(i / 6, 7.999)
  const k = Math.floor(t)
  const f = t - k
  const a = hex(KEYS[k])
  const b = hex(KEYS[k + 1])
  return '#' + a.map((v, n) => Math.round(v + (b[n] - v) * f).toString(16).padStart(2, '0')).join('')
}

// Silk ribbon from the Paper design: 9 soft wide bands + 49 fine strokes.
export default function Ribbon({ className }: { className?: string }) {
  const thin = Array.from({ length: 49 }, (_, i) => ({
    d: `M-60 ${82 + 8 * i} C330 ${804 - 6 * i} 682 ${16 + 10 * i} 1160 ${Math.round(410 + 7.17 * i)}`,
    c: colorAt(i),
  }))
  const wide = Array.from({ length: 9 }, (_, k) => thin[k * 6])
  return (
    <svg className={className} width="1100" height="820" viewBox="0 0 1100 820" aria-hidden="true" focusable="false">
      {wide.map((p, i) => (
        <path key={`w${i}`} d={p.d} fill="none" stroke={p.c} strokeWidth="64" opacity="0.13" />
      ))}
      {thin.map((p, i) => (
        <path key={`t${i}`} d={p.d} fill="none" stroke={p.c} strokeWidth="6" opacity="0.85" />
      ))}
    </svg>
  )
}
