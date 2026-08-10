export function ShowcaseFooter({ label }: { label: string }) {
  return (
    <footer className="frame-footer">
      <div className="frame-container frame-footer-inner">
        <span className="frame-footer-brand">
          <img src="/panda-p.svg" alt="" style={{ height: 20, width: 20 }} />
          {label}
        </span>
        <span>Panda CSS v2 · shadcn</span>
      </div>
    </footer>
  )
}
