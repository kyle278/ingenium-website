'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import Link from 'next/link';
import { ArrowRight, Menu, X } from 'lucide-react';

import { Dialog, DialogContent } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

interface NavigationItem {
  name: string;
  href: string;
}

interface AnnouncementBanner {
  text: string;
  linkText: string;
  linkHref: string;
}

interface CallToAction {
  text: string;
  href: string;
  variant: 'primary' | 'secondary';
}

interface HeroSphereDefinition {
  id: string;
  color: string;
  pulseDuration: number;
  size: string;
  blurClass: string;
  opacity: number;
  originX: number;
  originY: number;
  speedRange: [number, number];
}

interface HeroLandingProps {
  logo?: {
    src: string;
    alt: string;
    companyName: string;
  };
  navigation?: NavigationItem[];
  loginText?: string;
  loginHref?: string;
  title: string;
  description: string;
  announcementBanner?: AnnouncementBanner;
  callToActions?: CallToAction[];
  titleSize?: 'small' | 'medium' | 'large';
  gradientColors?: {
    from: string;
    to: string;
  };
  className?: string;
  showHeader?: boolean;
  surface?: 'card' | 'seamless';
}

const defaultProps: Partial<HeroLandingProps> = {
  logo: {
    src: '/logo-full.svg',
    alt: 'Ingenium Consulting logo',
    companyName: 'Ingenium Consulting',
  },
  navigation: [
    { name: 'Services', href: '/services' },
    { name: 'Platform', href: '/platform' },
    { name: 'Projects', href: '/projects' },
    { name: 'Implementation', href: '/implementation' },
    { name: 'Contact', href: '/contact' },
  ],
  loginText: 'See the Platform',
  loginHref: '/platform',
  titleSize: 'large',
  gradientColors: {
    from: 'rgba(23, 103, 195, 0.32)',
    to: 'rgba(19, 183, 168, 0.32)',
  },
  callToActions: [
    { text: 'Book a Demo', href: '/demo', variant: 'primary' },
    { text: 'See How It Works', href: '/platform', variant: 'secondary' },
  ],
  showHeader: true,
  surface: 'card',
};

const buildSphereStyle = (color: string): CSSProperties => ({
  backgroundImage: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.42) 0%, rgba(255,255,255,0.14) 16%, transparent 34%), radial-gradient(circle at center, ${color} 0%, ${color} 38%, transparent 74%)`,
});

const pickRandomBetween = (min: number, max: number) => min + Math.random() * (max - min);

const createSphereDefinitions = (gradientFrom: string, gradientTo: string): HeroSphereDefinition[] => [
  {
    id: 'blue',
    color: gradientFrom,
    pulseDuration: 18,
    size: 'clamp(18rem, 34vw, 34rem)',
    blurClass: 'blur-[72px]',
    opacity: 0.96,
    originX: 12,
    originY: 32,
    speedRange: [8, 12],
  },
  {
    id: 'teal',
    color: gradientTo,
    pulseDuration: 20,
    size: 'clamp(16rem, 30vw, 30rem)',
    blurClass: 'blur-[64px]',
    opacity: 0.9,
    originX: 28,
    originY: 76,
    speedRange: [7, 11],
  },
  {
    id: 'amber',
    color: 'rgba(245,166,35,0.24)',
    pulseDuration: 17,
    size: 'clamp(15rem, 28vw, 28rem)',
    blurClass: 'blur-[68px]',
    opacity: 0.84,
    originX: 59,
    originY: 30,
    speedRange: [6.5, 10],
  },
      {
        id: 'coral',
        color: 'rgba(129,140,248,0.18)',
        pulseDuration: 14,
        size: 'clamp(8rem, 15vw, 17rem)',
        blurClass: 'blur-[40px]',
    opacity: 0.78,
    originX: 76,
    originY: 60,
    speedRange: [10, 15],
  },
  {
    id: 'sky',
    color: 'rgba(125,211,252,0.18)',
    pulseDuration: 15,
    size: 'clamp(8rem, 15vw, 17rem)',
    blurClass: 'blur-[42px]',
    opacity: 0.74,
    originX: 42,
    originY: 18,
    speedRange: [9, 14],
  },
  {
    id: 'lime',
    color: 'rgba(163,230,53,0.16)',
    pulseDuration: 13,
    size: 'clamp(7rem, 13vw, 15rem)',
    blurClass: 'blur-[38px]',
    opacity: 0.72,
    originX: 82,
    originY: 20,
    speedRange: [10, 16],
  },
];

export function HeroLanding(props: HeroLandingProps) {
  const {
    logo,
    navigation,
    loginText,
    loginHref,
    title,
    description,
    announcementBanner,
    callToActions,
    titleSize,
    gradientColors,
    className,
    showHeader,
    surface,
  } = { ...defaultProps, ...props };

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);
  const sphereRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const gradientFrom = gradientColors?.from ?? 'rgba(23, 103, 195, 0.32)';
  const gradientTo = gradientColors?.to ?? 'rgba(19, 183, 168, 0.32)';
  const sphereDefinitions = createSphereDefinitions(gradientFrom, gradientTo);

  useEffect(() => {
    const section = sectionRef.current;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (!section || reduceMotion.matches) {
      return;
    }

    let frameId = 0;
    let resizeObserver: ResizeObserver | null = null;
    let sectionWidth = 0;
    let sectionHeight = 0;
    let lastTime = 0;

    type AnimatedSphere = {
      baseXPct: number;
      baseYPct: number;
      driftX: number;
      driftY: number;
      node: HTMLDivElement;
      radius: number;
      seedA: number;
      seedB: number;
      speed: number;
      vx: number;
      vy: number;
    };

    const animatedSphereDefinitions = createSphereDefinitions(gradientFrom, gradientTo);
    const animatedSpheres: AnimatedSphere[] = animatedSphereDefinitions
      .map((definition) => {
        const node = sphereRefs.current[definition.id];

        if (!node) {
          return null;
        }

        const speed = pickRandomBetween(definition.speedRange[0], definition.speedRange[1]);
        const angle = Math.random() * Math.PI * 2;

        return {
          baseXPct: definition.originX / 100,
          baseYPct: definition.originY / 100,
          driftX: pickRandomBetween(-18, 18),
          driftY: pickRandomBetween(-18, 18),
          node,
          radius: 0,
          seedA: pickRandomBetween(0.4, 1.4),
          seedB: pickRandomBetween(0.4, 1.4),
          speed,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
        };
      })
      .filter((sphere): sphere is AnimatedSphere => sphere !== null);

    const measureScene = () => {
      sectionWidth = section.clientWidth;
      sectionHeight = section.clientHeight;

      for (const sphere of animatedSpheres) {
        sphere.radius = sphere.node.offsetWidth / 2;
      }
    };

    const animatePoints = (now: number) => {
      const time = now / 1000;
      const deltaMs = lastTime === 0 ? 16 : Math.min(34, now - lastTime);
      const deltaSeconds = deltaMs / 1000;
      lastTime = now;

      for (const sphere of animatedSpheres) {
        sphere.vx += Math.sin(time * (0.11 + sphere.seedA * 0.03)) * 0.06;
        sphere.vy += Math.cos(time * (0.13 + sphere.seedB * 0.03)) * 0.06;
        sphere.driftX += sphere.vx * deltaSeconds;
        sphere.driftY += sphere.vy * deltaSeconds;
      }

      for (let index = 0; index < animatedSpheres.length; index += 1) {
        for (let otherIndex = index + 1; otherIndex < animatedSpheres.length; otherIndex += 1) {
          const sphere = animatedSpheres[index];
          const otherSphere = animatedSpheres[otherIndex];
          const sphereX = sectionWidth * sphere.baseXPct + sphere.driftX;
          const sphereY = sectionHeight * sphere.baseYPct + sphere.driftY;
          const otherSphereX = sectionWidth * otherSphere.baseXPct + otherSphere.driftX;
          const otherSphereY = sectionHeight * otherSphere.baseYPct + otherSphere.driftY;
          const deltaX = sphereX - otherSphereX;
          const deltaY = sphereY - otherSphereY;
          const distance = Math.hypot(deltaX, deltaY) || 1;
          const minDistance = (sphere.radius + otherSphere.radius) * 0.88;

          if (distance < minDistance) {
            const pushRatio = (minDistance - distance) / minDistance;
            const normalX = deltaX / distance;
            const normalY = deltaY / distance;
            const positionPush = pushRatio * 10;
            const velocityPush = pushRatio * 20;

            sphere.driftX += normalX * positionPush;
            sphere.driftY += normalY * positionPush;
            otherSphere.driftX -= normalX * positionPush;
            otherSphere.driftY -= normalY * positionPush;
            sphere.vx += normalX * velocityPush;
            sphere.vy += normalY * velocityPush;
            otherSphere.vx -= normalX * velocityPush;
            otherSphere.vy -= normalY * velocityPush;
          }
        }
      }

      const horizontalMargin = Math.max(28, sectionWidth * 0.04);
      const verticalMargin = Math.max(24, sectionHeight * 0.04);

      for (const sphere of animatedSpheres) {
        const baseX = sectionWidth * sphere.baseXPct;
        const baseY = sectionHeight * sphere.baseYPct;
        const centerX = baseX + sphere.driftX;
        const centerY = baseY + sphere.driftY;
        const minX = sphere.radius + horizontalMargin;
        const maxX = sectionWidth - sphere.radius - horizontalMargin;
        const minY = sphere.radius + verticalMargin;
        const maxY = sectionHeight - sphere.radius - verticalMargin;

        if (centerX < minX) {
          sphere.driftX = minX - baseX;
          sphere.vx = Math.abs(sphere.vx);
        } else if (centerX > maxX) {
          sphere.driftX = maxX - baseX;
          sphere.vx = -Math.abs(sphere.vx);
        }

        if (centerY < minY) {
          sphere.driftY = minY - baseY;
          sphere.vy = Math.abs(sphere.vy);
        } else if (centerY > maxY) {
          sphere.driftY = maxY - baseY;
          sphere.vy = -Math.abs(sphere.vy);
        }

        const currentSpeed = Math.hypot(sphere.vx, sphere.vy) || 1;
        const targetSpeed = sphere.speed;
        const normalizedVelocityX = sphere.vx / currentSpeed;
        const normalizedVelocityY = sphere.vy / currentSpeed;
        const easedSpeed = currentSpeed + (targetSpeed - currentSpeed) * 0.02;

        sphere.vx = normalizedVelocityX * easedSpeed;
        sphere.vy = normalizedVelocityY * easedSpeed;
        sphere.node.style.transform = `translate3d(${sphere.driftX.toFixed(1)}px, ${sphere.driftY.toFixed(1)}px, 0)`;
      }

      frameId = window.requestAnimationFrame(animatePoints);
    };

    measureScene();

    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => {
        measureScene();
      });

      resizeObserver.observe(section);
    } else {
      window.addEventListener('resize', measureScene);
    }

    frameId = window.requestAnimationFrame(animatePoints);

    return () => {
      window.cancelAnimationFrame(frameId);
      resizeObserver?.disconnect();
      window.removeEventListener('resize', measureScene);
    };
  }, [gradientFrom, gradientTo]);

  const getTitleSizeClasses = () => {
    switch (titleSize) {
      case 'small':
        return 'type-section-title';
      case 'medium':
        return 'type-page-title';
      case 'large':
      default:
        return 'type-hero-title';
    }
  };

  const renderCallToAction = (cta: CallToAction, index: number) => {
    if (cta.variant === 'primary') {
      return (
        <Link
          key={index}
          href={cta.href}
          className="cta-lift type-action inline-flex items-center justify-center rounded-[12px] bg-[linear-gradient(135deg,var(--color-brand),var(--color-brand-strong))] px-5 py-3 text-white shadow-[0_14px_28px_rgba(20,36,61,0.12)]"
        >
          {cta.text}
        </Link>
      );
    }

    return (
      <Link
        key={index}
        href={cta.href}
        className="type-action inline-flex items-center gap-2 text-[var(--color-text)] transition hover:text-[var(--color-brand)]"
      >
        {cta.text}
        <ArrowRight className="h-4 w-4" />
      </Link>
    );
  };

  const renderLogo = () => {
    if (!logo) {
      return null;
    }

    // Keep remote logo URLs compatible with the prompt's generic component API.
    // eslint-disable-next-line @next/next/no-img-element
    return <img alt={logo.alt} src={logo.src} className="h-9 w-auto" />;
  };

  return (
    <section
      ref={sectionRef}
      className={cn(
        'relative isolate px-6 pb-16 pt-8 sm:px-10 lg:px-12 lg:pb-20 lg:pt-10',
        surface === 'seamless' ? 'overflow-visible' : 'overflow-hidden',
        surface === 'card'
          ? 'rounded-[40px] border border-[var(--color-line)] bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(250,251,253,0.92))] shadow-[0_24px_80px_rgba(20,36,61,0.08)]'
          : 'bg-transparent',
        className
      )}
      >
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          {sphereDefinitions.map((sphere) => (
            <div
              key={sphere.id}
              className="absolute"
              style={{
                left: `${sphere.originX}%`,
                top: `${sphere.originY}%`,
              }}
            >
              <div
                ref={(node) => {
                  sphereRefs.current[sphere.id] = node;
                }}
                className="hero-point"
              >
                <div
                  style={{
                    ...buildSphereStyle(sphere.color),
                    animationDuration: `${sphere.pulseDuration}s`,
                    height: sphere.size,
                    opacity: sphere.opacity,
                    width: sphere.size,
                  }}
                  className={cn(
                    'hero-sphere relative -translate-x-1/2 -translate-y-1/2',
                    sphere.blurClass
                  )}
                />
              </div>
            </div>
          ))}
        </div>

      {showHeader ? (
        <header className="relative z-10">
          <nav aria-label="Global" className="flex items-center justify-between gap-6">
            <div className="flex flex-1">
              <Link href="/" className="-m-1.5 p-1.5">
                <span className="sr-only">{logo?.companyName}</span>
                {renderLogo()}
              </Link>
            </div>
            <div className="flex lg:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="-m-2.5 inline-flex items-center justify-center rounded-full p-2.5 text-[var(--color-text-muted)] transition hover:bg-white/80 hover:text-[var(--color-text)]"
              >
                <span className="sr-only">Open main menu</span>
                <Menu aria-hidden="true" className="size-6" />
              </button>
            </div>
            {navigation && navigation.length > 0 ? (
              <div className="hidden lg:flex lg:gap-x-8">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="type-action text-[var(--color-text-soft)] transition hover:text-[var(--color-text)]"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            ) : null}
            {loginText && loginHref ? (
              <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                <Link
                  href={loginHref}
                  className="type-action text-[var(--color-text)] transition hover:text-[var(--color-brand)]"
                >
                  {loginText}
                </Link>
              </div>
            ) : null}
          </nav>

          <Dialog open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <DialogContent
              showClose={false}
              className="fixed inset-y-3 right-3 left-3 top-auto z-50 flex w-auto max-w-sm translate-x-0 translate-y-0 flex-col rounded-[28px] border border-[var(--color-line)] bg-[rgba(255,255,255,0.98)] p-5 shadow-[0_24px_60px_rgba(20,36,61,0.18)] lg:hidden"
            >
              <div className="flex items-center justify-between">
                <Link href="/" className="-m-1.5 p-1.5">
                  <span className="sr-only">{logo?.companyName}</span>
                  {renderLogo()}
                </Link>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="-m-2.5 rounded-full p-2.5 text-[var(--color-text-muted)] transition hover:bg-[var(--color-panel-low)] hover:text-[var(--color-text)]"
                >
                  <span className="sr-only">Close menu</span>
                  <X aria-hidden="true" className="size-6" />
                </button>
              </div>
              <div className="mt-4 grid gap-2">
                {navigation?.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="type-action rounded-2xl px-4 py-3 text-[var(--color-text)] transition hover:bg-[var(--color-panel-low)]"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              {loginText && loginHref ? (
                <Link
                  href={loginHref}
                  onClick={() => setMobileMenuOpen(false)}
                  className="type-action mt-4 inline-flex justify-center rounded-[12px] border border-[var(--color-line)] bg-white px-4 py-3 text-[var(--color-text)]"
                >
                  {loginText}
                </Link>
              ) : null}
            </DialogContent>
          </Dialog>
        </header>
      ) : null}

      <div
        className={cn(
          'relative z-10 mx-auto max-w-4xl text-center',
          showHeader ? 'pt-16 sm:pt-20' : surface === 'seamless' ? 'py-14 sm:py-20' : 'py-8 sm:py-14'
        )}
      >
        {announcementBanner ? (
            <div className="mb-6 flex justify-center sm:mb-8">
            <div className="relative rounded-full border border-[rgba(23,103,195,0.14)] bg-white/88 px-4 py-2 type-body-sm text-[var(--color-text-soft)] shadow-[0_12px_24px_rgba(20,36,61,0.06)]">
              {announcementBanner.text}{' '}
              <Link
                href={announcementBanner.linkHref}
                className="type-action text-[var(--color-brand)] transition hover:text-[var(--color-brand-strong)]"
              >
                <span aria-hidden="true" className="absolute inset-0" />
                {announcementBanner.linkText} <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>
        ) : null}

        <h1 className={cn(getTitleSizeClasses(), 'text-balance text-[var(--color-text)]')}>
          {title}
        </h1>
        <p className="mx-auto mt-6 max-w-[60ch] type-body-lead text-[var(--color-text-soft)]">
          {description}
        </p>

        {callToActions && callToActions.length > 0 ? (
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-5 gap-y-4">
            {callToActions.map((cta, index) => renderCallToAction(cta, index))}
          </div>
        ) : null}

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3 text-left">
          <div className="rounded-full border border-[var(--color-line)] bg-white/84 px-4 py-2 type-body-sm text-[var(--color-text-soft)] shadow-[0_10px_22px_rgba(20,36,61,0.05)]">
            Website + CRM + AI in one system
          </div>
          <div className="rounded-full border border-[var(--color-line)] bg-white/84 px-4 py-2 type-body-sm text-[var(--color-text-soft)] shadow-[0_10px_22px_rgba(20,36,61,0.05)]">
            Ready in weeks, not months
          </div>
          <div className="rounded-full border border-[var(--color-line)] bg-white/84 px-4 py-2 type-body-sm text-[var(--color-text-soft)] shadow-[0_10px_22px_rgba(20,36,61,0.05)]">
            Built for startups and SMEs
          </div>
        </div>
      </div>
    </section>
  );
}

export type { HeroLandingProps, NavigationItem, AnnouncementBanner, CallToAction };
