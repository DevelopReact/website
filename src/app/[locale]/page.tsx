import {Divider} from '@shared/ui';
import {HeroSection} from '@widgets/HeroSection';
import {OurSolutionsShowcaseSection} from '@widgets/OurSolutionsShowcaseSection';
import {StagesScrollSection} from '@widgets/StagesScrollSection';
import {TechnologiesSection} from '@widgets/TechnologiesSection';

export default async function Page() {
  return (
    <>
      <HeroSection />
      <Divider align='left' />
      <OurSolutionsShowcaseSection />
      <Divider align='right' />
      <TechnologiesSection />
      <Divider align='left' />
      <StagesScrollSection />
    </>
  );
}
