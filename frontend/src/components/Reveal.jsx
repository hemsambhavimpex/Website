import { motion } from 'framer-motion';

export const EASE = [0.76, 0, 0.24, 1];

export const MaskedLines = ({ lines, className = '', lineClassName = '', delay = 0, as: Tag = 'h1' }) => (
  <Tag className={className}>
    {lines.map((line, i) => (
      <span key={i} className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
        <motion.span
          className={`block ${lineClassName}`}
          initial={{ y: '110%' }}
          animate={{ y: '0%' }}
          transition={{ duration: 1.1, ease: EASE, delay: delay + i * 0.13 }}
        >
          {line}
        </motion.span>
      </span>
    ))}
  </Tag>
);

export const Reveal = ({ children, delay = 0, y = 40, className = '' }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay }}
  >
    {children}
  </motion.div>
);

export const FadeIn = ({ children, delay = 0, className = '' }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1, delay }}
  >
    {children}
  </motion.div>
);

export const PageHero = ({ overline, lines, right, id }) => (
  <header className="border-b border-navy/15 px-6 pt-36 pb-16 md:px-12 md:pt-44 md:pb-24" data-testid={id}>
    <div className="mx-auto max-w-7xl">
      <motion.p
        className="overline mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {overline}
      </motion.p>
      <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
        <MaskedLines
          lines={lines}
          delay={0.25}
          className="font-serif text-5xl leading-[0.95] tracking-tight text-navy-dark sm:text-6xl lg:text-7xl"
        />
        {right && (
          <motion.div
            className="max-w-sm text-base leading-relaxed text-navy-dark/70"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.7 }}
          >
            {right}
          </motion.div>
        )}
      </div>
    </div>
  </header>
);
