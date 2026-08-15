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
    image: '/assets/products/galaxy-velvet.jpg',
  },
  {
    id: 'weaving',
    name: 'Weaving Velvet',
    code: 'WVN',
    description:
      'Loom-woven pile constructions with depth, drape and durability for upholstery, apparel and furnishing.',
    image: '/assets/products/holland-velvet.jpg',
  },
  {
    id: 'knitting',
    name: 'Knitting Velvet',
    code: 'KNT',
    description:
      'Fine micro-knitted velvets with a smooth face and natural stretch — garment and lining specialists.',
    image: '/assets/products/micro-11000-falcon.jpg',
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
    construction: 'Micro-knitted pile',
    composition: 'Polyester micro / viscose blends',
    gsm: '180–300',
    width: '58–60 in (147–152 cm)',
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
