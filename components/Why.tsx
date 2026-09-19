const terms = [
  { label: 'Your first semester', value: 'Free' },
  { label: 'After that', value: '5% + 30¢ per donation' },
  { label: 'Your school keeps', value: 'The rest, straight to its bank account' },
]

export default function Why() {
  return (
    <section className="hp-why" aria-labelledby="why-title">
      <div className="hp-container">
        <div className="hp-panel hp-frame hp-why-panel">
          <div className="hp-why-head">
            <div className="hp-why-title">
              <p className="hp-eyebrow">Why Nivarro</p>
              <h2 className="hp-display" id="why-title">
                Raise more for your school. Pay nothing for a semester.
              </h2>
            </div>
            <p className="hp-lede">
              Alumni give more when they can see the impact — so Nivarro connects students with alumni mentors first, then makes giving simple. Your first semester is free. After that we take a 5% cut plus 30¢ per donation, and nothing else. We only make money when your school does.
            </p>
          </div>

          <dl className="hp-terms">
            {terms.map((t) => (
              <div key={t.label} className="hp-term">
                <dt className="hp-label">{t.label}</dt>
                <dd>{t.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
