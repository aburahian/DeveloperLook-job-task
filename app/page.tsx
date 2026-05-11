import { HeroHome } from "@/components/HeroHome";
import { ClientMarquee } from "@/components/ClientMarquee";
import { IntroHome } from "@/components/IntroHome";
import { FeaturedWork } from "@/components/FeaturedWork";
import { ServicesHome } from "@/components/ServicesHome";
import { Pioneers } from "@/components/Pioneers";
import { WhatsNew } from "@/components/WhatsNew";
import { ReadyToRise } from "@/components/ReadyToRise";
import { ChasingConsumers } from "@/components/ChasingConsumers";
import { FooterHome } from "@/components/FooterHome";

export default function HomePage() {
  return (
    <div className="bg-grey-100">
      <main>
        <HeroHome />
        <ClientMarquee />
        <IntroHome />
        <FeaturedWork />
        <ServicesHome />
        <ChasingConsumers />
        <Pioneers />
        <WhatsNew />
        <ReadyToRise />
      </main>
      <FooterHome />
    </div>
  );
}
