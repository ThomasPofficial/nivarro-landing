const doctrines = [
  { num: 'I',    text: 'Know Thyself' },
  { num: 'II',   text: 'Find What Moves You' },
  { num: 'III',  text: 'Let Your Yes Be Yes' },
  { num: 'IV',   text: 'Stay Loyal' },
  { num: 'V',    text: 'Carry Yourself With Dignity' },
  { num: 'VI',   text: 'Do It With All Your Might' },
  { num: 'VII',  text: 'Earn Glory Through Output' },
  { num: 'VIII', text: 'Iron Sharpens Iron' },
]

export default function DoctrineStrip() {
  return (
    <div className="doctrine-strip">
      <div className="doctrine-inner">
        {doctrines.map((d) => (
          <div key={d.num} className="doctrine-pill">
            <span className="doctrine-num">{d.num}</span>
            <span className="doctrine-word">{d.text}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
