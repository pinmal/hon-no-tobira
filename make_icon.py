"""Instagram profile icon generator for 本のとびら"""
from PIL import Image, ImageDraw, ImageFont
import math, os, sys

SIZE = 800
BG = (15, 14, 23)       # #0f0e17
ACCENT = (232, 160, 69)  # #e8a045
WHITE = (255, 255, 255)
LIGHT = (200, 195, 210)

img = Image.new("RGB", (SIZE, SIZE), BG)
draw = ImageDraw.Draw(img)

# Outer decorative ring
cx, cy, r = SIZE // 2, SIZE // 2, SIZE // 2 - 10
draw.ellipse([cx - r, cy - r, cx + r, cy + r], outline=ACCENT, width=8)

# Inner subtle ring
r2 = r - 20
draw.ellipse([cx - r2, cy - r2, cx + r2, cy + r2], outline=(60, 55, 80), width=2)

# Book icon area (centered rectangle)
bw, bh = 220, 260
bx, by = cx - bw // 2, cy - bh // 2 - 40

# Book shadow
draw.rectangle([bx + 8, by + 8, bx + bw + 8, by + bh + 8], fill=(5, 5, 10))
# Book cover
draw.rectangle([bx, by, bx + bw, by + bh], fill=ACCENT)
# Book spine
draw.rectangle([bx, by, bx + 28, by + bh], fill=(180, 120, 40))
# Book pages (right edge)
for i in range(3):
    draw.rectangle([bx + bw - 6 + i, by + 4, bx + bw - 6 + i, by + bh - 4],
                   fill=(240, 235, 220))
# Lines on cover
line_color = (200, 130, 50)
for y_off in [60, 90, 120, 150]:
    draw.rectangle([bx + 45, by + y_off, bx + bw - 20, by + y_off + 5], fill=line_color)

# Try to load Japanese font, fall back to default
font_paths = [
    "C:/Windows/Fonts/msgothic.ttc",
    "C:/Windows/Fonts/meiryo.ttc",
    "C:/Windows/Fonts/YuGothR.ttc",
    "C:/Windows/Fonts/NotoSansCJK-Regular.ttc",
]
font_large = None
font_small = None
for fp in font_paths:
    if os.path.exists(fp):
        try:
            font_large = ImageFont.truetype(fp, 72)
            font_small = ImageFont.truetype(fp, 36)
            break
        except Exception:
            continue

if font_large is None:
    font_large = ImageFont.load_default()
    font_small = ImageFont.load_default()

# Main title
title = "本のとびら"
bbox = draw.textbbox((0, 0), title, font=font_large)
tw = bbox[2] - bbox[0]
draw.text((cx - tw // 2, by + bh + 30), title, font=font_large, fill=WHITE)

# Subtitle
sub = "@honno_tobira"
bbox2 = draw.textbbox((0, 0), sub, font=font_small)
sw = bbox2[2] - bbox2[0]
draw.text((cx - sw // 2, by + bh + 115), sub, font=font_small, fill=ACCENT)

out = os.path.join(os.path.dirname(__file__), "icon_honno_tobira.png")
img.save(out, "PNG")
print(f"Saved: {out}")
