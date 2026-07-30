import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './style.css'

const BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000'

async function api(path, { token, method = 'GET', body, form } = {}) {
  const headers = {}
  if (token) headers.Authorization = `Bearer ${token}`
  if (!form && body !== undefined) headers['Content-Type'] = 'application/json'

  const response = await fetch(`${BASE}${path}`, {
    method,
    headers,
    body: form || (body !== undefined ? JSON.stringify(body) : undefined),
  })
  const payload = await response.json().catch(() => ({}))
  if (!response.ok) throw new Error(payload.message || payload.detail || 'The request could not be completed.')
  return payload.data ?? payload
}

const iconPaths = {
  dashboard: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
  resume: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h8M8 9h2"/>',
  jobs: '<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16M2 12h20"/>',
  results: '<path d="M3 3v18h18"/><path d="m7 16 4-5 4 3 5-7"/>',
  skills: '<path d="m12 2 3 6 7 .9-5 4.8 1.4 6.8-6.4-3.3-6.4 3.3L7 13.7 2 8.9 9 8z"/>',
  logs: '<path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5M12 7v5l3 2"/>',
  analyze: '<path d="M9.5 3a6.5 6.5 0 0 0 0 13c1.6 0 3-.6 4.2-1.5L20 21l1-1-5.6-6.3A6.5 6.5 0 0 0 9.5 3z"/><path d="m7 10 1.7 1.7L12 8.5"/>',
  profile: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
  logout: '<path d="M10 17l5-5-5-5M15 12H3"/><path d="M14 3h5a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-5"/>',
  menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
  bell: '<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  upload: '<path d="M12 16V4M7 9l5-5 5 5"/><path d="M4 15v4a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4"/>',
  trash: '<path d="M3 6h18M8 6V4h8v2M19 6l-1 15H6L5 6M10 11v6M14 11v6"/>',
  eye: '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
  filter: '<path d="M4 5h16M7 12h10M10 19h4"/>',
  close: '<path d="m6 6 12 12M18 6 6 18"/>',
  chevron: '<path d="m9 18 6-6-6-6"/>',
  check: '<path d="m5 12 4 4L19 6"/>',
  warning: '<path d="M10.3 2.9 1.8 17a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 2.9a2 2 0 0 0-3.4 0z"/><path d="M12 9v4M12 17h.01"/>',
  server: '<rect x="3" y="4" width="18" height="6" rx="2"/><rect x="3" y="14" width="18" height="6" rx="2"/><path d="M7 7h.01M7 17h.01"/>',
  activity: '<path d="M3 12h4l2-7 4 14 2-7h6"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  download: '<path d="M12 3v12M7 10l5 5 5-5M5 21h14"/>',
  briefcase: '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18"/>',
  file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/>',
}

function Icon({ name, size = 18, className = '' }) {
  return <svg className={`icon ${className}`} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" dangerouslySetInnerHTML={{ __html: iconPaths[name] || iconPaths.file }} />
}

const cx = (...classes) => classes.filter(Boolean).join(' ')
const titleCase = (value = '') => String(value).replaceAll('_', ' ').replace(/\b\w/g, (m) => m.toUpperCase())
const initials = (name = 'User') => name.split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]).join('').toUpperCase()
const formatDate = (value) => {
  if (!value) return '—'
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? String(value) : new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' }).format(date)
}
const truncate = (value = '', length = 90) => String(value).length > length ? `${String(value).slice(0, length)}…` : String(value)
const pageRecords = (data) => Array.isArray(data) ? data : (data?.records || data?.candidates || [])

function Badge({ children, tone = 'neutral' }) {
  return <span className={`badge badge-${tone}`}>{children}</span>
}

function RoleBadge({ role }) {
  const tones = { admin: 'purple', recruiter: 'blue', candidate: 'green' }
  return <Badge tone={tones[role] || 'neutral'}>{titleCase(role || 'unknown')}</Badge>
}

function Score({ value, compact = false }) {
  const number = Math.max(0, Math.min(100, Number(value || 0)))
  const tone = number >= 80 ? 'excellent' : number >= 60 ? 'good' : number >= 40 ? 'average' : 'poor'
  return <div className={cx('score-pill', `score-${tone}`, compact && 'score-compact')}><span>{Math.round(number)}</span><small>%</small></div>
}

function Tags({ values = [], limit }) {
  const normalized = values.map((value) => typeof value === 'string' ? value : value.skill_name).filter(Boolean)
  const visible = limit ? normalized.slice(0, limit) : normalized
  return <div className="tags">{visible.length ? visible.map((value) => <span key={value}>{value}</span>) : <span className="tag-empty">None detected</span>}{limit && normalized.length > limit && <span className="tag-more">+{normalized.length - limit}</span>}</div>
}

function Button({ children, icon, variant = 'primary', size = 'medium', className = '', ...props }) {
  return <button className={cx('button', `button-${variant}`, `button-${size}`, className)} {...props}>{icon && <Icon name={icon} size={size === 'small' ? 15 : 17} />}{children}</button>
}

function EmptyState({ icon = 'file', title = 'Nothing here yet', text = 'New records will appear here.', action }) {
  return <div className="empty-state"><div className="empty-icon"><Icon name={icon} size={26} /></div><h3>{title}</h3><p>{text}</p>{action}</div>
}

function Spinner({ label = 'Loading data…' }) {
  return <div className="loading-state"><span className="spinner" /><p>{label}</p></div>
}

function Panel({ title, subtitle, actions, children, className = '' }) {
  return <section className={cx('panel', className)}><div className="panel-header"><div><h2>{title}</h2>{subtitle && <p>{subtitle}</p>}</div>{actions && <div className="panel-actions">{actions}</div>}</div>{children}</section>
}

function StatCard({ label, value, icon, tone = 'blue', helper }) {
  return <div className="stat-card"><div className={`stat-icon stat-${tone}`}><Icon name={icon} size={20} /></div><div><span>{label}</span><strong>{Number(value || 0).toLocaleString()}</strong>{helper && <small>{helper}</small>}</div></div>
}

function Toast({ toast, onClose }) {
  useEffect(() => {
    if (!toast) return undefined
    const timer = setTimeout(onClose, 4000)
    return () => clearTimeout(timer)
  }, [toast, onClose])
  if (!toast) return null
  return <div className={cx('toast', `toast-${toast.type || 'success'}`)}><Icon name={toast.type === 'error' ? 'warning' : 'check'} /><div><strong>{toast.title || (toast.type === 'error' ? 'Something went wrong' : 'Completed')}</strong><p>{toast.message}</p></div><button onClick={onClose} aria-label="Close notification"><Icon name="close" size={16} /></button></div>
}

function Modal({ title, subtitle, onClose, children, size = 'medium' }) {
  useEffect(() => {
    const close = (event) => event.key === 'Escape' && onClose()
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  }, [onClose])
  return <div className="modal-backdrop" onMouseDown={(e) => e.target === e.currentTarget && onClose()}><div className={cx('modal', `modal-${size}`)}><div className="modal-header"><div><h2>{title}</h2>{subtitle && <p>{subtitle}</p>}</div><button className="icon-button" onClick={onClose} aria-label="Close"><Icon name="close" /></button></div><div className="modal-body">{children}</div></div></div>
}

function ConfirmDialog({ title, message, confirmLabel = 'Delete', busy, onConfirm, onClose }) {
  return <Modal title={title} onClose={onClose} size="small"><div className="confirm-content"><div className="confirm-icon"><Icon name="warning" size={28} /></div><p>{message}</p><div className="modal-actions"><Button variant="secondary" onClick={onClose}>Cancel</Button><Button variant="danger" icon="trash" disabled={busy} onClick={onConfirm}>{busy ? 'Deleting…' : confirmLabel}</Button></div></div></Modal>
}

function Pagination({ pagination, onPage }) {
  if (!pagination || pagination.totalPages <= 1) return null
  return <div className="pagination"><span>Page {pagination.page} of {pagination.totalPages} · {pagination.total} records</span><div><Button variant="secondary" size="small" disabled={pagination.page <= 1} onClick={() => onPage(pagination.page - 1)}>Previous</Button><Button variant="secondary" size="small" disabled={pagination.page >= pagination.totalPages} onClick={() => onPage(pagination.page + 1)}>Next</Button></div></div>
}

function DataToolbar({ search, onSearch, placeholder = 'Search records…', children }) {
  return <div className="data-toolbar"><label className="search-box"><Icon name="search" size={17} /><input value={search} onChange={(event) => onSearch(event.target.value)} placeholder={placeholder} /></label>{children && <div className="toolbar-actions">{children}</div>}</div>
}

function FileDrop({ multiple = false, accept = '.pdf,.doc,.docx', files = [], onChange, label = 'Upload resume', hint = 'PDF, DOC, or DOCX' }) {
  const [drag, setDrag] = useState(false)
  const selected = multiple ? files : (files ? [files] : [])
  const handle = (list) => onChange(multiple ? [...list] : list[0])
  return <label className={cx('file-drop', drag && 'dragging')} onDragOver={(e) => { e.preventDefault(); setDrag(true) }} onDragLeave={() => setDrag(false)} onDrop={(e) => { e.preventDefault(); setDrag(false); handle(e.dataTransfer.files) }}><input type="file" accept={accept} multiple={multiple} onChange={(e) => handle(e.target.files)} /><div className="file-drop-icon"><Icon name="upload" size={23} /></div><div><strong>{selected.length ? `${selected.length} file${selected.length > 1 ? 's' : ''} selected` : label}</strong><span>{selected.length ? selected.map((f) => f?.name).filter(Boolean).join(', ') : `Drag and drop or click to browse · ${hint}`}</span></div></label>
}

function DetailGrid({ items }) {
  return <div className="detail-grid">{items.map(({ label, value, wide }) => <div className={wide ? 'detail-wide' : ''} key={label}><span>{label}</span><strong>{value ?? '—'}</strong></div>)}</div>
}

function ResultDetail({ result, token }) {
  const [recommendations, setRecommendations] = useState([])
  const [loading, setLoading] = useState(Boolean(result?.result_id))
  useEffect(() => {
    if (!result?.result_id) return
    api(`/api/recommendations/result/${result.result_id}`, { token }).then(setRecommendations).catch(() => setRecommendations([])).finally(() => setLoading(false))
  }, [result?.result_id, token])
  return <div className="result-detail"><div className="result-hero"><div><Badge tone="blue">Analysis #{result.result_id}</Badge><h3>{result.original_name || result.file_name || 'Resume analysis'}</h3><p>{result.title || result.quality_label || 'ATS evaluation'}</p></div><Score value={result.ats_score} /></div><DetailGrid items={[{ label: 'Quality', value: result.quality_label }, { label: 'Ranking', value: result.ranking ? `#${result.ranking}` : 'Not ranked' }, { label: 'Resume ID', value: result.resume_id }, { label: 'Job ID', value: result.jd_id }, { label: 'Created', value: formatDate(result.created_at) }]} />{result.summary && <div className="narrative"><h4>Analysis summary</h4><p>{result.summary}</p></div>}<div className="narrative"><h4>Recommendations</h4>{loading ? <Spinner label="Loading recommendations…" /> : recommendations.length ? <ul className="recommendation-list">{recommendations.map((item, index) => <li key={item.recommendation_id || index}><Icon name="check" size={16} /><span>{item.recommendation_text || item.recommendation || item.text || JSON.stringify(item)}</span></li>)}</ul> : <p className="muted">No recommendations are stored for this result.</p>}</div></div>
}

function Auth({ onAuth }) {
  const [mode, setMode] = useState('signin')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'candidate' })
  const register = mode === 'signup'

  const submit = async (event) => {
    event.preventDefault()
    setBusy(true)
    setError('')
    try {
      const data = await api(`/api/users/${register ? 'signup' : 'signin'}`, { method: 'POST', body: form })
      onAuth(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setBusy(false)
    }
  }

  return <main className="auth-page"><section className="auth-showcase"><div className="auth-brand"><span className="brand-mark"><Icon name="analyze" size={22} /></span><span>TalentLens AI</span></div><div className="showcase-copy"><Badge tone="light">AI-powered talent intelligence</Badge><h1>Make every resume decision <em>clearer.</em></h1><p>Analyze candidate fit, uncover skill gaps, and rank talent through one secure, role-based workspace.</p><div className="proof-grid"><div><strong>Transparent</strong><span>Rule-based ATS scoring</span></div><div><strong>Efficient</strong><span>Batch candidate ranking</span></div><div><strong>Actionable</strong><span>Skill recommendations</span></div></div></div><div className="showcase-preview"><div className="preview-head"><span>Candidate match overview</span><Badge tone="green">Live analysis</Badge></div><div className="preview-score"><div className="preview-ring"><strong>86</strong><span>ATS score</span></div><div><h3>Strong candidate fit</h3><p>12 of 14 required skills matched</p><div className="mini-bars"><i style={{ width: '86%' }} /><i style={{ width: '72%' }} /><i style={{ width: '94%' }} /></div></div></div></div></section><section className="auth-form-wrap"><form className="auth-card" onSubmit={submit}><div className="mobile-brand"><span className="brand-mark"><Icon name="analyze" size={20} /></span><span>TalentLens AI</span></div><div className="auth-heading"><h2>{register ? 'Create your account' : 'Welcome back'}</h2><p>{register ? 'Choose your workspace and start analyzing talent.' : 'Sign in to continue to your workspace.'}</p></div>{register && <label className="field"><span>Full name</span><input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Alex Morgan" /></label>}<label className="field"><span>Email address</span><input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="name@company.com" /></label><label className="field"><span>Password</span><input required minLength={6} type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="Enter your password" /></label>{register && <label className="field"><span>Workspace type</span><select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}><option value="candidate">Candidate — analyze my resume</option><option value="recruiter">Recruiter — compare candidates</option></select></label>}{error && <div className="inline-error"><Icon name="warning" size={17} />{error}</div>}<Button className="auth-submit" disabled={busy}>{busy ? 'Please wait…' : register ? 'Create account' : 'Sign in'}<Icon name="arrow" size={17} /></Button><div className="auth-switch"><span>{register ? 'Already have an account?' : 'New to TalentLens?'}</span><button type="button" onClick={() => { setMode(register ? 'signin' : 'signup'); setError('') }}>{register ? 'Sign in' : 'Create an account'}</button></div>{!register && <div className="demo-access"><Icon name="server" size={18} /><div><strong>Admin access</strong><span>Use the backend-seeded administrator account.</span></div></div>}</form><p className="auth-footer">Secure role-based access · Powered by your AI Resume Analyzer backend</p></section></main>
}

const navByRole = {
  candidate: [
    { id: 'overview', label: 'Overview', icon: 'dashboard' },
    { id: 'analyze', label: 'Analyze resume', icon: 'analyze' },
    { id: 'history', label: 'Analysis history', icon: 'results' },
    { id: 'profile', label: 'Profile settings', icon: 'profile' },
  ],
  recruiter: [
    { id: 'overview', label: 'Overview', icon: 'dashboard' },
    { id: 'analyze', label: 'Analyze candidates', icon: 'analyze' },
    { id: 'jobs', label: 'Job descriptions', icon: 'jobs' },
    { id: 'resumes', label: 'Resume library', icon: 'resume' },
    { id: 'results', label: 'Analysis results', icon: 'results' },
    { id: 'profile', label: 'Profile settings', icon: 'profile' },
  ],
  admin: [
    { id: 'overview', label: 'System overview', icon: 'dashboard' },
    { id: 'users', label: 'User management', icon: 'users' },
    { id: 'resumes', label: 'Resume repository', icon: 'resume' },
    { id: 'jobs', label: 'Job descriptions', icon: 'jobs' },
    { id: 'results', label: 'Analysis results', icon: 'results' },
    { id: 'skills', label: 'Skills library', icon: 'skills' },
    { id: 'logs', label: 'Audit logs', icon: 'logs' },
    { id: 'profile', label: 'Profile settings', icon: 'profile' },
  ],
}

function AppShell({ session, current, setCurrent, onLogout, children }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [health, setHealth] = useState('checking')
  useEffect(() => {
    let active = true
    const check = () => api('/health').then(() => active && setHealth('online')).catch(() => active && setHealth('offline'))
    check()
    const timer = setInterval(check, 60000)
    return () => { active = false; clearInterval(timer) }
  }, [])
  const role = session.user?.role || 'candidate'
  const nav = navByRole[role] || navByRole.candidate
  const active = nav.find((item) => item.id === current) || nav[0]
  return <div className="shell"><aside className={cx('sidebar', mobileOpen && 'sidebar-open')}><div className="sidebar-brand"><span className="brand-mark"><Icon name="analyze" size={21} /></span><div><strong>TalentLens</strong><small>AI Resume Analyzer</small></div><button className="mobile-close" onClick={() => setMobileOpen(false)}><Icon name="close" /></button></div><div className="workspace-label">{titleCase(role)} workspace</div><nav className="side-nav">{nav.map((item) => <button key={item.id} className={current === item.id ? 'active' : ''} onClick={() => { setCurrent(item.id); setMobileOpen(false) }}><Icon name={item.icon} /><span>{item.label}</span>{current === item.id && <Icon name="chevron" size={15} className="nav-chevron" />}</button>)}</nav><div className="sidebar-bottom"><div className="sidebar-user"><span className="avatar">{initials(session.user?.name)}</span><div><strong>{session.user?.name || 'User'}</strong><small>{session.user?.email}</small></div></div><button className="logout-button" onClick={onLogout}><Icon name="logout" /><span>Sign out</span></button></div></aside>{mobileOpen && <div className="sidebar-overlay" onClick={() => setMobileOpen(false)} />}<main className="workspace"><header className="topbar"><div className="topbar-title"><button className="menu-button" onClick={() => setMobileOpen(true)}><Icon name="menu" /></button><div><span>{titleCase(role)} portal</span><h1>{active.label}</h1></div></div><div className="topbar-actions"><div className={cx('api-status', health)}><i /><span>{health === 'online' ? 'API connected' : health === 'offline' ? 'API offline' : 'Checking API'}</span></div><button className="icon-button" aria-label="Notifications"><Icon name="bell" /></button><span className="top-avatar">{initials(session.user?.name)}</span></div></header><div className="workspace-content">{children}</div></main></div>
}

function OverviewHero({ eyebrow, title, text, action }) {
  return <section className="overview-hero"><div><span className="eyebrow">{eyebrow}</span><h2>{title}</h2><p>{text}</p></div>{action}</section>
}

function ActivityList({ rows = [], type = 'result' }) {
  if (!rows.length) return <EmptyState icon="activity" title="No recent activity" text="Activity will appear after the first analysis." />
  return <div className="activity-list">{rows.map((row, index) => <div className="activity-row" key={row.result_id || row.log_id || row.resume_id || index}><span className={`activity-icon activity-${type}`}><Icon name={type === 'log' ? 'logs' : type === 'resume' ? 'resume' : 'results'} size={17} /></span><div><strong>{type === 'log' ? titleCase(row.event) : row.original_name || row.file_name || row.title || `Analysis #${row.result_id}`}</strong><p>{type === 'log' ? truncate(row.description, 80) : row.quality_label || row.title || 'Resume processed successfully'}</p></div><div className="activity-meta">{row.ats_score !== undefined && <Score value={row.ats_score} compact />}<span>{formatDate(row.created_at || row.upload_date)}</span></div></div>)}</div>
}

function CandidateOverview({ token, onNavigate }) {
  const [state, setState] = useState({ loading: true, resumes: [], results: [], error: '' })
  useEffect(() => {
    Promise.all([api('/api/resumes?limit=5', { token }), api('/api/results?limit=5', { token })]).then(([resumes, results]) => setState({ loading: false, resumes: pageRecords(resumes), results: pageRecords(results), resumeTotal: resumes.pagination?.total || 0, resultTotal: results.pagination?.total || 0, error: '' })).catch((err) => setState((s) => ({ ...s, loading: false, error: err.message })))
  }, [token])
  const best = state.results.reduce((max, row) => Math.max(max, Number(row.ats_score || 0)), 0)
  return <><OverviewHero eyebrow="Candidate dashboard" title="Build a resume that gets noticed." text="Track your ATS performance, understand missing skills, and act on recommendations from every analysis." action={<Button icon="analyze" onClick={() => onNavigate('analyze')}>New analysis</Button>} />{state.error && <div className="inline-error"><Icon name="warning" />{state.error}</div>}<div className="stats-grid"><StatCard label="Resumes uploaded" value={state.resumeTotal} icon="resume" tone="blue" /><StatCard label="Analyses completed" value={state.resultTotal} icon="results" tone="purple" /><StatCard label="Best ATS score" value={best} icon="skills" tone="green" helper="Highest recorded match" /><StatCard label="Profile status" value={100} icon="profile" tone="orange" helper="Account active" /></div><div className="dashboard-grid"><Panel title="Recent analyses" subtitle="Your latest resume-to-job matches" actions={<Button variant="ghost" size="small" onClick={() => onNavigate('history')}>View all <Icon name="arrow" size={14} /></Button>}>{state.loading ? <Spinner /> : <ActivityList rows={state.results} />}</Panel><Panel title="Your next best move" subtitle="A focused workflow for stronger results"><div className="steps-list"><div><span>1</span><div><strong>Use the complete job description</strong><p>More context gives the analyzer a better skill baseline.</p></div></div><div><span>2</span><div><strong>Review missing skills</strong><p>Add only skills you genuinely have and can demonstrate.</p></div></div><div><span>3</span><div><strong>Run another analysis</strong><p>Compare the improved score before applying.</p></div></div></div></Panel></div></>
}

function CandidateAnalyze({ token, notify }) {
  const [form, setForm] = useState({ jd: '', file: null })
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [result, setResult] = useState(null)
  const run = async (event) => {
    event.preventDefault()
    if (!form.file) return setError('Choose a resume file before starting the analysis.')
    const payload = new FormData()
    payload.append('resume', form.file)
    payload.append('jd_text', form.jd)
    setBusy(true); setError('')
    try {
      const data = await api('/api/analysis/candidate', { token, method: 'POST', form: payload })
      setResult(data)
      notify('Resume analysis completed successfully.')
    } catch (err) { setError(err.message) } finally { setBusy(false) }
  }
  return <div className="form-layout"><Panel title="Analyze your resume" subtitle="Compare one resume against a target job description."><form className="stack-form" onSubmit={run}><label className="field"><span>Target job description</span><textarea required value={form.jd} onChange={(e) => setForm({ ...form, jd: e.target.value })} placeholder="Paste the full role description, including responsibilities and required skills…" /></label><div><span className="field-label">Resume document</span><FileDrop files={form.file} onChange={(file) => setForm({ ...form, file })} /></div>{error && <div className="inline-error"><Icon name="warning" />{error}</div>}<Button icon="analyze" disabled={busy}>{busy ? 'Analyzing resume…' : 'Run ATS analysis'}</Button></form></Panel><Panel title="How scoring works" subtitle="The backend remains the source of truth."><div className="formula-card"><span>ATS score</span><strong>Matched required skills</strong><i>÷</i><strong>Total required skills</strong><em>× 100</em></div><div className="score-legend"><div><i className="legend-excellent" /><span>80–100</span><strong>Excellent</strong></div><div><i className="legend-good" /><span>60–79</span><strong>Good</strong></div><div><i className="legend-average" /><span>40–59</span><strong>Average</strong></div><div><i className="legend-poor" /><span>Below 40</span><strong>Needs work</strong></div></div></Panel>{result && <section className="analysis-output"><div className="output-heading"><div><Badge tone="green">Analysis complete</Badge><h2>Your ATS match report</h2><p>{result.quality_label}</p></div><Score value={result.ats_score} /></div><div className="output-grid"><div className="insight-card"><span className="insight-icon success"><Icon name="check" /></span><h3>Matched skills</h3><Tags values={result.matched_skills || []} /></div><div className="insight-card"><span className="insight-icon warning"><Icon name="warning" /></span><h3>Skills to address</h3><Tags values={result.missing_skills || []} /></div></div><div className="recommendation-panel"><h3>Recommended improvements</h3><ul className="recommendation-list">{(result.recommendations || []).map((item, index) => <li key={index}><Icon name="arrow" size={16} /><span>{typeof item === 'string' ? item : item.recommendation_text || JSON.stringify(item)}</span></li>)}</ul></div></section>}</div>
}

function ResultsPage({ token, endpoint = '/api/results', title = 'Analysis results', subtitle = 'Review ATS scores and generated recommendations.' }) {
  const [data, setData] = useState(null)
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState(null)
  const [error, setError] = useState('')
  useEffect(() => {
    setData(null); setError('')
    api(`${endpoint}${endpoint.includes('?') ? '&' : '?'}page=${page}&limit=12`, { token }).then(setData).catch((err) => setError(err.message))
  }, [token, endpoint, page])
  const rows = pageRecords(data).filter((row) => `${row.original_name || ''} ${row.title || ''} ${row.quality_label || ''}`.toLowerCase().includes(search.toLowerCase()))
  return <Panel title={title} subtitle={subtitle}><DataToolbar search={search} onSearch={setSearch} placeholder="Search by resume, job, or quality…" />{error ? <div className="inline-error"><Icon name="warning" />{error}</div> : !data ? <Spinner /> : rows.length ? <div className="table-wrap"><table><thead><tr><th>Resume</th><th>Job description</th><th>ATS score</th><th>Quality</th><th>Ranking</th><th>Date</th><th /></tr></thead><tbody>{rows.map((row) => <tr key={row.result_id}><td><div className="primary-cell"><span className="table-icon"><Icon name="resume" size={17} /></span><div><strong>{row.original_name || `Resume #${row.resume_id}`}</strong><span>Result #{row.result_id}</span></div></div></td><td><strong>{row.title || `Job #${row.jd_id}`}</strong></td><td><Score value={row.ats_score} compact /></td><td><Badge tone={Number(row.ats_score) >= 80 ? 'green' : Number(row.ats_score) >= 60 ? 'blue' : Number(row.ats_score) >= 40 ? 'orange' : 'red'}>{row.quality_label || 'Analyzed'}</Badge></td><td>{row.ranking ? `#${row.ranking}` : '—'}</td><td>{formatDate(row.created_at)}</td><td><button className="row-action" onClick={() => setSelected(row)} title="View result"><Icon name="eye" size={17} /></button></td></tr>)}</tbody></table></div> : <EmptyState icon="results" title="No analysis results found" text="Run a resume analysis to create the first result." />}<Pagination pagination={data?.pagination} onPage={setPage} />{selected && <Modal title="Analysis details" subtitle="Score, ranking, summary, and recommendations" onClose={() => setSelected(null)} size="large"><ResultDetail result={selected} token={token} /></Modal>}</Panel>
}

function CandidateWorkspace({ current, token, session, onSession, notify, onNavigate }) {
  if (current === 'overview') return <CandidateOverview token={token} onNavigate={onNavigate} />
  if (current === 'analyze') return <CandidateAnalyze token={token} notify={notify} />
  if (current === 'history') return <ResultsPage token={token} title="Analysis history" subtitle="Open any result to review your score and recommendations." />
  return <ProfilePage token={token} user={session.user} onSession={onSession} notify={notify} />
}

function RecruiterOverview({ token, onNavigate }) {
  const [state, setState] = useState({ loading: true, jds: [], resumes: [], results: [], error: '' })
  useEffect(() => {
    Promise.all([api('/api/jds?limit=5', { token }), api('/api/resumes?limit=5', { token }), api('/api/results?limit=5', { token })]).then(([jds, resumes, results]) => setState({ loading: false, jds: pageRecords(jds), resumes: pageRecords(resumes), results: pageRecords(results), jdTotal: jds.pagination?.total || 0, resumeTotal: resumes.pagination?.total || 0, resultTotal: results.pagination?.total || 0, error: '' })).catch((err) => setState((s) => ({ ...s, loading: false, error: err.message })))
  }, [token])
  const average = state.results.length ? state.results.reduce((sum, row) => sum + Number(row.ats_score || 0), 0) / state.results.length : 0
  return <><OverviewHero eyebrow="Recruiter dashboard" title="Move from resumes to a confident shortlist." text="Create job criteria, analyze candidates in batches, and inspect every ranking from one workspace." action={<Button icon="analyze" onClick={() => onNavigate('analyze')}>Analyze candidates</Button>} />{state.error && <div className="inline-error"><Icon name="warning" />{state.error}</div>}<div className="stats-grid"><StatCard label="Active job descriptions" value={state.jdTotal} icon="jobs" tone="blue" /><StatCard label="Resumes processed" value={state.resumeTotal} icon="resume" tone="purple" /><StatCard label="Analysis results" value={state.resultTotal} icon="results" tone="green" /><StatCard label="Average ATS score" value={Math.round(average)} icon="activity" tone="orange" helper="Recent results" /></div><div className="dashboard-grid dashboard-grid-wide"><Panel title="Recent candidate analyses" subtitle="Latest resume evaluations" actions={<Button variant="ghost" size="small" onClick={() => onNavigate('results')}>View all <Icon name="arrow" size={14} /></Button>}>{state.loading ? <Spinner /> : <ActivityList rows={state.results} />}</Panel><Panel title="Open job descriptions" subtitle="Recently created hiring criteria">{state.loading ? <Spinner /> : state.jds.length ? <div className="compact-list">{state.jds.map((jd) => <button key={jd.jd_id} onClick={() => onNavigate('jobs')}><span className="table-icon"><Icon name="jobs" size={17} /></span><div><strong>{jd.title}</strong><small>{jd.experience_required ? `${jd.experience_required} years experience` : 'Experience flexible'}</small></div><Icon name="chevron" size={16} /></button>)}</div> : <EmptyState icon="jobs" title="No jobs created" text="Create a job description to start ranking candidates." />}</Panel></div></>
}

function RecruiterAnalyze({ token, notify }) {
  const [form, setForm] = useState({ title: '', experience: '', jd: '', files: [] })
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [result, setResult] = useState(null)
  const run = async (event) => {
    event.preventDefault()
    if (!form.files.length || form.files.length > 5) return setError('Select between 1 and 5 PDF resumes.')
    const payload = new FormData()
    payload.append('jd_title', form.title)
    payload.append('experience_required', form.experience)
    payload.append('jd_text', form.jd)
    form.files.forEach((file) => payload.append('resumes', file))
    setBusy(true); setError('')
    try {
      const data = await api('/recruiter/analyze', { token, method: 'POST', form: payload })
      setResult(data)
      notify(`${data.total_resumes || form.files.length} candidates analyzed and ranked.`)
    } catch (err) { setError(err.message) } finally { setBusy(false) }
  }
  const candidates = result?.candidates || []
  return <div className="form-layout"><Panel title="Analyze and rank candidates" subtitle="Upload up to five PDF resumes against one job description."><form className="stack-form" onSubmit={run}><div className="form-grid"><label className="field"><span>Job title</span><input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="e.g. Senior Data Analyst" /></label><label className="field"><span>Experience required</span><input type="number" min="0" value={form.experience} onChange={(e) => setForm({ ...form, experience: e.target.value })} placeholder="e.g. 5" /></label></div><label className="field"><span>Job description</span><textarea required value={form.jd} onChange={(e) => setForm({ ...form, jd: e.target.value })} placeholder="Paste the complete job description and required skills…" /></label><div><span className="field-label">Candidate resumes</span><FileDrop multiple accept="application/pdf,.pdf" files={form.files} onChange={(files) => setForm({ ...form, files })} label="Upload candidate resumes" hint="PDF only · maximum 5 files" /></div>{error && <div className="inline-error"><Icon name="warning" />{error}</div>}<Button icon="analyze" disabled={busy}>{busy ? 'Analyzing and ranking…' : 'Analyze candidates'}</Button></form></Panel><Panel title="Batch analysis checklist" subtitle="For the most reliable ranking"><div className="check-list"><div><Icon name="check" /><span>Use the same role criteria for every candidate.</span></div><div><Icon name="check" /><span>Upload text-based PDFs for accurate parsing.</span></div><div><Icon name="check" /><span>Review score, skills, and summary together.</span></div><div><Icon name="check" /><span>Use ranking as decision support, not the only decision.</span></div></div></Panel>{result && <Panel className="full-span" title="Ranked candidate shortlist" subtitle={`Job #${result.jd_id} · ${candidates.length} candidate${candidates.length === 1 ? '' : 's'} analyzed`}><div className="ranking-list">{candidates.map((candidate, index) => <div className="candidate-card" key={candidate.result_id || index}><div className="rank-number">#{candidate.rank || index + 1}</div><div className="candidate-main"><div className="candidate-heading"><div><h3>{candidate.file_name || candidate.candidate_resume_name || `Candidate ${index + 1}`}</h3><p>{candidate.quality_label || candidate.recommendation_summary}</p></div><Score value={candidate.ats_score} /></div><div className="skill-columns"><div><span>Matched skills</span><Tags values={candidate.matched_skills || []} limit={8} /></div><div><span>Missing skills</span><Tags values={candidate.missing_skills || []} limit={8} /></div></div></div></div>)}</div></Panel>}</div>
}

function JobsPage({ token, notify, admin = false }) {
  const endpoint = admin ? '/api/admin/jds' : '/api/jds'
  const [data, setData] = useState(null)
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [createOpen, setCreateOpen] = useState(false)
  const [rankJob, setRankJob] = useState(null)
  const [selected, setSelected] = useState(null)
  const [confirm, setConfirm] = useState(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const load = () => { setData(null); api(`${endpoint}?page=${page}&limit=12`, { token }).then(setData).catch((err) => setError(err.message)) }
  useEffect(load, [endpoint, page, token])
  const rows = pageRecords(data).filter((row) => `${row.title} ${row.description}`.toLowerCase().includes(search.toLowerCase()))
  const remove = async () => {
    setBusy(true)
    try { await api(`/api/jds/${confirm.jd_id}`, { token, method: 'DELETE' }); notify('Job description deleted.'); setConfirm(null); load() } catch (err) { notify(err.message, 'error') } finally { setBusy(false) }
  }
  return <Panel title={admin ? 'Job description repository' : 'Job descriptions'} subtitle={admin ? 'Review and govern every job description stored in the platform.' : 'Create hiring criteria and run candidate rankings for any job.'} actions={!admin && <Button icon="plus" onClick={() => setCreateOpen(true)}>Create job</Button>}><DataToolbar search={search} onSearch={setSearch} placeholder="Search job descriptions…" />{error ? <div className="inline-error"><Icon name="warning" />{error}</div> : !data ? <Spinner /> : rows.length ? <div className="table-wrap"><table><thead><tr><th>Job title</th><th>Recruiter</th><th>Experience</th><th>Created</th><th className="actions-column">Actions</th></tr></thead><tbody>{rows.map((row) => <tr key={row.jd_id}><td><div className="primary-cell"><span className="table-icon"><Icon name="jobs" size={17} /></span><div><strong>{row.title}</strong><span>{truncate(row.description, 65)}</span></div></div></td><td>User #{row.recruiter_id}</td><td>{row.experience_required ? `${row.experience_required} years` : 'Not specified'}</td><td>{formatDate(row.upload_date)}</td><td><div className="row-actions"><button className="row-action" onClick={() => setSelected(row)} title="View"><Icon name="eye" size={17} /></button>{!admin && <button className="row-action row-action-primary" onClick={() => setRankJob(row)} title="Rank candidates"><Icon name="analyze" size={17} /></button>}<button className="row-action row-action-danger" onClick={() => setConfirm(row)} title="Delete"><Icon name="trash" size={17} /></button></div></td></tr>)}</tbody></table></div> : <EmptyState icon="jobs" title="No job descriptions found" text={admin ? 'Job descriptions created by recruiters will appear here.' : 'Create your first job description to begin candidate ranking.'} action={!admin && <Button icon="plus" onClick={() => setCreateOpen(true)}>Create job</Button>} />}<Pagination pagination={data?.pagination} onPage={setPage} />{createOpen && <CreateJobModal token={token} notify={notify} onClose={() => setCreateOpen(false)} onCreated={() => { setCreateOpen(false); load() }} />}{rankJob && <RankJobModal job={rankJob} token={token} notify={notify} onClose={() => setRankJob(null)} />}{selected && <JobDetailModal job={selected} token={token} onClose={() => setSelected(null)} />}{confirm && <ConfirmDialog title="Delete job description?" message={`“${confirm.title}” and its related database records may be removed. This action cannot be undone.`} busy={busy} onClose={() => setConfirm(null)} onConfirm={remove} />}</Panel>
}

function CreateJobModal({ token, notify, onClose, onCreated }) {
  const [form, setForm] = useState({ title: '', description: '', experience_required: '' })
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const submit = async (event) => {
    event.preventDefault(); setBusy(true); setError('')
    try { await api('/api/jds', { token, method: 'POST', body: form }); notify('Job description created successfully.'); onCreated() } catch (err) { setError(err.message) } finally { setBusy(false) }
  }
  return <Modal title="Create job description" subtitle="Define the role criteria used for skill extraction and ranking." onClose={onClose}><form className="stack-form" onSubmit={submit}><label className="field"><span>Job title</span><input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="e.g. Power BI Developer" /></label><label className="field"><span>Experience required</span><input type="number" min="0" value={form.experience_required} onChange={(e) => setForm({ ...form, experience_required: e.target.value })} placeholder="Years" /></label><label className="field"><span>Full description</span><textarea required value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Responsibilities, required skills, qualifications…" /></label>{error && <div className="inline-error"><Icon name="warning" />{error}</div>}<div className="modal-actions"><Button type="button" variant="secondary" onClick={onClose}>Cancel</Button><Button icon="plus" disabled={busy}>{busy ? 'Creating…' : 'Create job'}</Button></div></form></Modal>
}

function RankJobModal({ job, token, notify, onClose }) {
  const [files, setFiles] = useState([])
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [results, setResults] = useState([])
  const run = async (event) => {
    event.preventDefault()
    if (!files.length) return setError('Select at least one PDF resume.')
    const form = new FormData(); files.forEach((file) => form.append('resumes', file))
    setBusy(true); setError('')
    try { const data = await api(`/api/rankings/${job.jd_id}`, { token, method: 'POST', form }); setResults(pageRecords(data)); notify('Candidate ranking completed.') } catch (err) { setError(err.message) } finally { setBusy(false) }
  }
  return <Modal title={`Rank candidates for ${job.title}`} subtitle={`Job description #${job.jd_id} · Upload one or more PDF resumes`} onClose={onClose} size="large"><form className="stack-form" onSubmit={run}><FileDrop multiple accept="application/pdf,.pdf" files={files} onChange={setFiles} label="Upload resumes for ranking" hint="PDF only · up to 20 files supported by the endpoint" />{error && <div className="inline-error"><Icon name="warning" />{error}</div>}<Button icon="analyze" disabled={busy}>{busy ? 'Running ranking…' : 'Run candidate ranking'}</Button></form>{results.length > 0 && <div className="ranking-list modal-ranking">{results.map((candidate, index) => <div className="candidate-card" key={candidate.result_id || index}><div className="rank-number">#{candidate.rank || index + 1}</div><div className="candidate-main"><div className="candidate-heading"><div><h3>{candidate.candidate_resume_name || candidate.original_name || `Candidate ${index + 1}`}</h3><p>{candidate.quality_label || candidate.recommendation_summary}</p></div><Score value={candidate.ats_score} /></div><Tags values={candidate.matched_skills || []} limit={7} /></div></div>)}</div>}</Modal>
}

function JobDetailModal({ job, token, onClose }) {
  const [details, setDetails] = useState(null)
  useEffect(() => { api(`/api/jds/${job.jd_id}`, { token }).then(setDetails).catch(() => setDetails(job)) }, [job, token])
  return <Modal title={job.title} subtitle={`Job description #${job.jd_id}`} onClose={onClose} size="large">{!details ? <Spinner /> : <div><DetailGrid items={[{ label: 'Recruiter ID', value: details.recruiter_id }, { label: 'Experience', value: details.experience_required ? `${details.experience_required} years` : 'Not specified' }, { label: 'Created', value: formatDate(details.upload_date) }]} /><div className="narrative"><h4>Job description</h4><p className="preserve-text">{details.description}</p></div><div className="narrative"><h4>Extracted required skills</h4><Tags values={details.skills || []} /></div></div>}</Modal>
}

function ResumesPage({ token, notify, admin = false }) {
  const endpoint = admin ? '/api/admin/resumes' : '/api/resumes'
  const [data, setData] = useState(null)
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState(null)
  const [confirm, setConfirm] = useState(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const load = () => { setData(null); api(`${endpoint}?page=${page}&limit=12`, { token }).then(setData).catch((err) => setError(err.message)) }
  useEffect(load, [endpoint, page, token])
  const rows = pageRecords(data).filter((row) => `${row.original_name} ${row.file_name}`.toLowerCase().includes(search.toLowerCase()))
  const remove = async () => { setBusy(true); try { await api(`/api/resumes/${confirm.resume_id}`, { token, method: 'DELETE' }); notify('Resume deleted successfully.'); setConfirm(null); load() } catch (err) { notify(err.message, 'error') } finally { setBusy(false) } }
  return <Panel title={admin ? 'Resume repository' : 'Resume library'} subtitle={admin ? 'Inspect all uploaded candidate documents across the system.' : 'Review the resumes uploaded through your recruiter analyses.'}><DataToolbar search={search} onSearch={setSearch} placeholder="Search resume files…" />{error ? <div className="inline-error"><Icon name="warning" />{error}</div> : !data ? <Spinner /> : rows.length ? <div className="table-wrap"><table><thead><tr><th>Resume</th><th>Candidate</th><th>Uploaded by</th><th>Uploaded</th><th className="actions-column">Actions</th></tr></thead><tbody>{rows.map((row) => <tr key={row.resume_id}><td><div className="primary-cell"><span className="table-icon"><Icon name="resume" size={17} /></span><div><strong>{row.original_name || row.file_name}</strong><span>Resume #{row.resume_id}</span></div></div></td><td>{row.candidate_id ? `User #${row.candidate_id}` : <Badge tone="neutral">Recruiter upload</Badge>}</td><td>User #{row.uploaded_by}</td><td>{formatDate(row.upload_date)}</td><td><div className="row-actions"><button className="row-action" onClick={() => setSelected(row)}><Icon name="eye" size={17} /></button><button className="row-action row-action-danger" onClick={() => setConfirm(row)}><Icon name="trash" size={17} /></button></div></td></tr>)}</tbody></table></div> : <EmptyState icon="resume" title="No resumes found" text="Uploaded resumes will appear in this repository." />}<Pagination pagination={data?.pagination} onPage={setPage} />{selected && <ResumeDetailModal resume={selected} token={token} onClose={() => setSelected(null)} />}{confirm && <ConfirmDialog title="Delete resume?" message={`“${confirm.original_name || confirm.file_name}” will be permanently removed along with dependent records.`} busy={busy} onClose={() => setConfirm(null)} onConfirm={remove} />}</Panel>
}

function ResumeDetailModal({ resume, token, onClose }) {
  const [details, setDetails] = useState(null)
  useEffect(() => { api(`/api/resumes/${resume.resume_id}`, { token }).then(setDetails).catch(() => setDetails(resume)) }, [resume, token])
  return <Modal title={resume.original_name || resume.file_name} subtitle={`Resume #${resume.resume_id}`} onClose={onClose} size="large">{!details ? <Spinner /> : <div><DetailGrid items={[{ label: 'Candidate ID', value: details.candidate_id || 'Recruiter upload' }, { label: 'Uploaded by', value: `User #${details.uploaded_by}` }, { label: 'Stored file', value: details.file_name }, { label: 'Upload date', value: formatDate(details.upload_date) }]} /><div className="narrative"><h4>Detected skills</h4><Tags values={details.skills || []} /></div>{details.extracted_text && <div className="narrative"><h4>Extracted resume text</h4><p className="preserve-text text-preview">{details.extracted_text}</p></div>}</div>}</Modal>
}

function RecruiterWorkspace({ current, token, session, onSession, notify, onNavigate }) {
  if (current === 'overview') return <RecruiterOverview token={token} onNavigate={onNavigate} />
  if (current === 'analyze') return <RecruiterAnalyze token={token} notify={notify} />
  if (current === 'jobs') return <JobsPage token={token} notify={notify} />
  if (current === 'resumes') return <ResumesPage token={token} notify={notify} />
  if (current === 'results') return <ResultsPage token={token} />
  return <ProfilePage token={token} user={session.user} onSession={onSession} notify={notify} />
}

function AdminOverview({ token, onNavigate }) {
  const [state, setState] = useState({ loading: true, stats: {}, logs: [], results: [], health: 'checking', error: '' })
  useEffect(() => {
    Promise.all([api('/api/admin/dashboard', { token }), api('/api/admin/logs?limit=6', { token }), api('/api/admin/results?limit=5', { token })]).then(([stats, logs, results]) => setState({ loading: false, stats, logs: pageRecords(logs), results: pageRecords(results), health: 'online', error: '' })).catch((err) => setState((s) => ({ ...s, loading: false, health: 'degraded', error: err.message })))
  }, [token])
  const stats = state.stats || {}
  const total = Number(stats.users || 0) + Number(stats.resumes || 0) + Number(stats.job_descriptions || 0) + Number(stats.results || 0)
  const segments = [stats.users, stats.resumes, stats.job_descriptions, stats.results].map((value) => total ? Math.round(Number(value || 0) / total * 100) : 0)
  return <><OverviewHero eyebrow="Administration console" title="Operational visibility across the full platform." text="Monitor adoption, content, AI analysis output, and audit events while managing system records securely." action={<Button icon="users" onClick={() => onNavigate('users')}>Manage users</Button>} />{state.error && <div className="inline-error"><Icon name="warning" />{state.error}</div>}<div className="stats-grid admin-stats"><StatCard label="Registered users" value={stats.users} icon="users" tone="blue" helper="All roles" /><StatCard label="Stored resumes" value={stats.resumes} icon="resume" tone="purple" helper="Candidate and recruiter uploads" /><StatCard label="Job descriptions" value={stats.job_descriptions} icon="jobs" tone="orange" helper="Hiring criteria" /><StatCard label="Analysis results" value={stats.results} icon="results" tone="green" helper="Completed evaluations" /><StatCard label="Audit events" value={stats.logs} icon="logs" tone="slate" helper="Tracked system actions" /></div><div className="admin-dashboard-grid"><Panel title="Platform distribution" subtitle="Relative volume across core records"><div className="distribution-chart"><div className="donut" style={{ '--p1': `${segments[0]}%`, '--p2': `${segments[0] + segments[1]}%`, '--p3': `${segments[0] + segments[1] + segments[2]}%` }}><div><strong>{total.toLocaleString()}</strong><span>Total records</span></div></div><div className="chart-legend"><div><i className="chart-blue" /><span>Users</span><strong>{stats.users || 0}</strong></div><div><i className="chart-purple" /><span>Resumes</span><strong>{stats.resumes || 0}</strong></div><div><i className="chart-orange" /><span>Job descriptions</span><strong>{stats.job_descriptions || 0}</strong></div><div><i className="chart-green" /><span>Results</span><strong>{stats.results || 0}</strong></div></div></div></Panel><Panel title="System health" subtitle="Live service and governance status"><div className="health-list"><div><span className={cx('health-dot', state.health === 'online' ? 'online' : 'warning')} /><div><strong>Backend API</strong><p>{state.health === 'online' ? 'Responding normally' : 'Connection requires attention'}</p></div><Badge tone={state.health === 'online' ? 'green' : 'orange'}>{titleCase(state.health)}</Badge></div><div><span className="health-dot online" /><div><strong>Role-based access</strong><p>Admin authorization active</p></div><Badge tone="green">Protected</Badge></div><div><span className="health-dot online" /><div><strong>Audit logging</strong><p>{stats.logs || 0} events recorded</p></div><Badge tone="blue">Enabled</Badge></div></div></Panel><Panel title="Recent audit activity" subtitle="Latest system events" actions={<Button variant="ghost" size="small" onClick={() => onNavigate('logs')}>Open logs <Icon name="arrow" size={14} /></Button>}>{state.loading ? <Spinner /> : <ActivityList rows={state.logs} type="log" />}</Panel><Panel title="Latest analysis results" subtitle="Recently completed ATS evaluations" actions={<Button variant="ghost" size="small" onClick={() => onNavigate('results')}>View results <Icon name="arrow" size={14} /></Button>}>{state.loading ? <Spinner /> : <ActivityList rows={state.results} />}</Panel></div></>
}

function UsersPage({ token, currentUser, notify }) {
  const [data, setData] = useState(null)
  const [page, setPage] = useState(1)
  const [role, setRole] = useState('')
  const [search, setSearch] = useState('')
  const [confirm, setConfirm] = useState(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const load = () => { setData(null); setError(''); api(`/api/admin/users?page=${page}&limit=12${role ? `&role=${role}` : ''}`, { token }).then(setData).catch((err) => setError(err.message)) }
  useEffect(load, [token, page, role])
  const rows = pageRecords(data).filter((row) => `${row.name} ${row.email}`.toLowerCase().includes(search.toLowerCase()))
  const remove = async () => { setBusy(true); try { await api(`/api/admin/users/${confirm.user_id}`, { token, method: 'DELETE' }); notify('User account deleted successfully.'); setConfirm(null); load() } catch (err) { notify(err.message, 'error') } finally { setBusy(false) } }
  return <Panel title="User management" subtitle="Search, filter, and administer candidate and recruiter accounts."><DataToolbar search={search} onSearch={setSearch} placeholder="Search name or email…"><label className="select-filter"><Icon name="filter" size={16} /><select value={role} onChange={(e) => { setRole(e.target.value); setPage(1) }}><option value="">All roles</option><option value="candidate">Candidates</option><option value="recruiter">Recruiters</option><option value="admin">Administrators</option></select></label></DataToolbar>{error ? <div className="inline-error"><Icon name="warning" />{error}</div> : !data ? <Spinner /> : rows.length ? <div className="table-wrap"><table><thead><tr><th>User</th><th>Role</th><th>Account ID</th><th>Joined</th><th className="actions-column">Actions</th></tr></thead><tbody>{rows.map((row) => <tr key={row.user_id}><td><div className="user-cell"><span className="avatar avatar-small">{initials(row.name)}</span><div><strong>{row.name}</strong><span>{row.email}</span></div></div></td><td><RoleBadge role={row.role} /></td><td>#{row.user_id}</td><td>{formatDate(row.created_at)}</td><td>{row.user_id === currentUser.user_id ? <Badge tone="neutral">Current account</Badge> : <button className="row-action row-action-danger" onClick={() => setConfirm(row)} title="Delete user"><Icon name="trash" size={17} /></button>}</td></tr>)}</tbody></table></div> : <EmptyState icon="users" title="No users match this view" text="Try another search term or role filter." />}<Pagination pagination={data?.pagination} onPage={setPage} />{confirm && <ConfirmDialog title="Delete user account?" message={`${confirm.name} (${confirm.email}) will be removed from the platform. Related records may also be affected.`} busy={busy} onClose={() => setConfirm(null)} onConfirm={remove} />}</Panel>
}

function SkillsPage({ token, notify }) {
  const [data, setData] = useState(null)
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [skill, setSkill] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const load = () => { setData(null); api(`/api/skills?page=${page}&limit=40`, { token }).then(setData).catch((err) => setError(err.message)) }
  useEffect(load, [token, page])
  const rows = pageRecords(data).filter((row) => row.skill_name.toLowerCase().includes(search.toLowerCase()))
  const add = async (event) => { event.preventDefault(); if (!skill.trim()) return; setBusy(true); setError(''); try { await api('/api/skills', { token, method: 'POST', body: { skill_name: skill.trim() } }); notify(`“${skill.trim()}” added to the skills library.`); setSkill(''); load() } catch (err) { setError(err.message) } finally { setBusy(false) } }
  return <div className="skills-layout"><Panel title="Skills library" subtitle="Canonical skills used by extraction, matching, and recommendations."><DataToolbar search={search} onSearch={setSearch} placeholder="Search skills…" />{!data ? <Spinner /> : rows.length ? <div className="skill-cloud">{rows.map((row) => <div key={row.skill_id}><span>{row.skill_name}</span><small>#{row.skill_id}</small></div>)}</div> : <EmptyState icon="skills" title="No skills found" text="Add a new skill or change your search." />}<Pagination pagination={data?.pagination} onPage={setPage} /></Panel><Panel title="Add a skill" subtitle="New entries are normalized and deduplicated by the backend."><form className="stack-form" onSubmit={add}><label className="field"><span>Skill name</span><input value={skill} onChange={(e) => setSkill(e.target.value)} placeholder="e.g. power bi" /></label>{error && <div className="inline-error"><Icon name="warning" />{error}</div>}<Button icon="plus" disabled={busy || !skill.trim()}>{busy ? 'Saving…' : 'Add to library'}</Button></form><div className="info-callout"><Icon name="skills" /><p>Skills are stored in lowercase and reused across resumes, job descriptions, matched skills, and missing skills.</p></div></Panel></div>
}

function LogsPage({ token }) {
  const [data, setData] = useState(null)
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [error, setError] = useState('')
  useEffect(() => { setData(null); api(`/api/admin/logs?page=${page}&limit=18`, { token }).then(setData).catch((err) => setError(err.message)) }, [token, page])
  const rows = pageRecords(data).filter((row) => `${row.event} ${row.description} ${row.ip_address}`.toLowerCase().includes(search.toLowerCase()))
  return <Panel title="Audit logs" subtitle="A chronological record of authentication, analysis, and administrative events."><DataToolbar search={search} onSearch={setSearch} placeholder="Search events, descriptions, or IP…" />{error ? <div className="inline-error"><Icon name="warning" />{error}</div> : !data ? <Spinner /> : rows.length ? <div className="timeline">{rows.map((row) => <div className="timeline-row" key={row.log_id}><div className="timeline-line"><span><Icon name="logs" size={15} /></span></div><div className="timeline-content"><div><Badge tone="blue">{titleCase(row.event)}</Badge><strong>Event #{row.log_id}</strong></div><p>{row.description || 'No additional description.'}</p><footer><span>User {row.user_id ? `#${row.user_id}` : 'system'}</span><span>IP {row.ip_address || 'unknown'}</span><time>{formatDate(row.created_at)}</time></footer></div></div>)}</div> : <EmptyState icon="logs" title="No audit events found" text="System activity will appear here as users interact with the application." />}<Pagination pagination={data?.pagination} onPage={setPage} /></Panel>
}

function ProfilePage({ token, user, onSession, notify }) {
  const [form, setForm] = useState({ name: user.name || '', email: user.email || '', password: '' })
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const submit = async (event) => { event.preventDefault(); setBusy(true); setError(''); try { const payload = { name: form.name, email: form.email, ...(form.password ? { password: form.password } : {}) }; const updated = await api('/api/users/profile', { token, method: 'PATCH', body: payload }); onSession(updated); setForm((s) => ({ ...s, password: '' })); notify('Profile settings updated successfully.') } catch (err) { setError(err.message) } finally { setBusy(false) } }
  return <div className="profile-layout"><Panel title="Profile settings" subtitle="Keep your account details current."><div className="profile-banner"><span className="avatar avatar-large">{initials(form.name)}</span><div><h3>{form.name || 'Your account'}</h3><p>{form.email}</p><RoleBadge role={user.role} /></div></div><form className="stack-form profile-form" onSubmit={submit}><label className="field"><span>Full name</span><input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></label><label className="field"><span>Email address</span><input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></label><label className="field"><span>New password <em>Optional</em></span><input type="password" minLength={6} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="Leave blank to keep the current password" /></label>{error && <div className="inline-error"><Icon name="warning" />{error}</div>}<Button icon="check" disabled={busy}>{busy ? 'Saving changes…' : 'Save changes'}</Button></form></Panel><Panel title="Account information" subtitle="Identity and access details"><div className="account-info"><div><span>User ID</span><strong>#{user.user_id}</strong></div><div><span>Workspace role</span><RoleBadge role={user.role} /></div><div><span>Access method</span><strong>JWT authentication</strong></div><div><span>Account status</span><Badge tone="green">Active</Badge></div></div><div className="security-callout"><Icon name="server" /><div><strong>Security reminder</strong><p>Use a unique password and sign out on shared devices.</p></div></div></Panel></div>
}

function AdminWorkspace({ current, token, session, onSession, notify, onNavigate }) {
  if (current === 'overview') return <AdminOverview token={token} onNavigate={onNavigate} />
  if (current === 'users') return <UsersPage token={token} currentUser={session.user} notify={notify} />
  if (current === 'resumes') return <ResumesPage token={token} notify={notify} admin />
  if (current === 'jobs') return <JobsPage token={token} notify={notify} admin />
  if (current === 'results') return <ResultsPage token={token} endpoint="/api/admin/results" title="System analysis results" subtitle="Inspect every ATS evaluation generated by the platform." />
  if (current === 'skills') return <SkillsPage token={token} notify={notify} />
  if (current === 'logs') return <LogsPage token={token} />
  return <ProfilePage token={token} user={session.user} onSession={onSession} notify={notify} />
}

function App() {
  const [session, setSession] = useState(() => {
    try { return JSON.parse(localStorage.getItem('ats-auth') || 'null') } catch { return null }
  })
  const [current, setCurrent] = useState('overview')
  const [toast, setToast] = useState(null)
  const notify = (message, type = 'success', title) => setToast({ message, type, title })
  const onAuth = (data) => { localStorage.setItem('ats-auth', JSON.stringify(data)); setSession(data); setCurrent('overview') }
  const onLogout = () => { localStorage.removeItem('ats-auth'); setSession(null); setCurrent('overview') }
  const onSession = (user) => { const next = { ...session, user }; localStorage.setItem('ats-auth', JSON.stringify(next)); setSession(next) }

  if (!session?.token || !session?.user) return <Auth onAuth={onAuth} />
  const common = { current, token: session.token, session, onSession, notify, onNavigate: setCurrent }
  return <><AppShell session={session} current={current} setCurrent={setCurrent} onLogout={onLogout}>{session.user.role === 'admin' ? <AdminWorkspace {...common} /> : session.user.role === 'recruiter' ? <RecruiterWorkspace {...common} /> : <CandidateWorkspace {...common} />}</AppShell><Toast toast={toast} onClose={() => setToast(null)} /></>
}

createRoot(document.getElementById('root')).render(<App />)
