export default function CircularProgress({
  value,
  size = 120,
  strokeWidth = 10,
  className = "",
}: {
  value: number // 0..1
  size?: number
  strokeWidth?: number
  className?: string
}) {
  const v = Math.max(0, Math.min(1, value))
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference * (1 - v)

  return (
    <div
      className={`relative inline-block text-brand ${className}`}
      style={{ width: size, height: size }}
      role="img"
      aria-label={`Progress ${(v * 100).toFixed(0)}%`}
    >
      <svg width={size} height={size} className="-rotate-90">
        {/* track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={`hsl(var(--border))`}
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* progress (inherits from .text-brand) */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          fill="none"
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center">
        <div className="text-center">
          <div className="text-2xl font-bold text-foreground">{v.toFixed(2)}</div>
          <div className="text-xs text-muted-foreground">out of 1</div>
        </div>
      </div>
    </div>
  )
}