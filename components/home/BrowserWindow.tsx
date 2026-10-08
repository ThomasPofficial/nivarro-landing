/** Browser-window frame around an app screenshot. Decorative; the screenshot is described by `alt`. */
export default function BrowserWindow({
  url,
  src,
  alt,
  imgWidth,
  imgHeight,
  imgLeft = 0,
  imgTop = 0,
  className = '',
}: {
  url: string
  src: string
  alt: string
  imgWidth: number
  imgHeight: number
  imgLeft?: number
  imgTop?: number
  className?: string
}) {
  return (
    <div className={`hm-win ${className}`}>
      <div className="hm-win-bar">
        <i />
        <i />
        <i />
        <span>{url}</span>
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        width={imgWidth}
        height={imgHeight}
        loading="lazy"
        style={{ width: imgWidth, height: imgHeight, marginLeft: imgLeft, marginTop: imgTop, maxWidth: 'none' }}
      />
    </div>
  )
}
