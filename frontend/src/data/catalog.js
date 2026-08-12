const u = (id, w = 1400) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export const IMAGES = {
  heroVelvet: u('1629197521865-4946b4acd2b0', 1800),
  velvetBrown: u('1599568723850-14196ee0f991'),
  cargoShip: u('1670121180530-cfcba4438038', 1800),
  containerYard: u('1494412519320-aa613dfb7738', 1800),
  loom: u('1598616068517-c75ad397a436'),
  blackTexture: u('1550684376-efcbd6e3f031'),
  sofaGreen: u('1555041469-a586c61ea9bc'),
  chairYellow: u('1586023492125-27b2c045efd7'),
  sofaGrey: u('1493663284031-b7e3aefcae8e'),
  sofaOrange: u('1567016432779-094069958ea5'),
  bedroomLuxe: u('1616594039964-ae9021a400a0'),
  bedroom: u('1615874959474-d609969a20ed'),
  livingRoom: u('1615529182904-14819c35db37'),
  jewelBox: u('1515562141207-7a88fb7ce338'),
  jewelGold: u('1602173574767-37ac01994b2a'),
  giftPink: u('1549465220-1a8b9238cd48'),
  giftKraft: u('1513201099705-a9746e1e201f'),
  sneaker: u('1595341888016-a392ef81b7de'),
  flatlayDenim: u('1544441893-675973e31985'),
  saree: u('1617627143750-d86bc21e42bb'),
  fabricRack: u('1520006403909-838d6b92c22e'),
  denimStack: u('1605518216938-7c31b7b14ad0'),
  dressFlow: u('1583391733956-3750e0ff4e8b'),
};

export const CATEGORIES = [
  {
    id: 'flocked',
    name: 'Flocked Velvet',
    code: 'FLK',
    description:
      'Electrostatically flocked pile on fabric, non-woven and PVC bases — the workhorse of box-making, footwear and décor.',
    image: IMAGES.heroVelvet,
  },
  {
    id: 'weaving',
    name: 'Weaving Velvet',
    code: 'WVN',
    description:
      'Loom-woven pile constructions with depth, drape and durability for upholstery, apparel and furnishing.',
    image: IMAGES.sofaGreen,
  },
  {
    id: 'knitting',
    name: 'Knitting Velvet',
    code: 'KNT',
    description:
      'Fine micro-knitted velvets with a smooth face and natural stretch — garment and lining specialists.',
    image: IMAGES.dressFlow,
  },
];

export const PRODUCTS = [
  { slug: 'coco-velvet', name: 'Coco Velvet', cat: 'flocked', variants: 'Plain', desc: 'Rich flocked pile with a warm, coco-toned depth — favoured for premium box linings.', uses: ['Jewelry & Fancy Boxes', 'Gift & Décor Boxes'], img: 'jewelBox' },
  { slug: 'cloud-design-velvet', name: 'Cloud Design Velvet', cat: 'flocked', variants: 'Embossed design', desc: 'Soft flocked base carrying embossed cloud motifs for gift and décor packaging.', uses: ['Gift & Décor Boxes'], img: 'giftKraft' },
  { slug: 'furry-velvet', name: 'Furry Velvet', cat: 'flocked', variants: 'High loft', desc: 'High-loft flocked surface with a plush, tactile hand-feel.', uses: ['Upholstery', 'Gift & Décor Boxes'], img: 'sofaOrange' },
  { slug: 'galaxy-velvet', name: 'Galaxy Velvet', cat: 'flocked', variants: 'Plain & Embossed', desc: 'Shimmer-flecked flocked velvet, available in plain and embossed finishes.', uses: ['Jewelry & Fancy Boxes', 'Textile & Apparel'], img: 'jewelGold' },
  { slug: 'gota-design-velvet', name: 'Gota Design Velvet', cat: 'flocked', variants: 'Design', desc: 'Traditional gota-inspired patterns flocked for festive and ethnic applications.', uses: ['Textile & Apparel', 'Gift & Décor Boxes'], img: 'saree' },
  { slug: 'korean-velvet', name: 'Korean Velvet', cat: 'flocked', variants: 'Plain', desc: 'Fine, dense flocked pile with a smooth, even face for apparel and upholstery.', uses: ['Textile & Apparel', 'Upholstery'], img: 'fabricRack' },
  { slug: 'non-woven-velvet', name: 'Non-Woven Velvet', cat: 'flocked', variants: 'Plain & Embossed', desc: 'Flocked non-woven base in plain and embossed options — the box-maker’s staple.', uses: ['Jewelry & Fancy Boxes', 'Gift & Décor Boxes'], img: 'giftPink' },
  { slug: 'pvc-velvet', name: 'PVC Velvet', cat: 'flocked', variants: 'Plain', desc: 'Flocked PVC base — durable and wipeable, built for footwear and bags.', uses: ['Footwear'], img: 'sneaker' },
  { slug: 'taffeta-velvet', name: 'Taffeta Velvet', cat: 'flocked', variants: 'Plain', desc: 'Crisp taffeta-backed flocking with a structured hand and clean drape.', uses: ['Textile & Apparel', 'Gift & Décor Boxes'], img: 'dressFlow' },
  { slug: 'fd-full-dull-velvet', name: 'FD (Full Dull) Velvet', cat: 'weaving', variants: 'Woven', desc: 'Woven full-dull pile with a matte, understated lustre.', uses: ['Upholstery', 'Textile & Apparel'], img: 'sofaGrey' },
  { slug: 'holland-velvet', name: 'Holland Velvet', cat: 'weaving', variants: 'Woven', desc: 'Classic woven upholstery velvet with a dense, even pile.', uses: ['Upholstery'], img: 'sofaGreen' },
  { slug: 'kabul-velvet', name: 'Kabul Velvet', cat: 'weaving', variants: 'Woven', desc: 'Heavy woven construction suited to furnishings and statement décor.', uses: ['Upholstery', 'Gift & Décor Boxes'], img: 'bedroomLuxe' },
  { slug: 'lycra-velvet', name: 'Lycra Velvet', cat: 'weaving', variants: 'Stretch', desc: 'Stretch woven velvet engineered for form-fitting apparel.', uses: ['Textile & Apparel'], img: 'flatlayDenim' },
  { slug: 'mosha-velvet', name: 'Mosha Velvet', cat: 'weaving', variants: 'Woven', desc: 'Soft woven pile with a brushed, peached surface.', uses: ['Textile & Apparel', 'Upholstery'], img: 'bedroom' },
  { slug: 'raising-velvet', name: 'Raising Velvet', cat: 'weaving', variants: 'Woven', desc: 'Raised-pile woven velvet with deep, sculptural texture.', uses: ['Upholstery'], img: 'chairYellow' },
  { slug: 'brasso-velvet', name: 'Brasso Velvet', cat: 'knitting', variants: 'Burn-out', desc: 'Burn-out knitted velvet with patterned sheer contrast.', uses: ['Textile & Apparel'], img: 'denimStack' },
  { slug: 'micro-11000-falcon', name: 'Micro 11000 (Falcon Velvet)', cat: 'knitting', variants: 'Micro knit', desc: 'High-density micro knit — our flagship “Falcon” quality.', uses: ['Textile & Apparel', 'Jewelry & Fancy Boxes'], img: 'blackTexture' },
  { slug: 'micro-9000-velvet', name: 'Micro 9000 Velvet', cat: 'knitting', variants: 'Micro knit', desc: 'Fine micro knitted velvet for garments and precision lining.', uses: ['Textile & Apparel', 'Jewelry & Fancy Boxes'], img: 'jewelGold' },
  { slug: 'micro-velvet-99999', name: 'Micro Velvet 99999', cat: 'knitting', variants: 'Micro knit', desc: 'Premium micro knit with an exceptionally smooth face.', uses: ['Textile & Apparel', 'Upholstery'], img: 'livingRoom' },
  { slug: 'viscose-velvet', name: 'Viscose Velvet', cat: 'knitting', variants: 'Viscose blend', desc: 'Viscose-blend knitted velvet with a natural, fluid sheen.', uses: ['Textile & Apparel'], img: 'dressFlow' },
];

export const END_USES = [
  { name: 'Jewelry & Fancy Boxes', desc: 'Flocked interiors and coverings that make small objects feel precious.', img: 'jewelBox' },
  { name: 'Footwear', desc: 'PVC and flocked velvets built to flex, last and finish cleanly.', img: 'sneaker' },
  { name: 'Textile & Apparel', desc: 'Knitted and woven velvets for garments with drape and depth.', img: 'fabricRack' },
  { name: 'Gift & Décor Boxes', desc: 'Embossed and design flocks for packaging that carries the brand.', img: 'giftPink' },
  { name: 'Upholstery', desc: 'Woven velvets with the weight and wear furniture demands.', img: 'sofaGreen' },
  { name: 'Custom Development', desc: 'Your colour, pile, base and design — developed with our mill team.', img: 'loom' },
];

export const MARKETS = [
  { country: 'Nepal', port: 'Birgunj / Kathmandu (dry port)', mode: 'Road', terms: 'Regular dispatches' },
  { country: 'Bangladesh', port: 'Chattogram / Dhaka', mode: 'Sea & Road', terms: 'LCL & FCL' },
  { country: 'United Arab Emirates', port: 'Jebel Ali, Dubai', mode: 'Sea', terms: 'FCL & LCL' },
  { country: 'United Kingdom', port: 'Felixstowe / London Gateway', mode: 'Sea', terms: 'FCL & LCL' },
  { country: 'Other destinations', port: 'On request', mode: 'Sea / Air', terms: 'Worldwide, ex Nhava Sheva & Mundra' },
];

export const BLOG_POSTS = [
  {
    slug: 'flocked-vs-woven-vs-knitted-velvet',
    title: 'Flocked, Woven or Knitted: Choosing the Right Velvet Construction',
    date: '2026-06-18',
    category: 'Fabric Guide',
    excerpt: 'Three constructions, three very different behaviours. Here is how bulk buyers should think about pile, base and end-use before requesting a quote.',
    img: 'heroVelvet',
    body: [
      'Velvet is not one fabric — it is a family of constructions that happen to share a pile surface. The three you will encounter most in export trade are flocked, woven and knitted velvet, and confusing them is the fastest way to a disappointing bulk order.',
      'Flocked velvet is made by electrostatically standing short fibres on an adhesive-coated base — fabric, non-woven or PVC. It excels in box-making, footwear and décor because it is uniform, economical at volume, and takes embossing beautifully. Woven velvet is created on the loom itself, giving it superior depth, drape and durability — the right call for upholstery and apparel. Knitted velvet, especially micro deniers like our Micro 11000 and Micro 9000, offers stretch and a smooth face that garment makers love.',
      'When you write to us for a quote, tell us the end-use first. “Velvet for ring boxes, 250 metres” will get you a faster, sharper answer than “velvet, best price” — because construction follows purpose, and price follows construction.',
    ],
  },
  {
    slug: 'five-checks-before-bulk-velvet-order',
    title: '5 Things to Check Before Placing a Bulk Velvet Order',
    date: '2026-05-30',
    category: 'Export Tips',
    excerpt: 'Shade bands, pile direction, GSM tolerance, roll length and packing — the five details that decide whether your container delights or disappoints.',
    img: 'flatlayDenim',
    body: [
      'Bulk fabric buying rewards the specific. Before you confirm a purchase order, lock down five things: the exact shade (ask for a lab dip or strike-off under D65 light), the pile direction and whether your cutting plan accounts for it, the GSM tolerance you will accept, the roll length and roll count per bale, and the packing standard — polybag, tube-rolled or bale-pressed.',
      'Each of these is a one-line clause in your proforma invoice, and each one prevents a category of dispute. Pile direction alone has ruined more garment consignments than any shipping delay.',
      'At HemSambhav Impex we document all five on every PI as standard. If your current supplier does not, ask them to — or ask us for a comparative quote.',
    ],
  },
  {
    slug: 'why-250-metre-moq-works',
    title: 'Understanding MOQs in Fabric Export: Why 250 Metres Works',
    date: '2026-04-22',
    category: 'Industry Notes',
    excerpt: 'Minimum order quantities are not a barrier — they are how mills keep your price honest. A short note on the economics behind our 250-metre MOQ.',
    img: 'containerYard',
    body: [
      'Every fabric program has a fixed cost that exists whether we run 25 metres or 2,500: colour matching, machine setup, pile calibration and quality inspection. A minimum order quantity spreads that fixed cost across enough metres to keep your per-metre price meaningful.',
      'Our MOQ is 250 metres per item — one of the most accessible thresholds in Surat’s velvet trade. For a box manufacturer, that is roughly a full season of one SKU; for an apparel buyer, a solid pilot run. It lets you test a market without warehousing a container.',
      'If you are between MOQs on multiple items, talk to us about consolidated shipments. Buyers in Nepal, Bangladesh, the UAE and the UK routinely combine three or four constructions in a single dispatch to keep freight efficient.',
    ],
  },
  {
    slug: 'export-documentation-loom-to-loading-bay',
    title: 'From Loom to Loading Bay: How Export Documentation Protects Your Shipment',
    date: '2026-03-15',
    category: 'Export Tips',
    excerpt: 'Commercial invoice, packing list, certificate of origin, bill of lading — what each document does and why disciplined paperwork is a buyer’s best insurance.',
    img: 'cargoShip',
    body: [
      'Ask any experienced importer what separates a smooth consignment from a stuck one and they will give you the same answer: paperwork. The commercial invoice establishes value for customs; the packing list lets your broker and the port agree on what is actually inside; the certificate of origin can unlock preferential duty; and the bill of lading is title to your goods while they cross the water.',
      'Because HemSambhav Impex is the dedicated export division of JK Velvet — a mill that has run since 1990 — documentation is not an afterthought bolted onto a trader’s desk. QC reports, roll maps and packing lists are generated from the same production run that made your fabric.',
      'When you request a quote, tell us your destination port and Incoterm preference. We will return not just a price, but a document checklist for your specific lane — so there are no surprises between Surat and your warehouse.',
    ],
  },
];

export const CONTACT = {
  email: 'contact@hemsambhavimpex.com',
  phone: '+91 94295 81000',
  phoneHref: '+919429581000',
  whatsapp: 'https://wa.me/919429581000',
  address: '370, JK House, Ghansyamnagar-2, L.H. Road, Varachha, Surat, Gujarat – 395006, India',
  parent: 'Shree JK Handloom (JK Velvet)',
  parentUrl: 'https://jkvelvet.com',
  moq: '250 metres per item',
};
