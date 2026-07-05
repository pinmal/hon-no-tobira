"""OG画像生成（1200×630px） for 本のとびら"""
from PIL import Image, ImageDraw, ImageFont
import os

W, H = 1200, 630
BG = (15, 14, 23)        # #0f0e17
ACCENT = (232, 160, 69)  # #e8a045
WHITE = (255, 255, 255)
MUTED = (160, 155, 170)

img = Image.new("RGB", (W, H), BG)
draw = ImageDraw.Draw(img)

# グラデーション風の背景帯（右側を少し明るく）
for x in range(W):
    alpha = int(x / W * 30)
    draw.line([(x, 0), (x, H)], fill=(15 + alpha // 3, 14 + alpha // 3, 23 + alpha // 2))

# 左側の縦ライン装飾（アクセントカラー）
for i, lw in enumerate([6, 2, 1]):
    x_pos = 60 + i * 18
    draw.rectangle([x_pos, 60, x_pos + lw, H - 60], fill=ACCENT if i == 0 else (100, 80, 40))

# 書籍アイコン（左エリア）
bw, bh = 180, 240
bx, by = 120, (H - bh) // 2
# 影
draw.rectangle([bx + 8, by + 8, bx + bw + 8, by + bh + 8], fill=(5, 5, 10))
# カバー
draw.rectangle([bx, by, bx + bw, by + bh], fill=ACCENT)
# 背表紙
draw.rectangle([bx, by, bx + 24, by + bh], fill=(180, 120, 40))
# ページ端
for i in range(4):
    draw.rectangle([bx + bw - 6 + i, by + 4, bx + bw - 5 + i, by + bh - 4], fill=(235, 230, 215))
# カバーのライン
lc = (200, 130, 50)
for y_off in [50, 75, 100, 125, 150]:
    draw.rectangle([bx + 36, by + y_off, bx + bw - 16, by + y_off + 4], fill=lc)

# フォント読み込み
font_paths = [
    "C:/Windows/Fonts/msgothic.ttc",
    "C:/Windows/Fonts/meiryo.ttc",
    "C:/Windows/Fonts/YuGothR.ttc",
]
f_xl = f_lg = f_md = f_sm = None
for fp in font_paths:
    if os.path.exists(fp):
        try:
            f_xl = ImageFont.truetype(fp, 88)
            f_lg = ImageFont.truetype(fp, 52)
            f_md = ImageFont.truetype(fp, 34)
            f_sm = ImageFont.truetype(fp, 26)
            break
        except Exception:
            continue
if f_xl is None:
    f_xl = f_lg = f_md = f_sm = ImageFont.load_default()

# テキストエリア（右側）
tx = 370

# メインタイトル
title = "本のとびら"
bbox = draw.textbbox((0, 0), title, font=f_xl)
draw.text((tx, 110), title, font=f_xl, fill=WHITE)

# サブタイトル
sub = "Kindle おすすめ書籍一覧"
draw.text((tx, 220), sub, font=f_lg, fill=ACCENT)

# 区切り線
draw.rectangle([tx, 295, tx + 600, 298], fill=(60, 55, 80))

# キャッチコピー
copy1 = "釣り・キャンプ・料理・健康・犬・園芸"
draw.text((tx, 320), copy1, font=f_md, fill=MUTED)
copy2 = "ジャンル多彩な 53 冊を毎日紹介"
draw.text((tx, 365), copy2, font=f_md, fill=MUTED)

# URL
url = "hon-no-tobira.pages.dev"
bbox_url = draw.textbbox((0, 0), url, font=f_sm)
draw.text((tx, H - 100), url, font=f_sm, fill=(100, 95, 115))

# Instagram
ig = "@honno_tobira"
draw.text((tx, H - 65), ig, font=f_sm, fill=ACCENT)

# 右下の小さな本アイコン（装飾）
cx2, cy2 = W - 80, H - 80
bw2, bh2 = 60, 80
draw.rectangle([cx2, cy2, cx2 + bw2, cy2 + bh2], fill=(50, 45, 65))
draw.rectangle([cx2, cy2, cx2 + 8, cy2 + bh2], fill=(80, 60, 30))

out = os.path.join(os.path.dirname(__file__), "public", "og-image.jpg")
img.save(out, "JPEG", quality=95)
print(f"Saved: {out} ({W}x{H}px)")
