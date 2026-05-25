"""Instagram用カバー画像リサイズ（4:5 = 1080x1350）"""
from PIL import Image
import os

TARGET_W, TARGET_H = 1080, 1350  # 4:5
BG_COLOR = (15, 14, 23)          # サイトの背景色 #0f0e17
SRC = "public/covers"
DST = "public/covers_ig"
os.makedirs(DST, exist_ok=True)

for fname in sorted(os.listdir(SRC)):
    if not fname.endswith(".jpg"):
        continue

    img = Image.open(os.path.join(SRC, fname)).convert("RGB")
    iw, ih = img.size

    # アスペクト比を保ちつつ枠内に収まるようリサイズ
    scale = min(TARGET_W / iw, TARGET_H / ih)
    new_w = int(iw * scale)
    new_h = int(ih * scale)
    resized = img.resize((new_w, new_h), Image.LANCZOS)

    # 背景キャンバスに中央配置
    canvas = Image.new("RGB", (TARGET_W, TARGET_H), BG_COLOR)
    x = (TARGET_W - new_w) // 2
    y = (TARGET_H - new_h) // 2
    canvas.paste(resized, (x, y))

    out_path = os.path.join(DST, fname)
    canvas.save(out_path, "JPEG", quality=92)
    print(f"{fname}: {iw}x{ih} -> {TARGET_W}x{TARGET_H} OK")

print(f"\n完了: {DST}/ に保存しました")
