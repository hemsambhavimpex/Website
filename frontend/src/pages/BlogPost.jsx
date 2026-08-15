import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { MaskedLines, Reveal } from '../components/Reveal';
import { BLOG_POSTS as STATIC_POSTS, postImage } from '../data/catalog';
import { usePosts } from '../hooks/usePosts';
import { useSEO } from '../hooks/useSEO';

const fmt = (d) =>
  new Date(d).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });

const BlogPost = () => {
  const { slug } = useParams();
  const BLOG_POSTS = usePosts();
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  useSEO(
    post ? `${post.title} | HemSambhav Impex` : 'Trade Journal | HemSambhav Impex',
    post?.excerpt || ''
  );

  if (!post) {
    return (
      <div className="px-6 pt-44 pb-32 text-center" data-testid="post-not-found">
        <p className="font-serif text-4xl text-navy-dark">This entry isn’t in the journal.</p>
        <Link to="/blog" className="btn-primary mt-8 inline-flex" data-testid="post-not-found-back">Back to Journal</Link>
      </div>
    );
  }

  return (
    <div data-testid="blog-post-page">
      <header className="border-b border-navy/15 px-6 pt-36 pb-12 md:px-12 md:pt-44">
        <div className="mx-auto max-w-4xl">
          <Reveal y={16}>
            <Link to="/blog" className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-navy/60 hover:text-rust" data-testid="blog-back-link">
              <ArrowLeft size={14} /> The Trade Journal
            </Link>
            <p className="overline mt-8">{fmt(post.date)} — {post.category}</p>
          </Reveal>
          <MaskedLines
            lines={[post.title]}
            delay={0.2}
            className="mt-6 font-serif text-4xl leading-[1.05] tracking-tight text-navy-dark md:text-6xl"
          />
        </div>
      </header>
      <div className="px-6 py-12 md:px-12">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <div className="img-frame aspect-[16/8] border border-navy/20">
              <img src={postImage(post)} alt={post.title} />
              <div className="absolute inset-0 bg-navy/20 mix-blend-multiply" />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-12 space-y-7" data-testid="blog-post-body">
              {post.body.map((para, i) => (
                <p key={i} className={`leading-relaxed text-navy-dark/80 ${i === 0 ? 'font-serif text-2xl md:text-[1.7rem]' : 'text-base md:text-lg'}`}>
                  {para}
                </p>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-16 flex flex-col items-start justify-between gap-6 border-t border-navy/15 pt-10 md:flex-row md:items-center">
              <p className="max-w-md font-serif text-2xl italic text-navy-dark">
                Sourcing velvet at scale? The manifest desk replies within one business day.
              </p>
              <Link to="/contact" className="btn-primary group shrink-0" data-testid="blog-post-cta">
                Request a Quote <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
