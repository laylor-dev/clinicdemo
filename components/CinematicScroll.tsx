'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '@/i18n/LanguageContext';

const TOTAL_FRAMES = 240;
const PX_PER_FRAME = 22; // scroll distance per frame → total = 5280px

function frameSrc(i: number) {
  return `/frames/frame_${String(i).padStart(4, '0')}.jpg`;
}

/* Cover–fit: fills the canvas like CSS object-fit:cover */
function drawCover(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, img: HTMLImageElement) {
  if (!img.naturalWidth) return;
  const cw = canvas.width, ch = canvas.height;
  const iw = img.naturalWidth, ih = img.naturalHeight;
  const cA = cw / ch, iA = iw / ih;
  let sx = 0, sy = 0, sw = iw, sh = ih;
  if (iA > cA) { sw = ih * cA; sx = (iw - sw) / 2; }
  else          { sh = iw / cA; sy = (ih - sh) / 2; }
  ctx.drawImage(img, sx, sy, sw, sh, 0, 0, cw, ch);
}

/* ───────── text scenes ───────────────────────────────────────────
   Each scene lives in a frame range. Values are 0-1 within [start,end].
   in  = 0 → 0.25  entrance
   show = 0.25 → 0.75  held
   out = 0.75 → 1  exit
──────────────────────────────────────────────────────────────────── */
interface Scene {
  startFrame: number;
  endFrame:   number;
  align:      'left' | 'right' | 'center';
}

const SCENE_CONFIGS: Scene[] = [
  {
    startFrame: 10,
    endFrame:   95,
    align:      'left',
  },
  {
    startFrame: 100,
    endFrame:   175,
    align:      'right',
  },
  {
    startFrame: 180,
    endFrame:   232,
    align:      'center',
  },
];

/* Progress of a frame within a scene (0 → 1) */
function sceneProgress(frame: number, s: Scene): number {
  if (frame < s.startFrame || frame > s.endFrame) return -1;
  return (frame - s.startFrame) / (s.endFrame - s.startFrame);
}

/* ── component ──────────────────────────────────────────────────── */
export default function CinematicScroll() {
  const { t } = useLanguage();
  const sectionRef   = useRef<HTMLDivElement>(null);
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const images       = useRef<HTMLImageElement[]>([]);
  const currentFrame = useRef(0);
  const frameIdxRef  = useRef(0);

  const SCENES = SCENE_CONFIGS.map((config, index) => ({
    ...config,
    ...t.cinematicScroll.scenes[index]
  }));

  const [loadPct,  setLoadPct]  = useState(0);
  const [ready,    setReady]    = useState(false);
  const [sceneIdx, setSceneIdx] = useState<number>(-1);    // which scene is active
  const [progress, setProgress] = useState(0);             // 0-1 within active scene

  /* ── preload ── */
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;

    function resize() {
      canvas!.width  = window.innerWidth;
      canvas!.height = window.innerHeight;
      const img = images.current[frameIdxRef.current];
      if (img?.complete) drawCover(ctx, canvas!, img);
    }
    resize();
    window.addEventListener('resize', resize);

    // Prioritize first 40 frames so scroll can start, then load rest lazily
    const PRIORITY_FRAMES = 40;
    let loaded = 0;
    const imgs: HTMLImageElement[] = new Array(TOTAL_FRAMES);

    const loadFrame = (i: number) => {
      const img = new Image();
      img.decoding = 'async';
      img.src = frameSrc(i);
      img.onload = img.onerror = () => {
        loaded++;
        if (loaded <= PRIORITY_FRAMES) {
          setLoadPct(Math.round((loaded / PRIORITY_FRAMES) * 100));
        }
        if (loaded === PRIORITY_FRAMES) {
          setReady(true);
          drawCover(ctx, canvas!, imgs[0]);
          // After page is interactive, load the rest
          requestIdleCallback
            ? requestIdleCallback(() => loadRemainingFrames())
            : setTimeout(loadRemainingFrames, 500);
        }
      };
      imgs[i - 1] = img;
    };

    const loadRemainingFrames = () => {
      for (let i = PRIORITY_FRAMES + 1; i <= TOTAL_FRAMES; i++) {
        if (!imgs[i - 1]) loadFrame(i);
      }
    };

    // Defer frame preloading so Hero animation gets uncontested main thread
    const preloadTimer = setTimeout(() => {
      // Load priority frames first
      for (let i = 1; i <= PRIORITY_FRAMES; i++) loadFrame(i);
    }, 1500);
    images.current = imgs;

    /* ── ScrollTrigger ── */
    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.4,
      onUpdate(self) {
        const idx = Math.min(
          Math.floor(self.progress * (TOTAL_FRAMES - 1)),
          TOTAL_FRAMES - 1
        );
        frameIdxRef.current = idx;

        const img = images.current[idx];
        if (img?.complete) drawCover(ctx, canvas!, img);

        /* find which scene we are in */
        let activeScene = -1;
        let activeProg  = 0;
        for (let s = 0; s < SCENES.length; s++) {
          const p = sceneProgress(idx, SCENES[s]);
          if (p >= 0) { activeScene = s; activeProg = p; break; }
        }
        setSceneIdx(activeScene);
        setProgress(activeProg);
      },
    });

    return () => {
      clearTimeout(preloadTimer);
      window.removeEventListener('resize', resize);
      trigger.kill();
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      style={{ height: `${TOTAL_FRAMES * PX_PER_FRAME}px` }}
      // Negative margin pulls this section under the Hero (which is pinned and has z-20)
      className="relative -mt-[100vh] z-10"
    >
      {/* Sticky fullscreen canvas */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">
        <canvas ref={canvasRef} className="block w-full h-full" />

        {/* ── Loading overlay ── */}
        {!ready && (
          <div className="absolute inset-0 bg-[#14151d] flex flex-col items-center justify-center z-50">
            <div className="w-48 h-px bg-white/15 relative overflow-hidden">
              <div
                className="absolute inset-y-0 left-0 bg-white transition-all duration-200 ease-out"
                style={{ width: `${loadPct}%` }}
              />
            </div>
            <p className="mt-4 font-sans text-[10px] tracking-[0.3em] uppercase text-white/30">
              {loadPct}%
            </p>
          </div>
        )}

        {/* ── Scene text overlays ── */}
        {ready && SCENES.map((scene, i) => (
          <SceneOverlay
            key={i}
            scene={scene}
            active={sceneIdx === i}
            progress={sceneIdx === i ? progress : -1}
          />
        ))}

        {/* ── Top fade: blends in from Hero's dark bottom ── */}
        <div
          className="absolute top-0 left-0 right-0 z-10 pointer-events-none"
          style={{ height: '20vh', background: 'linear-gradient(to bottom, #14151d, transparent)' }}
        />

        {/* ── Bottom fade: dissolves into OurGoal's light section ── */}
        <div
          className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none"
          style={{ height: '20vh', background: 'linear-gradient(to bottom, transparent, #eae8e8)' }}
        />

        {/* ── Scroll hint ── */}
        {ready && sceneIdx === -1 && (
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20 pointer-events-none">
            <span className="font-sans text-[9px] tracking-[0.35em] uppercase text-white/40">{t.cinematicScroll.scroll}</span>
            <div className="w-px h-8 bg-white/25 animate-pulse" />
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Individual scene overlay ───────────────────────────────────── */
function SceneOverlay({
  scene,
  active,
  progress,
}: {
  scene: any;
  active: boolean;
  progress: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const linesRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!ref.current) return;

    const IN_END  = 0.28;
    const OUT_ST  = 0.72;

    if (!active || progress < 0) {
      /* hide instantly when not in range */
      gsap.set(ref.current, { opacity: 0 });
      return;
    }

    /* entrance */
    if (progress <= IN_END) {
      const t = progress / IN_END; // 0→1
      gsap.set(ref.current, { opacity: t });

      linesRef.current.forEach((el, i) => {
        if (!el) return;
        const delay = i * 0.08;
        const lt = Math.max(0, Math.min(1, (t - delay) / (1 - delay * linesRef.current.length)));
        const fromX = scene.align === 'right' ? 80 : scene.align === 'center' ? 0 : -80;
        const fromY = scene.align === 'center' ? 40 : 0;
        gsap.set(el, {
          x: fromX * (1 - lt),
          y: fromY * (1 - lt),
          opacity: lt,
        });
      });
    }

    /* hold */
    else if (progress < OUT_ST) {
      gsap.set(ref.current, { opacity: 1 });
      linesRef.current.forEach(el => el && gsap.set(el, { x: 0, y: 0, opacity: 1 }));
    }

    /* exit */
    else {
      const t = 1 - (progress - OUT_ST) / (1 - OUT_ST); // 1→0
      gsap.set(ref.current, { opacity: t });
      linesRef.current.forEach((el, i) => {
        if (!el) return;
        const toX = scene.align === 'right' ? -60 : scene.align === 'center' ? 0 : 60;
        const toY = scene.align === 'center' ? -30 : 0;
        gsap.set(el, {
          x: toX * (1 - t),
          y: toY * (1 - t),
          opacity: t,
        });
      });
    }
  }, [active, progress, scene.align]);

  const alignClass =
    scene.align === 'right'  ? 'items-end text-right'   :
    scene.align === 'center' ? 'items-center text-center' :
                               'items-start text-left';

  const posClass =
    scene.align === 'right'  ? 'right-16 lg:right-24' :
    scene.align === 'center' ? 'left-1/2 -translate-x-1/2' :
                               'left-16 lg:left-24';

  return (
    <div
      ref={ref}
      className={`absolute ${posClass} bottom-1/4 z-20 pointer-events-none flex flex-col ${alignClass} opacity-0`}
      style={{ maxWidth: '52vw' }}
    >
      {/* eyebrow */}
      <p className="font-sans text-[10px] tracking-[0.28em] uppercase text-white/50 mb-3">
        {scene.eyebrow}
      </p>

      {/* headline lines */}
      {scene.headline.map((line: string, i: number) => (
        <div
          key={i}
          ref={el => { if (el) linesRef.current[i] = el; }}
          className="overflow-visible"
        >
          <h2
            className="font-serif text-white leading-[0.9] tracking-tight"
            style={{ fontSize: 'clamp(2.8rem, 6.5vw, 7.5rem)' }}
          >
            {line}
          </h2>
        </div>
      ))}

      {/* sub */}
      {scene.sub && (
        <p className="font-sans text-sm text-white/55 mt-4 tracking-wide">
          {scene.sub}
        </p>
      )}
    </div>
  );
}
