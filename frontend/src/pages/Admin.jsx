import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';
import { ArrowLeft, LogOut, Pencil, Plus, Trash2, Upload, X } from 'lucide-react';
import { CATEGORIES, END_USES, productImage } from '../data/catalog';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const fmtErr = (d) =>
  typeof d === 'string' ? d : Array.isArray(d) ? d.map((e) => e.msg).join(' ') : 'Something went wrong';

const auth = () => ({ headers: { Authorization: `Bearer ${localStorage.getItem('hs_admin_token')}` } });

const EMPTY = {
  slug: '', name: '', cat: 'flocked', variants: '', desc: '', uses: [],
  stock: 'in', specs: {}, photo: '', img: 'fabricRack',
};

const SPEC_FIELDS = [
  ['composition', 'Composition'], ['gsm', 'GSM'], ['width', 'Usable Width'],
  ['roll', 'Roll / Packing Length'], ['moq', 'MOQ'],
];

const Field = ({ label, id, children }) => (
  <div>
    <label htmlFor={id} className="field-label">{label}</label>
    <div className="mt-1">{children}</div>
  </div>
);

const Editor = ({ product, onClose, onSaved }) => {
  const isNew = !product.slug;
  const [form, setForm] = useState(product);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const setSpec = (k) => (e) => setForm({ ...form, specs: { ...form.specs, [k]: e.target.value } });

  const toggleUse = (u) =>
    setForm({ ...form, uses: form.uses.includes(u) ? form.uses.filter((x) => x !== u) : [...form.uses, u] });

  const upload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append('file', file);
      const { data } = await axios.post(`${API}/admin/upload`, fd, auth());
      setForm({ ...form, photo: data.url });
      toast.success('Photo uploaded');
    } catch (err) {
      toast.error(fmtErr(err.response?.data?.detail));
    } finally {
      setUploading(false);
    }
  };

  const save = async (e) => {
    e.preventDefault();
    setSaving(true);
    const specs = Object.fromEntries(Object.entries(form.specs).filter(([, v]) => v && v.trim()));
    const payload = { ...form, specs, slug: form.slug || form.name };
    try {
      if (isNew) await axios.post(`${API}/admin/products`, payload, auth());
      else await axios.put(`${API}/admin/products/${product.slug}`, payload, auth());
      toast.success(isNew ? 'Fabric added to the manifest' : 'Fabric updated');
      onSaved();
    } catch (err) {
      toast.error(fmtErr(err.response?.data?.detail));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[70] overflow-y-auto bg-navy-ink/60 backdrop-blur-sm" data-testid="product-editor">
      <form onSubmit={save} className="mx-auto my-10 max-w-3xl border border-navy/20 bg-paper p-8 md:p-10">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-3xl text-navy-dark">{isNew ? 'Add Fabric' : `Edit — ${product.name}`}</h2>
          <button type="button" onClick={onClose} data-testid="editor-close" className="text-navy/50 hover:text-rust"><X size={22} /></button>
        </div>
        <div className="mt-8 grid gap-x-8 gap-y-6 sm:grid-cols-2">
          <Field label="Name *" id="e-name">
            <input id="e-name" data-testid="editor-name" required value={form.name} onChange={set('name')} className="field-input" />
          </Field>
          <Field label="Slug (URL) *" id="e-slug">
            <input id="e-slug" data-testid="editor-slug" required disabled={!isNew} value={form.slug} onChange={set('slug')}
              className="field-input disabled:opacity-50" placeholder="auto-from-name" />
          </Field>
          <Field label="Category *" id="e-cat">
            <select id="e-cat" data-testid="editor-category" value={form.cat} onChange={set('cat')} className="field-input cursor-pointer">
              {CATEGORIES.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </Field>
          <Field label="Variants" id="e-variants">
            <input id="e-variants" data-testid="editor-variants" value={form.variants} onChange={set('variants')} className="field-input" placeholder="Plain & Embossed" />
          </Field>
          <div className="sm:col-span-2">
            <Field label="Description" id="e-desc">
              <textarea id="e-desc" data-testid="editor-desc" rows={2} value={form.desc} onChange={set('desc')} className="field-input resize-none" />
            </Field>
          </div>
          <div className="sm:col-span-2">
            <p className="field-label">End Uses</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {END_USES.map((u) => (
                <button type="button" key={u.name} onClick={() => toggleUse(u.name)} data-testid={`editor-use-${u.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                  className={`border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.15em] transition-colors ${form.uses.includes(u.name) ? 'border-navy bg-navy text-paper' : 'border-navy/25 text-navy-dark/60'}`}>
                  {u.name}
                </button>
              ))}
            </div>
          </div>
          <div className="sm:col-span-2 flex items-center gap-4 border border-navy/15 p-4">
            <button type="button" data-testid="editor-stock-toggle"
              onClick={() => setForm({ ...form, stock: form.stock === 'in' ? 'out' : 'in' })}
              className={`h-6 w-12 border transition-colors ${form.stock === 'in' ? 'border-navy bg-navy' : 'border-rust bg-rust/20'} relative`}>
              <span className={`absolute top-0.5 h-4.5 w-4.5 bg-paper transition-all ${form.stock === 'in' ? 'left-6' : 'left-0.5'}`} style={{ height: 18, width: 18 }} />
            </button>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-navy-dark/70">
              {form.stock === 'in' ? 'In stock' : 'Out of stock'}
            </p>
          </div>
          {SPEC_FIELDS.map(([k, label]) => (
            <Field key={k} label={`${label} (leave blank to hide)`} id={`e-${k}`}>
              <input id={`e-${k}`} data-testid={`editor-spec-${k}`} value={form.specs[k] || ''} onChange={setSpec(k)} className="field-input" />
            </Field>
          ))}
          <div className="sm:col-span-2">
            <p className="field-label">Photo</p>
            <div className="mt-2 flex items-center gap-5">
              {form.photo && (
                <img src={productImage(form)} alt="" className="h-20 w-28 border border-navy/20 object-cover" data-testid="editor-photo-preview" />
              )}
              <label className="btn-secondary cursor-pointer" data-testid="editor-upload-button">
                <Upload size={14} /> {uploading ? 'Uploading…' : 'Upload Photo'}
                <input type="file" accept="image/*" className="hidden" onChange={upload} data-testid="editor-upload-input" />
              </label>
              {form.photo && (
                <button type="button" onClick={() => setForm({ ...form, photo: '' })} className="font-mono text-[10px] uppercase tracking-[0.2em] text-rust" data-testid="editor-photo-remove">
                  Remove
                </button>
              )}
            </div>
          </div>
        </div>
        <button type="submit" disabled={saving || uploading} className="btn-primary mt-10 w-full justify-center disabled:opacity-60" data-testid="editor-save">
          {saving ? 'Saving…' : isNew ? 'Add to Catalog' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
};

const Admin = () => {
  const [token, setToken] = useState(localStorage.getItem('hs_admin_token'));
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [products, setProducts] = useState([]);
  const [editing, setEditing] = useState(null);
  const [filter, setFilter] = useState('');

  const load = () =>
    axios.get(`${API}/admin/products`, auth()).then((r) => setProducts(r.data)).catch((e) => {
      if (e.response?.status === 401) logout();
    });

  useEffect(() => { if (token) load(); }, [token]);

  const login = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${API}/admin/login`, { email, password });
      localStorage.setItem('hs_admin_token', data.token);
      setToken(data.token);
      toast.success(`Welcome back, ${data.name}`);
    } catch (err) {
      toast.error(fmtErr(err.response?.data?.detail));
    }
  };

  const logout = () => {
    localStorage.removeItem('hs_admin_token');
    setToken(null);
  };

  const del = async (slug, name) => {
    if (!window.confirm(`Remove ${name} from the catalog? This cannot be undone.`)) return;
    try {
      await axios.delete(`${API}/admin/products/${slug}`, auth());
      toast.success(`${name} removed`);
      load();
    } catch (err) {
      toast.error(fmtErr(err.response?.data?.detail));
    }
  };

  if (!token) {
    return (
      <div className="flex min-h-screen items-center justify-center px-6" data-testid="admin-login-page">
        <form onSubmit={login} className="w-full max-w-md border border-navy/20 bg-surface p-10">
          <img src="/assets/logo-blue.png" alt="HemSambhav Impex" className="h-9 w-auto" />
          <p className="overline mt-8">Manifest Desk — Admin</p>
          <h1 className="mt-3 font-serif text-4xl text-navy-dark">Sign in</h1>
          <div className="mt-8 space-y-6">
            <Field label="Email" id="a-email">
              <input id="a-email" type="email" data-testid="admin-email" required value={email} onChange={(e) => setEmail(e.target.value)} className="field-input" />
            </Field>
            <Field label="Password" id="a-password">
              <input id="a-password" type="password" data-testid="admin-password" required value={password} onChange={(e) => setPassword(e.target.value)} className="field-input" />
            </Field>
          </div>
          <button type="submit" className="btn-primary mt-8 w-full justify-center" data-testid="admin-login-submit">Enter Dashboard</button>
          <Link to="/" className="mt-5 block text-center font-mono text-[10px] uppercase tracking-[0.2em] text-navy/50 hover:text-rust" data-testid="admin-back-home">
            ← Back to site
          </Link>
        </form>
      </div>
    );
  }

  const shown = products.filter((p) => p.name.toLowerCase().includes(filter.toLowerCase()));

  return (
    <div className="min-h-screen px-6 pt-28 pb-20 md:px-12" data-testid="admin-dashboard">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-navy/15 pb-6">
          <div>
            <p className="overline">Manifest Desk — Admin</p>
            <h1 className="mt-2 font-serif text-4xl text-navy-dark">Fabric Catalog</h1>
          </div>
          <div className="flex gap-3">
            <button onClick={() => setEditing({ ...EMPTY })} className="btn-primary" data-testid="admin-add-fabric">
              <Plus size={14} /> Add Fabric
            </button>
            <button onClick={logout} className="btn-secondary" data-testid="admin-logout">
              <LogOut size={14} /> Sign Out
            </button>
          </div>
        </div>
        <input
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Filter fabrics…"
          data-testid="admin-filter"
          className="field-input mt-6 max-w-xs"
        />
        <div className="mt-6 border border-navy/15" data-testid="admin-product-list">
          {shown.map((p) => (
            <div key={p.slug} className="flex items-center gap-4 border-b border-navy/10 bg-surface px-4 py-3 last:border-b-0" data-testid={`admin-row-${p.slug}`}>
              <img src={productImage(p)} alt="" className="h-12 w-16 border border-navy/15 object-cover" />
              <div className="min-w-0 flex-1">
                <p className="truncate font-serif text-lg text-navy-dark">{p.name}</p>
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-navy/50">
                  {CATEGORIES.find((c) => c.id === p.cat)?.code} · {p.specs?.moq ? `MOQ ${p.specs.moq}` : 'No MOQ set'}
                </p>
              </div>
              <span className={`hidden border px-2 py-1 font-mono text-[9px] uppercase tracking-[0.15em] sm:block ${p.stock === 'in' ? 'border-navy/25 text-navy/60' : 'border-rust/50 text-rust'}`}>
                {p.stock === 'in' ? 'In stock' : 'Out of stock'}
              </span>
              <button onClick={() => setEditing({ ...EMPTY, ...p, specs: { ...(p.specs || {}) } })} className="p-2 text-navy/60 hover:text-navy" data-testid={`admin-edit-${p.slug}`} aria-label="Edit">
                <Pencil size={16} />
              </button>
              <button onClick={() => del(p.slug, p.name)} className="p-2 text-navy/60 hover:text-rust" data-testid={`admin-delete-${p.slug}`} aria-label="Delete">
                <Trash2 size={16} />
              </button>
            </div>
          ))}
          {shown.length === 0 && <p className="bg-surface px-4 py-8 text-center text-navy-dark/50">No fabrics match.</p>}
        </div>
        <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-navy/45">
          {products.length} fabrics · changes go live instantly · shade-card PDFs update automatically
        </p>
      </div>
      {editing && <Editor product={editing} onClose={() => setEditing(null)} onSaved={() => { setEditing(null); load(); }} />}
    </div>
  );
};

export default Admin;
