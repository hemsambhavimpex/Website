import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';
import { ArrowUpRight, Mail, Phone, MapPin, CheckCircle2 } from 'lucide-react';
import { PageHero, Reveal } from '../components/Reveal';
import { PRODUCTS as STATIC_PRODUCTS, CATEGORIES, END_USES, CONTACT } from '../data/catalog';
import { useProducts } from '../hooks/useProducts';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const Field = ({ label, id, children }) => (
  <div>
    <label htmlFor={id} className="field-label">{label}</label>
    <div className="mt-1">{children}</div>
  </div>
);

const Contact = () => {
  const PRODUCTS = useProducts();
  const [params] = useSearchParams();
  const [form, setForm] = useState({
    full_name: '',
    company_name: '',
    email: '',
    phone: '',
    country: '',
    product: params.get('product') || '',
    quantity: '',
    message: '',
  });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      await axios.post(`${API}/inquiries`, form);
      setSent(true);
      toast.success('Inquiry sent — the manifest desk will reply within one business day.');
    } catch (err) {
      toast.error('Could not send right now. Please email us directly at contact@hemsambhavimpex.com.');
    } finally {
      setSending(false);
    }
  };

  const mailto = `mailto:${CONTACT.email}?subject=${encodeURIComponent(`Export Inquiry — ${form.product || 'Velvet'}`)}&body=${encodeURIComponent(
    `Full Name: ${form.full_name}\nCompany: ${form.company_name}\nEmail: ${form.email}\nPhone/WhatsApp: ${form.phone}\nCountry/Port: ${form.country}\nProduct: ${form.product}\nQuantity: ${form.quantity}\n\n${form.message}`
  )}`;

  return (
    <div data-testid="contact-page">
      <PageHero
        id="contact-hero"
        overline="Open a Trade Lane — Replies within 1 business day"
        lines={[<>Request</>, <><em className="italic text-navy">a quote.</em></>]}
        right={
          <p>
            Tell us the construction, quantity and destination port. We return pricing, lead
            time and a document checklist for your lane — MOQ {CONTACT.moq}.
          </p>
        }
      />

      <section className="px-6 py-16 md:px-12 md:py-24">
        <div className="mx-auto grid max-w-[1600px] gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <h2 className="font-serif text-3xl tracking-tight text-navy-dark md:text-4xl">The manifest desk</h2>
              <p className="mt-5 max-w-md text-base leading-relaxed text-navy-dark/70">
                Prefer to write or call directly? Every inquiry reaches the export team at
                JK House, Surat — not a call centre.
              </p>
              <div className="mt-10 space-y-0 border-t border-navy/15" data-testid="contact-details">
                <a href={`mailto:${CONTACT.email}`} className="group flex items-start gap-4 border-b border-navy/15 py-5" data-testid="contact-email-row">
                  <Mail size={17} className="mt-1 text-rust" />
                  <div>
                    <p className="field-label">Email</p>
                    <p className="mt-1 text-lg text-navy-dark transition-colors group-hover:text-navy">{CONTACT.email}</p>
                  </div>
                </a>
                <a href={`tel:${CONTACT.phoneHref}`} className="group flex items-start gap-4 border-b border-navy/15 py-5" data-testid="contact-phone-row">
                  <Phone size={17} className="mt-1 text-rust" />
                  <div>
                    <p className="field-label">Phone / WhatsApp</p>
                    <p className="mt-1 text-lg text-navy-dark transition-colors group-hover:text-navy">{CONTACT.phone}</p>
                  </div>
                </a>
                <div className="flex items-start gap-4 border-b border-navy/15 py-5" data-testid="contact-address-row">
                  <MapPin size={17} className="mt-1 text-rust" />
                  <div>
                    <p className="field-label">Head Office</p>
                    <p className="mt-1 max-w-sm text-base leading-relaxed text-navy-dark">{CONTACT.address}</p>
                  </div>
                </div>
              </div>
              <a
                href={CONTACT.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary group mt-10"
                data-testid="contact-whatsapp-button"
              >
                Message on WhatsApp <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal delay={0.1}>
              {sent ? (
                <div className="border border-navy/20 bg-surface p-10 md:p-14" data-testid="inquiry-success">
                  <CheckCircle2 size={36} className="text-rust" />
                  <h2 className="mt-6 font-serif text-4xl tracking-tight text-navy-dark">On the manifest.</h2>
                  <p className="mt-4 max-w-md text-base leading-relaxed text-navy-dark/70">
                    Thank you, {form.full_name.split(' ')[0] || 'there'}. Your inquiry for{' '}
                    <span className="text-navy">{form.product || 'velvet'}</span> has been logged with the export
                    desk — expect a reply at <span className="text-navy">{form.email}</span> within one business day.
                  </p>
                  <div className="mt-8 flex flex-wrap gap-4">
                    <button onClick={() => { setSent(false); setForm({ ...form, message: '', quantity: '' }); }} className="btn-secondary" data-testid="send-another-button">
                      Send Another Inquiry
                    </button>
                    <a href={mailto} className="font-mono text-[11px] uppercase tracking-[0.2em] text-navy/60 underline-offset-4 hover:text-rust hover:underline self-center" data-testid="mailto-fallback-link">
                      Or copy into your mail app
                    </a>
                  </div>
                </div>
              ) : (
                <form onSubmit={submit} className="border border-navy/20 bg-surface p-8 md:p-12" data-testid="inquiry-form">
                  <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-rust">Form HS-EX-01 — Export Inquiry</p>
                  <div className="mt-8 grid gap-x-8 gap-y-7 sm:grid-cols-2">
                    <Field label="Full Name *" id="full_name">
                      <input id="full_name" data-testid="field-full-name" required value={form.full_name} onChange={set('full_name')} className="field-input" placeholder="Asha Rana" />
                    </Field>
                    <Field label="Company Name" id="company_name">
                      <input id="company_name" data-testid="field-company-name" value={form.company_name} onChange={set('company_name')} className="field-input" placeholder="Rana Packaging LLC" />
                    </Field>
                    <Field label="Email *" id="email">
                      <input id="email" type="email" data-testid="field-email" required value={form.email} onChange={set('email')} className="field-input" placeholder="you@company.com" />
                    </Field>
                    <Field label="Phone / WhatsApp" id="phone">
                      <input id="phone" data-testid="field-phone" value={form.phone} onChange={set('phone')} className="field-input" placeholder="+971 ..." />
                    </Field>
                    <Field label="Country / Destination Port" id="country">
                      <input id="country" data-testid="field-country" value={form.country} onChange={set('country')} className="field-input" placeholder="UAE — Jebel Ali" />
                    </Field>
                    <Field label="Estimated Quantity" id="quantity">
                      <input id="quantity" data-testid="field-quantity" value={form.quantity} onChange={set('quantity')} className="field-input" placeholder="e.g. 1,000 metres (MOQ 250 m)" />
                    </Field>
                    <div className="sm:col-span-2">
                      <label htmlFor="product" className="field-label">Product of Interest</label>
                      <select id="product" data-testid="field-product" value={form.product} onChange={set('product')} className="field-input mt-1 cursor-pointer">
                        <option value="">Select a fabric…</option>
                        {CATEGORIES.map((c) => (
                          <optgroup key={c.id} label={c.name}>
                            {PRODUCTS.filter((p) => p.cat === c.id).map((p) => (
                              <option key={p.slug} value={p.name}>{p.name}</option>
                            ))}
                          </optgroup>
                        ))}
                        <optgroup label="Other">
                          {END_USES.map((e) => (
                            <option key={e.name} value={`${e.name} (end-use)`}>{e.name}</option>
                          ))}
                          <option value="Custom Development">Custom Development</option>
                        </optgroup>
                      </select>
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="message" className="field-label">Message</label>
                      <textarea id="message" data-testid="field-message" rows={4} value={form.message} onChange={set('message')} className="field-input mt-1 resize-none" placeholder="End-use, target price, preferred Incoterm, timeline…" />
                    </div>
                  </div>
                  <button type="submit" disabled={sending} className="btn-primary group mt-10 w-full justify-center disabled:opacity-60 sm:w-auto" data-testid="inquiry-submit-button">
                    {sending ? 'Logging to manifest…' : 'Submit Inquiry'}
                    <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>
                  <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.18em] text-navy/50">
                    Submissions go straight to {CONTACT.email}
                  </p>
                </form>
              )}
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
