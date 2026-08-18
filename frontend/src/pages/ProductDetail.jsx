import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, MessageSquare } from 'lucide-react';
import { MaskedLines, Reveal } from '../components/Reveal';
import { ProductImageViewer } from '../components/ProductImageViewer';
import { PRODUCTS } from '../data/products';
import { CATEGORIES, SPECS_BY_CAT, CONTACT, productImage, productImages } from '../data/catalog';
import { useSEO } from '../hooks/useSEO';

const ProductDetail = () => {
  const { slug } = useParams();
  const product = PRODUCTS.find((p) => p.slug === slug);

  useSEO(
    product ? `${product.name} — ${product.variants || 'Velvet'} Export | HemSambhav Impex` : 'Fabric Not Found | HemSambhav Impex',
    product ? `${product.desc} Mill-direct from JK Velvet, Surat. ${product.specs?.moq ? `MOQ ${product.specs.moq}.` : ''}` : ''
  );

  if (!product) {
    return (
      <div className="px-6 pt-44 pb-32 text-center" data-testid="product-not-found">
        <p className="font-serif text-4xl text-navy-dark">This fabric isn’t on the manifest.</p>
        <Link to="/products" className="btn-primary mt-8 inline-flex" data-testid="not-found-back">Back to Catalog</Link>
      </div>
    );
  }

  const cat = CATEGORIES.find((c) => c.id === product.cat);
  const base = SPECS_BY_CAT[product.cat];
  const specs = product.specs || {};
  const specRows = [
    ['Construction', base.construction],
    specs.composition && ['Composition', specs.composition],
    specs.gsm && ['GSM', specs.gsm],
    specs.width && ['Usable Width', specs.width],
    specs.roll && ['Roll / Packing Length', specs.roll],
    specs.moq && ['MOQ', specs.moq],
    ['Packing', 'Tube-rolled / folded, polybagged; bale or buyer spec'],
    ['Lead Time', '7–15 days ex-mill, shade dependent'],
    ['Payment', 'Advance / LC at sight'],
    ['Incoterms', 'EXW · FOB · CIF (on request)'],
  ].filter(Boolean);
  const related = PRODUCTS.filter((p) => p.cat === product.cat && p.slug !== product.slug).slice(0, 3);
  const images = productImages(product);
  const waText = encodeURIComponent(`Hello HemSambhav Impex — I’d like a quote for ${product.name} (${cat.name}). Quantity: `);

  return (
    <div data-testid="product-detail-page">
      <header className="border-b border-navy/15 px-6 pt-32 pb-12 md:px-12 md:pt-40" data-testid="product-detail-hero">
        <div className="mx-auto max-w-[1600px]">
          <Reveal y={16}>
            <Link to={`/products?cat=${product.cat}`} className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-navy/60 hover:text-rust" data-testid="product-back-link">
              <ArrowLeft size={14} /> {cat.name}
            </Link>
          </Reveal>
          <div className="mt-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <MaskedLines
              lines={[product.name]}
              delay={0.15}
              className="font-serif text-5xl leading-[0.95] tracking-tight text-navy-dark sm:text-6xl lg:text-7xl"
            />
            <Reveal delay={0.4} y={16}>
              <div className="flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.22em] text-navy/60">
                <span className="text-rust">{cat.code}</span>
                <span>·</span>
                <span>{product.variants}</span>
                <span>·</span>
                <span>{product.stock === 'out' ? 'Currently out of stock' : `MOQ ${product.specs?.moq || '250 m'}`}</span>
              </div>
            </Reveal>
          </div>
        </div>
      </header>

      <section className="px-6 py-14 md:px-12 md:py-20">
        <div className="mx-auto grid max-w-[1600px] gap-14 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Reveal>
              <ProductImageViewer
                product={product}
                images={images}
                coverIndex={product.coverIndex || 0}
                categoryCode={cat.code}
              />
            </Reveal>
          </div>

          <div className="lg:col-span-6">
            <Reveal delay={0.1}>
              <p className="text-base leading-relaxed text-navy-dark/75 md:text-lg" data-testid="product-detail-desc">
                {product.desc} Mill-direct from JK Velvet, Surat — {cat.description.toLowerCase()}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {product.uses.map((u) => (
                  <span key={u} className="border border-navy/15 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.15em] text-navy/70">
                    {u}
                  </span>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="mt-10 border border-navy/20" data-testid="product-specs-table">
                <div className="border-b border-navy/20 bg-navy-ink px-6 py-3">
                  <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-paper/80">
                    Specification Sheet — Mill Data
                  </p>
                </div>
                {specRows.map(([k, v], i, arr) => (
                  <div key={k} className={`grid grid-cols-2 ${i < arr.length - 1 ? 'border-b border-navy/15' : ''}`} data-testid={`spec-${k.toLowerCase().replace(/\s/g, '-')}`}>
                    <p className="border-r border-navy/15 px-6 py-3.5 font-mono text-[10px] uppercase tracking-[0.2em] text-navy/60">{k}</p>
                    <p className="px-6 py-3.5 text-sm text-navy-dark">{v}</p>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-xs text-navy-dark/55">
                Only confirmed mill data is shown. Final shade and terms are fixed on the proforma invoice before production.
              </p>
              {product.stock === 'out' && (
                <p className="mt-4 border border-rust/40 bg-rust/10 px-4 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-rust" data-testid="out-of-stock-note">
                  Currently out of stock — send an inquiry to reserve the next lot
                </p>
              )}
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link to={`/contact?product=${encodeURIComponent(product.name)}`} className="btn-primary group" data-testid="detail-quote-button">
                  Request a Quote <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
                <a href={`${CONTACT.whatsapp}?text=${waText}`} target="_blank" rel="noopener noreferrer" className="btn-secondary group" data-testid="detail-whatsapp-button">
                  <MessageSquare size={14} /> WhatsApp This Fabric
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="border-t border-navy/15 px-6 py-16 md:px-12 md:py-24" data-testid="related-products">
          <div className="mx-auto max-w-[1600px]">
            <Reveal>
              <p className="overline">Same Construction</p>
              <h2 className="mt-3 font-serif text-3xl tracking-tight text-navy-dark md:text-5xl">Also in {cat.name}</h2>
            </Reveal>
            <div className="mt-10 grid gap-px border border-navy/15 bg-navy/15 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p, i) => (
                <Reveal key={p.slug} delay={i * 0.08} className="bg-paper">
                  <Link to={`/products/${p.slug}`} className="group block" data-testid={`related-${p.slug}`}>
                    <div className="img-frame aspect-[16/9]">
                      <img src={productImage(p)} alt={p.name} loading="lazy" />
                      <div className="absolute inset-0 bg-navy/25 mix-blend-multiply transition-opacity duration-500 group-hover:opacity-0" />
                    </div>
                    <div className="flex items-center justify-between p-6">
                      <div>
                        <h3 className="font-serif text-xl text-navy-dark group-hover:text-navy">{p.name}</h3>
                        <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-navy/50">{p.variants}</p>
                      </div>
                      <ArrowUpRight size={18} className="text-navy/40 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-rust" />
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetail;
