import Marquee from 'react-fast-marquee';

const ITEMS = ['Possibility to Prosperity', 'HemSambhav Impex', 'Export Division of JK Velvet', 'Surat → The World', 'Since 1990'];

export const EditorialMarquee = ({ dark = true }) => (
  <div
    className={`overflow-hidden border-y py-6 md:py-8 ${dark ? 'border-navy-ink bg-navy-ink' : 'border-navy/15 bg-paper'}`}
    data-testid="editorial-marquee"
  >
    <Marquee speed={28} gradient={false} pauseOnHover>
      {ITEMS.map((t, i) => (
        <span key={i} className="mx-8 flex items-center gap-16">
          <span className={`font-serif text-3xl italic md:text-5xl ${dark ? 'text-paper/90' : 'text-navy'}`}>{t}</span>
          <span className="font-serif text-2xl text-rust md:text-4xl">✦</span>
        </span>
      ))}
    </Marquee>
  </div>
);
