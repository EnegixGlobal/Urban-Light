import { motion } from "framer-motion";
import aboutHero from "../assets/about/about-hero.png";
import aboutStory from "../assets/about/about-story.jpg";
import aboutCraft from "../assets/about/about-craft.mp4";
import aboutVision from "../assets/about/about-vision.mp4";

const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9 } },
};

const slideLeft = {
  hidden: { opacity: 0, x: -80 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
};

const slideRight = {
  hidden: { opacity: 0, x: 80 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
};

const About = () => {
  return (
    <div className="text-white bg-black pt-24 overflow-hidden">

      {/* ================= HERO SECTION ================= */}
      <section
        className="min-h-screen flex items-center px-6 md:px-20 bg-cover bg-center relative"
        style={{ backgroundImage: `url(${aboutHero})` }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60"></div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="relative z-10 max-w-4xl"
        >
          <p className="text-[#c9a27d] text-lg md:text-xl leading-relaxed max-w-2xl">
            About Us
          </p>
          <h1 className="text-4xl md:text-6xl font-light mb-6 leading-tight tracking-wide">
            Where Light Becomes Art
          </h1>

          <p className="text-gray-300 text-lg md:text-xl leading-relaxed max-w-2xl">
            Urban Lights Luxury crafts bespoke lighting masterpieces designed to elevate
            interiors with sophistication and architectural harmony.
          </p>
        </motion.div>
      </section>

      {/* ================= OUR STORY ================= */}
      <section className="py-24 px-6 md:px-20 bg-[#3f372e] grid md:grid-cols-2 gap-16 items-center">

        <motion.div
          variants={slideLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl text-[#c9a27d] mb-6">
            Our Story
          </h2>

          <p className="text-gray-400 leading-relaxed">
            Founded with a passion for refined design and innovation,
            Urban Lights Luxury began its journey with a simple yet powerful vision —
            to redefine how spaces feel through exceptional lighting.
            <br /><br />
            By combining artistic creativity with advanced engineering,
            we create lighting solutions that balance beauty, performance,
            and durability in perfect harmony.
          </p>
        </motion.div>

        <motion.img
          src={aboutStory}
          alt="Urban Lights Story"
          variants={slideRight}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="rounded-xl h-[400px] md:h-[500px] object-cover w-full shadow-2xl"
        />
      </section>

      {/* ================= PREMIUM CRAFTSMANSHIP ================= */}
      <section className="py-24 px-6 md:px-20 bg-black grid md:grid-cols-2 gap-16 items-center">

        <motion.video
          src={aboutCraft}
          autoPlay
          muted
          loop
          playsInline
          variants={slideLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="rounded-xl h-[400px] md:h-[500px] object-cover w-md shadow-2xl"
        />

        <motion.div
          variants={slideRight}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl text-[#c9a27d] mb-6">
            Premium Craftsmanship
          </h2>

          <p className="text-gray-400 leading-relaxed">
            Every Urban Lights Luxury product is meticulously handcrafted
            by skilled artisans who value precision and detail.
            <br /><br />
            From selecting premium-grade materials to the final finishing
            touches, our process reflects a deep commitment to excellence.
            The result is lighting that is visually striking,
            structurally reliable, and built to endure.
          </p>
        </motion.div>
      </section>


    </div>
  );
};

export default About;