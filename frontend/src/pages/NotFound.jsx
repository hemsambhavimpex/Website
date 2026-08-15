import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { MaskedLines, Reveal } from '../components/Reveal';
import { useSEO } from '../hooks/useSEO';
import { CONTACT } from '../data/catalog';

const NotFound = () => {
  useSEO('Page Not Found | HemSambhav Impex', 'This page is not on the manifest. Browse the velvet export catalog or request a quote from HemSambhav Impex, Surat.');

  return (
    <div className="flex min-h-screen flex-col px-6 pt-36 pb-16 md:px-12 md:pt-44" data-testid="not-found-page">
      <div className="mx-auto flex w-full max-w-[1600px] flex-1 flex-col">
        <Reveal y={16}>
          <p className="overline">Error 404 — Off the Manifest</p>
        </Reveal>
        <MaskedLines
          lines={[<>This bale was</>, <><em className="italic text-navy">never loaded.</em></>]}
          delay={0.15}
          className="mt-8 font-serif text-[16vw] leading-[0.92] tracking-tight text-navy-dark sm:text-8xl lg:text-9xl"
        />
        <Reveal delay={0.5}>
          <p className="mt-8 max-w-xl text-base leading-relaxed text-navy-dark/70 md:text-lg">
            The page you are looking for does not exist — it may have been moved, renamed,
            or never shipped. The catalog, however, is fully stocked.
          </p>
        </Reveal>
        <Reveal delay={0.65}>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link to="/" className="btn-primary group" data-testid="nf-home">
              Back to Home <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link to="/products" className="btn-secondary group" data-testid="nf-products">
              Browse Products <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link to="/contact" className="btn-secondary group" data-testid="nf-contact">
              Request a Quote <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </Reveal>
        <Reveal delay={0.8} className="mt-auto pt-16">
          <div className="flex flex-col gap-2 border-t border-navy/15 pt-6 font-mono text-[10px] uppercase tracking-[0.22em] text-navy/50 md:flex-row md:justify-between">
            <span>HemSambhav Impex — Export Division of JK Velvet</span>
            <a href={`mailto:${CONTACT.email}`} className="hover:text-rust" data-testid="nf-email">{CONTACT.email}</a>
          </div>
        </Reveal>
      </div>
    </div>
  );
};

export default NotFound;
