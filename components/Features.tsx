const features = [
  {
    title: 'Alumni directory & network',
    body: 'A searchable, private network and group chat connecting students, teachers, and alumni.',
  },
  {
    title: 'AI-generated fundraising pages',
    body: 'Project-specific donation asks, written for your school — no manual campaign building.',
  },
  {
    title: 'Admin dashboard & donation links',
    body: "Real-time visibility into projects and campaigns, funded in-app straight into your school's bank account.",
  },
]

export default function Features() {
  return (
    <section className="hp-features" aria-label="What Nivarro includes">
      <ul className="hp-container hp-features-row">
        {features.map((f) => (
          <li key={f.title} className="hp-feature">
            <h3 className="hp-title">{f.title}</h3>
            <p className="hp-copy-sm">{f.body}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
