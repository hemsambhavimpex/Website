import io
from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor

NAVY = HexColor('#1A4C7D')
INK = HexColor('#0A192F')
PAPER = HexColor('#F4F1EA')
RUST = HexColor('#C85A17')
MUTED = HexColor('#5B6B7D')

PRODUCTS = {
    'coco-velvet': ('Coco Velvet', 'flocked', 'Plain'),
    'cloud-design-velvet': ('Cloud Design Velvet', 'flocked', 'Embossed design'),
    'furry-velvet': ('Furry Velvet', 'flocked', 'High loft'),
    'galaxy-velvet': ('Galaxy Velvet', 'flocked', 'Plain & Embossed'),
    'gota-design-velvet': ('Gota Design Velvet', 'flocked', 'Design'),
    'korean-velvet': ('Korean Velvet', 'flocked', 'Plain'),
    'non-woven-velvet': ('Non-Woven Velvet', 'flocked', 'Plain & Embossed'),
    'pvc-velvet': ('PVC Velvet', 'flocked', 'Plain'),
    'taffeta-velvet': ('Taffeta Velvet', 'flocked', 'Plain'),
    'twilight': ('Twilight', 'weaving', 'Woven - FD Full Dull'),
    'holland-velvet': ('Holland Velvet', 'weaving', 'Woven'),
    'kabul-velvet': ('Kabul Velvet', 'weaving', 'Woven'),
    'lycra-velvet': ('Lycra Velvet', 'weaving', 'Stretch'),
    'mosha-velvet': ('Mosha Velvet', 'weaving', 'Woven'),
    'raising-velvet': ('Raising Velvet', 'weaving', 'Woven'),
    'brasso-velvet': ('Brasso Velvet', 'knitting', 'Burn-out'),
    'micro-11000-falcon': ('Micro 11000 (Falcon Velvet)', 'knitting', 'Micro knit'),
    'micro-9000-velvet': ('Micro 9000 Velvet', 'knitting', 'Micro knit'),
    'micro-velvet-99999': ('Micro Velvet 99999', 'knitting', 'Micro knit'),
    'viscose-velvet': ('Viscose Velvet', 'knitting', 'Viscose blend'),
}

# Real mill data published on jkvelvet.com
MILL_SPECS = {
    'coco-velvet': ('Warp-knit polyester velvet', '170 +/-10%', '54 in (137 cm)', '25 m rolls', '250 m'),
    'cloud-design-velvet': ('Custom base fabric, flocked', '150-300', '44 in & 56 in (112/142 cm)', '50 m rolls', '1,000 m (10,000 m custom design)'),
    'non-woven-velvet': ('Flocked pile on non-woven base', '110', '60 in (152 cm)', '50 m rolls', '250 m per parcel (5 rolls)'),
    'micro-9000-velvet': ('Polyester base, micro knit', '130', '44 in & 54 in (112/137 cm)', '40-80 m folded rolls', '~300 m per parcel'),
    'lycra-velvet': ('Polyester-Lycra blend, woven', '125-220', '58-60 in (147-152 cm)', '~20 kg rolls', '40 kg (2 rolls)'),
    'holland-velvet': ('100% polyester, woven', '180', '56 in (142 cm)', '50-70 m rolls', '250 m'),
    'furry-velvet': (None, '180 +/-10%', None, '25 m rolls', '250 m per colour / parcel'),
    'galaxy-velvet': (None, '180 +/-10%', None, '70-90 m rolls', '~210 m per colour'),
    'gota-design-velvet': (None, None, '44 in (112 cm)', 'Stock lots', '300 m per design/colour (stock); 900 m production lot'),
    'korean-velvet': (None, '220 +/-10%', None, '50 m rolls', '150 m'),
    'pvc-velvet': (None, None, None, '50 m rolls', '3 rolls per parcel per colour; 500 m custom colour'),
    'taffeta-velvet': (None, None, '44 in (112 cm)', '60-100 m rolls', '300 m per parcel'),
    'twilight': (None, None, '54 in (137 cm)', '70-100 m rolls', '1 roll'),
    'kabul-velvet': (None, '110 +/-10%', '54 in (137 cm)', '30 m rolls', '15 rolls / 450 m'),
    'mosha-velvet': (None, '220 +/-10%', None, '70-110 m rolls', '1 roll'),
    'raising-velvet': (None, '115 +/-5%', None, '70-80 m rolls', '3 rolls per parcel; min 700 m per colour/design'),
    'micro-11000-falcon': (None, '150 +/-5%', None, '40-60 m per than', '1,000 m per colour'),
    'micro-velvet-99999': (None, None, None, None, '1,000 m per colour'),
    'viscose-velvet': (None, None, None, None, '1,000 m per lot per colour'),
}

CATS = {
    'flocked': ('FLK', 'Flocked Velvet', 'Electrostatic flocked pile', 'Polyester pile on fabric / non-woven / PVC base', '180-320 (base dependent)', '44-58 in (112-147 cm)'),
    'weaving': ('WVN', 'Weaving Velvet', 'Loom-woven pile', 'Polyester / poly-viscose blends', '220-380', '54-58 in (137-147 cm)'),
    'knitting': ('KNT', 'Knitting Velvet', 'Micro-knitted pile', 'Polyester micro / viscose blends', '180-300', '58-60 in (147-152 cm)'),
}

TRADE = [
    ('MOQ', '250 metres per item'),
    ('Packing', 'Tube-rolled, polybagged; bale or buyer spec'),
    ('Lead Time', '7-15 days ex-mill, shade dependent'),
    ('Payment', 'Advance / LC at sight'),
    ('Incoterms', 'EXW / FOB / CIF (on request)'),
]

SHADES = [
    ('HS-01', 'Midnight Navy', '#16243D'), ('HS-02', 'Ink Blue', '#1A4C7D'),
    ('HS-03', 'Maroon', '#5E1A24'), ('HS-04', 'Bottle Green', '#1E3D2F'),
    ('HS-05', 'Rust', '#C85A17'), ('HS-06', 'Camel', '#B08D57'),
    ('HS-07', 'Wine', '#6E2440'), ('HS-08', 'Charcoal', '#2B2B2B'),
    ('HS-09', 'Ivory', '#EDE6D6'), ('HS-10', 'Rosewood', '#7A3B3B'),
    ('HS-11', 'Teal', '#14505C'), ('HS-12', 'Jet Black', '#111111'),
]

W, H = A4
M = 48


def mono(c, x, y, text, size=7.5, color=MUTED, spaced=True):
    c.setFont('Courier', size)
    c.setFillColor(color)
    c.drawString(x, y, ' '.join(text.upper()) if spaced else text)


def build_shade_card(slug: str) -> bytes:
    name, cat, variants = PRODUCTS[slug]
    code, cat_name, construction, composition, gsm, width = CATS[cat]
    mill = MILL_SPECS.get(slug)
    if mill:
        m_comp, m_gsm, m_width, m_roll, m_moq = mill
        composition, gsm, width, roll, moq = m_comp, m_gsm, m_width, m_roll, m_moq
    else:
        composition = gsm = width = roll = moq = None

    buf = io.BytesIO()
    c = canvas.Canvas(buf, pagesize=A4)
    c.setTitle(f'{name} — Shade Card — HemSambhav Impex')

    c.setFillColor(PAPER)
    c.rect(0, 0, W, H, fill=1, stroke=0)
    c.setStrokeColor(NAVY)
    c.setLineWidth(1)
    c.rect(M - 14, M - 14, W - 2 * (M - 14), H - 2 * (M - 14), fill=0, stroke=1)

    c.setFillColor(INK)
    c.rect(M - 14, H - 118, W - 2 * (M - 14), 104, fill=1, stroke=0)
    c.setFillColor(PAPER)
    c.setFont('Helvetica-Bold', 20)
    c.drawString(M + 6, H - 76, 'HEMSAMBHAV')
    c.setFont('Helvetica-Bold', 9)
    c.drawString(M + 8, H - 92, 'I M P E X')
    c.setFillColor(RUST)
    c.setFont('Courier', 8)
    c.drawRightString(W - M - 6, H - 70, 'S H A D E  C A R D')
    c.setFillColor(PAPER)
    c.drawRightString(W - M - 6, H - 86, f'H S - {code}')

    y = H - 156
    c.setFillColor(INK)
    c.setFont('Times-Bold', 30)
    c.drawString(M, y, name)
    mono(c, M, y - 20, f'{cat_name.upper()}  ·  {variants.upper()}  ·  EXPORT DIVISION OF JK VELVET, SURAT', 7, MUTED, spaced=False)
    if slug == 'brasso-velvet':
        mono(c, M, y - 34, 'Currently out of stock — inquire to reserve the next lot', 7.5, RUST)

    y -= 56
    specs = [
        ('Construction', construction),
        composition and ('Composition', composition),
        gsm and ('GSM', gsm),
        width and ('Usable Width', width),
        roll and ('Roll / Packing Length', roll),
        moq and ('MOQ', moq),
        ('Packing', 'Tube-rolled / folded, polybagged; bale or buyer spec'),
        ('Lead Time', '7-15 days ex-mill, shade dependent'),
        ('Payment', 'Advance / LC at sight'),
        ('Incoterms', 'EXW / FOB / CIF (on request)'),
    ]
    specs = [r for r in specs if r]
    c.setStrokeColor(NAVY)
    c.setLineWidth(0.6)
    for i, (k, v) in enumerate(specs):
        ry = y - i * 22
        c.line(M, ry - 16, W - M, ry - 16)
        mono(c, M, ry - 10, k, 7, NAVY)
        c.setFillColor(INK)
        c.setFont('Helvetica', 9)
        c.drawString(M + 170, ry - 10, v)
    y = y - len(specs) * 22 - 26

    mono(c, M, y, 'Indicative shade range', 7.5, RUST)
    y -= 14
    cols, sw, sh, gapx, gapy = 6, 62, 62, 10.5, 34
    for i, (scode, sname, hexv) in enumerate(SHADES):
        col, row = i % cols, i // cols
        x = M + col * (sw + gapx)
        sy = y - row * (sh + gapy) - sh
        c.setFillColor(HexColor(hexv))
        c.setStrokeColor(NAVY)
        c.setLineWidth(0.5)
        c.rect(x, sy, sw, sh, fill=1, stroke=1)
        c.setFillColor(INK)
        c.setFont('Courier', 6.5)
        c.drawString(x, sy - 10, scode)
        c.setFont('Helvetica', 7)
        c.setFillColor(MUTED)
        c.drawString(x, sy - 20, sname)

    fy = M + 34
    c.setStrokeColor(NAVY)
    c.line(M, fy + 26, W - M, fy + 26)
    c.setFillColor(INK)
    c.setFont('Times-Italic', 11)
    c.drawString(M, fy + 8, '"Possibility to Prosperity"')
    c.setFont('Courier', 7)
    c.setFillColor(MUTED)
    c.drawString(M, fy - 6, 'contact@hemsambhavimpex.com  ·  +91 94295 81000')
    c.drawString(M, fy - 17, '370, JK House, Ghansyamnagar-2, L.H. Road, Varachha, Surat 395006, India')
    c.setFont('Helvetica', 6.5)
    c.drawString(M, fy - 29, 'Screen/print shades are indicative — a physical shade card is couriered on request. Final shade confirmed on proforma invoice.')

    c.showPage()
    c.save()
    return buf.getvalue()
