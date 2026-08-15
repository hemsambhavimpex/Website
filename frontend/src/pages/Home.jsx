import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { MaskedLines, Reveal } from '../components/Reveal';
import { EditorialMarquee } from '../components/EditorialMarquee';
import { IMAGES, CATEGORIES, MARKETS, END_USES, PRODUCTS as STATIC_PRODUCTS, CONTACT } from '../data/catalog';
import { useProducts } from '../hooks/useProducts';
import { useSEO } from '../hooks/useSEO';

const WHY = [
  { n: '01', title: 'Mill-direct, not middle-trade', desc: 'We are the export division of the manufacturer itself. Your fabric comes off JK Velvet’s own lines — no trader’s margin, no broken telephone between loom and loading bay.' },
  { n: '02', title: 'QC that travels with the bale', desc: 'Every consignment ships with roll maps, shade bands and inspection records generated from the same production run that made your fabric.' },
  { n: '03', title: 'Documentation done right', desc: 'Commercial invoice, packing list, certificate of origin, bill of lading — prepared by a team that has exported since the 2000s. Paperwork is our habit, not our headache.' },
  { n: '04', title: 'An MOQ that lets you test', desc: '250 metres per item — one of the most accessible thresholds in Surat’s velvet trade. Pilot a market, then scale with consolidated multi-item dispatches.' },
];

const META = [
  ['EST.', '1990 — Surat'],
  ['MOQ', 'From 150 m'],
  ['Range', '3 constructions'],
  ['Lanes', 'NP · BD · AE · UK +'],
];

const Home = () => {
  useSEO('HemSambhav Impex — Premium Velvet Export · Surat, India', 'Export division of JK Velvet (est. 1990). Mill-direct flocked, weaving and knitting velvet shipped to Nepal, Bangladesh, UAE, UK and beyond. MOQ from 150 m.');
  const PRODUCTS = useProducts();
  const { scrollY } = useScroll();
  const heroImgY = useTransform(scrollY, [0, 900], [0, 140]);
  const bandY = useTransform(scrollY, [1600, 3200], [-80, 80]);

  return (
    <div data-testid="home-page">
      {/* HERO */}
      <section className="relative overflow-hidden px-6 pt-32 md:px-12 md:pt-40" data-testid="home-hero">
        <div className="mx-auto max-w-[1600px]">
          <motion.p
            className="overline"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            data-testid="hero-overline"
          >
            Export Division — Shree JK Handloom (JK Velvet) — Surat, India
          </motion.p>
          <div className="mt-8 grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <MaskedLines
                as="h1"
                delay={0.25}
                className="font-serif text-[13vw] leading-[0.92] tracking-tight text-navy-dark sm:text-7xl lg:text-8xl"
                data-testid="hero-headline"
                lines={[
                  <>From Surat’s looms,</>,
                  <>to the <em className="italic text-navy">world’s</em></>,
                  <><em className="italic text-navy">markets.</em></>,
                ]}
              />
              <motion.p
                className="mt-8 max-w-xl text-base leading-relaxed text-navy-dark/70 md:text-lg"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.9 }}
                data-testid="hero-subtext"
              >
                HemSambhav Impex carries three decades of velvet craftsmanship across borders —
                premium flocked, weaving and knitting velvet, exported with the discipline of a
                shipping manifest and the warmth of a handshake.
              </motion.p>
              <motion.div
                className="mt-10 flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 1.05 }}
              >
                <Link to="/contact" className="btn-primary group" data-testid="hero-quote-button">
                  Request a Quote <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
                <Link to="/products" className="btn-secondary group" data-testid="hero-catalog-button">
                  Export Catalog <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </motion.div>
            </div>
            <div className="relative lg:col-span-5">
              <motion.div
                className="img-frame relative aspect-[4/5] border border-navy/20"
                initial={{ clipPath: 'inset(100% 0 0 0)' }}
                animate={{ clipPath: 'inset(0% 0 0 0)' }}
                transition={{ duration: 1.3, ease: [0.76, 0, 0.24, 1], delay: 0.5 }}
                data-testid="hero-image-frame"
              >
                <motion.img
                  src={IMAGES.heroVelvet}
                  alt="Premium navy velvet fabric texture"
                  className="h-[115%] w-full object-cover"
                  style={{ y: heroImgY, scale: 1.12 }}
                />
                <div className="absolute inset-0 bg-navy/20 mix-blend-multiply" />
              </motion.div>
              <motion.p
                className="mt-3 flex justify-between font-mono text-[10px] uppercase tracking-[0.22em] text-navy/60"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.3 }}
              >
                <span>Fig. 01 — Flocked Velvet, Navy</span>
                <span>Lot / HS-1990</span>
              </motion.p>
              <div className="absolute -left-4 -top-4 -z-10 hidden h-full w-full border border-rust/50 lg:block" />
            </div>
          </div>
          <motion.div
            className="mt-16 grid grid-cols-2 border-t border-navy/15 md:grid-cols-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            data-testid="hero-meta-strip"
          >
            {META.map(([k, v], i) => (
              <div key={k} className={`py-5 pr-6 ${i < 3 ? 'md:border-r md:border-navy/15' : ''} ${i % 2 === 0 ? 'border-r border-navy/15 md:border-r' : ''}`}>
                <p className="overline">{k}</p>
                <p className="mt-1 font-serif text-xl text-navy-dark md:text-2xl">{v}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <div className="mt-16">
        <EditorialMarquee />
      </div>

      {/* CATEGORIES */}
      <section className="px-6 py-20 md:px-12 md:py-28" data-testid="home-categories">
        <div className="mx-auto max-w-[1600px]">
          <Reveal>
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="overline">The Catalog</p>
                <h2 className="mt-4 font-serif text-4xl tracking-tight text-navy-dark md:text-6xl">
                  Three constructions.<br />One standard.
                </h2>
              </div>
              <Link to="/products" className="btn-secondary group w-fit" data-testid="categories-view-all">
                All {PRODUCTS.length} Fabrics <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </Reveal>
          <div className="mt-12 grid gap-px border border-navy/15 bg-navy/15 md:grid-cols-3">
            {CATEGORIES.map((c, i) => (
              <Reveal key={c.id} delay={i * 0.12} className="bg-paper">
                <Link to={`/products?cat=${c.id}`} className="group block" data-testid={`category-card-${c.id}`}>
                  <div className="img-frame aspect-[16/10]">
                    <img src={c.image} alt={c.name} loading="lazy" />
                    <div className="absolute inset-0 bg-navy/25 mix-blend-multiply transition-opacity duration-500 group-hover:opacity-0" />
                  </div>
                  <div className="p-7">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-rust">{c.code}</span>
                      <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-navy/50">
                        {PRODUCTS.filter((p) => p.cat === c.id).length} items
                      </span>
                    </div>
                    <h3 className="mt-3 font-serif text-3xl text-navy-dark transition-colors group-hover:text-navy">{c.name}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-navy-dark/65">{c.description}</p>
                    <span className="mt-5 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-navy">
                      View range <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* WHY */}
      <section className="border-t border-navy/15 px-6 py-20 md:px-12 md:py-28" data-testid="home-why">
        <div className="mx-auto max-w-[1600px]">
          <Reveal>
            <p className="overline">Why buyers export with us</p>
            <h2 className="mt-4 max-w-3xl font-serif text-4xl tracking-tight text-navy-dark md:text-6xl">
              Authority you can audit. <em className="italic text-navy">Relationships that flex.</em>
            </h2>
          </Reveal>
          <div className="mt-14">
            {WHY.map((w, i) => (
              <Reveal key={w.n} delay={i * 0.08}>
                <div className="grid gap-4 border-t border-navy/15 py-8 md:grid-cols-12 md:gap-8" data-testid={`why-row-${w.n}`}>
                  <div className="md:col-span-2">
                    <span className="font-mono text-sm text-rust">{w.n}</span>
                  </div>
                  <h3 className="font-serif text-2xl text-navy-dark md:col-span-4 md:text-3xl">{w.title}</h3>
                  <p className="text-base leading-relaxed text-navy-dark/70 md:col-span-6">{w.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* MARKETS MANIFEST */}
      <section className="bg-navy-ink px-6 py-20 text-paper md:px-12 md:py-28" data-testid="home-markets">
        <div className="mx-auto max-w-[1600px]">
          <Reveal>
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="overline !text-paper/50">Shipping Manifest</p>
                <h2 className="mt-4 font-serif text-4xl tracking-tight md:text-6xl">Markets we serve</h2>
              </div>
              <p className="max-w-sm text-sm leading-relaxed text-paper/60">
                Regular export lanes across South Asia, the Gulf and Europe — with worldwide
                dispatch on request via Nhava Sheva and Mundra.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-12 border border-paper/15" data-testid="markets-table">
              <div className="hidden grid-cols-4 border-b border-paper/15 font-mono text-[10px] uppercase tracking-[0.25em] text-paper/45 md:grid">
                {['Destination', 'Port of Entry', 'Mode', 'Terms'].map((h) => (
                  <p key={h} className="px-6 py-4">{h}</p>
                ))}
              </div>
              {MARKETS.map((m) => (
                <div
                  key={m.country}
                  className="grid grid-cols-2 gap-y-2 border-b border-paper/10 px-6 py-5 transition-colors last:border-b-0 hover:bg-paper/5 md:grid-cols-4 md:gap-y-0"
                  data-testid={`market-row-${m.country.toLowerCase().replace(/\s/g, '-')}`}
                >
                  <p className="font-serif text-xl md:text-2xl">{m.country}</p>
                  <p className="self-center text-sm text-paper/70">{m.port}</p>
                  <p className="self-center font-mono text-[11px] uppercase tracking-[0.18em] text-rust-light">{m.mode}</p>
                  <p className="self-center text-sm text-paper/60">{m.terms}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* PARALLAX QUOTE BAND */}
      <section className="relative h-[60vh] overflow-hidden md:h-[70vh]" data-testid="home-quote-band">
        <motion.div className="absolute inset-0" style={{ y: bandY, scale: 1.2 }}>
          <img src={IMAGES.cargoShip} alt="Container vessel at sea" className="h-full w-full object-cover" />
        </motion.div>
        <div className="absolute inset-0 bg-navy-ink/70" />
        <div className="relative flex h-full items-center justify-center px-6 text-center">
          <Reveal>
            <p className="overline !text-paper/60">The House Motto</p>
            <p className="mt-6 font-serif text-5xl italic leading-tight text-paper md:text-7xl lg:text-8xl" data-testid="home-tagline">
              “Possibility to Prosperity”
            </p>
          </Reveal>
        </div>
      </section>

      {/* END USES */}
      <section className="px-6 py-20 md:px-12 md:py-28" data-testid="home-end-uses">
        <div className="mx-auto max-w-[1600px]">
          <Reveal>
            <p className="overline">Where our velvet lands</p>
            <h2 className="mt-4 font-serif text-4xl tracking-tight text-navy-dark md:text-6xl">Six end-uses, one pile standard</h2>
          </Reveal>
          <div className="mt-12 grid gap-px border border-navy/15 bg-navy/15 sm:grid-cols-2 lg:grid-cols-3">
            {END_USES.map((e, i) => (
              <Reveal key={e.name} delay={i * 0.06} className="bg-paper">
                <Link to="/products" className="group flex items-start justify-between gap-4 p-7" data-testid={`enduse-${e.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}>
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-rust">0{i + 1}</span>
                    <h3 className="mt-2 font-serif text-2xl text-navy-dark group-hover:text-navy">{e.name}</h3>
                    <p className="mt-2 text-sm text-navy-dark/65">{e.desc}</p>
                  </div>
                  <ArrowUpRight size={18} className="mt-1 shrink-0 text-navy/40 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-rust" />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-navy/15 bg-navy px-6 py-20 text-paper md:px-12 md:py-28" data-testid="home-cta">
        <div className="mx-auto flex max-w-[1600px] flex-col items-start gap-10 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <p className="overline !text-paper/55">Open a Trade Lane</p>
            <h2 className="mt-4 max-w-2xl font-serif text-4xl leading-tight tracking-tight md:text-6xl">
              Put your market on our <em className="italic text-rust-light">manifest.</em>
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-paper/70">
              Send us your construction, quantity and destination port. We reply within one
              business day with pricing, lead time and a document checklist for your lane.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="flex flex-col gap-4">
              <Link to="/contact" className="btn-light group" data-testid="cta-quote-button">
                Request a Quote <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <a href={`mailto:${CONTACT.email}`} className="text-center font-mono text-[11px] uppercase tracking-[0.2em] text-paper/60 hover:text-paper" data-testid="cta-email-link">
                {CONTACT.email}
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
};

export default Home;
