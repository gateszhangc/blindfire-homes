const palette = {
  ink: "#f5f5f5",
  dark: "#070708",
  panel: "#0d0d10",
  blue: "#3b82f6",
  cyan: "#06f",
  violet: "#a855f7",
  orange: "#f97316",
  green: "#22c55e",
  gray: "#6b7280",
  red: "#ef4444",
  neon: "#0ff",
  pink: "#ec4899",
};

function scaleCanvas(canvas, logicalWidth, logicalHeight) {
  const ratio = window.devicePixelRatio || 1;
  const w = Math.round(logicalWidth * ratio);
  const h = Math.round(logicalHeight * ratio);
  if (canvas.width !== w || canvas.height !== h) {
    canvas.width = w;
    canvas.height = h;
  }
  const ctx = canvas.getContext("2d");
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  return ctx;
}

function drawIcon(ctx, x, y, size, type) {
  const unit = size / 72;
  ctx.save();
  ctx.translate(x, y);

  const r = 16 * unit;

  // Glow behind
  ctx.shadowColor = palette.cyan;
  ctx.shadowBlur = 20 * unit;

  ctx.beginPath();
  ctx.moveTo(r, 0);
  ctx.lineTo(72 * unit - r, 0);
  ctx.quadraticCurveTo(72 * unit, 0, 72 * unit, r);
  ctx.lineTo(72 * unit, 72 * unit - r);
  ctx.quadraticCurveTo(72 * unit, 72 * unit, 72 * unit - r, 72 * unit);
  ctx.lineTo(r, 72 * unit);
  ctx.quadraticCurveTo(0, 72 * unit, 0, 72 * unit - r);
  ctx.lineTo(0, r);
  ctx.quadraticCurveTo(0, 0, r, 0);
  ctx.closePath();
  ctx.fillStyle = palette.dark;
  ctx.fill();

  ctx.shadowBlur = 0;

  // Gradient border
  const gradient = ctx.createLinearGradient(0, 0, 72 * unit, 72 * unit);
  gradient.addColorStop(0, palette.blue);
  gradient.addColorStop(0.5, palette.cyan);
  gradient.addColorStop(1, palette.violet);
  ctx.strokeStyle = gradient;
  ctx.lineWidth = 2 * unit;
  ctx.stroke();

  // Crosshair icon: circle with crosshairs
  if (type === "brand") {
    // Outer ring
    ctx.beginPath();
    ctx.arc(36 * unit, 36 * unit, 18 * unit, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(0, 255, 255, 0.4)`;
    ctx.lineWidth = 1.5 * unit;
    ctx.stroke();

    // Crosshair lines
    ctx.beginPath();
    ctx.moveTo(36 * unit, 10 * unit);
    ctx.lineTo(36 * unit, 26 * unit);
    ctx.moveTo(36 * unit, 46 * unit);
    ctx.lineTo(36 * unit, 62 * unit);
    ctx.moveTo(10 * unit, 36 * unit);
    ctx.lineTo(26 * unit, 36 * unit);
    ctx.moveTo(46 * unit, 36 * unit);
    ctx.lineTo(62 * unit, 36 * unit);
    ctx.strokeStyle = palette.cyan;
    ctx.lineWidth = 1.5 * unit;
    ctx.stroke();

    // Center dot
    ctx.beginPath();
    ctx.arc(36 * unit, 36 * unit, 3 * unit, 0, Math.PI * 2);
    ctx.fillStyle = palette.neon;
    ctx.fill();

    // "B" letter in center
    ctx.font = `bold ${22 * unit}px system-ui, sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = palette.ink;
    ctx.fillText("B", 36 * unit, 36 * unit + 1 * unit);
  } else {
    // Hero: larger crosshair with muzzle flash effect
    // Outer ring
    ctx.beginPath();
    ctx.arc(36 * unit, 36 * unit, 22 * unit, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(0, 255, 255, 0.35)`;
    ctx.lineWidth = 2 * unit;
    ctx.stroke();

    // Crosshair lines
    ctx.beginPath();
    ctx.moveTo(36 * unit, 6 * unit);
    ctx.lineTo(36 * unit, 24 * unit);
    ctx.moveTo(36 * unit, 48 * unit);
    ctx.lineTo(36 * unit, 66 * unit);
    ctx.moveTo(6 * unit, 36 * unit);
    ctx.lineTo(24 * unit, 36 * unit);
    ctx.moveTo(48 * unit, 36 * unit);
    ctx.lineTo(66 * unit, 36 * unit);
    ctx.strokeStyle = palette.neon;
    ctx.lineWidth = 2 * unit;
    ctx.stroke();

    // Muzzle flash lines (diagonal)
    const flashColors = [palette.red, palette.orange, palette.pink];
    for (let i = 0; i < 3; i++) {
      const angle = (Math.PI / 4) + (i * Math.PI / 6);
      const x1 = 36 * unit + Math.cos(angle) * 26 * unit;
      const y1 = 36 * unit + Math.sin(angle) * 26 * unit;
      const x2 = 36 * unit + Math.cos(angle) * 34 * unit;
      const y2 = 36 * unit + Math.sin(angle) * 34 * unit;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.strokeStyle = flashColors[i];
      ctx.lineWidth = 2 * unit;
      ctx.stroke();
    }

    // Center dot
    ctx.beginPath();
    ctx.arc(36 * unit, 36 * unit, 4 * unit, 0, Math.PI * 2);
    ctx.fillStyle = palette.neon;
    ctx.fill();

    // "B" letter
    ctx.font = `bold ${28 * unit}px system-ui, sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = palette.ink;
    ctx.fillText("B", 36 * unit, 36 * unit + 1 * unit);
  }

  ctx.restore();
}

function drawBrandLogo() {
  const canvas = document.getElementById("brand-canvas");
  if (!canvas) return;
  const ctx = scaleCanvas(canvas, 22, 22);
  ctx.clearRect(0, 0, 22, 22);
  drawIcon(ctx, 0, 0, 22, "brand");
}

function drawBrandLogoFooter() {
  const canvas = document.getElementById("brand-canvas-footer");
  if (!canvas) return;
  const ctx = scaleCanvas(canvas, 20, 20);
  ctx.clearRect(0, 0, 20, 20);
  drawIcon(ctx, 0, 0, 20, "brand");
}

function drawHeroLogo() {
  const canvas = document.getElementById("hero-canvas");
  if (!canvas) return;
  const ctx = scaleCanvas(canvas, 96, 96);
  ctx.clearRect(0, 0, 96, 96);
  drawIcon(ctx, 0, 0, 96, "hero");
}

function installCanvasFavicon() {
  const canvas = document.createElement("canvas");
  canvas.width = 72;
  canvas.height = 72;
  const ctx = canvas.getContext("2d");
  drawIcon(ctx, 0, 0, 72, "brand");

  const link = document.querySelector("link[rel='icon']") || document.createElement("link");
  link.rel = "icon";
  link.type = "image/png";
  link.href = canvas.toDataURL("image/png");
  document.head.appendChild(link);
}

function drawAll() {
  drawBrandLogo();
  drawBrandLogoFooter();
  drawHeroLogo();
}

function initCanvas() {
  drawAll();
  installCanvasFavicon();
}

function safeInit() {
  const brandCanvas = document.getElementById("brand-canvas");
  if (brandCanvas && brandCanvas.getContext) {
    initCanvas();
  } else {
    requestAnimationFrame(safeInit);
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", safeInit);
} else {
  safeInit();
}
