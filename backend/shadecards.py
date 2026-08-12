import io
from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor

NAVY = HexColor('#1A4C7D')
INK = HexColor('#0A192F')
PAPER = HexColor('#F4F1EA')
RUST = HexColor('#C85A17')
MUTED = HexColor('#5B6B7D')

CATS = {
    'flocked': ('FLK', 'Flocked Velvet', 'Electrostatic flocked pile'),
    'weaving': ('WVN', 'Weaving Velvet', 'Loom-woven pile'),
    'knitting': ('KNT', 'Knitting Velvet', 'Micro-knitted pile'),
}

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


def build_shade_card(p: dict) -> bytes:
    name = p['name']
    cat = p.get('cat', 'flocked')
    variants = p.get('variants', '')
    specs = p.get('specs') or {}
    code, cat_name, construction = CATS.get(cat, CATS['flocked'])

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
    if p.get('stock') == 'out':
        mono(c, M, y - 34, 'Currently out of stock — inquire to reserve the next lot', 7.5, RUST)

    y -= 56
    rows = [
        ('Construction', construction),
        specs.get('composition') and ('Composition', specs['composition']),
        specs.get('gsm') and ('GSM', specs['gsm']),
        specs.get('width') and ('Usable Width', specs['width']),
        specs.get('roll') and ('Roll / Packing Length', specs['roll']),
        specs.get('moq') and ('MOQ', specs['moq']),
        ('Packing', 'Tube-rolled / folded, polybagged; bale or buyer spec'),
        ('Lead Time', '7-15 days ex-mill, shade dependent'),
        ('Payment', 'Advance / LC at sight'),
        ('Incoterms', 'EXW / FOB / CIF (on request)'),
    ]
    rows = [r for r in rows if r]
    c.setStrokeColor(NAVY)
    c.setLineWidth(0.6)
    for i, (k, v) in enumerate(rows):
        ry = y - i * 22
        c.line(M, ry - 16, W - M, ry - 16)
        mono(c, M, ry - 10, k, 7, NAVY)
        c.setFillColor(INK)
        c.setFont('Helvetica', 9)
        c.drawString(M + 170, ry - 10, str(v)[:80])
    y = y - len(rows) * 22 - 26

    mono(c, M, y, 'Indicative shade range' if not p.get('shades') else 'Shade range', 7.5, RUST)
    y -= 14
    raw_shades = p.get('shades') or []
    if raw_shades:
        shades = [(f'HS-{i+1:02d}', s.get('name', ''), s.get('hex', '#888888')) for i, s in enumerate(raw_shades[:18])]
    else:
        shades = SHADES
    cols, sw, sh, gapx, gapy = 6, 62, 62, 10.5, 34
    for i, (scode, sname, hexv) in enumerate(shades):
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
