import { useEffect, useState } from "react"

function pad(n) {
  return String(Math.max(0, n)).padStart(2, "0")
}

export default function CountdownTimer({ targetDate }) {
  const [t, setT] = useState(() => Date.now())

  useEffect(() => {
    const id = setInterval(() => setT(Date.now()), 1000)
    return () => clearInterval(id)
  }, [])

  const end = targetDate.getTime()
  const diff = Math.max(0, end - t)
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
  const minutes = Math.floor((diff / (1000 * 60)) % 60)
  const seconds = Math.floor((diff / 1000) % 60)

  const cells = [
    { label: "Days", value: String(days), variant: "blue" },
    { label: "Hours", value: pad(hours), variant: "orange" },
    { label: "Minutes", value: pad(minutes), variant: "blue" },
    { label: "Seconds", value: pad(seconds), variant: "orange" },
  ]

  return (
    <div className="cd-grid">
      {cells.map((c) => (
        <div key={c.label} className={`cd-cell cd-cell--${c.variant}`}>
          <span className="cd-value">{c.value}</span>
          <span className="cd-label">{c.label}</span>
        </div>
      ))}
    </div>
  )
}
