import AboutUsSection from "@/components/About";
import ContactSection from "@/components/Contact";
import CoursesSection from "@/components/Courses";
import PathToSuccess from "@/components/PathToSuccess";
import ReadyToJoin from "@/components/Ready";
import Slider from "@/components/Slider";
import Index from "@/components/ui/whatsApp";
import WelcomeSection from "@/components/Welcome";



export default function Home() {
  return (
    <div>
      <Slider />
      <WelcomeSection />
      <AboutUsSection />
      <CoursesSection />
      <PathToSuccess />
      <ReadyToJoin />
      <ContactSection />
      <Index />
    </div>
  );
}
