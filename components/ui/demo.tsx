import { HeroLanding } from '@/components/ui/hero-1';
import type { HeroLandingProps } from '@/components/ui/hero-1';

export default function Demo() {
  const heroProps: HeroLandingProps = {
    logo: {
      src: '/logo-full.svg',
      alt: 'Ingenium Consulting logo',
      companyName: 'Ingenium Consulting',
    },
    navigation: [
      { name: 'Services', href: '/services' },
      { name: 'Platform', href: '/platform' },
      { name: 'Projects', href: '/projects' },
      { name: 'About', href: '/about' },
      { name: 'Contact', href: '/contact' },
    ],
    loginText: 'See the Platform',
    loginHref: '/platform',
    title: 'Next-gen websites that connect your CRM, marketing and AI without the complexity.',
    description:
      'Ingenium Consulting builds systems where your site, data, and AI agents collaborate to drive leads, campaigns, and customer growth.',
    announcementBanner: {
      text: 'Connected websites. Intelligent growth.',
      linkText: 'View implementation approach',
      linkHref: '/implementation',
    },
    callToActions: [
      {
        text: 'Book a Demo',
        href: '/demo',
        variant: 'primary',
      },
      {
        text: 'See How It Works',
        href: '/platform',
        variant: 'secondary',
      },
    ],
    titleSize: 'large',
    gradientColors: {
      from: 'rgba(23, 103, 195, 0.24)',
      to: 'rgba(19, 183, 168, 0.24)',
    },
    className: 'min-h-[calc(100vh-9rem)]',
  };

  return <HeroLanding {...heroProps} />;
}
