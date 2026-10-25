const STEPS = [
  { t: 'You ask', b: 'Tell Claude which alum you want in your classroom.' },
  { t: 'We email them', b: 'Nivarro sends the invite for you. No chasing.' },
  { t: 'They accept', b: 'The alum says yes with one click.' },
  { t: 'Class is deeper', b: 'A real graduate walks your students through the lesson.' },
]

/** Static chat mock of a teacher asking Claude (through the Nivarro connection) to set up an alumni visit. */
export default function MeetDemo() {
  return (
    <div className="ag-win" role="img" aria-label="Sample conversation: a teacher asks Claude to set up a meeting with an alum through Nivarro">
      <div className="ag-bar">
        <i />
        <i />
        <i />
        <span>Claude + Nivarro</span>
      </div>
      <div className="ag-body md-body">
        <div className="ag-q-row">
          <div className="ag-q">Ask Dana Ruiz, class of 2014, to meet my AP Biology class about her lab work.</div>
        </div>
        <div className="ag-a is-in">
          <p className="ag-a-eyebrow">DONE</p>
          <p className="ag-a-lead">I emailed Dana through Nivarro.</p>
          <ol className="md-steps">
            {STEPS.map((s, i) => (
              <li key={s.t} className={i < 1 ? 'is-done' : ''}>
                <b>{s.t}</b>
                <span>{s.b}</span>
              </li>
            ))}
          </ol>
        </div>
        <p className="ag-note">Illustrative example. Names are sample data.</p>
      </div>
    </div>
  )
}
