'use client';

import { useState } from 'react';
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
    { name: 'Proof', href: '/case-studies' },
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

  const getTitleSizeClasses = () => {
    switch (titleSize) {
      case 'small':
        return 'text-3xl sm:text-4xl lg:text-6xl';
      case 'medium':
        return 'text-4xl sm:text-5xl lg:text-[4.4rem]';
      case 'large':
      default:
        return 'text-5xl sm:text-6xl lg:text-[5rem]';
    }
  };

  const renderCallToAction = (cta: CallToAction, index: number) => {
    if (cta.variant === 'primary') {
      return (
        <Link
          key={index}
          href={cta.href}
          className="cta-lift inline-flex items-center justify-center rounded-[12px] bg-[linear-gradient(135deg,var(--color-brand),var(--color-brand-strong))] px-5 py-3 text-sm font-semibold text-white shadow-[0_14px_28px_rgba(20,36,61,0.12)]"
        >
          {cta.text}
        </Link>
      );
    }

    return (
      <Link
        key={index}
        href={cta.href}
        className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-text)] transition hover:text-[var(--color-brand)]"
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
      className={cn(
        'relative isolate overflow-hidden px-6 pb-16 pt-8 sm:px-10 lg:px-12 lg:pb-20 lg:pt-10',
        surface === 'card'
          ? 'rounded-[40px] border border-[var(--color-line)] bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(250,251,253,0.92))] shadow-[0_24px_80px_rgba(20,36,61,0.08)]'
          : 'bg-transparent',
        className
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-28 -z-10 overflow-hidden blur-3xl"
      >
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            background: `linear-gradient(to top right, ${gradientColors?.from}, ${gradientColors?.to})`,
          }}
          className="relative left-[calc(50%-10rem)] aspect-[1155/678] w-[30rem] max-w-none -translate-x-1/2 rotate-[24deg] opacity-80 sm:left-[calc(50%-20rem)] sm:w-[54rem]"
        />
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-[-14rem] -z-10 overflow-hidden blur-3xl"
      >
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            background: `linear-gradient(to top right, ${gradientColors?.to}, ${gradientColors?.from})`,
          }}
          className="relative left-[calc(50%+8rem)] aspect-[1155/678] w-[32rem] max-w-none -translate-x-1/2 opacity-70 sm:left-[calc(50%+24rem)] sm:w-[56rem]"
        />
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-[12%] -z-10 overflow-hidden blur-3xl"
      >
        <div className="relative left-1/2 h-[18rem] w-[18rem] -translate-x-1/2 rounded-full bg-[rgba(245,166,35,0.24)] opacity-90 sm:h-[24rem] sm:w-[24rem]" />
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
                    className="text-sm font-semibold text-[var(--color-text-soft)] transition hover:text-[var(--color-text)]"
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
                  className="text-sm font-semibold text-[var(--color-text)] transition hover:text-[var(--color-brand)]"
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
                    className="rounded-2xl px-4 py-3 text-base font-semibold text-[var(--color-text)] transition hover:bg-[var(--color-panel-low)]"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              {loginText && loginHref ? (
                <Link
                  href={loginHref}
                  onClick={() => setMobileMenuOpen(false)}
                  className="mt-4 inline-flex justify-center rounded-[12px] border border-[var(--color-line)] bg-white px-4 py-3 text-sm font-semibold text-[var(--color-text)]"
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
            <div className="relative rounded-full border border-[rgba(23,103,195,0.14)] bg-white/88 px-4 py-2 text-xs text-[var(--color-text-soft)] shadow-[0_12px_24px_rgba(20,36,61,0.06)] sm:text-sm">
              {announcementBanner.text}{' '}
              <Link
                href={announcementBanner.linkHref}
                className="font-semibold text-[var(--color-brand)] transition hover:text-[var(--color-brand-strong)]"
              >
                <span aria-hidden="true" className="absolute inset-0" />
                {announcementBanner.linkText} <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>
        ) : null}

        <h1 className={cn(getTitleSizeClasses(), 'font-[var(--font-display)] font-semibold tracking-[-0.065em] text-balance text-[var(--color-text)]')}>
          {title}
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[var(--color-text-soft)] sm:text-xl">
          {description}
        </p>

        {callToActions && callToActions.length > 0 ? (
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-5 gap-y-4">
            {callToActions.map((cta, index) => renderCallToAction(cta, index))}
          </div>
        ) : null}

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3 text-left">
          <div className="rounded-full border border-[var(--color-line)] bg-white/84 px-4 py-2 text-sm text-[var(--color-text-soft)] shadow-[0_10px_22px_rgba(20,36,61,0.05)]">
            Website + CRM + AI in one system
          </div>
          <div className="rounded-full border border-[var(--color-line)] bg-white/84 px-4 py-2 text-sm text-[var(--color-text-soft)] shadow-[0_10px_22px_rgba(20,36,61,0.05)]">
            Ready in weeks, not months
          </div>
          <div className="rounded-full border border-[var(--color-line)] bg-white/84 px-4 py-2 text-sm text-[var(--color-text-soft)] shadow-[0_10px_22px_rgba(20,36,61,0.05)]">
            Built for startups and SMEs
          </div>
        </div>
      </div>
    </section>
  );
}

export type { HeroLandingProps, NavigationItem, AnnouncementBanner, CallToAction };
