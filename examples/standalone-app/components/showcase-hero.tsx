export function ShowcaseHero({
  kicker,
  title,
  subtitle,
}: {
  kicker: string
  title: string
  subtitle: string
}) {
  return (
    <header className="frame-hero">
      <div className="frame-glow" />
      <div className="frame-container" style={{ position: 'relative', zIndex: 1 }}>
        <img src="/logo-main.svg" alt="Panda CSS" className="frame-logo logo-light" />
        <img src="/logo-dark.svg" alt="Panda CSS" className="frame-logo logo-dark" />
        <span className="frame-eyebrow">{kicker}</span>
        <h1 className="frame-title">{title}</h1>
        <p className="frame-subtitle">{subtitle}</p>
      </div>
    </header>
  )
}
