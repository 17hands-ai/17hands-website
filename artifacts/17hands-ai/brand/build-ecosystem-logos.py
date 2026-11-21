"""Build the Community & Projects logos for the link-in-bio page.

Reads the full rose-gold logos in brand/ecosystem-src/ (transparent WebP with
the project name and "by 17 hands" set underneath) and writes just the
emblem, without the text, to public/anastasia/assets/ as square transparent
PNGs. The text is dropped because the card already prints the name, and at
56px it would be unreadable anyway.

The emblem is the first block of non-transparent rows; the text lines start
after a clear gap. Replace a source file and rerun:

    python3 artifacts/17hands-ai/brand/build-ecosystem-logos.py
"""

from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "brand" / "ecosystem-src"
OUT = ROOT / "public" / "anastasia" / "assets"

LOGOS = {
    "digital-defenders.webp": "3-digital-defenders-logo-gold.png",
    "karaoke.webp": "5-karaoke-logo-gold.png",
    "tea-story.webp": "4-tea-story-logo-gold.png",
}

SIZE = 320  # 56px box at up to ~5x device pixel ratio
GAP = 20  # transparent rows that separate the emblem from the text


def emblem_bottom(alpha: Image.Image) -> int:
    """Last row of the first block of visible rows."""
    w, h = alpha.size
    seen, blank = None, 0
    for y in range(h):
        if alpha.crop((0, y, w, y + 1)).getbbox():
            if seen is not None and blank >= GAP:
                return seen
            seen, blank = y, 0
        elif seen is not None:
            blank += 1
    return h - 1


def main() -> None:
    for src_name, out_name in LOGOS.items():
        im = Image.open(SRC / src_name).convert("RGBA")
        alpha = im.getchannel("A").point(lambda v: 255 if v > 40 else 0)
        bottom = emblem_bottom(alpha)
        box = alpha.crop((0, 0, im.width, bottom + 1)).getbbox()
        emblem = im.crop(box)

        side = max(emblem.size)
        square = Image.new("RGBA", (side, side), (0, 0, 0, 0))
        square.paste(emblem, ((side - emblem.width) // 2, (side - emblem.height) // 2))
        square = square.resize((SIZE, SIZE), Image.LANCZOS)
        square.save(OUT / out_name, optimize=True)
        print(f"wrote {(OUT / out_name).relative_to(ROOT)} from rows 0-{bottom}")


if __name__ == "__main__":
    main()
