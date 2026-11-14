"use client";

import { useEffect, useRef } from "react";

const glyphs = ["0", "1", ">", "_", "·", "/", "+", "="];

type FieldGlyph = {
  character: string;
  x: number;
  y: number;
  phase: number;
  opacity: number;
  accent: boolean;
};

function createGlyphs(width: number, height: number) {
  const glyphsInField: FieldGlyph[] = [];
  const columns = Math.ceil(width / 21);
  const rows = Math.ceil(height / 18);

  for (let column = 0; column < columns; column += 1) {
    const x = column * 21 + 8;
    const density = x / width < 0.68 ? 0.72 : 0.2;

    for (let row = 0; row < rows; row += 1) {
      const seed = (column * 17 + row * 31) % 100;
      if (seed / 100 > density) continue;

      glyphsInField.push({
        character: glyphs[(column * 3 + row) % glyphs.length],
        x,
        y: row * 18 + 12 + ((column * 7) % 5),
        phase: (column * 0.37 + row * 0.19) % (Math.PI * 2),
        opacity: 0.1 + (seed % 5) * 0.025,
        accent: seed > 91,
      });
    }
  }

  return glyphsInField;
}

export function HeroDigitalField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.matchMedia("(max-width: 767px)").matches || navigator.maxTouchPoints > 0;
    const pointer = { x: 0, y: 0, active: false };
    let glyphsInField: FieldGlyph[] = [];
    let nearbyGlyphs: FieldGlyph[] = [];
    let width = 0;
    let height = 0;
    let pixelRatio = 1;
    let patternCanvas: HTMLCanvasElement | null = null;
    let frameId: number | null = null;
    let isVisible = true;
    let pointerDirty = false;
    let lastPointerSample = 0;
    let lastFrame = 0;

    const drawPattern = () => {
      if (!patternCanvas) return;
      const patternContext = patternCanvas.getContext("2d");
      if (!patternContext) return;

      patternContext.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      patternContext.clearRect(0, 0, width, height);
      patternContext.font = "10px JetBrains Mono, monospace";
      patternContext.textBaseline = "middle";

      glyphsInField.forEach((glyph) => {
        patternContext.fillStyle = glyph.accent
          ? `rgba(234, 88, 12, ${glyph.opacity})`
          : `rgba(46, 194, 162, ${glyph.opacity})`;
        patternContext.fillText(glyph.character, glyph.x, glyph.y);
      });
    };

    const updateNearbyGlyphs = () => {
      nearbyGlyphs = glyphsInField.filter((glyph) => (
        Math.abs(glyph.x - pointer.x) < 110 && Math.abs(glyph.y - pointer.y) < 110
      ));
      pointerDirty = false;
    };

    const draw = (timestamp: number) => {
      if (!width || !height || !isVisible) return;
      frameId = null;
      if (isMobile && timestamp - lastFrame < 50) {
        frameId = window.requestAnimationFrame(draw);
        return;
      }

      lastFrame = timestamp;
      if (pointerDirty && timestamp - lastPointerSample >= 32) {
        lastPointerSample = timestamp;
        if (pointer.active) updateNearbyGlyphs();
        else nearbyGlyphs = [];
      }

      context.clearRect(0, 0, width, height);
      const driftX = reducedMotion ? 0 : Math.sin(timestamp * 0.00018) * 3;
      const driftY = reducedMotion ? 0 : Math.cos(timestamp * 0.00015) * 2;
      if (patternCanvas) context.drawImage(patternCanvas, driftX, driftY, width, height);

      if (pointer.active) {
        nearbyGlyphs.forEach((glyph) => {
          const distance = Math.hypot(glyph.x - pointer.x, glyph.y - pointer.y);
          const influence = Math.max(0, 1 - distance / 90);
          if (!influence) return;

          const flow = Math.sin(timestamp * 0.00045 + glyph.phase);
          const x = glyph.x + driftX + influence * Math.sign(pointer.x - glyph.x) * 3;
          const y = glyph.y + driftY + flow * 2 + influence * Math.sin(glyph.phase) * 4;
          const color = glyph.accent ? "234, 88, 12" : "46, 194, 162";
          context.fillStyle = `rgba(${color}, ${Math.min(0.72, glyph.opacity + influence * 0.38)})`;
          context.fillText(glyph.character, x, y);
        });
      }

      for (let index = 0; index < (isMobile ? 8 : 10); index += 1) {
        const phase = index * 1.7;
        const x = ((index * 113 + 40) % Math.max(width, 1)) + Math.sin(timestamp * 0.00018 + phase) * 14;
        const y = ((index * 67 + 28) % Math.max(height, 1)) + Math.cos(timestamp * 0.00023 + phase) * 10;
        context.fillStyle = `rgba(46, 194, 162, ${0.08 + (Math.sin(timestamp * 0.001 + phase) + 1) * 0.04})`;
        context.fillRect(x, y, 1.5, 1.5);
      }

      if (!reducedMotion) frameId = window.requestAnimationFrame(draw);
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      glyphsInField = createGlyphs(width, height);
      patternCanvas = document.createElement("canvas");
      patternCanvas.width = canvas.width;
      patternCanvas.height = canvas.height;
      drawPattern();
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      const rect = canvas.getBoundingClientRect();
      pointer.active = event.clientX >= rect.left
        && event.clientX <= rect.right
        && event.clientY >= rect.top
        && event.clientY <= rect.bottom;
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
      pointerDirty = true;
    };

    const scheduleFrame = () => {
      if (frameId === null && isVisible && !reducedMotion) frameId = window.requestAnimationFrame(draw);
    };

    const handleVisibilityChange = () => {
      isVisible = document.visibilityState === "visible";
      if (!isVisible && frameId !== null) {
        window.cancelAnimationFrame(frameId);
        frameId = null;
      } else {
        scheduleFrame();
      }
    };

    const observer = new ResizeObserver(resize);
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting && document.visibilityState === "visible";
      if (!isVisible && frameId !== null) {
        window.cancelAnimationFrame(frameId);
        frameId = null;
      } else {
        scheduleFrame();
      }
    });

    observer.observe(canvas);
    visibilityObserver.observe(canvas);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    resize();
    if (!reducedMotion) scheduleFrame();
    else draw(0);

    return () => {
      observer.disconnect();
      visibilityObserver.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("pointermove", handlePointerMove);
      if (frameId !== null) window.cancelAnimationFrame(frameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="hero-digital-field" aria-hidden="true" />;
}
