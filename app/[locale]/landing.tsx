'use client'

import { Testimonials } from "@/components/features/home/testimonials";
import { FeaturedProducts } from "@/components/features/home/feautred_products";
import { HeroSection } from "@/components/features/home/hero";
import { ModelsBentoGrid } from "@/components/features/home/models_bento_grid";
import { TranslatedViewProps } from "@/src/types/i18n";


export default function LandingHome({ dictionary }: TranslatedViewProps) {
  return (
    <div className="">
      <HeroSection
        videoSrc="/assets/videos/video.mp4"
        showScrollIndicator={false}
      />


      <FeaturedProducts />
      <Testimonials />
      <ModelsBentoGrid 
        models={[
          {
            bagName: 'leather',
            id: '1',
            image: '/assets/images/models/model1.jpg',
            name: '',
          },
          {
            bagName: 'leather',
            id: '1',
            image: '/assets/images/models/model2.jpg',
            name: '',
          },
          {
            bagName: 'leather',
            id: '1',
            image: '/assets/images/models/model3.jpg',
            name: '',
          },
          {
            bagName: 'leather',
            id: '1',
            image: '/assets/images/models/model4.jpg',
            name: '',
          },
          {
            bagName: 'leather',
            id: '1',
            image: '/assets/images/models/model5.jpg',
            name: '',
            isWide: true
          },
          {
            bagName: 'leather',
            id: '1',
            image: '/assets/images/models/model6.jpg',
            name: '',
            isWide: true
          },
        ]}
      />
    </div>
  );
}
