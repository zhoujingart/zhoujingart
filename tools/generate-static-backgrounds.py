#!/usr/bin/env python3
from pathlib import Path

from PIL import Image, ImageDraw


ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "images" / "ui"


def blend_pixel(base, overlay, alpha):
    return tuple(int(base[i] * (1 - alpha) + overlay[i] * alpha) for i in range(3))


def save_rgb(name, size, painter):
    image = Image.new("RGB", size, (248, 246, 239))
    painter(image)
    path = OUT / name
    image.save(path, optimize=True)


def save_rgba(name, size, painter):
    image = Image.new("RGBA", size, (255, 255, 255, 0))
    painter(image)
    path = OUT / name
    image.save(path, optimize=True)


def paint_root_page(image):
    width, height = image.size
    px = image.load()
    base = (248, 247, 243)
    warm = (201, 169, 110)
    earth = (139, 115, 85)

    for y in range(height):
        for x in range(width):
            color = base
            left = max(0, 1 - (((x - width * 0.1) / 1000) ** 2 + ((y - 0) / 600) ** 2))
            right = max(0, 1 - (((x - width * 0.9) / 800) ** 2 + ((y - height * 0.2) / 500) ** 2))
            if left:
                color = blend_pixel(color, warm, left * 0.08)
            if right:
                color = blend_pixel(color, earth, right * 0.06)
            if ((x + y) % 10) < 2:
                color = blend_pixel(color, (0, 0, 0), 0.018)
            px[x, y] = color


def paint_root_header(image):
    width, height = image.size
    px = image.load()
    for y in range(height):
        t = y / max(1, height - 1)
        for x in range(width):
            color = blend_pixel((255, 255, 255), (248, 246, 239), 0.12 + t * 0.08)
            px[x, y] = color


def paint_root_hero_overlay(image):
    width, height = image.size
    px = image.load()
    cool_dark = (26, 26, 26)
    black = (0, 0, 0)

    for y in range(height):
        y_t = y / max(1, height - 1)
        for x in range(width):
            x_t = x / max(1, width - 1)
            t = (x_t + y_t) * 0.5
            color = blend_pixel(cool_dark, black, t)
            alpha = 0.7 - t * 0.1
            px[x, y] = (*color, int(alpha * 255))


def paint_root_home_gallery(image):
    width, height = image.size
    px = image.load()
    top = (250, 250, 250)
    bottom = (245, 245, 245)
    cool = (44, 62, 80)

    for y in range(height):
        y_t = y / max(1, height - 1)
        top_shade = max(0, 1 - y / 200)
        for x in range(width):
            x_t = x / max(1, width - 1)
            color = blend_pixel(top, bottom, (x_t + y_t) * 0.5)
            color = blend_pixel(color, cool, top_shade * 0.03)
            px[x, y] = color


def paint_v2_paper(image):
    width, height = image.size
    px = image.load()
    base = (248, 246, 239)
    sage = (238, 242, 234)
    clay = (166, 111, 87)
    blue = (111, 135, 146)

    for y in range(height):
        vertical = max(0, 1 - y / 420)
        for x in range(width):
            color = base
            if x % 96 == 0:
                color = blend_pixel(color, (73, 77, 66), 0.035)
            color = blend_pixel(color, sage, vertical * 0.74)
            color = blend_pixel(color, clay, (1 - x / width) * 0.06)
            color = blend_pixel(color, blue, (x / width) * 0.06)
            px[x, y] = color


def paint_v2_header(image):
    width, height = image.size
    px = image.load()
    sage = (238, 242, 234)
    paper = (255, 253, 248)
    for y in range(height):
        for x in range(width):
            t = x / max(1, width - 1)
            color = blend_pixel(sage, paper, t)
            if y % 34 == 0:
                color = blend_pixel(color, (73, 77, 66), 0.035)
            px[x, y] = color


def paint_v2_works(image):
    width, height = image.size
    px = image.load()
    paper = (255, 253, 248)
    sage = (238, 242, 234)
    for y in range(height):
        for x in range(width):
            t = x / max(1, width - 1)
            color = blend_pixel(paper, sage, 0.58 + t * 0.28)
            px[x, y] = color


def paint_v2_hero_veil(image):
    width, height = image.size
    px = image.load()
    paper = (248, 246, 239)
    for y in range(height):
        y_t = y / max(1, height - 1)
        for x in range(width):
            x_t = x / max(1, width - 1)
            left_alpha = 0.9 - min(1, x_t / 0.42) * 0.18 if x_t <= 0.42 else 0.72 - (x_t - 0.42) / 0.58 * 0.54
            vertical_alpha = 0.58 - y_t * 0.46
            alpha = max(0.08, min(0.92, left_alpha + vertical_alpha * 0.24))
            px[x, y] = (*paper, int(alpha * 255))


def paint_v2_ex_veil(image):
    width, height = image.size
    px = image.load()
    paper = (248, 246, 239)
    for y in range(height):
        y_t = y / max(1, height - 1)
        for x in range(width):
            x_t = x / max(1, width - 1)
            left_alpha = 0.9 - min(1, x_t / 0.48) * 0.32 if x_t <= 0.48 else 0.58 - (x_t - 0.48) / 0.52 * 0.44
            vertical_alpha = 0.78 - y_t * 0.72
            alpha = max(0.06, min(0.92, left_alpha + vertical_alpha * 0.18))
            px[x, y] = (*paper, int(alpha * 255))


def paint_v2_mobile_veil(image):
    width, height = image.size
    px = image.load()
    paper = (248, 246, 239)
    for y in range(height):
        y_t = y / max(1, height - 1)
        for x in range(width):
            x_t = x / max(1, width - 1)
            alpha = 0.9 - y_t * 0.48
            alpha = max(alpha, 0.84 - x_t * 0.54)
            px[x, y] = (*paper, int(max(0.28, min(0.94, alpha)) * 255))


def paint_modal_vignette(image):
    width, height = image.size
    px = image.load()
    center_x = width * 0.5
    center_y = height * 0.48
    max_distance = ((width * 0.5) ** 2 + (height * 0.52) ** 2) ** 0.5

    for y in range(height):
        for x in range(width):
            distance = (((x - center_x) ** 2 + (y - center_y) ** 2) ** 0.5) / max_distance
            alpha = max(0, min(0.36, (distance - 0.46) * 0.78))
            px[x, y] = (0, 0, 0, int(alpha * 255))


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    save_rgb("root-page-wash.png", (720, 450), paint_root_page)
    save_rgb("root-header-wash.png", (720, 120), paint_root_header)
    save_rgba("root-hero-overlay.png", (720, 520), paint_root_hero_overlay)
    save_rgb("root-home-gallery-wash.png", (720, 450), paint_root_home_gallery)
    save_rgb("v2-paper-wash.png", (720, 450), paint_v2_paper)
    save_rgb("v2-page-header-wash.png", (720, 180), paint_v2_header)
    save_rgb("v2-works-wash.png", (720, 320), paint_v2_works)
    save_rgba("v2-hero-veil.png", (720, 450), paint_v2_hero_veil)
    save_rgba("v2-ex-hero-veil.png", (720, 450), paint_v2_ex_veil)
    save_rgba("v2-mobile-hero-veil.png", (480, 480), paint_v2_mobile_veil)
    save_rgba("modal-vignette.png", (720, 520), paint_modal_vignette)


if __name__ == "__main__":
    main()
