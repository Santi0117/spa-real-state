from PIL import Image

SRC = "public/logo-jopa.png"
OUT_ICON = "public/logo-jopa-icon.png"
OUT_FULL = "public/logo-jopa.png"


def is_background(r: int, g: int, b: int, a: int) -> bool:
    if a < 20:
        return True
    sat = max(r, g, b) - min(r, g, b)
    lum = (r + g + b) / 3
    if lum > 205 and sat < 45:
        return True
    if lum > 180 and sat < 20:
        return True
    return False


def remove_background(im: Image.Image) -> Image.Image:
    im = im.convert("RGBA")
    px = im.load()
    w, h = im.size
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            if is_background(r, g, b, a):
                px[x, y] = (r, g, b, 0)
    return im


def to_white(im: Image.Image) -> Image.Image:
    """Convierte el ícono a blanco para fondos oscuros (header/footer)."""
    px = im.load()
    w, h = im.size
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            if a > 8:
                px[x, y] = (255, 255, 255, a)
    return im


def lighten_navy(im: Image.Image) -> Image.Image:
    """Aclara el azul marino para que se lea bien sobre header oscuro."""
    target = (95, 158, 210)
    px = im.load()
    w, h = im.size

    def is_gold(r: int, g: int, b: int) -> bool:
        return r > 130 and g > 95 and b < 130 and r >= b

    def is_navy(r: int, g: int, b: int, a: int) -> bool:
        if a < 15 or is_gold(r, g, b):
            return False
        lum = (r + g + b) / 3
        if lum > 200:
            return False
        return b >= r and b >= g - 8 and lum < 165

    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            if not is_navy(r, g, b, a):
                continue
            lum = (r + g + b) / 3
            strength = min(0.88, 0.5 + (1 - lum / 165) * 0.35)
            px[x, y] = (
                int(r * (1 - strength) + target[0] * strength),
                int(g * (1 - strength) + target[1] * strength),
                int(b * (1 - strength) + target[2] * strength),
                a,
            )
    return im


def main() -> None:
    img = Image.open(SRC).convert("RGBA")
    w, h = img.size
    img = remove_background(img)

    # Icon = upper graphic only (exclude embedded JOPA / Real Estate text)
    icon = img.crop((160, 150, 870, 555))
    icon = remove_background(icon)
    bbox = icon.getbbox()
    if bbox:
        icon = icon.crop(bbox)

    icon = to_white(icon)
    icon.save(OUT_ICON, "PNG")
    print(f"Saved {OUT_ICON} size={icon.size}")

    # Full logo without white (for other uses)
    full = remove_background(Image.open(SRC).convert("RGBA"))
    full.save(OUT_FULL, "PNG")
    print(f"Updated {OUT_FULL}")


if __name__ == "__main__":
    main()
