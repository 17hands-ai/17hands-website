"""Build the link-in-bio contact card.

Writes public/link-in-bio/assets/anastasia-blodgett.vcf with the contact
photo embedded: the branded portrait cropped square, darkened toward the
bottom, with the rose-gold 17hands mark set low and centred. Phones show
contact photos as a circle, so the mark sits inside the inscribed circle.

Edit the fields below and rerun; never hand-edit the .vcf (the photo is a
long base64 line that is easy to corrupt).

    python3 artifacts/17hands-ai/brand/build-vcard.py
"""

import base64
import io
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
ASSETS = ROOT / "public" / "link-in-bio" / "assets"
PORTRAIT = ASSETS / "anastasia-portrait.jpg"
LOGO = ASSETS / "1-logo-rosegold.png"
OUT_VCF = ASSETS / "anastasia-blodgett.vcf"
OUT_PHOTO = ASSETS / "contact-photo.jpg"

SIZE = 600
PLUM = (19, 9, 30)

FIELDS = [
    "N:Blodgett;Anastasia;;;",
    "FN:Anastasia Blodgett",
    "ORG:17hands.ai",
    "TITLE:Founder",
    "TEL;TYPE=CELL,VOICE:+1-415-996-9743",
    "EMAIL;TYPE=WORK:anastasia@17hands.ai",
    "URL:https://17hands.ai/",
    "URL;TYPE=booking:https://cal.com/17hands",
    "X-SOCIALPROFILE;TYPE=linkedin:https://www.linkedin.com/in/anastasia-blodgett",
    "NOTE:Security and practical AI for small businesses. Book a call: https://cal.com/17hands",
]


def build_photo() -> bytes:
    src = Image.open(PORTRAIT).convert("RGB")
    # The portrait has rounded dark corners; crop inside them, keeping the face high.
    inset = 30
    side = src.width - 2 * inset
    img = src.crop((inset, 12, inset + side, 12 + side)).resize(
        (SIZE, SIZE), Image.LANCZOS
    )

    # Plum fade over the lower third so the mark reads on any part of the photo.
    fade = Image.new("L", (1, SIZE))
    start = int(SIZE * 0.66)
    for y in range(SIZE):
        t = max(0.0, (y - start) / (SIZE - start))
        fade.putpixel((0, y), int(225 * min(1.0, t) ** 1.3))
    img = Image.composite(
        Image.new("RGB", img.size, PLUM), img, fade.resize(img.size)
    )

    logo = Image.open(LOGO).convert("RGBA")
    w = int(SIZE * 0.27)
    logo = logo.resize((w, int(logo.height * w / logo.width)), Image.LANCZOS)
    x = (SIZE - logo.width) // 2
    y = SIZE - logo.height - int(SIZE * 0.045)
    img.paste(logo, (x, y), logo)

    buf = io.BytesIO()
    img.save(buf, "JPEG", quality=86, optimize=True)
    return buf.getvalue()


def fold(line: str) -> str:
    """RFC 2425 line folding at 75 octets, continuation lines start with a space."""
    out, rest = [], line
    while len(rest) > 75:
        out.append(rest[:75])
        rest = " " + rest[75:]
    out.append(rest)
    return "\r\n".join(out)


def main() -> None:
    photo = build_photo()
    OUT_PHOTO.write_bytes(photo)
    b64 = base64.b64encode(photo).decode("ascii")
    lines = ["BEGIN:VCARD", "VERSION:3.0", *FIELDS, f"PHOTO;ENCODING=b;TYPE=JPEG:{b64}", "END:VCARD"]
    OUT_VCF.write_text("\r\n".join(fold(l) for l in lines) + "\r\n", encoding="ascii")
    print(f"wrote {OUT_VCF.relative_to(ROOT)} ({OUT_VCF.stat().st_size // 1024} KB)")


if __name__ == "__main__":
    main()
