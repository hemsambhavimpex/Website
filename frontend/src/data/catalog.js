// All imagery is self-hosted — no external image hosts
const g = (name) => `/assets/general/${name}.webp`;

export const IMAGES = {
  heroVelvet: g('hero-velvet'),
  velvetBrown: g('velvet-brown'),
  cargoShip: g('cargo-ship'),
  containerYard: g('container-yard'),
  loom: g('loom'),
  blackTexture: g('black-texture'),
  sofaGreen: g('sofa-green'),
  chairYellow: g('chair-yellow'),
  sofaGrey: g('sofa-grey'),
  sofaOrange: g('sofa-orange'),
  bedroomLuxe: g('bedroom-luxe'),
  bedroom: g('bedroom'),
  livingRoom: g('living-room'),
  jewelBox: g('jewel-box'),
  jewelGold: g('jewel-gold'),
  giftPink: g('gift-pink'),
  giftKraft: g('gift-kraft'),
  sneaker: g('sneaker'),
  flatlayDenim: g('flatlay-denim'),
  saree: g('saree'),
  fabricRack: g('fabric-rack'),
  denimStack: g('denim-stack'),
  dressFlow: g('dress-flow'),
};

export const CATEGORIES = [
  {
    id: 'weaving',
    name: 'Weaving Velvet',
    code: 'WVN',
    description:
      'Loom-woven pile constructions with depth, drape and durability for upholstery, apparel and furnishing.',
    image: '/assets/products/micro-11000-falcon.jpg',
  },
  {
    id: 'flocked',
    name: 'Flocked Velvet',
    code: 'FLK',
    description:
      'Electrostatically flocked pile on fabric, non-woven and PVC bases — the workhorse of box-making, footwear and décor.',
    image: '/assets/products/galaxy-velvet.jpg',
  },
  {
    id: 'knitting',
    name: 'Raising Velvet',
    code: 'RSG',
    description:
      'Raised-pile knitted velvets with deep, sculptural texture for apparel and furnishing.',
    image: '/assets/products/raising-velvet.jpg',
  },
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

export const SPECS_BY_CAT = {
  flocked: {
    construction: 'Electrostatic flocked pile',
    composition: 'Polyester pile on fabric / non-woven / PVC base',
    gsm: '180–320 (base dependent)',
    width: '44–58 in (112–147 cm)',
  },
  weaving: {
    construction: 'Loom-woven pile',
    composition: 'Polyester / poly-viscose blends',
    gsm: '220–380',
    width: '54–58 in (137–147 cm)',
  },
  knitting: {
    construction: 'Raised-pile knitted construction',
    composition: 'Polyester / poly-viscose blends',
    gsm: '220–380',
    width: '54–58 in (137–147 cm)',
  },
};

export const TRADE_TERMS = [
  ['MOQ', '250 metres per item'],
  ['Packing', 'Tube-rolled, polybagged; bale or buyer spec'],
  ['Lead Time', '7–15 days ex-mill, shade dependent'],
  ['Payment', 'Advance / LC at sight'],
  ['Incoterms', 'EXW · FOB · CIF (on request)'],
];

export const SHADE_CARD = [
  ['Midnight Navy', '#16243D'], ['Ink Blue', '#1A4C7D'], ['Maroon', '#5E1A24'],
  ['Bottle Green', '#1E3D2F'], ['Rust', '#C85A17'], ['Camel', '#B08D57'],
  ['Wine', '#6E2440'], ['Charcoal', '#2B2B2B'], ['Ivory', '#EDE6D6'],
  ['Rosewood', '#7A3B3B'], ['Teal', '#14505C'], ['Jet Black', '#111111'],
];

// Photos: local /assets/products/<slug>.jpg files
export const productImage = (p) => {
  if (!p.photo) return IMAGES[p.img] || IMAGES.fabricRack;
  if (p.photo.startsWith('/') || p.photo.startsWith('http')) return p.photo;
  return `/assets/products/${p.photo}`;
};

export const postImage = (p) =>
  p.img && (p.img.startsWith('/') || p.img.startsWith('http')) ? p.img : IMAGES[p.img] || IMAGES.heroVelvet;

export const galleryImage = (t) =>
  t.img && (t.img.startsWith('/') || t.img.startsWith('http')) ? t.img : IMAGES[t.img] || IMAGES.loom;

export const CONTACT = {
  email: 'contact@hemsambhavimpex.com',
  phone: '+91 94295 81000',
  phoneHref: '+919429581000',
  whatsapp: 'https://wa.me/919429581000',
  address: '370, JK House, Ghansyamnagar-2, L.H. Road, Varachha, Surat, Gujarat – 395006, India',
  parent: 'Shree JK Handloom (JK Velvet)',
  parentUrl: 'https://jkvelvet.com',
  moq: 'per fabric, from 150 m / 1 roll',
};
