#!/usr/bin/env python3
"""Generate lightweight display images for the static site."""

from pathlib import Path
from shutil import copy2

from PIL import Image, ImageOps


ROOT = Path(__file__).resolve().parents[1]
IMAGES_DIR = ROOT / "images"
OUTPUT_DIR = IMAGES_DIR / "optimized"
IMAGE_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp"}


Image.MAX_IMAGE_PIXELS = None


def iter_images(*paths):
    for path in paths:
        source = ROOT / path
        if source.is_file() and source.suffix.lower() in IMAGE_EXTENSIONS:
            yield source
            continue

        if source.is_dir():
            for image_path in source.rglob("*"):
                if image_path.is_file() and image_path.suffix.lower() in IMAGE_EXTENSIONS:
                    yield image_path


def output_path(source, profile):
    return OUTPUT_DIR / profile / source.relative_to(IMAGES_DIR)


def save_image(image, destination):
    destination.parent.mkdir(parents=True, exist_ok=True)
    suffix = destination.suffix.lower()

    if suffix in {".jpg", ".jpeg"}:
        if image.mode not in {"RGB", "L"}:
            image = image.convert("RGB")
        image.save(destination, quality=82, optimize=True, progressive=True)
    elif suffix == ".webp":
        image.save(destination, quality=82, method=6)
    elif suffix == ".png":
        image.save(destination, optimize=True, compress_level=9)
    else:
        image.save(destination)


def open_image(source):
    with Image.open(source) as image:
        return ImageOps.exif_transpose(image).copy()


def resize_max(source, profile, max_side):
    destination = output_path(source, profile)
    with open_image(source) as image:
        if max(image.size) <= max_side:
            destination.parent.mkdir(parents=True, exist_ok=True)
            copy2(source, destination)
            return

        image.thumbnail((max_side, max_side), Image.Resampling.LANCZOS)
        save_image(image, destination)


def resize_press_preview(source):
    destination = output_path(source, "press-preview")
    with open_image(source) as image:
        width, height = image.size
        if width > 1200:
            next_height = round(height * (1200 / width))
            image = image.resize((1200, next_height), Image.Resampling.LANCZOS)
            save_image(image, destination)
            return

        destination.parent.mkdir(parents=True, exist_ok=True)
        copy2(source, destination)


def crop_press_thumb(source):
    target_width = 420
    target_height = 300
    destination = output_path(source, "press-thumb")

    with open_image(source) as image:
        width, height = image.size
        scale = max(target_width / width, target_height / height)
        next_width = max(target_width, round(width * scale))
        next_height = max(target_height, round(height * scale))

        image = image.resize((next_width, next_height), Image.Resampling.LANCZOS)
        left = max(0, (next_width - target_width) // 2)
        image = image.crop((left, 0, left + target_width, target_height))
        save_image(image, destination)


def main():
    display_sources = list(iter_images("images/paintings", "images/exhibitions", "images/studio"))
    single_sources = list(iter_images("images/Jing-Zhou-portrait.jpg"))
    press_sources = list(iter_images("images/pressSnapshot"))

    for source in display_sources + single_sources:
        resize_max(source, "card", 1200)

    for source in press_sources:
        crop_press_thumb(source)
        resize_press_preview(source)

    total = len(display_sources) + len(single_sources) + len(press_sources)
    print(f"Generated optimized images for {total} source files.")


if __name__ == "__main__":
    main()
