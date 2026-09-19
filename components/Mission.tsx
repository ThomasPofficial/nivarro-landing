import Image from 'next/image'

const pillars = [
  {
    title: 'Human fulfillment',
    body: 'Give students real mentors, and give alumni a meaningful way to reconnect and give back.',
  },
  {
    title: 'Generational legacy',
    body: 'Every alumni gift funds the next program that gives current students the same head start.',
  },
  {
    title: 'Economic ignition',
    body: 'Close the gap between what alumni want to give and what schools have the system to receive.',
  },
  {
    title: 'The flourish directive',
    body: 'When alumni show up for students, schools thrive and their whole community feels it.',
  },
]

export default function Mission() {
  return (
    <section className="hp-mission">
      <div className="hp-container">
        <div className="hp-stage">
          <div className="hp-media">
            <div className="hp-photo">
              <Image
                src="/connect/lifestyle/feature-older-alumnus-tablet.png"
                alt="An older alumnus reconnecting with his school on a tablet"
                fill
                sizes="(max-width: 900px) 100vw, 760px"
              />
            </div>
          </div>

          <div className="hp-panel hp-stage-panel">
            <p className="hp-eyebrow">Our mission</p>
            <blockquote className="hp-display">
              The day students graduate, schools lose touch with them — and with them, the mentors and donors the next generation needs.
            </blockquote>
          </div>
        </div>

        <ul className="hp-pillars">
          {pillars.map((p) => (
            <li key={p.title} className="hp-pillar">
              <h3 className="hp-label">{p.title}</h3>
              <p className="hp-copy-sm">{p.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
