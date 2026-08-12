import { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { CONTACT } from '../data/catalog';

const LINKS = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/products', label: 'Products' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contact' },
];

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-navy/15 bg-paper/85 backdrop-blur-md" data-testid="main-header">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-4 md:px-12">
          <Link to="/" data-testid="nav-logo-link" onClick={() => setOpen(false)}>
            <img src="/assets/logo-blue.png" alt="HemSambhav Impex" className="h-9 w-auto md:h-10" data-testid="nav-logo" />
          </Link>
          <nav className="hidden items-center gap-8 lg:flex" data-testid="nav-desktop">
            {LINKS.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                data-testid={`nav-link-${l.label.toLowerCase()}`}
                className={({ isActive }) =>
                  `font-mono text-[11px] uppercase tracking-[0.2em] transition-colors ${
                    isActive ? 'text-rust' : 'text-navy-dark/70 hover:text-navy'
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
            <Link to="/contact" data-testid="nav-quote-button" className="btn-primary !px-5 !py-3">
              Request Quote <ArrowUpRight size={14} />
            </Link>
          </nav>
          <button
            className="text-navy-dark lg:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            data-testid="nav-menu-toggle"
          >
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col bg-navy-ink px-8 pt-28 pb-10 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            data-testid="nav-mobile-menu"
          >
            <nav className="flex flex-col gap-2">
              {LINKS.map((l, i) => (
                <motion.div
                  key={l.to}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.06, duration: 0.5 }}
                >
                  <NavLink
                    to={l.to}
                    onClick={() => setOpen(false)}
                    data-testid={`nav-mobile-link-${l.label.toLowerCase()}`}
                    className={({ isActive }) =>
                      `block border-b border-paper/10 py-4 font-serif text-4xl ${
                        isActive ? 'italic text-rust-light' : 'text-paper'
                      }`
                    }
                  >
                    {l.label}
                  </NavLink>
                </motion.div>
              ))}
            </nav>
            <div className="mt-auto font-mono text-[11px] uppercase tracking-[0.2em] text-paper/50">
              <p>{CONTACT.email}</p>
              <p className="mt-2">{CONTACT.phone}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
