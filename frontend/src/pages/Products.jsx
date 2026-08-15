import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { PageHero, Reveal } from '../components/Reveal';
import { CATEGORIES, END_USES, CONTACT, productImage } from '../data/catalog';
import { PRODUCTS } from '../data/products';
import { useSEO } from '../hooks/useSEO';

const Products = () => {
  useSEO('Export Catalog — 20 Velvet Fabrics | HemSambhav Impex', 'Flocked, weaving and knitting velvet for export — real mill specs, per-fabric MOQs and downloadable shade cards. Mill-direct from JK Velvet, Surat.');
  const [params] = useSearchParams();
  const initial = CATEGORIES.some((c) => c.id === params.get('cat')) ? params.get('cat') : 'all';
  const [filter, setFilter] = useState(initial);

  const shown = filter === 'all' ? PRODUCTS : PRODUCTS.filter((p) => p.cat === filter);

  return (
    <div data-testid="products-page">
      <PageHero
        id="products-hero"
        overline="Export Catalog — MOQ varies per fabric (metres or kilos)"
        lines={[<>The velvet</>, <><em className="italic text-navy">manifest.</em></>]}
        right={
          <p>
            Twenty constructions across flocked, weaving and knitting velvet — every one
            mill-direct from JK Velvet, Surat. Custom colours and development on request.
          </p>
        }
      />

      <div className="sticky top-[68px] z-30 border-b border-navy/15 bg-paper/90 backdrop-blur-md" data-testid="products-filter-bar">
        <div className="mx-auto flex max-w-[1600px] flex-wrap items-center gap-2 px-6 py-4 md:px-12">
          {[{ id: 'all', name: 'All', code: 'ALL' }, ...CATEGORIES].map((c) => (
            <button
              key={c.id}
              onClick={() => setFilter(c.id)}
              data-testid={`filter-${c.id}`}
              className={`border px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] transition-colors duration-300 ${
                filter === c.id
                  ? 'border-navy bg-navy text-paper'
                  : 'border-navy/25 text-navy-dark/70 hover:border-navy hover:text-navy'
              }`}
            >
              {c.name}
              <span className="ml-2 opacity-60">
                {c.id === 'all' ? PRODUCTS.length : PRODUCTS.filter((p) => p.cat === c.id).length}
              </span>
            </button>
          ))}
        </div>
      </div>

      <section className="px-6 py-16 md:px-12 md:py-20">
        <div className="mx-auto max-w-[1600px]">
          <div className="grid gap-px border border-navy/15 bg-navy/15 sm:grid-cols-2 lg:grid-cols-3" data-testid="products-grid">
            {shown.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 3) * 0.08} className="bg-paper">
                <article className="group flex h-full flex-col" data-testid={`product-card-${p.slug}`}>
                  <Link to={`/products/${p.slug}`} data-testid={`product-detail-link-${p.slug}`}>
                    <div className="img-frame aspect-[4/3]">
                      <img src={productImage(p)} alt={p.name} loading="lazy" />
                      <div className="absolute inset-0 bg-navy/25 mix-blend-multiply transition-opacity duration-500 group-hover:opacity-0" />
                    </div>
                  </Link>
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-rust">
                        {CATEGORIES.find((c) => c.id === p.cat)?.code} · {p.variants}
                      </span>
                      <span className={`font-mono text-[10px] uppercase tracking-[0.2em] ${p.stock === 'out' ? 'text-rust' : 'text-navy/50'}`}>{p.stock === 'out' ? 'Out of stock' : `MOQ ${p.specs?.moq || '250 m'}`}</span>
                    </div>
                    <h3 className="mt-3 font-serif text-2xl text-navy-dark">
                      <Link to={`/products/${p.slug}`} className="transition-colors hover:text-navy" data-testid={`product-title-link-${p.slug}`}>{p.name}</Link>
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-navy-dark/65">{p.desc}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {p.uses.map((u) => (
                        <span key={u} className="border border-navy/15 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.15em] text-navy/60">
                          {u}
                        </span>
                      ))}
                    </div>
                    <Link
                      to={`/contact?product=${encodeURIComponent(p.name)}`}
                      data-testid={`product-quote-${p.slug}`}
                      className="mt-5 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-navy transition-colors hover:text-rust"
                    >
                      Request quote <ArrowUpRight size={13} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-navy/15 px-6 py-20 md:px-12 md:py-28" data-testid="products-enduses">
        <div className="mx-auto max-w-[1600px]">
          <Reveal>
            <p className="overline">By End-Use</p>
            <h2 className="mt-4 font-serif text-4xl tracking-tight text-navy-dark md:text-6xl">Specified for the job</h2>
          </Reveal>
          <div className="mt-12 grid gap-px border border-navy/15 bg-navy/15 sm:grid-cols-2 lg:grid-cols-3">
            {END_USES.map((e, i) => (
              <Reveal key={e.name} delay={i * 0.06} className="bg-paper">
                <div className="p-7" data-testid={`products-enduse-${e.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}>
                  <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-rust">0{i + 1}</span>
                  <h3 className="mt-2 font-serif text-2xl text-navy-dark">{e.name}</h3>
                  <p className="mt-2 text-sm text-navy-dark/65">{e.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.1}>
            <div className="mt-12 flex flex-col items-start justify-between gap-6 border border-navy/15 bg-surface p-8 md:flex-row md:items-center">
              <p className="max-w-xl text-base text-navy-dark/75">
                Don’t see your construction? We develop custom velvet — your colour, pile, base
                and design — with mill-direct MOQs and the same export discipline.
              </p>
              <Link to="/contact" className="btn-primary group shrink-0" data-testid="products-custom-cta">
                Start a Custom Brief <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
};

export default Products;
