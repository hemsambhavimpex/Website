import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { PageHero, Reveal } from '../components/Reveal';
import { BLOG_POSTS as STATIC_POSTS } from '../data/catalog';
import { usePosts } from '../hooks/usePosts';
import { useSEO } from '../hooks/useSEO';

const fmt = (d) =>
  new Date(d).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase();

const Blog = () => {
  useSEO('The Trade Journal — Velvet & Export Notes | HemSambhav Impex', 'Velvet constructions, bulk-order checklists and export documentation guides for fabric buyers — from the HemSambhav Impex manifest desk.');
  const BLOG_POSTS = usePosts();
  return (
  <div data-testid="blog-page">
    <PageHero
      id="blog-hero"
      overline="The Trade Journal"
      lines={[<>Notes from the</>, <><em className="italic text-navy">loom & the lane.</em></>]}
      right={
        <p>
          Velvet constructions, export craft and industry notes — written for buyers who
          move fabric by the bale, not the metre.
        </p>
      }
    />
    <section className="px-6 py-16 md:px-12 md:py-24">
      <div className="mx-auto max-w-[1600px]" data-testid="blog-list">
        {BLOG_POSTS.map((p, i) => (
          <Reveal key={p.slug} delay={i * 0.06}>
            <Link
              to={`/blog/${p.slug}`}
              className="group grid gap-4 border-t border-navy/15 py-10 transition-colors last:border-b hover:bg-surface md:grid-cols-12 md:gap-8 md:px-4"
              data-testid={`blog-row-${p.slug}`}
            >
              <div className="md:col-span-3">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-navy/55">{fmt(p.date)}</p>
                <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.25em] text-rust">{p.category}</p>
              </div>
              <div className="md:col-span-8">
                <h2 className="font-serif text-3xl leading-tight tracking-tight text-navy-dark transition-colors group-hover:text-navy md:text-4xl">
                  {p.title}
                </h2>
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-navy-dark/65">{p.excerpt}</p>
              </div>
              <div className="flex items-start md:col-span-1 md:justify-end">
                <ArrowUpRight size={22} className="text-navy/40 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-rust" />
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  </div>
  );
};

export default Blog;
