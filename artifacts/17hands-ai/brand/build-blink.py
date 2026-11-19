"""Build the closed-eye overlay for the link-in-bio portrait.

Writes public/anastasia/assets/portrait-blink.png: a transparent canvas the
same size as anastasia-portrait.jpg with only a closed eyelid painted over her
left eye (the right one as you look at the photo). The page stacks it on the
photo with identical object-fit/object-position, so it lines up at every size,
and flashes it briefly to blink.

The lid is the skin strip just above the eye stretched down over the opening,
with a lash line drawn along where the lids meet. If the portrait changes,
re-measure EYE (in portrait pixels) and rerun:

    python3 artifacts/17hands-ai/brand/build-blink.py
"""

from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter

ROOT = Path(__file__).resolve().parent.parent
ASSETS = ROOT / "public" / "anastasia" / "assets"
PORTRAIT = ASSETS / "anastasia-portrait.jpg"
OUT = ASSETS / "portrait-blink.png"

# Eye box in portrait pixels: left, top of lid skin, right, bottom of opening.
EYE = (264, 195, 328, 225)
# Rows of lid skin (between crease and lashes) that get stretched down.
LID_ROWS = (190, 196)
# Under-eye skin rows, blended in so the lid is skin-toned rather than all eyeshadow.
SKIN_ROWS = (228, 234)
# Lash line where the lids meet: inner corner, low point, outer corner.
LASH = [(272, 216), (296, 221), (321, 205)]

SCALE = 4  # draw at 4x and downsample, for a smooth lash line


def quad(p0, p1, p2, steps=40):
    pts = []
    for i in range(steps + 1):
        t = i / steps
        x = (1 - t) ** 2 * p0[0] + 2 * (1 - t) * t * p1[0] + t**2 * p2[0]
        y = (1 - t) ** 2 * p0[1] + 2 * (1 - t) * t * p1[1] + t**2 * p2[1]
        pts.append((x * SCALE, y * SCALE))
    return pts


def main() -> None:
    src = Image.open(PORTRAIT).convert("RGB")
    left, top, right, bottom = EYE

    # Average the lid skin per column, smooth it sideways, then stretch it down.
    # Stretching the raw strip turns its texture into vertical streaks.
    w, h = right - left, bottom - top
    def band(rows):
        strip = src.crop((left - 8, rows[0], right + 8, rows[1]))
        row = strip.resize((strip.width, 1), Image.BOX)
        row = row.resize((strip.width, 9), Image.NEAREST).filter(ImageFilter.BoxBlur(4))
        return row.crop((8, 4, 8 + w, 5))

    row = Image.blend(band(LID_ROWS), band(SKIN_ROWS), 0.4)
    lid = row.resize((w, h), Image.NEAREST)
    # Shade toward the lash line, as a closed lid curves away from the light.
    shade = Image.linear_gradient("L").resize((w, h)).point(lambda v: int(v * 0.14))
    lid = Image.composite(Image.new("RGB", (w, h), (70, 40, 40)), lid, shade)
    lid = lid.filter(ImageFilter.GaussianBlur(0.6))

    big = lid.resize((lid.width * SCALE, lid.height * SCALE), Image.BICUBIC)
    draw = ImageDraw.Draw(big)
    lash = [(x - left * SCALE, y - top * SCALE) for x, y in quad(*LASH)]
    draw.line(lash, fill=(72, 42, 40), width=int(1.2 * SCALE), joint="curve")
    # Soft shadow just under the lash line, where the lid folds.
    shade = [(x, y + 1.6 * SCALE) for x, y in lash]
    draw.line(shade, fill=(140, 88, 78), width=int(1.0 * SCALE), joint="curve")
    lid = big.resize(lid.size, Image.LANCZOS).filter(ImageFilter.GaussianBlur(0.4))

    mask = Image.new("L", (lid.width * SCALE, lid.height * SCALE), 0)
    ImageDraw.Draw(mask).ellipse(
        (2 * SCALE, 1 * SCALE, (lid.width - 2) * SCALE, (lid.height - 1) * SCALE),
        fill=255,
    )
    mask = mask.resize(lid.size, Image.LANCZOS).filter(ImageFilter.GaussianBlur(2.2))

    canvas = Image.new("RGBA", src.size, (0, 0, 0, 0))
    patch = lid.convert("RGBA")
    patch.putalpha(mask)
    canvas.alpha_composite(patch, (left, top))
    canvas.save(OUT, optimize=True)
    print(f"wrote {OUT.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
