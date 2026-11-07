'use client'

import { useEffect, useRef, useState } from 'react'

// The interactive tour is a self-contained page (public/tour/app.html). It reports its own height so the
// frame grows to fit and the visitor scrolls the site, not a box inside it.
export default function TourFrame() {
  const ref = useRef<HTMLIFrameElement>(null)
  const [height, setHeight] = useState(1100)

  useEffect(() => {
    function onMessage(e: MessageEvent) {
      if (e.origin !== window.location.origin || e.source !== ref.current?.contentWindow) return
      const h = (e.data as { nivarroTourHeight?: unknown })?.nivarroTourHeight
      if (typeof h === 'number' && h > 200 && h < 20000) setHeight(Math.ceil(h))
    }
    window.addEventListener('message', onMessage)
    return () => window.removeEventListener('message', onMessage)
  }, [])

  return (
    <iframe
      ref={ref}
      className="tr-frame"
      src="/tour/app.html"
      title="Nivarro tour: the staff app with an example school"
      style={{ height }}
      loading="eager"
    />
  )
}
