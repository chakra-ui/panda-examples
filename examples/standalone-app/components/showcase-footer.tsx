export function ShowcaseFooter({ label }: { label: string }) {
  return (
    <footer className="frame-footer">
      <div className="frame-container frame-footer-inner">
        <span className="frame-footer-brand">
          <img src="/panda-badge.svg" alt="" style={{ height: 20, width: 20, borderRadius: 5 }} />
          {label}
        </span>
        <span>Panda CSS · shadcn</span>
      </div>
    </footer>
  )
}
