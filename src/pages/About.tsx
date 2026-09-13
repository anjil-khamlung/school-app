import AboutCta from "../components/About/AboutCta";
import AboutHero from "../components/About/AboutHero";
import AboutMission from "../components/About/AboutMission";
import AboutRoles from "../components/About/AboutRoles";
import Abouts from "../components/About/Abouts";


const About = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      {/*  HERO  */}
      <AboutHero />

      {/*  ABOUT  */}
      <Abouts />

      {/*  MISSION  */}
      <AboutMission />

      {/*  ROLES  */}
      <AboutRoles />

      {/*  CTA  */}
      <AboutCta />
    </div>
  );
};

export default About;
