import { useState } from 'react';
import { PageHero, Reveal } from '../components/Reveal';
import { CATEGORIES, galleryImage } from '../data/catalog';
import { GALLERY_TILES } from '../data/gallery';
import { useSEO } from '../hooks/useSEO';

const FILTERS = [{ id: 'all', name: 'All' }, ...CATEGORIES.map((c) => ({ id: c.id, name: c.name })), { id: 'craft', name: 'The Mill' }];

const Gallery = () => {
  useSEO('Gallery — Velvet Texture Archive | HemSambhav Impex', 'Real mill photography of JK Velvet fabrics — flocked, weaving and knitting velvet textures from the Surat floor.');
  const TILES = GALLERY_TILES;
  const [filter, setFilter] = useState('all');
  const shown = filter === 'all' ? TILES : TILES.filter((t) => t.cat === filter);

  return (
    <div data-testid="gallery-page">
      <PageHero
        id="gallery-hero"
        overline="Texture Archive — Mill Photography"
        lines={[<>Seen up close,</>, <><em className="italic text-navy">felt in bulk.</em></>]}
        right={
          <p>
            Real fabric photography from the JK Velvet floor, organised by construction —
            the same lots your container will be cut from.
          </p>
        }
      />

      <div className="px-6 pt-10 md:px-12">
        <div className="mx-auto flex max-w-[1600px] flex-wrap gap-2" data-testid="gallery-filters">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              data-testid={`gallery-filter-${f.id}`}
              className={`border px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] transition-colors duration-300 ${
                filter === f.id ? 'border-navy bg-navy text-paper' : 'border-navy/25 text-navy-dark/70 hover:border-navy hover:text-navy'
              }`}
            >
              {f.name}
            </button>
          ))}
        </div>
      </div>

      <section className="px-6 py-12 md:px-12 md:py-16">
        <div className="mx-auto max-w-[1600px] columns-1 gap-6 sm:columns-2 lg:columns-3" data-testid="gallery-grid">
          {shown.map((t, i) => (
            <Reveal key={`${filter}-${i}`} delay={(i % 3) * 0.07} className="mb-6 break-inside-avoid">
              <figure className="group" data-testid={`gallery-tile-${t.cat}-${i}`}>
                <div className={`img-frame ${t.aspect} border border-navy/20`}>
                  <img src={galleryImage(t)} alt={t.label} loading="lazy" className="transition-transform duration-700" />
                  <div className="absolute inset-0 bg-navy/25 mix-blend-multiply transition-opacity duration-500 group-hover:opacity-0" />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-ink/50 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </div>
                <figcaption className="mt-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.22em] text-navy/60">
                  <span>{t.label}</span>
                  <span className="text-rust">{String(i + 1).padStart(2, '0')}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
        <p className="mx-auto mt-6 max-w-[1600px] font-mono text-[10px] uppercase tracking-[0.22em] text-navy/50" data-testid="gallery-note">
          Photography: JK Velvet mill archive · jkvelvet.com
        </p>
      </section>
    </div>
  );
};

export default Gallery;
