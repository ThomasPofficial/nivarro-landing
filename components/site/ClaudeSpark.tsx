/** Claude-style spark mark: tapered rays of uneven length around a center. */
const RAYS = [1, 0.8, 0.94, 0.76, 0.98, 0.84, 0.9, 0.78, 1, 0.82, 0.92, 0.74]

export default function ClaudeSpark({ size = 28, className = '' }: { size?: number; className?: string }) {
  return (
    <svg className={className} width={size} height={size} viewBox="-50 -50 100 100" aria-hidden="true">
      {RAYS.map((len, i) => (
        <path
          key={i}
          d={`M -4.2 0 Q -3 ${-24 * len} 0 ${-48 * len} Q 3 ${-24 * len} 4.2 0 Q 0 5 -4.2 0 Z`}
          transform={`rotate(${i * 30 + (i % 2 ? 7 : 0)})`}
          fill="currentColor"
        />
      ))}
    </svg>
  )
}
