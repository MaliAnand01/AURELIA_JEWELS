import Hero from "../components/Hero";
import FeaturedProducts from "../components/FeaturedProducts";
import Testimonials from "../components/Testimonials";
import CTA from "../components/CTA";
import PageWrapper from "../components/PageWrapper";

const Home = () => {
  return (
    <PageWrapper>
      <div className="bg-black min-h-screen text-white">
        <Hero />
        <FeaturedProducts />
        <Testimonials />
        <CTA />
      </div>
    </PageWrapper>
  );
};

export default Home;
