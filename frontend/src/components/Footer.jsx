import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { CONTACT, CATEGORIES } from '../data/catalog';

export const Footer = () => (
  <footer className="bg-navy-ink text-paper" data-testid="main-footer">
    <div className="mx-auto max-w-[1600px] px-6 md:px-12">
      <div className="grid gap-12 border-b border-paper/10 py-16 md:grid-cols-12 md:py-20">
        <div className="md:col-span-5">
          <img src="/assets/logo-white.png" alt="HemSambhav Impex" className="h-10 w-auto" data-testid="footer-logo" />
          <p className="mt-6 max-w-sm font-serif text-2xl italic leading-snug text-paper/85">
            Possibility to Prosperity — two parties, one unbreakable connection.
          </p>
          <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.2em] text-paper/45">
            Export division of {CONTACT.parent}
          </p>
        </div>
        <div className="md:col-span-2">
          <p className="overline !text-paper/40 mb-5">Explore</p>
          <ul className="space-y-3 text-sm text-paper/70">
            {[['/', 'Home'], ['/about', 'About'], ['/products', 'Products'], ['/gallery', 'Gallery'], ['/blog', 'Blog'], ['/contact', 'Contact']].map(([to, label]) => (
              <li key={to}>
                <Link to={to} data-testid={`footer-link-${label.toLowerCase()}`} className="transition-colors hover:text-rust-light">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-2">
          <p className="overline !text-paper/40 mb-5">Velvet</p>
          <ul className="space-y-3 text-sm text-paper/70">
            {CATEGORIES.map((c) => (
              <li key={c.id}>
                <Link to={`/products?cat=${c.id}`} data-testid={`footer-cat-${c.id}`} className="transition-colors hover:text-rust-light">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-3">
          <p className="overline !text-paper/40 mb-5">Head Office</p>
          <p className="text-sm leading-relaxed text-paper/70" data-testid="footer-address">{CONTACT.address}</p>
          <a href={`mailto:${CONTACT.email}`} data-testid="footer-email" className="mt-4 block text-sm text-paper/70 transition-colors hover:text-rust-light">
            {CONTACT.email}
          </a>
          <a href={`tel:${CONTACT.phoneHref}`} data-testid="footer-phone" className="mt-2 block text-sm text-paper/70 transition-colors hover:text-rust-light">
            {CONTACT.phone}
          </a>
          <a
            href={CONTACT.parentUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="footer-parent-link"
            className="mt-6 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-rust-light hover:text-paper"
          >
            jkvelvet.com <ArrowUpRight size={13} />
          </a>
        </div>
      </div>
      <div className="flex flex-col gap-3 py-6 font-mono text-[10px] uppercase tracking-[0.2em] text-paper/40 md:flex-row md:items-center md:justify-between">
        <p data-testid="footer-copy">© {new Date().getFullYear()} HemSambhav Impex · Surat, Gujarat, India</p>
        <p>MOQ {CONTACT.moq} · Flocked / Weaving / Knitting</p>
      </div>
    </div>
  </footer>
);
