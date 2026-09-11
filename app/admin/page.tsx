export default function AdminPage() {
  return (
    <div className="container-page py-8">
      <h1 className="font-heading text-h1 text-ink">Admin · Moderation</h1>
      <p className="mt-2 text-body text-ink-muted">
        Role-protected area for reviewing reports and managing users.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="card p-4">
          <p className="text-small text-ink-muted">Open reports</p>
          <p className="mt-1 font-heading text-h2 text-ink">0</p>
        </div>
        <div className="card p-4">
          <p className="text-small text-ink-muted">Active users</p>
          <p className="mt-1 font-heading text-h2 text-ink">0</p>
        </div>
        <div className="card p-4">
          <p className="text-small text-ink-muted">Active jobs</p>
          <p className="mt-1 font-heading text-h2 text-ink">0</p>
        </div>
      </div>

      <div className="card mt-6 p-6 text-body text-ink-muted">
        Moderation tools coming soon. In production, this page is protected by
        a role check — only users with <code>role = &apos;admin&apos;</code> in
        their profile can access it.
      </div>
    </div>
  );
}
