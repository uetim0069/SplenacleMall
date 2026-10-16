import Hero from '@/components/home/Hero';
import CategoryRail from '@/components/home/CategoryRail';
import DealsGrid from '@/components/home/DealsGrid';
import HowItWorks from '@/components/home/HowItWorks';
import TestingTeaser from '@/components/home/TestingTeaser';
import BrandBand from '@/components/home/BrandBand';
import TrackingTeaser from '@/components/home/TrackingTeaser';
import TrustBar, { InstallmentBanner } from '@/components/TrustBar';

export default function Home() {
  return (
    <>
      <Hero />
      <CategoryRail />
      <DealsGrid />
      <InstallmentBanner />
      <HowItWorks />
      <TestingTeaser />
      <BrandBand />
      <TrackingTeaser />
      <TrustBar />
    </>
  );
}
