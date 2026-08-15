import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { PageHero, Reveal } from '../components/Reveal';
import { EditorialMarquee } from '../components/EditorialMarquee';
import { IMAGES, CONTACT } from '../data/catalog';
import { useSEO } from '../hooks/useSEO';

const CHAPTERS = [
  {
    n: '01',
    title: 'The House of Velvet',
    body: 'Shree JK Handloom was founded in Surat in 1990 by Mr. Anil Doshi, beginning with handloom products before turning decisively to velvet in 2002 — first supplying India’s jewelry-box makers, then footwear and apparel houses. The JK Velvet brand, launched in 2015, made the specialisation official: one fabric family, mastered completely.',
    img: '/assets/mill-story-1.jpg',
    caption: 'Fig. 01 — The craft floor, Surat',
  },
  {
    n: '02',
    title: 'The Export Chapter',
    body: 'Buyers in Nepal and Bangladesh came first — overland, relationship-driven, word-of-mouth. Then the Gulf. Then the UK. HemSambhav Impex was formed to give that demand a dedicated house: an export division with its own documentation discipline, its own quality gates, and one job — carrying JK Velvet’s fabric across borders without losing a thread of what made it worth carrying.',
    img: IMAGES.containerYard,
    caption: 'Fig. 02 — Dispatch, container yard',
  },
  {
    n: '03',
    title: 'The Promise',
    body: 'Our mark says it plainly: two pillars — the world that supplies and the world that receives — held together by one strong, flexible connection. We exist to make the auspicious possible. That means mill-direct pricing you can audit, QC records that travel with the bale, and a reply to every serious inquiry within one business day.',
    img: '/assets/mill-whatwedo.jpg',
    caption: 'Fig. 03 — Final inspection, velvet lot',
  },
];

const VALUES = [
  ['Authority', 'Three decades of manufacturing. We answer from the mill floor, not a trading desk.'],
  ['Reliability', 'Documents, deadlines and dispatches treated with the same seriousness as the fabric itself.'],
  ['Flexibility', 'The S-curve in our mark: strong enough to hold, flexible enough to adapt to every market.'],
  ['Specialisation', 'Velvet only. Flocked, woven, knitted — depth in one craft rather than breadth in many.'],
];

const CAPABILITIES = [
  { n: 'S-01', title: 'Sourcing & Development', desc: 'Custom colours, pile heights, bases and embossed designs developed with our mill team — from lab dip to bulk.' },
  { n: 'S-02', title: 'Quality Control', desc: 'Shade bands under D65, GSM verification, roll mapping and pre-dispatch inspection records on every consignment.' },
  { n: 'S-03', title: 'Export Documentation', desc: 'Commercial invoice, packing list, certificate of origin, bill of lading — prepared in-house, checked twice.' },
  { n: 'S-04', title: 'Logistics Coordination', desc: 'Road to Nepal and Bangladesh, sea via Nhava Sheva and Mundra, air for urgent lots. LCL and FCL, consolidated multi-item loads.' },
];

const About = () => {
  useSEO('About — The House of Velvet Since 1990 | HemSambhav Impex', 'Founded in Surat in 1990 by Anil Doshi, velvet specialists since 2002. HemSambhav Impex is the export division of JK Velvet — sourcing, QC, documentation and logistics.');
  return (
  <div data-testid="about-page">
    <PageHero
      id="about-hero"
      overline="Our Story — Est. 1990"
      lines={[<>A velvet house,</>, <><em className="italic text-navy">built to export.</em></>]}
      right={
        <p>
          HemSambhav Impex is the export division of Shree JK Handloom (JK Velvet) — a Surat
          velvet manufacturer since 1990, now shipping to Nepal, Bangladesh, the UAE, the UK
          and beyond.
        </p>
      }
    />

    <div className="px-6 py-20 md:px-12 md:py-28">
      <div className="mx-auto max-w-[1600px] space-y-24">
        {CHAPTERS.map((c, i) => (
          <div key={c.n} className={`grid items-center gap-10 lg:grid-cols-2 ${i % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''}`} data-testid={`chapter-${c.n}`}>
            <Reveal>
              <div className="img-frame aspect-[4/3] border border-navy/20">
                <img src={c.img.startsWith('/') ? c.img : c.img} alt={c.caption} loading="lazy" />
                <div className="absolute inset-0 bg-navy/20 mix-blend-multiply" />
              </div>
              <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.22em] text-navy/60">{c.caption}</p>
            </Reveal>
            <Reveal delay={0.15}>
              <span className="font-serif text-7xl italic text-navy/15 md:text-8xl">{c.n}</span>
              <h2 className="mt-2 font-serif text-4xl tracking-tight text-navy-dark md:text-5xl">{c.title}</h2>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-navy-dark/70 md:text-lg">{c.body}</p>
            </Reveal>
          </div>
        ))}
      </div>
    </div>

    <EditorialMarquee dark={false} />

    <section className="px-6 py-20 md:px-12 md:py-28" data-testid="about-values">
      <div className="mx-auto max-w-[1600px]">
        <Reveal>
          <p className="overline">What we stand on</p>
          <h2 className="mt-4 font-serif text-4xl tracking-tight text-navy-dark md:text-6xl">Mission & values</h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-navy-dark/70">
            To make the auspicious possible — connecting suppliers and buyers across the world
            with the strength of gold and the reliability of every trade done right.
          </p>
        </Reveal>
        <div className="mt-12 grid gap-px border border-navy/15 bg-navy/15 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map(([t, d], i) => (
            <Reveal key={t} delay={i * 0.08} className="bg-paper">
              <div className="p-7" data-testid={`value-${t.toLowerCase()}`}>
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-rust">0{i + 1}</span>
                <h3 className="mt-3 font-serif text-2xl text-navy-dark">{t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-navy-dark/65">{d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>

    <section className="border-t border-navy/15 px-6 py-20 md:px-12 md:py-28" data-testid="about-capabilities">
      <div className="mx-auto max-w-[1600px]">
        <Reveal>
          <p className="overline">Full-Service Export Desk</p>
          <h2 className="mt-4 font-serif text-4xl tracking-tight text-navy-dark md:text-6xl">Capabilities</h2>
        </Reveal>
        <div className="mt-12">
          {CAPABILITIES.map((c, i) => (
            <Reveal key={c.n} delay={i * 0.06}>
              <div className="grid gap-3 border-t border-navy/15 py-8 md:grid-cols-12 md:gap-8" data-testid={`capability-${c.n.toLowerCase()}`}>
                <span className="font-mono text-sm text-rust md:col-span-2">{c.n}</span>
                <h3 className="font-serif text-2xl text-navy-dark md:col-span-4">{c.title}</h3>
                <p className="text-base leading-relaxed text-navy-dark/70 md:col-span-6">{c.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>

    <section className="bg-navy-ink px-6 py-20 text-paper md:px-12 md:py-28" data-testid="about-parent">
      <div className="mx-auto flex max-w-[1600px] flex-col items-start gap-10 md:flex-row md:items-end md:justify-between">
        <Reveal>
          <p className="overline !text-paper/50">The Parent Brand</p>
          <h2 className="mt-4 max-w-2xl font-serif text-4xl leading-tight tracking-tight md:text-6xl">
            Behind every bale: <em className="italic text-rust-light">JK Velvet.</em>
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-paper/70">
            Visit our parent brand for the full domestic range, mill profile and the house
            that has woven Surat velvet since 1990.
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="flex flex-col gap-4">
            <a href={CONTACT.parentUrl} target="_blank" rel="noopener noreferrer" className="btn-light group" data-testid="about-jkvelvet-link">
              Visit jkvelvet.com <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <Link to="/contact" className="text-center font-mono text-[11px] uppercase tracking-[0.2em] text-paper/60 hover:text-paper" data-testid="about-contact-link">
              Or start an export inquiry
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  </div>
  );
};

export default About;
