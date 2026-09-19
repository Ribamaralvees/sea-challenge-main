export function CrossDecoration() {
  const crosses = [
    { x: 250, y: 60, s: 1 },
    { x: 150, y: 130, s: 0.85 },
    { x: 330, y: 130, s: 0.85 },
    { x: 60, y: 200, s: 1 },
    { x: 240, y: 200, s: 1 },
    { x: 410, y: 200, s: 0.7 },
    { x: 150, y: 270, s: 0.85 },
    { x: 330, y: 270, s: 1 },
    { x: 240, y: 330, s: 0.7 },
  ]
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 480 380"
      className="pointer-events-none absolute bottom-0 right-0 h-auto w-[clamp(220px,32vw,460px)] text-decorative"
      fill="currentColor"
    >
      {crosses.map((cross, index) => (
        <g key={index} transform={`translate(${cross.x} ${cross.y}) scale(${cross.s})`}>
          <path d="M18 0h20v18h18v20H38v18H18V38H0V18h18z" />
        </g>
      ))}
    </svg>
  )
}

export function CloudDecoration() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 480 300"
      className="pointer-events-none absolute bottom-0 right-0 h-auto w-[clamp(200px,28vw,420px)] text-decorative"
      fill="currentColor"
    >
      <circle cx="90" cy="220" r="60" />
      <circle cx="180" cy="250" r="75" />
      <circle cx="300" cy="240" r="70" />
      <circle cx="400" cy="260" r="80" />
      <circle cx="240" cy="180" r="55" />
      <circle cx="360" cy="170" r="45" />
    </svg>
  )
}
