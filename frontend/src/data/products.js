// Static product catalog — single source of truth (was MongoDB; frozen at static conversion)
// Static product catalog — single source of truth (was MongoDB; frozen at static conversion)
export const PRODUCTS = [
  {
    "slug": "coco-velvet",
    "name": "Coco Velvet",
    "cat": "flocked",
    "variants": "Plain",
    "desc": "Rich flocked pile with a warm, coco-toned depth — favoured for premium box linings.",
    "uses": [
      "Jewelry & Fancy Boxes",
      "Gift & Décor Boxes"
    ],
    "stock": "in",
    "specs": {
      "composition": "Warp-knit polyester velvet",
      "gsm": "170 ±10%",
      "width": "54 in (137 cm)",
      "roll": "25 m rolls",
      "moq": "250 m"
    },
    "photo": "coco-velvet.jpg",
    "img": "jewelBox"
  },
  {
    "slug": "cloud-design-velvet",
    "name": "Cloud Design Velvet",
    "cat": "flocked",
    "variants": "Embossed design",
    "desc": "Soft flocked base carrying embossed cloud motifs for gift and décor packaging.",
    "uses": [
      "Gift & Décor Boxes"
    ],
    "stock": "in",
    "specs": {
      "composition": "Custom base fabric, flocked",
      "gsm": "150–300",
      "width": "44 in & 56 in (112/142 cm)",
      "roll": "50 m rolls",
      "moq": "1,000 m (10,000 m for custom design)"
    },
    "photo": "cloud-design-velvet.jpg",
    "img": "giftKraft"
  },
  {
    "slug": "furry-velvet",
    "name": "Furry Velvet",
    "cat": "flocked",
    "variants": "High loft",
    "desc": "High-loft flocked surface with a plush, tactile hand-feel.",
    "uses": [
      "Upholstery",
      "Gift & Décor Boxes"
    ],
    "stock": "in",
    "specs": {
      "gsm": "180 ±10%",
      "roll": "25 m rolls",
      "moq": "250 m per colour / parcel"
    },
    "photo": "furry-velvet.jpg",
    "img": "sofaOrange"
  },
  {
    "slug": "galaxy-velvet",
    "name": "Galaxy Velvet",
    "cat": "flocked",
    "variants": "Plain & Embossed",
    "desc": "Shimmer-flecked flocked velvet, available in plain and embossed finishes.",
    "uses": [
      "Jewelry & Fancy Boxes",
      "Textile & Apparel"
    ],
    "stock": "in",
    "specs": {
      "gsm": "180 ±10%",
      "roll": "70–90 m rolls",
      "moq": "~210 m per colour"
    },
    "photo": "galaxy-velvet.jpg",
    "img": "jewelGold"
  },
  {
    "slug": "gota-design-velvet",
    "name": "Gota Design Velvet",
    "cat": "flocked",
    "variants": "Design",
    "desc": "Traditional gota-inspired patterns flocked for festive and ethnic applications.",
    "uses": [
      "Textile & Apparel",
      "Gift & Décor Boxes"
    ],
    "stock": "in",
    "specs": {
      "width": "44 in (112 cm)",
      "roll": "Stock lots",
      "moq": "300 m per design/colour (stock) · 900 m production lot"
    },
    "photo": "gota-design-velvet.jpg",
    "img": "saree"
  },
  {
    "slug": "korean-velvet",
    "name": "Korean Velvet",
    "cat": "flocked",
    "variants": "Plain",
    "desc": "Fine, dense flocked pile with a smooth, even face for apparel and upholstery.",
    "uses": [
      "Textile & Apparel",
      "Upholstery"
    ],
    "stock": "in",
    "specs": {
      "gsm": "220 ±10%",
      "roll": "50 m rolls",
      "moq": "150 m"
    },
    "photo": "korean-velvet.jpg",
    "img": "fabricRack"
  },
  {
    "slug": "non-woven-velvet",
    "name": "Non-Woven Velvet",
    "cat": "flocked",
    "variants": "Plain & Embossed",
    "desc": "Flocked non-woven base in plain and embossed options — the box-maker’s staple.",
    "uses": [
      "Jewelry & Fancy Boxes",
      "Gift & Décor Boxes"
    ],
    "stock": "in",
    "specs": {
      "composition": "Flocked pile on non-woven base",
      "gsm": "110",
      "width": "60 in (152 cm)",
      "roll": "50 m rolls",
      "moq": "250 m per parcel (5 rolls)"
    },
    "photo": "non-woven-velvet.jpg",
    "img": "giftPink"
  },
  {
    "slug": "pvc-velvet",
    "name": "PVC Velvet",
    "cat": "flocked",
    "variants": "Plain",
    "desc": "Flocked PVC base — durable and wipeable, built for footwear and bags.",
    "uses": [
      "Footwear"
    ],
    "stock": "in",
    "specs": {
      "roll": "50 m rolls",
      "moq": "3 rolls per parcel per colour · 500 m custom colour"
    },
    "photo": "pvc-velvet.jpg",
    "img": "sneaker"
  },
  {
    "slug": "taffeta-velvet",
    "name": "Taffeta Velvet",
    "cat": "flocked",
    "variants": "Plain",
    "desc": "Crisp taffeta-backed flocking with a structured hand and clean drape.",
    "uses": [
      "Textile & Apparel",
      "Gift & Décor Boxes"
    ],
    "stock": "in",
    "specs": {
      "width": "44 in (112 cm)",
      "roll": "60–100 m rolls",
      "moq": "300 m per parcel"
    },
    "photo": "taffeta-velvet.jpg",
    "img": "dressFlow"
  },
  {
    "slug": "twilight",
    "name": "Twilight",
    "cat": "knitting",
    "variants": "Woven · FD Full Dull",
    "desc": "Woven full-dull pile with a matte, understated lustre.",
    "uses": [
      "Upholstery",
      "Textile & Apparel"
    ],
    "stock": "in",
    "specs": {
      "width": "54 in (137 cm)",
      "roll": "70–100 m rolls",
      "moq": "1 roll"
    },
    "photo": "twilight.jpg",
    "img": "sofaGrey",
    "shades": []
  },
  {
    "slug": "holland-velvet",
    "name": "Holland Velvet",
    "cat": "knitting",
    "variants": "Woven",
    "desc": "Classic woven upholstery velvet with a dense, even pile.",
    "uses": [
      "Upholstery"
    ],
    "stock": "in",
    "specs": {
      "composition": "100% polyester, woven",
      "gsm": "180",
      "width": "56 in (142 cm)",
      "roll": "50–70 m rolls",
      "moq": "250 m"
    },
    "photo": "holland-velvet.jpg",
    "img": "sofaGreen"
  },
  {
    "slug": "kabul-velvet",
    "name": "Kabul Velvet",
    "cat": "knitting",
    "variants": "Woven",
    "desc": "Heavy woven construction suited to furnishings and statement décor.",
    "uses": [
      "Upholstery",
      "Gift & Décor Boxes"
    ],
    "stock": "in",
    "specs": {
      "gsm": "110 ±10%",
      "width": "54 in (137 cm)",
      "roll": "30 m rolls",
      "moq": "15 rolls / 450 m"
    },
    "photo": "kabul-velvet.jpg",
    "img": "bedroomLuxe"
  },
  {
    "slug": "lycra-velvet",
    "name": "Lycra Velvet",
    "cat": "knitting",
    "variants": "Stretch",
    "desc": "Stretch woven velvet engineered for form-fitting apparel.",
    "uses": [
      "Textile & Apparel"
    ],
    "stock": "in",
    "specs": {
      "composition": "Polyester–Lycra blend, woven",
      "gsm": "125–220",
      "width": "58–60 in (147–152 cm)",
      "roll": "~20 kg rolls",
      "moq": "40 kg (2 rolls)"
    },
    "photo": "lycra-velvet.jpg",
    "img": "flatlayDenim"
  },
  {
    "slug": "mosha-velvet",
    "name": "Mosha Velvet",
    "cat": "knitting",
    "variants": "Woven",
    "desc": "Soft woven pile with a brushed, peached surface.",
    "uses": [
      "Textile & Apparel",
      "Upholstery"
    ],
    "stock": "in",
    "specs": {
      "gsm": "220 ±10%",
      "roll": "70–110 m rolls",
      "moq": "1 roll"
    },
    "photo": "mosha-velvet.jpg",
    "img": "bedroom"
  },
  {
    "slug": "raising-velvet",
    "name": "Raising Velvet",
    "cat": "knitting",
    "variants": "Woven",
    "desc": "Raised-pile woven velvet with deep, sculptural texture.",
    "uses": [
      "Upholstery"
    ],
    "stock": "in",
    "specs": {
      "gsm": "115 ±5%",
      "roll": "70–80 m rolls",
      "moq": "3 rolls per parcel · min 700 m per colour/design"
    },
    "photo": "raising-velvet.jpg",
    "img": "chairYellow"
  },
  {
    "slug": "brasso-velvet",
    "name": "Brasso Velvet",
    "cat": "weaving",
    "variants": "Burn-out",
    "desc": "Burn-out knitted velvet with patterned sheer contrast.  ",
    "uses": [
      "Textile & Apparel"
    ],
    "stock": "out",
    "specs": {},
    "photo": "brasso-velvet.jpg",
    "img": "denimStack",
    "shades": []
  },
  {
    "slug": "micro-11000-falcon",
    "name": "Micro 11000 (Falcon Velvet)",
    "cat": "weaving",
    "variants": "Micro knit",
    "desc": "High-density micro knit — our flagship “Falcon” quality.",
    "uses": [
      "Textile & Apparel",
      "Jewelry & Fancy Boxes"
    ],
    "stock": "in",
    "specs": {
      "gsm": "150 ±5%",
      "roll": "40–60 m per than",
      "moq": "1,000 m per colour"
    },
    "photo": "micro-11000-falcon.jpg",
    "img": "blackTexture"
  },
  {
    "slug": "micro-9000-velvet",
    "name": "Micro 9000 Velvet",
    "cat": "weaving",
    "variants": "Micro knit",
    "desc": "Fine micro knitted velvet for garments and precision lining.",
    "uses": [
      "Textile & Apparel",
      "Jewelry & Fancy Boxes"
    ],
    "stock": "in",
    "specs": {
      "composition": "Polyester base, micro knit",
      "gsm": "130",
      "width": "44 in & 54 in (112/137 cm)",
      "roll": "40–80 m folded rolls",
      "moq": "~300 m per parcel"
    },
    "photo": "micro-9000-velvet.jpg",
    "img": "jewelGold"
  },
  {
    "slug": "micro-velvet-99999",
    "name": "Micro Velvet 99999",
    "cat": "weaving",
    "variants": "Micro knit",
    "desc": "Premium micro knit with an exceptionally smooth face.",
    "uses": [
      "Textile & Apparel",
      "Upholstery"
    ],
    "stock": "in",
    "specs": {
      "moq": "1,000 m per colour"
    },
    "photo": "micro-velvet-99999.jpg",
    "img": "livingRoom"
  },
  {
    "slug": "viscose-velvet",
    "name": "Viscose Velvet",
    "cat": "weaving",
    "variants": "Viscose blend",
    "desc": "Viscose-blend knitted velvet with a natural, fluid sheen.",
    "uses": [
      "Textile & Apparel"
    ],
    "stock": "in",
    "specs": {
      "moq": "1,000 m per lot per colour"
    },
    "photo": "viscose-velvet.jpg",
    "img": "dressFlow"
  }
];
