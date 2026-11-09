import { Hero } from "@/components/home/hero";
import { Features } from "@/components/home/features";
import { ProgramsPreview } from "@/components/home/programs-preview";
import { Journey } from "@/components/home/journey";
import { Stats } from "@/components/home/stats";
import { Faq } from "@/components/home/faq";
import { Cta } from "@/components/home/cta";

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <ProgramsPreview />
      <Journey />
      <Stats />
      <Faq />
      <Cta />
    </>
  );
}
